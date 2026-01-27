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

        {/* Simplified visual element that respects the global background */}
        <div className="flex-1 w-full relative h-[400px] hidden md:flex items-center justify-center">
           <FadeIn delay={0.3} className="relative w-full h-full flex items-center justify-center">
             <div className="absolute inset-0 bg-white/5 rounded-full blur-[100px] opacity-20"></div>
             <div className="relative z-10 border border-white/10 p-12 rounded-lg bg-black/40 backdrop-blur-md">
                <span className="font-display text-8xl font-bold text-white/10 tracking-tighter">IX.</span>
             </div>
           </FadeIn>
        </div>

      </div>
    </section>
  );
}
