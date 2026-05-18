import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Clock } from "lucide-react";
import { FadeIn } from "../layout/FadeIn";

export function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const handlePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    setStarted(true);
    v.play().catch(() => {});
  };

  return (
    <section
      aria-labelledby="video-title"
      className="relative py-10 md:py-14 overflow-hidden"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[hsl(270,100%,60%)]/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="text-center mb-8">
            <span className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/65 text-[10px] sm:text-[11px] tracking-widest uppercase max-w-full">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                Mira esto antes
              </span>
              <span className="hidden sm:inline" aria-hidden="true">·</span>
              <span>2 min</span>
            </span>
            <h2 id="video-title" className="sr-only">
              Vídeo explicativo
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="relative group">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-[hsl(270,100%,60%)]/40 via-fuchsia-500/20 to-transparent opacity-60 blur-xl pointer-events-none" />
            <div
              className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black"
              data-testid="video-explainer"
            >
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                src="/video/proyectoix.mp4"
                preload="metadata"
                playsInline
                controls={started}
              />

              {!started && (
                <button
                  type="button"
                  onClick={handlePlay}
                  aria-label="Reproducir vídeo"
                  data-testid="button-play-video"
                  className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px] hover:bg-black/20 transition-colors cursor-pointer"
                >
                  <motion.div
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative"
                  >
                    <span className="absolute inset-0 rounded-full bg-[hsl(270,100%,60%)]/40 animate-ping" />
                    <span className="relative flex w-20 h-20 md:w-24 md:h-24 rounded-full bg-white text-black items-center justify-center shadow-[0_0_60px_-10px_rgba(255,255,255,0.6)]">
                      <Play className="w-8 h-8 md:w-10 md:h-10 ml-1" fill="currentColor" />
                    </span>
                  </motion.div>
                </button>
              )}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="mt-10 text-center text-white/65 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Si ya has visto el vídeo, sabes lo que necesitas hacer. El
            formulario está justo aquí abajo.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mt-8 flex justify-center">
            <a
              href="#formulario"
              data-testid="link-video-cta"
              className="group inline-flex items-center gap-3 px-7 py-4 bg-white text-black text-base font-bold tracking-tight rounded-sm hover:scale-[1.02] transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.4)]"
            >
              Quiero hablar con vosotros
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
