import type { Metadata } from "next";
import Link from "next/link";
import {
  FileCheck,
  Shield,
  BookOpen,
  Stamp,
  Building2,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import { SERVICES } from "@/lib/constants";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CTABanner } from "@/components/sections/cta-banner";

export const metadata: Metadata = {
  title: "Our Services — Visa Consulting, Travel Insurance & More",
  description:
    "Comprehensive travel services from CloudTravelSolution: visa consulting for 190+ countries, travel insurance, passport services, document attestation, and corporate travel management.",
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileCheck,
  Shield,
  BookOpen,
  Stamp,
  Building2,
};

const detailedServices = [
  {
    ...SERVICES[0],
    features: [
      "Visa assistance for 190+ countries",
      "Tourist, Business, Student, Work, Transit visas",
      "Document preparation and verification",
      "Embassy appointment scheduling",
      "Interview preparation coaching",
      "Application tracking and follow-up",
      "Express and priority processing",
      "Post-visa travel advisory",
    ],
  },
  {
    ...SERVICES[1],
    features: [
      "Comprehensive medical coverage",
      "Trip cancellation protection",
      "Baggage loss/delay coverage",
      "Emergency evacuation",
      "Schengen-compliant policies",
      "Multi-trip annual plans",
      "Corporate group policies",
      "Claims assistance",
    ],
  },
  {
    ...SERVICES[2],
    features: [
      "New passport applications",
      "Passport renewals",
      "Tatkal (urgent) processing",
      "Minor passport applications",
      "Name/address corrections",
      "Additional booklet pages",
      "Police verification assistance",
      "Document preparation",
    ],
  },
  {
    ...SERVICES[3],
    features: [
      "MEA (Ministry of External Affairs) attestation",
      "State HRD attestation",
      "Embassy attestation",
      "Apostille services",
      "Translation services",
      "Notarization",
      "Chamber of Commerce attestation",
      "Educational document verification",
    ],
  },
  {
    ...SERVICES[4],
    features: [
      "Flight and hotel bookings",
      "Travel policy management",
      "MICE event organization",
      "Duty of care services",
      "Expense reporting integration",
      "24/7 travel support",
      "Forex and travel insurance",
      "Group travel management",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ]}
      />

      <div className="bg-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              Our Services
            </h1>
            <p className="text-white/70 text-lg max-w-2xl">
              Comprehensive travel and visa services designed to make your
              international travel completely hassle-free.
            </p>
          </div>
        </div>

        {/* Service sections */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="space-y-16">
            {detailedServices.map((service, index) => {
              const Icon = iconMap[service.icon] || FileCheck;
              return (
                <div
                  key={service.slug}
                  id={service.slug}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="h-14 w-14 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center mb-4">
                      <Icon className="h-7 w-7 text-[var(--color-primary)]" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-3">
                      {service.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)] text-white font-semibold rounded-lg transition-colors text-sm"
                      >
                        Learn More
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href="/inquiry/visa"
                        className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-foreground/80 font-medium rounded-lg hover:bg-[var(--color-muted)] transition-colors text-sm"
                      >
                        Get Started
                      </Link>
                    </div>
                  </div>
                  <div
                    className={`p-6 rounded-xl bg-[var(--color-muted)] border border-border ${
                      index % 2 === 1 ? "lg:order-1" : ""
                    }`}
                  >
                    <h3 className="font-semibold text-foreground mb-4">
                      What&apos;s Included
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-sm text-foreground/70"
                        >
                          <CheckCircle2 className="h-4 w-4 text-[var(--color-accent)] shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <CTABanner />
    </>
  );
}
