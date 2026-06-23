import type { CampaignContent } from "@/components/campaign/types";
import { negociosMenorca } from "./negocios-menorca";
import { restauranteMenorca } from "./restaurante-menorca";
import { peluqueriaMenorca } from "./peluqueria-menorca";
import { alojamientoMenorca } from "./alojamiento-menorca";

export const campaigns: CampaignContent[] = [
  negociosMenorca,
  restauranteMenorca,
  peluqueriaMenorca,
  alojamientoMenorca,
];

export const campaignBySlug: Record<string, CampaignContent> =
  Object.fromEntries(campaigns.map((c) => [c.slug, c]));
