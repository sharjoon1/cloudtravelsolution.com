"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Globe,
  Calendar,
  Clock,
  Users,
  User,
  Phone,
  Mail,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Loader2,
  ChevronDown,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { heroLeadSchema, type HeroLeadFormData } from "@/lib/validations";
import {
  POPULAR_COUNTRIES,
  TRAVEL_MONTHS,
  TRIP_DURATIONS,
  TRAVELER_COUNTS,
} from "@/lib/constants";

export function HeroLeadForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<HeroLeadFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(heroLeadSchema) as any,
  });

  const goToNextStep = async () => {
    const isValid = await trigger([
      "destination",
      "travelMonth",
      "duration",
      "travelers",
    ]);
    if (isValid) {
      setCurrentStep(2);
    }
  };

  const onSubmit = async (data: HeroLeadFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch {
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
        <div className="h-16 w-16 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="h-8 w-8 text-[var(--color-accent)]" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-gray-600 text-sm">
          Our travel expert will reach out to you within 2 hours with a
          personalized travel plan.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
      {/* Header */}
      <h3 className="text-xl font-bold text-gray-900 mb-1">Plan Your Trip</h3>
      <p className="text-sm text-gray-500 mb-6">
        {currentStep === 1
          ? "Tell us about your travel plans"
          : "How can we reach you?"}
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1: Travel Details */}
        {currentStep === 1 && (
          <div className="space-y-4">
            {/* Destination */}
            <div>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                <select
                  {...register("destination")}
                  defaultValue=""
                  className={cn(
                    "w-full h-11 pl-10 pr-10 rounded-lg border bg-white text-sm text-gray-900 outline-none transition-colors appearance-none cursor-pointer",
                    errors.destination
                      ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-gray-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                  )}
                >
                  <option value="" disabled hidden>Where do you want to go?</option>
                  {POPULAR_COUNTRIES.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.flag} {c.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
              {errors.destination && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.destination.message}
                </p>
              )}
            </div>

            {/* Travel Month */}
            <div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                <select
                  {...register("travelMonth")}
                  defaultValue=""
                  className={cn(
                    "w-full h-11 pl-10 pr-10 rounded-lg border bg-white text-sm text-gray-900 outline-none transition-colors appearance-none cursor-pointer",
                    errors.travelMonth
                      ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-gray-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                  )}
                >
                  <option value="" disabled hidden>When are you traveling?</option>
                  {TRAVEL_MONTHS.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
              {errors.travelMonth && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.travelMonth.message}
                </p>
              )}
            </div>

            {/* Duration */}
            <div>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                <select
                  {...register("duration")}
                  defaultValue=""
                  className={cn(
                    "w-full h-11 pl-10 pr-10 rounded-lg border bg-white text-sm text-gray-900 outline-none transition-colors appearance-none cursor-pointer",
                    errors.duration
                      ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-gray-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                  )}
                >
                  <option value="" disabled hidden>How long is your trip?</option>
                  {TRIP_DURATIONS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
              {errors.duration && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.duration.message}
                </p>
              )}
            </div>

            {/* Travelers */}
            <div>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                <select
                  {...register("travelers")}
                  defaultValue=""
                  className={cn(
                    "w-full h-11 pl-10 pr-10 rounded-lg border bg-white text-sm text-gray-900 outline-none transition-colors appearance-none cursor-pointer",
                    errors.travelers
                      ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-gray-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                  )}
                >
                  <option value="" disabled hidden>Number of travelers</option>
                  {TRAVELER_COUNTS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
              {errors.travelers && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.travelers.message}
                </p>
              )}
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={goToNextStep}
              className="w-full h-11 flex items-center justify-center gap-2 bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)] text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Step 2: Contact Info */}
        {currentStep === 2 && (
          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  {...register("fullName")}
                  placeholder="Full Name"
                  className={cn(
                    "w-full h-11 pl-10 pr-4 rounded-lg border bg-white text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors",
                    errors.fullName
                      ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-gray-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                  )}
                />
              </div>
              {errors.fullName && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  {...register("phone")}
                  type="tel"
                  placeholder="Phone Number (+91)"
                  className={cn(
                    "w-full h-11 pl-10 pr-4 rounded-lg border bg-white text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors",
                    errors.phone
                      ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-gray-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                  )}
                />
              </div>
              {errors.phone && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Email Address"
                  className={cn(
                    "w-full h-11 pl-10 pr-4 rounded-lg border bg-white text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors",
                    errors.email
                      ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-gray-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                  )}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Back + Submit */}
            <div className="space-y-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 flex items-center justify-center gap-2 bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)] text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Get Free Consultation"
                )}
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="w-full flex items-center justify-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to travel details
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Step indicator dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        <div
          className={cn(
            "h-2 rounded-full transition-all",
            currentStep === 1
              ? "w-6 bg-[var(--color-secondary)]"
              : "w-2 bg-gray-200"
          )}
        />
        <div
          className={cn(
            "h-2 rounded-full transition-all",
            currentStep === 2
              ? "w-6 bg-[var(--color-secondary)]"
              : "w-2 bg-gray-200"
          )}
        />
      </div>
    </div>
  );
}
