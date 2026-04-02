import { useState, useRef } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { InteractiveBackground } from "@/components/layout/InteractiveBackground";
import { ArrowRight, Check } from "lucide-react";

export default function EmailDiario() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.message || "Algo ha fallado. Inténtalo de nuevo.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMsg("Error de conexión. Inténtalo de nuevo.");
      setStatus("error");
    }
  };

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
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-6"
            >
              <div className="w-16 h-16 rounded-full bg-[hsl(270,100%,60%)]/20 border border-[hsl(270,100%,60%)]/40 flex items-center justify-center">
                <Check className="w-8 h-8 text-[hsl(270,100%,60%)]" />
              </div>
              <h2
                className="text-3xl sm:text-4xl font-display font-bold text-white"
                data-testid="text-success-title"
              >
                Estás dentro.
              </h2>
              <p className="text-white/50 text-base max-w-sm leading-relaxed" data-testid="text-success-message">
                Revisa tu bandeja de entrada para confirmar tu suscripción. A partir de mañana, recibirás tu primer email.
              </p>
              <Link
                href="/"
                className="text-sm text-white/40 hover:text-white/70 transition-colors mt-4"
                data-testid="link-back-home"
              >
                Volver a ix.studio
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-8"
            >
              <div className="space-y-4">
                <h1
                  className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white leading-[1.1] tracking-tight"
                  data-testid="text-headline"
                >
                  Lo que no contamos
                  <br />
                  <span className="text-white/40">en redes.</span>
                </h1>
                <p
                  className="text-white/50 text-base sm:text-lg max-w-md mx-auto leading-relaxed"
                  data-testid="text-description"
                >
                  Cada día escribo un email con lo que estamos construyendo, cómo van nuestros clientes, y tips reales para mejorar tu web. Sin filtros.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="w-full max-w-md"
                data-testid="form-subscribe"
              >
                <div className="relative flex items-center">
                  <input
                    ref={inputRef}
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    placeholder="tu@email.com"
                    required
                    autoFocus
                    className="w-full h-14 pl-5 pr-14 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/25 text-base focus:outline-none focus:border-[hsl(270,100%,60%)]/50 focus:ring-1 focus:ring-[hsl(270,100%,60%)]/30 transition-all"
                    data-testid="input-email"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading" || !email}
                    className="absolute right-2 w-10 h-10 flex items-center justify-center rounded-md bg-white text-black hover:bg-white/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    data-testid="button-subscribe"
                  >
                    {status === "loading" ? (
                      <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <AnimatePresence>
                  {status === "error" && errorMsg && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-400/80 text-sm mt-3 text-center"
                      data-testid="text-error"
                    >
                      {errorMsg}
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>

              <p className="text-white/20 text-xs tracking-wide" data-testid="text-author">
                Escrito por Izan — cada día, desde Menorca.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
