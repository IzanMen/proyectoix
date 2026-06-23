import { useParams } from "wouter";
import { lazy } from "react";
import { campaignBySlug } from "@/content/campaigns";
import { CampaignLanding } from "@/components/campaign/CampaignLanding";

const NotFound = lazy(() => import("@/pages/not-found"));

export default function Campaign() {
  const params = useParams<{ slug: string }>();
  const content = params.slug ? campaignBySlug[params.slug] : undefined;

  if (!content) return <NotFound />;

  return <CampaignLanding content={content} />;
}
