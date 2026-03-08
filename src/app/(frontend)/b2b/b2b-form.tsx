"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { b2bInquirySchema } from "@/lib/validations";
import type { z } from "zod";

type FormData = z.infer<typeof b2bInquirySchema>;

const inputClass =
  "w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#0c6cbc] focus:bg-white focus:ring-1 focus:ring-[#0c6cbc]/20";
const labelClass = "block text-sm font-medium text-gray-700 mb-1";
const errorClass = "text-xs text-red-500 mt-1";

export function B2BForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(b2bInquirySchema) as any,
  });

  const onSubmit = async (data: FormData) => {
    setError("");
    try {
      const res = await fetch("/api/b2b-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError(
        "Something went wrong. Please try again or call us at +91 8095976543."
      );
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <CheckCircle2 className="h-16 w-16 text-[#009e7a] mx-auto mb-4" />
        <h3 className="text-xl font-bold text-[#0c6cbc] mb-2">Thank You!</h3>
        <p className="text-muted-foreground">
          Our B2B team will contact you within 24 hours to discuss partnership
          details and special rates.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">
          {error}
        </div>
      )}

      {/* Company Name */}
      <div>
        <label className={labelClass}>Company Name *</label>
        <input
          {...register("companyName")}
          placeholder="Your company name"
          className={inputClass}
        />
        {errors.companyName && (
          <p className={errorClass}>{errors.companyName.message}</p>
        )}
      </div>

      {/* Contact Person + Email */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Contact Person *</label>
          <input
            {...register("contactPerson")}
            placeholder="Full name"
            className={inputClass}
          />
          {errors.contactPerson && (
            <p className={errorClass}>{errors.contactPerson.message}</p>
          )}
        </div>
        <div>
          <label className={labelClass}>Email *</label>
          <input
            {...register("email")}
            type="email"
            placeholder="business@example.com"
            className={inputClass}
          />
          {errors.email && (
            <p className={errorClass}>{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Phone + City */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Phone *</label>
          <input
            {...register("phone")}
            type="tel"
            placeholder="+91 80959 76543"
            className={inputClass}
          />
          {errors.phone && (
            <p className={errorClass}>{errors.phone.message}</p>
          )}
        </div>
        <div>
          <label className={labelClass}>City *</label>
          <input
            {...register("city")}
            placeholder="Your city"
            className={inputClass}
          />
          {errors.city && (
            <p className={errorClass}>{errors.city.message}</p>
          )}
        </div>
      </div>

      {/* Company Address */}
      <div>
        <label className={labelClass}>Company Address *</label>
        <input
          {...register("companyAddress")}
          placeholder="Full company address"
          className={inputClass}
        />
        {errors.companyAddress && (
          <p className={errorClass}>{errors.companyAddress.message}</p>
        )}
      </div>

      {/* Business Type */}
      <div>
        <label className={labelClass}>Business Type *</label>
        <select {...register("businessType")} className={inputClass}>
          <option value="">Select business type</option>
          <option value="education-consultancy">Education Consultancy</option>
          <option value="manpower-agency">Manpower Agency</option>
          <option value="travel-agency">Travel Agency</option>
          <option value="holidays-service-provider">Holidays Service Provider</option>
        </select>
        {errors.businessType && (
          <p className={errorClass}>{errors.businessType.message}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label className={labelClass}>Message (Optional)</label>
        <textarea
          {...register("message")}
          rows={3}
          placeholder="Tell us about your requirements..."
          className={inputClass}
        />
        {errors.message && (
          <p className={errorClass}>{errors.message.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-[#0cfcbc] text-[#094f8a] font-bold rounded-lg hover:bg-[#0adba5] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> Submit Inquiry
          </>
        )}
      </button>
    </form>
  );
}
