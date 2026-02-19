"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  Globe,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Loader2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  visaInquirySchema,
  type VisaInquiryFormData,
} from "@/lib/validations";
import { LOCATIONS, VISA_TYPES } from "@/lib/constants";

const ALL_COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia",
  "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados",
  "Belarus", "Belgium", "Belize", "Bhutan", "Bolivia", "Bosnia and Herzegovina",
  "Botswana", "Brazil", "Brunei", "Bulgaria", "Cambodia", "Cameroon", "Canada",
  "Chile", "China", "Colombia", "Costa Rica", "Croatia", "Cuba", "Cyprus",
  "Czech Republic", "Denmark", "Dominican Republic", "Ecuador", "Egypt",
  "El Salvador", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Georgia",
  "Germany", "Ghana", "Greece", "Guatemala", "Honduras", "Hong Kong", "Hungary",
  "Iceland", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica",
  "Japan", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyzstan", "Laos",
  "Latvia", "Lebanon", "Libya", "Lithuania", "Luxembourg", "Macao", "Madagascar",
  "Malaysia", "Maldives", "Malta", "Mauritius", "Mexico", "Moldova", "Monaco",
  "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nepal",
  "Netherlands", "New Zealand", "Nicaragua", "Nigeria", "North Macedonia", "Norway",
  "Oman", "Pakistan", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines",
  "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saudi Arabia",
  "Schengen (Europe)", "Senegal", "Serbia", "Seychelles", "Singapore",
  "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka",
  "Sweden", "Switzerland", "Taiwan", "Tajikistan", "Tanzania", "Thailand",
  "Tunisia", "Turkey", "Turkmenistan", "Uganda", "Ukraine", "United Arab Emirates",
  "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vatican City",
  "Venezuela", "Vietnam", "Zambia", "Zimbabwe",
];

const VISA_CATEGORIES = [
  { value: "tourist", label: "Tourist" },
  { value: "business", label: "Business" },
  { value: "student", label: "Student" },
  { value: "work-permit", label: "Work Permit" },
  { value: "medical", label: "Medical" },
  { value: "transit", label: "Transit" },
  { value: "conference", label: "Conference" },
  { value: "family", label: "Family / Dependent" },
];

const LANGUAGE_OPTIONS = [
  { value: "english", label: "English" },
  { value: "hindi", label: "Hindi" },
  { value: "kannada", label: "Kannada" },
  { value: "telugu", label: "Telugu" },
  { value: "tamil", label: "Tamil" },
  { value: "malayalam", label: "Malayalam" },
];

const EMPLOYMENT_OPTIONS = [
  { value: "salaried", label: "Salaried" },
  { value: "self-employed", label: "Self-Employed" },
  { value: "student", label: "Student" },
  { value: "retired", label: "Retired" },
  { value: "unemployed", label: "Unemployed" },
];

const steps = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Visa Details", icon: Globe },
  { id: 3, title: "Additional Info", icon: MessageSquare },
  { id: 4, title: "Confirm", icon: CheckCircle2 },
];

