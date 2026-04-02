import { Link } from "wouter";
import { motion } from "framer-motion";
import { InteractiveBackground } from "@/components/layout/InteractiveBackground";
import { Check } from "lucide-react";

export default function Confirmado() {
  return (
    <div className="min-h-[100dvh] relative flex flex-col items-center justify-center px-6">
      <InteractiveBackground />

      <Link
        href="/"
        className="absolute top-6 left-6 z-20 flex items-center gap-1 group"
        data-testid="link-home"
      >
        <span className="text-2xl font-display font-bold tracking-tighter text-white">IX</span>
        <span className="w-2 h-2 bg-[hsl(270,100%,60%)] rounded-full mt-1 shadow-[0_0_15px_hsl(270,100%,60%)] animate-pulse"></span>
      </Link>

      <div className="relative z-10 w-full max-w-lg text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-6"
        >
          <div className="w-16 h-16 rounded-full bg-[hsl(270,100%,60%)]/20 border border-[hsl(270,100%,60%)]/40 flex items-center justify-center">
            <Check className="w-8 h-8 text-[hsl(270,100%,60%)]" />
          </div>
          <h1
            className="text-3xl sm:text-4xl font-display font-bold text-white"
            data-testid="text-confirmed-title"
          >
            Tu email ya está confirmado.
          </h1>
          <p
            className="text-white/50 text-base sm:text-lg max-w-md leading-relaxed"
            data-testid="text-confirmed-message"
          >
            Mañana recibirás nuestro primer email.
          </p>
          <Link
            href="/"
            className="text-sm text-white/40 hover:text-white/70 transition-colors mt-4"
            data-testid="link-back-home"
          >
            Volver a ix.studio
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
