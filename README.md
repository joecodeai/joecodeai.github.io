# joecodeai.github.io

Personal site of Joel Thomas, AI Engineer.

The concept: the site looks back at you. The hero is a WebGL iris of about 50,000 particles that
turns to follow your pointer, with a depth-scan line passing over it. As you scroll it breaks apart
into a quiet field behind the content, and it gathers again at the end. The cursor is a detection
reticle that locks onto links and labels them, the same visual language as the computer-vision
work the site presents.

## Stack

| | |
|---|---|
| Framework | Next.js 14 (App Router, static export), React 18, TypeScript |
| Styling | Tailwind CSS, Geist Sans / Geist Mono, Instrument Serif |
| 3D | three.js through React Three Fiber, one custom point shader |
| Motion | GSAP + ScrollTrigger (pinned horizontal project reel, scrubbed text), Lenis smooth scroll |

## Details that matter

* **Performance:** the WebGL scene is code-split and loads after first paint (first-load JS 147 kB
  without it). Particle count and pixel ratio drop on phones and low-core devices.
* **Fallbacks:** a CSS-only iris when WebGL is unavailable; content never depends on the canvas.
* **Reduced motion:** smooth scrolling, scroll scrubbing and entrance animations are off, the scene
  renders a single still frame, and all content is visible immediately.
* **Accessibility:** semantic sections and headings, skip link, visible focus states, keyboard
  access to every interaction (the skills explorer responds to focus as well as hover), alt text.
* **SEO:** title and description, Open Graph and Twitter cards (`public/og.png`), JSON-LD `Person`.
* **Content:** every fact is in `lib/content.ts`.

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static site in out/
```

## Deploy

`.github/workflows/deploy.yml` builds the static export and publishes it to GitHub Pages on every
push to `main`. For a repository named `joecodeai.github.io` the site is served at the root. For any
other repository name, set `NEXT_PUBLIC_BASE_PATH=/<repo>` in the build step.

## Licence

Code: MIT. Text, images and project media: © Joel Thomas.
