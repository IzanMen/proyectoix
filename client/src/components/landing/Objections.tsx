import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
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
  return (
    <section
      aria-labelledby="objections-title"
      className="relative py-24 md:py-32 overflow-hidden border-t border-white/5"
    >
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-white/5 border border-white/10 text-white/65 text-[11px] tracking-widest uppercase">
              Honestidad
            </span>
            <h2
              id="objections-title"
              className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-white leading-[1.1]"
            >
              Lo que probablemente estás pensando ahora mismo.
            </h2>
          </div>
        </FadeIn>

        <div className="space-y-4">
          {items.map((it, i) => (
            <motion.div
              key={it.q}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-7 hover:border-[hsl(270,100%,60%)]/30 transition-colors"
              data-testid={`card-objection-${i}`}
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-white text-base md:text-lg font-medium leading-snug">
                    {it.q}
                  </p>
                  <p className="mt-3 text-white/65 text-sm md:text-base leading-relaxed">
                    {it.a}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
