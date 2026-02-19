"use client";

import { SubmitForm } from "@/components/partner/submit-form";

export default function PartnerSubmitPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Submit New Request</h1>
        <p className="text-sm text-gray-500">
          Submit a new visa or document service request for your client
        </p>
      </div>
      <SubmitForm />
    </div>
  );
}
