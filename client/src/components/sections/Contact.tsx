import { FadeIn } from "../layout/FadeIn";
import { Instagram, Copy, Check } from "lucide-react";
import { ContactForm } from "./ContactForm";
import { useState } from "react";
import { WhatsAppButton } from "../layout/WhatsAppButton";
import { WHATSAPP_NUMBER_DISPLAY, WHATSAPP_NUMBER_RAW } from "@/lib/whatsapp";

export function Contact() {
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
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
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

            <FadeIn delay={0.15}>
              <p className="text-base md:text-lg text-white/65 mb-4 max-w-2xl mx-auto font-light leading-relaxed">
                Respondemos rápido y con honestidad. Si encajamos, te lo decimos.
                Si no, también.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto] gap-8 lg:gap-10 items-start">
              <div className="w-full">
                <ContactForm />
              </div>

              <div className="flex flex-col items-center lg:items-start gap-4 lg:pt-2">
                <p className="text-white/40 text-xs uppercase tracking-[0.2em] font-semibold">O si lo prefieres</p>

                <WhatsAppButton
                  variant="solid"
                  label="WhatsApp"
                  showNumber
                  testId="link-contact-whatsapp"
                  className="px-7 py-4 text-base w-full sm:w-auto"
                />

                <button
                  type="button"
                  onClick={copyNumber}
                  data-testid="button-copy-whatsapp"
                  aria-label={`Copiar número de WhatsApp ${WHATSAPP_NUMBER_DISPLAY}`}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 hover:border-white/30 hover:text-white transition-colors font-mono text-sm text-white/55"
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

                <div className="flex items-center gap-4 text-sm text-white/55">
                  <a
                    href={`tel:+${WHATSAPP_NUMBER_RAW}`}
                    className="hover:text-white transition-colors"
                    data-testid="link-tel"
                  >
                    Llámanos
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
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
