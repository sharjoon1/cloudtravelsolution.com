import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight, Building2, Rocket } from "lucide-react";

import { CTABanner } from "@/components/sections/cta-banner";

export const metadata: Metadata = {
  title: "Pan India Expansion Roadmap",
  description:
    "CloudTravelSolution expansion plan — bringing expert visa consulting and travel services to every major Indian city. View our growth roadmap.",
};

const phases = [
  {
    name: "Phase 1 — Foundation",
    period: "2004-2025",
    status: "completed" as const,
    description:
      "Established our core operations in Bangalore and Hyderabad, building a reputation for reliable visa consulting and high approval rates.",
    cities: [
      {
        name: "Bangalore",
        state: "Karnataka",
        status: "active",
        year: "2004",
      },
      {
        name: "Hyderabad",
        state: "Telangana",
        status: "active",
        year: "2010",
      },
    ],
  },
  {
    name: "Phase 2 — North & South Expansion",
    period: "2026",
    status: "in-progress" as const,
    description:
      "Expanding into India's largest metro cities to serve the rapidly growing international travel demand in the North and South.",
    cities: [
      {
        name: "Delhi NCR",
        state: "Delhi",
        status: "coming-soon",
        year: "2026",
      },
      {
        name: "Chennai",
        state: "Tamil Nadu",
        status: "coming-soon",
        year: "2026",
      },
    ],
  },
  {
    name: "Phase 3 — Western & Eastern India",
    period: "2027",
    status: "planned" as const,
    description:
      "Bringing our services to the commercial capital and key cities in Western and Eastern India.",
    cities: [
      { name: "Mumbai", state: "Maharashtra", status: "planned", year: "2027" },
      { name: "Pune", state: "Maharashtra", status: "planned", year: "2027" },
      {
        name: "Kolkata",
        state: "West Bengal",
        status: "planned",
        year: "2027",
      },
    ],
  },
  {
    name: "Phase 4 — Pan India Presence",
    period: "2028",
    status: "planned" as const,
    description:
      "Achieving our vision of a nationwide presence with offices in every major Indian city.",
    cities: [
      { name: "Ahmedabad", state: "Gujarat", status: "planned", year: "2028" },
      {
        name: "Jaipur",
        state: "Rajasthan",
        status: "planned",
        year: "2028",
      },
      { name: "Kochi", state: "Kerala", status: "planned", year: "2028" },
      {
        name: "Lucknow",
        state: "Uttar Pradesh",
        status: "planned",
        year: "2028",
      },
    ],
  },
];

export default function ExpansionPage() {
  return (
    <>
      <div className="bg-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <Rocket className="h-6 w-6" />
                <span className="text-sm font-semibold uppercase tracking-wider text-white/60">
                  Growth Roadmap
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                Pan India Expansion
              </h1>
              <p className="text-lg text-white/80 leading-relaxed">
                Our mission is to make expert visa consulting accessible to
                every Indian, no matter where they are. We&apos;re systematically
                expanding to bring our services to every major city in India.
              </p>
            </div>
          </div>
        </div>

        {/* Phases */}
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="space-y-12">
            {phases.map((phase) => (
              <div
                key={phase.name}
                className={`p-8 rounded-2xl border ${
                  phase.status === "completed"
                    ? "border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5"
                    : phase.status === "in-progress"
                      ? "border-[var(--color-secondary)]/20 bg-[var(--color-secondary)]/5"
                      : "border-border bg-[var(--color-muted)]"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">
                      {phase.name}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {phase.period}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full ${
                      phase.status === "completed"
                        ? "bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                        : phase.status === "in-progress"
                          ? "bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]"
                          : "bg-neutral-200 text-muted-foreground"
                    }`}
                  >
                    {phase.status === "completed"
                      ? "Completed"
                      : phase.status === "in-progress"
                        ? "In Progress"
                        : "Planned"}
                  </span>
                </div>

                <p className="text-sm text-foreground/70 mb-6 leading-relaxed">
                  {phase.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {phase.cities.map((city) => (
                    <div
                      key={city.name}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white border border-border"
                    >
                      <div
                        className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                          city.status === "active"
                            ? "bg-[var(--color-accent)]/10"
                            : city.status === "coming-soon"
                              ? "bg-[var(--color-secondary)]/10"
                              : "bg-neutral-100"
                        }`}
                      >
                        <MapPin
                          className={`h-5 w-5 ${
                            city.status === "active"
                              ? "text-[var(--color-accent)]"
                              : city.status === "coming-soon"
                                ? "text-[var(--color-secondary)]"
                                : "text-muted-foreground"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-foreground">
                          {city.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {city.state}
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {city.year}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-14 p-10 rounded-2xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10">
            <Building2 className="h-10 w-10 text-[var(--color-primary)] mx-auto mb-3" />
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Interested in Partnering?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              We&apos;re looking for partners in upcoming cities. If you&apos;re
              interested in a franchise or partnership opportunity, get in touch.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)] text-white font-semibold rounded-lg transition-colors"
            >
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <CTABanner />
    </>
  );
}
