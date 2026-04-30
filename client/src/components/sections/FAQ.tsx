import { FadeIn } from "../layout/FadeIn";

export const faqs = [
  {
    question: "¿Trabajáis solo con negocios de Menorca?",
    answer:
      "Estamos en Maó y trabajamos sobre todo con negocios de Menorca (Maó, Ciutadella, Alaior, Es Mercadal, Ferreries, Sant Lluís) porque conocer la isla nos permite entender mejor a tu cliente final. Aceptamos también proyectos del resto de Baleares y de España de forma puntual cuando encajan.",
  },
  {
    question: "¿Cuánto cuesta una web en Proyecto IX?",
    answer:
      "Cada web es a medida, así que el precio depende del alcance y los objetivos de tu negocio. Trabajamos con presupuestos cerrados y transparentes desde la primera reunión, sin sorpresas. Te lo decimos antes de empezar y podemos darte una orquilla aproximada en cuanto nos cuentes el proyecto.",
  },
  {
    question: "¿Cuánto tarda en estar lista la web?",
    answer:
      "Una web bien construida suele tardar entre 3 y 6 semanas, dependiendo del contenido, las funcionalidades y la rapidez con la que recibimos tu material. Como integramos IA en el proceso de desarrollo, somos más rápidos que un estudio tradicional sin perder calidad ni control técnico.",
  },
  {
    question: "¿Hacéis SEO local para posicionar mi negocio en Google Menorca?",
    answer:
      "Sí. Cada web sale optimizada para SEO desde el primer día: estructura semántica, datos estructurados, rendimiento, contenido enfocado a las búsquedas reales de tus clientes y trabajo de SEO local para Menorca. No es un extra, va incluido en cada proyecto.",
  },
  {
    question: "¿También os ocupáis del marketing digital?",
    answer:
      "Sí, el desarrollo de la web es nuestro punto de partida pero ofrecemos estrategia digital, optimización para conversión y acompañamiento en marketing. La web es la herramienta más importante de tu negocio online; el resto del marketing se construye sobre ella.",
  },
  {
    question: "¿Qué incluye exactamente vuestro servicio?",
    answer:
      "Diseño a medida, desarrollo técnico con código limpio, optimización de rendimiento (Core Web Vitals), SEO técnico y on-page, integración con tus herramientas (formularios, email, analítica) y formación para que puedas gestionar la web tras el lanzamiento. Acompañamos durante y después.",
  },
  {
    question: "¿Mantenéis la web una vez lanzada?",
    answer:
      "Ofrecemos mantenimiento opcional: actualizaciones técnicas, mejoras de rendimiento, ajustes de diseño y soporte cuando lo necesites. Una web no es estática y nosotros tampoco desaparecemos al entregar el proyecto.",
  },
  {
    question: "¿Por qué trabajáis con inteligencia artificial?",
    answer:
      "Porque nos permite construir más rápido y con mayor precisión técnica que un estudio tradicional. La IA no sustituye nuestro criterio: lo amplifica. Cada decisión de diseño, cada línea de código y cada entrega pasa por nuestra revisión. El estándar lo marcamos nosotros.",
  },
];

export function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="py-32 relative border-y border-white/5 bg-white/[0.02]"
    >
      <div className="w-full max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        <FadeIn className="mb-16">
          <span className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-4">
            Preguntas frecuentes
          </span>
          <h2
            id="faq-title"
            className="text-3xl md:text-5xl font-display font-bold text-white leading-tight"
          >
            Lo que nos preguntáis.
          </h2>
        </FadeIn>

        <FadeIn>
          <dl className="border-t border-white/10">
            {faqs.map((item, i) => (
              <div
                key={item.question}
                className="py-7 border-b border-white/10"
                data-testid={`faq-item-${i}`}
              >
                <dt className="text-lg md:text-xl font-display font-semibold text-white leading-snug mb-3 pr-6">
                  {item.question}
                </dt>
                <dd className="text-white/65 text-sm md:text-base leading-relaxed">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </FadeIn>
      </div>
    </section>
  );
}
