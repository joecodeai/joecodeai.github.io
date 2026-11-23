"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { sceneState } from "./store";

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uPupil;
  uniform float uScatter;
  uniform float uScan;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uDim;
  attribute vec4 aData;   // angle, radial, kind, seed
  attribute vec3 aTarget;
  varying vec3 vColor;
  varying float vAlpha;

  const vec3 SIGNAL = vec3(1.0, 0.31, 0.12);
  const vec3 EMBER  = vec3(0.55, 0.12, 0.05);
  const vec3 PAPER  = vec3(0.93, 0.91, 0.87);
  const vec3 COOL   = vec3(0.56, 0.83, 1.0);

  void main() {
    float th = aData.x;
    float u = aData.y;
    float kind = aData.z;
    float seed = aData.w;

    vec3 eye;
    vec3 col;
    float alpha;
    float size;

    if (kind < 0.5) {
      // Iris: radial fibres between the pupil and the limbus, on a shallow dome.
      float r = mix(uPupil, 1.0, u);
      r += sin(uTime * 0.7 + seed * 40.0) * 0.004;
      float wob = sin(th * 7.0 + uTime * 0.25) * 0.01 * u;
      eye = vec3(cos(th) * (r + wob), sin(th) * (r + wob), 0.22 * (1.0 - r * r));
      float fibre = 0.55 + 0.45 * sin(th * 61.0 + u * 9.0 + seed * 2.0);
      col = mix(SIGNAL, PAPER, smoothstep(0.15, 0.55, u) * 0.55);
      col = mix(col, EMBER, smoothstep(0.75, 1.0, u));
      col *= 0.55 + 0.6 * fibre;
      alpha = 0.9;
      size = 1.0 + 0.6 * (1.0 - u);
    } else if (kind < 1.5) {
      // Limbus: the dark ring that frames the iris.
      eye = position;
      col = mix(EMBER, SIGNAL, 0.35);
      alpha = 0.75;
      size = 1.15;
    } else if (kind < 2.5) {
      // Sclera: a faint shell that gives the eye volume when it turns.
      eye = position;
      col = PAPER;
      alpha = 0.14;
      size = 0.9;
    } else {
      // Pupil rim.
      float r = uPupil * (0.97 + u * 0.06);
      eye = vec3(cos(th) * r, sin(th) * r, 0.24);
      col = PAPER;
      alpha = 0.95;
      size = 1.5;
    }

    // Depth scan: a sweeping band tints and enlarges whatever it passes over.
    float band = exp(-pow(eye.y - uScan, 2.0) * 90.0);
    col = mix(col, COOL, band * 0.85);
    size *= 1.0 + band * 0.9;

    // Disperse into a slow drifting field, each point on its own delay.
    float s = smoothstep(seed * 0.45, seed * 0.45 + 0.55, uScatter);
    vec3 drift = vec3(
      sin(uTime * 0.07 + seed * 31.0),
      cos(uTime * 0.05 + seed * 17.0),
      sin(uTime * 0.06 + seed * 11.0)
    ) * 0.25;
    vec3 p = mix(eye, aTarget + drift, s);
    alpha = mix(alpha, kind > 1.5 && kind < 2.5 ? 0.12 : 0.28, s);
    col = mix(col, mix(PAPER, SIGNAL, step(0.93, seed)), s * 0.6);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * size * uPixelRatio / -mv.z;
    vColor = col;
    vAlpha = alpha * uDim;
  }
`;

const fragment = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.05, d);
    if (a < 0.01) discard;
    gl_FragColor = vec4(vColor, a * vAlpha);
  }
`;

