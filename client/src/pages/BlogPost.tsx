import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { InteractiveBackground } from "@/components/layout/InteractiveBackground";
import { MinimalHeader } from "@/components/landing/MinimalHeader";
import { MinimalFooter } from "@/components/landing/MinimalFooter";
import PortableContent from "@/components/blog/PortableContent";
import { useSeo } from "@/lib/useSeo";
import { breadcrumbLd } from "@/lib/structured-data";
import { fetchPostBySlug } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import type { Post } from "@/sanity/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    let active = true;
    setLoading(true);
    setNotFound(false);
    setPost(null);
    fetchPostBySlug(slug)
      .then((data) => {
        if (!active) return;
        if (data) setPost(data);
        else setNotFound(true);
      })
      .catch(() => {
        if (active) setNotFound(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [slug]);

  const canonical = `https://proyectoix.com/blog/${slug}`;
  const ogImage = post?.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).fit("crop").auto("format").url()
    : undefined;

  useSeo({
    title: post
      ? `${post.seoTitle || post.title} · Proyecto IX`
      : loading
        ? "Cargando… · Proyecto IX"
        : "Artículo no encontrado · Proyecto IX",
    description:
      post?.metaDescription ||
      post?.excerpt ||
      "Artículo del blog de Proyecto IX, agencia de diseño y desarrollo web en Menorca.",
    canonical,
    ogType: "article",
    ogImage,
    noIndex: notFound,
    jsonLd: post
      ? [
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.metaDescription || post.excerpt || "",
            image: ogImage ? [ogImage] : undefined,
            datePublished: post.publishedAt,
            dateModified: post.updatedAt || post.publishedAt,
            keywords: post.keywords?.join(", "),
            mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
            author: {
              "@type": "Organization",
              name: "Proyecto IX",
              url: "https://proyectoix.com",
            },
            publisher: {
              "@type": "Organization",
              name: "Proyecto IX",
              logo: {
                "@type": "ImageObject",
                url: "https://proyectoix.com/favicon.png",
              },
            },
          },
          breadcrumbLd([
            { name: "Inicio", url: "https://proyectoix.com/" },
            { name: "Blog", url: "https://proyectoix.com/blog" },
            { name: post.title, url: canonical },
          ]),
        ]
      : undefined,
  });

  return (
    <div className="min-h-[100dvh] relative">
      <InteractiveBackground />
      <MinimalHeader />

      <main className="relative z-10 px-4 sm:px-6 pt-28 pb-20 sm:pt-32">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-10"
            data-testid="link-back-blog"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al blog
          </Link>

          {loading && (
            <div className="animate-pulse space-y-6" data-testid="post-loading">
              <div className="h-4 w-32 bg-white/10 rounded" />
              <div className="h-10 w-3/4 bg-white/10 rounded" />
              <div className="aspect-[16/9] bg-white/5 rounded-xl" />
              <div className="space-y-3">
                <div className="h-4 w-full bg-white/5 rounded" />
                <div className="h-4 w-full bg-white/5 rounded" />
                <div className="h-4 w-2/3 bg-white/5 rounded" />
              </div>
            </div>
          )}

          {!loading && notFound && (
            <div className="py-16 text-center" data-testid="post-notfound">
              <h1 className="text-3xl font-display font-bold text-white mb-4">
                Artículo no encontrado
              </h1>
              <p className="text-white/55 mb-8">
                Puede que el enlace haya cambiado o el artículo ya no esté
                disponible.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[hsl(270,100%,60%)] text-white font-semibold hover:bg-[hsl(270,100%,66%)] transition-colors"
                data-testid="link-blog-from-notfound"
              >
                Ver todos los artículos
              </Link>
            </div>
          )}

          {!loading && post && (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <header className="mb-8">
                <div className="flex flex-wrap items-center gap-2 mb-5 text-[11px] font-mono uppercase tracking-widest text-white/40">
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
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tighter leading-[1.05]">
                  {post.title}
                </h1>
                {post.excerpt && (
                  <p className="mt-5 text-lg text-white/60 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
              </header>

              {post.mainImage && (
                <figure className="mb-10">
                  <img
                    src={urlFor(post.mainImage)
                      .width(1200)
                      .fit("max")
                      .auto("format")
                      .url()}
                    alt={post.mainImage.alt || post.title}
                    decoding="async"
                    className="w-full rounded-2xl border border-white/10"
                    data-testid="img-post-main"
                  />
                  {post.mainImage.caption && (
                    <figcaption className="text-sm text-white/40 mt-3 text-center">
                      {post.mainImage.caption}
                    </figcaption>
                  )}
                </figure>
              )}

              <div data-testid="post-body">
                <PortableContent value={post.body} />
              </div>

              <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                <div>
                  <p className="text-white font-display font-semibold">
                    ¿Quieres una web así para tu negocio?
                  </p>
                  <p className="text-white/50 text-sm mt-1">
                    Cuéntanos tu caso y te respondemos por WhatsApp.
                  </p>
                </div>
                <Link
                  href="/#formulario"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[hsl(270,100%,60%)] text-white font-semibold hover:bg-[hsl(270,100%,66%)] transition-colors whitespace-nowrap"
                  data-testid="link-cta-contact"
                >
                  Hablar con nosotros
                </Link>
              </div>
            </motion.article>
          )}
        </div>
      </main>

      <MinimalFooter />
    </div>
  );
}
