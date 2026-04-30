import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, Loader2, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormData {
  businessName: string;
  contact: string;
  hasWebsite: string;
  message: string;
}

const questions = [
  {
    id: "businessName",
    label: "¿Cómo se llama tu negocio?",
    placeholder: "Ej: Restaurante Sa Caleta...",
    type: "text" as const,
  },
  {
    id: "contact",
    label: "¿Dónde te contactamos?",
    description: "Déjanos tu teléfono o email para que podamos responderte.",
    placeholder: "Ej: 612 345 678 o tu@email.com",
    type: "text" as const,
  },
  {
    id: "hasWebsite",
    label: "¿Tienes ya una web?",
    type: "options" as const,
    options: ["Sí, pero quiero cambiarla", "No, empiezo de cero", "Tengo redes sociales"],
  },
  {
    id: "message",
    label: "Cuéntanos un poco qué quieres",
    description: "Una idea rápida está perfecto (opcional). Lo concretamos juntos después.",
    placeholder: "Quiero una web para mi restaurante con reservas, carta y SEO local...",
    type: "textarea" as const,
    optional: true,
  },
];

export function ContactForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    businessName: "",
    contact: "",
    hasWebsite: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const currentQuestion = questions[step];
  const isLastStep = step === questions.length - 1;

  const submitForm = async (data: FormData) => {
    setIsSubmitting(true);
    setErrorMsg("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const payload = await response.json();
        throw new Error(payload.message || "Error al enviar");
      }

      setIsSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || "Error al enviar. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (isLastStep) {
      submitForm(formData);
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && currentQuestion.type === "text") {
      e.preventDefault();
      handleNext();
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg mx-auto bg-black/40 backdrop-blur-md border border-[hsl(270,100%,60%)]/30 p-12 rounded-2xl text-center"
      >
        <div className="w-20 h-20 bg-[hsl(270,100%,60%)]/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-[hsl(270,100%,60%)]" />
        </div>
        <h3 className="text-3xl font-display font-bold mb-4">¡Recibido!</h3>
        <p className="text-white/60 mb-8">
          Hemos recibido tu información. Nos pondremos en contacto contigo pronto.
        </p>
        <button
          onClick={() => {
            setIsSuccess(false);
            setStep(0);
            setFormData({ businessName: "", contact: "", hasWebsite: "", message: "" });
          }}
          className="text-sm text-[hsl(270,100%,60%)] hover:text-white transition-colors"
        >
          Enviar otra consulta
        </button>
      </motion.div>
    );
  }

  const currentValue = formData[currentQuestion.id as keyof FormData];

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="mb-8 flex items-center justify-between px-2">
        <span className="text-xs font-mono text-[hsl(270,100%,60%)] uppercase tracking-widest">
          Paso {step + 1} / {questions.length}
        </span>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1 w-8 rounded-full transition-all duration-500",
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
          transition={{ duration: 0.3 }}
          className="min-h-[300px] flex flex-col"
        >
          <h3
            id={`question-label-${currentQuestion.id}`}
            className="text-2xl md:text-3xl font-display font-bold mb-2 text-white"
          >
            {currentQuestion.label}
          </h3>

          {currentQuestion.description && (
            <p className="text-white/50 mb-6 text-sm">{currentQuestion.description}</p>
          )}

          <div className="mt-4 flex-1">
            {currentQuestion.type === "text" && (
              <input
                autoFocus
                type="text"
                value={currentValue}
                onChange={(e) =>
                  setFormData({ ...formData, [currentQuestion.id]: e.target.value })
                }
                onKeyDown={handleKeyDown}
                placeholder={currentQuestion.placeholder}
                aria-labelledby={`question-label-${currentQuestion.id}`}
                data-testid={`input-${currentQuestion.id}`}
                className="w-full bg-transparent border-b-2 border-white/10 focus:border-[hsl(270,100%,60%)] py-4 text-xl md:text-2xl outline-none transition-colors placeholder:text-white/20"
              />
            )}

            {currentQuestion.type === "textarea" && (
              <textarea
                autoFocus
                rows={4}
                value={currentValue}
                onChange={(e) =>
                  setFormData({ ...formData, [currentQuestion.id]: e.target.value })
                }
                placeholder={currentQuestion.placeholder}
                aria-labelledby={`question-label-${currentQuestion.id}`}
                data-testid={`input-${currentQuestion.id}`}
                className="w-full bg-white/5 border border-white/10 focus:border-[hsl(270,100%,60%)] focus:bg-white/[0.07] rounded-lg px-4 py-3 text-base md:text-lg outline-none transition-colors placeholder:text-white/20 resize-none"
              />
            )}

            {currentQuestion.type === "options" && (
              <div className="flex flex-col gap-3">
                {currentQuestion.options?.map((option) => (
                  <button
                    key={option}
                    disabled={isSubmitting}
                    data-testid={`option-${currentQuestion.id}-${option.slice(0, 10)}`}
                    onClick={() => {
                      const nextData = { ...formData, [currentQuestion.id]: option };
                      setFormData(nextData);
                      if (isLastStep) {
                        submitForm(nextData);
                      } else {
                        setStep((prev) => prev + 1);
                      }
                    }}
                    className={cn(
                      "text-left p-4 rounded-lg border transition-all duration-300 hover:scale-[1.02]",
                      currentValue === option
                        ? "bg-[hsl(270,100%,60%)]/20 border-[hsl(270,100%,60%)] text-white"
                        : "bg-white/5 border-white/10 hover:border-[hsl(270,100%,60%)] hover:bg-white/10 text-white/70",
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {errorMsg && <p className="text-red-400 text-sm mt-4">{errorMsg}</p>}

          {currentQuestion.type !== "options" && (
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleNext}
                disabled={(!currentValue && !("optional" in currentQuestion && currentQuestion.optional)) || isSubmitting}
                data-testid="button-form-next"
                className={cn(
                  "group flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300",
                  !currentValue && !("optional" in currentQuestion && currentQuestion.optional)
                    ? "opacity-50 cursor-not-allowed bg-white/10 text-white/30"
                    : "bg-[hsl(270,100%,60%)] text-white shadow-[0_0_20px_hsl(270,100%,60%)] hover:shadow-[0_0_30px_hsl(270,100%,60%)] hover:scale-105",
                )}
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : isLastStep ? (
                  <>
                    Enviar <Send className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Siguiente <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
