import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Frown, Smile, X, ArrowRight, Loader2, Timer } from "lucide-react";
import { FadeIn } from "../layout/FadeIn";

const LOOP_INTERVAL = 9000;

function BadBrowserContent() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#161616]"
      >
        <Loader2 className="w-7 h-7 text-white/30 animate-spin" />
        <p className="text-[11px] font-mono text-white/30 uppercase tracking-widest">
          Cargando...
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.4 }}
        className="absolute inset-0 p-5 flex flex-col gap-3 grayscale-[40%]"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-orange-700/60" />
            <div className="h-2.5 w-20 bg-white/15 rounded" />
          </div>
          <div className="flex gap-1.5">
            <div className="h-2 w-8 bg-white/10 rounded" />
            <div className="h-2 w-8 bg-white/10 rounded" />
            <div className="h-2 w-8 bg-white/10 rounded" />
          </div>
        </div>

        <div className="mt-3">
          <div className="h-3 w-2/3 bg-white/15 rounded mb-2" />
          <div className="h-2 w-full bg-white/10 rounded mb-1.5" />
          <div className="h-2 w-5/6 bg-white/10 rounded mb-1.5" />
          <div className="h-2 w-3/4 bg-white/10 rounded" />
        </div>

        <div className="flex-1 grid grid-cols-3 gap-2 mt-2">
          <div className="bg-orange-700/30 rounded-sm" />
          <div className="bg-white/5 rounded-sm" />
          <div className="bg-orange-700/20 rounded-sm" />
        </div>

        <div className="flex items-center gap-2 mt-2">
          <div className="h-2 w-12 bg-white/10 rounded" />
          <div className="h-2 w-16 bg-white/10 rounded" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{
          opacity: [0, 1, 1, 0],
          scale: [0.85, 1, 1, 0.85],
        }}
        transition={{
          delay: 2.0,
          duration: 2.6,
          times: [0, 0.15, 0.7, 1],
        }}
        className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/85 backdrop-blur-md border border-red-400/30 rounded-full px-4 py-2 text-xs text-red-200 font-medium inline-flex items-center gap-2 shadow-2xl"
      >
        <Frown className="w-3.5 h-3.5" />
        ¿Dónde contacto? Me voy.
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 0, y: 0 }}
        animate={{
          opacity: [0, 1, 1, 0],
          x: [0, 30, 60, 200],
        }}
        transition={{
          delay: 4.4,
          duration: 1.4,
          times: [0, 0.15, 0.6, 1],
        }}
        className="absolute z-20 right-6 top-6 inline-flex items-center gap-1.5 bg-red-500/15 border border-red-400/30 rounded-full px-2.5 py-1 text-[11px] text-red-200 font-medium"
      >
        <X className="w-3 h-3" />
        Se va
      </motion.div>
    </div>
  );
}

function BadBrowser({ loopKey }: { loopKey: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="relative rounded-xl border border-red-500/20 bg-[#0a0a0a] overflow-hidden shadow-[0_20px_60px_-20px_rgba(239,68,68,0.25)]"
      data-testid="card-bad-website"
    >
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[#0f0f0f] border-b border-white/5">
        <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
        <span className="ml-3 text-[10px] font-mono text-white/30 truncate">
          web-cualquiera.com
        </span>
      </div>

      <div className="relative h-[260px] md:h-[300px] bg-[#161616] overflow-hidden">
        <BadBrowserContent key={loopKey} />
      </div>

      <div className="px-4 py-3 bg-[#0f0f0f] border-t border-red-500/10 flex items-center justify-between text-[11px]">
        <span className="text-red-300/80 font-mono uppercase tracking-widest">
          Web antigua
        </span>
        <span className="text-white/35">Lenta · Confusa · Sin acción</span>
      </div>
    </motion.div>
  );
}

function GoodBrowserContent() {
  return (
    <div className="absolute inset-0">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="absolute inset-0 p-5 flex flex-col"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-base font-display font-bold text-white">
              IX
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[hsl(270,100%,60%)] mt-1 animate-pulse shadow-[0_0_8px_hsl(270,100%,60%)]" />
          </div>
          <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest inline-flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-[hsl(270,100%,60%)] animate-pulse" />
            Aceptando proyectos
          </span>
        </div>

        <div className="mt-6 max-w-[80%]">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="h-3.5 w-4/5 bg-white rounded mb-2"
          />
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.4 }}
            className="h-3 w-2/3 bg-white/30 rounded mb-3"
          />
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="h-2 w-full bg-white/15 rounded mb-1"
          />
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.4 }}
            className="h-2 w-4/5 bg-white/15 rounded"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 bg-[hsl(270,100%,60%)] text-white text-xs font-bold rounded-sm w-max shadow-[0_0_30px_-6px_hsl(270,100%,60%)]"
        >
          Quiero hablar con vosotros
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 1, 1],
            scale: [0, 1.4, 1, 1],
          }}
          transition={{
            delay: 1.7,
            duration: 0.6,
            times: [0, 0.5, 0.8, 1],
          }}
          className="absolute right-5 bottom-5"
        >
          <span className="absolute inset-0 rounded-full bg-[hsl(270,100%,60%)]/40 animate-ping" />
          <span className="relative block w-3 h-3 rounded-full bg-[hsl(270,100%,60%)] shadow-[0_0_15px_hsl(270,100%,60%)]" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{
          opacity: [0, 1, 1, 0],
          scale: [0.85, 1, 1, 0.95],
        }}
        transition={{
          delay: 2.4,
          duration: 2.6,
          times: [0, 0.2, 0.7, 1],
        }}
        className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/85 backdrop-blur-md border border-[hsl(270,100%,60%)]/40 rounded-full px-4 py-2 text-xs text-white font-medium inline-flex items-center gap-2 shadow-2xl"
      >
        <Smile className="w-3.5 h-3.5 text-[hsl(270,100%,75%)]" />
        Vale, hablo con ellos.
      </motion.div>
    </div>
  );
}

