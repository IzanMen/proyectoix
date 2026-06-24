import { cp, rm, mkdir, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import process from "node:process";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceDir = path.join(rootDir, "artifacts", "ix-landing", "dist", "public");
const targetDir = path.join(rootDir, "public");

async function main() {
  try {
    await stat(sourceDir);
  } catch {
    console.error(`[copy-vercel-output] missing source directory: ${sourceDir}`);
    process.exitCode = 1;
    return;
  }

  await rm(targetDir, { recursive: true, force: true });
  await mkdir(path.dirname(targetDir), { recursive: true });
  await cp(sourceDir, targetDir, { recursive: true });
  console.log(`[copy-vercel-output] copied ${sourceDir} -> ${targetDir}`);
}

main().catch((error) => {
  console.error("[copy-vercel-output] failed", error);
  process.exitCode = 1;
});
