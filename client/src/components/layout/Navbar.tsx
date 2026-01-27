import { useState, useEffect } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300",
        scrolled ? "bg-black/60 backdrop-blur-md border-b border-white/5 py-3" : "bg-transparent py-6"
      )}
    >
      <Link href="/">
        <a className="text-xl font-display font-bold tracking-tighter text-white z-50 relative group cursor-pointer">
          IZAN & XALOC
          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
        </a>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        <a href="#process" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Proceso</a>
        <a href="#about" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Nosotros</a>
        <a href="#contact" className="px-4 py-2 text-sm font-medium bg-white text-black rounded-sm hover:bg-white/90 transition-colors">
          Contactar
        </a>
      </div>
      
      {/* Mobile Menu Icon Placeholder - keeping it simple for now */}
      <div className="md:hidden w-6 h-6 flex flex-col justify-center items-end gap-1.5 cursor-pointer">
        <div className="w-6 h-[1px] bg-white"></div>
        <div className="w-4 h-[1px] bg-white"></div>
      </div>
    </motion.nav>
  );
}
