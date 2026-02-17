import Link from "next/link";
import {
  FileCheck,
  Shield,
  BookOpen,
  Stamp,
  Building2,
  ArrowRight,
} from "lucide-react";

import { SERVICES } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileCheck,
  Shield,
  BookOpen,
  Stamp,
  Building2,
};

type ServicesGridProps = {
  headings?: {
    servicesHeading?: string;
    servicesSubheading?: string;
  };
};

export function ServicesGrid({ headings }: ServicesGridProps) {
  const heading = headings?.servicesHeading || "Our Services";
  const subheading =
    headings?.servicesSubheading ||
    "Comprehensive travel and visa services to make your international travel hassle-free.";

  return (
    <section className="py-16 lg:py-20 bg-[var(--color-muted)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            {heading}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => {
            const Icon = iconMap[service.icon] || FileCheck;
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group p-6 bg-white rounded-xl border border-border hover:border-[var(--color-primary)]/30 hover:shadow-lg transition-all duration-200"
              >
                <div className="h-12 w-12 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--color-primary)] transition-colors">
                  <Icon className="h-6 w-6 text-[var(--color-primary)] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-primary)] group-hover:gap-2.5 transition-all">
                  Learn More
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
