export interface CampaignVisual {
  type: "checklist" | "grid" | "chips" | "examples";
  items: string[];
}

export interface CampaignBlock {
  /** Styling hint. "scenario" renders the lines as a vertical narrative timeline. */
  variant?: "default" | "scenario";
  heading?: string;
  /** Paragraphs rendered above the visual element. */
  lead?: string[];
  visual?: CampaignVisual;
  /** Paragraphs rendered below the visual element. */
  tail?: string[];
  /** Emphasized statement rendered in a highlighted card. */
  callout?: string;
  /** Button label. Clicking smooth-scrolls to the lead form. */
  cta?: string;
}

export interface CampaignContent {
  /** URL slug, served at /lp/<slug>. */
  slug: string;
  /** Identifier included in the lead email so each campaign is attributable. */
  source: string;
  seo: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cta: string;
    trust: string[];
  };
  blocks: CampaignBlock[];
  form: {
    heading: string;
    lead: string[];
  };
  closing?: {
    heading?: string;
    lead: string[];
    cta?: string;
  };
}
