"use client";

import { useState } from "react";
import { Search } from "lucide-react";

interface TrackingSearchProps {
  onSearch: (query: string, type: "passport" | "tracking-code") => void;
  loading: boolean;
}

export function TrackingSearch({ onSearch, loading }: TrackingSearchProps) {
  const [searchType, setSearchType] = useState<"tracking-code" | "passport">("tracking-code");
  const [query, setQuery] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim().length >= 3) {
      onSearch(query.trim(), searchType);
    }
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Tabs */}
      <div className="mb-4 flex rounded-lg bg-gray-100 p-1">
        <button
          type="button"
          onClick={() => setSearchType("tracking-code")}
          className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
            searchType === "tracking-code"
              ? "bg-white text-[#1B4D7A] shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          By Tracking Code
        </button>
        <button
          type="button"
          onClick={() => setSearchType("passport")}
          className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
            searchType === "passport"
              ? "bg-white text-[#1B4D7A] shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          By Passport Number
        </button>
      </div>

      {/* Search Input */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              searchType === "tracking-code"
                ? "Enter tracking code (e.g. TRK-202602-0001)"
                : "Enter passport number"
            }
            className="w-full rounded-lg border border-gray-300 py-2.5 pl-9 pr-3 text-sm focus:border-[#1B4D7A] focus:outline-none focus:ring-1 focus:ring-[#1B4D7A]"
          />
        </div>
        <button
          type="submit"
          disabled={loading || query.trim().length < 3}
          className="rounded-lg bg-[#1B4D7A] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#163f64] disabled:opacity-50"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
    </div>
  );
}
