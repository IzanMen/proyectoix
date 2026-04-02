import { FadeIn } from "../layout/FadeIn";

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
             <div className="absolute -inset-12 bg-[hsl(270,100%,60%)]/8 rounded-full blur-[100px]"></div>
             <div className="relative z-10" style={{ maskImage: 'linear-gradient(to bottom, white 50%, transparent 100%), linear-gradient(to right, transparent 0%, white 15%, white 85%, transparent 100%)', maskComposite: 'intersect', WebkitMaskImage: 'linear-gradient(to bottom, white 50%, transparent 100%), linear-gradient(to right, transparent 0%, white 15%, white 85%, transparent 100%)', WebkitMaskComposite: 'destination-in' }}>
                <img 
                  src="/team-photo.webp" 
                  alt="Izan y Xaloc" 
                  className="w-full h-auto max-h-[450px] object-contain drop-shadow-[0_0_30px_rgba(124,58,237,0.15)]"
                  data-testid="img-team-photo"
                />
             </div>
           </FadeIn>
        </div>

        <div className="md:hidden w-full flex justify-center">
          <FadeIn delay={0.3}>
            <div className="relative">
              <div className="absolute -inset-8 bg-[hsl(270,100%,60%)]/5 rounded-full blur-[60px]"></div>
              <div className="relative" style={{ maskImage: 'linear-gradient(to bottom, white 50%, transparent 100%), linear-gradient(to right, transparent 0%, white 15%, white 85%, transparent 100%)', maskComposite: 'intersect', WebkitMaskImage: 'linear-gradient(to bottom, white 50%, transparent 100%), linear-gradient(to right, transparent 0%, white 15%, white 85%, transparent 100%)', WebkitMaskComposite: 'destination-in' }}>
                <img 
                  src="/team-photo.webp" 
                  alt="Izan y Xaloc" 
                  className="w-full h-auto max-h-[400px] object-contain drop-shadow-[0_0_20px_rgba(124,58,237,0.15)]"
                  data-testid="img-team-photo-mobile"
                />
              </div>
            </div>
          </FadeIn>
        </div>

      </div>
    </section>
  );
}
