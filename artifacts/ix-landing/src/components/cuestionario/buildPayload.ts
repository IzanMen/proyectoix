import type { UploadedFile } from "@/lib/storage";
import type { FieldDef, FlatFieldDef, SectionDef } from "./types";

export interface PayloadFileRef {
  name: string;
  objectPath: string;
}

export interface PayloadItem {
  label: string;
  value?: string;
  files?: PayloadFileRef[];
}

export interface PayloadSection {
  title: string;
  items: PayloadItem[];
}

export interface QuestionnairePayload {
  sections: PayloadSection[];
  businessName: string;
}

type Values = Record<string, unknown>;

function asString(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function collectFlat(
  field: FlatFieldDef,
  values: Values,
  items: PayloadItem[],
  labelPrefix = "",
): void {
  const label = labelPrefix ? `${labelPrefix} · ${field.label}` : field.label;

  if (field.type === "files") {
    const files = values[field.id];
    if (Array.isArray(files) && files.length > 0) {
      items.push({
        label,
        files: (files as UploadedFile[]).map((f) => ({
          name: f.name,
          objectPath: f.objectPath,
        })),
      });
    }
    return;
  }

  if (field.type === "checkbox") {
    if (values[field.id] === true) {
      items.push({ label, value: "Sí" });
    }
    return;
  }

  const value = asString(values[field.id]);
  if (value) {
    items.push({ label, value });
  }
}

function collectField(
  field: FieldDef,
  values: Values,
  items: PayloadItem[],
): void {
  if (field.type === "reveal") {
    if (values[field.id] === true) {
      for (const sub of field.fields) {
        collectFlat(sub, values, items);
      }
    }
    return;
  }

  if (field.type === "repeatable") {
    const rows = values[field.id];
    if (!Array.isArray(rows)) return;
    rows.forEach((row, index) => {
      const rowValues = (row ?? {}) as Values;
      const hasContent = field.fields.some((f) => asString(rowValues[f.id]));
      if (!hasContent) return;
      const prefix = `${field.itemLabel} ${index + 1}`;
      for (const sub of field.fields) {
        const value = asString(rowValues[sub.id]);
        if (value) {
          items.push({ label: `${prefix} · ${sub.label}`, value });
        }
      }
    });
    return;
  }

  collectFlat(field, values, items);
}

export function buildPayload(
  sectionDefs: SectionDef[],
  values: Values,
): QuestionnairePayload {
  const sections: PayloadSection[] = [];

  for (const section of sectionDefs) {
    const items: PayloadItem[] = [];
    for (const field of section.fields) {
      collectField(field, values, items);
    }
    if (items.length > 0) {
      sections.push({ title: section.title, items });
    }
  }

  return {
    sections,
    businessName: asString(values.businessName),
  };
}
