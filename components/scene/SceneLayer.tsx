"use client";

import dynamic from "next/dynamic";

// The WebGL scene is client-only; the CSS fallback iris shows until it loads.
const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => (
    <div aria-hidden className="fixed inset-0 -z-10 bg-ink">
      <div className="eye-fallback" />
    </div>
  ),
});

export default function SceneLayer() {
  return <Scene />;
}
