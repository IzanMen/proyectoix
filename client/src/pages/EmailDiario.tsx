import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { InteractiveBackground } from "@/components/layout/InteractiveBackground";
import { Check, ArrowRight, Loader2 } from "lucide-react";

export default function EmailDiario() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 800);
    return () => clearTimeout(timer);
  }, []);

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

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Error");
      }

      setStatus("success");
    } catch (err: any) {
      setErrorMsg(err.message || "Algo ha fallado. Inténtalo de nuevo.");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-white selection:bg-white selection:text-black relative overflow-hidden">
      <InteractiveBackground />

      <div className="relative z-10 min-h-screen flex flex-col">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="px-6 py-6"
        >
          <Link href="/" className="inline-flex items-center gap-1 text-white/40 hover:text-white transition-colors text-sm font-mono" data-testid="link-back-home">
            <ArrowRight className="w-3 h-3 rotate-180" />
            ix.
          </Link>
        </motion.header>

        <div className="flex-1 flex items-center justify-center px-6 pb-20">
          <div className="w-full max-w-lg">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-[hsl(270,100%,60%)]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-[hsl(270,100%,60%)]" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold mb-3" data-testid="text-success-title">
                    Estás dentro.
                  </h2>
                  <p className="text-white/50 text-lg mb-8" data-testid="text-success-message">
                    Mañana recibirás tu primer email. Sin spam, sin relleno.
                  </p>
                  <Link href="/" className="text-sm text-[hsl(270,100%,60%)] hover:text-white transition-colors" data-testid="link-back-after-success">
                    Volver a la web
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xs font-mono uppercase tracking-[0.3em] text-[hsl(270,100%,60%)] mb-6"
                  >
                    Email Diario
                  </motion.p>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.1] mb-6"
                    data-testid="text-headline"
                  >
                    Lo que no contamos
                    <br />
                    <span className="text-white/30">en redes.</span>
                  </motion.h1>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-4 mb-10"
                  >
                    <p className="text-white/50 text-lg leading-relaxed" data-testid="text-description">
                      Cada día, un email con todo lo que hacemos al detalle: proyectos, decisiones, errores y aprendizajes. Sin filtros.
                    </p>
                    <div className="flex flex-col gap-2 text-white/40 text-sm">
                      <span className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-[hsl(270,100%,60%)] rounded-full"></span>
                        Tips para que tu web atraiga más clientes
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-[hsl(270,100%,60%)] rounded-full"></span>
                        Lo que funciona (y lo que no) en diseño web
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-[hsl(270,100%,60%)] rounded-full"></span>
                        Nuestro día a día construyendo IX.
                      </span>
                    </div>
                  </motion.div>

                  <motion.form
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    onSubmit={handleSubmit}
                    className="relative"
                  >
                    <div className="flex gap-3">
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
                        className="flex-1 bg-white/[0.06] border border-white/10 focus:border-[hsl(270,100%,60%)] rounded-lg px-5 py-4 text-lg outline-none transition-all placeholder:text-white/20 focus:bg-white/[0.08] focus:shadow-[0_0_20px_hsl(270,100%,60%,0.1)]"
                        data-testid="input-email"
                      />
                      <button
                        type="submit"
                        disabled={!email || status === "loading"}
                        className="px-6 py-4 bg-[hsl(270,100%,60%)] text-white font-medium rounded-lg transition-all hover:shadow-[0_0_25px_hsl(270,100%,60%,0.4)] hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none flex items-center gap-2 whitespace-nowrap"
                        data-testid="button-subscribe"
                      >
                        {status === "loading" ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            Apuntarme
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>

                    {status === "error" && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm mt-3"
                        data-testid="text-error"
                      >
                        {errorMsg}
                      </motion.p>
                    )}

                    <p className="text-white/20 text-xs mt-4" data-testid="text-privacy">
                      Sin spam. Te puedes dar de baja cuando quieras.
                    </p>
                  </motion.form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
