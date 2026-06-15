import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { getConsent, setConsent, type ConsentStatus } from "@/lib/consent";

export function CookieBanner() {
  const [status, setStatus] = useState<ConsentStatus>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Pequeño delay para no competir con el LCP de la primera pintura.
    const t = window.setTimeout(() => {
      setStatus(getConsent());
      setMounted(true);
    }, 300);

    const onChange = (e: Event) => {
      const detail = (e as CustomEvent).detail as ConsentStatus;
      setStatus(detail);
    };
    window.addEventListener("ix-consent-change", onChange as EventListener);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener(
        "ix-consent-change",
        onChange as EventListener,
      );
    };
  }, []);

  const visible = mounted && status === null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-[60] px-3 sm:px-4"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
          role="region"
          aria-label="Aviso de cookies"
          data-testid="cookie-banner"
        >
          <div className="mx-auto max-w-3xl rounded-xl border border-white/10 bg-black/85 backdrop-blur-md shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] p-4 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-white/75 text-[13px] sm:text-sm leading-relaxed">
                Usamos cookies estrictamente técnicas para que la web funcione.
                No usamos cookies de publicidad ni de seguimiento. Más
                información en nuestra{" "}
                <Link
                  href="/politica-cookies"
                  className="underline text-white hover:text-[hsl(270,100%,75%)] transition-colors"
                  data-testid="link-cookie-policy"
                >
                  política de cookies
                </Link>
                .
              </p>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setConsent("rejected")}
                  data-testid="button-cookie-reject"
                  className="px-4 py-2 rounded-md border border-white/20 bg-white/5 text-white/80 text-sm font-medium hover:bg-white/10 hover:text-white transition-colors"
                >
                  Rechazar
                </button>
                <button
                  type="button"
                  onClick={() => setConsent("accepted")}
                  data-testid="button-cookie-accept"
                  className="px-4 py-2 rounded-md bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors"
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
