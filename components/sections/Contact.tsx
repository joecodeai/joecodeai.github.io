"use client";

import { useState } from "react";
import { person } from "@/lib/content";
import { scrollToId } from "../Motion";
import { focusHandlers, KochiClock, Magnetic } from "../ui";

const LINKS = [
  { label: "GitHub", href: person.links.github, handle: "joecodeai" },
  { label: "LinkedIn", href: person.links.linkedin, handle: "joel-thomas-v" },
  { label: "Hugging Face", href: person.links.huggingface, handle: "joecodeai" },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${person.email}`;
    }
  };

  return (
    <footer id="contact" aria-labelledby="contact-title" className="relative flex min-h-[100svh] flex-col px-5 pb-8 pt-28 md:px-10">
      <div className="flex items-center gap-4 text-mute">
        <span className="mono-label text-signal">07</span>
        <span className="h-px w-10 bg-line" />
        <span className="mono-label">Contact</span>
      </div>

      <div className="my-auto py-20 text-center">
        <p className="mono-label text-mute">The eye is on you. Say something.</p>
        <h2 id="contact-title" className="mt-6 text-[clamp(3.6rem,15vw,15rem)] font-medium leading-[0.85] tracking-tightest">
          Say <em className="font-serif font-normal italic text-signal">hello</em>.
        </h2>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Magnetic>
            <a
              href={`mailto:${person.email}`}
              data-cursor="Write an email"
              {...focusHandlers()}
              className="inline-flex items-center gap-3 bg-paper px-7 py-4 text-sm font-medium text-ink transition-colors hover:bg-signal"
            >
              {person.email}
            </a>
          </Magnetic>
          <Magnetic>
            <button
              type="button"
              onClick={copy}
              data-cursor="Copy address"
              {...focusHandlers()}
              className="inline-flex min-w-[9rem] items-center justify-center border border-paper/25 px-6 py-4 text-sm transition-colors hover:border-paper"
            >
              <span aria-live="polite">{copied ? "Copied ✓" : "Copy email"}</span>
            </button>
          </Magnetic>
        </div>

        <ul className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a href={l.href} target="_blank" rel="noreferrer" data-cursor={l.label} className="group inline-flex items-baseline gap-2">
                <span className="text-lg transition-colors group-hover:text-signal">{l.label}</span>
                <span className="font-mono text-xs text-mute">{l.handle} ↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-4 border-t border-line pt-5 text-mute sm:flex-row sm:items-center sm:justify-between">
        <span className="mono-label">© {new Date().getFullYear()} {person.name}</span>
        <span className="mono-label">
          {person.location} · <KochiClock />
        </span>
        <span className="mono-label">Built with Next.js, Three.js &amp; GSAP</span>
        <a
          href="#top"
          data-cursor="Back to top"
          onClick={(e) => {
            e.preventDefault();
            scrollToId("top");
          }}
          className="mono-label text-paper/70 hover:text-paper"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
