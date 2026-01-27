import { FadeIn } from "../layout/FadeIn";

const steps = [
  {
    num: "01",
    title: "Entender",
    desc: "Analizamos tu negocio y tu competencia. Sin ruido."
  },
  {
    num: "02",
    title: "Diseñar",
    desc: "Creamos tu nueva imagen. Moderna, limpia y profesional."
  },
  {
    num: "03",
    title: "Entregar",
    desc: "Te damos las llaves de una web lista para impresionar."
  }
];

export function Process() {
  return (
    <section id="process" className="py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
         <img src="/src/assets/process-lines.png" alt="" className="w-full h-full object-cover mix-blend-screen" />
         <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
      </div>

      <FadeIn className="mb-16 relative z-10">
        <h2 className="text-sm font-mono uppercase tracking-widest text-white/40">El Proceso</h2>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 pt-12 relative z-10">
        {steps.map((step, i) => (
          <FadeIn key={i} delay={i * 0.2} direction="up">
            <div className="group">
              <span className="block text-6xl font-display font-bold text-white/5 group-hover:text-white/10 transition-colors mb-4 duration-500">
                {step.num}
              </span>
              <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
              <p className="text-white/50 text-sm max-w-[200px]">
                {step.desc}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
