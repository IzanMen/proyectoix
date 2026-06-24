import { readdirSync, statSync, readFileSync, writeFileSync } from "node:fs";
import { join, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { brotliCompressSync, gzipSync, constants } from "node:zlib";

const here = fileURLToPath(new URL(".", import.meta.url));
const distDir = resolve(here, "../dist/public");

const EXTS = new Set([
  ".js",
  ".mjs",
  ".css",
  ".html",
  ".svg",
  ".json",
  ".map",
  ".xml",
  ".txt",
  ".webmanifest",
]);
const MIN_BYTES = 1024;

let count = 0;

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) {
      walk(p);
      continue;
    }
    if (name.endsWith(".br") || name.endsWith(".gz")) continue;
    if (!EXTS.has(extname(name).toLowerCase())) continue;
    if (s.size < MIN_BYTES) continue;

    const buf = readFileSync(p);
    writeFileSync(
      p + ".br",
      brotliCompressSync(buf, {
        params: {
          [constants.BROTLI_PARAM_QUALITY]: 11,
          [constants.BROTLI_PARAM_SIZE_HINT]: buf.length,
        },
      }),
    );
    writeFileSync(p + ".gz", gzipSync(buf, { level: 9 }));
    count++;
  }
}

try {
  walk(distDir);
  process.stdout.write(
    `[precompress] generated .br + .gz for ${count} files in ${distDir}\n`,
  );
} catch (err) {
  process.stderr.write(`[precompress] failed: ${String(err)}\n`);
  process.exit(1);
}
