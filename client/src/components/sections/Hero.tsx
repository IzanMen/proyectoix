import { FadeIn } from "../layout/FadeIn";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden pt-20">
      {/* Removed static image background to let InteractiveBackground show through */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Keeping subtle gradient blurs for depth/color but making them more subtle */}
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl">

        <FadeIn direction="up" delay={0.3}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] tracking-tight mb-8 text-white">
            Mejora de <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[hsl(270,100%,75%)] to-[hsl(270,100%,60%)] drop-shadow-[0_0_15px_rgba(160,60,255,0.4)]">imagen online.</span>
          </h1>
        </FadeIn>

        <FadeIn direction="up" delay={0.4}>
          <p className="text-xl md:text-2xl text-white/70 max-w-lg font-light leading-relaxed">
            Para pequeños y medianos negocios.
          </p>
        </FadeIn>
        
        <FadeIn direction="up" delay={0.6}>
           <div className="mt-12 flex flex-col sm:flex-row gap-6 items-start">
             <div className="h-[1px] w-12 bg-white/30 mt-3 hidden sm:block"></div>
             <p className="text-sm text-white/40 max-w-xs leading-relaxed uppercase tracking-wide">
               Cada detalle cuenta.<br/>
               Nada está al azar.
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
        <div className="w-[2px] h-20 bg-gradient-to-b from-transparent via-[hsl(270,100%,60%)] to-transparent opacity-80 shadow-[0_0_10px_hsl(270,100%,60%)]"></div>
      </motion.div>
    </section>
  );
}
