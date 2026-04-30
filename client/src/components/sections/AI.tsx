import { FadeIn } from "../layout/FadeIn";
import { Zap, Target, CheckCircle2 } from "lucide-react";

const chips = [
  { icon: <Zap className="w-4 h-4" />, label: "Más rápido" },
  { icon: <Target className="w-4 h-4" />, label: "Más preciso" },
  { icon: <CheckCircle2 className="w-4 h-4" />, label: "Revisado por nosotros" },
];

export function AI() {
  return (
    <section
      aria-labelledby="ai-title"
      className="py-24 md:py-32 relative overflow-hidden border-y border-white/5"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[hsl(270,100%,60%)]/8 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl">
          <FadeIn>
            <span className="inline-block text-xs font-mono uppercase tracking-widest text-[hsl(270,100%,75%)] mb-6">
              El diferenciador
            </span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2
              id="ai-title"
              className="text-4xl md:text-6xl font-display font-bold mb-10 leading-[1.05] text-white"
            >
              Trabajamos con <strong>IA</strong>. <br />
              <span className="text-white/50">Y eso cambia el resultado.</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="space-y-5 text-base md:text-lg text-white/70 leading-relaxed border-l-2 border-[hsl(270,100%,60%)]/40 pl-6">
              <p>
                Integramos <strong className="text-white">inteligencia artificial</strong>{" "}
                en todo el proceso de <strong className="text-white">desarrollo web</strong>:
                detectamos mejores soluciones, construimos más rápido y entregamos webs más
                sólidas que la mayoría de estudios tradicionales.
              </p>
              <p>
                La IA <strong className="text-white">no piensa por nosotros</strong>. Cada
                decisión pasa por nuestra revisión. La tecnología acelera, el estándar lo
                marcamos nosotros.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <ul className="mt-10 flex flex-wrap gap-3">
              {chips.map((chip) => (
                <li
                  key={chip.label}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[hsl(270,100%,60%)]/30 bg-[hsl(270,100%,60%)]/10 text-sm text-white/80 backdrop-blur-sm"
                >
                  <span className="text-[hsl(270,100%,75%)]" aria-hidden="true">
                    {chip.icon}
                  </span>
                  {chip.label}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
