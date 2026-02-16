import type { Metadata } from "next";
import Link from "next/link";
import {
  Palmtree,
  Briefcase,
  GraduationCap,
  HardHat,
  Plane,
  HeartPulse,
  ArrowRight,
  Globe,
} from "lucide-react";

import { getVisaTypeCategories } from "@/lib/visa-data";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CTABanner } from "@/components/sections/cta-banner";

export const metadata: Metadata = {
  title: "Visa Types — Tourist, Business, Student, Work & More",
  description:
    "Browse visa categories for Indian passport holders. Find requirements, fees, and processing times for tourist, business, student, work, transit, and medical visas across 30+ countries.",
  openGraph: {
    title: "Visa Types | CloudTravelSolution",
    description:
      "Explore all visa categories: tourist, business, student, work, transit, and medical visas for Indian citizens.",
  },
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Palmtree,
  Briefcase,
  GraduationCap,
  HardHat,
  Plane,
  HeartPulse,
};

export default function VisaTypesHubPage() {
  const categories = getVisaTypeCategories();

  return (
    <>
      <Breadcrumb
        items={[
          { name: "Home", href: "/" },
          { name: "Visa", href: "/visa" },
          { name: "Visa Types", href: "/visa/types" },
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
              Visa Types
            </h1>
            <p className="text-white/70 text-lg max-w-2xl">
              Explore visa categories for Indian passport holders. Find the
              right visa type for your travel purpose — whether it&apos;s
              tourism, business, education, or employment.
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur text-sm">
                <span className="font-bold">6</span> Visa Categories
              </div>
              <div className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur text-sm">
                <span className="font-bold">30+</span> Countries
              </div>
              <div className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur text-sm">
                <span className="font-bold">95%+</span> Approval Rate
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          {/* Visa type categories grid */}
          <div className="mb-14">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Browse by Visa Category
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => {
                const Icon = iconMap[cat.icon] || Globe;
                return (
                  <Link
                    key={cat.slug}
                    href={`/visa/types/${cat.slug}`}
                    className="group flex flex-col p-6 rounded-xl border border-border hover:border-[var(--color-primary)]/30 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-[var(--color-primary)] transition-colors">
                          {cat.name}
                        </h3>
                        <span className="text-xs text-muted-foreground">
                          {cat.countryCount}{" "}
                          {cat.countryCount === 1 ? "country" : "countries"}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                      {cat.description}
                    </p>
                    <div className="flex items-center gap-1 text-sm font-medium text-[var(--color-primary)]">
                      View countries
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Info section */}
          <div className="text-center p-10 rounded-2xl bg-[var(--color-muted)] border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Not Sure Which Visa You Need?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Our visa experts will help you determine the right visa type based
              on your travel purpose, destination, and timeline.
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
