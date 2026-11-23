"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { sceneState } from "./scene/store";

/** Pulls its content toward the pointer while hovered. */
export function Magnetic({ children, strength = 0.35, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * strength;
      const y = (e.clientY - (r.top + r.height / 2)) * strength;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const leave = () => {
      el.style.transform = "translate3d(0,0,0)";
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [strength]);
  return (
    <span ref={ref} className={`inline-block transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${className}`}>
      {children}
    </span>
  );
}

/** Dilates the eye's pupil while a call to action is hovered or focused. */
export function focusHandlers() {
  return {
    onPointerEnter: () => (sceneState.focus = 1),
    onPointerLeave: () => (sceneState.focus = 0),
    onFocus: () => (sceneState.focus = 1),
    onBlur: () => (sceneState.focus = 0),
  };
}

/** Section label in the form "01 — About". */
export function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="reveal mb-10 flex items-center gap-4 text-mute md:mb-16">
      <span className="mono-label text-signal">{index}</span>
      <span className="h-px w-10 bg-line" />
      <span className="mono-label">{title}</span>
    </div>
  );
}

/** Live local time in Kochi. */
export function KochiClock() {
  const [now, setNow] = useState<string>("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit" });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{now ? `${now} IST` : "IST"}</span>;
}

/** Tilts its content in 3D toward the pointer. */
export function Tilt({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const inner = el.firstElementChild as HTMLElement | null;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      if (inner) inner.style.transform = `rotateY(${x * 9}deg) rotateX(${-y * 9}deg) translateZ(0)`;
      el.style.setProperty("--mx", `${(x + 0.5) * 100}%`);
      el.style.setProperty("--my", `${(y + 0.5) * 100}%`);
    };
    const leave = () => {
      if (inner) inner.style.transform = "rotateY(0deg) rotateX(0deg)";
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);
  return (
    <div ref={ref} className={`[perspective:1200px] ${className}`}>
      <div className="transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] [transform-style:preserve-3d]">{children}</div>
    </div>
  );
}
