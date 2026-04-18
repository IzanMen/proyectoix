import { FadeIn } from "../layout/FadeIn";
import { ArrowRight, Mail } from "lucide-react";
import { ContactForm } from "./ContactForm";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

export function Contact() {
  const [showForm, setShowForm] = useState(false);

  return (
    <section id="contact" className="min-h-[80vh] flex flex-col items-center justify-center text-center relative overflow-hidden py-32">

      <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
         <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-blue-900/10 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12">
        <AnimatePresence mode="wait">
          {!showForm ? (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <FadeIn>
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-[hsl(270,100%,60%)]/10 border border-[hsl(270,100%,60%)]/30 text-[hsl(270,100%,80%)] text-xs tracking-widest uppercase shadow-[0_0_20px_-5px_hsl(270,100%,60%)]">
                  <span className="w-2 h-2 rounded-full bg-[hsl(270,100%,60%)] animate-pulse shadow-[0_0_10px_hsl(270,100%,60%)]"></span>
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
                  <button 
                    onClick={() => setShowForm(true)}
                    className="group relative inline-flex items-center gap-4 px-8 py-5 bg-white text-black text-lg font-bold tracking-tight rounded-sm hover:scale-105 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-10px_hsl(270,100%,60%,0.6)] hover:border-[hsl(270,100%,60%)]"
                  >
                    <Mail className="w-5 h-5 group-hover:text-[hsl(270,100%,50%)] transition-colors" />
                    Mejorar mi imagen
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform group-hover:text-[hsl(270,100%,50%)]" />
                  </button>
                </div>
              </FadeIn>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <ContactForm />
              <button 
                onClick={() => setShowForm(false)}
                className="mt-8 text-white/30 text-sm hover:text-white transition-colors"
              >
                Cancelar
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        
        <FadeIn delay={0.5} className="mt-24">
          <div className="w-full max-w-3xl mx-auto border-t border-white/10 pt-8 space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/30 text-xs font-mono uppercase tracking-widest">
              <span>Izan & Xaloc © {new Date().getFullYear()}</span>
              <span className="hidden md:block">•</span>
              <span>Menorca, Islas Baleares</span>
            </div>
            <div className="flex items-center justify-center gap-4 text-white/20 text-[10px] sm:text-xs">
              <Link href="/politica-privacidad" className="hover:text-white/40 transition-colors">Política de Privacidad</Link>
              <span>·</span>
              <Link href="/aviso-legal" className="hover:text-white/40 transition-colors">Aviso Legal</Link>
              <span>·</span>
              <Link href="/politica-cookies" className="hover:text-white/40 transition-colors">Cookies</Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
