"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHoneypot, HoneypotField } from "@/components/forms/honeypot-field";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2, Send } from "lucide-react";

import { cn } from "@/lib/utils";
import { contactSchema, type ContactFormData } from "@/lib/validations";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const hp = useHoneypot();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(contactSchema) as any,
  });

  async function onSubmit(data: ContactFormData) {
    setSubmitError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, [hp.name]: hp.getValue() }),
      });
      if (!res.ok) throw new Error("Failed to send message");
      setSubmitted(true);
      reset();
    } catch {
      setSubmitError("Something went wrong. Please try again or call us directly.");
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-border bg-white p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-primary)]/10">
          <CheckCircle2 className="h-7 w-7 text-[var(--color-primary)]" />
        </div>
        <h3 className="mb-2 text-xl font-bold text-foreground">Message Sent!</h3>
        <p className="text-muted-foreground">
          Thanks for reaching out. Our team will get back to you within 2 business hours.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20";
  const labelClass = "mb-1 block text-sm font-medium text-foreground";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <HoneypotField inputRef={hp.ref} />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Name *</label>
          <input
            {...register("name")}
            className={cn(inputClass, errors.name && "border-red-500")}
            placeholder="Your name"
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Email *</label>
          <input
            type="email"
            {...register("email")}
            className={cn(inputClass, errors.email && "border-red-500")}
            placeholder="you@email.com"
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Phone</label>
          <input
            {...register("phone")}
            className={cn(inputClass, errors.phone && "border-red-500")}
            placeholder="+91 98765 43210"
          />
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
        </div>
        <div>
          <label className={labelClass}>City</label>
          <input {...register("city")} className={inputClass} placeholder="Your city" />
        </div>
      </div>

      <div>
        <label className={labelClass}>Subject *</label>
        <input
          {...register("subject")}
          className={cn(inputClass, errors.subject && "border-red-500")}
          placeholder="How can we help?"
        />
        {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>}
      </div>

      <div>
        <label className={labelClass}>Message *</label>
        <textarea
          {...register("message")}
          rows={4}
          className={cn(inputClass, errors.message && "border-red-500")}
          placeholder="Tell us about your travel or visa needs..."
        />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
      </div>

      {submitError && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{submitError}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--color-secondary)] px-6 py-3 text-sm font-semibold text-[#094f8a] transition-colors hover:bg-[var(--color-secondary-dark)] disabled:opacity-60"
      >
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
