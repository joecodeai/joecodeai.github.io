"use client";

import { useEffect, useRef } from "react";

/**
 * A detection reticle instead of an arrow. It follows the pointer and, over anything marked
 * with data-cursor, snaps a bounding box around it and labels it, the way a detector would.
 */
export default function Cursor() {
  const box = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine) return;
    document.body.classList.add("has-cursor");

    const p = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const cur = { x: p.x - 13, y: p.y - 13, w: 26, h: 26 };
    let target: HTMLElement | null = null;
    let visible = false;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      p.x = e.clientX;
      p.y = e.clientY;
      if (!visible && box.current) {
        visible = true;
        box.current.style.opacity = "1";
        if (dot.current) dot.current.style.opacity = "1";
      }
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]") ?? null;
      if (el !== target) {
        target = el;
        if (label.current) {
          label.current.textContent = el?.dataset.cursor ?? "";
          label.current.style.opacity = el ? "1" : "0";
        }
        box.current?.classList.toggle("is-locked", !!el);
      }
    };
    const onLeave = () => {
      visible = false;
      if (box.current) box.current.style.opacity = "0";
      if (dot.current) dot.current.style.opacity = "0";
    };

    const tick = () => {
      let tx = p.x - 13;
      let ty = p.y - 13;
      let tw = 26;
      let th = 26;
      if (target && target.isConnected) {
        const r = target.getBoundingClientRect();
        tx = r.left - 6;
        ty = r.top - 6;
        tw = r.width + 12;
        th = r.height + 12;
      }
      const k = still ? 1 : 0.22;
      cur.x += (tx - cur.x) * k;
      cur.y += (ty - cur.y) * k;
      cur.w += (tw - cur.w) * k;
      cur.h += (th - cur.h) * k;
      if (box.current) {
        box.current.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0)`;
        box.current.style.width = `${cur.w}px`;
        box.current.style.height = `${cur.h}px`;
      }
      if (dot.current) dot.current.style.transform = `translate3d(${p.x - 2}px, ${p.y - 2}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.body.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70] hidden [@media(pointer:fine)]:block">
      <div ref={box} className="reticle absolute left-0 top-0 opacity-0" style={{ width: 26, height: 26 }}>
        <i className="tl" />
        <i className="tr" />
        <i className="bl" />
        <i className="br" />
        <span ref={label} className="reticle-label opacity-0" />
      </div>
      <div ref={dot} className="absolute left-0 top-0 h-1 w-1 rounded-full bg-signal opacity-0" />
      <style>{`
        .reticle i { position:absolute; width:8px; height:8px; border-color: var(--paper); border-style: solid; border-width:0; transition: border-color .25s; }
        .reticle .tl { left:0; top:0; border-left-width:1.5px; border-top-width:1.5px; }
        .reticle .tr { right:0; top:0; border-right-width:1.5px; border-top-width:1.5px; }
        .reticle .bl { left:0; bottom:0; border-left-width:1.5px; border-bottom-width:1.5px; }
        .reticle .br { right:0; bottom:0; border-right-width:1.5px; border-bottom-width:1.5px; }
        .reticle.is-locked i { border-color: var(--signal); width: 12px; height: 12px; }
        .reticle-label { position:absolute; left:0; top:-20px; white-space:nowrap; background: var(--signal); color: var(--ink);
          font: 500 10px/1 var(--font-geist-mono), monospace; letter-spacing:.08em; text-transform:uppercase; padding:4px 6px; transition: opacity .2s; }
      `}</style>
    </div>
  );
}
