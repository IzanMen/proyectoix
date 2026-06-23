import { useCallback, useEffect, useState } from "react";
import { Link } from "wouter";
import {
  ShieldCheck,
  MapPin,
  Zap,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import { useSeo } from "@/lib/useSeo";
import { InteractiveBackground } from "@/components/layout/InteractiveBackground";
import { LeadForm } from "@/components/landing/LeadForm";
import { CampaignSections, CtaButton, Reveal, Rich } from "./CampaignSections";
import type { CampaignContent } from "./types";

const TRUST_ICONS: LucideIcon[] = [ShieldCheck, MapPin, Zap, MessageCircle];

function scrollToForm() {
  const el = document.getElementById("lead-form");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function CampaignLanding({ content }: { content: CampaignContent }) {
  const { hero, form, closing } = content;

  useSeo({
    title: content.seo.title,
    description: content.seo.description,
    canonical: `https://proyectoix.com/lp/${content.slug}`,
    noIndex: true,
  });

  const [showSticky, setShowSticky] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onCta = useCallback(() => scrollToForm(), []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#050505] text-white">
      <InteractiveBackground />

      {/* Minimal header — logo + single CTA, no nav exits */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5 md:px-10">
          <span className="inline-flex items-center gap-1.5">
            <span className="font-display text-xl font-bold tracking-tighter text-white">
              IX
            </span>
            <span className="mt-1 h-2 w-2 animate-pulse rounded-full bg-[hsl(270,100%,60%)] shadow-[0_0_15px_hsl(270,100%,60%)]" />
          </span>
          <button
            type="button"
            onClick={onCta}
            data-testid="button-header-cta"
            className="inline-flex items-center gap-2 rounded-full border border-[hsl(270,100%,60%)]/40 bg-[hsl(270,100%,60%)]/15 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[hsl(270,100%,60%)]/25"
          >
            Hablar con nosotros
          </button>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero — founders photo as full-bleed background */}
        <section className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pt-28 pb-20 md:px-10">
          {/* Background photo + readability overlays */}
          <div className="absolute inset-0 z-0">
            <picture>
              <source srcSet="/team-photo.webp" type="image/webp" />
              <img
                src="/team-photo.png"
                alt="Izan y Xaloc, fundadores de Proyecto IX"
                className="h-full w-full object-cover object-center md:object-[65%_center]"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </picture>
            {/* Horizontal: dark on the left (under the text), clearer on the right */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/65 to-[#050505]/30 md:via-[#050505]/80 md:to-transparent"
              aria-hidden="true"
            />
            {/* Vertical: extra contrast top (under header) and bottom */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/35 to-[#050505]/45 md:via-[#050505]/40 md:to-[#050505]/75"
              aria-hidden="true"
            />
            {/* Uniform tint so text is legible over any part of the photo */}
            <div className="absolute inset-0 bg-[#050505]/15 md:bg-[#050505]/25" aria-hidden="true" />
            <div
              className="pointer-events-none absolute -bottom-24 left-1/4 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[hsl(270,100%,60%)]/20 blur-[130px]"
              aria-hidden="true"
            />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-6xl">
            <div className="max-w-2xl">
              <span className="ix-fade-up inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-white/80 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[hsl(270,100%,60%)] shadow-[0_0_8px_hsl(270,100%,60%)]" />
                {hero.eyebrow}
              </span>

              <h1
                style={{ animationDelay: "0.05s" }}
                className={`ix-fade-up mt-6 font-display font-bold leading-[1.05] tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.85)] ${
                  hero.title.length > 60
                    ? "text-3xl sm:text-4xl md:text-5xl"
                    : "text-4xl sm:text-5xl md:text-6xl"
                }`}
              >
                {hero.title}
              </h1>

              <p
                style={{ animationDelay: "0.12s" }}
                className="ix-fade-up mt-6 max-w-xl text-lg leading-relaxed text-white/85 drop-shadow-[0_1px_10px_rgba(0,0,0,0.8)] md:text-xl"
              >
                {hero.subtitle}
              </p>

              <div style={{ animationDelay: "0.2s" }} className="ix-fade-up mt-9">
                <CtaButton
                  label={hero.cta}
                  onClick={onCta}
                  testId="button-hero-cta"
                />
              </div>

              <ul
                style={{ animationDelay: "0.3s" }}
                className="ix-fade-up mt-8 flex flex-wrap gap-x-6 gap-y-3"
              >
                {hero.trust.map((t, i) => {
                  const Icon = TRUST_ICONS[i % TRUST_ICONS.length];
                  return (
                    <li
                      key={t}
                      className="inline-flex items-center gap-2 text-sm text-white/80 drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]"
                    >
                      <Icon className="h-4 w-4 text-[hsl(270,100%,75%)]" />
                      {t}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Founders credit */}
          <div className="absolute bottom-6 right-6 z-10 hidden lg:block">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[hsl(270,100%,60%)] shadow-[0_0_8px_hsl(270,100%,60%)]" />
              Izan &amp; Xaloc · Proyecto IX
            </div>
          </div>
        </section>

        {/* Body sections */}
        <CampaignSections blocks={content.blocks} onCtaClick={onCta} />

        {/* Lead form */}
        <section
          id="formulario"
          className="relative scroll-mt-20 py-16 md:py-24"
        >
          <div className="mx-auto max-w-3xl px-6">
            <Reveal>
              <div className="mb-8">
                <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
                  {form.heading}
                </h2>
                <ul className="mt-5 space-y-3">
                  {form.lead.map((p, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-base leading-relaxed text-white/75 md:text-lg"
                    >
                      <span
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(270,100%,60%)] shadow-[0_0_8px_hsl(270,100%,60%)]"
                        aria-hidden="true"
                      />
                      <span>
                        <Rich text={p} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div id="lead-form">
                <LeadForm includeGoal={false} source={content.source} />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Closing reassurance */}
        {closing && (
          <section className="relative pb-20">
            <div className="mx-auto max-w-3xl px-6">
              <Reveal>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
                  {closing.heading && (
                    <h3 className="font-display text-xl font-bold text-white md:text-2xl">
                      {closing.heading}
                    </h3>
                  )}
                  <div className="mt-3 space-y-1.5">
                    {closing.lead.map((p, i) => (
                      <p key={i} className="text-white/70">
                        <Rich text={p} />
                      </p>
                    ))}
                  </div>
                  {closing.cta && (
                    <div className="mt-6 flex justify-center">
                      <CtaButton
                        label={closing.cta}
                        onClick={onCta}
                        testId="button-closing-cta"
                      />
                    </div>
                  )}
                </div>
              </Reveal>
            </div>
          </section>
        )}
      </main>

      {/* Slim footer — legal only */}
      <footer className="relative z-10 border-t border-white/5 bg-black/30">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-xs text-white/45 sm:flex-row md:px-10">
          <p className="font-display text-sm font-bold text-white">Proyecto IX</p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <Link
              href="/politica-privacidad"
              className="transition-colors hover:text-white"
            >
              Privacidad
            </Link>
            <span aria-hidden="true">·</span>
            <Link
              href="/aviso-legal"
              className="transition-colors hover:text-white"
            >
              Aviso legal
            </Link>
            <span aria-hidden="true">·</span>
            <Link
              href="/politica-cookies"
              className="transition-colors hover:text-white"
            >
              Cookies
            </Link>
          </div>
        </div>
      </footer>

      {/* Sticky mobile CTA */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-black/70 p-3 backdrop-blur-md transition-transform duration-300 md:hidden ${
          showSticky ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <button
          type="button"
          onClick={onCta}
          data-testid="button-sticky-cta"
          className="w-full rounded-sm bg-[hsl(270,100%,60%)] px-6 py-3.5 text-center text-base font-bold text-white shadow-[0_0_30px_-8px_hsl(270,100%,60%)] transition-colors hover:bg-[hsl(270,100%,65%)]"
        >
          {hero.cta}
        </button>
      </div>
    </div>
  );
}
