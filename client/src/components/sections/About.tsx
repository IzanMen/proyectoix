import { FadeIn } from "../layout/FadeIn";
import teamPhoto from "@assets/hf_20260311_184427_61c15d63-f1c1-4250-b192-db7b6cc03f1f_(1)_1773254834149.png";

export function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-12 lg:px-24 bg-white/[0.02] backdrop-blur-sm border-y border-white/5">
      <div className="flex flex-col md:flex-row gap-16 max-w-6xl mx-auto items-center">
        
        <div className="flex-1">
          <FadeIn>
             <h2 className="text-sm font-mono uppercase tracking-widest text-white/40 mb-12">Izan & Xaloc</h2>
          </FadeIn>

          <div className="space-y-12">
            <FadeIn delay={0.1}>
              <div className="border-l border-white/20 pl-6">
                <h3 className="text-2xl font-display font-bold mb-2">Izan</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  Especialista en desarrollo y rendimiento. Obsesionado con que las webs vuelen y funcionen como un reloj suizo.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="border-l border-white/20 pl-6">
                <h3 className="text-2xl font-display font-bold mb-2">Xaloc</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  Experto en marketing aplicado y crecimiento digital. Obsesionado con que cada idea se convierta en resultados reales.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="flex-1 w-full relative hidden md:flex items-center justify-center">
           <FadeIn delay={0.3} className="relative w-full flex items-center justify-center">
             <div className="absolute -inset-8 bg-[hsl(270,100%,60%)]/5 rounded-full blur-[80px]"></div>
             <div className="relative z-10 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-[#0a0a0a]/20 z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/50 via-transparent to-[#0a0a0a]/50 z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/30 to-transparent z-10"></div>
                <div className="absolute inset-0 border border-white/5 rounded-2xl z-20"></div>
                <img 
                  src={teamPhoto} 
                  alt="Izan y Xaloc" 
                  className="w-full h-auto max-h-[450px] object-cover grayscale-[40%] contrast-[1.15] brightness-[0.55] saturate-[0.8]"
                  data-testid="img-team-photo"
                />
             </div>
           </FadeIn>
        </div>

        <div className="md:hidden w-full">
          <FadeIn delay={0.3}>
            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-[#0a0a0a]/20 z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/50 via-transparent to-[#0a0a0a]/50 z-10"></div>
              <div className="absolute inset-0 border border-white/5 rounded-2xl z-20"></div>
              <img 
                src={teamPhoto} 
                alt="Izan y Xaloc" 
                className="w-full h-auto object-cover grayscale-[40%] contrast-[1.15] brightness-[0.55] saturate-[0.8]"
                data-testid="img-team-photo-mobile"
              />
            </div>
          </FadeIn>
        </div>

      </div>
    </section>
  );
}
