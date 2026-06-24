import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Hammer,
  CheckCircle2,
} from "lucide-react";
import { FadeIn } from "../layout/FadeIn";

interface ProjectItem {
  type: string;
  client: string;
  url: string;
  image: string;
  accent: string;
  status: "live" | "soon";
}

const projects: ProjectItem[] = [
  {
    type: "Evento de baloncesto en Menorca",
    client: "Menorca All Star",
    url: "https://menorca-all-star.replit.app/",
    image: "/projects/menorcaallstar.webp",
    accent: "Inscripciones · Landing épica · Menorca",
    status: "live",
  },
  {
    type: "Medicina estética en Madrid",
    client: "Dr. Rodríguez Esteban",
    url: "https://drrodriguezesteban.com/",
    image: "/projects/drrodriguezesteban.webp",
    accent: "Citas online · Tratamientos · MonaLisa Touch",
    status: "live",
  },
  {
    type: "Club de atletismo en Menorca",
    client: "Lô Esport Menorca",
    url: "https://www.loesport.es/",
    image: "/projects/loesport.webp",
    accent: "Grupos · Competiciones · Patrocinadores",
    status: "live",
  },
  {
    type: "Apartamentos en Cala Galdana",
    client: "Xaloc & Garbí",
    url: "https://www.xalocgarbi.com/",
    image: "/projects/xaloc.webp",
    accent: "Reservas directas · Galería · Reviews",
    status: "live",
  },
  {
    type: "Hamburguesería en Maó",
    client: "Disbarat",
    url: "https://disbarat.com/",
    image: "/projects/disbarat.webp",
    accent: "Reservas online · Carta digital · 4 idiomas",
    status: "live",
  },
  {
    type: "Finca de cría en Alaior",
    client: "Finca Els Almuds",
    url: "/",
    image: "/projects/burrada.webp",
    accent: "Catálogo · Blog · 3 idiomas",
    status: "soon",
  },
];

// Visual layout per relative position in the coverflow.
const LAYOUT: Record<
  number,
  { x: string; scale: number; rotateY: number; opacity: number; z: number }
> = {
  0: { x: "0%", scale: 1, rotateY: 0, opacity: 1, z: 40 },
  1: { x: "64%", scale: 0.82, rotateY: -32, opacity: 0.55, z: 30 },
  [-1]: { x: "-64%", scale: 0.82, rotateY: 32, opacity: 0.55, z: 30 },
  2: { x: "115%", scale: 0.64, rotateY: -42, opacity: 0.22, z: 20 },
  [-2]: { x: "-115%", scale: 0.64, rotateY: 42, opacity: 0.22, z: 20 },
};

