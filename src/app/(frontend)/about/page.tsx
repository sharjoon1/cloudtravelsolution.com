import type { Metadata } from "next";
import Link from "next/link";
import {
  Shield,
  Award,
  Users,
  Globe,
  MapPin,
  ArrowRight,
  Target,
  Eye,
} from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CTABanner } from "@/components/sections/cta-banner";

export const metadata: Metadata = {
  title: "About Us — Our Story, Mission & Vision",
  description:
    "Learn about CloudTravelSolution — India's trusted visa consulting and travel agency. Our story, mission, team, and commitment to making international travel accessible.",
};

const values = [
  {
    icon: Shield,
    title: "Trust & Transparency",
    description:
      "Clear pricing, honest advice, and complete transparency in every interaction. No hidden fees, no false promises.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We maintain the highest standards in visa processing, documentation, and client service delivery.",
  },
  {
    icon: Users,
    title: "Client-First",
    description:
      "Every decision we make is guided by what's best for our clients. Your success is our success.",
  },
  {
    icon: Globe,
    title: "Accessibility",
    description:
      "Making international travel accessible to every Indian — from first-time travelers to frequent flyers.",
  },
];

const milestones = [
  { year: "2004", event: "Founded in Bangalore with a vision to simplify visa processing" },
  { year: "2010", event: "Expanded to Hyderabad, serving South India's growing travel demand" },
  { year: "2018", event: "Crossed 5,000 visa applications processed milestone" },
  { year: "2022", event: "Launched digital-first visa consulting platform" },
  { year: "2025", event: "Expanding to Delhi & Chennai — Pan India vision begins" },
  { year: "2026", event: "Targeting 8+ cities with India's best travel platform" },
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { name: "Home", href: "/" },
          { name: "About Us", href: "/about" },
        ]}
      />

      <div className="bg-white">
        {/* Hero */}
        <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                About CloudTravelSolution
              </h1>
              <p className="text-lg text-white/80 leading-relaxed">
                We started with a simple belief: applying for a visa shouldn&apos;t
                be stressful. Today, we&apos;re one of India&apos;s most trusted
                visa consulting and travel agencies, helping thousands of
                Indians travel the world with confidence.
              </p>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10">
              <Target className="h-8 w-8 text-[var(--color-primary)] mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-3">
                Our Mission
              </h2>
              <p className="text-foreground/70 leading-relaxed">
                To make international travel accessible and stress-free for
                every Indian by providing expert visa consulting, transparent
                pricing, and end-to-end travel support — powered by modern
                technology and deep expertise.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-[var(--color-secondary)]/5 border border-[var(--color-secondary)]/10">
              <Eye className="h-8 w-8 text-[var(--color-secondary)] mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-3">
                Our Vision
              </h2>
              <p className="text-foreground/70 leading-relaxed">
                To become India&apos;s #1 visa consulting and travel partner
                with a Pan India presence, setting the benchmark for
                transparency, technology, and client satisfaction in the
                travel industry.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="bg-[var(--color-muted)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-3">
                Our Core Values
              </h2>
              <p className="text-muted-foreground text-lg">
                The principles that guide everything we do
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="p-6 bg-white rounded-xl border border-border"
                >
                  <value.icon className="h-8 w-8 text-[var(--color-primary)] mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Our Journey
            </h2>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="space-y-6">
              {milestones.map((milestone) => (
                <div key={milestone.year} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {milestone.year.slice(2)}
                    </div>
                    <div className="w-0.5 h-full bg-border mt-2" />
                  </div>
                  <div className="pb-6">
                    <div className="text-sm font-bold text-[var(--color-primary)]">
                      {milestone.year}
                    </div>
                    <div className="text-sm text-foreground/70 mt-0.5">
                      {milestone.event}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Locations overview */}
        <div className="bg-[var(--color-muted)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Growing Across India
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Currently serving from Bangalore and Hyderabad, with Delhi and
              Chennai opening soon. Our goal: a presence in every major Indian
              city.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {[
                { city: "Bangalore", active: true },
                { city: "Hyderabad", active: true },
                { city: "Delhi", active: false },
                { city: "Chennai", active: false },
              ].map((loc) => (
                <div
                  key={loc.city}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                    loc.active
                      ? "bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                      : "bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]"
                  }`}
                >
                  <MapPin className="h-3.5 w-3.5" />
                  {loc.city}
                  {!loc.active && " (Coming Soon)"}
                </div>
              ))}
            </div>
            <Link
              href="/locations/expansion"
              className="inline-flex items-center gap-2 mt-6 text-[var(--color-primary)] font-semibold hover:gap-3 transition-all"
            >
              View Expansion Roadmap
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <CTABanner />
    </>
  );
}
