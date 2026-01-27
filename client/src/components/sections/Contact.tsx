import { FadeIn } from "../layout/FadeIn";
import { ArrowRight } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-32 px-6 md:px-12 lg:px-24 flex flex-col items-center justify-center text-center relative overflow-hidden">
      
      <div className="absolute inset-0 z-0">
         <div className="absolute bottom-0 left-0 right-0 h-[500px] bg-gradient-to-t from-blue-900/10 to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-2xl">
        <FadeIn>
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tighter">
            Hablemos.
          </h2>
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <p className="text-xl text-white/60 mb-12">
            Sin compromisos. Solo una charla para ver si podemos elevar tu negocio.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <a 
            href="mailto:hola@izanyxaloc.com" 
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-lg font-bold tracking-tight rounded-sm hover:bg-gray-200 transition-all duration-300"
          >
            Mejorar mi imagen
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </FadeIn>
        
        <FadeIn delay={0.5} className="mt-16">
          <p className="text-xs text-white/20 font-mono uppercase tracking-widest">
            Izan & Xaloc © {new Date().getFullYear()} — Menorca
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
