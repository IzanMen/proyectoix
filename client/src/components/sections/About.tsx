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
                  Diseño visual y experiencia de usuario. Se asegura de que cada píxel tenga un propósito y cada interacción sea memorable.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="flex-1 w-full relative h-[400px] hidden md:block">
           <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-lg border border-white/5 backdrop-blur-sm p-8 flex items-center justify-center">
             <span className="font-display text-4xl font-bold opacity-20">I & X</span>
           </div>
           {/* Abstract decorative elements */}
           <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
           <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

      </div>
    </section>
  );
}
