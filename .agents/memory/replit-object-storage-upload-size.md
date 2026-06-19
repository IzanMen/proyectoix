---
name: Replit object storage presigned PUT size enforcement
description: Why upload size can't be capped at sign time with Replit object storage, and where to enforce it instead.
---

# Presigned PUT size cannot be capped at sign time

The Replit object-storage signing sidecar (`POST $REPLIT_SIDECAR_ENDPOINT/object-storage/signed-object-url`,
used by `signObjectURL` in `objectStorage.ts`) only accepts `{bucket_name, object_name, method, expires_at}`.
There is **no way to attach `x-goog-content-length-range`** to the presigned PUT, so the actual upload body
size is unbounded at sign time.

**Why:** the GCS signing happens server-side via the sidecar, not via the `@google-cloud/storage` client's
`getSignedUrl({ extensionHeaders })`, so the usual content-length-range trick is unavailable.

**How to apply:** do NOT rely on a client-declared `size` field for enforcement — a caller can request a URL
with `size: 1` and PUT a huge body. Enforce the cap where it matters instead:
- Rate-limit the request-url endpoint (per-IP) to bound URL minting.
- At the consumption path (e.g. questionnaire submission), read the object's **real** size via
  `getObjectEntityFile(path).getMetadata()` and reject/delete objects over the cap before using/emailing links.
- Residual: unreferenced oversized uploads can still exist (only bounded by rate limiting) until a lifecycle
  cleanup exists. Accept this or proxy uploads through the API to enforce body size before writing.

# Serving uploaded files safely (stored-XSS)

Uploaded files served from the same origin with their stored `Content-Type` are a stored-XSS vector
(SVG/HTML/XML execute in-browser). On the object-serve route always set `X-Content-Type-Options: nosniff`
and force `Content-Disposition: attachment` for any type NOT in a small inline allowlist
(png/jpeg/gif/webp/avif, mp4/webm/quicktime, mpeg/wav/ogg, pdf).