function ProjectCard({
  item,
  position,
  isCenter,
  onSelect,
  onSwipe,
}: {
  item: ProjectItem;
  position: number;
  isCenter: boolean;
  onSelect: () => void;
  onSwipe: (dir: 1 | -1) => void;
}) {
  const hidden = Math.abs(position) > 2;
  const layout = LAYOUT[position] ?? {
    x: "0%",
    scale: 0.5,
    rotateY: 0,
    opacity: 0,
    z: 0,
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 80;
    if (info.offset.x > threshold || info.velocity.x > 500) onSwipe(-1);
    else if (info.offset.x < -threshold || info.velocity.x < -500) onSwipe(1);
  };

  return (
    <motion.article
      drag={isCenter ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.15}
      onDragEnd={handleDragEnd}
      style={{ zIndex: layout.z, transformStyle: "preserve-3d" }}
      initial={false}
      animate={{
        x: layout.x,
        scale: layout.scale,
        rotateY: layout.rotateY,
        opacity: hidden ? 0 : layout.opacity,
      }}
      transition={{ type: "spring", stiffness: 220, damping: 30 }}
      className={`absolute inset-0 rounded-3xl overflow-hidden bg-black select-none ${
        isCenter
          ? "shadow-[0_40px_120px_-30px_rgba(124,58,237,0.45)] cursor-grab active:cursor-grabbing ring-1 ring-white/15"
          : "shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] cursor-pointer ring-1 ring-white/5"
      } ${hidden ? "pointer-events-none" : ""}`}
      onClick={() => {
        if (!isCenter) onSelect();
      }}
      data-testid={`card-project-${item.client}`}
      aria-hidden={hidden}
      inert={hidden}
    >
      <img
        src={item.image}
        alt={`Vista previa de la web de ${item.client}`}
        className={`absolute inset-0 w-full h-full object-cover object-top pointer-events-none ${
          item.status === "soon" ? "blur-[2px] scale-105 brightness-50" : ""
        } ${!isCenter ? "brightness-[0.6]" : ""}`}
        draggable={false}
        loading={Math.abs(position) <= 1 ? "eager" : "lazy"}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/5 pointer-events-none" />

      <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 text-[10px] font-mono">
        <span className="px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 uppercase tracking-widest text-white/70">
          Proyecto
        </span>
        {item.status === "live" ? (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/40 uppercase tracking-widest text-emerald-200">
            <CheckCircle2 className="w-3 h-3" />
            En línea
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-400/40 uppercase tracking-widest text-amber-200">
            <Hammer className="w-3 h-3" />
            En construcción
          </span>
        )}
      </div>

      {item.status === "soon" && (
        <div
          className="absolute inset-x-0 top-1/2 -translate-y-[55%] flex flex-col items-center gap-3 pointer-events-none px-6"
          role="status"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-400/95 text-black text-sm font-bold tracking-widest uppercase shadow-[0_10px_40px_-5px_rgba(251,191,36,0.7)] -rotate-3">
            <Hammer className="w-4 h-4" />
            Próximamente
          </span>
          <p className="text-center text-white/85 text-xs md:text-sm font-medium max-w-[18rem] leading-snug">
            Web en desarrollo · disponible pronto
          </p>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7 text-white">
        <p className="text-[11px] font-mono uppercase tracking-widest text-white/70">
          {item.type}
        </p>
        <h3 className="mt-1 text-2xl md:text-3xl font-display font-bold">
          {item.client}
        </h3>
        <p className="mt-1.5 text-sm text-white/75">{item.accent}</p>

        <AnimatePresence>
          {isCenter && item.status === "live" && (
            <motion.a
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3 }}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`link-project-${item.client}`}
              className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold hover:scale-[1.02] transition-transform bg-white text-black"
              draggable={false}
            >
              Ver web completa
              <ExternalLink className="w-3.5 h-3.5" />
            </motion.a>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

export function BeforeAfter() {
  const [index, setIndex] = useState(0);
  const total = projects.length;

  const go = useCallback(
    (dir: 1 | -1) => {
      setIndex((i) => (i + dir + total) % total);
    },
    [total],
  );

  // Shortest signed distance from the active card (handles looping).
  const relativePosition = (i: number) => {
    let diff = i - index;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!hovered) return;
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
      ) {
        return;
      }
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, hovered]);

  return (
    <section
      aria-labelledby="cases-title"
      className="relative py-24 md:py-32 overflow-hidden border-t border-white/5"
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-white/5 border border-white/10 text-white/65 text-[11px] tracking-widest uppercase">
              Nuestros proyectos
            </span>
            <h2
              id="cases-title"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-white leading-[1.05]"
            >
              Webs que hemos construido.
            </h2>
            <p className="mt-4 text-white/60 text-base md:text-lg">
              Navega por los proyectos. Probablemente conoces alguno de estos
              negocios.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div
            className="relative w-full"
            data-testid="carousel-projects"
            role="region"
            aria-roledescription="carrusel"
            aria-label={`Proyecto ${index + 1} de ${total}`}
            style={{ perspective: "1800px" }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {/* Stage: center slot defines card size; siblings peek out via 3D transforms */}
            <div className="relative mx-auto h-[clamp(300px,68vw,460px)] w-[clamp(280px,80vw,640px)] [transform-style:preserve-3d]">
              {projects.map((p, i) => {
                const position = relativePosition(i);
                return (
                  <ProjectCard
                    key={p.client}
                    item={p}
                    position={position}
                    isCenter={position === 0}
                    onSelect={() => setIndex(i)}
                    onSwipe={go}
                  />
                );
              })}
            </div>

            {/* Desktop arrows: floating on the sides */}
            <button
              type="button"
              onClick={() => go(-1)}
              data-testid="button-prev-project"
              aria-label="Proyecto anterior"
              className="hidden md:flex absolute left-2 lg:left-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white hover:bg-white/20 hover:scale-105 transition-all items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              data-testid="button-next-project"
              aria-label="Siguiente proyecto"
              className="hidden md:flex absolute right-2 lg:right-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white hover:bg-white/20 hover:scale-105 transition-all items-center justify-center"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Controls: mobile arrows + dots */}
          <div className="mt-8 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Proyecto anterior"
              className="md:hidden w-11 h-11 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {projects.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Ir al proyecto ${i + 1}: ${p.client}`}
                  aria-current={i === index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-8 bg-[hsl(270,100%,60%)]"
                      : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Siguiente proyecto"
              className="md:hidden w-11 h-11 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="mt-12 text-center text-white/65 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Hoy estos negocios proyectan una imagen{" "}
            <span className="text-white">más profesional</span>, generan{" "}
            <span className="text-white">más confianza</span> y reciben más
            consultas sin tener que perseguir a nadie.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
