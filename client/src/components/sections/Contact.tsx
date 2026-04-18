import { FadeIn } from "../layout/FadeIn";
import { ArrowRight, Mail, Instagram } from "lucide-react";
import { ContactForm } from "./ContactForm";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

export function Contact() {
  const [showForm, setShowForm] = useState(false);

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative overflow-hidden py-32"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-blue-900/10 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
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
                  <span className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-[hsl(270,100%,60%)]/10 border border-[hsl(270,100%,60%)]/30 text-[hsl(270,100%,80%)] text-xs tracking-widest uppercase shadow-[0_0_20px_-5px_hsl(270,100%,60%)]">
                    <span className="w-2 h-2 rounded-full bg-[hsl(270,100%,60%)] animate-pulse shadow-[0_0_10px_hsl(270,100%,60%)]" />
                    Aceptando proyectos
                  </span>
                </FadeIn>

                <FadeIn delay={0.1}>
                  <h2
                    id="contact-title"
                    className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-8 tracking-tight text-white leading-[1.05]"
                  >
                    ¿Tienes un proyecto en mente? <br />
                    <span className="text-white/50">Cuéntanoslo.</span>
                  </h2>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <p className="text-lg md:text-xl text-white/65 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                    Respondemos rápido y con honestidad. Si podemos ayudarte, te lo
                    decimos. Si no encajamos o no es el momento, también. Sin rodeos.
                  </p>
                </FadeIn>

                <FadeIn delay={0.3}>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                      onClick={() => setShowForm(true)}
                      data-testid="button-open-contact-form"
                      className="group inline-flex items-center gap-3 px-7 py-4 bg-white text-black text-base font-bold tracking-tight rounded-sm hover:scale-[1.02] transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-10px_hsl(270,100%,60%,0.6)]"
                    >
                      <Mail className="w-5 h-5" />
                      Escribirnos
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <a
                      href="https://www.instagram.com/proyecto.ix/"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="link-instagram"
                      className="group inline-flex items-center gap-2 px-6 py-4 text-white/70 hover:text-white text-sm transition-colors"
                    >
                      <Instagram className="w-4 h-4" />
                      o encuéntranos en Instagram
                    </a>
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
                  data-testid="button-cancel-form"
                  className="mt-8 text-white/30 text-sm hover:text-white transition-colors"
                >
                  Cancelar
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
