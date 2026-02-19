"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, LayoutDashboard, PlusCircle, Search, Plane } from "lucide-react";
import { useState } from "react";

interface PartnerNavbarProps {
  partner: {
    companyName: string;
    contactPerson: string;
    partnerCode: string;
  };
}

const navLinks = [
  { href: "/partner/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/partner/submit", label: "Submit Request", icon: PlusCircle },
  { href: "/track", label: "Track", icon: Search },
];

export function PartnerNavbar({ partner }: PartnerNavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/partner/auth", { method: "DELETE" });
    router.push("/partner/login");
  }

  return (
    <header className="bg-[#1B4D7A] text-white shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/partner/dashboard" className="flex items-center gap-2">
            <Plane className="h-6 w-6" />
            <div>
              <span className="text-lg font-bold">Cloud Travel</span>
              <span className="ml-1 rounded bg-white/20 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider">
                Partner
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Partner Info + Logout */}
          <div className="flex items-center gap-4">
            <div className="hidden text-right text-sm md:block">
              <p className="font-medium">{partner.companyName}</p>
              <p className="text-xs text-white/60">{partner.partnerCode}</p>
            </div>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/20 hover:text-white disabled:opacity-50"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">{loggingOut ? "..." : "Logout"}</span>
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <nav className="flex gap-1 overflow-x-auto border-t border-white/10 pb-2 pt-2 md:hidden">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "text-white/70 hover:bg-white/10"
                }`}
              >
                <link.icon className="h-3.5 w-3.5" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
