import { FadeIn } from "../layout/FadeIn";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12">
        <div className="max-w-4xl">
          <FadeIn direction="up" delay={0.2}>
            <span className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-medium tracking-widest uppercase border border-[hsl(270,100%,60%)]/30 rounded-full bg-[hsl(270,100%,60%)]/10 text-white backdrop-blur-sm shadow-[0_0_15px_-5px_hsl(270,100%,60%)]">
              <span className="w-2 h-2 rounded-full bg-[hsl(270,100%,60%)] animate-pulse shadow-[0_0_10px_hsl(270,100%,60%)]" />
              Aceptando nuevos proyectos
            </span>
          </FadeIn>

          <FadeIn direction="up" delay={0.3}>
            <h1
              id="hero-title"
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.95] tracking-tight mb-8 text-white"
            >
              Diseño web en Menorca <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[hsl(270,100%,75%)] to-[hsl(270,100%,60%)] drop-shadow-[0_0_15px_rgba(160,60,255,0.4)]">
                que realmente funciona.
              </span>
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.4}>
            <p className="text-xl md:text-2xl text-white/70 max-w-xl font-light leading-relaxed mb-10">
              Para negocios que quieren crecer, no solo estar online.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.5}>
            <a
              href="#contact"
              data-testid="link-hero-cta"
              className="group inline-flex items-center gap-3 px-7 py-4 bg-white text-black text-base font-bold tracking-tight rounded-sm hover:scale-[1.02] transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-10px_hsl(270,100%,60%,0.6)]"
            >
              Cuéntanos tu proyecto
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </FadeIn>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="w-[2px] h-20 bg-gradient-to-b from-transparent via-[hsl(270,100%,60%)] to-transparent opacity-80 shadow-[0_0_10px_hsl(270,100%,60%)]" />
      </motion.div>
    </section>
  );
}
