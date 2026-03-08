"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/constants";
import type { SiteSettingsData } from "@/lib/payload-data";

type HeaderProps = {
  siteSettings?: SiteSettingsData;
};

export function Header({ siteSettings }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();

  const tollFree = siteSettings?.businessInfo?.tollFreeNumber || SITE_CONFIG.tollFree;
  const email = siteSettings?.businessInfo?.email || SITE_CONFIG.email;
  const logoUrl = siteSettings?.branding?.logo?.url;

  // Close mobile menu on route change
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    if (mobileMenuOpen) setMobileMenuOpen(false);
    if (mobileExpanded) setMobileExpanded(null);
  }

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0c6cbc] backdrop-blur supports-[backdrop-filter]:bg-[#0c6cbc]/98">
      {/* Top bar */}
      <div className="bg-[#094f8a] text-white text-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9">
          <p className="hidden sm:block">
            Trusted Visa & Travel Partner — Bangalore | Hyderabad | Delhi | Chennai
          </p>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${tollFree}`}
              className="flex items-center gap-1.5 hover:text-[var(--color-secondary)] transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>{tollFree}</span>
            </a>
            <a
              href={`mailto:${email}`}
              className="hidden md:block hover:text-[var(--color-secondary)] transition-colors"
            >
              {email}
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            {logoUrl ? (
              <Image src={logoUrl} alt={siteSettings?.businessInfo?.siteName || "Cloud Travel Solutions"} width={280} height={56} className="h-10 sm:h-12 w-auto max-w-[200px] sm:max-w-[280px] object-contain" priority unoptimized />
            ) : (
              <>
                <div className="h-9 w-9 rounded-lg bg-[#0c6cbc] flex items-center justify-center">
                  <span className="text-white font-bold text-lg">C</span>
                </div>
                <div className="hidden sm:block">
                  <span className="font-bold text-lg text-white">
                    Cloud
                  </span>
                  <span className="font-bold text-lg text-[#0cfcbc]">
                    TravelSolution
                  </span>
                </div>
              </>
            )}
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  "children" in item ? setActiveDropdown(item.label) : undefined
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 text-sm font-medium text-white/80 rounded-md transition-colors hover:text-white hover:bg-white/10"
                  )}
                >
                  {item.label}
                  {"children" in item && (
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform",
                        activeDropdown === item.label && "rotate-180"
                      )}
                    />
                  )}
                </Link>

                {/* Dropdown */}
                {"children" in item && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-1 z-50">
                    <div className="w-56 bg-[#0c6cbc] rounded-lg shadow-lg border border-[#0c6cbc]/20 py-2 animate-in fade-in slide-in-from-top-1 duration-150">
                      {item.children!.map((child) => (
                        <div key={child.href}>
                          <Link
                            href={child.href}
                            className="block px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                          >
                            {child.label}
                          </Link>
                          {child.children && (
                            <div className="ml-3 border-l border-white/20">
                              {child.children.map((sub) => (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  className="block px-4 py-1.5 text-xs text-white/60 hover:bg-white/10 hover:text-white transition-colors"
                                >
                                  {sub.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/b2b"
              className="hidden sm:inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-transparent border border-[#0cfcbc] rounded-lg hover:bg-[#0cfcbc] hover:text-[#094f8a] transition-colors"
            >
              B2B Partners
            </Link>
            <Link
              href="/inquiry/visa"
              className="hidden sm:inline-flex items-center px-5 py-2.5 text-sm font-semibold text-[#0c6cbc] bg-[#0cfcbc] rounded-lg hover:bg-[#0adba5] transition-colors shadow-sm"
            >
              Free Consultation
            </Link>
            <button
              type="button"
              className="lg:hidden p-2 rounded-md text-white/80 hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 top-[calc(4rem+2.25rem+1px)] bg-black/30 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile menu panel */}
      <div
        className={cn(
          "lg:hidden fixed top-[calc(4rem+2.25rem+1px)] left-0 right-0 bottom-0 z-50 bg-[#0c6cbc] transform transition-transform duration-300 ease-in-out overflow-y-auto",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="px-4 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const hasChildren = "children" in item;
            const isExpanded = mobileExpanded === item.label;

            return (
              <div key={item.label}>
                {hasChildren ? (
                  <button
                    type="button"
                    onClick={() =>
                      setMobileExpanded(isExpanded ? null : item.label)
                    }
                    className="flex items-center justify-between w-full px-3 py-3 text-base font-medium text-white/80 rounded-md hover:bg-white/10 transition-colors"
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-muted-foreground transition-transform duration-200",
                        isExpanded && "rotate-180"
                      )}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-3 py-3 text-base font-medium text-white/80 rounded-md hover:bg-white/10 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Accordion children */}
                {hasChildren && (
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-200 ease-in-out",
                      isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="ml-3 pl-3 border-l-2 border-[#0cfcbc]/30 space-y-0.5 pb-2">
                      <Link
                        href={item.href}
                        className="block px-3 py-2 text-sm font-medium text-[#0cfcbc] hover:bg-white/10 rounded-md transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        View All {item.label}
                      </Link>
                      {item.children!.map((child) => (
                        <div key={child.href}>
                          <Link
                            href={child.href}
                            className="block px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {child.label}
                          </Link>
                          {child.children && (
                            <div className="ml-3 pl-3 border-l border-white/20 space-y-0.5">
                              {child.children.map((sub) => (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  className="block px-3 py-1.5 text-xs text-white/50 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {sub.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <div className="pt-3 mt-2 border-t border-border">
            <Link
              href="/inquiry/visa"
              className="block w-full text-center px-5 py-3 text-sm font-semibold text-[#0c6cbc] bg-[#0cfcbc] rounded-lg hover:bg-[#0adba5] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Free Consultation
            </Link>
            <Link
              href="/b2b"
              className="block w-full text-center px-5 py-3 text-sm font-semibold text-white border border-[#0cfcbc] rounded-lg hover:bg-[#0cfcbc] hover:text-[#094f8a] transition-colors mt-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              B2B Partners
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
