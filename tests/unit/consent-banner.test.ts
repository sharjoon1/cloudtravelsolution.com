import { describe, it, expect, beforeEach } from "vitest";
import { setConsent, reopenConsent, CONSENT_STORAGE_KEY } from "@/components/consent-banner";

describe("setConsent", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("grants every storage type when accepted and persists it", () => {
    const result = setConsent(true);
    expect(result).toEqual({
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
      analytics_storage: "granted",
    });
    const stored = JSON.parse(localStorage.getItem(CONSENT_STORAGE_KEY)!);
    expect(stored.analytics_storage).toBe("granted");
    expect(stored.ad_storage).toBe("granted");
  });

  it("denies every storage type when rejected and persists it", () => {
    const result = setConsent(false);
    expect(result.ad_storage).toBe("denied");
    expect(result.analytics_storage).toBe("denied");
    const stored = JSON.parse(localStorage.getItem(CONSENT_STORAGE_KEY)!);
    expect(stored.ad_storage).toBe("denied");
  });
});

describe("reopenConsent", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("clears a previously stored choice so the banner can re-show", () => {
    setConsent(true);
    expect(localStorage.getItem(CONSENT_STORAGE_KEY)).not.toBeNull();

    reopenConsent();

    expect(localStorage.getItem(CONSENT_STORAGE_KEY)).toBeNull();
  });

  it("is a no-op (no throw) when no choice was ever stored", () => {
    expect(() => reopenConsent()).not.toThrow();
    expect(localStorage.getItem(CONSENT_STORAGE_KEY)).toBeNull();
  });
});
