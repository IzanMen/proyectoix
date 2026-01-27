import { FadeIn } from "../layout/FadeIn";

export function Perception() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 border-t border-white/5">
      <div className="max-w-3xl mx-auto text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-8 leading-tight">
            Tu negocio es bueno. <br/>
            <span className="text-white/40">Pero tu imagen online no lo cuenta.</span>
          </h2>
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto">
            Muchos negocios en Menorca ofrecen un servicio excelente, pero su presencia digital se ha quedado atrás. 
            Nosotros cerramos esa brecha con diseño de alto impacto.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
