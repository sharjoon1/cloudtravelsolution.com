"use client";

import { useState } from "react";
import { Clock, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { RequirementsChecklist } from "./requirements-checklist";
import { FeeTable } from "./fee-table";
import type { VisaTypeDetail } from "@/types";

interface VisaTypeTabsProps {
  visaTypes: VisaTypeDetail[];
  countryName: string;
}

export function VisaTypeTabs({ visaTypes, countryName }: VisaTypeTabsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const activeVisa = visaTypes[activeTab];

  return (
    <div>
      {/* Tab navigation */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-border pb-4">
        {visaTypes.map((visa, i) => (
          <button
            key={visa.type}
            type="button"
            onClick={() => setActiveTab(i)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
              i === activeTab
                ? "bg-[var(--color-primary)] text-white"
                : "bg-[var(--color-muted)] text-foreground/70 hover:bg-[var(--color-muted)]/80 hover:text-foreground"
            )}
          >
            {visa.type}
          </button>
        ))}
      </div>

      {/* Active visa details */}
      <div className="space-y-8">
        {/* Quick stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-[var(--color-muted)]">
            <Clock className="h-5 w-5 text-[var(--color-primary)]" />
            <div>
              <div className="text-xs text-muted-foreground">Processing Time</div>
              <div className="text-sm font-semibold">{activeVisa.processingTime}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-[var(--color-muted)]">
            <FileText className="h-5 w-5 text-[var(--color-primary)]" />
            <div>
              <div className="text-xs text-muted-foreground">Visa Validity</div>
              <div className="text-sm font-semibold">{activeVisa.validity}</div>
            </div>
          </div>
          <Link
            href="/inquiry/visa"
            className="flex items-center justify-center gap-2 p-4 rounded-lg bg-[var(--color-secondary)] text-white font-semibold text-sm hover:bg-[var(--color-secondary-dark)] transition-colors"
          >
            Apply Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Requirements */}
        <RequirementsChecklist
          items={activeVisa.requirements}
          title="Eligibility & Requirements"
        />

        {/* Documents needed */}
        <RequirementsChecklist
          items={activeVisa.documentsNeeded}
          title="Documents Needed"
        />

        {/* Application steps */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">
            Application Process
          </h3>
          <ol className="space-y-3">
            {activeVisa.applicationSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-sm text-foreground/80 leading-relaxed">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Fee table */}
        <FeeTable visaType={activeVisa} />

        {/* Notes */}
        {activeVisa.notes && (
          <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> {activeVisa.notes}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
