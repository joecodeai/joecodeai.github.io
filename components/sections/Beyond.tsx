import { beyond } from "@/lib/content";
import { SectionLabel } from "../ui";

export default function Beyond() {
  return (
    <section id="beyond" aria-labelledby="beyond-title" className="scrim relative px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel index="06" title="Beyond the code" />
        <h2 id="beyond-title" className="reveal max-w-4xl text-[clamp(2.2rem,5vw,4.6rem)] font-medium leading-[0.95] tracking-tightest">
          Off the clock, still <em className="font-serif font-normal italic text-signal">curious</em>.
        </h2>
        <div className="mt-16 grid gap-px bg-line md:grid-cols-3">
          {beyond.map((b, i) => (
            <article key={b.title} className="reveal group relative bg-ink p-7 transition-colors duration-500 hover:bg-coal md:p-9" data-delay={i * 0.08}>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-signal">0{i + 1}</span>
                <span className="mono-label text-mute">{b.tag}</span>
              </div>
              <h3 className="mt-16 text-2xl font-medium leading-tight tracking-tight md:mt-24 md:text-3xl">{b.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-paper/60">{b.body}</p>
              <span
                aria-hidden
                className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-signal transition-transform duration-700 group-hover:scale-x-100"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
