import { Link } from "wouter";
import { InteractiveBackground } from "@/components/layout/InteractiveBackground";
import { useSeo } from "@/lib/useSeo";
import { webPageLd, breadcrumbLd } from "@/lib/structured-data";

export default function PoliticaPrivacidad() {
  useSeo({
    title: "Política de Privacidad · Proyecto IX",
    description:
      "Política de privacidad de Proyecto IX, agencia de diseño y desarrollo web en Menorca. Cómo tratamos tus datos personales conforme al RGPD y la LOPDGDD.",
    canonical: "https://proyectoix.com/politica-privacidad",
    jsonLd: [
      webPageLd({
        url: "https://proyectoix.com/politica-privacidad",
        name: "Política de Privacidad · Proyecto IX",
        description:
          "Cómo tratamos tus datos personales conforme al RGPD y la LOPDGDD.",
      }),
      breadcrumbLd([
        { name: "Inicio", url: "https://proyectoix.com/" },
        {
          name: "Política de Privacidad",
          url: "https://proyectoix.com/politica-privacidad",
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

        <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mb-8">Política de Privacidad</h1>

        <div className="prose-sm text-white/60 space-y-6 leading-relaxed text-sm">
          <p><strong className="text-white/80">Última actualización:</strong> Mayo de 2026</p>

          <p>
            En Proyecto IX nos tomamos en serio tu privacidad. Esta política
            explica de forma clara qué datos recogemos, para qué los usamos y
            qué derechos tienes, conforme al{" "}
            <strong className="text-white/80">Reglamento (UE) 2016/679 (RGPD)</strong>{" "}
            y a la{" "}
            <strong className="text-white/80">Ley Orgánica 3/2018, de Protección de Datos Personales y Garantía de los Derechos Digitales (LOPDGDD)</strong>.
          </p>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-white/90">1. Responsable del tratamiento</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong className="text-white/80">Titular:</strong> Proyecto IX (Izan Sánchez Ginés y Xaloc)</li>
              <li><strong className="text-white/80">NIF:</strong> 49155013B</li>
              <li><strong className="text-white/80">Domicilio:</strong> Menorca, Illes Balears, España</li>
              <li><strong className="text-white/80">Email:</strong> hola@proyectoix.com</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-white/90">2. Datos que recogemos</h2>
            <p>Solo tratamos los datos que tú nos facilitas voluntariamente:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong className="text-white/80">Formulario de contacto:</strong>{" "}
                nombre del negocio, teléfono o email de contacto, situación
                actual de tu web y, opcionalmente, una breve descripción de tu
                proyecto.
              </li>
              <li>
                <strong className="text-white/80">Newsletter:</strong>{" "}
                dirección de correo electrónico.
              </li>
              <li>
                <strong className="text-white/80">Datos de navegación:</strong>{" "}
                no utilizamos cookies analíticas ni de seguimiento. Solo se
                emplean cookies estrictamente técnicas necesarias para el
                funcionamiento del sitio.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-white/90">3. Finalidad y base legal</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-white/80">Atender tu consulta</strong>{" "}
                a través del formulario de contacto.
                <br />
                <em className="text-white/45">
                  Base legal: consentimiento del interesado (art. 6.1.a RGPD)
                  y aplicación de medidas precontractuales a petición del
                  interesado (art. 6.1.b RGPD).
                </em>
              </li>
              <li>
                <strong className="text-white/80">Enviarte la newsletter</strong>{" "}
                con contenido sobre el proyecto y consejos de diseño y
                marketing web.
                <br />
                <em className="text-white/45">
                  Base legal: consentimiento expreso del interesado al marcar
                  la casilla de aceptación (art. 6.1.a RGPD).
                </em>
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-white/90">4. Plazo de conservación</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Los datos del formulario de contacto se conservan durante el
                tiempo necesario para gestionar tu consulta y, si llegamos a
                colaborar, durante la relación comercial y los plazos
                legalmente exigibles (mínimo 4 años por obligaciones fiscales
                cuando aplique).
              </li>
              <li>
                Los datos de la newsletter se conservan mientras no te des de
                baja. Puedes hacerlo en cualquier momento desde el enlace al
                pie de cada email.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-white/90">5. Destinatarios y encargados del tratamiento</h2>
            <p>
              No cedemos tus datos a terceros salvo obligación legal. Para
              poder prestarte el servicio, sí trabajamos con los siguientes
              <strong className="text-white/80"> encargados del tratamiento</strong>,
              todos ellos con garantías adecuadas conforme al RGPD:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong className="text-white/80">Hostinger International Ltd.</strong>{" "}
                — alojamiento del sitio web y, en su caso, gestión de email.
              </li>
              <li>
                <strong className="text-white/80">Beehiiv Inc. (EE.&nbsp;UU.)</strong>{" "}
                — plataforma de envío de la newsletter.
              </li>
              <li>
                <strong className="text-white/80">Google LLC (EE.&nbsp;UU.)</strong>{" "}
                — Gmail / Google Workspace, utilizado para recibir y responder
                las consultas del formulario de contacto.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-white/90">6. Transferencias internacionales</h2>
            <p>
              Algunos de nuestros proveedores (Beehiiv y Google) están
              ubicados en EE.&nbsp;UU. Estas transferencias se amparan en las
              <strong className="text-white/80"> Cláusulas Contractuales Tipo</strong>{" "}
              aprobadas por la Comisión Europea y/o en el{" "}
              <strong className="text-white/80">EU-US Data Privacy Framework</strong>,
              que ofrecen garantías adecuadas conforme al RGPD.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-white/90">7. Decisiones automatizadas</h2>
            <p>
              No realizamos elaboración de perfiles ni decisiones automatizadas
              que produzcan efectos jurídicos sobre el usuario.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-white/90">8. Tus derechos</h2>
            <p>Como titular de los datos, tienes derecho a:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong className="text-white/80">Acceso</strong> a tus datos personales.</li>
              <li><strong className="text-white/80">Rectificación</strong> de datos inexactos.</li>
              <li><strong className="text-white/80">Supresión</strong> ("derecho al olvido") cuando ya no sean necesarios.</li>
              <li><strong className="text-white/80">Oposición</strong> al tratamiento.</li>
              <li><strong className="text-white/80">Limitación</strong> del tratamiento en determinados supuestos.</li>
              <li><strong className="text-white/80">Portabilidad</strong> de tus datos a otro responsable.</li>
              <li><strong className="text-white/80">Retirar el consentimiento</strong> en cualquier momento, sin que ello afecte a la licitud del tratamiento previo.</li>
            </ul>
            <p>
              Puedes ejercer estos derechos enviando un email a{" "}
              <a href="mailto:hola@proyectoix.com" className="underline hover:text-white">
                hola@proyectoix.com
              </a>{" "}
              indicando claramente cuál es tu solicitud y acompañando una copia
              de tu DNI o documento equivalente que acredite tu identidad.
            </p>
            <p>
              Si consideras que el tratamiento de tus datos no se ajusta a la
              normativa, también puedes presentar una reclamación ante la{" "}
              <strong className="text-white/80">Agencia Española de Protección de Datos (AEPD)</strong>{" "}
              en{" "}
              <a
                href="https://www.aepd.es"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                www.aepd.es
              </a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-white/90">9. Medidas de seguridad</h2>
            <p>
              Aplicamos medidas técnicas y organizativas adecuadas (cifrado
              TLS en todas las comunicaciones, control de acceso, alojamiento
              seguro) para proteger tus datos contra el acceso no autorizado,
              la alteración, la divulgación o la destrucción.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-white/90">10. Cambios en esta política</h2>
            <p>
              Podemos actualizar esta política para reflejar cambios legales o
              en nuestros servicios. Publicaremos cualquier modificación en
              esta misma página, indicando la fecha de la última
              actualización.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex items-center gap-4 text-white/20 text-xs">
          <Link href="/aviso-legal" className="hover:text-white/40 transition-colors">Aviso Legal</Link>
          <span>·</span>
          <Link href="/politica-cookies" className="hover:text-white/40 transition-colors">Cookies</Link>
          <span>·</span>
          <Link href="/" className="hover:text-white/40 transition-colors">Volver al inicio</Link>
        </div>
      </div>
    </div>
  );
}
