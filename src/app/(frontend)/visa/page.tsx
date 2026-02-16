import type { Metadata } from "next";
import Link from "next/link";
import { Globe, ArrowRight, BookOpen } from "lucide-react";

import { COUNTRIES_DATA } from "@/lib/visa-data";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CountrySearch } from "@/components/visa/country-search";
import { CTABanner } from "@/components/sections/cta-banner";

export const metadata: Metadata = {
  title: "Visa Services for Indian Citizens — 190+ Countries",
  description:
    "Expert visa consulting for Indian passport holders. Browse visa requirements, fees, and processing times for all countries. Tourist, business, student, and work visas.",
};

const visaTypeCards = [
  {
    name: "Tourist Visa",
    slug: "tourist",
    description: "Holiday, sightseeing & visiting friends/family",
    icon: "🌴",
  },
  {
    name: "Business Visa",
    slug: "business",
    description: "Conferences, meetings & corporate travel",
    icon: "💼",
  },
  {
    name: "Student Visa",
    slug: "student",
    description: "University, college & educational programs",
    icon: "🎓",
  },
  {
    name: "Work Visa",
    slug: "work",
    description: "Employment & professional assignments",
    icon: "🔧",
  },
  {
    name: "Transit Visa",
    slug: "transit",
    description: "Layovers & connecting flights",
    icon: "✈️",
  },
  {
    name: "Medical Visa",
    slug: "medical",
    description: "Medical treatment & health tourism",
    icon: "🏥",
  },
];

export default function VisaHubPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { name: "Home", href: "/" },
          { name: "Visa Services", href: "/visa" },
        ]}
      />

      <div className="bg-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="h-8 w-8" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              Visa Services
            </h1>
            <p className="text-white/70 text-lg max-w-2xl">
              Expert visa assistance for Indian passport holders. Browse visa
              requirements, fees, and processing times for{" "}
              {COUNTRIES_DATA.length}+ countries.
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur text-sm">
                <span className="font-bold">{COUNTRIES_DATA.length}+</span>{" "}
                Countries
              </div>
              <div className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur text-sm">
                <span className="font-bold">95%+</span> Approval Rate
              </div>
              <div className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur text-sm">
                <span className="font-bold">6</span> Visa Types
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          {/* Visa Types Quick Links */}
          <div className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                Browse by Visa Type
              </h2>
              <Link
                href="/visa/types"
                className="text-sm font-medium text-[var(--color-primary)] hover:underline flex items-center gap-1"
              >
                View all types <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {visaTypeCards.map((type) => (
                <Link
                  key={type.slug}
                  href={`/visa/types/${type.slug}`}
                  className="group p-4 rounded-xl border border-border hover:border-[var(--color-primary)]/30 hover:shadow-md transition-all text-center"
                >
                  <span className="text-3xl block mb-2">{type.icon}</span>
                  <div className="text-sm font-semibold text-foreground group-hover:text-[var(--color-primary)] transition-colors">
                    {type.name}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {type.description}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Popular destinations */}
          <div className="mb-14">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Popular Destinations
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {COUNTRIES_DATA.slice(0, 10).map((country) => (
                <Link
                  key={country.slug}
                  href={`/visa/${country.slug}`}
                  className="group flex items-center gap-3 p-4 rounded-xl border border-border hover:border-[var(--color-primary)]/30 hover:shadow-md transition-all"
                >
                  <span className="text-3xl">{country.flag}</span>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-foreground group-hover:text-[var(--color-primary)] transition-colors truncate">
                      {country.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {country.visaTypes.length} visa type
                      {country.visaTypes.length > 1 ? "s" : ""}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* All countries with search/filter */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-8">
              All Countries
            </h2>
            <CountrySearch countries={COUNTRIES_DATA} />
          </div>

          {/* CTA */}
          <div className="text-center mt-14 p-10 rounded-2xl bg-[var(--color-muted)] border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Can&apos;t Find Your Country?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              We provide visa services for 190+ countries. Contact us for any
              destination not listed here.
            </p>
            <Link
              href="/inquiry/visa"
              className="inline-flex items-center gap-2 px-7 py-3 bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)] text-white font-semibold rounded-lg transition-colors"
            >
              Book Free Consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <CTABanner />
    </>
  );
}
