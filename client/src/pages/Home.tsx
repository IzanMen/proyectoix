import { motion, useScroll, useSpring } from "framer-motion";
import { useSeo } from "@/lib/useSeo";
import {
  webPageLd,
  breadcrumbLd,
} from "@/lib/structured-data";
import { InteractiveBackground } from "@/components/layout/InteractiveBackground";
import { MinimalHeader } from "@/components/landing/MinimalHeader";
import { LandingHero } from "@/components/landing/LandingHero";
import { VideoSection } from "@/components/landing/VideoSection";
import { ProblemAnimated } from "@/components/landing/ProblemAnimated";
import { BeforeAfter } from "@/components/landing/BeforeAfter";
import { AboutVisual } from "@/components/landing/AboutVisual";
import { ProcessSteps } from "@/components/landing/ProcessSteps";
import { FAQ } from "@/components/sections/FAQ";
import { FormSection } from "@/components/landing/FormSection";
import { FinalCta } from "@/components/landing/FinalCta";
import { MinimalFooter } from "@/components/landing/MinimalFooter";
import { StickyMobileCta } from "@/components/landing/StickyMobileCta";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useSeo({
    title:
      "Proyecto IX · Diseño y desarrollo web para negocios de Menorca",
    description:
      "Webs modernas, rápidas y optimizadas para convertir visitas en clientes. Cuéntanos tu caso en menos de 1 minuto y te respondemos por WhatsApp.",
    canonical: "https://proyectoix.com/",
    jsonLd: [
      webPageLd({
        url: "https://proyectoix.com/",
        name: "Proyecto IX · Diseño y desarrollo web para negocios de Menorca",
        description:
          "Webs modernas, rápidas y optimizadas para convertir visitas en clientes. Cuéntanos tu caso en menos de 1 minuto.",
      }),
      breadcrumbLd([{ name: "Inicio", url: "https://proyectoix.com/" }]),
    ],
  });

  return (
    <div className="min-h-screen bg-transparent text-foreground selection:bg-[hsl(270,100%,60%)] selection:text-white">
      <InteractiveBackground />

      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[hsl(270,100%,60%)] origin-left z-[100] shadow-[0_0_8px_hsl(270,100%,60%)]"
        style={{ scaleX }}
        aria-hidden="true"
      />

      <MinimalHeader />

      <main className="relative z-10">
        <LandingHero />
        <VideoSection />
        <ProblemAnimated />
        <BeforeAfter />
        <AboutVisual />
        <ProcessSteps />
        <FAQ />
        <FormSection />
        <FinalCta />
      </main>

      <MinimalFooter />

      <StickyMobileCta />
    </div>
  );
}
