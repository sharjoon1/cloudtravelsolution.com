"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Filter, ArrowRight, X, MapPin, Globe } from "lucide-react";
import type { Country } from "@/types";

interface CountrySearchProps {
  countries: Country[];
}

const regions = [
  { label: "All Regions", value: "all" },
  { label: "Asia", value: "asia" },
  { label: "Europe", value: "europe" },
  { label: "Americas", value: "americas" },
  { label: "Middle East", value: "middle-east" },
  { label: "Oceania", value: "oceania" },
  { label: "Africa", value: "africa" },
];

const visaTypeFilters = [
  { label: "All Types", value: "all" },
  { label: "Tourist", value: "tourist" },
  { label: "Business", value: "business" },
  { label: "Student", value: "student" },
  { label: "Work", value: "work" },
  { label: "Transit", value: "transit" },
  { label: "Medical", value: "medical" },
];

function matchesVisaType(country: Country, filter: string): boolean {
  if (filter === "all") return true;
  return country.visaTypes.some((v) =>
    v.type.toLowerCase().includes(filter.toLowerCase())
  );
}

export function CountrySearch({ countries }: CountrySearchProps) {
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const [visaTypeFilter, setVisaTypeFilter] = useState("all");

  const filtered = useMemo(() => {
    return countries.filter((c) => {
      const matchesSearch =
        search === "" ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.code.toLowerCase().includes(search.toLowerCase());
      const matchesRegion =
        regionFilter === "all" || c.region === regionFilter;
      const matchesType = matchesVisaType(c, visaTypeFilter);
      return matchesSearch && matchesRegion && matchesType;
    });
  }, [countries, search, regionFilter, visaTypeFilter]);

  const hasFilters =
    search !== "" || regionFilter !== "all" || visaTypeFilter !== "all";

  const clearFilters = () => {
    setSearch("");
    setRegionFilter("all");
    setVisaTypeFilter("all");
  };

  const groupedByRegion = filtered.reduce(
    (acc, country) => {
      const region = country.region;
      if (!acc[region]) acc[region] = [];
      acc[region].push(country);
      return acc;
    },
    {} as Record<string, Country[]>
  );

  const regionLabels: Record<string, string> = {
    asia: "Asia",
    europe: "Europe",
    americas: "Americas",
    oceania: "Oceania & Pacific",
    "middle-east": "Middle East",
    africa: "Africa",
  };

  const regionOrder = [
    "asia",
    "europe",
    "americas",
    "middle-east",
    "oceania",
    "africa",
  ];

  return (
    <div>
      {/* Search & Filters */}
      <div className="mb-8 space-y-4">
        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by country name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-10 py-3 rounded-xl border border-border bg-white text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-[var(--color-muted)] transition-colors"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Filter className="h-4 w-4" />
            Region:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {regions.map((r) => (
              <button
                key={r.value}
                onClick={() => setRegionFilter(r.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  regionFilter === r.value
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-[var(--color-muted)] text-foreground/70 hover:bg-[var(--color-primary)]/10"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Filter className="h-4 w-4" />
            Visa Type:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {visaTypeFilters.map((v) => (
              <button
                key={v.value}
                onClick={() => setVisaTypeFilter(v.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  visaTypeFilter === v.value
                    ? "bg-[var(--color-secondary)] text-white"
                    : "bg-[var(--color-muted)] text-foreground/70 hover:bg-[var(--color-secondary)]/10"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results count + clear */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filtered.length}</span> of{" "}
            {countries.length} countries
          </p>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-[var(--color-primary)] hover:underline font-medium"
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <Globe className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No countries found
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Try adjusting your search or filters
          </p>
          <button
            onClick={clearFilters}
            className="px-5 py-2 bg-[var(--color-primary)] text-white text-sm font-medium rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-10">
          {regionOrder.map((region) => {
            const countries = groupedByRegion[region];
            if (!countries || countries.length === 0) return null;

            return (
              <div key={region}>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[var(--color-primary)]" />
                  {regionLabels[region]} ({countries.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {countries.map((country) => (
                    <Link
                      key={country.slug}
                      href={`/visa/${country.slug}`}
                      className="group flex items-center justify-between p-4 rounded-lg border border-border hover:border-[var(--color-primary)]/30 hover:shadow-sm transition-all bg-white"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{country.flag}</span>
                        <div>
                          <div className="text-sm font-semibold text-foreground group-hover:text-[var(--color-primary)] transition-colors">
                            {country.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {country.visaTypes.length} visa type
                            {country.visaTypes.length > 1 ? "s" : ""} |{" "}
                            {country.visaTypes[0]?.processingTime}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-[var(--color-primary)] transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

