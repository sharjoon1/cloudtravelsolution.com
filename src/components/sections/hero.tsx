import {
  Shield,
  Award,
  MapPin,
  Clock,
  Star,
  CheckCircle,
  Users,
  Globe,
} from "lucide-react";

import { HeroLeadForm } from "@/components/forms/hero-lead-form";
import { HeroSlider } from "@/components/sections/hero-slider";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield,
  Award,
  MapPin,
  Clock,
  Star,
  CheckCircle,
  Users,
  Globe,
};

const defaultTrustBadges = [
  { icon: "Shield", label: "IATA Accredited" },
  { icon: "Award", label: "ISO 9001 Certified" },
  { icon: "MapPin", label: "4+ Locations" },
  { icon: "Clock", label: "20+ Years Experience" },
];

type HeroProps = {
  heroData?: {
    badgeText?: string;
    headline?: string;
    highlightText?: string;
    headlineAfter?: string;
    subheadline?: string;
  };
  trustBadges?: Array<{ icon?: string; label: string }>;
};

export function Hero({ heroData, trustBadges }: HeroProps) {
  const badge = heroData?.badgeText || "Now expanding to Delhi & Chennai";
  const headline = heroData?.headline || "Your Trusted";
  const highlight = heroData?.highlightText || "Visa & Travel";
  const headlineAfter = heroData?.headlineAfter || "Partner Across India";
  const subheadline =
    heroData?.subheadline ||
    "Expert visa consulting for 190+ countries. From application to approval, we handle everything — so you can focus on your journey.";
  const badges = trustBadges && trustBadges.length > 0 ? trustBadges : defaultTrustBadges;

  return (
    <section className="relative overflow-hidden min-h-[600px] lg:min-h-[700px] text-white">
      {/* Background slider */}
      <HeroSlider />

      {/* Fallback gradient (shown while images load) */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary-dark)] to-[#0D2B45]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="lg:grid lg:grid-cols-[1fr_380px] lg:gap-12 lg:items-center">
          {/* Left column: text content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur text-sm font-medium mb-6">
              <span className="h-2 w-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
              {badge}
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-5">
              {headline}{" "}
              <span className="text-[var(--color-secondary)]">{highlight}</span>{" "}
              {headlineAfter}
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl">
              {subheadline}
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-6">
              {badges.map((b) => {
                const Icon = iconMap[b.icon || "Shield"] || Shield;
                return (
                  <div
                    key={b.label}
                    className="flex items-center gap-2 text-white/70"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{b.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right column: lead form */}
          <div className="mt-10 lg:mt-0">
            <HeroLeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}
