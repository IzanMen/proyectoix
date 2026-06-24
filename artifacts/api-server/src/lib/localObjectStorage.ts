import fs from "node:fs";
import { mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

const LOCAL_OBJECT_RE = /^\/objects\/uploads\/([0-9a-fA-F-]{36})$/;

interface LocalObjectMetadata {
  contentType?: string;
  originalName?: string;
}

export function isLocalObjectStorageEnabled(): boolean {
  return Boolean(process.env.LOCAL_OBJECT_STORAGE_DIR?.trim());
}

export function createLocalObjectPath(): string {
  return `/objects/uploads/${randomUUID()}`;
}

export function getLocalUploadUrl(objectPath: string): string {
  return `/api/storage/local-uploads/${objectPath.replace(/^\/objects\//, "")}`;
}

function getLocalRoot(): string {
  const configured = process.env.LOCAL_OBJECT_STORAGE_DIR?.trim();
  if (!configured) {
    throw new Error("LOCAL_OBJECT_STORAGE_DIR is not configured");
  }
  return path.resolve(process.cwd(), configured);
}

export function getLocalObjectDiskPath(objectPath: string): string {
  const match = objectPath.match(LOCAL_OBJECT_RE);
  if (!match) {
    throw new Error(`Invalid local object path: ${objectPath}`);
  }
  return path.join(getLocalRoot(), "uploads", match[1]);
}

function getLocalMetadataPath(objectPath: string): string {
  return `${getLocalObjectDiskPath(objectPath)}.meta.json`;
}

export async function writeLocalObject({
  objectPath,
  body,
  contentType,
  originalName,
}: {
  objectPath: string;
  body: Buffer;
  contentType?: string;
  originalName?: string;
}): Promise<void> {
  const diskPath = getLocalObjectDiskPath(objectPath);
  await mkdir(path.dirname(diskPath), { recursive: true });
  await writeFile(diskPath, body);
  await writeFile(
    getLocalMetadataPath(objectPath),
    JSON.stringify({ contentType, originalName }, null, 2),
  );
}

export async function readLocalObjectMetadata(
  objectPath: string,
): Promise<LocalObjectMetadata & { size: number }> {
  const diskPath = getLocalObjectDiskPath(objectPath);
  const fileStat = await stat(diskPath);
  let metadata: LocalObjectMetadata = {};
  try {
    metadata = JSON.parse(
      await readFile(getLocalMetadataPath(objectPath), "utf8"),
    );
  } catch {
    metadata = {};
  }
  return { ...metadata, size: fileStat.size };
}

export function createLocalObjectReadStream(objectPath: string): fs.ReadStream {
  return fs.createReadStream(getLocalObjectDiskPath(objectPath));
}

export async function deleteLocalObject(objectPath: string): Promise<void> {
  await rm(getLocalObjectDiskPath(objectPath), { force: true });
  await rm(getLocalMetadataPath(objectPath), { force: true });
}
