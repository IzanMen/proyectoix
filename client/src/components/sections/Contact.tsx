import { FadeIn } from "../layout/FadeIn";
import { ArrowRight, Mail } from "lucide-react";
import { motion } from "framer-motion";

export function Contact() {
  return (
    <section id="contact" className="min-h-[80vh] flex flex-col items-center justify-center text-center relative overflow-hidden py-32">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
         <motion.div 
           initial={{ scale: 1, opacity: 0.4 }}
           animate={{ scale: 1.1, opacity: 0.6 }}
           transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
           className="absolute inset-0"
         >
           <img 
             src="/src/assets/contact-portal.png" 
             alt="Future Horizon" 
             className="w-full h-full object-cover mix-blend-screen"
           />
         </motion.div>
         <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-4xl px-6">
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Disponible para nuevos proyectos
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold mb-8 tracking-tighter text-white drop-shadow-2xl">
            Hablemos.
          </h2>
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto font-light">
            Sin compromisos. Solo una charla para descubrir si estamos alineados para elevar tu negocio.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="mailto:hola@izanyxaloc.com" 
              className="group relative inline-flex items-center gap-4 px-8 py-5 bg-white text-black text-lg font-bold tracking-tight rounded-sm hover:scale-105 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
            >
              <Mail className="w-5 h-5" />
              Mejorar mi imagen
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </FadeIn>
        
        <FadeIn delay={0.5} className="mt-24">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/10 pt-8 text-white/30 text-xs font-mono uppercase tracking-widest w-full max-w-3xl mx-auto">
             <span>Izan & Xaloc © {new Date().getFullYear()}</span>
             <span className="hidden md:block">•</span>
             <span>Menorca, Islas Baleares</span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
