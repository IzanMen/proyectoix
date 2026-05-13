import { motion } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";
import { FadeIn } from "../layout/FadeIn";

interface CaseItem {
  type: string;
  client: string;
  before: string;
  after: string;
  hadWeb: boolean;
}

const cases: CaseItem[] = [
  {
    type: "Restaurante en Ciutadella",
    client: "[Cliente 1]",
    before: "Web lenta, sin mensaje claro y sin botón de reserva visible.",
    after:
      "Web rápida, moderna y con la reserva accesible desde el primer segundo.",
    hadWeb: true,
  },
  {
    type: "Tienda en Maó",
    client: "[Cliente 2]",
    before: "No tenía web. Solo Instagram y WhatsApp.",
    after:
      "Web profesional con catálogo, contacto directo y posicionamiento en Google.",
    hadWeb: false,
  },
  {
    type: "Servicio profesional",
    client: "[Cliente 3]",
    before: "Web antigua que daba más desconfianza que confianza.",
    after:
      "Imagen sólida, mensaje claro y formulario que filtra el cliente ideal.",
    hadWeb: true,
  },
];

export function BeforeAfter() {
  return (
    <section
      aria-labelledby="cases-title"
      className="relative py-24 md:py-32 overflow-hidden border-t border-white/5"
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-white/5 border border-white/10 text-white/65 text-[11px] tracking-widest uppercase">
              Trabajos reales
            </span>
            <h2
              id="cases-title"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-white leading-[1.05]"
            >
              Webs que hemos construido.
            </h2>
            <p className="mt-4 text-white/60 text-base md:text-lg">
              Probablemente conoces alguno de estos negocios.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {cases.map((c, i) => (
            <motion.article
              key={c.client}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] overflow-hidden hover:border-[hsl(270,100%,60%)]/40 transition-colors"
              data-testid={`card-case-${i}`}
            >
              <div className="px-6 pt-6 pb-4 border-b border-white/5">
                <p className="text-[11px] font-mono uppercase tracking-widest text-[hsl(270,100%,75%)]">
                  {c.type}
                </p>
                <h3 className="mt-1 text-xl font-display font-bold text-white">
                  {c.client}
                </h3>
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 mb-2 px-2 py-0.5 rounded-full bg-red-500/10 border border-red-400/20 text-[10px] font-mono uppercase tracking-widest text-red-300">
                    <X className="w-3 h-3" />
                    {c.hadWeb ? "Antes" : "Antes (sin web)"}
                  </div>
                  <p className="text-sm text-white/55 leading-relaxed">
                    {c.before}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-white/30">
                  <span className="h-px flex-1 bg-white/10" />
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span className="h-px flex-1 bg-white/10" />
                </div>

                <div>
                  <div className="inline-flex items-center gap-1.5 mb-2 px-2 py-0.5 rounded-full bg-[hsl(270,100%,60%)]/10 border border-[hsl(270,100%,60%)]/30 text-[10px] font-mono uppercase tracking-widest text-[hsl(270,100%,80%)]">
                    <Check className="w-3 h-3" />
                    Después
                  </div>
                  <p className="text-sm text-white/85 leading-relaxed">
                    {c.after}
                  </p>
                </div>
              </div>

              <div
                className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[hsl(270,100%,60%)]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                aria-hidden="true"
              />
            </motion.article>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <p className="mt-14 text-center text-white/65 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Hoy estos negocios proyectan una imagen{" "}
            <span className="text-white">más profesional</span>, generan{" "}
            <span className="text-white">más confianza</span> y reciben más
            consultas sin tener que perseguir a nadie.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
