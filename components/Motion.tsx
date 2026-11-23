"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect } from "react";
import { sceneState } from "./scene/store";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Smooth scrolling, scroll-driven scene state and generic reveal animations.
 * Everything here is skipped when the visitor prefers reduced motion.
 */
export default function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.classList.add("js");

    // Scene: gather into the eye in the hero, disperse while reading, gather again at contact.
    let heroP = 0;
    let contactP = 0;
    const sync = () => {
      sceneState.scatter = Math.min(1, heroP) * (1 - contactP);
      sceneState.centre = contactP;
    };
    const triggers = [
      ScrollTrigger.create({
        trigger: "#top",
        start: "top top",
        end: "bottom 35%",
        onUpdate: (s) => {
          heroP = s.progress;
          sync();
        },
      }),
      ScrollTrigger.create({
        trigger: "#contact",
        start: "top 85%",
        end: "top 15%",
        onUpdate: (s) => {
          contactP = s.progress;
          sync();
        },
      }),
    ];

    if (still) {
      return () => triggers.forEach((t) => t.kill());
    }

    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4) });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "expo.out",
          delay: Number(el.dataset.delay ?? 0),
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    });

    return () => {
      ctx.revert();
      triggers.forEach((t) => t.kill());
      gsap.ticker.remove(raf);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return null;
}

/** Scroll to an in-page anchor through Lenis when it is running. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: 0, duration: 1.6 });
  else el.scrollIntoView({ behavior: "smooth" });
}
