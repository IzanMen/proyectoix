import { Link } from "wouter";

const localidades = [
  "Maó",
  "Ciutadella",
  "Alaior",
  "Es Mercadal",
  "Ferreries",
  "Sant Lluís",
  "Es Castell",
  "Sant Climent",
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative border-t border-white/10 bg-black/40"
      role="contentinfo"
    >
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 py-16 space-y-12">
        {/* Cuatro columnas: marca + navegación + servicios + legal */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1 space-y-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1 group"
              data-testid="link-footer-home"
            >
              <span className="text-2xl font-display font-bold tracking-tighter text-white">
                IX
              </span>
              <span className="w-2 h-2 bg-[hsl(270,100%,60%)] rounded-full mt-1 shadow-[0_0_15px_hsl(270,100%,60%)] animate-pulse" />
            </Link>
            <p className="text-white/45 text-sm leading-relaxed">
              Estudio de diseño y desarrollo web en Menorca. Webs a medida con
              SEO local, marketing digital e IA integrada.
            </p>
          </div>

          <nav aria-label="Secciones" className="space-y-3">
            <h2 className="text-white/40 text-[11px] font-mono uppercase tracking-widest">
              Estudio
            </h2>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <a
                  href="/#services"
                  className="hover:text-white transition-colors"
                  data-testid="link-footer-services"
                >
                  Servicios
                </a>
              </li>
              <li>
                <a
                  href="/#process"
                  className="hover:text-white transition-colors"
                  data-testid="link-footer-process"
                >
                  Proceso
                </a>
              </li>
              <li>
                <a
                  href="/#about"
                  className="hover:text-white transition-colors"
                  data-testid="link-footer-about"
                >
                  Nosotros
                </a>
              </li>
              <li>
                <a
                  href="/#faq"
                  className="hover:text-white transition-colors"
                  data-testid="link-footer-faq"
                >
                  Preguntas frecuentes
                </a>
              </li>
              <li>
                <a
                  href="/#contact"
                  className="hover:text-white transition-colors"
                  data-testid="link-footer-contact"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Servicios" className="space-y-3">
            <h2 className="text-white/40 text-[11px] font-mono uppercase tracking-widest">
              Servicios en Menorca
            </h2>
            <ul className="space-y-2 text-sm text-white/60">
              <li>Diseño web a medida</li>
              <li>Desarrollo web profesional</li>
              <li>Posicionamiento SEO local</li>
              <li>Marketing digital</li>
              <li>Mantenimiento y soporte</li>
            </ul>
          </nav>

          <nav aria-label="Recursos y contacto" className="space-y-3">
            <h2 className="text-white/40 text-[11px] font-mono uppercase tracking-widest">
              Conecta
            </h2>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <a
                  href="mailto:hola@proyectoix.com"
                  className="hover:text-white transition-colors"
                  data-testid="link-footer-email"
                >
                  hola@proyectoix.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/proyecto.ix/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  data-testid="link-footer-instagram"
                >
                  Instagram @proyecto.ix
                </a>
              </li>
              <li>
                <Link
                  href="/email-diario"
                  className="hover:text-white transition-colors"
                  data-testid="link-footer-email-diario"
                >
                  Email diario
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bloque SEO local */}
        <div className="space-y-3 pt-8 border-t border-white/10">
          <h2 className="text-white/40 text-[11px] font-mono uppercase tracking-widest">
            Cobertura en Menorca
          </h2>
          <p className="text-xs md:text-sm text-white/35 leading-relaxed">
            Trabajamos en toda la isla:{" "}
            {localidades.map((l, i) => (
              <span key={l}>
                <strong className="text-white/55 font-normal">{l}</strong>
                {i < localidades.length - 1 ? ", " : "."}
              </span>
            ))}{" "}
            Somos una <strong className="text-white/55 font-normal">agencia de diseño y desarrollo web en Menorca</strong>{" "}
            especializada en pequeños y medianos negocios. Si buscas{" "}
            <strong className="text-white/55 font-normal">marketing digital en Menorca</strong>,{" "}
            <strong className="text-white/55 font-normal">posicionamiento SEO local</strong> o
            una <strong className="text-white/55 font-normal">web a medida</strong>, podemos ayudarte.
          </p>
        </div>

        {/* Cierre */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-6 border-t border-white/10">
          <p className="text-white/40 text-xs font-mono uppercase tracking-widest">
            Proyecto IX © {year} · Hecho en Menorca
          </p>

          <nav
            aria-label="Legal"
            className="flex flex-wrap items-center gap-x-4 gap-y-2 text-white/30 text-xs"
          >
            <Link
              href="/politica-privacidad"
              className="hover:text-white/60 transition-colors"
            >
              Política de Privacidad
            </Link>
            <span aria-hidden="true">·</span>
            <Link
              href="/aviso-legal"
              className="hover:text-white/60 transition-colors"
            >
              Aviso Legal
            </Link>
            <span aria-hidden="true">·</span>
            <Link
              href="/politica-cookies"
              className="hover:text-white/60 transition-colors"
            >
              Cookies
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
