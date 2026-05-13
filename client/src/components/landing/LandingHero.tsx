import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, MapPin, Zap, MessageCircle } from "lucide-react";

const trust = [
  { icon: ShieldCheck, label: "Sin compromiso" },
  { icon: MapPin, label: "100% Menorca" },
  { icon: Zap, label: "Respuesta en 24h" },
  { icon: MessageCircle, label: "Te escribimos por WhatsApp" },
];

export function LandingHero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden pt-28 pb-16"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[15%] right-[5%] w-[520px] h-[520px] bg-[hsl(270,100%,60%)]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[5%] w-[420px] h-[420px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-[11px] font-medium tracking-widest uppercase border border-[hsl(270,100%,60%)]/30 rounded-full bg-[hsl(270,100%,60%)]/10 text-white backdrop-blur-sm shadow-[0_0_15px_-5px_hsl(270,100%,60%)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[hsl(270,100%,60%)] animate-pulse shadow-[0_0_10px_hsl(270,100%,60%)]" />
          Para negocios de Menorca
        </motion.span>

        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="text-[40px] sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[0.98] tracking-tight mb-6 text-white"
        >
          Diseño y desarrollo web profesional para{" "}
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-r from-white via-[hsl(270,100%,80%)] to-white bg-clip-text text-transparent">
              negocios de Menorca
            </span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg md:text-xl text-white/70 max-w-2xl font-light leading-relaxed mb-10"
        >
          Creamos webs modernas, rápidas y optimizadas para convertir visitas en
          clientes. Cuéntanos tu caso y te decimos cómo podemos ayudarte.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-center gap-4"
        >
          <a
            href="#formulario"
            data-testid="link-hero-cta"
            className="group inline-flex items-center justify-center gap-3 px-8 py-5 bg-[hsl(270,100%,60%)] text-white text-base md:text-lg font-bold tracking-tight rounded-sm hover:bg-[hsl(270,100%,65%)] transition-all duration-300 shadow-[0_0_40px_-8px_hsl(270,100%,60%)] hover:shadow-[0_0_60px_-6px_hsl(270,100%,60%)] hover:scale-[1.02]"
          >
            Quiero hablar con vosotros
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <span className="text-white/50 text-sm">
            5 preguntas · Menos de 1 minuto
          </span>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/55"
        >
          {trust.map(({ icon: Icon, label }) => (
            <li key={label} className="inline-flex items-center gap-2">
              <Icon className="w-4 h-4 text-[hsl(270,100%,75%)]" />
              <span>{label}</span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
