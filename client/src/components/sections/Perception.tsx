import { FadeIn } from "../layout/FadeIn";

export function Perception() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 border-t border-white/5 relative overflow-hidden">
      {/* Subtle light leak background - simplified */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-8 leading-tight">
            Tienes un buen negocio.<br/>
            <span className="text-white/40">Internet aún no lo sabe.</span>
          </h2>
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto">
            Una web mediocre no es un problema estético. Es un cliente que llega, no confía y se va. <br />
            Nosotros construimos presencias digitales que generan esa confianza desde el primer segundo, porque sabemos lo que hay detrás de cada proyecto: trabajo real, tiempo invertido y ganas de crecer.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
