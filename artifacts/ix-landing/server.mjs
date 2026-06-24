import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { join, resolve, extname, basename, sep } from "node:path";
import { fileURLToPath } from "node:url";

const here = fileURLToPath(new URL(".", import.meta.url));
const distPath = resolve(here, "dist/public");

const rawPort = process.env.PORT;
if (!rawPort) {
  throw new Error("PORT environment variable is required but was not provided.");
}
const port = Number(rawPort);
if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

if (!existsSync(distPath)) {
  throw new Error(
    `Could not find the build directory: ${distPath}. Run the build first.`,
  );
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
};

const COMPRESSIBLE = new Set([
  ".html",
  ".js",
  ".mjs",
  ".css",
  ".json",
  ".map",
  ".webmanifest",
  ".xml",
  ".txt",
  ".svg",
]);

const LONG_CACHE_EXT = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".avif",
  ".svg",
  ".ico",
  ".woff",
  ".woff2",
  ".ttf",
  ".otf",
  ".mp4",
  ".webm",
]);

function cacheControl(routePath, ext, base) {
  if (ext === ".html" || base === "robots.txt" || base === "sitemap.xml") {
    return "public, max-age=0, must-revalidate";
  }
  // Vite emits content-hashed files under /assets — safe to cache forever.
  if (routePath.startsWith("/assets/")) {
    return "public, max-age=31536000, immutable";
  }
  if (LONG_CACHE_EXT.has(ext)) {
    return "public, max-age=86400";
  }
  return "public, max-age=0, must-revalidate";
}

function send(req, res, physical, routePath) {
  const ext = extname(physical).toLowerCase();
  const base = basename(physical);
  res.setHeader("Content-Type", MIME[ext] || "application/octet-stream");
  res.setHeader("Cache-Control", cacheControl(routePath, ext, base));
  res.setHeader("X-Content-Type-Options", "nosniff");

  let toServe = physical;
  if (COMPRESSIBLE.has(ext)) {
    res.setHeader("Vary", "Accept-Encoding");
    const ae = String(req.headers["accept-encoding"] || "");
    if (/\bbr\b/.test(ae) && existsSync(physical + ".br")) {
      res.setHeader("Content-Encoding", "br");
      toServe = physical + ".br";
    } else if (/\bgzip\b/.test(ae) && existsSync(physical + ".gz")) {
      res.setHeader("Content-Encoding", "gzip");
      toServe = physical + ".gz";
    }
  }

  res.setHeader("Content-Length", statSync(toServe).size);
  res.statusCode = 200;
  if (req.method === "HEAD") {
    res.end();
    return;
  }
  const stream = createReadStream(toServe);
  stream.on("error", () => {
    if (!res.headersSent) res.statusCode = 500;
    res.end();
  });
  stream.pipe(res);
}

const server = createServer((req, res) => {
  try {
    if (req.method !== "GET" && req.method !== "HEAD") {
      res.statusCode = 405;
      res.setHeader("Allow", "GET, HEAD");
      res.end();
      return;
    }

    const url = new URL(req.url || "/", "http://localhost");
    let pathname = decodeURIComponent(url.pathname);

    if (pathname === "/healthz") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.setHeader("Cache-Control", "no-store");
      res.end("ok");
      return;
    }

    if (pathname.endsWith("/")) pathname += "index.html";

    const physical = resolve(distPath, "." + pathname);
    if (physical !== distPath && !physical.startsWith(distPath + sep)) {
      res.statusCode = 403;
      res.end();
      return;
    }

    if (existsSync(physical) && statSync(physical).isFile()) {
      send(req, res, physical, pathname);
      return;
    }

    // SPA fallback — serve the app shell for client-side routes.
    send(req, res, join(distPath, "index.html"), "/index.html");
  } catch {
    if (!res.headersSent) res.statusCode = 500;
    res.end();
  }
});

server.listen(port, "0.0.0.0", () => {
  process.stdout.write(`ix-landing static server listening on :${port}\n`);
});
