import { Link } from "wouter";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { InteractiveBackground } from "@/components/layout/InteractiveBackground";
import { useSeo } from "@/lib/useSeo";

export default function Suscrito() {
  useSeo({
    title: "¡Estás dentro! · Proyecto IX",
    description:
      "Tu suscripción al email diario de Proyecto IX está confirmada. Mañana mismo recibirás el primer correo.",
    canonical: "https://proyectoix.com/suscrito",
    noIndex: true,
  });

  return (
    <div className="min-h-[100dvh] relative flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-20">
      <InteractiveBackground />

      <Link
        href="/"
        className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 flex items-center gap-1 group"
        data-testid="link-home"
      >
        <span className="text-2xl font-display font-bold tracking-tighter text-white">IX</span>
        <span className="w-2 h-2 bg-[hsl(270,100%,60%)] rounded-full mt-1 shadow-[0_0_15px_hsl(270,100%,60%)] animate-pulse"></span>
      </Link>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-xl flex flex-col items-center gap-7 text-center"
      >
        <div
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[hsl(270,100%,60%)]/40 bg-[hsl(270,100%,60%)]/10 flex items-center justify-center shadow-[0_0_60px_-10px_hsl(270,100%,60%)]"
          data-testid="icon-success"
        >
          <Check className="w-8 h-8 sm:w-10 sm:h-10 text-[hsl(270,100%,70%)]" strokeWidth={2.5} />
        </div>

        <div className="space-y-3">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tight leading-[1.1]"
            data-testid="text-confirmed-title"
          >
            ¡Estás dentro!
          </h1>
          <p
            className="text-white/60 text-base sm:text-lg max-w-md mx-auto leading-relaxed"
            data-testid="text-confirmed-message"
          >
            Tu suscripción al email diario está confirmada. Mañana mismo recibirás el primer correo.
          </p>
        </div>

        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 text-left">
          <p className="text-white/50 text-xs uppercase tracking-[0.2em] mb-2">Mientras tanto</p>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed">
            Añade <span className="text-[hsl(270,100%,70%)] font-semibold">hola@proyectoix.com</span> a tus contactos para que el correo no te caiga en spam.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center h-11 px-6 rounded-md bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors"
          data-testid="link-back-home"
        >
          Volver al inicio
        </Link>

        <div className="flex items-center justify-center gap-4 text-white/20 text-[10px] sm:text-xs pt-4 border-t border-white/5 w-full max-w-md">
          <Link href="/politica-privacidad" className="hover:text-white/40 transition-colors">Política de Privacidad</Link>
          <span>·</span>
          <Link href="/aviso-legal" className="hover:text-white/40 transition-colors">Aviso Legal</Link>
          <span>·</span>
          <Link href="/politica-cookies" className="hover:text-white/40 transition-colors">Cookies</Link>
        </div>
      </motion.div>
    </div>
  );
}
