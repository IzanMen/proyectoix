import express, {
  Router,
  type IRouter,
  type Request,
  type Response,
} from "express";
import { Readable } from "stream";
import {
  RequestUploadUrlBody,
  RequestUploadUrlResponse,
} from "@workspace/api-zod";
import {
  ObjectStorageService,
  ObjectNotFoundError,
} from "../lib/objectStorage";
import { ObjectPermission } from "../lib/objectAcl";
import {
  createLocalObjectPath,
  createLocalObjectReadStream,
  getLocalUploadUrl,
  isLocalObjectStorageEnabled,
  readLocalObjectMetadata,
  writeLocalObject,
} from "../lib/localObjectStorage";

const router: IRouter = Router();
const objectStorageService = new ObjectStorageService();

const MAX_UPLOAD_BYTES = 100 * 1024 * 1024; // 100 MB cap per file
const UPLOAD_RATE_WINDOW_MS = 60_000;
const UPLOAD_RATE_MAX = 30;
const uploadRateLimit = new Map<string, { count: number; reset: number }>();

// Content types safe to render inline. Everything else (HTML, SVG, XML, ...) is
// served as an attachment to avoid same-origin stored-XSS via uploaded files.
const INLINE_SAFE_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/gif",
  "image/webp",
  "image/avif",
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "audio/mpeg",
  "audio/wav",
  "audio/ogg",
  "application/pdf",
]);

function getAbsoluteUrl(req: Request, pathname: string): string {
  const forwardedProto = req.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const protocol = forwardedProto || req.protocol || "http";
  const host = req.get("host") || `localhost:${process.env.PORT ?? 5000}`;
  return `${protocol}://${host}${pathname}`;
}

/**
 * POST /storage/uploads/request-url
 *
 * Request a presigned URL for file upload.
 * The client sends JSON metadata (name, size, contentType) — NOT the file.
 * Then uploads the file directly to the returned presigned URL.
 */
router.post(
  "/storage/uploads/request-url",
  async (req: Request, res: Response) => {
    const ip = req.ip || "unknown";
    const now = Date.now();
    const limit = uploadRateLimit.get(ip);
    if (limit && now < limit.reset) {
      if (limit.count >= UPLOAD_RATE_MAX) {
        res.status(429).json({ error: "Too many upload requests" });
        return;
      }
      limit.count++;
    } else {
      uploadRateLimit.set(ip, { count: 1, reset: now + UPLOAD_RATE_WINDOW_MS });
    }

    const parsed = RequestUploadUrlBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Missing or invalid required fields" });
      return;
    }

    if (parsed.data.size > MAX_UPLOAD_BYTES) {
      res.status(400).json({ error: "File too large" });
      return;
    }

    try {
      const { name, size, contentType } = parsed.data;

      if (isLocalObjectStorageEnabled()) {
        const objectPath = createLocalObjectPath();
        res.json(
          RequestUploadUrlResponse.parse({
            uploadURL: getAbsoluteUrl(req, getLocalUploadUrl(objectPath)),
            objectPath,
            metadata: { name, size, contentType },
          }),
        );
        return;
      }

      const uploadURL = await objectStorageService.getObjectEntityUploadURL();
      const objectPath =
        objectStorageService.normalizeObjectEntityPath(uploadURL);

      res.json(
        RequestUploadUrlResponse.parse({
          uploadURL,
          objectPath,
          metadata: { name, size, contentType },
        }),
      );
    } catch (error) {
      req.log.error({ err: error }, "Error generating upload URL");
      res.status(500).json({ error: "Failed to generate upload URL" });
    }
  },
);

router.put(
  "/storage/local-uploads/*path",
  express.raw({ type: "*/*", limit: MAX_UPLOAD_BYTES }),
  async (req: Request, res: Response) => {
    if (!isLocalObjectStorageEnabled()) {
      res.status(404).json({ error: "Local object storage is disabled" });
      return;
    }

    const raw = req.params.path;
    const wildcardPath = Array.isArray(raw) ? raw.join("/") : raw;
    const objectPath = `/objects/${wildcardPath}`;
    const body = Buffer.isBuffer(req.body) ? req.body : Buffer.alloc(0);
    const rawContentType = req.headers["content-type"];
    const contentType = Array.isArray(rawContentType)
      ? rawContentType[0]
      : rawContentType;

    if (body.length > MAX_UPLOAD_BYTES) {
      res.status(400).json({ error: "File too large" });
      return;
    }

    try {
      await writeLocalObject({
        objectPath,
        body,
        contentType,
      });
      res.status(204).end();
    } catch (error) {
      req.log.error({ err: error }, "Error saving local upload");
      res.status(500).json({ error: "Failed to save local upload" });
    }
  },
);

