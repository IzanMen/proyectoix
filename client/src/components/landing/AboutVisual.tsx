import { motion } from "framer-motion";
import { Code2, Target, Instagram, MapPin, ExternalLink } from "lucide-react";
import { FadeIn } from "../layout/FadeIn";

export function AboutVisual() {
  return (
    <section
      aria-labelledby="about-title"
      className="relative py-24 md:py-32 overflow-hidden border-t border-white/5"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[hsl(270,100%,60%)]/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-white/5 border border-white/10 text-white/65 text-[11px] tracking-widest uppercase">
              <MapPin className="w-3 h-3" />
              Menorca
            </span>
            <h2
              id="about-title"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-white leading-[1.05]"
            >
              Somos{" "}
              <span className="bg-gradient-to-r from-white via-[hsl(270,100%,80%)] to-white bg-clip-text text-transparent">
                Izan y Xaloc
              </span>
              .
              <br />
              <span className="text-white/45">Dos chavales de Menorca.</span>
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-[0_30px_100px_-30px_hsl(270,100%,60%,0.4)]">
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(270,100%,60%)]/20 via-transparent to-fuchsia-600/10 pointer-events-none" />

            <picture>
              <source srcSet="/team-photo.webp" type="image/webp" />
              <img
                src="/team-photo.png"
                alt="Izan y Xaloc, fundadores de Proyecto IX"
                width="1280"
                height="720"
                loading="lazy"
                decoding="async"
                className="block w-full h-auto object-cover"
                data-testid="img-team"
              />
            </picture>

            <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 bg-gradient-to-t from-black via-black/70 to-transparent">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex items-start gap-3"
                  data-testid="badge-izan"
                >
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-[hsl(270,100%,60%)]/15 border border-[hsl(270,100%,60%)]/40 flex items-center justify-center text-[hsl(270,100%,80%)] backdrop-blur-md">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-[hsl(270,100%,80%)]">
                      Izan · 16
                    </p>
                    <p className="mt-0.5 text-white text-base font-bold leading-snug">
                      Programa desde los 12.
                    </p>
                    <p className="text-white/60 text-xs leading-snug">
                      Sabe qué funciona técnicamente y qué no.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-start gap-3"
                  data-testid="badge-xaloc"
                >
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-fuchsia-500/15 border border-fuchsia-400/40 flex items-center justify-center text-fuchsia-200 backdrop-blur-md">
                    <Target className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-fuchsia-200">
                      Xaloc · 17
                    </p>
                    <p className="mt-0.5 text-white text-base font-bold leading-snug">
                      Hace que la web cumpla su objetivo.
                    </p>
                    <p className="text-white/60 text-xs leading-snug">
                      Estrategia, mensaje y conversión.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
