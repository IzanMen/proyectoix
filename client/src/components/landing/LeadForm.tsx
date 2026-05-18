import { useState, useRef, useEffect, useMemo } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Loader2,
  Send,
  PartyPopper,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FormData {
  business: string;
  hasWebsite: string;
  websiteUrl: string;
  goal: string;
  budget: string;
  whatsapp: string;
}

type Question =
  | {
      id: keyof FormData;
      label: string;
      description?: string;
      type: "text" | "tel" | "url";
      placeholder: string;
    }
  | {
      id: keyof FormData;
      label: string;
      description?: string;
      type: "options";
      options: string[];
    };

const BASE_QUESTIONS: Question[] = [
  {
    id: "business",
    label: "¿Cómo se llama tu negocio y a qué te dedicas?",
    description: "Una frase corta nos vale.",
    type: "text",
    placeholder: "Ej: Restaurante Sa Caleta, comida menorquina en Ciutadella",
  },
  {
    id: "hasWebsite",
    label: "¿Tienes web actualmente?",
    type: "options",
    options: ["Sí, tengo web", "No, no tengo web"],
  },
  {
    id: "goal",
    label: "¿Qué objetivo buscas con tu web?",
    type: "options",
    options: [
      "Que los clientes me llamen o escriban",
      "Que hagan una reserva",
      "Que compren un producto",
      "No lo tengo claro",
    ],
  },
  {
    id: "budget",
    label: "¿Cuánto estás dispuesto a invertir en tu web?",
    description: "Solo para hacernos una idea. No es vinculante.",
    type: "options",
    options: ["500 - 800 €", "800 - 1.200 €", "1.200 - 2.000 €", "+ de 2.000 €"],
  },
  {
    id: "whatsapp",
    label: "¿Cuál es tu número de WhatsApp?",
    description: "Te escribiremos aquí con nuestra propuesta.",
    type: "tel",
    placeholder: "612 345 678",
  },
];

const URL_QUESTION: Question = {
  id: "websiteUrl",
  label: "¿Cuál es la URL de tu web?",
  description: "Así podemos verla antes de hablar contigo.",
  type: "url",
  placeholder: "Ej: www.mirestaurante.com",
};

// Acepta un único móvil español: 9 dígitos empezando por 6 o 7.
const normalizePhone = (value: string) => value.replace(/\D/g, "");
const isValidPhone = (value: string) => /^[67]\d{8}$/.test(normalizePhone(value));
const formatPhone = (digits: string) => {
  const d = digits.slice(0, 9);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)} ${d.slice(3)}`;
  return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`;
};

