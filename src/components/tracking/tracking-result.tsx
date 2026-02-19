"use client";

import { StatusProgress } from "./status-progress";
import type { TrackingResult } from "@/types";

interface TrackingResultProps {
  results: TrackingResult[];
}

function ServiceLabel(serviceType: string): string {
  return serviceType.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function TrackingResults({ results }: TrackingResultProps) {
  if (results.length === 0) return null;

  return (
    <div className="space-y-6">
      {results.map((result) => (
        <div
          key={result.trackingCode}
          className="rounded-xl border border-gray-200 bg-white shadow-sm"
        >
          {/* Header */}
          <div className="border-b border-gray-100 px-6 py-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-mono text-xl font-bold text-[#1B4D7A]">
                  {result.trackingCode}
                </p>
                <p className="text-sm text-gray-500">{result.applicantName}</p>
              </div>
              <div className="text-right text-sm">
                <p className="text-gray-500">
                  {ServiceLabel(result.serviceType)} &mdash; {result.destinationCountry}
                </p>
                <p className="text-xs text-gray-400">
                  Submitted{" "}
                  {new Date(result.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="p-6">
            <StatusProgress
              currentStatus={result.status}
              statusHistory={result.statusHistory}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
