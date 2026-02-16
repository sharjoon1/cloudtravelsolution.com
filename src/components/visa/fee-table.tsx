import { formatCurrency } from "@/lib/utils";
import type { VisaTypeDetail } from "@/types";

interface FeeTableProps {
  visaType: VisaTypeDetail;
}

export function FeeTable({ visaType }: FeeTableProps) {
  const total = visaType.fee.embassyFee + visaType.fee.serviceFee;

  return (
    <div>
      <h3 className="text-lg font-semibold text-foreground mb-3">
        Fee Structure
      </h3>
      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[var(--color-muted)]">
              <th className="text-left px-4 py-2.5 font-medium text-foreground/70">
                Fee Component
              </th>
              <th className="text-right px-4 py-2.5 font-medium text-foreground/70">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border">
              <td className="px-4 py-2.5 text-foreground/80">
                Embassy / Consular Fee
              </td>
              <td className="px-4 py-2.5 text-right font-medium">
                {formatCurrency(visaType.fee.embassyFee, visaType.fee.currency)}
              </td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2.5 text-foreground/80">
                CTS Service Fee
              </td>
              <td className="px-4 py-2.5 text-right font-medium">
                {formatCurrency(visaType.fee.serviceFee, visaType.fee.currency)}
              </td>
            </tr>
            <tr className="border-t border-border bg-[var(--color-primary)]/5">
              <td className="px-4 py-2.5 font-semibold text-foreground">
                Total Estimated Cost
              </td>
              <td className="px-4 py-2.5 text-right font-bold text-[var(--color-primary)]">
                {formatCurrency(total, visaType.fee.currency)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        * Fees are approximate and subject to change based on embassy updates.
        Additional charges may apply for priority processing, VFS service
        charges, and courier fees.
      </p>
    </div>
  );
}
