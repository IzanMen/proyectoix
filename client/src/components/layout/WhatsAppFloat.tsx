import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  whatsappLink,
  DEFAULT_WHATSAPP_MESSAGE,
} from "@/lib/whatsapp";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let nearContact = false;
    const onScroll = () => {
      const scrolled = window.scrollY > 480;
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        const rect = contactEl.getBoundingClientRect();
        nearContact = rect.top < window.innerHeight * 0.85;
      }
      const footerEl = document.querySelector("footer");
      let nearFooter = false;
      if (footerEl) {
        const rect = footerEl.getBoundingClientRect();
        nearFooter = rect.top < window.innerHeight - 40;
      }
      setVisible(scrolled && !nearContact && !nearFooter);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          key="wa-float"
          href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escríbenos por WhatsApp"
          data-testid="link-whatsapp-float"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[60] inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_-4px_rgba(37,211,102,0.55)] hover:scale-105 active:scale-95 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          style={{
            paddingBottom: "env(safe-area-inset-bottom, 0)",
            marginBottom: "env(safe-area-inset-bottom, 0)",
          }}
        >
          <WhatsAppIcon size={26} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
