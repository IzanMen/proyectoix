export interface UploadedFile {
  name: string;
  size: number;
  objectPath: string;
}

interface RequestUrlResponse {
  uploadURL: string;
  objectPath: string;
}

export async function uploadFileToStorage(file: File): Promise<UploadedFile> {
  const metaRes = await fetch("/api/storage/uploads/request-url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: file.name,
      size: file.size,
      contentType: file.type || "application/octet-stream",
    }),
  });

  if (!metaRes.ok) {
    throw new Error("No se ha podido preparar la subida del archivo.");
  }

  const { uploadURL, objectPath } = (await metaRes.json()) as RequestUrlResponse;

  const putRes = await fetch(uploadURL, {
    method: "PUT",
    body: file,
    headers: { "Content-Type": file.type || "application/octet-stream" },
  });

  if (!putRes.ok) {
    throw new Error("No se ha podido subir el archivo.");
  }

  return { name: file.name, size: file.size, objectPath };
}
