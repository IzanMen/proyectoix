import { FadeIn } from "../layout/FadeIn";
import { PenTool, Gauge, Search, TrendingUp } from "lucide-react";

const services = [
  {
    icon: <PenTool className="w-5 h-5" />,
    title: "Diseño web a medida",
    desc: "Cero plantillas. Cada web parte de una hoja en blanco, pensada para tu negocio en Menorca.",
  },
  {
    icon: <Gauge className="w-5 h-5" />,
    title: "Rendimiento técnico",
    desc: "Webs rápidas y bien construidas. Buen Core Web Vitals = mejor SEO y mejor experiencia.",
  },
  {
    icon: <Search className="w-5 h-5" />,
    title: "SEO local en Menorca",
    desc: "Estructura, contenido y código optimizados para que aparezcas en Google cuando importa.",
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    title: "Marketing digital",
    desc: "Estrategia y acompañamiento para que la web atraiga clientes y mejore con el tiempo.",
  },
];

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="py-24 md:py-32 bg-white/[0.03] border-y border-white/5"
    >
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12">
        <FadeIn className="mb-14 max-w-3xl">
          <span className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-4">
            Servicios
          </span>
          <h2
            id="services-title"
            className="text-3xl md:text-5xl font-display font-bold text-white leading-tight"
          >
            Qué <strong>hacemos por ti</strong>.
          </h2>
        </FadeIn>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-lg overflow-hidden list-none p-0 m-0">
          {services.map((item, i) => (
            <li key={item.title} className="bg-background/50">
              <FadeIn delay={i * 0.08}>
                <article className="group h-full p-8 md:p-10 hover:bg-[hsl(270,100%,60%)]/5 transition-colors duration-300">
                  <div className="mb-6 inline-flex p-3 rounded-full bg-white/5 border border-white/10 text-white group-hover:bg-[hsl(270,100%,60%)] group-hover:border-[hsl(270,100%,60%)] group-hover:shadow-[0_0_30px_-5px_hsl(270,100%,60%)] transition-all duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-display font-bold mb-3 text-white group-hover:text-[hsl(270,100%,80%)] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed text-sm md:text-base">
                    {item.desc}
                  </p>
                </article>
              </FadeIn>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
