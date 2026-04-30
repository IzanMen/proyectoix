import { FadeIn } from "../layout/FadeIn";
import { ArrowRight, Mail, Instagram, Copy, Check } from "lucide-react";
import { ContactForm } from "./ContactForm";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WhatsAppButton } from "../layout/WhatsAppButton";
import { WHATSAPP_NUMBER_DISPLAY, WHATSAPP_NUMBER_RAW } from "@/lib/whatsapp";

export function Contact() {
  const [showForm, setShowForm] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(WHATSAPP_NUMBER_DISPLAY);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const tmp = document.createElement("input");
      tmp.value = WHATSAPP_NUMBER_DISPLAY;
      document.body.appendChild(tmp);
      tmp.select();
      document.execCommand("copy");
      document.body.removeChild(tmp);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative overflow-hidden py-24 md:py-32"
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
                    <span
                      className="w-2 h-2 rounded-full bg-[hsl(270,100%,60%)] animate-pulse shadow-[0_0_10px_hsl(270,100%,60%)]"
                      aria-hidden="true"
                    />
                    Aceptando proyectos
                  </span>
                </FadeIn>

                <FadeIn delay={0.1}>
                  <h2
                    id="contact-title"
                    className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 tracking-tight text-white leading-[1.05]"
                  >
                    ¿Tienes un <strong>proyecto</strong>? <br />
                    <span className="text-white/50">Cuéntanoslo.</span>
                  </h2>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <p className="text-base md:text-lg text-white/65 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                    Respondemos rápido y con honestidad. Si encajamos, te lo decimos.
                    Si no, también.
                  </p>
                </FadeIn>

                <FadeIn delay={0.3}>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mb-8">
                    <button
                      type="button"
                      onClick={() => setShowForm(true)}
                      data-testid="button-open-contact-form"
                      className="group inline-flex items-center justify-center gap-3 px-7 py-4 bg-white text-black text-base font-bold tracking-tight rounded-sm hover:scale-[1.02] transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-10px_hsl(270,100%,60%,0.6)]"
                    >
                      <Mail className="w-5 h-5" />
                      Rellenar formulario
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <WhatsAppButton
                      variant="solid"
                      label="WhatsApp"
                      showNumber
                      testId="link-contact-whatsapp"
                      className="px-7 py-4 text-base"
                    />
                  </div>
                </FadeIn>

                <FadeIn delay={0.4}>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm text-white/55">
                    <button
                      type="button"
                      onClick={copyNumber}
                      data-testid="button-copy-whatsapp"
                      aria-label={`Copiar número de WhatsApp ${WHATSAPP_NUMBER_DISPLAY}`}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 hover:border-white/30 hover:text-white transition-colors font-mono"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#25D366]" />
                          Copiado
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          {WHATSAPP_NUMBER_DISPLAY}
                        </>
                      )}
                    </button>
                    <a
                      href={`tel:+${WHATSAPP_NUMBER_RAW}`}
                      className="hover:text-white transition-colors"
                      data-testid="link-tel"
                    >
                      o llámanos
                    </a>
                    <a
                      href="https://www.instagram.com/proyecto.ix/"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="link-instagram"
                      className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                    >
                      <Instagram className="w-4 h-4" />
                      @proyecto.ix
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
                  type="button"
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
