import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // Long cache for hashed assets, no cache for HTML and SEO files
  app.use(
    express.static(distPath, {
      etag: true,
      lastModified: true,
      maxAge: "1y",
      setHeaders: (res, filePath) => {
        const ext = path.extname(filePath).toLowerCase();
        const base = path.basename(filePath).toLowerCase();

        if (ext === ".html" || base === "robots.txt" || base === "sitemap.xml") {
          res.setHeader(
            "Cache-Control",
            "public, max-age=0, must-revalidate",
          );
        } else if ([".js", ".css", ".woff", ".woff2", ".ttf", ".otf"].includes(ext)) {
          res.setHeader(
            "Cache-Control",
            "public, max-age=31536000, immutable",
          );
        } else if ([".png", ".jpg", ".jpeg", ".gif", ".webp", ".avif", ".svg", ".ico"].includes(ext)) {
          res.setHeader(
            "Cache-Control",
            "public, max-age=31536000, immutable",
          );
        }

        if (base === "sitemap.xml") {
          res.setHeader("Content-Type", "application/xml; charset=utf-8");
        }
        if (base === "robots.txt") {
          res.setHeader("Content-Type", "text/plain; charset=utf-8");
        }
      },
    }),
  );

  // SPA fallback — never cache the shell
  app.use("/{*path}", (_req, res) => {
    res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
