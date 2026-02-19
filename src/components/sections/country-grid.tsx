import Link from "next/link";
import { Clock, ArrowRight, IndianRupee } from "lucide-react";

import { POPULAR_COUNTRIES } from "@/lib/constants";

const FLAG_CODES: Record<string, string> = {
  US: "us",
  GB: "gb",
  CA: "ca",
  AU: "au",
  EU: "eu",
  SG: "sg",
  AE: "ae",
  MY: "my",
  TH: "th",
  JP: "jp",
  KR: "kr",
  NZ: "nz",
};

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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {POPULAR_COUNTRIES.map((country) => {
            const flagCode = FLAG_CODES[country.code] || country.code.toLowerCase();
            return (
              <Link
                key={country.slug}
                href={`/visa/${country.slug}`}
                className="group relative flex flex-col rounded-2xl bg-white border border-border/60 hover:border-[var(--color-primary)]/40 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Flag banner */}
                <div className="relative h-28 overflow-hidden bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-primary)]/10">
                  <img
                    src={`https://flagcdn.com/w320/${flagCode}.png`}
                    alt={`${country.name} flag`}
                    className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <h3 className="text-base font-bold text-white drop-shadow-md">
                      {country.name}
                    </h3>
                    <p className="text-xs text-white/85 font-medium">Tourist Visa</p>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-0.5">
                    <span className="text-xs font-bold text-[var(--color-primary)]">{country.code}</span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-[var(--color-primary)]" />
                      <span className="text-xs font-medium text-foreground/70">
                        {country.processingTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <IndianRupee className="h-3.5 w-3.5 text-[var(--color-accent)]" />
                      <span className="text-xs font-semibold text-[var(--color-accent)]">
                        {country.visaFee.replace("₹", "")}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border/40">
                    <span className="text-xs font-semibold text-[var(--color-primary)] group-hover:underline">
                      View Details
                    </span>
                    <ArrowRight className="h-4 w-4 text-[var(--color-primary)] translate-x-0 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
