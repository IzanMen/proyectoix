import { FadeIn } from "../layout/FadeIn";

const steps = [
  {
    num: "01",
    title: "Escuchar",
    desc: "Antes de tocar nada, entendemos tu negocio, tu cliente y lo que quieres conseguir. La web viene después de tener eso claro.",
  },
  {
    num: "02",
    title: "Construir",
    desc: "Diseñamos y desarrollamos con IA integrada en el proceso. Más rápido, más preciso, sin perder el control técnico en ningún momento.",
  },
  {
    num: "03",
    title: "Lanzar",
    desc: "Publicamos cuando está listo de verdad. No antes. Y nos aseguramos de que salga posicionado desde el primer día.",
  },
  {
    num: "04",
    title: "Acompañar",
    desc: "El lanzamiento no es el final. Seguimos disponibles porque un negocio online no es estático.",
  },
];

export function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="py-32 relative"
    >
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <FadeIn className="mb-16">
          <span className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-4">
            El Proceso
          </span>
          <h2
            id="process-title"
            className="text-3xl md:text-5xl font-display font-bold text-white leading-tight"
          >
            Así trabajamos.
          </h2>
        </FadeIn>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-white/10 pt-12">
          {steps.map((step, i) => (
            <FadeIn key={step.num} delay={i * 0.15} direction="up">
              <li className="group list-none">
                <span
                  className="block text-6xl md:text-7xl font-display font-bold text-white/5 group-hover:text-[hsl(270,100%,60%)]/30 transition-colors duration-500 mb-4"
                  aria-hidden="true"
                >
                  {step.num}
                </span>
                <h3 className="text-xl md:text-2xl font-display font-bold mb-3 text-white">
                  <span className="sr-only">Paso {step.num} — </span>
                  {step.title}
                </h3>
                <p className="text-white/55 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </li>
            </FadeIn>
          ))}
        </ol>
      </div>
    </section>
  );
}
