import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useFormModal } from "@/lib/formModal";

export function StickyMobileCta() {
  const [visible, setVisible] = useState(false);
  const { openForm } = useFormModal();

  useEffect(() => {
    const hero = document.getElementById("top");

    const onScroll = () => {
      const scrolled = window.scrollY > (hero?.offsetHeight || 600) * 0.6;
      setVisible(scrolled);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t border-[hsl(270,100%,60%)]/30 bg-black/85 backdrop-blur-md"
          style={{
            paddingBottom: "env(safe-area-inset-bottom, 0px)",
          }}
        >
          <div className="px-4 py-3 flex items-center justify-between gap-3">
            <p className="text-white text-sm font-medium leading-tight">
              ¿Hablamos de tu web?
              <span className="block text-white/55 text-[11px] font-normal">
                5 preguntas · 1 minuto
              </span>
            </p>
            <button
              type="button"
              onClick={openForm}
              data-testid="link-sticky-cta"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[hsl(270,100%,60%)] text-white text-sm font-bold rounded-sm shadow-[0_0_20px_-4px_hsl(270,100%,60%)]"
            >
              Cuéntanos
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
