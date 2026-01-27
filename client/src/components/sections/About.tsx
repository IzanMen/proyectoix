import { FadeIn } from "../layout/FadeIn";

export function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-12 lg:px-24 bg-white/[0.02]">
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

        <div className="flex-1 w-full relative h-[400px] hidden md:block overflow-hidden rounded-lg">
           {/* New fusion background */}
           <img 
             src="/src/assets/about-fusion.png" 
             alt="Fusion of tech and art" 
             className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-lighten hover:scale-105 transition-transform duration-700"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
           
           <div className="absolute bottom-8 left-8">
             <span className="font-display text-4xl font-bold text-white">IX.</span>
             <p className="text-xs text-white/60 mt-2 font-mono uppercase">Izan & Xaloc</p>
           </div>
        </div>

      </div>
    </section>
  );
}
