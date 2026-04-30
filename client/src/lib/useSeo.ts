import { useEffect } from "react";

export interface SeoConfig {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  ogType?: "website" | "article" | "profile";
  noIndex?: boolean;
  jsonLd?: object[];
}

const SITE = {
  name: "Proyecto IX",
  url: "https://proyectoix.com",
  defaultImage: "https://proyectoix.com/opengraph.jpg",
  twitter: "@proyecto.ix",
  locale: "es_ES",
};

const DYNAMIC_LD_ID = "ld-page-dynamic";

function upsertMeta(
  selector: { property?: string; name?: string },
  content: string,
) {
  const attr = selector.property ? "property" : "name";
  const val = (selector.property || selector.name) as string;
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${val}"]`,
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, val);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  );
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertJsonLd(jsonLd: object[] | undefined) {
  document.head
    .querySelectorAll(`script[data-ld-id="${DYNAMIC_LD_ID}"]`)
    .forEach((n) => n.remove());

  if (!jsonLd || jsonLd.length === 0) return;

  for (const obj of jsonLd) {
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.setAttribute("data-ld-id", DYNAMIC_LD_ID);
    s.textContent = JSON.stringify(obj);
    document.head.appendChild(s);
  }
}

export function useSeo(config: SeoConfig) {
  const ldSignature = JSON.stringify(config.jsonLd || []);

  useEffect(() => {
    const ogImage = config.ogImage || SITE.defaultImage;
    const ogType = config.ogType || "website";

    document.title = config.title;

    upsertMeta({ name: "description" }, config.description);
    upsertCanonical(config.canonical);

    upsertMeta(
      { name: "robots" },
      config.noIndex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    );

    upsertMeta({ property: "og:title" }, config.title);
    upsertMeta({ property: "og:description" }, config.description);
    upsertMeta({ property: "og:url" }, config.canonical);
    upsertMeta({ property: "og:image" }, ogImage);
    upsertMeta({ property: "og:site_name" }, SITE.name);
    upsertMeta({ property: "og:locale" }, SITE.locale);
    upsertMeta({ property: "og:type" }, ogType);

    upsertMeta({ name: "twitter:card" }, "summary_large_image");
    upsertMeta({ name: "twitter:title" }, config.title);
    upsertMeta({ name: "twitter:description" }, config.description);
    upsertMeta({ name: "twitter:image" }, ogImage);

    upsertJsonLd(config.jsonLd);
  }, [
    config.title,
    config.description,
    config.canonical,
    config.ogImage,
    config.ogType,
    config.noIndex,
    ldSignature,
  ]);
}

export const SEO_SITE = SITE;
