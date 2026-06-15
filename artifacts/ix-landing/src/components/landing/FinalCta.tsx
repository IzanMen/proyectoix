import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "../layout/FadeIn";
import { useFormModal } from "@/lib/formModal";

export function FinalCta() {
  const { openForm } = useFormModal();

  return (
    <section
      aria-labelledby="final-cta-title"
      className="relative py-24 md:py-36 overflow-hidden border-t border-white/5"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[hsl(270,100%,60%)]/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 md:px-12 text-center">
        <FadeIn>
          <h2
            id="final-cta-title"
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-white leading-[1.1]"
          >
            Si llegaste hasta aquí, ya tienes todo lo que necesitas para{" "}
            <span className="bg-gradient-to-r from-[hsl(270,100%,75%)] to-white bg-clip-text text-transparent">
              decidir
            </span>
            .
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-6 text-white/65 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            La conversación es gratuita y no te compromete a nada. Si tiene
            sentido trabajar juntos, construimos exactamente lo que necesitas.
            Y si podemos, algo mejor.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <motion.button
            type="button"
            onClick={openForm}
            data-testid="link-final-cta"
            whileHover={{ scale: 1.02 }}
            className="mt-10 group inline-flex items-center justify-center gap-3 px-9 py-5 bg-[hsl(270,100%,60%)] text-white text-base md:text-lg font-bold tracking-tight rounded-sm hover:bg-[hsl(270,100%,65%)] transition-all duration-300 shadow-[0_0_50px_-8px_hsl(270,100%,60%)] hover:shadow-[0_0_70px_-6px_hsl(270,100%,60%)]"
          >
            Empezar ahora
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </FadeIn>
      </div>
    </section>
  );
}
