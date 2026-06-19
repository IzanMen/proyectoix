import { useRef, useState } from "react";
import { uploadFileToStorage, type UploadedFile } from "@/lib/storage";
import type {
  FieldDef,
  FlatFieldDef,
  OptionsFieldDef,
  RepeatableFieldDef,
  RevealFieldDef,
  TextFieldDef,
} from "./types";

type Values = Record<string, unknown>;

interface FieldProps {
  field: FieldDef;
  values: Values;
  setValue: (id: string, value: unknown) => void;
}

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[15px] text-white placeholder:text-white/30 outline-none transition focus:border-[hsl(270,100%,60%)] focus:bg-white/[0.06]";

function FieldLabel({
  htmlFor,
  label,
  optional,
  help,
}: {
  htmlFor?: string;
  label: string;
  optional?: boolean;
  help?: string;
}) {
  return (
    <div className="mb-2">
      <label
        htmlFor={htmlFor}
        className="text-[13px] font-medium text-white/85"
      >
        {label}
        {optional && (
          <span className="ml-2 text-[11px] font-normal text-white/35">
            (opcional)
          </span>
        )}
      </label>
      {help && <p className="mt-1 text-[12px] leading-snug text-white/40">{help}</p>}
    </div>
  );
}

function TextLikeField({
  field,
  value,
  onChange,
}: {
  field: TextFieldDef;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <FieldLabel
        htmlFor={field.id}
        label={field.label}
        optional={field.optional}
        help={field.help}
      />
      {field.type === "textarea" ? (
        <textarea
          id={field.id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          rows={3}
          className={`${inputClass} resize-y min-h-[88px]`}
        />
      ) : (
        <input
          id={field.id}
          type={field.type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={inputClass}
        />
      )}
    </div>
  );
}

function OptionsInput({
  field,
  value,
  onChange,
}: {
  field: OptionsFieldDef;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <FieldLabel label={field.label} optional={field.optional} help={field.help} />
      <div className="flex flex-wrap gap-2">
        {field.options.map((option) => {
          const active = value === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(active ? "" : option)}
              className={`rounded-full border px-4 py-2 text-[13px] transition ${
                active
                  ? "border-[hsl(270,100%,60%)] bg-[hsl(270,100%,60%)]/15 text-white"
                  : "border-white/10 bg-white/[0.03] text-white/60 hover:border-white/25 hover:text-white/80"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CheckboxInput({
  label,
  help,
  checked,
  onChange,
}: {
  label: string;
  help?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <span
        className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border transition ${
          checked
            ? "border-[hsl(270,100%,60%)] bg-[hsl(270,100%,60%)]"
            : "border-white/20 bg-white/[0.03]"
        }`}
      >
        {checked && (
          <svg viewBox="0 0 12 12" className="h-3 w-3 text-white" fill="none">
            <path
              d="M2.5 6.5L5 9L9.5 3.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="text-[13px] leading-snug text-white/70">
        {label}
        {help && <span className="mt-1 block text-[12px] text-white/40">{help}</span>}
      </span>
    </label>
  );
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function FilesInput({
  label,
  help,
  optional,
  accept,
  files,
  onChange,
}: {
  label: string;
  help?: string;
  optional?: boolean;
  accept?: string;
  files: UploadedFile[];
  onChange: (updater: (prev: UploadedFile[]) => UploadedFile[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(0);
  const [error, setError] = useState<string | null>(null);

  async function handleSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (selected.length === 0) return;
    setError(null);
    setUploading((n) => n + selected.length);
    for (const file of selected) {
      try {
        const uploaded = await uploadFileToStorage(file);
        onChange((prev) => [...prev, uploaded]);
      } catch {
        setError(`No se pudo subir "${file.name}". Inténtalo de nuevo.`);
      } finally {
        setUploading((n) => Math.max(0, n - 1));
      }
    }
  }

  return (
    <div>
      <FieldLabel label={label} optional={optional} help={help} />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-4 py-5 text-[13px] text-white/55 transition hover:border-[hsl(270,100%,60%)]/60 hover:text-white/80"
      >
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none">
          <path
            d="M10 4v12M4 10h12"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
        {uploading > 0 ? `Subiendo ${uploading}...` : "Subir archivos"}
      </button>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={accept}
        onChange={handleSelect}
        className="hidden"
      />
      {error && <p className="mt-2 text-[12px] text-red-400">{error}</p>}
      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((file, index) => (
            <li
              key={`${file.objectPath}-${index}`}
              className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2"
            >
              <span className="truncate text-[13px] text-white/75">
                {file.name}
                <span className="ml-2 text-[11px] text-white/35">
                  {formatSize(file.size)}
                </span>
              </span>
              <button
                type="button"
                onClick={() =>
                  onChange((prev) => prev.filter((_, i) => i !== index))
                }
                className="flex-shrink-0 text-[12px] text-white/40 transition hover:text-red-400"
              >
                Quitar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function RevealInput({
  field,
  values,
  setValue,
}: {
  field: RevealFieldDef;
  values: Values;
  setValue: (id: string, value: unknown) => void;
}) {
  const enabled = values[field.id] === true;
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <div className="flex items-center justify-between gap-4">
        <span className="text-[13px] font-medium text-white/85">{field.label}</span>
        <div className="flex flex-shrink-0 gap-2">
          {[
            { label: "Sí", val: true },
            { label: "No", val: false },
          ].map((opt) => {
            const active = values[field.id] === opt.val;
            return (
              <button
                key={opt.label}
                type="button"
                onClick={() => setValue(field.id, opt.val)}
                className={`rounded-full border px-4 py-1.5 text-[13px] transition ${
                  active
                    ? "border-[hsl(270,100%,60%)] bg-[hsl(270,100%,60%)]/15 text-white"
                    : "border-white/10 bg-white/[0.03] text-white/55 hover:border-white/25"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
      {enabled && (
        <div className="mt-4 space-y-4 border-t border-white/10 pt-4">
          {field.fields.map((sub) => (
            <FlatFieldRenderer
              key={sub.id}
              field={sub}
              values={values}
              setValue={setValue}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function RepeatableInput({
  field,
  values,
  setValue,
}: {
  field: RepeatableFieldDef;
  values: Values;
  setValue: (id: string, value: unknown) => void;
}) {
  const rows = (Array.isArray(values[field.id])
    ? (values[field.id] as Record<string, string>[])
    : []) as Record<string, string>[];

  function updateRow(index: number, fieldId: string, value: string) {
    const next = rows.map((row, i) =>
      i === index ? { ...row, [fieldId]: value } : row,
    );
    setValue(field.id, next);
  }

  function addRow() {
    setValue(field.id, [...rows, {}]);
  }

  function removeRow(index: number) {
    setValue(
      field.id,
      rows.filter((_, i) => i !== index),
    );
  }

  return (
    <div>
      <FieldLabel label={field.label} optional={field.optional} help={field.help} />
      <div className="space-y-4">
        {rows.map((row, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[12px] font-medium uppercase tracking-wide text-[hsl(270,100%,72%)]">
                {field.itemLabel} {index + 1}
              </span>
              <button
                type="button"
                onClick={() => removeRow(index)}
                className="text-[12px] text-white/40 transition hover:text-red-400"
              >
                Quitar
              </button>
            </div>
            <div className="space-y-4">
              {field.fields.map((sub) => (
                <TextLikeOrOptions
                  key={sub.id}
                  field={sub}
                  value={row[sub.id] ?? ""}
                  onChange={(v) => updateRow(index, sub.id, v)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addRow}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-4 py-3 text-[13px] text-white/60 transition hover:border-[hsl(270,100%,60%)]/60 hover:text-white/85"
      >
        + {field.addLabel ?? "Añadir"}
      </button>
    </div>
  );
}

function TextLikeOrOptions({
  field,
  value,
  onChange,
}: {
  field: TextFieldDef | OptionsFieldDef;
  value: string;
  onChange: (v: string) => void;
}) {
  if (field.type === "options") {
    return <OptionsInput field={field} value={value} onChange={onChange} />;
  }
  return <TextLikeField field={field} value={value} onChange={onChange} />;
}

function FlatFieldRenderer({
  field,
  values,
  setValue,
}: {
  field: FlatFieldDef;
  values: Values;
  setValue: (id: string, value: unknown) => void;
}) {
  switch (field.type) {
    case "files":
      return (
        <FilesInput
          label={field.label}
          help={field.help}
          optional={field.optional}
          accept={field.accept}
          files={(values[field.id] as UploadedFile[]) ?? []}
          onChange={(updater) =>
            setValue(field.id, (prev: unknown) =>
              updater((prev as UploadedFile[]) ?? []),
            )
          }
        />
      );
    case "checkbox":
      return (
        <CheckboxInput
          label={field.label}
          help={field.help}
          checked={values[field.id] === true}
          onChange={(v) => setValue(field.id, v)}
        />
      );
    case "options":
      return (
        <OptionsInput
          field={field}
          value={(values[field.id] as string) ?? ""}
          onChange={(v) => setValue(field.id, v)}
        />
      );
    default:
      return (
        <TextLikeField
          field={field}
          value={(values[field.id] as string) ?? ""}
          onChange={(v) => setValue(field.id, v)}
        />
      );
  }
}

export function FieldRenderer({ field, values, setValue }: FieldProps) {
  if (field.type === "reveal") {
    return <RevealInput field={field} values={values} setValue={setValue} />;
  }
  if (field.type === "repeatable") {
    return <RepeatableInput field={field} values={values} setValue={setValue} />;
  }
  return <FlatFieldRenderer field={field} values={values} setValue={setValue} />;
}
