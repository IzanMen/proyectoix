import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  whatsappLink,
  DEFAULT_WHATSAPP_MESSAGE,
  WHATSAPP_NUMBER_DISPLAY,
} from "@/lib/whatsapp";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function WhatsAppFloat() {
  const [mounted, setMounted] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const t1 = window.setTimeout(() => setMounted(true), 600);
    const t2 = window.setTimeout(() => setShowLabel(true), 1800);
    const t3 = window.setTimeout(() => setShowLabel(false), 6800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  if (dismissed || !mounted) return null;

  return (
    <div
      className="fixed z-[60] right-4 sm:right-6 pointer-events-none"
      style={{
        bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative pointer-events-auto flex items-center justify-end gap-2"
      >
        <AnimatePresence initial={false}>
          {showLabel && (
            <motion.div
              key="wa-label"
              initial={{ opacity: 0, x: 12, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 12, scale: 0.9 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-center gap-2 bg-black/85 backdrop-blur-md text-white text-[13px] font-medium pl-3 pr-3.5 py-2 rounded-full shadow-[0_8px_30px_-6px_rgba(0,0,0,0.6)] border border-white/10 whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
              ¿Hablamos?
              <button
                type="button"
                onClick={() => setDismissed(true)}
                aria-label="Cerrar invitación de WhatsApp"
                data-testid="button-whatsapp-dismiss"
                className="ml-1 -mr-1.5 w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white text-[11px] leading-none flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
              >
                ×
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <a
          href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Escríbenos por WhatsApp al ${WHATSAPP_NUMBER_DISPLAY}`}
          data-testid="link-whatsapp-float"
          className="relative inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,0.6),0_4px_12px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span
            className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-wa-pulse"
            aria-hidden="true"
          />
          <WhatsAppIcon
            size={28}
            className="relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
          />
        </a>
      </motion.div>
    </div>
  );
}
