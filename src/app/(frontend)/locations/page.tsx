import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Building2,
  Globe,
} from "lucide-react";

import { LOCATIONS, SITE_CONFIG } from "@/lib/constants";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CTABanner } from "@/components/sections/cta-banner";

export const metadata: Metadata = {
  title: "Our Locations — Offices Across India",
  description:
    "Visit CloudTravelSolution offices in Bangalore, Hyderabad, Delhi, and Chennai. Expert visa consulting and travel services with a Pan India presence.",
};

const expansionRoadmap = [
  {
    phase: "Current",
    year: "2024-2026",
    cities: ["Bangalore", "Hyderabad"],
    status: "active" as const,
  },
  {
    phase: "Phase 2",
    year: "2026",
    cities: ["Delhi NCR", "Chennai"],
    status: "launching" as const,
  },
  {
    phase: "Phase 3",
    year: "2027",
    cities: ["Mumbai", "Pune", "Kolkata"],
    status: "planned" as const,
  },
  {
    phase: "Phase 4",
    year: "2028",
    cities: ["Ahmedabad", "Jaipur", "Kochi", "Lucknow"],
    status: "planned" as const,
  },
];

export default function LocationsPage() {
  const activeLocations = LOCATIONS.filter((l) => l.status === "active");
  const comingSoonLocations = LOCATIONS.filter(
    (l) => l.status === "coming-soon"
  );

  return (
    <>
      <Breadcrumb
        items={[
          { name: "Home", href: "/" },
          { name: "Locations", href: "/locations" },
        ]}
      />

      <div className="bg-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              Our Locations
            </h1>
            <p className="text-white/70 text-lg max-w-2xl">
              Visit us at our offices across India for in-person visa consulting
              and travel assistance.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          {/* Active locations */}
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Building2 className="h-6 w-6 text-[var(--color-primary)]" />
            Active Offices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
            {activeLocations.map((location) => (
              <Link
                key={location.slug}
                href={`/locations/${location.slug}`}
                className="group p-6 rounded-xl border border-border hover:border-[var(--color-primary)]/30 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-[var(--color-accent)]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-[var(--color-primary)] transition-colors">
                        {location.city}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {location.state}, India
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider bg-[var(--color-accent)]/10 text-[var(--color-accent)] rounded-full">
                    Open
                  </span>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  {location.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5" />
                      {location.phone}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5" />
                    {location.email}
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] group-hover:gap-2 transition-all">
                  View Office Details
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>

          {/* Coming soon locations */}
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Globe className="h-6 w-6 text-[var(--color-secondary)]" />
            Coming Soon
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
            {comingSoonLocations.map((location) => (
              <Link
                key={location.slug}
                href={`/locations/${location.slug}`}
                className="group p-6 rounded-xl border border-dashed border-border hover:border-[var(--color-secondary)]/30 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-[var(--color-secondary)]/10 flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-[var(--color-secondary)]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-[var(--color-secondary)] transition-colors">
                        {location.city}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {location.state}, India
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] rounded-full">
                    Coming Soon
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Our {location.city} office is opening soon. Until then, reach
                  us through our existing locations or submit an online inquiry.
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-secondary)] group-hover:gap-2 transition-all">
                  Learn More
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>

          {/* Expansion Roadmap */}
          <div className="p-8 rounded-2xl bg-[var(--color-muted)] border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-2 text-center">
              Pan India Expansion Roadmap
            </h2>
            <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">
              Our goal is to have a physical presence in every major Indian city,
              making expert visa consulting accessible nationwide.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {expansionRoadmap.map((phase) => (
                <div
                  key={phase.phase}
                  className={`p-5 rounded-xl border ${
                    phase.status === "active"
                      ? "bg-white border-[var(--color-accent)]/30"
                      : phase.status === "launching"
                        ? "bg-white border-[var(--color-secondary)]/30"
                        : "bg-white/50 border-border"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {phase.phase}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {phase.year}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {phase.cities.map((city) => (
                      <span
                        key={city}
                        className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                          phase.status === "active"
                            ? "bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                            : phase.status === "launching"
                              ? "bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]"
                              : "bg-neutral-100 text-muted-foreground"
                        }`}
                      >
                        {city}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <CTABanner />
    </>
  );
}