export function VisaInquiryForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<VisaInquiryFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(visaInquirySchema) as any,
    defaultValues: {
      numberOfTravelers: 1,
      appliedBefore: false,
      preferredContactMethod: "call",
    },
  });

  const watchedValues = watch();

  const goToNextStep = async () => {
    let fieldsToValidate: (keyof VisaInquiryFormData)[] = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = ["fullName", "email", "phone", "city"];
        break;
      case 2:
        fieldsToValidate = ["destinationCountry", "visaType"];
        break;
      case 3:
        fieldsToValidate = [];
        break;
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const onSubmit = async (data: VisaInquiryFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/inquiry", {
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
      <div className="text-center py-12">
        <div className="h-16 w-16 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="h-8 w-8 text-[var(--color-accent)]" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Thank You!
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Your visa consultation request has been submitted successfully. Our
          team will contact you within 2 business hours.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full h-11 px-4 rounded-lg border border-border bg-white text-sm outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-colors";

  return (
    <div>
      {/* Progress indicator */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, i) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center transition-colors",
                  currentStep >= step.id
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-[var(--color-muted)] text-muted-foreground"
                )}
              >
                {currentStep > step.id ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <step.icon className="h-5 w-5" />
                )}
              </div>
              <span className="text-xs mt-1.5 font-medium text-muted-foreground hidden sm:block">
                {step.title}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "h-0.5 w-8 sm:w-16 lg:w-24 mx-2",
                  currentStep > step.id
                    ? "bg-[var(--color-primary)]"
                    : "bg-[var(--color-muted)]"
                )}
              />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1: Personal Info */}
        {currentStep === 1 && (
          <div className="space-y-5">
            <h2 className="text-xl font-semibold text-foreground mb-1">
              Personal Information
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Tell us how to reach you
            </p>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Full Name *
              </label>
              <input
                {...register("fullName")}
                placeholder="Enter your full name"
                className={inputClass}
              />
              {errors.fullName && (
                <p className="text-xs text-[var(--color-error)] mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Email Address *
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="your@email.com"
                className={inputClass}
              />
              {errors.email && (
                <p className="text-xs text-[var(--color-error)] mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Phone Number *
              </label>
              <input
                {...register("phone")}
                type="tel"
                placeholder="+91 98765 43210"
                className={inputClass}
              />
              {errors.phone && (
                <p className="text-xs text-[var(--color-error)] mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Your City *
              </label>
              <select
                {...register("city")}
                className={inputClass}
              >
                <option value="">Select your city</option>
                {LOCATIONS.map((loc) => (
                  <option key={loc.slug} value={loc.slug}>
                    {loc.city}
                  </option>
                ))}
                <option value="other">Other</option>
              </select>
              {errors.city && (
                <p className="text-xs text-[var(--color-error)] mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Language Preference
              </label>
              <select
                {...register("languagePreference")}
                className={inputClass}
              >
                <option value="">Select preferred language</option>
                {LANGUAGE_OPTIONS.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Step 2: Visa Details */}
        {currentStep === 2 && (
          <div className="space-y-5">
            <h2 className="text-xl font-semibold text-foreground mb-1">
              Visa Requirements
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Tell us about your travel plans
            </p>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Destination Country *
              </label>
              <select
                {...register("destinationCountry")}
                className={inputClass}
              >
                <option value="">Select destination country</option>
                {ALL_COUNTRIES.map((country) => (
                  <option key={country} value={country.toLowerCase().replace(/\s+/g, "-").replace(/[()]/g, "")}>
                    {country}
                  </option>
                ))}
              </select>
              {errors.destinationCountry && (
                <p className="text-xs text-[var(--color-error)] mt-1">
                  {errors.destinationCountry.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Visa Type *
              </label>
              <select
                {...register("visaType")}
                className={inputClass}
              >
                <option value="">Select visa type</option>
                {VISA_TYPES.map((v) => (
                  <option key={v.slug} value={v.slug}>
                    {v.name}
                  </option>
                ))}
              </select>
              {errors.visaType && (
                <p className="text-xs text-[var(--color-error)] mt-1">
                  {errors.visaType.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Category
              </label>
              <select
                {...register("visaCategory")}
                className={inputClass}
              >
                <option value="">Select category</option>
                {VISA_CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Number of Travelers
                </label>
                <input
                  {...register("numberOfTravelers", { valueAsNumber: true })}
                  type="number"
                  min={1}
                  max={50}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Employment Status
                </label>
                <select
                  {...register("employmentStatus")}
                  className={inputClass}
                >
                  <option value="">Select status</option>
                  {EMPLOYMENT_OPTIONS.map((e) => (
                    <option key={e.value} value={e.value}>
                      {e.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Travel Start Date
                </label>
                <input
                  {...register("preferredTravelDate")}
                  type="date"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Travel End Date
                </label>
                <input
                  {...register("travelEndDate")}
                  type="date"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                {...register("appliedBefore")}
                type="checkbox"
                id="appliedBefore"
                className="h-4 w-4 rounded border-border text-[var(--color-primary)]"
              />
              <label
                htmlFor="appliedBefore"
                className="text-sm text-foreground/80"
              >
                I have applied for this visa before
              </label>
            </div>
          </div>
        )}

        {/* Step 3: Additional Info */}
        {currentStep === 3 && (
          <div className="space-y-5">
            <h2 className="text-xl font-semibold text-foreground mb-1">
              Additional Details
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Help us serve you better (all fields optional)
            </p>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Purpose of Visit
              </label>
              <textarea
                {...register("purposeOfVisit")}
                rows={3}
                placeholder="Briefly describe your travel purpose..."
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Preferred Contact Method
              </label>
              <div className="flex gap-3">
                {[
                  { value: "call", label: "Phone Call" },
                  { value: "email", label: "Email" },
                  { value: "whatsapp", label: "WhatsApp" },
                ].map((method) => (
                  <label
                    key={method.value}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      {...register("preferredContactMethod")}
                      type="radio"
                      value={method.value}
                      className="h-4 w-4 text-[var(--color-primary)]"
                    />
                    <span className="text-sm">{method.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Preferred Callback Time
              </label>
              <select
                {...register("preferredCallbackTime")}
                className={inputClass}
              >
                <option value="">Any time</option>
                <option value="morning">Morning (9 AM - 12 PM)</option>
                <option value="afternoon">Afternoon (12 PM - 3 PM)</option>
                <option value="evening">Evening (3 PM - 6 PM)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                How did you hear about us?
              </label>
              <select
                {...register("referralSource")}
                className={inputClass}
              >
                <option value="">Select</option>
                <option value="google">Google Search</option>
                <option value="social-media">Social Media</option>
                <option value="referral">Friend / Family Referral</option>
                <option value="walk-in">Walk-in</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {currentStep === 4 && (
          <div className="space-y-5">
            <h2 className="text-xl font-semibold text-foreground mb-1">
              Review & Submit
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Please review your details before submitting
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-[var(--color-muted)]">
                <h3 className="text-sm font-semibold text-foreground mb-2">
                  Personal Information
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Name:</span>{" "}
                    {watchedValues.fullName}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Email:</span>{" "}
                    {watchedValues.email}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Phone:</span>{" "}
                    {watchedValues.phone}
                  </div>
                  <div>
                    <span className="text-muted-foreground">City:</span>{" "}
                    {watchedValues.city}
                  </div>
                  {watchedValues.languagePreference && (
                    <div>
                      <span className="text-muted-foreground">Language:</span>{" "}
                      {watchedValues.languagePreference}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[var(--color-muted)]">
                <h3 className="text-sm font-semibold text-foreground mb-2">
                  Visa Details
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Country:</span>{" "}
                    {watchedValues.destinationCountry}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Visa Type:</span>{" "}
                    {watchedValues.visaType}
                  </div>
                  {watchedValues.visaCategory && (
                    <div>
                      <span className="text-muted-foreground">Category:</span>{" "}
                      {watchedValues.visaCategory}
                    </div>
                  )}
                  <div>
                    <span className="text-muted-foreground">Travelers:</span>{" "}
                    {watchedValues.numberOfTravelers}
                  </div>
                  {watchedValues.employmentStatus && (
                    <div>
                      <span className="text-muted-foreground">Employment:</span>{" "}
                      {watchedValues.employmentStatus}
                    </div>
                  )}
                  <div>
                    <span className="text-muted-foreground">Travel Date:</span>{" "}
                    {watchedValues.preferredTravelDate || "Not specified"}
                    {watchedValues.travelEndDate && ` to ${watchedValues.travelEndDate}`}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2 mt-6">
              <input
                {...register("privacyConsent")}
                type="checkbox"
                id="privacyConsent"
                className="h-4 w-4 rounded border-border text-[var(--color-primary)] mt-0.5"
              />
              <label
                htmlFor="privacyConsent"
                className="text-sm text-foreground/70"
              >
                I agree to the{" "}
                <a
                  href="/privacy-policy"
                  className="text-[var(--color-primary)] underline"
                >
                  Privacy Policy
                </a>{" "}
                and consent to CloudTravelSolution contacting me regarding my
                inquiry.
              </label>
            </div>
            {errors.privacyConsent && (
              <p className="text-xs text-[var(--color-error)]">
                {errors.privacyConsent.message}
              </p>
            )}
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-foreground/70 rounded-lg border border-border hover:bg-[var(--color-muted)] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={goToNextStep}
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-[var(--color-primary)] rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-[var(--color-secondary)] rounded-lg hover:bg-[var(--color-secondary-dark)] transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Inquiry
                  <CheckCircle2 className="h-4 w-4" />
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
