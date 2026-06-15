const KEY = "ix-cookie-consent-v1";

export type ConsentStatus = "accepted" | "rejected" | null;

export function getConsent(): ConsentStatus {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(KEY);
    if (v === "accepted" || v === "rejected") return v;
    return null;
  } catch {
    return null;
  }
}

export function setConsent(value: "accepted" | "rejected"): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, value);
    window.dispatchEvent(
      new CustomEvent("ix-consent-change", { detail: value }),
    );
  } catch {
    // localStorage no disponible (modo privado, etc.)
  }
}

export function resetConsent(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
    window.dispatchEvent(
      new CustomEvent("ix-consent-change", { detail: null }),
    );
  } catch {
    // ignore
  }
}
