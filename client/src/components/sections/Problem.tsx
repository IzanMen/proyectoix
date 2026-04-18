import { FadeIn } from "../layout/FadeIn";

export function Problem() {
  return (
    <section
      aria-labelledby="problem-title"
      className="py-32 relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <h2
              id="problem-title"
              className="text-3xl md:text-5xl font-display font-bold mb-8 leading-[1.1] text-white"
            >
              Tener una web y tener una buena web<br />
              <span className="text-white/40">no es lo mismo.</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-white/60 leading-relaxed">
              La mayoría de negocios en Menorca tienen presencia online. Pero pocas webs
              están bien construidas, cargan rápido, aparecen en Google y generan confianza
              desde el primer segundo. Esa diferencia es la que trabajamos.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
