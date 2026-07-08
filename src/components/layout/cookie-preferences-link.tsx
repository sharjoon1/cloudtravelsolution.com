"use client";

import { reopenConsent } from "@/components/consent-banner";

/**
 * Footer "Cookie preferences" trigger. Rendered inside the (server-rendered)
 * Footer, so it lives in its own client component to attach the onClick that
 * reopens the consent banner. Styled to match the surrounding legal links.
 */
export function CookiePreferencesLink() {
  return (
    <button
      type="button"
      onClick={reopenConsent}
      className="text-xs text-white/60 hover:text-white/80 transition-colors"
    >
      Cookie preferences
    </button>
  );
}
