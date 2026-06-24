import { useEffect, useState } from "react";
import { Link } from "wouter";
import { getConsent, setConsent, type ConsentStatus } from "@/lib/consent";

const ANIM_MS = 400;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export function CookieBanner() {
  const [status, setStatus] = useState<ConsentStatus>(null);
  const [render, setRender] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    // Pequeño delay para no competir con el LCP de la primera pintura.
    const t = window.setTimeout(() => {
      const current = getConsent();
      setStatus(current);
      if (current === null) setRender(true);
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

  // Anima la entrada en el siguiente frame tras montar.
  useEffect(() => {
    if (!render) return;
    const r = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(r);
  }, [render]);

  // Al dar consentimiento, reproduce la salida y desmonta.
  useEffect(() => {
    if (!render || status === null) return;
    setShown(false);
    const t = window.setTimeout(() => setRender(false), ANIM_MS);
    return () => window.clearTimeout(t);
  }, [status, render]);

  if (!render) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[60] px-3 sm:px-4"
      style={{
        paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
        transform: shown ? "translateY(0)" : "translateY(80px)",
        opacity: shown ? 1 : 0,
        transition: `transform ${ANIM_MS}ms ${EASE}, opacity ${ANIM_MS}ms ${EASE}`,
        willChange: "transform, opacity",
      }}
      role="region"
      aria-label="Aviso de cookies"
      data-testid="cookie-banner"
    >
      <div className="mx-auto max-w-3xl rounded-xl border border-white/10 bg-black/85 backdrop-blur-md shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-white/75 text-[13px] sm:text-sm leading-relaxed">
            Usamos cookies estrictamente técnicas para que la web funcione. No
            usamos cookies de publicidad ni de seguimiento. Más información en
            nuestra{" "}
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
    </div>
  );
}
