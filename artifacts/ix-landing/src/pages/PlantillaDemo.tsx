import { Link, useParams } from "wouter";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useSeo } from "@/lib/useSeo";
import prototypes from "@/content/prototypes.json";
import NotFound from "@/pages/not-found";

type Prototype = {
  number: number;
  slug: string;
  name: string;
  category: string;
  title: string;
  description: string;
};

const typedPrototypes = prototypes as Prototype[];

export default function PlantillaDemo() {
  const params = useParams<{ slug: string }>();
  const prototype = typedPrototypes.find((item) => item.slug === params.slug);

  useSeo({
    title: prototype
      ? `${prototype.name} · Plantilla privada`
      : "Plantilla no encontrada · Proyecto IX",
    description:
      prototype?.description ||
      "Prototipo privado de landing page de Proyecto IX.",
    canonical: prototype
      ? `https://proyectoix.com/plantillas/${prototype.slug}`
      : "https://proyectoix.com/plantillas",
    noIndex: true,
  });

  if (!prototype) return <NotFound />;

  const demoUrl = `/prototipos-static/${prototype.slug}/index.html`;

  return (
    <main className="h-screen overflow-hidden bg-black text-white">
      <header className="flex h-14 items-center justify-between gap-3 border-b border-white/10 bg-[#050505]/95 px-3 backdrop-blur sm:px-4">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/plantillas"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/12 text-white/70 transition hover:border-white/28 hover:text-white"
            aria-label="Volver a plantillas"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold leading-tight">
              {prototype.name}
            </p>
            <p className="truncate text-xs text-white/45">
              {String(prototype.number).padStart(3, "0")} ·{" "}
              {prototype.category}
            </p>
          </div>
        </div>

        <a
          href={demoUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-9 shrink-0 items-center gap-2 rounded-md border border-white/12 px-3 text-sm font-medium text-white/72 transition hover:border-white/28 hover:text-white"
        >
          <ExternalLink className="h-4 w-4" />
          <span className="hidden sm:inline">Abrir</span>
        </a>
      </header>

      <iframe
        title={prototype.title}
        src={demoUrl}
        className="block h-[calc(100vh-3.5rem)] w-full border-0 bg-white"
      />
    </main>
  );
}
