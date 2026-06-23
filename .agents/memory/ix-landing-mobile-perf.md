---
name: IX landing mobile performance (Lighthouse 100)
description: What makes the ix-landing SPA fast on mobile, and the levers used to chase a 100 mobile Lighthouse score on the /lp/ ad landings.
---

# Mobile performance levers for ix-landing

These are the high-impact changes that move the needle on mobile Lighthouse for this
React 19 + Vite + Tailwind v4 SPA. The /lp/:slug pages are paid ad landings, so mobile
speed directly affects ad quality/conversion — performance is a product requirement, not polish.

**Levers (ordered by impact):**
- **Self-host fonts, never the Google Fonts CDN `<link>`.** The CDN stylesheet is
  render-blocking and adds third-party connections. The repo already ships
  `@fontsource-variable/inter`, `@fontsource/space-grotesk`, `@fontsource/syne` — import the
  needed weights in `main.tsx`. Family names must match the `@theme` tokens in `index.css`:
  `Space Grotesk`, `Syne`, `Inter Variable`. fontsource ships `font-display: swap` + per-subset
  `unicode-range`, so only the latin subset downloads.
- **Heavy images must be webp and small.** The body texture `bg-texture` and any hero photo
  were oversized PNGs. Use ImageMagick (`magick in.png -resize WxH -quality N out.webp`) — the
  body texture compressed ~796KB→~22KB with no visible change at `background-blend-mode: overlay`.
  Also: never use `background-attachment: fixed` (mobile scroll-repaint jank).
- **Defer the Meta Pixel.** Keep the `fbq` stub + `init`/`PageView` synchronous (they queue),
  but inject `fbevents.js` ~1.5s after `window load`. The queue flushes when the script loads,
  so tracking is preserved.
- **No always-on canvas animation on mobile.** `InteractiveBackground` renders a static CSS
  gradient when `(pointer: coarse)` / `(prefers-reduced-motion)` / width < 768 — mouse
  interaction is wasted on touch and the rAF loop kills TBT. Desktop keeps the canvas (with
  `cancelAnimationFrame` cleanup).
- **Drop framer-motion from the ad landings.** Hero entrance + scroll `Reveal` were replaced
  with a CSS keyframe (`.ix-fade-up`) and an IntersectionObserver-driven `.ix-reveal`. This
  removes ~50KB JS from the lazy campaign chunk.
- LCP hero `<img>` gets `fetchPriority="high"` + `decoding="async"`.

**Gotcha:** the site is PUBLISHED at proyectoix.com. PageSpeed measures production, so the
user must RE-PUBLISH after perf changes before the score updates — dev preview won't reflect it.
