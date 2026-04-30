import { Link } from "wouter";
import { InteractiveBackground } from "@/components/layout/InteractiveBackground";
import { useSeo } from "@/lib/useSeo";
import { webPageLd, breadcrumbLd } from "@/lib/structured-data";

export default function PoliticaCookies() {
  useSeo({
    title: "Política de Cookies · Proyecto IX",
    description:
      "Política de cookies de Proyecto IX. Información sobre las cookies que utilizamos en el sitio web y cómo gestionarlas.",
    canonical: "https://proyectoix.com/politica-cookies",
    jsonLd: [
      webPageLd({
        url: "https://proyectoix.com/politica-cookies",
        name: "Política de Cookies · Proyecto IX",
        description:
          "Información sobre las cookies que utilizamos en el sitio web de Proyecto IX y cómo gestionarlas.",
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
          <p><strong className="text-white/80">Última actualización:</strong> Abril 2026</p>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-white/90">1. ¿Qué son las cookies?</h2>
            <p>Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo (ordenador, móvil o tablet) cuando los visitas. Se utilizan para recordar preferencias, mejorar la experiencia de navegación y recopilar información analítica.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-white/90">2. Cookies que utilizamos</h2>
            <p>Actualmente, este sitio web utiliza cookies estrictamente necesarias para su funcionamiento técnico. No utilizamos cookies de publicidad ni de seguimiento de terceros.</p>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-2">
              <p><strong className="text-white/80">Cookies técnicas:</strong> Necesarias para el correcto funcionamiento del sitio web. No requieren consentimiento.</p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-white/90">3. Gestión de cookies</h2>
            <p>Puedes configurar tu navegador para bloquear o eliminar las cookies. Ten en cuenta que la desactivación de cookies técnicas puede afectar al funcionamiento del sitio.</p>
            <p>Instrucciones por navegador:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Chrome: Configuración → Privacidad y seguridad → Cookies</li>
              <li>Firefox: Opciones → Privacidad y seguridad</li>
              <li>Safari: Preferencias → Privacidad</li>
              <li>Edge: Configuración → Cookies y permisos del sitio</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-white/90">4. Actualizaciones</h2>
            <p>Esta política de cookies puede ser actualizada en cualquier momento. Te recomendamos revisarla periódicamente para estar al corriente de cualquier cambio.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-white/90">5. Contacto</h2>
            <p>Si tienes alguna pregunta sobre nuestra política de cookies, puedes contactarnos en hola@proyectoix.com.</p>
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