export function LeadForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>({
    business: "",
    hasWebsite: "",
    websiteUrl: "",
    goal: "",
    budget: "",
    whatsapp: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeQuestions = useMemo(() => {
    if (data.hasWebsite === "Sí, tengo web") {
      const idx = BASE_QUESTIONS.findIndex((q) => q.id === "hasWebsite");
      const qs = [...BASE_QUESTIONS];
      qs.splice(idx + 1, 0, URL_QUESTION);
      return qs;
    }
    return BASE_QUESTIONS;
  }, [data.hasWebsite]);

  const current = activeQuestions[step] ?? activeQuestions[activeQuestions.length - 1];
  const isLast = step === activeQuestions.length - 1;
  const value = data[current.id];

  useEffect(() => {
    if (hasInteracted && inputRef.current) {
      inputRef.current.focus();
    }
  }, [step, hasInteracted]);

  const submit = async (final: FormData) => {
    setSubmitting(true);
    setErrorMsg("");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: final.business,
          hasWebsite: final.hasWebsite,
          ...(final.websiteUrl ? { websiteUrl: final.websiteUrl } : {}),
          goal: final.goal,
          budget: final.budget,
          contact: `+34 ${final.whatsapp}`.trim(),
          privacyAccepted: true,
          policyVersion: "2026-05",
          acceptedAt: new Date().toISOString(),
        }),
      });
      if (!r.ok) {
        const p = await r.json().catch(() => ({}));
        throw new Error(p.message || "Error al enviar");
      }
      setSuccess(true);
    } catch (e: any) {
      setErrorMsg(e.message || "Error al enviar. Inténtalo de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  const next = () => {
    if (!hasInteracted) setHasInteracted(true);
    if (current.id === "whatsapp") {
      if (!isValidPhone(data.whatsapp)) {
        setPhoneError("Introduce un número de WhatsApp válido.");
        return;
      }
      setPhoneError("");
    }
    if (isLast) {
      if (!privacy) return;
      submit(data);
    } else {
      setStep((p) => p + 1);
    }
  };

  const back = () => {
    if (step > 0) setStep((p) => p - 1);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey &&
      (current.type === "text" || current.type === "tel")
    ) {
      e.preventDefault();
      next();
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-[hsl(270,100%,60%)]/40 bg-gradient-to-b from-[hsl(270,100%,60%)]/[0.08] to-transparent p-10 md:p-14 text-center"
        data-testid="form-success"
      >
        <div className="w-20 h-20 rounded-full bg-[hsl(270,100%,60%)]/15 border border-[hsl(270,100%,60%)]/40 flex items-center justify-center mx-auto mb-6">
          <PartyPopper className="w-10 h-10 text-[hsl(270,100%,80%)]" />
        </div>
        <h3 className="text-3xl md:text-4xl font-display font-bold text-white">
          ¡Perfecto!
        </h3>
        <p className="mt-4 text-white/70 text-base md:text-lg leading-relaxed max-w-md mx-auto">
          Te escribimos dentro de poco.
          <br className="hidden sm:block" /> Estate atento a tu WhatsApp.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6 md:p-10">
      <div className="mb-8 flex items-center justify-between">
        <span className="text-[11px] font-mono text-[hsl(270,100%,75%)] uppercase tracking-widest">
          Pregunta {step + 1} / {activeQuestions.length}
        </span>
        <div className="flex gap-1">
          {activeQuestions.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1 w-7 rounded-full transition-all duration-500",
                i <= step ? "bg-[hsl(270,100%,60%)]" : "bg-white/10",
              )}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="min-h-[280px] flex flex-col"
        >
          <h3
            id={`q-${current.id}`}
            className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white leading-tight"
          >
            {current.label}
          </h3>
          {current.description && (
            <p className="mt-2 text-white/50 text-sm">{current.description}</p>
          )}

          <div className="mt-6 flex-1">
            {current.type === "tel" && (
              <>
                <div
                  className={cn(
                    "flex items-stretch border-b-2 transition-colors",
                    phoneError
                      ? "border-red-400/60"
                      : "border-white/10 focus-within:border-[hsl(270,100%,60%)]",
                  )}
                >
                  <span
                    className="inline-flex items-center pr-3 mr-3 border-r border-white/10 text-white/55 text-lg md:text-xl font-mono select-none"
                    aria-hidden="true"
                  >
                    +34
                  </span>
                  <input
                    ref={inputRef}
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    pattern="[0-9 ]*"
                    maxLength={11}
                    value={value}
                    onFocus={() => {
                      if (!hasInteracted) setHasInteracted(true);
                    }}
                    onChange={(e) => {
                      if (!hasInteracted) setHasInteracted(true);
                      const digits = normalizePhone(e.target.value).slice(0, 9);
                      setData({ ...data, whatsapp: formatPhone(digits) });
                      if (phoneError) setPhoneError("");
                    }}
                    onKeyDown={onKey}
                    placeholder={current.placeholder}
                    aria-labelledby={`q-${current.id}`}
                    aria-describedby={`hint-${current.id}`}
                    aria-invalid={!!phoneError}
                    data-testid={`input-${current.id}`}
                    className="flex-1 bg-transparent py-3 text-lg md:text-xl outline-none placeholder:text-white/20 tracking-wide"
                  />
                </div>
                <p
                  id={`hint-${current.id}`}
                  className="mt-2 text-white/40 text-xs"
                >
                  Móvil español: 9 dígitos, empieza por 6 o 7.
                </p>
                {phoneError && (
                  <p
                    className="text-red-300 text-sm mt-2"
                    data-testid="text-phone-error"
                    role="alert"
                  >
                    {phoneError}
                  </p>
                )}
              </>
            )}

            {(current.type === "text" || current.type === "url") && (
              <>
                <input
                  ref={inputRef}
                  type={current.type === "url" ? "url" : "text"}
                  inputMode={current.type === "url" ? "url" : "text"}
                  autoComplete={current.type === "url" ? "url" : "off"}
                  value={value}
                  onFocus={() => {
                    if (!hasInteracted) setHasInteracted(true);
                  }}
                  onChange={(e) => {
                    if (!hasInteracted) setHasInteracted(true);
                    setData({ ...data, [current.id]: e.target.value });
                  }}
                  onKeyDown={onKey}
                  placeholder={current.placeholder}
                  aria-labelledby={`q-${current.id}`}
                  data-testid={`input-${current.id}`}
                  className="w-full bg-transparent border-b-2 border-white/10 focus:border-[hsl(270,100%,60%)] py-3 text-lg md:text-xl outline-none transition-colors placeholder:text-white/20"
                />
              </>
            )}

            {current.type === "options" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {current.options.map((opt) => {
                  const selected = value === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      disabled={submitting}
                      data-testid={`option-${current.id}-${opt.slice(0, 12).replace(/\s+/g, "-")}`}
                      onClick={() => {
                        if (!hasInteracted) setHasInteracted(true);
                        // If user switches hasWebsite to "No", clear any stored URL
                        const nd: FormData = {
                          ...data,
                          [current.id]: opt,
                          ...(current.id === "hasWebsite" && opt !== "Sí, tengo web"
                            ? { websiteUrl: "" }
                            : {}),
                        };
                        setData(nd);
                        if (!isLast) {
                          setTimeout(() => setStep((p) => p + 1), 180);
                        }
                      }}
                      className={cn(
                        "text-left p-4 rounded-lg border transition-all duration-200",
                        selected
                          ? "bg-[hsl(270,100%,60%)]/15 border-[hsl(270,100%,60%)] text-white"
                          : "bg-white/[0.02] border-white/10 hover:border-[hsl(270,100%,60%)]/60 hover:bg-white/[0.04] text-white/80",
                      )}
                    >
                      <span className="inline-flex items-center gap-2.5">
                        <span
                          className={cn(
                            "w-4 h-4 rounded-full border flex items-center justify-center shrink-0",
                            selected
                              ? "border-[hsl(270,100%,60%)] bg-[hsl(270,100%,60%)]"
                              : "border-white/30",
                          )}
                        >
                          {selected && (
                            <Check className="w-2.5 h-2.5 text-white" />
                          )}
                        </span>
                        <span className="text-sm md:text-base">{opt}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {errorMsg && (
            <p className="text-red-300 text-sm mt-4" role="alert">
              {errorMsg}
            </p>
          )}

          {isLast && (
            <div className="mt-6">
              <label
                className="flex items-start gap-2.5 cursor-pointer"
                data-testid="label-privacy"
              >
                <input
                  type="checkbox"
                  checked={privacy}
                  onChange={(e) => setPrivacy(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/5 accent-[hsl(270,100%,60%)] cursor-pointer shrink-0"
                  data-testid="checkbox-privacy"
                  required
                />
                <span className="text-white/55 text-xs leading-relaxed">
                  He leído y acepto la{" "}
                  <Link
                    href="/politica-privacidad"
                    className="underline text-white/80 hover:text-white"
                    data-testid="link-form-privacy"
                  >
                    política de privacidad
                  </Link>
                  .
                </span>
              </label>
            </div>
          )}

          <div className="mt-7 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={back}
              disabled={step === 0 || submitting}
              data-testid="button-back"
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-2 text-sm rounded-full transition-colors",
                step === 0
                  ? "opacity-30 cursor-not-allowed text-white/40"
                  : "text-white/65 hover:text-white",
              )}
            >
              <ChevronLeft className="w-4 h-4" />
              Atrás
            </button>

            {(current.type === "text" ||
              current.type === "tel" ||
              current.type === "url" ||
              isLast) && (
              <button
                type="button"
                onClick={next}
                disabled={
                  submitting ||
                  (!value && current.type !== "options") ||
                  (isLast && !privacy)
                }
                data-testid="button-next"
                className={cn(
                  "group inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300",
                  (!value && current.type !== "options") ||
                    (isLast && !privacy) ||
                    submitting
                    ? "opacity-50 cursor-not-allowed bg-white/10 text-white/40"
                    : "bg-[hsl(270,100%,60%)] text-white shadow-[0_0_25px_-4px_hsl(270,100%,60%)] hover:shadow-[0_0_40px_-2px_hsl(270,100%,60%)] hover:scale-[1.02]",
                )}
              >
                {submitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : isLast ? (
                  <>
                    Enviar <Send className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Siguiente
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
