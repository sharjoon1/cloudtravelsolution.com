import Link from "next/link";
import { MapPin, ArrowRight, Phone, Mail } from "lucide-react";

import { cn } from "@/lib/utils";
import { LOCATIONS } from "@/lib/constants";

type LocationsMapProps = {
  headings?: {
    locationsHeading?: string;
    locationsSubheading?: string;
  };
};

export function LocationsMap({ headings }: LocationsMapProps) {
  const heading = headings?.locationsHeading || "Our Presence Across India";
  const subheading =
    headings?.locationsSubheading ||
    "Visit us at our offices or reach out for a free consultation. We are expanding rapidly to serve you better.";

  return (
    <section className="py-16 lg:py-20 bg-[var(--color-muted)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0c6cbc] mb-3">
            {heading}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {LOCATIONS.map((location) => (
            <Link
              key={location.slug}
              href={`/locations/${location.slug}`}
              className={cn(
                "group relative p-6 rounded-xl border transition-all duration-200",
                location.status === "active"
                  ? "bg-white border-[#dadce0] shadow-sm hover:border-[#0c6cbc]/30 hover:shadow-xl hover:-translate-y-0.5"
                  : "bg-white/60 border-dashed border-[#dadce0]/60"
              )}
            >
              {location.status === "coming-soon" && (
                <span className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] rounded-full">
                  Coming Soon
                </span>
              )}

              <div
                className={cn(
                  "h-10 w-10 rounded-lg flex items-center justify-center mb-4",
                  location.status === "active"
                    ? "bg-[#009e7a]/15 group-hover:bg-[#0cfcbc] transition-colors"
                    : "bg-gray-100"
                )}
              >
                <MapPin
                  className={cn(
                    "h-5 w-5",
                    location.status === "active"
                      ? "text-[#009e7a] group-hover:text-[#094f8a] transition-colors"
                      : "text-gray-400"
                  )}
                />
              </div>

              <h3 className="text-lg font-semibold text-[#0c6cbc] mb-1">
                {location.city}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {location.state}
              </p>

              {location.status === "active" && (
                <div className="space-y-1.5 text-xs text-muted-foreground">
                  {location.phone && (
                    <div className="flex items-center gap-1.5">
                      <Phone className="h-3 w-3" />
                      {location.phone}
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <Mail className="h-3 w-3" />
                    {location.email}
                  </div>
                </div>
              )}

              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-[#009e7a] group-hover:gap-2 transition-all">
                {location.status === "active" ? "Visit Office" : "Learn More"}
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/locations/expansion"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white font-semibold rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors"
          >
            View Our Pan India Expansion Plan
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
