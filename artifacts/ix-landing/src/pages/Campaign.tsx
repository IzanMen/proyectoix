import { negociosMenorca } from "@/content/campaigns/negocios-menorca";
import { CampaignLanding } from "@/components/campaign/CampaignLanding";

export default function Campaign() {
  return <CampaignLanding content={negociosMenorca} />;
}
