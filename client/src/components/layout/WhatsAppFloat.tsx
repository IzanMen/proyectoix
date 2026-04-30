import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  whatsappLink,
  DEFAULT_WHATSAPP_MESSAGE,
} from "@/lib/whatsapp";

export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          key="wa-float"
          href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escríbenos por WhatsApp al +34 640 662 892"
          data-testid="link-whatsapp-float"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-[60] inline-flex items-center justify-center w-14 h-14 sm:w-15 sm:h-15 rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_-4px_rgba(37,211,102,0.55)] hover:scale-105 active:scale-95 transition-transform"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width="28"
            height="28"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.93 2.715.93.317 0 2.146-.43 2.146-1.62 0-.488.072-.616-.144-1.103-.158-.331-.658-.6-1.014-.776-.503-.215-.715-.272-.965-.554zm-2.911-9.72c-5.063.244-9.043 4.466-8.795 9.527.077 1.572.555 3.05 1.36 4.336L7 25.45l4.245-1.32c1.218.66 2.628 1.067 4.123 1.067 5.063-.244 9.043-4.466 8.795-9.526-.244-5.06-4.467-9.04-9.527-8.797zm-.082 16.45c-1.27.062-2.494-.244-3.594-.83l-2.522.808.86-2.39c-.85-1.022-1.367-2.292-1.428-3.687-.21-4.295 3.097-7.825 7.39-8.034 4.296-.21 7.825 3.098 8.034 7.392.21 4.296-3.097 7.825-7.392 8.034z" />
          </svg>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
