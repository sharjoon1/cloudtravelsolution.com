"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, Shield, Award, MapPin, Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import { POPULAR_COUNTRIES } from "@/lib/constants";

const trustBadges = [
  { icon: Shield, label: "IATA Accredited" },
  { icon: Award, label: "ISO 9001 Certified" },
  { icon: MapPin, label: "4+ Locations" },
  { icon: Clock, label: "20+ Years Experience" },
];

export function Hero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredCountries = POPULAR_COUNTRIES.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (slug: string) => {
    setShowSuggestions(false);
    setSearchQuery("");
    router.push(`/visa/${slug}`);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary-dark)] to-[#0D2B45] text-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur text-sm font-medium mb-6">
            <span className="h-2 w-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
            Now expanding to Delhi & Chennai
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-5">
            Your Trusted{" "}
            <span className="text-[var(--color-secondary)]">Visa & Travel</span>{" "}
            Partner Across India
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl">
            Expert visa consulting for 190+ countries. From application to
            approval, we handle everything — so you can focus on your journey.
          </p>

          {/* Search bar */}
          <div className="relative max-w-xl mb-10">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Which country visa do you need?"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(e.target.value.length > 0);
                }}
                onFocus={() =>
                  searchQuery.length > 0 && setShowSuggestions(true)
                }
                onBlur={() =>
                  setTimeout(() => setShowSuggestions(false), 200)
                }
                className="w-full h-14 pl-12 pr-36 rounded-xl bg-white text-gray-900 text-base placeholder:text-gray-400 outline-none shadow-lg"
              />
              <button
                type="button"
                onClick={() => {
                  if (filteredCountries.length > 0) {
                    handleSearch(filteredCountries[0].slug);
                  }
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)] text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5"
              >
                Search
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Suggestions dropdown */}
            {showSuggestions && filteredCountries.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-10 max-h-64 overflow-y-auto">
                {filteredCountries.map((country) => (
                  <button
                    key={country.slug}
                    type="button"
                    onClick={() => handleSearch(country.slug)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-xl">{country.flag}</span>
                    <span className="text-sm font-medium">{country.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-6">
            {trustBadges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 text-white/70"
              >
                <badge.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
