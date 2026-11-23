"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { archive, projects, type Project } from "@/lib/content";
import { asset } from "@/lib/asset";
import { SectionLabel, Tilt } from "../ui";

function Media({ p }: { p: Project }) {
  return (
    <Tilt className="w-full">
      <figure className="group relative overflow-hidden border border-line bg-coal">
        {p.id === "streamsight" ? (
          <video
            className="aspect-video w-full object-cover"
            poster={asset(p.image)}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={p.imageAlt}
          >
            <source src={asset("/projects/streamsight.mp4")} type="video/mp4" />
            <source src={asset("/projects/streamsight.webm")} type="video/webm" />
          </video>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={asset(p.image)} alt={p.imageAlt} loading="lazy" className="aspect-video w-full object-cover object-top" />
        )}
        {/* Detection-frame overlay: corner marks and a caption, the visual language of the site. */}
        <div aria-hidden className="pointer-events-none absolute inset-3">
          <span className="absolute left-0 top-0 h-4 w-4 border-l border-t" style={{ borderColor: p.accent }} />
          <span className="absolute right-0 top-0 h-4 w-4 border-r border-t" style={{ borderColor: p.accent }} />
          <span className="absolute bottom-0 left-0 h-4 w-4 border-b border-l" style={{ borderColor: p.accent }} />
          <span className="absolute bottom-0 right-0 h-4 w-4 border-b border-r" style={{ borderColor: p.accent }} />
        </div>
        <figcaption className="mono-label absolute left-3 top-3 px-1.5 py-1 text-ink" style={{ background: p.accent }}>
          {p.index} · {p.kind}
        </figcaption>
      </figure>
    </Tilt>
  );
}

function Panel({ p }: { p: Project }) {
  return (
    <article
      aria-labelledby={`${p.id}-title`}
      className="project-panel flex w-full shrink-0 flex-col justify-center gap-10 desk:h-full desk:w-[88vw] desk:max-w-[1500px] desk:flex-row desk:items-center desk:gap-16"
    >
      <div className="desk:w-[44%]">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-sm" style={{ color: p.accent }}>
            {p.index}
          </span>
          <span className="mono-label text-mute">
            {p.kind} · {p.year}
          </span>
        </div>
        <h3 id={`${p.id}-title`} className="mt-4 text-[clamp(2.6rem,5.6vw,5.6rem)] font-medium leading-[0.92] tracking-tightest">
          {p.name}
        </h3>
        <p className="mt-3 font-serif text-2xl italic text-paper/80 md:text-3xl">{p.tagline}</p>
        <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-paper/65">{p.problem}</p>

        <ul className="mt-6 space-y-2.5">
          {p.how.map((h) => (
            <li key={h} className="flex gap-3 text-sm leading-relaxed text-paper/75">
              <span aria-hidden className="mt-[9px] h-px w-4 shrink-0" style={{ background: p.accent }} />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <span key={s} className="border border-line px-2 py-1 font-mono text-[11px] text-paper/60">
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6 desk:w-[56%]">
        <Media p={p} />
        <dl className="grid grid-cols-3 gap-px bg-line">
          {p.metrics.map((m) => (
            <div key={m.label} className="bg-ink p-3 md:p-4">
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <span className="block text-lg font-medium tracking-tight md:text-2xl">{m.value}</span>
                <span className="mt-1 block text-[11px] leading-snug text-mute md:text-xs">{m.label}</span>
              </dd>
            </div>
          ))}
        </dl>
        <a
          href={p.repo}
          target="_blank"
          rel="noreferrer"
          data-cursor={`GitHub · ${p.name}`}
          className="group inline-flex items-center justify-between border-b border-paper/30 pb-3 text-sm transition-colors hover:border-signal"
        >
          <span>
            Read the code <span className="text-mute">github.com/joecodeai/{p.repo.split("/").pop()}</span>
          </span>
          <span aria-hidden className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
            ↗
          </span>
        </a>
      </div>
    </article>
  );
}

export default function Projects() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (min-height: 760px) and (prefers-reduced-motion: no-preference)", () => {
      const el = track.current!;
      const distance = () => el.scrollWidth - window.innerWidth;
      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          pin: true,
          scrub: 0.8,
          start: "top top",
          end: () => `+=${distance()}`,
          invalidateOnRefresh: true,
          onUpdate: (s) => {
            const bar = section.current?.querySelector<HTMLElement>(".progress-bar");
            if (bar) bar.style.transform = `scaleX(${s.progress})`;
          },
        },
      });
      return () => tween.kill();
    });
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      window.clearTimeout(id);
      mm.revert();
    };
  }, []);

  return (
    <section ref={section} id="work" aria-labelledby="work-title" className="relative overflow-hidden bg-ink/80 desk:h-[100svh]">
      <div className="px-5 pt-28 md:px-10 desk:absolute desk:left-0 desk:right-0 desk:top-0 desk:z-10 desk:pt-8">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between desk:max-w-none">
          <div className="flex items-center gap-4 text-mute">
            <span className="mono-label text-signal">03</span>
            <span className="h-px w-10 bg-line" />
            <h2 id="work-title" className="mono-label">
              Selected work
            </h2>
          </div>
          <div aria-hidden className="hidden h-px w-48 origin-left bg-line desk:block">
            <div className="progress-bar h-px origin-left scale-x-0 bg-signal" />
          </div>
        </div>
      </div>

      <div
        ref={track}
        className="flex flex-col gap-28 px-5 pb-28 pt-12 md:px-10 desk:h-full desk:flex-row desk:items-center desk:gap-[6vw] desk:px-[6vw] desk:pb-0 desk:pt-0"
      >
        {projects.map((p) => (
          <Panel key={p.id} p={p} />
        ))}

        <div className="flex w-full shrink-0 flex-col justify-center desk:h-full desk:w-[60vw] desk:max-w-[900px]">
          <p className="mono-label text-mute">Archive · earlier experiments</p>
          <p className="mt-4 font-serif text-4xl italic md:text-5xl">Where it started.</p>
          <ul className="mt-10 border-t border-line">
            {archive.map((a) => (
              <li key={a.name}>
                <a
                  href={a.repo}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor={`GitHub · ${a.name}`}
                  className="group grid grid-cols-[1fr_auto] gap-x-6 gap-y-2 border-b border-line py-5 transition-colors hover:bg-paper/[0.03] md:grid-cols-[220px_1fr_auto]"
                >
                  <span className="text-lg font-medium transition-colors group-hover:text-signal">{a.name}</span>
                  <span className="order-3 col-span-2 text-sm leading-relaxed text-paper/60 md:order-none md:col-span-1">{a.what}</span>
                  <span className="mono-label self-start text-mute">{a.year} ↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
