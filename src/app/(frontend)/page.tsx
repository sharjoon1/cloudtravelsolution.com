import { Hero } from "@/components/sections/hero";
import { CountryGrid } from "@/components/sections/country-grid";
import { ServicesGrid } from "@/components/sections/services-grid";
import { StatsCounter } from "@/components/sections/stats-counter";
import { LocationsMap } from "@/components/sections/locations-map";
import { Testimonials } from "@/components/sections/testimonials";
import { CTABanner } from "@/components/sections/cta-banner";
import { getSiteSettings, getHomepageData } from "@/lib/payload-data";

export const revalidate = 60;

export default async function HomePage() {
  const [siteSettings, homepage] = await Promise.all([
    getSiteSettings(),
    getHomepageData(),
  ]);

  return (
    <>
      <Hero heroData={homepage.hero} trustBadges={homepage.trustBadges} />
      <CountryGrid headings={homepage.sectionHeadings} />
      <ServicesGrid headings={homepage.sectionHeadings} />
      <StatsCounter statsData={homepage.stats} statsItems={homepage.statsItems} />
      <LocationsMap headings={homepage.sectionHeadings} />
      <Testimonials headings={homepage.sectionHeadings} />
      <CTABanner ctaData={homepage.cta} siteSettings={siteSettings} />
    </>
  );
}
