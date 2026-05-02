const items = [
  "Webs desarrolladas con IA",
  "Desde Menorca",
  "Resultados medibles",
  "Código limpio",
  "Trato directo",
];

export function CredibilityBar() {
  return (
    <aside
      aria-label="Por qué Proyecto IX"
      className="overflow-hidden border-y border-white/10 bg-white/[0.02] backdrop-blur-sm"
    >
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 py-5">
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[11px] sm:text-xs font-mono uppercase tracking-widest text-white/50">
          {items.map((item, i) => (
            <li key={item} className="flex items-center gap-6">
              <span>{item}</span>
              {i < items.length - 1 && (
                <span className="text-[hsl(270,100%,60%)] hidden sm:inline" aria-hidden="true">·</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
