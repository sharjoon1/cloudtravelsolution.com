import Link from "next/link";
import { ArrowRight } from "lucide-react";

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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {POPULAR_COUNTRIES.map((country) => (
            <Link
              key={country.slug}
              href={`/visa/${country.slug}`}
              className="group flex flex-col items-center gap-3 p-5 rounded-xl border border-border bg-white hover:border-[var(--color-primary)]/30 hover:shadow-md transition-all duration-200"
            >
              <span className="text-4xl group-hover:scale-110 transition-transform duration-200">
                {country.flag}
              </span>
              <span className="text-sm font-medium text-foreground/80 text-center group-hover:text-[var(--color-primary)] transition-colors">
                {country.name}
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/visa"
            className="inline-flex items-center gap-2 text-[var(--color-primary)] font-semibold hover:gap-3 transition-all"
          >
            View All 190+ Countries
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
