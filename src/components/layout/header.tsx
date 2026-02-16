"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/constants";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      {/* Top bar */}
      <div className="bg-[var(--color-primary)] text-white text-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9">
          <p className="hidden sm:block">
            Trusted Visa & Travel Partner — Bangalore | Hyderabad | Delhi | Chennai
          </p>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${SITE_CONFIG.tollFree}`}
              className="flex items-center gap-1.5 hover:text-[var(--color-secondary)] transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>{SITE_CONFIG.tollFree}</span>
            </a>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="hidden md:block hover:text-[var(--color-secondary)] transition-colors"
            >
              {SITE_CONFIG.email}
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="h-9 w-9 rounded-lg bg-[var(--color-primary)] flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-lg text-[var(--color-primary)]">
                Cloud
              </span>
              <span className="font-bold text-lg text-[var(--color-secondary)]">
                TravelSolution
              </span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  item.children ? setActiveDropdown(item.label) : undefined
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground/80 rounded-md transition-colors hover:text-[var(--color-primary)] hover:bg-muted"
                  )}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform",
                        activeDropdown === item.label && "rotate-180"
                      )}
                    />
                  )}
                </Link>

                {/* Dropdown */}
                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-1 z-50">
                    <div className="w-56 bg-white rounded-lg shadow-lg border border-border py-2 animate-in fade-in slide-in-from-top-1 duration-150">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-foreground/80 hover:bg-muted hover:text-[var(--color-primary)] transition-colors"
                        >
                          {child.label}
                        </Link>
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
              href="/inquiry/visa"
              className="hidden sm:inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-[var(--color-secondary)] rounded-lg hover:bg-[var(--color-secondary-dark)] transition-colors shadow-sm"
            >
              Free Consultation
            </Link>
            <button
              type="button"
              className="lg:hidden p-2 rounded-md text-foreground/80 hover:bg-muted transition-colors"
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

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-white">
          <div className="px-4 py-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className="block px-3 py-2.5 text-base font-medium text-foreground/80 rounded-md hover:bg-muted hover:text-[var(--color-primary)] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-4 space-y-0.5">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-3 py-2 text-sm text-muted-foreground hover:text-[var(--color-primary)] transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 border-t border-border">
              <Link
                href="/inquiry/visa"
                className="block w-full text-center px-5 py-3 text-sm font-semibold text-white bg-[var(--color-secondary)] rounded-lg hover:bg-[var(--color-secondary-dark)] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Free Consultation
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
