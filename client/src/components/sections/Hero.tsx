import { FadeIn } from "../layout/FadeIn";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden pt-20">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-white/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl">
        <FadeIn direction="up" delay={0.2}>
          <span className="inline-block px-3 py-1 mb-6 text-xs font-medium tracking-widest uppercase border border-white/20 rounded-full bg-white/5 text-white/80">
            Diseño Web Premium
          </span>
        </FadeIn>

        <FadeIn direction="up" delay={0.3}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] tracking-tight mb-8 text-white">
            Mejora de <br />
            <span className="text-white/50">imagen online.</span>
          </h1>
        </FadeIn>

        <FadeIn direction="up" delay={0.4}>
          <p className="text-xl md:text-2xl text-white/70 max-w-lg font-light leading-relaxed">
            Para pequeños negocios en Menorca.
          </p>
        </FadeIn>
        
        <FadeIn direction="up" delay={0.6}>
           <div className="mt-12 flex flex-col sm:flex-row gap-6 items-start">
             <div className="h-[1px] w-12 bg-white/30 mt-3 hidden sm:block"></div>
             <p className="text-sm text-white/40 max-w-xs leading-relaxed uppercase tracking-wide">
               No es solo una web.<br/>
               Es una declaración de intenciones.
             </p>
           </div>
        </FadeIn>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent"></div>
      </motion.div>
    </section>
  );
}
