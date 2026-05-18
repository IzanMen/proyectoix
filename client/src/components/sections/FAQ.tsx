import { useState } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "../layout/FadeIn";

export const faqs = [
  {
    question: "¿Trabajáis solo con negocios de Menorca?",
    answer:
      "Trabajamos sobre todo con negocios de Menorca (Maó, Ciutadella, Alaior, Es Mercadal, Ferreries, Sant Lluís) porque conocer la isla nos permite entender mejor a tu cliente final. Aún así, aceptamos proyectos de Baleares y de España de forma puntual.",
  },
  {
    question: "¿Cuánto cuesta una web en Proyecto IX?",
    answer:
      "Cada web es a medida: el precio depende de los objetivos. Trabajamos con presupuestos cerrados y transparentes desde la primera reunión. Rellena el formulario para recibir tu presupuesto.",
  },
  {
    question: "¿Cuánto tarda en estar lista la web?",
    answer:
      "Entre 2 y 3 semanas, según contenido y funcionalidades. Antes de empezar te lo decimos.",
  },
  {
    question: "¿Hacéis SEO local para posicionar mi negocio en Google?",
    answer:
      "Sí. Cada web sale optimizada desde el primer día: estructura semántica, datos estructurados, rendimiento, contenido enfocado a búsquedas reales y SEO local en Menorca.",
  },
  {
    question: "¿Qué incluye exactamente vuestro servicio?",
    answer:
      "Diseño a medida, desarrollo con código limpio, optimización de Core Web Vitals, SEO técnico y on-page, integración con tus herramientas (formularios, email, analítica) y formación post-lanzamiento. Dependendiendo de el proyecto y tus objetivos, el servicio incluirá más o menos funcionalidades.",
  },
  {
    question: "¿Mantenéis la web una vez lanzada?",
    answer:
      "Sí. Realizamos actualizaciones, mejoras de rendimiento, ajustes de diseño y soporte cuando lo necesites. No desaparecemos al entregar.",
  },
  {
    question: "¿Por qué trabajáis con inteligencia artificial?",
    answer:
      "Porque de esta forma, recibes la web mucho más rápido. Además, cualquier cambio que quisieras hacer pre y post-lanzamiento, una agencia tradicional puede tardar semanas en realizarlo. Nosotros tardamos pocas horas desde que pides el cambio, hasta que se publica.",
  },
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="py-24 md:py-32 relative border-y border-white/5 bg-white/[0.02]"
    >
      <div className="w-full max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        <FadeIn className="mb-12">
          <span className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-4">
            Preguntas frecuentes
          </span>
          <h2
            id="faq-title"
            className="text-3xl md:text-5xl font-display font-bold text-white leading-tight"
          >
            Lo que <strong>nos preguntáis</strong>.
          </h2>
        </FadeIn>

        <FadeIn>
          <dl className="border-t border-white/10">
            {faqs.map((item, i) => {
              const open = openIdx === i;
              const panelId = `faq-panel-${i}`;
              const buttonId = `faq-button-${i}`;
              return (
                <div
                  key={item.question}
                  className="border-b border-white/10"
                  data-testid={`faq-item-${i}`}
                >
                  <dt>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenIdx(open ? null : i)}
                      data-testid={`button-faq-toggle-${i}`}
                      className="w-full flex items-start justify-between gap-6 py-5 md:py-6 text-left group rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(270,100%,60%)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      <span className="text-base md:text-lg font-display font-semibold text-white leading-snug">
                        {item.question}
                      </span>
                      <span
                        className={`mt-1 flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center text-base transition-all duration-300 ${
                          open
                            ? "border-[hsl(270,100%,60%)] text-[hsl(270,100%,75%)] rotate-45 bg-[hsl(270,100%,60%)]/10"
                            : "border-white/20 text-white/60 group-hover:border-white/50 group-hover:text-white"
                        }`}
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </button>
                  </dt>
                  <motion.dd
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!open}
                    initial={false}
                    animate={
                      open
                        ? { height: "auto", opacity: 1 }
                        : { height: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="text-white/65 text-sm md:text-base leading-relaxed pb-6 pr-10">
                      {item.answer}
                    </p>
                  </motion.dd>
                </div>
              );
            })}
          </dl>
        </FadeIn>
      </div>
    </section>
  );
}
