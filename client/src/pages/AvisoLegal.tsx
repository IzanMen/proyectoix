import { Link } from "wouter";
import { InteractiveBackground } from "@/components/layout/InteractiveBackground";
import { useSeo } from "@/lib/useSeo";
import { webPageLd, breadcrumbLd } from "@/lib/structured-data";

export default function AvisoLegal() {
  useSeo({
    title: "Aviso Legal · Proyecto IX",
    description:
      "Aviso legal de Proyecto IX, agencia de diseño y desarrollo web en Menorca. Información legal y términos de uso del sitio web.",
    canonical: "https://proyectoix.com/aviso-legal",
    jsonLd: [
      webPageLd({
        url: "https://proyectoix.com/aviso-legal",
        name: "Aviso Legal · Proyecto IX",
        description:
          "Información legal y términos de uso del sitio web de Proyecto IX.",
      }),
      breadcrumbLd([
        { name: "Inicio", url: "https://proyectoix.com/" },
        { name: "Aviso Legal", url: "https://proyectoix.com/aviso-legal" },
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

        <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mb-8">Aviso Legal</h1>

        <div className="prose-sm text-white/60 space-y-6 leading-relaxed text-sm">
          <p><strong className="text-white/80">Última actualización:</strong> Abril 2026</p>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-white/90">1. Datos identificativos</h2>
            <p>En cumplimiento con el deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico, a continuación se reflejan los siguientes datos:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Denominación: Izan & Xaloc (Proyecto IX)</li>
              <li>Domicilio: Menorca, Islas Baleares, España</li>
              <li>Email: hola@proyectoix.com</li>
              <li>Actividad: Diseño y desarrollo web, marketing digital</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-white/90">2. Objeto</h2>
            <p>El presente sitio web tiene como objeto facilitar información sobre los servicios de diseño y desarrollo web, SEO y marketing digital ofrecidos por Proyecto IX, así como permitir la suscripción al email diario y el contacto a través de formulario.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-white/90">3. Propiedad intelectual e industrial</h2>
            <p>Todos los contenidos del sitio web, incluyendo textos, imágenes, diseño gráfico, código fuente, logos y demás elementos, son propiedad de Proyecto IX o se utilizan con la debida autorización, y están protegidos por la normativa de propiedad intelectual e industrial.</p>
            <p>Queda prohibida su reproducción, distribución, comunicación pública o transformación sin autorización expresa.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-white/90">4. Responsabilidad</h2>
            <p>Proyecto IX no se hace responsable de los daños o perjuicios que pudieran derivarse del acceso o uso del sitio web, incluyendo errores u omisiones en los contenidos, falta de disponibilidad del sitio o la transmisión de virus o programas maliciosos.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-white/90">5. Enlaces externos</h2>
            <p>Este sitio web puede contener enlaces a sitios de terceros. Proyecto IX no se responsabiliza del contenido, políticas de privacidad o prácticas de dichos sitios.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-white/90">6. Legislación aplicable</h2>
            <p>El presente aviso legal se rige por la legislación española. Para la resolución de cualquier controversia, las partes se someten a los Juzgados y Tribunales de Menorca, Islas Baleares.</p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex items-center gap-4 text-white/20 text-xs">
          <Link href="/politica-privacidad" className="hover:text-white/40 transition-colors">Privacidad</Link>
          <span>·</span>
          <Link href="/politica-cookies" className="hover:text-white/40 transition-colors">Cookies</Link>
          <span>·</span>
          <Link href="/" className="hover:text-white/40 transition-colors">Volver al inicio</Link>
        </div>
      </div>
    </div>
  );
}
