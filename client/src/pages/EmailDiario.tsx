import { useState, useRef } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { InteractiveBackground } from "@/components/layout/InteractiveBackground";
import { ArrowRight } from "lucide-react";

export default function EmailDiario() {
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !accepted || status === "loading") return;

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

      <div className="relative z-10 w-full max-w-xl">
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-6 text-center"
            >
              <h2
                className="text-2xl sm:text-3xl font-display font-bold text-white uppercase tracking-wide"
                data-testid="text-success-title"
              >
                Todavía no estás suscrito
              </h2>
              <p className="text-white/60 text-base sm:text-lg max-w-md leading-relaxed" data-testid="text-success-message">
                Lo único que debes hacer es clicar en el enlace del mail que te acabamos de mandar al correo que nos has dejado.
              </p>
              <div className="w-full max-w-md rounded-2xl border border-[hsl(270,100%,60%)]/30 bg-[hsl(270,100%,60%)]/10 px-5 py-4 shadow-[0_0_40px_-18px_hsl(270,100%,60%)]">
                <p className="text-white text-sm sm:text-base font-semibold uppercase tracking-[0.2em]">
                  OJO: puede tardar 3 o 4 minutos
                </p>
                <p className="mt-2 text-[hsl(270,100%,70%)] text-sm sm:text-base leading-relaxed">
                  Si no aparece al momento, espera un poco antes de volver a intentarlo.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-6 sm:gap-8"
            >
              <div className="w-full rounded-2xl border border-[hsl(270,100%,60%)]/25 bg-black/25 p-4 sm:p-5 text-center shadow-[0_0_50px_-25px_hsl(270,100%,60%)]">
                <p className="text-[hsl(270,100%,70%)] text-[10px] sm:text-xs uppercase tracking-[0.28em] font-semibold">
                  IMPORTANTE
                </p>
                <p className="mt-2 text-white text-lg sm:text-2xl md:text-3xl font-display font-bold leading-tight">
                  Puede tardar 3 o 4 minutos en llegar.
                </p>
                <p className="mt-2 text-white/65 text-sm sm:text-base leading-relaxed">
                  Cuando te llegue, tienes que clicar el enlace de confirmación del mail.
                </p>
              </div>

              <div className="text-center space-y-3 sm:space-y-4">
                <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                  Estamos construyendo Proyecto IX en público.
                </p>
                <h1
                  className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white leading-[1.1] tracking-tight"
                  data-testid="text-headline"
                >
                  No cabe todo en redes.
                </h1>
                <p className="text-white/50 text-sm sm:text-base">
                  Por eso enviamos un <span className="text-[hsl(270,100%,70%)] font-semibold">email diario</span>.
                </p>
              </div>

              <div className="space-y-2 text-left">
                <p className="text-white/50 text-xs sm:text-sm uppercase tracking-widest mb-2">Ahí contamos TODO:</p>
                <ul className="space-y-1.5 text-white/60 text-sm sm:text-base leading-relaxed">
                  <li>– Cada <span className="text-[hsl(270,100%,70%)]">decisión que tomamos</span> (y por qué)</li>
                  <li>– <span className="text-[hsl(270,100%,70%)]">Problemas</span> que nos encontramos</li>
                  <li>– Qué <span className="text-[hsl(270,100%,70%)]">funciona</span>… y qué no</li>
                </ul>
                <p className="text-white/30 text-xs sm:text-sm mt-3">Sin buscar más visualizaciones o más seguidores.</p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="w-full space-y-3"
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
                    className="w-full h-12 sm:h-14 pl-4 sm:pl-5 pr-12 sm:pr-14 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/25 text-sm sm:text-base focus:outline-none focus:border-[hsl(270,100%,60%)]/50 focus:ring-1 focus:ring-[hsl(270,100%,60%)]/30 transition-all"
                    data-testid="input-email"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading" || !email || !accepted}
                    className="absolute right-1.5 sm:right-2 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-md bg-white text-black hover:bg-white/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    data-testid="button-subscribe"
                  >
                    {status === "loading" ? (
                      <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <label className="flex items-start gap-2.5 cursor-pointer group" data-testid="label-privacy">
                  <input
                    type="checkbox"
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/5 accent-[hsl(270,100%,60%)] cursor-pointer"
                    data-testid="checkbox-privacy"
                  />
                  <span className="text-white/40 text-xs leading-relaxed">
                    Acepto la{" "}
                    <Link
                      href="/politica-privacidad"
                      className="underline text-white/60 hover:text-white transition-colors"
                      data-testid="link-privacy"
                    >
                      política de privacidad
                    </Link>
                  </span>
                </label>

                <AnimatePresence>
                  {status === "error" && errorMsg && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-400/80 text-sm text-center"
                      data-testid="text-error"
                    >
                      {errorMsg}
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>

              <div className="space-y-2 text-left">
                <p className="text-white/50 text-xs sm:text-sm uppercase tracking-widest mb-2">Y por estar dentro, te llevas algo más:</p>
                <ul className="space-y-1.5 text-white/60 text-sm sm:text-base leading-relaxed">
                  <li>– <span className="text-[hsl(270,100%,70%)]">Tips reales</span> para mejorar tu web (sin necesidad de contratarnos)</li>
                  <li>– Cambios que puedes aplicar tú mismo y <span className="text-[hsl(270,100%,70%)]">conseguir más clientes</span></li>
                  <li>– <span className="text-[hsl(270,100%,70%)]">Ideas que usamos con clientes</span>, gratis</li>
                </ul>
                <p className="text-white/30 text-xs sm:text-sm mt-3">Aunque nunca trabajes con nosotros.</p>
              </div>

              <p className="text-white/20 text-xs tracking-wide text-center" data-testid="text-author">
                Escrito por Izan — cada día, desde Menorca.
              </p>

              <div className="flex items-center justify-center gap-4 text-white/20 text-[10px] sm:text-xs pt-4 border-t border-white/5">
                <Link href="/politica-privacidad" className="hover:text-white/40 transition-colors">Política de Privacidad</Link>
                <span>·</span>
                <Link href="/aviso-legal" className="hover:text-white/40 transition-colors">Aviso Legal</Link>
                <span>·</span>
                <Link href="/politica-cookies" className="hover:text-white/40 transition-colors">Cookies</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
