---
name: Sanity Studio deploy constraint on Replit
description: Why a Sanity Studio cannot be cleanly installed/deployed from inside this single-toolchain repo, and the recommended path.
---

# Sanity Studio cannot be cleanly deployed from inside this repo

The blog content API consumer (`@sanity/client`, `@portabletext/react`, `@sanity/image-url`) lives in the main app and works fine. The **Studio** (the CMS editing app) does not belong in this repo.

**Constraints (why):**
- The Replit package tooling installs into the ONE shared root `package.json`/toolchain; there is no supported way to install deps isolated in a `studio/` subfolder (bash `npm install` is blocked; the packager targets root).
- Sanity Studio v6 requires Node >= 22.12; this repo runs Node 20 (EBADENGINE warnings, likely CLI/build failures).
- Studio traditionally needs React 18; the site is React 19. Mixing them in root causes peer-dep ERESOLVE failures (installing `sanity` + `@sanity/vision` + `styled-components` together fails).
- The site is intentionally lean (see `replit.md` "Dependencies (minimal)"); adding the heavy CMS toolchain to root pollutes the production deploy.

**How to apply:** Keep the prepared standalone project in `studio/` (its own `package.json` pinning sanity ^3 + React 18, schema in `studio/schemaTypes/`). The user deploys it from their own machine: `cd studio && npm install && npx sanity login && npx sanity deploy`. No admin token needs to be shared (CLI uses browser login). Do NOT install `sanity`/`@sanity/vision`/`styled-components` into the root project.

**Also required for the blog to load (separate, user-side):** add CORS origins in manage.sanity.io (project jhzj7eh3) for the site domains + dev URL, and publish `post` documents.
