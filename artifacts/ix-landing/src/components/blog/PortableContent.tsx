import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/react";
import { urlFor } from "@/sanity/image";

interface Props {
  value: PortableTextBlock[];
}

function safeHref(raw: unknown): string {
  if (typeof raw !== "string") return "#";
  const href = raw.trim();
  if (!href) return "#";
  if (
    href.startsWith("/") ||
    href.startsWith("#") ||
    /^(https?:|mailto:|tel:)/i.test(href)
  ) {
    return href;
  }
  return "#";
}

export default function PortableContent({ value }: Props) {
  return (
    <PortableText
      value={value}
      components={{
        block: {
          h2: ({ children }) => (
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-12 mb-4 tracking-tight">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl sm:text-2xl font-display font-semibold text-white/90 mt-8 mb-3">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-display font-semibold text-white/85 mt-6 mb-2">
              {children}
            </h4>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-[hsl(270,100%,60%)] pl-5 my-6 text-white/70 italic">
              {children}
            </blockquote>
          ),
          normal: ({ children }) => (
            <p className="text-white/65 leading-relaxed mb-5 text-[15px] sm:text-base">
              {children}
            </p>
          ),
        },
        list: {
          bullet: ({ children }) => (
            <ul className="list-disc pl-6 space-y-2 mb-5 text-white/65 marker:text-[hsl(270,100%,60%)]">
              {children}
            </ul>
          ),
          number: ({ children }) => (
            <ol className="list-decimal pl-6 space-y-2 mb-5 text-white/65 marker:text-white/40">
              {children}
            </ol>
          ),
        },
        listItem: {
          bullet: ({ children }) => (
            <li className="leading-relaxed">{children}</li>
          ),
          number: ({ children }) => (
            <li className="leading-relaxed">{children}</li>
          ),
        },
        marks: {
          strong: ({ children }) => (
            <strong className="text-white font-semibold">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
          link: ({ value, children }) => {
            const href = safeHref(value?.href);
            const external = /^https?:\/\//i.test(href);
            return (
              <a
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="text-[hsl(270,100%,72%)] underline underline-offset-2 hover:text-white transition-colors"
              >
                {children}
              </a>
            );
          },
        },
        types: {
          image: ({ value }) => (
            <figure className="my-8">
              <img
                src={urlFor(value).width(1200).fit("max").auto("format").url()}
                alt={value.alt || ""}
                loading="lazy"
                decoding="async"
                className="w-full rounded-xl border border-white/10"
              />
              {value.caption && (
                <figcaption className="text-sm text-white/40 mt-3 text-center">
                  {value.caption}
                </figcaption>
              )}
            </figure>
          ),
        },
      }}
    />
  );
}