function buildGeometry(count: number) {
  const pos = new Float32Array(count * 3);
  const data = new Float32Array(count * 4);
  const target = new Float32Array(count * 3);
  const rand = mulberry32(7);
  const fibres = 140;

  for (let i = 0; i < count; i++) {
    const pick = rand();
    let kind: number;
    let th = rand() * Math.PI * 2;
    let u = rand();
    let x = 0;
    let y = 0;
    let z = 0;

    if (pick < 0.62) {
      kind = 0;
      if (rand() < 0.7) th = ((Math.floor(rand() * fibres) + gauss(rand) * 0.18) / fibres) * Math.PI * 2;
      u = Math.pow(rand(), 0.85);
    } else if (pick < 0.72) {
      kind = 1;
      const r = 1.0 + rand() * 0.07;
      x = Math.cos(th) * r;
      y = Math.sin(th) * r;
      z = 0.02;
    } else if (pick < 0.95) {
      kind = 2;
      // Front-facing part of a sphere shell around the iris.
      const phi = Math.acos(1 - rand() * 1.1);
      const R = 1.55;
      x = Math.sin(phi) * Math.cos(th) * R;
      y = Math.sin(phi) * Math.sin(th) * R;
      z = Math.cos(phi) * R - R + 0.1;
    } else {
      kind = 3;
    }

    pos[i * 3] = x;
    pos[i * 3 + 1] = y;
    pos[i * 3 + 2] = z;
    data[i * 4] = th;
    data[i * 4 + 1] = u;
    data[i * 4 + 2] = kind;
    data[i * 4 + 3] = rand();
    target[i * 3] = (rand() - 0.5) * 14;
    target[i * 3 + 1] = (rand() - 0.5) * 8;
    target[i * 3 + 2] = -rand() * 5 + 0.5;
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  g.setAttribute("aData", new THREE.BufferAttribute(data, 4));
  g.setAttribute("aTarget", new THREE.BufferAttribute(target, 3));
  g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 20);
  return g;
}

export default function EyeField({ count, still }: { count: number; still: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { size, viewport } = useThree();
  const geometry = useMemo(() => buildGeometry(count), [count]);
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uPupil: { value: 0.3 },
          uScatter: { value: 0 },
          uScan: { value: -2 },
          uSize: { value: 9 },
          uPixelRatio: { value: 1 },
          uDim: { value: 1 },
        },
      }),
    [],
  );

  const pupil = useRef(0.3);
  const scatter = useRef(0);
  const centre = useRef(0);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const u = material.uniforms;
    const k = Math.min(1, dt * 4);
    const narrow = size.width < 768;

    u.uTime.value = still ? 0 : t;
    u.uPixelRatio.value = state.gl.getPixelRatio();
    u.uSize.value = narrow ? 7 : 9;

    sceneState.flash = Math.max(0, sceneState.flash - dt * 2.5);
    const wantPupil = 0.3 + sceneState.focus * 0.16 - sceneState.flash * 0.14 + (still ? 0 : Math.sin(t * 0.8) * 0.012);
    pupil.current += (wantPupil - pupil.current) * k;
    u.uPupil.value = pupil.current;

    scatter.current += (sceneState.scatter - scatter.current) * Math.min(1, dt * 3);
    centre.current += (sceneState.centre - centre.current) * Math.min(1, dt * 3);
    u.uScatter.value = scatter.current;
    // At the contact section the eye returns as a larger, quieter backdrop behind the headline.
    u.uDim.value = 1 - centre.current * 0.62;
    u.uScan.value = still ? 5 : ((t * 0.45) % 3.2) * 1.4 - 2.2;

    const g = group.current;
    if (!g) return;
    // Place the eye beside the headline on wide screens, centred on narrow ones and at the end.
    const medium = !narrow && size.width < 1280;
    const sideX = narrow ? 0 : medium ? viewport.width * 0.3 : Math.min(viewport.width * 0.27, 2.8);
    const sideY = narrow ? viewport.height * 0.17 : medium ? viewport.height * 0.08 : 0;
    g.position.x += (sideX * (1 - centre.current) - g.position.x) * k;
    g.position.y += (sideY * (1 - centre.current) - g.position.y) * k;
    const scale = narrow ? 0.8 : medium ? 0.95 : 1.12;
    g.scale.setScalar(scale * (1 + centre.current * (narrow ? 0.35 : 0.5)));

    // Look at the visitor; drift when dispersed.
    const look = 1 - scatter.current;
    const tx = -sceneState.pointer.y * 0.42 * look;
    const ty = sceneState.pointer.x * 0.55 * look + (still ? 0 : Math.sin(t * 0.05) * 0.3 * scatter.current);
    g.rotation.x += (tx - g.rotation.x) * k;
    g.rotation.y += (ty - g.rotation.y) * k;
  });

  return (
    <group ref={group}>
      <points geometry={geometry} material={material} frustumCulled={false} />
    </group>
  );
}

function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function gauss(rand: () => number) {
  return Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand());
}
