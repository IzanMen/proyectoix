---
name: IX landing mobile performance (Lighthouse 100)
description: Durable levers and constraints for chasing a ~100 mobile Lighthouse score on the ix-landing /lp/ ad landings.
---

# Mobile performance levers for ix-landing

The `/lp/:slug` pages are paid ad landings, so mobile speed is a product requirement
(ad quality/conversion), not polish. Levers below are ordered by impact.

**Levers (ordered by impact):**
- **Production static serving MUST be compressed + long-cached.** Replit `serve=static`
  ships assets uncompressed with `cache-control: private`, which alone pushes FCP/LCP
  past target. The fix in this repo: a zero-dep Node server (`server.mjs`) that does
  brotli/gzip content-negotiation over a precompressed build, immutable cache on hashed
  `/assets/*`, no-cache on HTML. **Why:** compression is the single biggest lever here
  (main JS bundle drops ~3.5x with brotli).
- **Self-host fonts, never the Google Fonts CDN `<link>`** (render-blocking + 3rd-party
  connections). fontsource packages are already deps; import weights in `main.tsx` and
  keep family names matching the `@theme` tokens in `index.css`.
- **Heavy images must be small webp.** Oversized PNGs (body texture, hero) are LCP/weight
  killers; convert with ImageMagick. Never use `background-attachment: fixed` (mobile
  scroll-repaint jank).
- **Defer the Meta Pixel:** keep the `fbq` stub + `init`/`PageView` synchronous (they
  queue), inject `fbevents.js` ~1.5s after `window load`; the queue flushes on load.
- **No always-on canvas animation on mobile.** `InteractiveBackground` falls back to a
  static gradient on coarse-pointer / reduced-motion / narrow widths; the rAF loop kills TBT.
- **Code-split the routes.** `Home` and the `Campaign` route are lazy so the `/lp` main
  bundle doesn't carry the homepage tree. LCP hero `<img>` gets `fetchPriority="high"`.
- **framer-motion is the heaviest single chunk (~40KB brotli).** Campaign page components
  use CSS instead, but `LeadForm` (the conversion form) still imports it, so it still loads
  on `/lp` below the fold. Left intact deliberately — refactoring the money component is
  risky and it's not render-blocking for the hero/LCP.

**Gotchas:**
- The site is PUBLISHED at proyectoix.com and PageSpeed measures production, so perf
  changes do nothing to the score until the user RE-PUBLISHES — dev preview won't reflect it.
- If FCP/LCP are still short of target after republish, the next real lever is prerender/SSG
  of the four `/lp` routes so the hero HTML is in the initial response (SPA currently renders
  nothing until JS executes).
