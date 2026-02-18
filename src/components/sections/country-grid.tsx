import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";

import { POPULAR_COUNTRIES } from "@/lib/constants";

type CountryGridProps = {
  headings?: {
    countriesHeading?: string;
    countriesSubheading?: string;
  };
};

export function CountryGrid({ headings }: CountryGridProps) {
  const heading = headings?.countriesHeading || "Popular Visa Destinations";
  const subheading =
    headings?.countriesSubheading ||
    "Expert visa assistance for the most sought-after destinations. Choose your country to get started.";

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            {heading}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {POPULAR_COUNTRIES.map((country) => (
            <Link
              key={country.slug}
              href={`/visa/${country.slug}`}
              className="group relative flex flex-col p-5 rounded-xl border border-border bg-white hover:border-[var(--color-primary)]/30 hover:shadow-lg transition-all duration-200 overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{country.flag}</span>
                <div>
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-[var(--color-primary)] transition-colors">
                    {country.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">Tourist Visa</p>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-auto pt-3 border-t border-border/60">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-[var(--color-primary)]" />
                  <span className="text-xs font-medium text-foreground/70">
                    {country.processingTime}
                  </span>
                </div>
              </div>

              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="h-4 w-4 text-[var(--color-primary)]" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
