import { FadeIn } from "../layout/FadeIn";
import { WhatsAppButton } from "../layout/WhatsAppButton";

const benefits = [
  {
    num: "01",
    title: "Más clientes reales",
    desc: "Webs pensadas para convertir visitas en clientes. Diseño claro, mensaje directo, llamadas a la acción que funcionan.",
  },
  {
    num: "02",
    title: "Primeros en Google",
    desc: "SEO local en Menorca trabajado desde el código. Apareces cuando tu cliente busca, no cuando tienes suerte.",
  },
  {
    num: "03",
    title: "Confianza al instante",
    desc: "Diseño rápido, limpio y profesional. Tu web genera la mejor primera impresión en los primeros 3 segundos.",
  },
  {
    num: "04",
    title: "Una web 100% tuya",
    desc: "Sin plantillas ni sistemas cerrados. Pones lo que quieras, cambias cuando quieras, sin depender de nadie.",
  },
];

export function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="py-24 md:py-32 relative"
    >
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <FadeIn className="mb-14 max-w-3xl">
          <span className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-4">
            Lo que consigues
          </span>
          <h2
            id="process-title"
            className="text-3xl md:text-5xl font-display font-bold text-white leading-tight"
          >
            Una <strong>web que vende</strong>,{" "}
            <span className="text-white/40">no que decora.</span>
          </h2>
        </FadeIn>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-white/10 pt-12 list-none p-0 m-0">
          {benefits.map((b, i) => (
            <li key={b.num} className="group">
              <FadeIn delay={i * 0.1} direction="up">
                <span
                  className="block text-6xl md:text-7xl font-display font-bold text-white/14 group-hover:text-[hsl(270,100%,60%)]/45 transition-colors duration-500 mb-4"
                  aria-hidden="true"
                >
                  {b.num}
                </span>
                <h3 className="text-xl md:text-2xl font-display font-bold mb-3 text-white">
                  {b.title}
                </h3>
                <p className="text-white/55 text-sm leading-relaxed">{b.desc}</p>
              </FadeIn>
            </li>
          ))}
        </ol>

        <FadeIn delay={0.2}>
          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 pt-10 border-t border-white/10">
            <p className="text-white/50 text-sm">
              ¿Quieres esto para tu negocio?
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                data-testid="link-benefits-contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-black text-sm font-bold rounded-sm hover:scale-[1.02] transition-all"
              >
                Empieza tu proyecto
              </a>
              <WhatsAppButton
                variant="outline"
                label="WhatsApp directo"
                testId="link-benefits-whatsapp"
              />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
