import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const sourcesPath = path.join(root, "src/content/prototype-image-sources.json");
const poolsPath = path.join(root, "src/content/prototype-image-pools.json");
const outRoot = path.join(root, "public/prototype-images");

const sources = JSON.parse(fs.readFileSync(sourcesPath, "utf8"));

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function download(url, filePath) {
  const response = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120",
    },
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.startsWith("image/")) {
    throw new Error(`Expected image, got ${contentType}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(filePath, buffer);
}

fs.rmSync(outRoot, { recursive: true, force: true });
fs.mkdirSync(outRoot, { recursive: true });

const localPools = {};
let total = 0;

for (const [category, urls] of Object.entries(sources)) {
  const categorySlug = slugify(category);
  const dir = path.join(outRoot, categorySlug);
  fs.mkdirSync(dir, { recursive: true });
  localPools[category] = [];

  for (const [index, url] of urls.entries()) {
    const fileName = `${String(index + 1).padStart(2, "0")}.jpg`;
    const filePath = path.join(dir, fileName);
    const publicPath = `/prototype-images/${categorySlug}/${fileName}`;
    process.stdout.write(`${categorySlug}/${fileName} `);
    await download(url, filePath);
    localPools[category].push(publicPath);
    total += 1;
    process.stdout.write("ok\n");
  }
}

fs.writeFileSync(poolsPath, `${JSON.stringify(localPools, null, 2)}\n`);
console.log(`Downloaded ${total} images`);
