import { createClient } from "@sanity/client";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET;

export const sanityClient = createClient({
  projectId: projectId || "",
  dataset: dataset || "production",
  apiVersion: "2025-01-01",
  useCdn: true,
  perspective: "published",
});

export { projectId, dataset };
