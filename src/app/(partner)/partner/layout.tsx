"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { PartnerNavbar } from "@/components/partner/partner-navbar";

interface PartnerUser {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  partnerCode: string;
  type: string;
}

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [partner, setPartner] = useState<PartnerUser | null>(null);
  const [loading, setLoading] = useState(true);

  const isLoginPage = pathname === "/partner/login";

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    async function validateSession() {
      try {
        const res = await fetch("/api/partner/auth");
        if (res.ok) {
          const data = await res.json();
          setPartner(data.user);
        } else {
          router.push(`/partner/login?redirect=${encodeURIComponent(pathname)}`);
        }
      } catch {
        router.push("/partner/login");
      } finally {
        setLoading(false);
      }
    }

    validateSession();
  }, [isLoginPage, pathname, router]);

  // Login page: no navbar, no wrapper
  if (isLoginPage) {
    return <div className="min-h-screen bg-gray-50">{children}</div>;
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#1B4D7A] border-t-transparent" />
          <p className="text-sm text-gray-500">Loading partner portal...</p>
        </div>
      </div>
    );
  }

  if (!partner) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <PartnerNavbar partner={partner} />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
