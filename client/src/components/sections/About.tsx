import { FadeIn } from "../layout/FadeIn";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="py-32 bg-white/[0.02] backdrop-blur-sm border-y border-white/5"
    >
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12">
        <FadeIn className="mb-16 max-w-3xl">
          <span className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-4">
            Quiénes somos
          </span>
          <h2
            id="about-title"
            className="text-3xl md:text-5xl font-display font-bold mb-8 text-white leading-[1.1]"
          >
            Somos Izan y Xaloc. <br />
            <span className="text-white/40">Esto es Proyecto IX.</span>
          </h2>
          <p className="text-base md:text-lg text-white/60 leading-relaxed">
            Proyecto IX no nació como una agencia al uso. Nació como un proceso real: dos
            personas jóvenes, de Menorca, construyendo algo con disciplina, criterio y sin
            atajos. Trabajamos desde Maó para todo tipo de negocios de la isla — desde
            Ciutadella hasta Sant Lluís — combinando desarrollo web, SEO local y estrategia
            digital. Lo documentamos, lo compartimos y lo aplicamos en cada proyecto que
            hacemos. No vendemos teoría. Mostramos el trabajo.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 space-y-8">
            <FadeIn delay={0.1}>
              <article className="border-l-2 border-[hsl(270,100%,60%)]/40 pl-6">
                <h3 className="text-2xl font-display font-bold mb-2 text-white">
                  Izan <span className="text-white/40 text-base font-normal">— Desarrollo y rendimiento</span>
                </h3>
                <p className="text-white/60 text-sm md:text-base leading-relaxed">
                  Lleva programando desde los 12 años y ha construido decenas de webs. Su
                  obsesión es que todo funcione bien por dentro: rápido, limpio, sólido.
                  Nada se publica hasta que cumple el estándar.
                </p>
              </article>
            </FadeIn>

            <FadeIn delay={0.2}>
              <article className="border-l-2 border-[hsl(270,100%,60%)]/40 pl-6">
                <h3 className="text-2xl font-display font-bold mb-2 text-white">
                  Xaloc <span className="text-white/40 text-base font-normal">— Venta y estrategia</span>
                </h3>
                <p className="text-white/60 text-sm md:text-base leading-relaxed">
                  Piensa en el cliente final de tu negocio antes de tomar cualquier
                  decisión de diseño. Se ocupa de que cada web tenga sentido estratégico:
                  que posicione, que comunique y que convierta.
                </p>
              </article>
            </FadeIn>
          </div>

          <div className="order-1 lg:order-2 w-full relative flex items-center justify-center">
            <FadeIn delay={0.3} className="relative w-full flex items-center justify-center">
              <div className="absolute -inset-12 bg-[hsl(270,100%,60%)]/8 rounded-full blur-[100px]" aria-hidden="true" />
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
                <img
                  src="/team-photo.png"
                  alt="Izan y Xaloc, fundadores de Proyecto IX en Menorca"
                  loading="lazy"
                  decoding="async"
                  width={900}
                  height={900}
                  className="w-full h-auto max-h-[450px] object-contain drop-shadow-[0_0_30px_rgba(124,58,237,0.15)]"
                  style={{ aspectRatio: "1 / 1" }}
                  data-testid="img-team-photo"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
