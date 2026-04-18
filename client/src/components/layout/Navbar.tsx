import { useState, useEffect } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Proceso", href: "#process" },
    { name: "Nosotros", href: "#about" },
    { name: "Contactar", href: "#contact", primary: true },
  ];

  const availability = (
    <span className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/50">
      <span className="w-1.5 h-1.5 rounded-full bg-[hsl(270,100%,60%)] animate-pulse shadow-[0_0_8px_hsl(270,100%,60%)]" />
      Aceptando proyectos
    </span>
  );

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "bg-black/60 backdrop-blur-md border-b border-white/5 py-3" : "bg-transparent py-6"
        )}
      >
        <div className="w-full max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="text-xl font-display font-bold tracking-tighter text-white z-50 relative group cursor-pointer flex items-center gap-1" onClick={() => setMobileMenuOpen(false)}>
            <span className="text-2xl">IX</span>
            <span className="w-2 h-2 bg-[hsl(270,100%,60%)] rounded-full mt-1 shadow-[0_0_15px_hsl(270,100%,60%)] animate-pulse"></span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <span className="hidden lg:inline-flex">{availability}</span>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors",
                link.primary
                  ? "px-4 py-2 bg-white text-black rounded-sm hover:bg-white/90"
                  : "text-white/70 hover:text-white"
              )}
            >
              {link.name}
            </a>
          ))}
        </div>
        
        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden z-50 w-10 h-10 flex items-center justify-center relative focus:outline-none"
        >
          <div className="flex flex-col items-end gap-1.5 w-6">
             <motion.span 
               animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
               className="w-6 h-[1px] bg-white block origin-center transition-all"
             />
             <motion.span 
               animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
               className="w-4 h-[1px] bg-white block transition-all"
             />
             <motion.span 
               animate={mobileMenuOpen ? { rotate: -45, y: -5, width: 24 } : { rotate: 0, y: 0, width: 16 }}
               className="w-4 h-[1px] bg-white block origin-center transition-all"
             />
          </div>
        </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)", transition: { duration: 0.5, ease: "easeInOut" } }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col justify-center items-center md:hidden"
          >
            <div className="flex flex-col gap-8 text-center">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "text-3xl font-display font-bold tracking-tight",
                    link.primary ? "text-white" : "text-white/60 hover:text-white transition-colors"
                  )}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.5 }}
              className="absolute bottom-12 text-white/20 text-xs font-mono uppercase tracking-widest"
            >
              Menorca
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
