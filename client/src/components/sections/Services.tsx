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
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-white/5 border-y border-white/5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
        {services.map((item, i) => (
          <FadeIn key={i} delay={i * 0.2} className="group">
            <div className="mb-6 p-4 rounded-full bg-white/5 w-fit border border-white/10 text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
              {item.icon}
            </div>
            <h3 className="text-xl font-display font-bold mb-4">{item.title}</h3>
            <p className="text-white/60 leading-relaxed text-sm">
              {item.desc}
            </p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
