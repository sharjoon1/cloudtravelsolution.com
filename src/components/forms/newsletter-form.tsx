"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Loader2, CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { newsletterSchema, type NewsletterFormData } from "@/lib/validations";

export function NewsletterForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  async function onSubmit(data: NewsletterFormData) {
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to subscribe");
      setIsSubmitted(true);
    } catch {
      alert("Something went wrong. Please try again.");
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <CheckCircle2 className="h-4 w-4 text-[var(--color-accent)]" />
        <span className="text-foreground/70">
          Subscribed! Check your email for confirmation.
        </span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col sm:flex-row gap-2"
    >
      <div className="flex-1">
        <input
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          className={cn(
            "w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors",
            errors.email
              ? "border-red-500"
              : "border-border focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
          )}
        />
        {errors.email && (
          <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)] text-white font-semibold rounded-lg transition-colors text-sm disabled:opacity-50 shrink-0"
      >
        {isSubmitting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Mail className="h-4 w-4" />
        )}
        {isSubmitting ? "..." : "Subscribe"}
      </button>
    </form>
  );
}
