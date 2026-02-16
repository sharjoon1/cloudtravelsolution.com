import { Hero } from "@/components/sections/hero";
import { CountryGrid } from "@/components/sections/country-grid";
import { ServicesGrid } from "@/components/sections/services-grid";
import { StatsCounter } from "@/components/sections/stats-counter";
import { LocationsMap } from "@/components/sections/locations-map";
import { Testimonials } from "@/components/sections/testimonials";
import { CTABanner } from "@/components/sections/cta-banner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CountryGrid />
      <ServicesGrid />
      <StatsCounter />
      <LocationsMap />
      <Testimonials />
      <CTABanner />
    </>
  );
}
