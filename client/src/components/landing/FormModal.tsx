import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

            <div className="relative z-10 p-5 md:p-8">
              <LeadForm onSuccess={closeForm} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
