import { Link } from "wouter";
import { InteractiveBackground } from "@/components/layout/InteractiveBackground";
import { useSeo } from "@/lib/useSeo";
import { webPageLd, breadcrumbLd } from "@/lib/structured-data";
import { resetConsent } from "@/lib/consent";

export default function PoliticaCookies() {
  useSeo({
    title: "Política de Cookies · Proyecto IX",
    description:
      "Política de cookies de Proyecto IX. Información sobre las cookies utilizadas en el sitio y cómo gestionar tu consentimiento.",
    canonical: "https://proyectoix.com/politica-cookies",
    jsonLd: [
      webPageLd({
        url: "https://proyectoix.com/politica-cookies",
        name: "Política de Cookies · Proyecto IX",
        description:
          "Información sobre las cookies utilizadas en el sitio web de Proyecto IX y cómo gestionarlas.",
      }),
      breadcrumbLd([
        { name: "Inicio", url: "https://proyectoix.com/" },
        {
          name: "Política de Cookies",
          url: "https://proyectoix.com/politica-cookies",
        },
      ]),
    ],
  });

  return (
    <div className="min-h-[100dvh] relative px-4 sm:px-6 py-16 sm:py-20">
      <InteractiveBackground />

      <div className="relative z-10 max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1 mb-12 group"
          data-testid="link-home"
        >
          <span className="text-2xl font-display font-bold tracking-tighter text-white">IX</span>
          <span className="w-2 h-2 bg-[hsl(270,100%,60%)] rounded-full mt-1 shadow-[0_0_15px_hsl(270,100%,60%)] animate-pulse"></span>
        </Link>

        <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mb-8">Política de Cookies</h1>

        <div className="prose-sm text-white/60 space-y-6 leading-relaxed text-sm">
          <p><strong className="text-white/80">Última actualización:</strong> Mayo de 2026</p>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-white/90">1. ¿Qué son las cookies?</h2>
            <p>
              Las cookies son pequeños archivos de texto que los sitios web
              almacenan en tu dispositivo (ordenador, móvil o tablet) cuando
              los visitas. Sirven para recordar preferencias, mantener tu
              sesión y, en algunos casos, recopilar información estadística o
              publicitaria.
            </p>
            <p>
              Esta política se enmarca en lo previsto por el{" "}
              <strong className="text-white/80">artículo 22.2 de la Ley 34/2002, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE)</strong>{" "}
              y por la Guía sobre el uso de las cookies de la{" "}
              <strong className="text-white/80">Agencia Española de Protección de Datos (AEPD)</strong>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-white/90">2. Cookies que utilizamos</h2>
            <p>
              Este sitio utiliza únicamente <strong className="text-white/80">cookies estrictamente técnicas y de sesión</strong>,
              necesarias para que la web funcione correctamente y para
              recordar tu preferencia respecto al propio aviso de cookies.{" "}
              <strong className="text-white/80">No utilizamos cookies analíticas, de publicidad ni de seguimiento de terceros.</strong>
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-3 text-xs">
              <div>
                <p className="text-white/80 font-semibold">ix-cookie-consent-v1</p>
                <p className="mt-1 text-white/55">
                  Tipo: técnica · Almacenamiento: localStorage del navegador ·
                  Finalidad: recordar si has aceptado o rechazado el aviso de
                  cookies. Caducidad: persistente hasta que la borres.
                </p>
              </div>
            </div>

            <p className="text-white/45 text-xs">
              Las cookies estrictamente técnicas <strong className="text-white/65">no requieren consentimiento previo</strong>{" "}
              conforme al art. 22.2 LSSI-CE, pero te informamos de ellas por
              transparencia.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-white/90">3. Cookies de terceros</h2>
            <p>
              No incrustamos contenido de terceros que coloque cookies en tu
              navegador (por ejemplo, vídeos de YouTube, mapas de Google o
              píxeles de redes sociales). Si en el futuro lo hiciéramos, esta
              política se actualizaría y se solicitaría tu consentimiento
              previo.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-white/90">4. Gestión y revocación del consentimiento</h2>
            <p>
              Puedes revocar tu decisión sobre las cookies en cualquier
              momento. Al hacer clic en el botón siguiente, eliminaremos tu
              preferencia guardada y volveremos a mostrarte el aviso:
            </p>
            <button
              type="button"
              onClick={() => {
                resetConsent();
                if (typeof window !== "undefined") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-[hsl(270,100%,60%)]/40 bg-[hsl(270,100%,60%)]/10 text-white text-sm font-medium hover:bg-[hsl(270,100%,60%)]/20 transition-colors"
              data-testid="button-reset-consent"
            >
              Cambiar mi preferencia de cookies
            </button>

            <p className="mt-4">
              También puedes configurar tu navegador para bloquear o eliminar
              las cookies. Ten en cuenta que la desactivación de las cookies
              técnicas puede afectar al funcionamiento del sitio.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Chrome: Configuración → Privacidad y seguridad → Cookies</li>
              <li>Firefox: Ajustes → Privacidad y seguridad</li>
              <li>Safari: Preferencias → Privacidad</li>
              <li>Edge: Configuración → Cookies y permisos del sitio</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-white/90">5. Actualizaciones</h2>
            <p>
              Esta política puede actualizarse para reflejar cambios legales o
              técnicos. Publicaremos cualquier modificación en esta misma
              página, indicando la fecha de la última actualización.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-white/90">6. Contacto</h2>
            <p>
              Si tienes cualquier duda sobre esta política, escríbenos a{" "}
              <a href="mailto:hola@proyectoix.com" className="underline hover:text-white">
                hola@proyectoix.com
              </a>.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex items-center gap-4 text-white/20 text-xs">
          <Link href="/politica-privacidad" className="hover:text-white/40 transition-colors">Privacidad</Link>
          <span>·</span>
          <Link href="/aviso-legal" className="hover:text-white/40 transition-colors">Aviso Legal</Link>
          <span>·</span>
          <Link href="/" className="hover:text-white/40 transition-colors">Volver al inicio</Link>
        </div>
      </div>
    </div>
  );
}
