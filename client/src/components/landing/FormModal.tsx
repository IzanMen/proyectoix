import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useFormModal } from "@/lib/formModal";
import { LeadForm } from "./LeadForm";

export function FormModal() {
  const { isOpen, closeForm } = useFormModal();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeForm();
    };
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, closeForm]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Cuéntanos tu caso"
          onClick={(e) => { if (e.target === e.currentTarget) closeForm(); }}
        >
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" aria-hidden="true" />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-xl max-h-[90svh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)]"
          >
            <div className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[hsl(270,100%,60%)]/8 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 p-6 md:p-10">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-widest text-[hsl(270,100%,75%)] mb-1">
                    El paso que importa
                  </p>
                  <h2 className="text-xl md:text-2xl font-display font-bold text-white leading-tight">
                    Cuéntanos tu caso.
                  </h2>
                  <p className="mt-1 text-white/50 text-sm">
                    5 preguntas · menos de 1 minuto · te respondemos por WhatsApp.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeForm}
                  data-testid="button-close-modal"
                  aria-label="Cerrar formulario"
                  className="shrink-0 ml-4 w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center text-white/60 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <LeadForm onSuccess={closeForm} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
