import { FadeIn } from "../layout/FadeIn";
import { Monitor, Smartphone, Layers } from "lucide-react";

const services = [
  {
    icon: <Monitor className="w-6 h-6" />,
    title: "Diseño Web Moderno",
    desc: "Nada de plantillas genéricas. Diseñamos experiencias digitales únicas que reflejan la calidad de tu negocio."
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Mobile First Real",
    desc: "El 80% de tus visitas son desde el móvil. Tu web debe verse espectacular en una pantalla de 6 pulgadas."
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Sensación Premium",
    desc: "Animaciones fluidas, tipografía cuidada y atención al detalle para transmitir autoridad inmediata."
  }
];

export function Services() {
  return (
    <section className="py-32 bg-white/5 border-y border-white/5">
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {services.map((item, i) => (
            <FadeIn key={i} delay={i * 0.2} className="group">
              <div className="mb-6 p-4 rounded-full bg-white/5 w-fit border border-white/10 text-white group-hover:bg-[hsl(270,100%,60%)] group-hover:border-[hsl(270,100%,60%)] group-hover:shadow-[0_0_40px_-5px_hsl(270,100%,60%)] transition-all duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-display font-bold mb-4 group-hover:text-[hsl(270,100%,80%)] transition-colors">{item.title}</h3>
              <p className="text-white/60 leading-relaxed text-sm">
                {item.desc}
              </p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
