import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight, Hammer, CheckCircle2 } from "lucide-react";
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
    type: "Club de atletismo en Menorca",
    client: "Lô Esport Menorca",
    url: "https://www.loesport.es/",
    image: "/projects/loesport.webp",
    accent: "Grupos · Competiciones · Patrocinadores",
    status: "live",
  },
  {
    type: "Hamburguesería en Maó",
    client: "Disbarat",
    url: "/",
    image: "/projects/disbarat.webp",
    accent: "Reservas online · Carta digital · 4 idiomas",
    status: "soon",
  },
  {
    type: "Apartamentos en Cala Galdana",
    client: "Xaloc & Garbí",
    url: "/",
    image: "/projects/xaloc.webp",
    accent: "Reservas directas · Galería · Reviews",
    status: "soon",
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

function ProjectCard({
  item,
  onSwipe,
  isTop,
  zIndex,
  offset,
}: {
  item: ProjectItem;
  onSwipe: (dir: 1 | -1) => void;
  isTop: boolean;
  zIndex: number;
  offset: number;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-12, 0, 12]);
  const likeOpacity = useTransform(x, [20, 120], [0, 1]);
  const nopeOpacity = useTransform(x, [-120, -20], [1, 0]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 100;
    if (info.offset.x > threshold || info.velocity.x > 500) {
      onSwipe(1);
    } else if (info.offset.x < -threshold || info.velocity.x < -500) {
      onSwipe(-1);
    }
  };

  return (
    <motion.article
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.6}
      onDragEnd={handleDragEnd}
      style={{ x: isTop ? x : 0, rotate: isTop ? rotate : 0, zIndex }}
      initial={false}
      animate={{
        scale: 1 - offset * 0.04,
        x: offset * 22,
        y: offset * 6,
        rotate: isTop ? undefined : offset * 2.5,
        opacity: offset > 2 ? 0 : 1,
      }}
      transition={{ type: "spring", stiffness: 280, damping: 30 }}
      className="absolute inset-0 rounded-3xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] cursor-grab active:cursor-grabbing select-none bg-black"
      data-testid={`card-project-${item.client}`}
      aria-hidden={!isTop}
      inert={!isTop}
    >
      <img
        src={item.image}
        alt={`Vista previa de la web de ${item.client}`}
        className={`absolute inset-0 w-full h-full object-cover object-top pointer-events-none ${item.status === "soon" ? "blur-[2px] scale-105 brightness-50" : ""}`}
        draggable={false}
        loading={isTop ? "eager" : "lazy"}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10 pointer-events-none" />

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

      {isTop && (
        <>
          <motion.div
            style={{ opacity: likeOpacity }}
            className="absolute top-20 left-6 px-4 py-2 rounded-xl border-4 border-[hsl(270,100%,75%)] text-[hsl(270,100%,75%)] font-display font-bold tracking-widest text-xl rotate-[-12deg] bg-black/40 backdrop-blur-sm"
            aria-hidden="true"
          >
            ME GUSTA
          </motion.div>
          <motion.div
            style={{ opacity: nopeOpacity }}
            className="absolute top-20 right-6 px-4 py-2 rounded-xl border-4 border-white/60 text-white/80 font-display font-bold tracking-widest text-xl rotate-[12deg] bg-black/40 backdrop-blur-sm"
            aria-hidden="true"
          >
            SIGUIENTE
          </motion.div>
        </>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7 text-white">
        <p className="text-[11px] font-mono uppercase tracking-widest text-white/70">
          {item.type}
        </p>
        <h3 className="mt-1 text-2xl md:text-3xl font-display font-bold">
          {item.client}
        </h3>
        <p className="mt-1.5 text-sm text-white/75">{item.accent}</p>

        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          data-testid={`link-project-${item.client}`}
          className={`mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold hover:scale-[1.02] transition-transform ${
            item.status === "live"
              ? "bg-white text-black"
              : "bg-white/10 border border-white/20 text-white backdrop-blur-md"
          }`}
        >
          {item.status === "live" ? "Ver web completa" : "Ver borrador"}
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.article>
  );
}

export function BeforeAfter() {
  const [index, setIndex] = useState(0);

  const handleSwipe = (dir: 1 | -1 = 1) => {
    setIndex((i) =>
      dir === 1
        ? (i + 1) % projects.length
        : (i - 1 + projects.length) % projects.length,
    );
  };

  const visible = [
    projects[index % projects.length],
    projects[(index + 1) % projects.length],
    projects[(index + 2) % projects.length],
  ];

  return (
    <section
      aria-labelledby="cases-title"
      className="relative py-24 md:py-32 overflow-hidden border-t border-white/5"
    >
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="text-center mb-12">
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
              Desliza para ver. Probablemente conoces alguno de estos negocios.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="relative w-full max-w-sm mx-auto">
            <div
              className="relative w-full"
              style={{ aspectRatio: "3 / 4" }}
              data-testid="carousel-projects"
              role="region"
              aria-roledescription="carrusel"
              aria-label={`Proyecto ${(index % projects.length) + 1} de ${projects.length}`}
            >
              <AnimatePresence>
                {visible.map((p, i) => (
                  <ProjectCard
                    key={`${p.client}-${index + i}`}
                    item={p}
                    onSwipe={handleSwipe}
                    isTop={i === 0}
                    zIndex={3 - i}
                    offset={i}
                  />
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleSwipe(-1)}
                data-testid="button-prev-project"
                aria-label="Proyecto anterior"
                className="w-11 h-11 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors flex items-center justify-center"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2" aria-hidden="true">
                {projects.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === index % projects.length
                        ? "w-8 bg-[hsl(270,100%,60%)]"
                        : "w-1.5 bg-white/20"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => handleSwipe(1)}
                data-testid="button-next-project"
                aria-label="Siguiente proyecto"
                className="w-11 h-11 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors flex items-center justify-center"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
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
