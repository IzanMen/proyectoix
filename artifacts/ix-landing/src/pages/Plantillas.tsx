import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { useSeo } from "@/lib/useSeo";
import prototypes from "@/content/prototypes.json";

type Prototype = {
  number: number;
  slug: string;
  name: string;
  category: string;
  title: string;
  description: string;
  heroImage: string;
  previewImage: string;
};

const typedPrototypes = prototypes as Prototype[];

export default function Plantillas() {
  const [category, setCategory] = useState("Todas");

  useSeo({
    title: "Plantillas privadas · Proyecto IX",
    description:
      "Catálogo privado de prototipos de landing pages para clientes de Proyecto IX.",
    canonical: "https://proyectoix.com/plantillas",
    noIndex: true,
  });

  const categories = useMemo(
    () => ["Todas", ...new Set(typedPrototypes.map((item) => item.category))],
    [],
  );

  const filtered = useMemo(
    () =>
      typedPrototypes.filter(
        (item) => category === "Todas" || item.category === category,
      ),
    [category],
  );

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="border-b border-white/10 px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-7">
          <div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">
                Proyecto IX
              </p>
              <h1 className="mt-3 text-4xl font-bold leading-none md:text-6xl">
                Plantillas privadas
              </h1>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="md:hidden">
              <label
                htmlFor="template-category"
                className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-white/45"
              >
                Categoría
              </label>
              <select
                id="template-category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="h-12 w-full rounded-md border border-white/14 bg-white/[0.06] px-3 text-sm font-semibold text-white outline-none transition focus:border-white/42"
              >
                {categories.map((item) => (
                  <option key={item} value={item} className="bg-[#050505]">
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="hidden flex-wrap gap-2 md:flex">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`min-h-10 rounded-md border px-3 py-2 text-sm font-medium leading-tight transition ${
                    category === item
                      ? "border-white bg-white text-black"
                      : "border-white/12 bg-white/[0.04] text-white/68 hover:border-white/28 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <p className="text-sm font-medium text-white/45">
              {filtered.length} plantillas
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-7 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {filtered.map((item) => (
            <Link
              key={item.slug}
              href={`/plantillas/${item.slug}`}
              className="group overflow-hidden rounded-md border border-white/10 bg-white/[0.045] transition hover:-translate-y-0.5 hover:border-white/24 hover:bg-white/[0.075]"
            >
              <div className="relative aspect-[45/32] overflow-hidden bg-white/[0.04]">
                <img
                  src={item.previewImage}
                  alt={`Vista previa de ${item.name}`}
                  className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-[1.02]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/10 to-black/0" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4">
                  <span className="font-mono text-sm text-white/45">
                    {String(item.number).padStart(3, "0")}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-white/55 transition group-hover:text-white" />
                </div>
              </div>

              <div className="p-5">
                <h2 className="text-xl font-semibold leading-tight">
                  {item.name}
                </h2>
                <p className="mt-2 text-sm font-medium text-white/50">
                  {item.category}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
