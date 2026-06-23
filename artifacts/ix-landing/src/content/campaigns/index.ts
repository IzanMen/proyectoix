import type { CampaignContent } from "@/components/campaign/types";
import { negociosMenorca } from "./negocios-menorca";

export const campaigns: CampaignContent[] = [negociosMenorca];

export const campaignBySlug: Record<string, CampaignContent> =
  Object.fromEntries(campaigns.map((c) => [c.slug, c]));
