"use client";

import { useState } from "react";
import { Send, CheckCircle, Loader2 } from "lucide-react";

interface QuickInquiryFormProps {
  countryName: string;
  countrySlug: string;
}

export function QuickInquiryForm({
  countryName,
  countrySlug,
}: QuickInquiryFormProps) {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">(
    "idle"
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    visaType: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          country: countrySlug,
          source: "quick-inquiry-sidebar",
        }),
      });

      if (res.ok) {
        setFormState("success");
      } else {
        setFormState("idle");
      }
    } catch {
      setFormState("idle");
    }
  };

  if (formState === "success") {
    return (
      <div className="p-6 rounded-xl border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 text-center">
        <CheckCircle className="h-10 w-10 text-[var(--color-accent)] mx-auto mb-3" />
        <h3 className="font-semibold text-foreground mb-1">
          Inquiry Submitted!
        </h3>
        <p className="text-sm text-muted-foreground">
          Our visa team will contact you within 24 hours regarding your{" "}
          {countryName} visa.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-xl border border-border bg-white shadow-sm">
      <h3 className="font-semibold text-foreground mb-1">
        Quick {countryName} Visa Inquiry
      </h3>
      <p className="text-xs text-muted-foreground mb-4">
        Fill in your details and our experts will get back to you
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Full Name *"
          required
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          className="w-full px-3 py-2.5 text-sm border border-border rounded-lg bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
        />
        <input
          type="email"
          placeholder="Email Address *"
          required
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          className="w-full px-3 py-2.5 text-sm border border-border rounded-lg bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
        />
        <input
          type="tel"
          placeholder="Phone Number *"
          required
          value={formData.phone}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, phone: e.target.value }))
          }
          className="w-full px-3 py-2.5 text-sm border border-border rounded-lg bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
        />
        <select
          value={formData.visaType}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, visaType: e.target.value }))
          }
          className="w-full px-3 py-2.5 text-sm border border-border rounded-lg bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
        >
          <option value="">Select Visa Type</option>
          <option value="tourist">Tourist Visa</option>
          <option value="business">Business Visa</option>
          <option value="student">Student Visa</option>
          <option value="work">Work Visa</option>
          <option value="transit">Transit Visa</option>
          <option value="medical">Medical Visa</option>
        </select>
        <button
          type="submit"
          disabled={formState === "submitting"}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)] disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          {formState === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Get Free Consultation
            </>
          )}
        </button>
        <p className="text-[10px] text-muted-foreground text-center">
          We&apos;ll respond within 24 hours. No spam, ever.
        </p>
      </form>
    </div>
  );
}
