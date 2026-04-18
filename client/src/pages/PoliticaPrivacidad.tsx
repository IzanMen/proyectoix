import { Link } from "wouter";
import { InteractiveBackground } from "@/components/layout/InteractiveBackground";

export default function PoliticaPrivacidad() {
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
          <p><strong className="text-white/80">Última actualización:</strong> Abril 2026</p>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-white/90">1. Responsable del tratamiento</h2>
            <p>Izan & Xaloc (en adelante, "IX."), con domicilio en Menorca, Islas Baleares, es el responsable del tratamiento de los datos personales recogidos a través de este sitio web.</p>
            <p>Email de contacto: hola@proyectoix.com</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-white/90">2. Datos que recogemos</h2>
            <p>Recogemos los siguientes datos personales:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Dirección de correo electrónico (al suscribirse al email diario)</li>
              <li>Nombre del negocio, datos de contacto y preferencias de web (al usar el formulario de contacto)</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-white/90">3. Finalidad del tratamiento</h2>
            <p>Los datos recogidos se utilizan para:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Enviar el email diario con contenido sobre diseño web, tips y actualizaciones del proyecto</li>
              <li>Gestionar las consultas recibidas a través del formulario de contacto</li>
              <li>Responder a solicitudes de información sobre nuestros servicios</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-white/90">4. Base legal</h2>
            <p>El tratamiento de datos se basa en el consentimiento explícito del usuario, otorgado al aceptar esta política de privacidad y suscribirse al email diario o enviar el formulario de contacto.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-white/90">5. Conservación de los datos</h2>
            <p>Los datos se conservarán mientras el usuario mantenga su suscripción activa o hasta que solicite su eliminación. Los datos del formulario de contacto se conservarán durante el tiempo necesario para gestionar la consulta.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-white/90">6. Destinatarios</h2>
            <p>Los datos podrán ser comunicados a:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Beehiiv Inc. — plataforma de gestión de email utilizada para el envío del email diario</li>
              <li>Google LLC — servicio de correo electrónico utilizado para las comunicaciones del formulario de contacto</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-white/90">7. Derechos del usuario</h2>
            <p>El usuario puede ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad de los datos enviando un email a hola@proyectoix.com.</p>
            <p>También puede darse de baja del email diario en cualquier momento a través del enlace incluido en cada email.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-white/90">8. Seguridad</h2>
            <p>Aplicamos medidas técnicas y organizativas adecuadas para proteger los datos personales contra el acceso no autorizado, la alteración, la divulgación o la destrucción.</p>
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
