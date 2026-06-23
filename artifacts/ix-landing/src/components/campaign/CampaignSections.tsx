import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Store } from "lucide-react";
import type { CampaignBlock, CampaignVisual } from "./types";

export function Reveal({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function CtaButton({
  label,
  onClick,
  testId = "button-campaign-cta",
}: {
  label: string;
  onClick: () => void;
  testId?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-testid={testId}
      className="group inline-flex items-center justify-center gap-3 px-7 py-4 bg-[hsl(270,100%,60%)] text-white text-base md:text-lg font-bold tracking-tight rounded-sm hover:bg-[hsl(270,100%,65%)] transition-all duration-300 shadow-[0_0_40px_-8px_hsl(270,100%,60%)] hover:shadow-[0_0_60px_-6px_hsl(270,100%,60%)] hover:scale-[1.02]"
    >
      {label}
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </button>
  );
}

function CardItem({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-[hsl(270,100%,60%)]/40 hover:bg-white/[0.05]">
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-[hsl(270,100%,60%)]/40 bg-[hsl(270,100%,60%)]/15">
        <Check className="h-3.5 w-3.5 text-[hsl(270,100%,80%)]" />
      </span>
      <span className="text-sm leading-snug text-white/85 md:text-base">
        {children}
      </span>
    </div>
  );
}

function Visual({ visual }: { visual: CampaignVisual }) {
  if (visual.type === "chips") {
    return (
      <div className="flex flex-wrap gap-2.5">
        {visual.items.map((it) => (
          <span
            key={it}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/80 md:text-base"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[hsl(270,100%,60%)] shadow-[0_0_8px_hsl(270,100%,60%)]" />
            {it}
          </span>
        ))}
      </div>
    );
  }

  if (visual.type === "examples") {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {visual.items.map((it) => (
          <div
            key={it}
            className="flex items-start gap-3 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-5 transition-colors hover:border-[hsl(270,100%,60%)]/40"
          >
            <Store className="h-5 w-5 shrink-0 text-[hsl(270,100%,75%)]" />
            <span className="text-sm leading-snug text-white/85 md:text-base">
              {it}
            </span>
          </div>
        ))}
      </div>
    );
  }

  // "grid" and "checklist" share the same card treatment.
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {visual.items.map((it) => (
        <CardItem key={it}>{it}</CardItem>
      ))}
    </div>
  );
}

function Scenario({ lines }: { lines: string[] }) {
  return (
    <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6 md:p-8">
      <ul className="relative space-y-4">
        <span
          className="absolute left-[5px] top-2 bottom-2 w-px bg-gradient-to-b from-[hsl(270,100%,60%)]/50 via-[hsl(270,100%,60%)]/25 to-transparent"
          aria-hidden="true"
        />
        {lines.map((l, i) => (
          <li key={i} className="relative pl-7">
            <span className="absolute left-0 top-[9px] h-2.5 w-2.5 rounded-full bg-[hsl(270,100%,60%)] shadow-[0_0_10px_hsl(270,100%,60%)]" />
            <p className="text-base leading-relaxed text-white/75 md:text-lg">
              {l}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Block({
  block,
  index,
  onCtaClick,
}: {
  block: CampaignBlock;
  index: number;
  onCtaClick: () => void;
}) {
  const isScenario = block.variant === "scenario";

  return (
    <section className="relative py-12 md:py-16">
      <div className="mx-auto max-w-4xl px-6">
        {block.heading && (
          <Reveal>
            <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
              {block.heading}
            </h2>
          </Reveal>
        )}

        {!isScenario && block.lead && block.lead.length > 0 && (
          <Reveal delay={0.05}>
            <div className="mt-5 space-y-3">
              {block.lead.map((p, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed text-white/70 md:text-lg"
                >
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        )}

        {isScenario && (
          <Reveal delay={0.05}>
            <div className="mt-8">
              <Scenario lines={block.lead ?? []} />
            </div>
          </Reveal>
        )}

        {block.visual && (
          <Reveal delay={0.1}>
            <div className="mt-8">
              <Visual visual={block.visual} />
            </div>
          </Reveal>
        )}

        {block.tail && block.tail.length > 0 && (
          <Reveal delay={0.05}>
            <div className="mt-8 space-y-3">
              {block.tail.map((p, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed text-white/70 md:text-lg"
                >
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        )}

        {block.callout && (
          <Reveal delay={0.05}>
            <div className="mt-6 rounded-2xl border border-[hsl(270,100%,60%)]/30 bg-gradient-to-br from-[hsl(270,100%,60%)]/[0.12] to-transparent p-6 md:p-7">
              <p className="font-display text-lg font-semibold leading-snug text-white md:text-xl">
                {block.callout}
              </p>
            </div>
          </Reveal>
        )}

        {block.cta && (
          <Reveal delay={0.1}>
            <div className="mt-9">
              <CtaButton
                label={block.cta}
                onClick={onCtaClick}
                testId={`button-cta-block-${index}`}
              />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

export function CampaignSections({
  blocks,
  onCtaClick,
}: {
  blocks: CampaignBlock[];
  onCtaClick: () => void;
}) {
  return (
    <>
      {blocks.map((block, i) => (
        <Block key={i} index={i} block={block} onCtaClick={onCtaClick} />
      ))}
    </>
  );
}
