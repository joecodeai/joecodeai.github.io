"use client";

import { useEffect, useRef, useState } from "react";
import { journey } from "@/lib/content";
import { SectionLabel } from "../ui";

/** A timeline read like an edit: a sticky timecode on the left follows the entry you are reading. */
export default function Journey() {
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const cur = journey[active];

  return (
    <section id="journey" aria-labelledby="journey-title" className="scrim relative px-5 py-28 md:px-10 md:py-44">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel index="05" title="Journey" />
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[22vh]">
              <h2 id="journey-title" className="reveal text-[clamp(2.2rem,5vw,4.6rem)] font-medium leading-[0.95] tracking-tightest">
                Bangalore, Daegu, <em className="font-serif font-normal italic">Kochi</em>.
              </h2>
              <div aria-hidden className="mt-12 hidden lg:block">
                <p className="mono-label text-mute">Now reading</p>
                <p className="mt-3 whitespace-nowrap font-mono text-[clamp(2.4rem,4.2vw,4.4rem)] leading-none tracking-tight text-signal">
                  {cur.when}
                  <span className="text-paper/25">{cur.until ? ` → ${cur.until}` : ""}</span>
                </p>
                <div className="mt-8 flex gap-1.5">
                  {journey.map((_, i) => (
                    <span key={i} className={`h-1 flex-1 transition-colors duration-500 ${i <= active ? "bg-paper/70" : "bg-line"}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <ol className="lg:col-span-7">
            {journey.map((j, i) => (
              <li
                key={j.title + j.when}
                ref={(el) => {
                  items.current[i] = el;
                }}
                data-i={i}
                className={`reveal border-t border-line py-10 transition-opacity duration-500 md:py-14 ${
                  i === active ? "opacity-100" : "lg:opacity-40"
                }`}
              >
                <p className="font-mono text-xs text-mute">
                  {j.when}
                  {j.until ? ` — ${j.until}` : ""}
                </p>
                <h3 className="mt-3 text-2xl font-medium tracking-tight md:text-3xl">{j.title}</h3>
                <p className="mt-1 font-serif text-xl italic text-paper/70">{j.org}</p>
                <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-paper/65">{j.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