/**
 * GET /storage/public-objects/*
 *
 * Serve public assets from PUBLIC_OBJECT_SEARCH_PATHS.
 * These are unconditionally public — no authentication or ACL checks.
 * IMPORTANT: Always provide this endpoint when object storage is set up.
 */
router.get(
  "/storage/public-objects/*filePath",
  async (req: Request, res: Response) => {
    try {
      const raw = req.params.filePath;
      const filePath = Array.isArray(raw) ? raw.join("/") : raw;
      const file = await objectStorageService.searchPublicObject(filePath);
      if (!file) {
        res.status(404).json({ error: "File not found" });
        return;
      }

      const response = await objectStorageService.downloadObject(file);

      res.status(response.status);
      response.headers.forEach((value, key) => res.setHeader(key, value));

      if (response.body) {
        const nodeStream = Readable.fromWeb(
          response.body as ReadableStream<Uint8Array>,
        );
        nodeStream.pipe(res);
      } else {
        res.end();
      }
    } catch (error) {
      req.log.error({ err: error }, "Error serving public object");
      res.status(500).json({ error: "Failed to serve public object" });
    }
  },
);

/**
 * GET /storage/objects/*
 *
 * Serve object entities from PRIVATE_OBJECT_DIR.
 * These are served from a separate path from /public-objects and can optionally
 * be protected with authentication or ACL checks based on the use case.
 */
router.get("/storage/objects/*path", async (req: Request, res: Response) => {
  try {
    const raw = req.params.path;
    const wildcardPath = Array.isArray(raw) ? raw.join("/") : raw;
    const objectPath = `/objects/${wildcardPath}`;

    if (isLocalObjectStorageEnabled()) {
      let metadata;
      try {
        metadata = await readLocalObjectMetadata(objectPath);
      } catch (error) {
        if (
          error &&
          typeof error === "object" &&
          "code" in error &&
          error.code === "ENOENT"
        ) {
          res.status(404).json({ error: "Object not found" });
          return;
        }
        throw error;
      }
      const contentType = (metadata.contentType || "application/octet-stream")
        .split(";")[0]
        .trim()
        .toLowerCase();

      res.setHeader(
        "Content-Type",
        metadata.contentType || "application/octet-stream",
      );
      res.setHeader("Content-Length", String(metadata.size));
      res.setHeader("Cache-Control", "private, max-age=0, must-revalidate");
      res.setHeader("X-Content-Type-Options", "nosniff");
      if (!INLINE_SAFE_TYPES.has(contentType)) {
        res.setHeader("Content-Disposition", "attachment");
      }

      createLocalObjectReadStream(objectPath)
        .on("error", (error) => {
          req.log.error({ err: error }, "Error reading local object");
          res.destroy(error);
        })
        .pipe(res);
      return;
    }

    const objectFile =
      await objectStorageService.getObjectEntityFile(objectPath);

    // --- Protected route example (uncomment when using replit-auth) ---
    // if (!req.isAuthenticated()) {
    //   res.status(401).json({ error: "Unauthorized" });
    //   return;
    // }
    // const canAccess = await objectStorageService.canAccessObjectEntity({
    //   userId: req.user.id,
    //   objectFile,
    //   requestedPermission: ObjectPermission.READ,
    // });
    // if (!canAccess) {
    //   res.status(403).json({ error: "Forbidden" });
    //   return;
    // }

    const response = await objectStorageService.downloadObject(objectFile);

    res.status(response.status);
    response.headers.forEach((value, key) => res.setHeader(key, value));

    const contentType = (response.headers.get("content-type") || "")
      .split(";")[0]
      .trim()
      .toLowerCase();
    res.setHeader("X-Content-Type-Options", "nosniff");
    if (!INLINE_SAFE_TYPES.has(contentType)) {
      res.setHeader("Content-Disposition", "attachment");
    }

    if (response.body) {
      const nodeStream = Readable.fromWeb(
        response.body as ReadableStream<Uint8Array>,
      );
      nodeStream.pipe(res);
    } else {
      res.end();
    }
  } catch (error) {
    if (error instanceof ObjectNotFoundError) {
      req.log.warn({ err: error }, "Object not found");
      res.status(404).json({ error: "Object not found" });
      return;
    }
    req.log.error({ err: error }, "Error serving object");
    res.status(500).json({ error: "Failed to serve object" });
  }
});

export default router;
