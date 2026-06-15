import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { InteractiveBackground } from "@/components/layout/InteractiveBackground";
import { MinimalHeader } from "@/components/landing/MinimalHeader";
import { MinimalFooter } from "@/components/landing/MinimalFooter";
import { useSeo } from "@/lib/useSeo";
import { webPageLd, breadcrumbLd } from "@/lib/structured-data";
import { fetchPosts } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import type { PostListItem } from "@/sanity/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function Blog() {
  const [posts, setPosts] = useState<PostListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useSeo({
    title: "Blog · Proyecto IX — Diseño y desarrollo web en Menorca",
    description:
      "Consejos sobre diseño web, SEO local, marketing digital e inteligencia artificial para negocios de Menorca. Aprende a convertir tu web en una herramienta que vende.",
    canonical: "https://proyectoix.com/blog",
    jsonLd: [
      webPageLd({
        url: "https://proyectoix.com/blog",
        name: "Blog · Proyecto IX",
        description:
          "Consejos sobre diseño web, SEO local y marketing digital para negocios de Menorca.",
      }),
      breadcrumbLd([
        { name: "Inicio", url: "https://proyectoix.com/" },
        { name: "Blog", url: "https://proyectoix.com/blog" },
      ]),
    ],
  });

  useEffect(() => {
    let active = true;
    fetchPosts()
      .then((data) => {
        if (active) setPosts(data);
      })
      .catch(() => {
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-h-[100dvh] relative">
      <InteractiveBackground />
      <MinimalHeader />

      <main className="relative z-10 px-4 sm:px-6 pt-28 pb-20 sm:pt-32">
        <div className="max-w-6xl mx-auto">
          <motion.header
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl mb-14"
          >
            <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-white/55 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[hsl(270,100%,60%)] animate-pulse shadow-[0_0_8px_hsl(270,100%,60%)]" />
              El blog de Proyecto IX
            </span>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white tracking-tighter mb-5">
              Diseño web, SEO y marketing para negocios de Menorca
            </h1>
            <p className="text-white/55 text-base sm:text-lg leading-relaxed">
              Ideas prácticas para que tu web deje de ser un escaparate y empiece
              a traerte clientes.
            </p>
          </motion.header>

          {loading && (
            <div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              data-testid="blog-loading"
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden animate-pulse"
                >
                  <div className="aspect-[16/9] bg-white/5" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 w-24 bg-white/10 rounded" />
                    <div className="h-5 w-3/4 bg-white/10 rounded" />
                    <div className="h-3 w-full bg-white/5 rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && error && (
            <p className="text-white/55" data-testid="blog-error">
              No hemos podido cargar los artículos ahora mismo. Vuelve a
              intentarlo en unos minutos.
            </p>
          )}

          {!loading && !error && posts.length === 0 && (
            <p className="text-white/55" data-testid="blog-empty">
              Todavía no hay artículos publicados. ¡Vuelve pronto!
            </p>
          )}

          {!loading && !error && posts.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <motion.article
                  key={post._id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: Math.min(i * 0.06, 0.4),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  data-testid={`card-post-${post.slug.current}`}
                >
                  <Link
                    href={`/blog/${post.slug.current}`}
                    className="group block h-full rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden transition-all duration-300 hover:border-[hsl(270,100%,60%)]/40 hover:bg-white/[0.05] hover:-translate-y-1"
                    data-testid={`link-post-${post.slug.current}`}
                  >
                    {post.mainImage ? (
                      <div className="aspect-[16/9] overflow-hidden">
                        <img
                          src={urlFor(post.mainImage)
                            .width(720)
                            .height(405)
                            .fit("crop")
                            .auto("format")
                            .url()}
                          alt={post.mainImage.alt || post.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[16/9] bg-gradient-to-br from-[hsl(270,100%,60%)]/20 to-transparent" />
                    )}
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3 text-[11px] font-mono uppercase tracking-widest text-white/40">
                        {post.categories?.[0]?.title && (
                          <>
                            <span className="text-[hsl(270,100%,72%)]">
                              {post.categories[0].title}
                            </span>
                            <span aria-hidden="true">·</span>
                          </>
                        )}
                        <time dateTime={post.publishedAt}>
                          {formatDate(post.publishedAt)}
                        </time>
                      </div>
                      <h2 className="text-lg font-display font-semibold text-white leading-snug mb-2 group-hover:text-[hsl(270,100%,82%)] transition-colors">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-white/50 text-sm leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </main>

      <MinimalFooter />
    </div>
  );
}
