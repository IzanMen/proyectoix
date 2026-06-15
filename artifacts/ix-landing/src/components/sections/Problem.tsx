import { FadeIn } from "../layout/FadeIn";
import { WhatsAppButton } from "../layout/WhatsAppButton";

export function Problem() {
  return (
    <section
      aria-labelledby="problem-title"
      className="py-24 md:py-32 relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <h2
              id="problem-title"
              className="text-3xl md:text-5xl font-display font-bold mb-8 leading-[1.1] text-white"
            >
              Tener una web y tener una <strong>buena web</strong>
              <br />
              <span className="text-white/40">no es lo mismo.</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-white/65 leading-relaxed mb-10">
              La mayoría de <strong className="text-white">negocios en Menorca</strong>{" "}
              tienen presencia online. Pocas webs <strong className="text-white">cargan
              rápido</strong>, <strong className="text-white">posicionan en Google</strong> y{" "}
              <strong className="text-white">generan confianza</strong> desde el primer
              segundo. Esa diferencia es la que trabajamos.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="inline-flex flex-col sm:flex-row gap-3 items-center justify-center">
              <WhatsAppButton
                variant="outline"
                label="Hablemos por WhatsApp"
                testId="link-problem-whatsapp"
              />
              <a
                href="#contact"
                className="text-sm text-white/50 hover:text-white transition-colors"
                data-testid="link-problem-contact"
              >
                o cuéntanos tu proyecto →
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
