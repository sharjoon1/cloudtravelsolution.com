"use client";

import { useSyncExternalStore } from "react";
import { Check, X } from "lucide-react";

export const CONSENT_STORAGE_KEY = "cts-consent";

declare global {
  interface Window {
    // Defined by the ConsentDefault bootstrap script in <head>.
    gtag?: (...args: unknown[]) => void;
  }
}

type ConsentValues = {
  ad_storage: "granted" | "denied";
  ad_user_data: "granted" | "denied";
  ad_personalization: "granted" | "denied";
  analytics_storage: "granted" | "denied";
};

// ── External store: the banner shows until the visitor has made a choice. ──────
// useSyncExternalStore is the React-blessed way to read client-only state
// (localStorage) without a setState-in-effect, so SSR sends no banner markup
// (getServerSnapshot => true) and it only appears after hydration if unconsented.
const consentListeners = new Set<() => void>();

function subscribeConsent(cb: () => void): () => void {
  consentListeners.add(cb);
  window.addEventListener("storage", cb); // sync choice made in other tabs
  return () => {
    consentListeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

function consentExistsSnapshot(): boolean {
  try {
    return localStorage.getItem(CONSENT_STORAGE_KEY) !== null;
  } catch {
    return true; // storage unavailable — don't pester the user
  }
}

/** Push the consent choice to gtag (if loaded), persist it, and re-render the banner away. */
export function setConsent(granted: boolean): ConsentValues {
  const v: ConsentValues["ad_storage"] = granted ? "granted" : "denied";
  const update: ConsentValues = {
    ad_storage: v,
    ad_user_data: v,
    ad_personalization: v,
    analytics_storage: v,
  };
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("consent", "update", update);
  }
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(update));
  } catch {
    // localStorage unavailable (private mode) — the gtag update still applies this session.
  }
  consentListeners.forEach((l) => l());
  return update;
}

export function ConsentBanner() {
  const hasConsent = useSyncExternalStore(
    subscribeConsent,
    consentExistsSnapshot,
    () => true // SSR: behave as if consented so no banner markup is streamed.
  );

  if (hasConsent) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[100] px-4 pb-4"
    >
      <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-600">
            We use cookies to enhance your experience and analyze site traffic. See our{" "}
            <a href="/privacy-policy" className="font-medium text-[#0c6cbc] underline">
              Privacy Policy
            </a>
            . You can change your choice anytime.
          </p>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => setConsent(false)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              aria-label="Reject non-essential cookies"
            >
              <X className="h-4 w-4" aria-hidden="true" />
              Reject
            </button>
            <button
              type="button"
              onClick={() => setConsent(true)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#0cfcbc] px-4 py-2 text-sm font-semibold text-[#094f8a] transition-colors hover:bg-[#0adba5]"
              aria-label="Accept all cookies"
            >
              <Check className="h-4 w-4" aria-hidden="true" />
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
