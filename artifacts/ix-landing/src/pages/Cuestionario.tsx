import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import { useSeo } from "@/lib/useSeo";
import { FieldRenderer } from "@/components/cuestionario/Fields";
import { buildPayload } from "@/components/cuestionario/buildPayload";
import { sections, POLICY_VERSION } from "@/components/cuestionario/config";
import type { FieldDef, FlatFieldDef } from "@/components/cuestionario/types";

const STORAGE_KEY = "ix-cuestionario-v1";

type Values = Record<string, unknown>;

function isFlatRequiredMissing(field: FlatFieldDef, values: Values): boolean {
  if (field.optional) return false;
  if (field.type === "files" || field.type === "checkbox") return false;
  const value = values[field.id];
  return typeof value !== "string" || value.trim().length === 0;
}

function sectionHasMissingRequired(fields: FieldDef[], values: Values): boolean {
  for (const field of fields) {
    if (field.type === "reveal") {
      if (values[field.id] === true) {
        for (const sub of field.fields) {
          if (isFlatRequiredMissing(sub, values)) return true;
        }
      }
      continue;
    }
    if (field.type === "repeatable") continue;
    if (isFlatRequiredMissing(field, values)) return true;
  }
  return false;
}

export default function Cuestionario() {
  useSeo({
    title: "Cuestionario de inicio · Proyecto IX",
    description: "Cuestionario privado para clientes de Proyecto IX.",
    canonical: "https://proyectoix.com/brief/9k3a7q2x5m",
    noIndex: true,
  });

  const totalSteps = sections.length;

  const [hydrated] = useState<{ values?: Values; step?: number }>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as { values?: Values; step?: number };
    } catch {
      // ignore corrupt storage
    }
    return {};
  });

  const [step, setStep] = useState(() =>
    typeof hydrated.step === "number"
      ? Math.min(Math.max(hydrated.step, 0), totalSteps)
      : 0,
  );
  const [values, setValues] = useState<Values>(() => hydrated.values ?? {});
  const [accepted, setAccepted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [showValidation, setShowValidation] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ values, step }));
    } catch {
      // ignore quota errors
    }
  }, [values, step]);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const setValue = (id: string, value: unknown) =>
    setValues((prev) => ({
      ...prev,
      [id]:
        typeof value === "function"
          ? (value as (p: unknown) => unknown)(prev[id])
          : value,
    }));

  const isReview = step === totalSteps;
  const currentSection = !isReview ? sections[step] : null;
  const progress = Math.round(((step + 1) / (totalSteps + 1)) * 100);

  const filledSectionCount = useMemo(
    () => buildPayload(sections, values).sections.length,
    [values],
  );

  function goNext() {
    if (
      currentSection &&
      sectionHasMissingRequired(currentSection.fields, values)
    ) {
      setShowValidation(true);
      return;
    }
    setShowValidation(false);
    setStep((s) => Math.min(s + 1, totalSteps));
  }

  function goBack() {
    setShowValidation(false);
    setStep((s) => Math.max(s - 1, 0));
  }

  async function handleSubmit() {
    if (!accepted) {
      setShowValidation(true);
      return;
    }
    setStatus("sending");
    setErrorMsg("");
    try {
      const payload = buildPayload(sections, values);
      const res = await fetch("/api/cuestionario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          privacyAccepted: true,
          policyVersion: POLICY_VERSION,
          acceptedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { message?: string };
        throw new Error(data.message || "No se pudo enviar.");
      }
      localStorage.removeItem(STORAGE_KEY);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "No se pudo enviar el cuestionario. Inténtalo de nuevo.",
      );
    }
  }

  if (status === "success") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] px-5 text-white">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(270,100%,60%)]/15">
            <svg viewBox="0 0 24 24" className="h-8 w-8 text-[hsl(270,100%,72%)]" fill="none">
              <path
                d="M5 13l4 4L19 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="mb-3 text-2xl font-semibold">¡Cuestionario enviado!</h1>
          <p className="text-[15px] leading-relaxed text-white/55">
            Gracias por toda la información. La revisaremos y nos pondremos en
            contacto contigo muy pronto para los siguientes pasos.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block rounded-full bg-white px-6 py-3 text-[14px] font-medium text-black transition hover:bg-white/90"
          >
            Volver al inicio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div ref={topRef} />
      <div className="mx-auto max-w-2xl px-5 py-10 sm:py-14">
        <header className="mb-8">
          <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-[hsl(270,100%,72%)]">
            Proyecto IX
          </p>
          <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">
            Cuestionario de inicio
          </h1>
          <p className="mt-2 text-[14px] leading-relaxed text-white/50">
            Cuanta más información nos des, mejor será tu web. Tranquilo: casi
            todo es opcional y se guarda solo mientras avanzas.
          </p>
        </header>

        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-[12px] text-white/45">
            <span>
              {isReview
                ? "Último paso"
                : `Sección ${step + 1} de ${totalSteps}`}
            </span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-[hsl(270,100%,60%)] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {currentSection && (
          <section>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">{currentSection.title}</h2>
              {currentSection.intro && (
                <p className="mt-2 text-[14px] leading-relaxed text-white/50">
                  {currentSection.intro}
                </p>
              )}
              {currentSection.optionalSection && (
                <span className="mt-3 inline-block rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-white/45">
                  Sección opcional · puedes saltarla
                </span>
              )}
            </div>

            <div className="space-y-6">
              {currentSection.fields.map((field) => (
                <FieldRenderer
                  key={field.id}
                  field={field}
                  values={values}
                  setValue={setValue}
                />
              ))}
            </div>

            {showValidation &&
              sectionHasMissingRequired(currentSection.fields, values) && (
                <p className="mt-4 text-[13px] text-red-400">
                  Completa los campos obligatorios para continuar.
                </p>
              )}
          </section>
        )}

        {isReview && (
          <section>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Revisar y enviar</h2>
              <p className="mt-2 text-[14px] leading-relaxed text-white/50">
                Has completado{" "}
                <span className="text-white/80">
                  {filledSectionCount} de {totalSteps}
                </span>{" "}
                secciones. Puedes volver atrás para revisar o completar lo que
                quieras antes de enviar.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
              <label className="flex cursor-pointer items-start gap-3">
                <span
                  className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border transition ${
                    accepted
                      ? "border-[hsl(270,100%,60%)] bg-[hsl(270,100%,60%)]"
                      : "border-white/20 bg-white/[0.03]"
                  }`}
                >
                  {accepted && (
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
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                />
                <span className="text-[13px] leading-snug text-white/70">
                  He leído y acepto la{" "}
                  <Link
                    href="/politica-privacidad"
                    className="text-[hsl(270,100%,72%)] underline"
                  >
                    política de privacidad
                  </Link>{" "}
                  y autorizo el tratamiento de mis datos para gestionar mi
                  proyecto.
                </span>
              </label>
            </div>

            {showValidation && !accepted && (
              <p className="mt-4 text-[13px] text-red-400">
                Debes aceptar la política de privacidad para enviar.
              </p>
            )}
            {status === "error" && (
              <p className="mt-4 text-[13px] text-red-400">{errorMsg}</p>
            )}
          </section>
        )}

        <div className="mt-10 flex items-center justify-between gap-4">
          {step > 0 ? (
            <button
              type="button"
              onClick={goBack}
              disabled={status === "sending"}
              className="rounded-full border border-white/15 px-6 py-3 text-[14px] text-white/70 transition hover:border-white/30 hover:text-white disabled:opacity-40"
            >
              Atrás
            </button>
          ) : (
            <span />
          )}

          {!isReview ? (
            <button
              type="button"
              onClick={goNext}
              className="rounded-full bg-white px-7 py-3 text-[14px] font-medium text-black transition hover:bg-white/90"
            >
              {currentSection?.optionalSection ? "Siguiente / Saltar" : "Siguiente"}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={status === "sending"}
              className="rounded-full bg-[hsl(270,100%,60%)] px-7 py-3 text-[14px] font-medium text-white transition hover:bg-[hsl(270,100%,55%)] disabled:opacity-60"
            >
              {status === "sending" ? "Enviando..." : "Enviar cuestionario"}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
