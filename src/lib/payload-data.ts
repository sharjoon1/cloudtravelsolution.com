import { getPayload } from "payload";
import config from "@payload-config";
import { SITE_CONFIG } from "@/lib/constants";

// ── Types ──────────────────────────────────────────────────────────────────────

export type SiteSettingsData = {
  businessInfo: {
    siteName: string;
    tagline: string;
    description: string;
    tollFreeNumber: string;
    email: string;
    whatsappNumber?: string;
  };
  branding: {
    logo?: { url?: string } | null;
    favicon?: { url?: string } | null;
    ogImage?: { url?: string } | null;
  };
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
  businessHours: {
    weekdayHours: string;
    saturdayHours: string;
    sundayHours: string;
  };
  footer: {
    footerTagline: string;
    copyrightText: string;
  };
};

export type HomepageData = {
  hero: {
    badgeText: string;
    headline: string;
    highlightText: string;
    headlineAfter: string;
    subheadline: string;
  };
  trustBadges: Array<{ icon?: string; label: string }>;
  stats: {
    heading: string;
    subheading: string;
  };
  statsItems: Array<{ value: number; suffix?: string; label: string }>;
  cta: {
    heading: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
  sectionHeadings: {
    countriesHeading: string;
    countriesSubheading: string;
    servicesHeading: string;
    servicesSubheading: string;
    locationsHeading: string;
    locationsSubheading: string;
    testimonialsHeading: string;
    testimonialsSubheading: string;
  };
};

// ── Fallback Data ──────────────────────────────────────────────────────────────

const siteSettingsFallback: SiteSettingsData = {
  businessInfo: {
    siteName: SITE_CONFIG.name,
    tagline: SITE_CONFIG.tagline,
    description: SITE_CONFIG.description,
    tollFreeNumber: SITE_CONFIG.tollFree,
    email: SITE_CONFIG.email,
  },
  branding: {},
  socialLinks: {},
  businessHours: {
    weekdayHours: "Mon - Fri: 9:00 AM - 6:00 PM",
    saturdayHours: "Sat: 10:00 AM - 4:00 PM",
    sundayHours: "Sun: Closed",
  },
  footer: {
    footerTagline:
      "India's trusted visa consulting and travel partner. Expert services across Bangalore, Hyderabad, Delhi, and Chennai with Pan India expansion.",
    copyrightText: "CloudTravelSolution. All rights reserved.",
  },
};

const homepageFallback: HomepageData = {
  hero: {
    badgeText: "Now expanding to Delhi & Chennai",
    headline: "Your Trusted",
    highlightText: "Visa & Travel",
    headlineAfter: "Partner Across India",
    subheadline:
      "Expert visa consulting for 190+ countries. From application to approval, we handle everything — so you can focus on your journey.",
  },
  trustBadges: [
    { icon: "Shield", label: "IATA Accredited" },
    { icon: "Award", label: "ISO 9001 Certified" },
    { icon: "MapPin", label: "4+ Locations" },
    { icon: "Clock", label: "20+ Years Experience" },
  ],
  stats: {
    heading: "Why Choose CloudTravelSolution?",
    subheading:
      "Trusted by thousands of travelers across India for reliable, transparent, and expert visa services.",
  },
  statsItems: [
    { value: 10000, suffix: "+", label: "Visas Processed" },
    { value: 190, suffix: "+", label: "Countries Covered" },
    { value: 98, suffix: "%", label: "Success Rate" },
    { value: 4, suffix: "", label: "Office Locations" },
  ],
  cta: {
    heading: "Ready to Start Your Journey?",
    description:
      "Get expert visa guidance from India's trusted travel consultants. Book a free consultation today and let us handle the paperwork.",
    buttonText: "Book Free Consultation",
    buttonLink: "/inquiry/visa",
  },
  sectionHeadings: {
    countriesHeading: "Popular Visa Destinations",
    countriesSubheading:
      "Expert visa assistance for the most sought-after destinations. Choose your country to get started.",
    servicesHeading: "Our Services",
    servicesSubheading:
      "Comprehensive travel and visa services to make your international travel hassle-free.",
    locationsHeading: "Our Presence Across India",
    locationsSubheading:
      "Visit us at our offices or reach out for a free consultation. We are expanding rapidly to serve you better.",
    testimonialsHeading: "What Our Clients Say",
    testimonialsSubheading:
      "Trusted by thousands of happy travelers and businesses across India.",
  },
};

// ── Data Fetching ──────────────────────────────────────────────────────────────

export async function getSiteSettings(): Promise<SiteSettingsData> {
  try {
    const payload = await getPayload({ config });
    const data = await payload.findGlobal({ slug: "site-settings" });
    return {
      businessInfo: {
        siteName: data.businessInfo?.siteName || siteSettingsFallback.businessInfo.siteName,
        tagline: data.businessInfo?.tagline || siteSettingsFallback.businessInfo.tagline,
        description: data.businessInfo?.description || siteSettingsFallback.businessInfo.description,
        tollFreeNumber: data.businessInfo?.tollFreeNumber || siteSettingsFallback.businessInfo.tollFreeNumber,
        email: data.businessInfo?.email || siteSettingsFallback.businessInfo.email,
        whatsappNumber: data.businessInfo?.whatsappNumber || undefined,
      },
      branding: {
        logo: data.branding?.logo && typeof data.branding.logo === "object" ? data.branding.logo as { url?: string } : null,
        favicon: data.branding?.favicon && typeof data.branding.favicon === "object" ? data.branding.favicon as { url?: string } : null,
        ogImage: data.branding?.ogImage && typeof data.branding.ogImage === "object" ? data.branding.ogImage as { url?: string } : null,
      },
      socialLinks: {
        facebook: data.socialLinks?.facebook || undefined,
        twitter: data.socialLinks?.twitter || undefined,
        instagram: data.socialLinks?.instagram || undefined,
        linkedin: data.socialLinks?.linkedin || undefined,
        youtube: data.socialLinks?.youtube || undefined,
      },
      businessHours: {
        weekdayHours: data.businessHours?.weekdayHours || siteSettingsFallback.businessHours.weekdayHours,
        saturdayHours: data.businessHours?.saturdayHours || siteSettingsFallback.businessHours.saturdayHours,
        sundayHours: data.businessHours?.sundayHours || siteSettingsFallback.businessHours.sundayHours,
      },
      footer: {
        footerTagline: data.footer?.footerTagline || siteSettingsFallback.footer.footerTagline,
        copyrightText: data.footer?.copyrightText || siteSettingsFallback.footer.copyrightText,
      },
    };
  } catch {
    return siteSettingsFallback;
  }
}

export async function getHomepageData(): Promise<HomepageData> {
  try {
    const payload = await getPayload({ config });
    const data = await payload.findGlobal({ slug: "homepage" });
    return {
      hero: {
        badgeText: data.hero?.badgeText || homepageFallback.hero.badgeText,
        headline: data.hero?.headline || homepageFallback.hero.headline,
        highlightText: data.hero?.highlightText || homepageFallback.hero.highlightText,
        headlineAfter: data.hero?.headlineAfter || homepageFallback.hero.headlineAfter,
        subheadline: data.hero?.subheadline || homepageFallback.hero.subheadline,
      },
      trustBadges:
        data.trustBadges && data.trustBadges.length > 0
          ? data.trustBadges.map((b: { icon?: string | null; label: string }) => ({
              icon: b.icon || undefined,
              label: b.label,
            }))
          : homepageFallback.trustBadges,
      stats: {
        heading: data.stats?.heading || homepageFallback.stats.heading,
        subheading: data.stats?.subheading || homepageFallback.stats.subheading,
      },
      statsItems:
        data.statsItems && data.statsItems.length > 0
          ? data.statsItems.map((s: { value: number; suffix?: string | null; label: string }) => ({
              value: s.value,
              suffix: s.suffix || "",
              label: s.label,
            }))
          : homepageFallback.statsItems,
      cta: {
        heading: data.cta?.heading || homepageFallback.cta.heading,
        description: data.cta?.description || homepageFallback.cta.description,
        buttonText: data.cta?.buttonText || homepageFallback.cta.buttonText,
        buttonLink: data.cta?.buttonLink || homepageFallback.cta.buttonLink,
      },
      sectionHeadings: {
        countriesHeading: data.sectionHeadings?.countriesHeading || homepageFallback.sectionHeadings.countriesHeading,
        countriesSubheading: data.sectionHeadings?.countriesSubheading || homepageFallback.sectionHeadings.countriesSubheading,
        servicesHeading: data.sectionHeadings?.servicesHeading || homepageFallback.sectionHeadings.servicesHeading,
        servicesSubheading: data.sectionHeadings?.servicesSubheading || homepageFallback.sectionHeadings.servicesSubheading,
        locationsHeading: data.sectionHeadings?.locationsHeading || homepageFallback.sectionHeadings.locationsHeading,
        locationsSubheading: data.sectionHeadings?.locationsSubheading || homepageFallback.sectionHeadings.locationsSubheading,
        testimonialsHeading: data.sectionHeadings?.testimonialsHeading || homepageFallback.sectionHeadings.testimonialsHeading,
        testimonialsSubheading: data.sectionHeadings?.testimonialsSubheading || homepageFallback.sectionHeadings.testimonialsSubheading,
      },
    };
  } catch {
    return homepageFallback;
  }
}
