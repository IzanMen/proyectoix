---
name: nodemailer replacement
description: nodemailer is in esbuild externals list and can't be installed; replaced with pure Node.js TLS SMTP.
---

# nodemailer replacement

## The rule
`nodemailer` appears in `artifacts/api-server/build.mjs` externals list, so esbuild doesn't bundle it. Since it also can't be installed (OOM pattern), the server crashes at startup.

**Solution:** `artifacts/api-server/src/mailer.ts` now implements a minimal SMTP client using Node.js built-in `tls` module (no npm dependency). It connects to smtp.gmail.com:465, authenticates with AUTH LOGIN, and sends MIME email.

**Why:** Eliminates the external dependency entirely. The built-in TLS SMTP client handles the Gmail SMTP flow that the app needs.

**How to apply:**
- `createTransporter()` still returns an object with `sendMail(opts)` — same interface as before.
- `nodemailer` and `@types/nodemailer` have been removed from `artifacts/api-server/package.json`.
- `nodemailer` has been removed from the externals array in `artifacts/api-server/build.mjs`.
- Required env var: `GMAIL_APP_PASSWORD` (Gmail App Password, not the account password).
