"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import EyeField from "./EyeField";
import { sceneState } from "./store";

function supportsWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Fixed full-viewport WebGL layer behind the page. */
export default function Scene() {
  const [ready, setReady] = useState<null | { count: number; still: boolean; dpr: [number, number] }>(null);

  useEffect(() => {
    if (!supportsWebGL()) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = window.innerWidth < 768;
    const cores = navigator.hardwareConcurrency || 4;
    const count = narrow || cores <= 4 ? 18000 : 52000;
    setReady({ count, still, dpr: [1, narrow ? 1.5 : 1.75] });

    const onMove = (e: PointerEvent) => {
      sceneState.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      sceneState.pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onDown = () => {
      sceneState.flash = 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return (
    <div aria-hidden className="fixed inset-0 -z-10 bg-ink">
      {ready ? (
        <Canvas
          dpr={ready.dpr}
          camera={{ position: [0, 0, 4.4], fov: 45 }}
          gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
          frameloop={ready.still ? "demand" : "always"}
          onCreated={({ gl }) => gl.setClearColor("#0a0a0b")}
        >
          <EyeField count={ready.count} still={ready.still} />
        </Canvas>
      ) : (
        <div className="eye-fallback" />
      )}
      <div className="pointer-events-none absolute inset-0 vignette" />
    </div>
  );
}
