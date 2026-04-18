import { Link } from "wouter";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-black/40">
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 py-12 space-y-8">
        {/* Bloque SEO local — discreto pero presente en el DOM */}
        <p className="text-xs md:text-sm text-white/35 leading-relaxed max-w-3xl">
          Somos un estudio de <strong className="text-white/55 font-normal">diseño web en Menorca</strong>{" "}
          especializado en pequeños y medianos negocios. Ofrecemos{" "}
          <strong className="text-white/55 font-normal">desarrollo web en Menorca</strong> con tecnología
          actual, inteligencia artificial integrada y orientación a resultados. 
        </p>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pt-6 border-t border-white/10">
          <div className="space-y-2">
            <p className="text-white/40 text-xs font-mono uppercase tracking-widest">
              Proyecto IX © {year} · Menorca, Islas Baleares
            </p>
            <p className="text-white/25 text-xs font-mono uppercase tracking-widest">
              Diseño web Menorca · Desarrollo web Menorca
            </p>
          </div>

          <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-4 gap-y-2 text-white/30 text-xs">
            <Link href="/politica-privacidad" className="hover:text-white/60 transition-colors">
              Política de Privacidad
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/aviso-legal" className="hover:text-white/60 transition-colors">
              Aviso Legal
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/politica-cookies" className="hover:text-white/60 transition-colors">
              Cookies
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
