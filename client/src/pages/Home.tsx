import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Perception } from "@/components/sections/Perception";
import { Services } from "@/components/sections/Services";
import { Context } from "@/components/sections/Context";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-white selection:text-black">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-white origin-left z-[100]"
        style={{ scaleX }}
      />
      
      <Navbar />
      
      <main>
        <Hero />
        <Perception />
        <Services />
        <Context />
        <Process />
        <About />
        <Contact />
      </main>
    </div>
  );
}
