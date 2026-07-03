import type { Metadata } from "next";
import { connection } from "next/server";

import { Hero } from "@/components/sections/hero";
import { CountryGrid } from "@/components/sections/country-grid";
import { ServicesGrid } from "@/components/sections/services-grid";
import { StatsCounter } from "@/components/sections/stats-counter";
import { LocationsMap } from "@/components/sections/locations-map";
import { Testimonials } from "@/components/sections/testimonials";
import { InstagramFollow } from "@/components/sections/instagram-follow";
import { CTABanner } from "@/components/sections/cta-banner";
import { SITE_CONFIG } from "@/lib/constants";
import { getSiteSettings, getHomepageData } from "@/lib/payload-data";
import { generateOrganizationSchema } from "@/lib/seo";

export const metadata: Metadata = {
  description: SITE_CONFIG.description,
  alternates: { canonical: "/" },
  openGraph: {
    url: SITE_CONFIG.url,
    images: [
      { url: SITE_CONFIG.ogImage, width: 1200, height: 630, alt: SITE_CONFIG.name },
    ],
  },
};

export default async function HomePage() {
  await connection();
  const [siteSettings, homepage] = await Promise.all([
    getSiteSettings(),
    getHomepageData(),
  ]);

  const orgSchema = {
    ...generateOrganizationSchema(),
    sameAs: [
      siteSettings?.socialLinks?.facebook,
      siteSettings?.socialLinks?.twitter,
      siteSettings?.socialLinks?.instagram,
      siteSettings?.socialLinks?.linkedin,
      siteSettings?.socialLinks?.youtube,
    ].filter(Boolean),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <Hero heroData={homepage.hero} trustBadges={homepage.trustBadges} />
      <CountryGrid headings={homepage.sectionHeadings} />
      <ServicesGrid headings={homepage.sectionHeadings} />
      <StatsCounter statsData={homepage.stats} statsItems={homepage.statsItems} />
      <LocationsMap headings={homepage.sectionHeadings} />
      <Testimonials headings={homepage.sectionHeadings} />
      <InstagramFollow instagramUrl={siteSettings?.socialLinks?.instagram} />
      <CTABanner ctaData={homepage.cta} siteSettings={siteSettings} />
    </>
  );
}
