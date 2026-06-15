---
name: pnpm install OOM pattern
description: pnpm/npm install gets killed (exit -1, not timeout 124) when downloading large new packages; workaround patterns.
---

# pnpm install OOM pattern

## The rule
When any new packages (not in pnpm store) need to be downloaded for installation, pnpm install gets killed with exit code -1 (SIGKILL / OOM), not a normal timeout. This affects both `pnpm install` and `npm install` and even filtered installs like `pnpm --filter @workspace/foo add package`.

**Why:** The environment has a memory/resource cap. Downloading + extracting multiple large packages simultaneously exhausts it.

**How to apply:**
1. For packages already in the workspace catalog/lockfile (already downloaded previously) → pnpm install works fine.
2. For new packages that need downloading → use one of the workarounds below.

## Workarounds (in order of preference)

### 1. Replace npm package with built-in Node.js implementation
- If the package wraps a Node.js built-in (net, tls, crypto, fs), rewrite using built-ins directly.
- Example: replaced `nodemailer` (Gmail SMTP) with pure `tls.connect()` SMTP client in `artifacts/api-server/src/mailer.ts`.

### 2. Use Vite aliases to redirect package imports to local shims
- Create shim files in `src/shims/` that implement the package's public API using fetch or other built-ins.
- Add `resolve.alias` entries in `vite.config.ts` pointing the package name to the shim file.
- Example: shims for `@sanity/client`, `@sanity/image-url`, `@portabletext/react` in `artifacts/ix-landing/src/shims/`.

### 3. CDN fallback for asset packages
- For font packages (@fontsource/*), add Google Fonts CDN links to index.html and remove the npm imports.
- Remove `@fontsource` imports from `main.tsx` and add `<link>` tags for Google Fonts in `index.html`.

### 4. Remove from esbuild externals if package isn't actually external
- If esbuild treats a package as external but it's not installed, the server crashes at runtime.
- Fix: either install the package OR replace it (option 1) OR remove from externals if bundleable.
