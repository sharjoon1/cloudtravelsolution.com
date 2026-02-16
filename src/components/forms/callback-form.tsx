"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Phone, Loader2, CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { callbackSchema, type CallbackFormData } from "@/lib/validations";

export function CallbackForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CallbackFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(callbackSchema) as any,
  });

  async function onSubmit(data: CallbackFormData) {
    try {
      const res = await fetch("/api/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit");
      setIsSubmitted(true);
    } catch {
      alert("Something went wrong. Please try again or call us directly.");
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-6">
        <CheckCircle2 className="h-10 w-10 text-[var(--color-accent)] mx-auto mb-3" />
        <h3 className="font-semibold text-foreground mb-1">
          Callback Requested!
        </h3>
        <p className="text-sm text-muted-foreground">
          Our team will call you within 30 minutes during business hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="cb-name"
          className="block text-sm font-medium text-foreground mb-1"
        >
          Your Name
        </label>
        <input
          id="cb-name"
          type="text"
          placeholder="Enter your full name"
          {...register("name")}
          className={cn(
            "w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors",
            errors.name
              ? "border-red-500 focus:ring-red-500/20"
              : "border-border focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
          )}
        />
        {errors.name && (
          <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="cb-phone"
          className="block text-sm font-medium text-foreground mb-1"
        >
          Phone Number
        </label>
        <input
          id="cb-phone"
          type="tel"
          placeholder="+91 98765 43210"
          {...register("phone")}
          className={cn(
            "w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors",
            errors.phone
              ? "border-red-500 focus:ring-red-500/20"
              : "border-border focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
          )}
        />
        {errors.phone && (
          <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="cb-time"
          className="block text-sm font-medium text-foreground mb-1"
        >
          Preferred Time{" "}
          <span className="text-muted-foreground font-normal">(optional)</span>
        </label>
        <select
          id="cb-time"
          {...register("preferredTime")}
          className="w-full px-4 py-2.5 rounded-lg border border-border text-sm outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-colors"
        >
          <option value="">Anytime during business hours</option>
          <option value="morning">Morning (9 AM - 12 PM)</option>
          <option value="afternoon">Afternoon (12 PM - 3 PM)</option>
          <option value="evening">Evening (3 PM - 6 PM)</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="cb-service"
          className="block text-sm font-medium text-foreground mb-1"
        >
          Service Needed{" "}
          <span className="text-muted-foreground font-normal">(optional)</span>
        </label>
        <select
          id="cb-service"
          {...register("service")}
          className="w-full px-4 py-2.5 rounded-lg border border-border text-sm outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-colors"
        >
          <option value="">Select a service</option>
          <option value="visa-consulting">Visa Consulting</option>
          <option value="travel-insurance">Travel Insurance</option>
          <option value="passport-services">Passport Services</option>
          <option value="document-attestation">Document Attestation</option>
          <option value="corporate-travel">Corporate Travel</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)] text-white font-semibold rounded-lg transition-colors text-sm disabled:opacity-50"
      >
        {isSubmitting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Phone className="h-4 w-4" />
        )}
        {isSubmitting ? "Submitting..." : "Request Callback"}
      </button>
    </form>
  );
}
