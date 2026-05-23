import { createHash } from "crypto";

const PIXEL_ID = "2571910166557366";
const GRAPH_API_VERSION = "v19.0";

function sha256(value: string): string {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

function normalizePhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return null;
  // Spanish mobile: if 9 digits and starts with 6/7, prepend country code 34
  if (/^[67]\d{8}$/.test(digits)) return `34${digits}`;
  return digits;
}

interface LeadEventInput {
  eventId: string;
  eventSourceUrl?: string;
  clientIp?: string;
  clientUserAgent?: string;
  phone?: string;
  fbp?: string;
  fbc?: string;
}

export async function sendLeadEventToMeta(input: LeadEventInput): Promise<void> {
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  if (!accessToken) {
    console.warn("[meta-capi] META_CAPI_ACCESS_TOKEN not set, skipping CAPI event");
    return;
  }

  const userData: Record<string, string | string[]> = {};
  if (input.phone) {
    const normalized = normalizePhone(input.phone);
    if (normalized) userData.ph = sha256(normalized);
  }
  if (input.clientIp) userData.client_ip_address = input.clientIp;
  if (input.clientUserAgent) userData.client_user_agent = input.clientUserAgent;
  if (input.fbp) userData.fbp = input.fbp;
  if (input.fbc) userData.fbc = input.fbc;

  const payload = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: input.eventId,
        event_source_url: input.eventSourceUrl,
        action_source: "website",
        user_data: userData,
      },
    ],
  };

  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(accessToken)}`;

  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!r.ok) {
      const text = await r.text().catch(() => "");
      console.error("[meta-capi] error:", r.status, text);
    } else {
      console.log("[meta-capi] Lead event sent, event_id:", input.eventId);
    }
  } catch (err) {
    console.error("[meta-capi] network error:", err);
  }
}
