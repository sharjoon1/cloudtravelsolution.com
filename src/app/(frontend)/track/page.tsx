"use client";

import { useState } from "react";
import { TrackingSearch } from "@/components/tracking/tracking-search";
import { TrackingResults } from "@/components/tracking/tracking-result";
import { Search, AlertCircle } from "lucide-react";
import type { TrackingResult } from "@/types";

export default function PublicTrackingPage() {
  const [results, setResults] = useState<TrackingResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  async function handleSearch(query: string, type: "passport" | "tracking-code") {
    setLoading(true);
    setError("");
    setSearched(true);

    try {
      const param = type === "tracking-code" ? "code" : "passport";
      const res = await fetch(`/api/track?${param}=${encodeURIComponent(query)}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "No results found");
        setResults([]);
        return;
      }

      setResults(data.results || []);
    } catch {
      setError("Something went wrong. Please try again.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      {/* Page Header */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#1B4D7A]">
          <Search className="h-7 w-7 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Track Your Application</h1>
        <p className="mt-2 text-gray-600">
          Enter your tracking code or passport number to check the status of your application
        </p>
      </div>

      {/* Search */}
      <TrackingSearch onSearch={handleSearch} loading={loading} />

      {/* Error */}
      {error && (
        <div className="mt-6 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="mt-6">
          <TrackingResults results={results} />
        </div>
      )}

      {/* No results */}
      {searched && !loading && !error && results.length === 0 && (
        <div className="mt-8 text-center text-sm text-gray-400">
          No applications found. Please check your tracking code or passport number.
        </div>
      )}
    </div>
  );
}
