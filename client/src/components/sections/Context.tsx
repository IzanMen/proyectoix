import { FadeIn } from "../layout/FadeIn";
import menorcaImg from "../../assets/menorca-abstract.png";

export function Context() {
  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-40">
        <img 
          src={menorcaImg} 
          alt="Menorca Abstract" 
          className="w-full h-full object-cover grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background"></div>
      </div>

      <div className="relative z-10 max-w-2xl">
        <FadeIn>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 text-white">
            Desde Menorca, <br/>
            <span className="text-white/50">con criterio global.</span>
          </h2>
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <p className="text-lg text-white/80 leading-relaxed pl-6 border-l-2 border-white/20">
            Entendemos la identidad local porque somos de aquí. 
            Pero aplicamos los estándares de diseño que se ven en Londres o Nueva York.
            <br/><br/>
            Queremos que los negocios de la isla tengan una presencia digital de la que sentirse orgullosos.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
