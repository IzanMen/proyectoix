import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { CredibilityBar } from "@/components/sections/CredibilityBar";
import { Problem } from "@/components/sections/Problem";
import { AI } from "@/components/sections/AI";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { FAQ, faqs } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { InteractiveBackground } from "@/components/layout/InteractiveBackground";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { motion, useScroll, useSpring } from "framer-motion";
import { useSeo } from "@/lib/useSeo";
import {
  webPageLd,
  breadcrumbLd,
  faqPageLd,
} from "@/lib/structured-data";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useSeo({
    title:
      "Proyecto IX · Diseño y desarrollo web en Menorca | Agencia con IA",
    description:
      "Agencia de diseño y desarrollo web en Menorca. Webs a medida, rápidas y posicionadas en Google. SEO local, marketing digital e inteligencia artificial integrada en el proceso.",
    canonical: "https://proyectoix.com/",
    jsonLd: [
      webPageLd({
        url: "https://proyectoix.com/",
        name: "Proyecto IX · Diseño y desarrollo web en Menorca",
        description:
          "Agencia de diseño y desarrollo web en Menorca. SEO local, marketing digital e IA integrada en el proceso.",
      }),
      breadcrumbLd([{ name: "Inicio", url: "https://proyectoix.com/" }]),
      faqPageLd(
        faqs.map((f) => ({ question: f.question, answer: f.answer })),
      ),
    ],
  });

  return (
    <div className="min-h-screen bg-transparent text-foreground selection:bg-white selection:text-black">
      <InteractiveBackground />

      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-white origin-left z-[100]"
        style={{ scaleX }}
        aria-hidden="true"
      />

      <Navbar />

      <main className="relative z-10">
        <Hero />
        <CredibilityBar />
        <Problem />
        <AI />
        <Services />
        <Process />
        <About />
        <FAQ />
        <Contact />
      </main>

      <Footer />

      <WhatsAppFloat />
    </div>
  );
}
