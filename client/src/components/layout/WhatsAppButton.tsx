import {
  whatsappLink,
  DEFAULT_WHATSAPP_MESSAGE,
  WHATSAPP_NUMBER_DISPLAY,
} from "@/lib/whatsapp";
import { WhatsAppIcon } from "./WhatsAppIcon";

interface WhatsAppButtonProps {
  variant?: "solid" | "outline" | "ghost";
  message?: string;
  label?: string;
  showNumber?: boolean;
  className?: string;
  testId?: string;
  fullWidthOnMobile?: boolean;
}

export function WhatsAppButton({
  variant = "solid",
  message = DEFAULT_WHATSAPP_MESSAGE,
  label = "WhatsApp",
  showNumber = false,
  className = "",
  testId = "link-whatsapp",
  fullWidthOnMobile = true,
}: WhatsAppButtonProps) {
  const styles =
    variant === "solid"
      ? "bg-[#25D366] text-white hover:bg-[#20bd5a] shadow-[0_0_30px_-8px_rgba(37,211,102,0.6)]"
      : variant === "outline"
        ? "border border-[#25D366]/40 text-[#25D366] hover:border-[#25D366] hover:bg-[#25D366]/10"
        : "text-white/70 hover:text-[#25D366]";

  const widthClass = fullWidthOnMobile ? "w-full sm:w-auto" : "";

  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={testId}
      aria-label={`Escribir por WhatsApp al ${WHATSAPP_NUMBER_DISPLAY}`}
      className={`group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-sm text-sm font-semibold tracking-tight transition-all duration-300 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-background ${widthClass} ${styles} ${className}`}
    >
      <WhatsAppIcon size={18} />
      <span className="whitespace-nowrap">{label}</span>
      {showNumber && (
        <span className="hidden md:inline text-xs opacity-80 font-mono whitespace-nowrap">
          · {WHATSAPP_NUMBER_DISPLAY}
        </span>
      )}
    </a>
  );
}
