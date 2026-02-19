"use client";

import { CheckCircle2, Circle, AlertCircle, Clock } from "lucide-react";
import type { StatusHistoryEntry, ServiceRequestStatus } from "@/types";

const STATUS_ORDER: ServiceRequestStatus[] = [
  "received",
  "documents-verified",
  "submitted-to-embassy",
  "under-processing",
  "approved",
  "delivered",
];

const STATUS_LABELS: Record<string, string> = {
  received: "Received",
  "documents-verified": "Documents Verified",
  "submitted-to-embassy": "Submitted to Embassy",
  "under-processing": "Under Processing",
  approved: "Approved",
  rejected: "Rejected",
  delivered: "Delivered",
  "on-hold": "On Hold",
};

interface StatusProgressProps {
  currentStatus: ServiceRequestStatus;
  statusHistory: StatusHistoryEntry[];
}

export function StatusProgress({ currentStatus, statusHistory }: StatusProgressProps) {
  const isTerminal = currentStatus === "rejected";
  const isOnHold = currentStatus === "on-hold";
  const currentIndex = STATUS_ORDER.indexOf(currentStatus);

  // Find history entry for each status
  function getHistoryEntry(status: string) {
    return statusHistory
      .slice()
      .reverse()
      .find((h) => h.status === status);
  }

  return (
    <div className="space-y-4">
      {/* Alert for rejected/on-hold */}
      {isTerminal && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
          <div>
            <p className="text-sm font-semibold text-red-700">Application Rejected</p>
            {getHistoryEntry("rejected")?.note && (
              <p className="mt-1 text-sm text-red-600">
                {getHistoryEntry("rejected")?.note}
              </p>
            )}
          </div>
        </div>
      )}

      {isOnHold && (
        <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
          <Clock className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
          <div>
            <p className="text-sm font-semibold text-amber-700">Application On Hold</p>
            {getHistoryEntry("on-hold")?.note && (
              <p className="mt-1 text-sm text-amber-600">
                {getHistoryEntry("on-hold")?.note}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="space-y-0">
        {STATUS_ORDER.map((status, index) => {
          const isCompleted = !isTerminal && currentIndex >= index;
          const isCurrent = currentStatus === status;
          const entry = getHistoryEntry(status);

          return (
            <div key={status} className="flex gap-3">
              {/* Line + Icon */}
              <div className="flex flex-col items-center">
                {isCompleted ? (
                  <CheckCircle2
                    className={`h-6 w-6 shrink-0 ${
                      isCurrent ? "text-[#1B4D7A]" : "text-green-500"
                    }`}
                  />
                ) : (
                  <Circle className="h-6 w-6 shrink-0 text-gray-300" />
                )}
                {index < STATUS_ORDER.length - 1 && (
                  <div
                    className={`h-8 w-0.5 ${
                      isCompleted && currentIndex > index
                        ? "bg-green-300"
                        : "bg-gray-200"
                    }`}
                  />
                )}
              </div>

              {/* Label + Date */}
              <div className={`pb-6 ${index === STATUS_ORDER.length - 1 ? "pb-0" : ""}`}>
                <p
                  className={`text-sm font-medium ${
                    isCompleted ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {STATUS_LABELS[status]}
                </p>
                {entry && (
                  <p className="text-xs text-gray-500">
                    {new Date(entry.timestamp).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
