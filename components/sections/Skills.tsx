"use client";

import { useState } from "react";
import { proofs, skills } from "@/lib/content";
import { SectionLabel } from "../ui";

type Hover = { kind: "tool"; used: string[]; name: string } | { kind: "proof"; id: string } | null;

/**
 * Skills as evidence: point at a tool to see where it was used, or at a project to see what it
 * was built with. No bars, no percentages.
 */
export default function Skills() {
  const [hover, setHover] = useState<Hover>(null);

  const toolActive = (used: string[], name: string) => {
    if (!hover) return null;
    if (hover.kind === "tool") return hover.name === name;
    return used.includes(hover.id);
  };
  const proofActive = (id: string) => {
    if (!hover) return null;
    if (hover.kind === "proof") return hover.id === id;
    return hover.used.includes(id);
  };

  return (
    <section id="skills" aria-labelledby="skills-title" className="scrim relative px-5 py-28 md:px-10 md:py-44">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel index="04" title="Skills" />
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <h2 id="skills-title" className="reveal text-[clamp(2.2rem,5vw,4.6rem)] font-medium leading-[0.95] tracking-tightest lg:col-span-7">
            Four verbs, <em className="font-serif font-normal italic text-signal">one</em> stack.
          </h2>
          <p className="reveal text-sm leading-relaxed text-paper/60 lg:col-span-5" data-delay={0.1}>
            Point at a tool to light up where I have used it, or at a project to see what it is made of. Everything here
            has shipped somewhere you can check.
          </p>
        </div>

        <div className="reveal mt-14 flex flex-wrap gap-2" role="group" aria-label="Where the skills were used">
          {proofs.map((p) => {
            const a = proofActive(p.id);
            return (
              <button
                key={p.id}
                type="button"
                data-cursor={p.label}
                onPointerEnter={() => setHover({ kind: "proof", id: p.id })}
                onPointerLeave={() => setHover(null)}
                onFocus={() => setHover({ kind: "proof", id: p.id })}
                onBlur={() => setHover(null)}
                className={`mono-label border px-3 py-2 transition-all duration-300 ${
                  a ? "border-signal bg-signal text-ink" : a === false ? "border-line text-paper/25" : "border-line text-paper/70"
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((g, gi) => (
            <div key={g.group} className="reveal bg-ink p-6 md:p-8" data-delay={gi * 0.06}>
              <span className="mono-label text-mute">{g.note}</span>
              <h3 className="mt-3 font-serif text-5xl italic md:text-6xl">{g.group}</h3>
              <ul className="mt-8 space-y-1">
                {g.items.map((it) => {
                  const a = toolActive(it.used, it.name);
                  return (
                    <li key={it.name}>
                      <button
                        type="button"
                        onPointerEnter={() => setHover({ kind: "tool", used: it.used, name: it.name })}
                        onPointerLeave={() => setHover(null)}
                        onFocus={() => setHover({ kind: "tool", used: it.used, name: it.name })}
                        onBlur={() => setHover(null)}
                        className={`group flex w-full items-center justify-between py-1.5 text-left text-lg transition-all duration-300 md:text-xl ${
                          a ? "translate-x-1 text-paper" : a === false ? "text-paper/20" : "text-paper/80"
                        }`}
                      >
                        <span>{it.name}</span>
                        <span
                          aria-hidden
                          className={`h-1.5 w-1.5 rounded-full transition-colors ${a ? "bg-signal" : "bg-transparent"}`}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
