import { Link } from "wouter";
import { InteractiveBackground } from "@/components/layout/InteractiveBackground";
import { useSeo } from "@/lib/useSeo";
import { webPageLd, breadcrumbLd } from "@/lib/structured-data";

export default function AvisoLegal() {
  useSeo({
    title: "Aviso Legal · Proyecto IX",
    description:
      "Aviso legal de Proyecto IX, agencia de diseño y desarrollo web en Menorca. Información legal y términos de uso del sitio web conforme a la LSSI-CE.",
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
          <p><strong className="text-white/80">Última actualización:</strong> Mayo de 2026</p>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-white/90">1. Datos identificativos del titular</h2>
            <p>
              En cumplimiento del deber de información recogido en el artículo
              10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad
              de la Información y del Comercio Electrónico (LSSI-CE), se
              ofrecen los siguientes datos:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong className="text-white/80">Denominación:</strong> Proyecto IX (Izan Sánchez Ginés y Xaloc)</li>
              <li><strong className="text-white/80">NIF/DNI:</strong> [PENDIENTE — añadir DNI/NIF del titular]</li>
              <li><strong className="text-white/80">Domicilio:</strong> Menorca, Illes Balears, España</li>
              <li><strong className="text-white/80">Email de contacto:</strong> hola@proyectoix.com</li>
              <li><strong className="text-white/80">Teléfono / WhatsApp:</strong> +34 655 30 59 11</li>
              <li><strong className="text-white/80">Actividad:</strong> Diseño y desarrollo web, SEO local, marketing digital e integración de IA para negocios.</li>
              <li><strong className="text-white/80">Sitio web:</strong> https://proyectoix.com</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-white/90">2. Objeto del sitio web</h2>
            <p>
              El presente sitio web tiene como objeto facilitar información
              sobre los servicios profesionales que presta Proyecto IX, así
              como permitir el contacto comercial a través del formulario y la
              suscripción al newsletter.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-white/90">3. Condiciones de uso</h2>
            <p>
              El acceso a este sitio web atribuye la condición de usuario, que
              acepta, desde dicho acceso, las presentes condiciones generales
              de uso. El usuario se compromete a hacer un uso adecuado y lícito
              de los contenidos y servicios ofrecidos, conforme a la
              legislación vigente, la moral y el orden público.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-white/90">4. Propiedad intelectual e industrial</h2>
            <p>
              Todos los contenidos del sitio web —incluyendo textos, imágenes,
              fotografías, diseño gráfico, código fuente, marcas, logotipos y
              cualquier otro elemento— son propiedad de Proyecto IX o de sus
              autores y se utilizan con la debida autorización. Están
              protegidos por la normativa de propiedad intelectual e
              industrial.
            </p>
            <p>
              Queda expresamente prohibida su reproducción, distribución,
              comunicación pública, transformación o cualquier otra forma de
              explotación, total o parcial, sin la autorización expresa y por
              escrito del titular.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-white/90">5. Exención de responsabilidad</h2>
            <p>
              Proyecto IX no se hace responsable de los daños o perjuicios que
              pudieran derivarse del acceso o uso del sitio, incluyendo
              errores u omisiones en los contenidos, falta de disponibilidad
              del sitio o la transmisión de virus o programas maliciosos, a
              pesar de haber adoptado todas las medidas tecnológicas
              necesarias para evitarlo.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-white/90">6. Enlaces a terceros</h2>
            <p>
              Este sitio puede contener enlaces a páginas de terceros (por
              ejemplo, Instagram o WhatsApp). Proyecto IX no se responsabiliza
              del contenido, las políticas de privacidad ni las prácticas de
              dichos sitios externos.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-white/90">7. Protección de datos</h2>
            <p>
              El tratamiento de los datos personales recogidos a través de
              este sitio se realiza conforme a lo establecido en la{" "}
              <Link href="/politica-privacidad" className="underline hover:text-white">Política de Privacidad</Link>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-white/90">8. Legislación aplicable y jurisdicción</h2>
            <p>
              El presente aviso legal se rige por la legislación española.
              Para la resolución de cualquier controversia derivada del acceso
              o uso del sitio web, las partes se someten a los Juzgados y
              Tribunales de Maó (Menorca, Illes Balears), salvo que la
              normativa aplicable obligue a otra cosa cuando el usuario tenga
              la condición de consumidor.
            </p>
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
