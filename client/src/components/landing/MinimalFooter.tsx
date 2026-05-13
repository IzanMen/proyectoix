import { Link } from "wouter";

export function MinimalFooter() {
  return (
    <footer
      className="relative border-t border-white/5 bg-black/30"
      role="contentinfo"
    >
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-white text-sm font-display font-bold tracking-tight">
              Proyecto IX
            </p>
            <p className="text-white/45 text-xs mt-1">
              Diseño y desarrollo web en Menorca
            </p>
          </div>
          <div className="text-xs text-white/45 flex flex-wrap items-center gap-x-3 gap-y-1">
            <a
              href="mailto:hola@proyectoix.com"
              data-testid="link-footer-email"
              className="hover:text-white transition-colors"
            >
              hola@proyectoix.com
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="https://www.instagram.com/proyecto.ix/"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-footer-instagram"
              className="hover:text-white transition-colors"
            >
              @proyecto.ix
            </a>
            <span aria-hidden="true">·</span>
            <Link
              href="/politica-privacidad"
              data-testid="link-footer-privacy"
              className="hover:text-white transition-colors"
            >
              Política de privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
