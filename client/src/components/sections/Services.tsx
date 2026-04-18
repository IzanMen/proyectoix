import { FadeIn } from "../layout/FadeIn";
import { PenTool, Gauge, Search, TrendingUp } from "lucide-react";

const services = [
  {
    icon: <PenTool className="w-5 h-5" />,
    title: "Diseño web a medida",
    desc: "Nada de plantillas. Cada web parte de cero, pensada para tu negocio y para las personas que quieres atraer. El resultado refleja quién eres.",
  },
  {
    icon: <Gauge className="w-5 h-5" />,
    title: "Desarrollo y rendimiento",
    desc: "Una web rápida, bien construida y optimizada técnicamente. Lo que no se ve también importa, y mucho.",
  },
  {
    icon: <Search className="w-5 h-5" />,
    title: "Posicionamiento SEO",
    desc: "Estar en Google no es suerte. Es estructura, contenido y código bien hecho desde el principio. Lo integramos en cada proyecto.",
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    title: "Orientada a resultados",
    desc: "No entregamos una web y desaparecemos. La construimos para que atraiga clientes, genere confianza y mejore con el tiempo.",
  },
];

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="py-32 bg-white/[0.03] border-y border-white/5"
    >
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12">
        <FadeIn className="mb-16">
          <span className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-4">
            Servicios
          </span>
          <h2
            id="services-title"
            className="text-3xl md:text-5xl font-display font-bold text-white leading-tight"
          >
            Qué hacemos.
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-lg overflow-hidden">
          {services.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.1} className="bg-background/50">
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
          ))}
        </div>
      </div>
    </section>
  );
}
