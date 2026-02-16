import type { Metadata } from "next";
import { VisaInquiryForm } from "@/components/forms/visa-inquiry-form";

export const metadata: Metadata = {
  title: "Book Free Visa Consultation",
  description:
    "Get expert visa guidance from CloudTravelSolution. Fill out our quick form and our visa specialists will contact you within 2 business hours.",
};

export default function VisaInquiryPage() {
  return (
    <div className="bg-[var(--color-muted)] min-h-screen">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Book Your Free Visa Consultation
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Tell us about your travel plans and our visa experts will guide you
            through the entire process. We respond within 2 business hours.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-border p-6 sm:p-8">
          <VisaInquiryForm />
        </div>
      </div>
    </div>
  );
}
