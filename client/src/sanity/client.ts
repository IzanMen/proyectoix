import { createClient } from "@sanity/client";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET;

if (!projectId || !dataset) {
  throw new Error(
    "Faltan las variables de entorno VITE_SANITY_PROJECT_ID o VITE_SANITY_DATASET",
  );
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  useCdn: true,
  perspective: "published",
});

export { projectId, dataset };
