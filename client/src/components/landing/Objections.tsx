import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FadeIn } from "../layout/FadeIn";

const items = [
  {
    q: "Ya pagué una vez por una web y no quedé contento.",
    a: "Por eso la primera conversación es gratis y sin compromiso. Antes de hablar de dinero, te explicamos qué debe tener tu web y cómo lo haríamos. Si no te convence, no pasa nada.",
  },
  {
    q: "No sé si mi negocio necesita una web mejor.",
    a: "Si tienes un negocio y hay personas buscando lo que ofreces en Google, tu web es tu carta de presentación online. La pregunta no es si la necesitas. Es si la que tienes está bien construida.",
  },
  {
    q: "¿Podéis trabajar con mi tipo de negocio?",
    a: "Hemos trabajado con restaurantes, tiendas, servicios y profesionales independientes. Si tienes un negocio en Menorca, podemos ayudarte.",
  },
];

export function Objections() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      aria-labelledby="objections-title"
      className="relative py-24 md:py-32 overflow-hidden border-t border-white/5"
    >
      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-white/5 border border-white/10 text-white/65 text-[11px] tracking-widest uppercase">
              Preguntas frecuentes
            </span>
            <h2
              id="objections-title"
              className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-white leading-[1.1]"
            >
              Lo que puede que estés pensando ahora mismo.
            </h2>
          </div>
        </FadeIn>

        <div className="space-y-3">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={it.q}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className={`rounded-2xl border bg-white/[0.02] overflow-hidden transition-colors ${
                  isOpen
                    ? "border-[hsl(270,100%,60%)]/40"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`objection-panel-${i}`}
                  data-testid={`button-objection-${i}`}
                  className="w-full flex items-center justify-between gap-4 text-left p-5 md:p-6"
                >
                  <span className="text-white text-base md:text-lg font-medium leading-snug">
                    {it.q}
                  </span>
                  <span
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? "bg-[hsl(270,100%,60%)] text-white"
                        : "bg-white/5 text-white/60"
                    }`}
                    aria-hidden="true"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="panel"
                      id={`objection-panel-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 md:px-6 pb-5 md:pb-6 text-white/65 text-sm md:text-base leading-relaxed">
                        {it.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
