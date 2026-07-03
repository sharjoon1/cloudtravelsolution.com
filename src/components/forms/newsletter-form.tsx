"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Loader2, CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { newsletterSchema, type NewsletterFormData } from "@/lib/validations";

interface NewsletterFormProps {
  /** "dark" adapts input/success styling for dark backgrounds (e.g. the footer). */
  variant?: "light" | "dark";
}

export function NewsletterForm({ variant = "light" }: NewsletterFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(newsletterSchema) as any,
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
        <CheckCircle2 className="h-4 w-4 text-[#009e7a]" />
        <span className={variant === "dark" ? "text-white/70" : "text-foreground/70"}>
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
            variant === "dark"
              ? "bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#0cfcbc] focus:ring-2 focus:ring-[#0cfcbc]/20"
              : "border-border focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20",
            errors.email && "border-red-500"
          )}
        />
        {errors.email && (
          <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0cfcbc] hover:bg-[#0adba5] text-[#0c6cbc] font-semibold rounded-lg transition-colors text-sm disabled:opacity-50 shrink-0"
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
