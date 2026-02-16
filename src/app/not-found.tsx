import Link from "next/link";
import { Home, Search, ArrowRight, MapPin } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        {/* 404 Number */}
        <div className="text-[120px] sm:text-[160px] font-bold leading-none bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] bg-clip-text text-transparent">
          404
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mt-2 mb-3">
          Page Not Found
        </h1>
        <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It may
          have been moved or doesn&apos;t exist.
        </p>

        {/* Quick actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)] text-white font-semibold rounded-lg transition-colors"
          >
            <Home className="h-4 w-4" />
            Go to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-medium rounded-lg hover:bg-[var(--color-muted)] transition-colors"
          >
            Contact Us
          </Link>
        </div>

        {/* Helpful links */}
        <div className="border-t border-border pt-8">
          <p className="text-sm font-semibold text-foreground mb-4">
            Looking for something specific?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href="/visa"
              className="flex items-center gap-2 p-3 rounded-lg border border-border hover:border-[var(--color-primary)]/30 hover:shadow-sm transition-all text-sm"
            >
              <Search className="h-4 w-4 text-[var(--color-primary)]" />
              <span>Visa Services</span>
              <ArrowRight className="h-3 w-3 ml-auto text-muted-foreground" />
            </Link>
            <Link
              href="/services"
              className="flex items-center gap-2 p-3 rounded-lg border border-border hover:border-[var(--color-primary)]/30 hover:shadow-sm transition-all text-sm"
            >
              <MapPin className="h-4 w-4 text-[var(--color-primary)]" />
              <span>Our Services</span>
              <ArrowRight className="h-3 w-3 ml-auto text-muted-foreground" />
            </Link>
            <Link
              href="/blog"
              className="flex items-center gap-2 p-3 rounded-lg border border-border hover:border-[var(--color-primary)]/30 hover:shadow-sm transition-all text-sm"
            >
              <Search className="h-4 w-4 text-[var(--color-primary)]" />
              <span>Blog & Guides</span>
              <ArrowRight className="h-3 w-3 ml-auto text-muted-foreground" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