function GoodBrowser({ loopKey }: { loopKey: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="relative rounded-xl border border-[hsl(270,100%,60%)]/30 bg-[#0a0a0a] overflow-hidden shadow-[0_20px_60px_-20px_hsl(270,100%,60%,0.4)]"
      data-testid="card-good-website"
    >
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[#0f0f0f] border-b border-white/5">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        <span className="ml-3 text-[10px] font-mono text-white/40 truncate">
          tu-negocio.com
        </span>
      </div>

      <div className="relative h-[260px] md:h-[300px] bg-gradient-to-br from-[#0c0014] via-[#100022] to-black overflow-hidden">
        <GoodBrowserContent key={loopKey} />
      </div>

      <div className="px-4 py-3 bg-[#0f0f0f] border-t border-[hsl(270,100%,60%)]/15 flex items-center justify-between text-[11px]">
        <span className="text-[hsl(270,100%,75%)] font-mono uppercase tracking-widest">
          Tu nueva web
        </span>
        <span className="text-white/45">Rápida · Clara · Convierte</span>
      </div>
    </motion.div>
  );
}

export function ProblemAnimated() {
  const reduce = useReducedMotion();
  const [loopKey, setLoopKey] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(
      () => setLoopKey((k) => k + 1),
      LOOP_INTERVAL,
    );
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <section
      aria-labelledby="problem-title"
      className="relative py-24 md:py-36 overflow-hidden border-t border-white/5"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[hsl(270,100%,60%)]/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-white/5 border border-white/10 text-white/65 text-[11px] tracking-widest uppercase">
              El problema
            </span>
            <h2
              id="problem-title"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-white leading-[1.05]"
            >
              Una web profesional no es la que queda{" "}
              <span className="text-white/35">bonita</span>.
              <br />
              Es la que{" "}
              <span className="bg-gradient-to-r from-[hsl(270,100%,75%)] to-white bg-clip-text text-transparent">
                convierte visitas en clientes
              </span>
              .
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-20">
          {reduce ? (
            <>
              <div className="rounded-xl border border-red-500/20 bg-[#0a0a0a] p-6 text-white/60 text-sm">
                Web antigua: lenta, confusa, sin acción → el usuario se va.
              </div>
              <div className="rounded-xl border border-[hsl(270,100%,60%)]/30 bg-[#0a0a0a] p-6 text-white/80 text-sm">
                Tu nueva web: rápida, clara, con una acción obvia → convierte.
              </div>
            </>
          ) : (
            <>
              <BadBrowser loopKey={loopKey} />
              <GoodBrowser loopKey={loopKey} />
            </>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative rounded-2xl border border-[hsl(270,100%,60%)]/30 bg-gradient-to-br from-[hsl(270,100%,60%)]/[0.08] via-white/[0.02] to-transparent backdrop-blur-sm p-8 md:p-10 overflow-hidden"
          data-testid="card-problem-stat"
        >
          <div
            className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[hsl(270,100%,60%)]/15 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-10 text-center md:text-left">
            <div className="shrink-0 inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-[hsl(270,100%,60%)]/15 border border-[hsl(270,100%,60%)]/40 text-[hsl(270,100%,80%)]">
              <Timer className="w-10 h-10 md:w-12 md:h-12" />
            </div>
            <p className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white leading-tight">
              Tu web tiene{" "}
              <span className="bg-gradient-to-r from-[hsl(270,100%,75%)] to-white bg-clip-text text-transparent">
                3 segundos
              </span>{" "}
              para ganarse la confianza del visitante.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
