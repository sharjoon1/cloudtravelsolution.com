"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import type { ServiceRequest, ServiceRequestStatus } from "@/types";

interface ServiceRequestTableProps {
  requests: ServiceRequest[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onSearch: (query: string) => void;
  onStatusFilter: (status: string) => void;
  statusFilter: string;
}

const STATUS_CONFIG: Record<
  ServiceRequestStatus,
  { label: string; bg: string; text: string }
> = {
  received: { label: "Received", bg: "bg-gray-100", text: "text-gray-700" },
  "documents-verified": { label: "Docs Verified", bg: "bg-blue-100", text: "text-blue-700" },
  "submitted-to-embassy": { label: "At Embassy", bg: "bg-indigo-100", text: "text-indigo-700" },
  "under-processing": { label: "Processing", bg: "bg-purple-100", text: "text-purple-700" },
  approved: { label: "Approved", bg: "bg-green-100", text: "text-green-700" },
  rejected: { label: "Rejected", bg: "bg-red-100", text: "text-red-700" },
  delivered: { label: "Delivered", bg: "bg-emerald-100", text: "text-emerald-700" },
  "on-hold": { label: "On Hold", bg: "bg-amber-100", text: "text-amber-700" },
};

function StatusBadge({ status }: { status: ServiceRequestStatus }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.received;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  );
}

export { STATUS_CONFIG, StatusBadge };

export function ServiceRequestTable({
  requests,
  totalPages,
  currentPage,
  onPageChange,
  onSearch,
  onStatusFilter,
  statusFilter,
}: ServiceRequestTableProps) {
  const [searchInput, setSearchInput] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    onSearch(searchInput);
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 border-b border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between">
        <form onSubmit={handleSearch} className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search name, passport, or code..."
            className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm focus:border-[#1B4D7A] focus:outline-none focus:ring-1 focus:ring-[#1B4D7A]"
          />
        </form>

        <select
          value={statusFilter}
          onChange={(e) => onStatusFilter(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#1B4D7A] focus:outline-none"
        >
          <option value="all">All Statuses</option>
          {Object.entries(STATUS_CONFIG).map(([value, config]) => (
            <option key={value} value={value}>
              {config.label}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="px-4 py-3 text-left font-medium text-gray-600">Tracking Code</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Applicant</th>
              <th className="hidden px-4 py-3 text-left font-medium text-gray-600 md:table-cell">
                Service
              </th>
              <th className="hidden px-4 py-3 text-left font-medium text-gray-600 sm:table-cell">
                Destination
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
              <th className="hidden px-4 py-3 text-left font-medium text-gray-600 lg:table-cell">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {requests.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-gray-400">
                  No service requests found
                </td>
              </tr>
            ) : (
              requests.map((req) => (
                <tr key={req.id} className="transition-colors hover:bg-gray-50/50">
                  <td className="px-4 py-3">
                    <Link
                      href={`/partner/track/${req.id}`}
                      className="font-mono text-sm font-semibold text-[#1B4D7A] hover:underline"
                    >
                      {req.trackingCode}
                    </Link>
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">{req.applicantName}</td>
                  <td className="hidden px-4 py-3 text-gray-600 md:table-cell">
                    {req.serviceType?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                  </td>
                  <td className="hidden px-4 py-3 text-gray-600 sm:table-cell">
                    {req.destinationCountry}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={req.status} />
                  </td>
                  <td className="hidden px-4 py-3 text-gray-500 lg:table-cell">
                    {new Date(req.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
          <p className="text-xs text-gray-500">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-1">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
