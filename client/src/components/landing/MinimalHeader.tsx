import { motion } from "framer-motion";

export function MinimalHeader() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/5"
    >
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        <a
          href="#top"
          data-testid="link-header-logo"
          className="inline-flex items-center gap-1.5 group"
          aria-label="Proyecto IX"
        >
          <img
            src="/favicon.png"
            alt="Proyecto IX"
            className="h-7 w-auto"
            draggable={false}
          />
        </a>
        <span
          className="hidden sm:inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/55"
          aria-hidden="true"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[hsl(270,100%,60%)] animate-pulse shadow-[0_0_8px_hsl(270,100%,60%)]" />
          Aceptando proyectos
        </span>
      </div>
    </motion.header>
  );
}
