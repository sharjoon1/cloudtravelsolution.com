"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { partnerLoginSchema, type PartnerLoginFormData } from "@/lib/validations";
import { Plane, Eye, EyeOff, AlertCircle } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/partner/dashboard";
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PartnerLoginFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(partnerLoginSchema) as any,
  });

  async function onSubmit(data: PartnerLoginFormData) {
    setError("");
    try {
      const res = await fetch("/api/partner/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Login failed");
        return;
      }

      router.push(redirect);
    } catch {
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#1B4D7A]">
            <Plane className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Partner Portal</h1>
          <p className="mt-1 text-sm text-gray-500">
            Cloud Travel Solution — B2B Partner Access
          </p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                {...register("email")}
                type="email"
                id="email"
                autoComplete="email"
                className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm shadow-sm transition-colors focus:border-[#1B4D7A] focus:outline-none focus:ring-1 focus:ring-[#1B4D7A]"
                placeholder="partner@company.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 pr-10 text-sm shadow-sm transition-colors focus:border-[#1B4D7A] focus:outline-none focus:ring-1 focus:ring-[#1B4D7A]"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full rounded-lg bg-[#1B4D7A] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#163f64] disabled:opacity-60"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-400">
          Don&apos;t have an account? Contact Cloud Travel Solution to become a partner.
        </p>
      </div>
    </div>
  );
}

export default function PartnerLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#1B4D7A] border-t-transparent" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
