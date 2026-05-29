import { useState, useRef } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { InteractiveBackground } from "@/components/layout/InteractiveBackground";
import { useSeo } from "@/lib/useSeo";
import { webPageLd, breadcrumbLd } from "@/lib/structured-data";

export default function EmailDiario() {
  useSeo({
    title: "Tu guía gratuita · Proyecto IX | Los 5 errores que arruinan tu web",
    description:
      "Descarga gratis la guía: los 5 errores que cometen el 90% de las webs en Menorca y cómo solucionarlos. Solo tienes que dejar tu email.",
    canonical: "https://proyectoix.com/email-diario",
    jsonLd: [
      webPageLd({
        url: "https://proyectoix.com/email-diario",
        name: "Tu guía gratuita · Proyecto IX",
        description:
          "Guía gratuita: los 5 errores que cometen el 90% de las webs en Menorca y cómo solucionarlos.",
      }),
      breadcrumbLd([
        { name: "Inicio", url: "https://proyectoix.com/" },
        { name: "Guía gratuita", url: "https://proyectoix.com/email-diario" },
      ]),
    ],
  });

  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [showAcceptHint, setShowAcceptHint] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    if (!accepted) {
      setShowAcceptHint(true);
      return;
    }
    if (!email) return;

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

      <div className="relative z-10 w-full max-w-md">
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
                Guía en camino
              </h2>
              <p className="text-white/60 text-base sm:text-lg leading-relaxed" data-testid="text-success-message">
                Te acabamos de mandar un email de confirmación. Pulsa el enlace dentro para verificar tu email.
              </p>
              <div className="w-full rounded-2xl border border-[hsl(270,100%,60%)]/30 bg-[hsl(270,100%,60%)]/10 px-5 py-4 shadow-[0_0_40px_-18px_hsl(270,100%,60%)]">
                <p className="text-white text-sm sm:text-base font-semibold uppercase tracking-[0.2em]">
                  Después de confirmar, recibirás la guía
                </p>
                <p className="mt-2 text-[hsl(270,100%,70%)] text-sm sm:text-base leading-relaxed">
                  Revisa también la carpeta de spam. Puede tardar unos minutos.
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
              className="flex flex-col gap-8"
            >
              <div className="text-center space-y-3">
                <h1
                  className="text-xl sm:text-2xl md:text-3xl uppercase tracking-[0.25em] font-semibold text-[hsl(270,100%,70%)]"
                  data-testid="text-headline"
                >
                  Te la prometimos. Aquí está.
                </h1>
                <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                  Si acabas de ver el vídeo, ya sabes los 5 errores que hacen que tu web no traiga clientes.
                  Ahora te enviamos la guía completa para solucionarlos.
                </p>
              </div>

              <ul className="space-y-3 text-white/75 text-sm sm:text-base leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-[hsl(270,100%,70%)] font-bold mt-0.5">→</span>
                  <span>
                    <span className="text-white font-semibold">Error 1.</span> No apareces en Google. Nadie te encuentra.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[hsl(270,100%,70%)] font-bold mt-0.5">→</span>
                  <span>
                    <span className="text-white font-semibold">Error 2.</span> Tu web tarda más de 3 segundos. Se van el 50% antes de entrar.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[hsl(270,100%,70%)] font-bold mt-0.5">→</span>
                  <span>
                    <span className="text-white font-semibold">Error 3.</span> Es aburrida. Texto plano, imágenes malas, colores feos.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[hsl(270,100%,70%)] font-bold mt-0.5">→</span>
                  <span>
                    <span className="text-white font-semibold">Error 4.</span> No tiene un objetivo claro. Y no hay botones para que el usuario actúe.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[hsl(270,100%,70%)] font-bold mt-0.5">→</span>
                  <span>
                    <span className="text-white font-semibold">Error 5.</span> Hablas de ti en vez de responder lo que el cliente gana eligiéndote.
                  </span>
                </li>
              </ul>

              <div className="w-full rounded-2xl border border-[hsl(270,100%,60%)]/30 bg-[hsl(270,100%,60%)]/10 px-5 py-4 shadow-[0_0_40px_-18px_hsl(270,100%,60%)]">
                <p className="text-white text-sm sm:text-base font-bold uppercase tracking-wide">
                  Lo que recibes:
                </p>
                <p className="mt-1.5 text-[hsl(270,100%,75%)] text-sm sm:text-base leading-relaxed font-semibold">
                  «Los 5 errores que cometen el 90% de las webs (y cómo solucionarlos paso a paso)»
                </p>
                <p className="mt-1 text-white/50 text-xs sm:text-sm">
                  Una guía directa que puedes aplicar hoy mismo. Sin técnicas raras, sin costes extra.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="w-full space-y-4"
                data-testid="form-subscribe"
                noValidate
              >
                <div>
                  <label
                    htmlFor="email-input"
                    className="block text-white/50 text-[11px] uppercase tracking-[0.2em] font-semibold mb-2"
                  >
                    1 · Tu email
                  </label>
                  <input
                    id="email-input"
                    ref={inputRef}
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    placeholder="tu@email.com"
                    required
                    className="w-full h-14 pl-5 pr-5 bg-white/5 border border-white/15 rounded-lg text-white placeholder:text-white/25 text-base focus:outline-none focus:border-[hsl(270,100%,60%)] focus:ring-2 focus:ring-[hsl(270,100%,60%)]/30 transition-all"
                    data-testid="input-email"
                  />
                </div>

                <div>
                  <p className="block text-white/50 text-[11px] uppercase tracking-[0.2em] font-semibold mb-2">
                    2 · Acepta la privacidad
                  </p>
                  <label
                    className={`flex items-start gap-3 cursor-pointer rounded-lg border px-3 py-3 transition-all ${
                      showAcceptHint && !accepted
                        ? "border-[hsl(270,100%,60%)] bg-[hsl(270,100%,60%)]/10 shadow-[0_0_30px_-12px_hsl(270,100%,60%)]"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20"
                    }`}
                    data-testid="label-privacy"
                  >
                    <input
                      type="checkbox"
                      checked={accepted}
                      onChange={(e) => {
                        setAccepted(e.target.checked);
                        if (e.target.checked) setShowAcceptHint(false);
                      }}
                      className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/5 accent-[hsl(270,100%,60%)] cursor-pointer flex-shrink-0"
                      data-testid="checkbox-privacy"
                    />
                    <span className="text-white/70 text-sm leading-relaxed">
                      Acepto la{" "}
                      <Link
                        href="/politica-privacidad"
                        className="underline text-white hover:text-[hsl(270,100%,70%)] transition-colors"
                        data-testid="link-privacy"
                      >
                        política de privacidad
                      </Link>
                      .
                    </span>
                  </label>
                  <AnimatePresence>
                    {showAcceptHint && !accepted && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-[hsl(270,100%,75%)] text-xs mt-2 ml-1"
                        data-testid="text-accept-hint"
                      >
                        Marca la casilla para poder enviar.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

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

                <div>
                  <p className="block text-white/50 text-[11px] uppercase tracking-[0.2em] font-semibold mb-2">
                    3 · Enviar
                  </p>
                  <button
                    type="submit"
                    disabled={status === "loading" || !email}
                    className="w-full h-14 rounded-lg bg-white text-black text-base font-bold tracking-wide hover:bg-white/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    data-testid="button-subscribe"
                  >
                    {status === "loading" ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin inline-block" />
                        Enviando…
                      </span>
                    ) : (
                      "Quiero la guía"
                    )}
                  </button>
                </div>
              </form>

              <p className="text-white/30 text-xs text-center" data-testid="text-author">
                Escrito por Izan y Xaloc, desde Menorca. Sin spam, sin técnicas raras.
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
