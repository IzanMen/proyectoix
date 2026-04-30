import { FadeIn } from "../layout/FadeIn";
import { WhatsAppButton } from "../layout/WhatsAppButton";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="py-24 md:py-32 bg-white/[0.02] backdrop-blur-sm border-y border-white/5"
    >
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12">
        <FadeIn className="mb-14 max-w-3xl">
          <span className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-4">
            Quiénes somos
          </span>
          <h2
            id="about-title"
            className="text-3xl md:text-5xl font-display font-bold mb-6 text-white leading-[1.1]"
          >
            Somos <strong>Izan y Xaloc</strong>. <br />
            <span className="text-white/40">Esto es Proyecto IX.</span>
          </h2>
          <p className="text-base md:text-lg text-white/60 leading-relaxed">
            Dos personas jóvenes de <strong className="text-white">Menorca</strong>,
            trabajando con disciplina, criterio y sin atajos. Combinamos{" "}
            <strong className="text-white">desarrollo web</strong>,{" "}
            <strong className="text-white">SEO local</strong> y estrategia digital para
            negocios de toda la isla.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1 space-y-8">
            <FadeIn delay={0.1}>
              <article className="border-l-2 border-[hsl(270,100%,60%)]/40 pl-6">
                <h3 className="text-2xl font-display font-bold mb-2 text-white">
                  Izan{" "}
                  <span className="text-white/40 text-base font-normal">
                    — Desarrollo y rendimiento
                  </span>
                </h3>
                <p className="text-white/60 text-sm md:text-base leading-relaxed">
                  Programando desde los 12 años. Su obsesión: que todo funcione{" "}
                  <strong className="text-white/80">rápido, limpio y sólido</strong>.
                </p>
              </article>
            </FadeIn>

            <FadeIn delay={0.2}>
              <article className="border-l-2 border-[hsl(270,100%,60%)]/40 pl-6">
                <h3 className="text-2xl font-display font-bold mb-2 text-white">
                  Xaloc{" "}
                  <span className="text-white/40 text-base font-normal">
                    — Venta y estrategia
                  </span>
                </h3>
                <p className="text-white/60 text-sm md:text-base leading-relaxed">
                  Piensa en tu cliente final antes que en el diseño. Webs que{" "}
                  <strong className="text-white/80">posicionan, comunican y
                  convierten</strong>.
                </p>
              </article>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <WhatsAppButton
                  variant="outline"
                  label="Habla con nosotros"
                  testId="link-about-whatsapp"
                />
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-5 py-3 text-sm text-white/60 hover:text-white transition-colors"
                  data-testid="link-about-contact"
                >
                  o escríbenos por email →
                </a>
              </div>
            </FadeIn>
          </div>

          <div className="order-1 lg:order-2 w-full relative flex items-center justify-center">
            <FadeIn
              delay={0.3}
              className="relative w-full flex items-center justify-center"
            >
              <div
                className="absolute -inset-12 bg-[hsl(270,100%,60%)]/8 rounded-full blur-[100px]"
                aria-hidden="true"
              />
              <div
                className="relative z-10 w-full"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, white 50%, transparent 100%), linear-gradient(to right, transparent 0%, white 15%, white 85%, transparent 100%)",
                  maskComposite: "intersect",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, white 50%, transparent 100%), linear-gradient(to right, transparent 0%, white 15%, white 85%, transparent 100%)",
                  WebkitMaskComposite: "destination-in",
                }}
              >
                <picture>
                  <source srcSet="/team-photo.webp" type="image/webp" />
                  <img
                    src="/team-photo.png"
                    alt="Izan y Xaloc, fundadores de Proyecto IX en Menorca"
                    loading="lazy"
                    decoding="async"
                    width={896}
                    height={1200}
                    className="w-full h-auto max-h-[450px] object-contain drop-shadow-[0_0_30px_rgba(124,58,237,0.15)]"
                    style={{ aspectRatio: "896 / 1200" }}
                    data-testid="img-team-photo"
                  />
                </picture>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
