---
name: IX ad campaign landings (/lp/:slug)
description: Convention for the config-driven paid-traffic landing pages in the ix-landing artifact.
---

# Ad campaign landings (`/lp/:slug`)

Paid-traffic ad landings for Proyecto IX are config-driven, NOT one-off pages.

**How to add a new one:** create a content file in
`artifacts/ix-landing/src/content/campaigns/<slug>.ts` exporting a `CampaignContent`,
then register it in `src/content/campaigns/index.ts`. No route/component changes needed —
the generic `Campaign` page + `/lp/:slug` route render any registered slug.

**Decisions (why they are this way):**
- **Copy is verbatim.** The user supplies the body copy per campaign and it must NOT be
  edited. Only supplemental microcopy (eyebrow, button labels, trust badges) may be added.
- **No goal question.** These landings reuse the main `LeadForm` with `includeGoal={false}`;
  the single conversion goal is the embedded form. CTAs scroll to the form via the
  `#lead-form` anchor (the campaign CTA buttons call a `scrollToForm()` that targets it).
- **Lead attribution via `source`.** Each campaign passes a `source` string to `LeadForm`
  → POST `/api/contact` → rendered as the first "Origen" row in the lead email so the team
  knows which campaign converted. Backend `goal` is optional (validated only if present).
- **noIndex paid traffic.** Each landing sets `useSeo({ noIndex: true, canonical })` and is
  intentionally kept out of `sitemap.xml` / `robots.txt`. (Client-side meta only; add
  server/static noindex for `/lp/*` if strict crawler exclusion is ever required.)
- Hero uses the founders photo `public/team-photo.{webp,png}` (Izan & Xaloc) so the page
  matches the face shown in the ad.
