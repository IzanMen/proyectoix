import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { CredibilityBar } from "@/components/sections/CredibilityBar";
import { Problem } from "@/components/sections/Problem";
import { AI } from "@/components/sections/AI";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { InteractiveBackground } from "@/components/layout/InteractiveBackground";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
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
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
