"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { hero, person } from "@/lib/content";
import { scrollToId } from "../Motion";
import { sceneState } from "../scene/store";
import { focusHandlers, KochiClock, Magnetic } from "../ui";

const NAV = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const readout = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (still) return;
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".hero-line > span", { yPercent: 110, duration: 1.5, stagger: 0.12 }, 0.25)
        .from(".hero-fade", { opacity: 0, y: 18, duration: 1.2, stagger: 0.08 }, 0.7)
        .from(".hud", { opacity: 0, duration: 1.4 }, 1.0);
    }, root);

    // Live readout of what the "camera" sees: your pointer, in the scene's own coordinates.
    let raf = 0;
    let frame = 0;
    const loop = () => {
      frame++;
      if (readout.current && frame % 3 === 0) {
        const { x, y } = sceneState.pointer;
        readout.current.textContent = `x ${x >= 0 ? "+" : "−"}${Math.abs(x).toFixed(2)}  y ${y >= 0 ? "+" : "−"}${Math.abs(y).toFixed(2)}`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      ctx.revert();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header ref={root} id="top" className="relative flex min-h-[100svh] flex-col px-5 pb-8 pt-5 md:px-10 md:pb-10">
      <nav aria-label="Main" className="hero-fade flex items-center justify-between">
        <a href="#top" className="group flex items-center gap-3" data-cursor="home">
          <span className="grid h-8 w-8 place-items-center border border-paper/30 font-mono text-[11px] tracking-wider transition-colors group-hover:border-signal group-hover:text-signal">
            JT
          </span>
          <span className="hidden text-sm sm:inline">{person.name}</span>
        </a>
        <ul className="flex items-center gap-4 md:gap-8">
          {NAV.map((n) => (
            <li key={n.id} className={n.id === "about" || n.id === "journey" ? "hidden md:block" : ""}>
              <a
                href={`#${n.id}`}
                data-cursor={n.label}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId(n.id);
                }}
                className="mono-label text-paper/70 transition-colors hover:text-paper"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="hud pointer-events-none absolute right-5 top-20 hidden text-right md:right-10 md:block">
        <p className="mono-label text-mute">
          <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-signal align-middle" />
          Tracking · id 01 · you
        </p>
        <p className="mono-label mt-2 text-paper/60">
          <span ref={readout}>x +0.00 y +0.00</span>
        </p>
        <p className="mono-label mt-2 text-paper/40">
          Kochi · <KochiClock />
        </p>
      </div>

      <div className="mt-auto max-w-[1400px]">
        <p className="hero-fade mono-label mb-6 text-mute md:mb-8">{hero.kicker}</p>
        <h1 className="font-sans text-[clamp(2.9rem,9.4vw,10rem)] font-medium leading-[0.9] tracking-tightest">
          <span className="hero-line block overflow-hidden pb-[0.06em]">
            <span className="block">
              AI that <em className="font-serif font-normal italic text-signal">sees</em>,
            </span>
          </span>
          <span className="hero-line block overflow-hidden pb-[0.06em]">
            <span className="block">
              <em className="font-serif font-normal italic">reads</em>, and runs
            </span>
          </span>
          <span className="hero-line block overflow-hidden pb-[0.06em]">
            <span className="block">in production.</span>
          </span>
        </h1>

        <div className="mt-10 flex flex-col gap-8 md:mt-14 md:flex-row md:items-end md:justify-between">
          <p className="hero-fade max-w-md text-[15px] leading-relaxed text-paper/70 md:text-base">
            I&rsquo;m <span className="text-paper">{person.name}</span>. {hero.intro}
          </p>
          <div className="hero-fade flex items-center gap-3">
            <Magnetic>
              <a
                href="#work"
                data-cursor="Scroll to work"
                {...focusHandlers()}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("work");
                }}
                className="group inline-flex items-center gap-3 bg-paper px-6 py-4 text-sm font-medium text-ink transition-colors hover:bg-signal"
              >
                See the work
                <span aria-hidden className="transition-transform duration-500 group-hover:translate-y-0.5">↓</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                data-cursor="Say hello"
                {...focusHandlers()}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("contact");
                }}
                className="inline-flex items-center gap-3 border border-paper/25 px-6 py-4 text-sm transition-colors hover:border-paper"
              >
                Get in touch
              </a>
            </Magnetic>
          </div>
        </div>

        <div className="hero-fade mt-12 flex items-center justify-between border-t border-line pt-4 text-mute">
          <span className="mono-label">Vision · Language · Systems</span>
          <span className="mono-label hidden sm:inline">Scroll</span>
          <span className="mono-label">01 · Index</span>
        </div>
      </div>
    </header>
  );
}
