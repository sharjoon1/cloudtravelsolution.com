"use client";

import { FileText, Clock, Loader2, CheckCircle2 } from "lucide-react";
import type { ServiceRequest } from "@/types";

interface DashboardStatsProps {
  requests: ServiceRequest[];
}

export function DashboardStats({ requests }: DashboardStatsProps) {
  const total = requests.length;
  const pending = requests.filter((r) =>
    ["received", "documents-verified"].includes(r.status)
  ).length;
  const inProgress = requests.filter((r) =>
    ["submitted-to-embassy", "under-processing"].includes(r.status)
  ).length;
  const completed = requests.filter((r) =>
    ["approved", "delivered"].includes(r.status)
  ).length;

  const stats = [
    {
      label: "Total Requests",
      value: total,
      icon: FileText,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Pending",
      value: pending,
      icon: Clock,
      color: "bg-amber-50 text-amber-600",
    },
    {
      label: "In Progress",
      value: inProgress,
      icon: Loader2,
      color: "bg-purple-50 text-purple-600",
    },
    {
      label: "Completed",
      value: completed,
      icon: CheckCircle2,
      color: "bg-green-50 text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className={`rounded-lg p-2 ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
