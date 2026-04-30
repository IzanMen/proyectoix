export const WHATSAPP_NUMBER_DISPLAY = "+34 640 662 892";
export const WHATSAPP_NUMBER_RAW = "34640662892";

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER_RAW}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hola, vengo de la web de Proyecto IX y quiero saber más sobre vuestro trabajo.";
