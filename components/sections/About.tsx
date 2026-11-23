"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { about } from "@/lib/content";
import { SectionLabel } from "../ui";

export default function About() {
  const story = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      // Words brighten as the paragraph passes through the middle of the screen.
      gsap.fromTo(
        ".word",
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.05,
          scrollTrigger: { trigger: story.current, start: "top 75%", end: "bottom 45%", scrub: 0.6 },
        },
      );
    }, story);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" aria-labelledby="about-title" className="scrim relative px-5 py-28 md:px-10 md:py-44">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel index="02" title="About" />
        <h2 id="about-title" className="sr-only">
          About Joel
        </h2>

        <div className="grid gap-16 lg:grid-cols-12">
          <div ref={story} className="story lg:col-span-8">
            {about.story.map((para, i) => (
              <p
                key={i}
                className={`text-[clamp(1.5rem,3.1vw,2.9rem)] font-medium leading-[1.14] tracking-[-0.03em] ${i ? "mt-8" : ""}`}
              >
                {para.split(" ").map((w, j) => (
                  <span key={j} className="word">
                    {w}&nbsp;
                  </span>
                ))}
              </p>
            ))}
          </div>

          <aside className="lg:col-span-4 lg:pl-8">
            <dl className="border-t border-line">
              {about.facts.map((f, i) => (
                <div key={f.k} className="reveal flex items-baseline justify-between gap-6 border-b border-line py-4" data-delay={i * 0.06}>
                  <dt className="mono-label text-mute">{f.k}</dt>
                  <dd className="text-right text-sm text-paper/85">{f.v}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        <div className="mt-24 grid gap-px bg-line md:mt-32 md:grid-cols-3">
          {about.principles.map((p, i) => (
            <div key={p.t} className="reveal bg-ink p-7 md:p-9" data-delay={i * 0.08}>
              <p className="mono-label text-signal">0{i + 1}</p>
              <p className="mt-10 font-serif text-4xl italic md:text-5xl">{p.t}</p>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/60">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
