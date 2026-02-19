"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { PlusCircle, RefreshCw } from "lucide-react";
import { DashboardStats } from "@/components/partner/dashboard-stats";
import { ServiceRequestTable } from "@/components/partner/service-request-table";
import type { ServiceRequest } from "@/types";

export default function PartnerDashboardPage() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [allRequests, setAllRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({
      page: String(page),
      limit: "20",
    });
    if (statusFilter !== "all") params.set("status", statusFilter);
    if (searchQuery) params.set("search", searchQuery);

    try {
      const res = await fetch(`/api/partner/service-requests?${params}`);
      if (res.ok) {
        const data = await res.json();
        setRequests(data.docs || []);
        setTotalPages(data.totalPages || 1);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, searchQuery]);

  // Fetch all requests once for stats (unfiltered)
  useEffect(() => {
    async function fetchAll() {
      try {
        const res = await fetch("/api/partner/service-requests?limit=100");
        if (res.ok) {
          const data = await res.json();
          setAllRequests(data.docs || []);
        }
      } catch {
        // ignore
      }
    }
    fetchAll();
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">
            Manage your service requests and track application progress
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchRequests}
            className="flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <Link
            href="/partner/submit"
            className="flex items-center gap-1.5 rounded-lg bg-[#E8963E] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#d4852f]"
          >
            <PlusCircle className="h-4 w-4" />
            New Request
          </Link>
        </div>
      </div>

      {/* Stats */}
      <DashboardStats requests={allRequests} />

      {/* Table */}
      <ServiceRequestTable
        requests={requests}
        totalPages={totalPages}
        currentPage={page}
        onPageChange={setPage}
        onSearch={(q) => {
          setSearchQuery(q);
          setPage(1);
        }}
        onStatusFilter={(s) => {
          setStatusFilter(s);
          setPage(1);
        }}
        statusFilter={statusFilter}
      />
    </div>
  );
}
