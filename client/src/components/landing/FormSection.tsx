import { ShieldCheck, MailCheck, Zap } from "lucide-react";
import { FadeIn } from "../layout/FadeIn";
import { LeadForm } from "./LeadForm";

const guarantees = [
  { icon: ShieldCheck, label: "Sin compromiso" },
  { icon: MailCheck, label: "Sin spam" },
  { icon: Zap, label: "Una sola propuesta" },
];

export function FormSection() {
  return (
    <section
      id="formulario"
      aria-labelledby="form-title"
      className="relative py-24 md:py-32 overflow-hidden border-t border-white/5 scroll-mt-20"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[hsl(270,100%,60%)]/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-[hsl(270,100%,60%)]/10 border border-[hsl(270,100%,60%)]/30 text-[hsl(270,100%,80%)] text-[11px] tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[hsl(270,100%,60%)] animate-pulse shadow-[0_0_8px_hsl(270,100%,60%)]" />
              El paso que importa
            </span>
            <h2
              id="form-title"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-white leading-[1.05]"
            >
              Cuéntanos tu caso.
            </h2>
            <p className="mt-4 text-white/65 text-base md:text-lg">
              5 preguntas. Menos de 1 minuto. Te respondemos por WhatsApp.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <LeadForm />
        </FadeIn>

        <FadeIn delay={0.2}>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/50">
            {guarantees.map(({ icon: Icon, label }) => (
              <li key={label} className="inline-flex items-center gap-1.5">
                <Icon className="w-3.5 h-3.5 text-[hsl(270,100%,75%)]" />
                {label}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-center text-white/40 text-xs">
            Solo te escribimos una vez con nuestra propuesta.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
