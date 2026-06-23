import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
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
import { CampaignSections, CtaButton, Reveal } from "./CampaignSections";
import type { CampaignContent } from "./types";

const TRUST_ICONS: LucideIcon[] = [ShieldCheck, MapPin, Zap, MessageCircle];

function scrollToForm() {
  const el = document.getElementById("formulario");
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
        {/* Hero */}
        <section className="relative flex items-center overflow-hidden px-6 pt-28 pb-16 md:px-10 lg:min-h-[100svh] lg:py-0">
          <div className="pointer-events-none absolute inset-0 z-0">
            <div className="absolute right-[6%] top-[12%] h-[520px] w-[520px] rounded-full bg-[hsl(270,100%,60%)]/10 blur-[120px]" />
            <div className="absolute bottom-[8%] left-[4%] h-[420px] w-[420px] rounded-full bg-blue-500/5 blur-[120px]" />
          </div>

          <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-white/70"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[hsl(270,100%,60%)] shadow-[0_0_8px_hsl(270,100%,60%)]" />
                {hero.eyebrow}
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className={`mt-6 font-display font-bold leading-[1.05] tracking-tight text-white ${
                  hero.title.length > 60
                    ? "text-3xl sm:text-4xl md:text-5xl"
                    : "text-4xl sm:text-5xl md:text-6xl"
                }`}
              >
                {hero.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="mt-6 max-w-xl text-lg leading-relaxed text-white/70 md:text-xl"
              >
                {hero.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-9"
              >
                <CtaButton
                  label={hero.cta}
                  onClick={onCta}
                  testId="button-hero-cta"
                />
              </motion.div>

              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8 flex flex-wrap gap-x-6 gap-y-3"
              >
                {hero.trust.map((t, i) => {
                  const Icon = TRUST_ICONS[i % TRUST_ICONS.length];
                  return (
                    <li
                      key={t}
                      className="inline-flex items-center gap-2 text-sm text-white/60"
                    >
                      <Icon className="h-4 w-4 text-[hsl(270,100%,70%)]" />
                      {t}
                    </li>
                  );
                })}
              </motion.ul>
            </div>

            {/* Founders photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto w-full max-w-sm lg:max-w-none"
            >
              <div
                className="absolute -inset-4 rounded-[2rem] bg-[hsl(270,100%,60%)]/15 blur-2xl"
                aria-hidden="true"
              />
              <div className="relative overflow-hidden rounded-3xl border border-white/12 shadow-[0_20px_80px_-20px_hsl(270,100%,40%)]">
                <picture>
                  <source srcSet="/team-photo.webp" type="image/webp" />
                  <img
                    src="/team-photo.png"
                    alt="Izan y Xaloc, fundadores de Proyecto IX"
                    className="h-full w-full object-cover"
                    loading="eager"
                  />
                </picture>
                <div
                  className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-t from-black/55 via-transparent to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-4 bottom-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-[hsl(270,100%,60%)] shadow-[0_0_8px_hsl(270,100%,60%)]" />
                    Izan &amp; Xaloc · Proyecto IX
                  </div>
                </div>
              </div>
            </motion.div>
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
              <div className="mb-8 text-center">
                <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
                  {form.heading}
                </h2>
                <div className="mt-4 space-y-2">
                  {form.lead.map((p, i) => (
                    <p
                      key={i}
                      className="text-base leading-relaxed text-white/70 md:text-lg"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <LeadForm includeGoal={false} source={content.source} />
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
                        {p}
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
