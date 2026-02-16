import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

import { SITE_CONFIG, LOCATIONS, SERVICES } from "@/lib/constants";

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Team", href: "/about/team" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/resources/faq" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact Us", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
];

export function Footer() {
  return (
    <footer className="bg-[var(--color-primary-dark)] text-white">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand & Contact */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-lg bg-white/10 flex items-center justify-center">
                <span className="text-[var(--color-secondary)] font-bold text-lg">
                  C
                </span>
              </div>
              <div>
                <span className="font-bold text-lg text-white">Cloud</span>
                <span className="font-bold text-lg text-[var(--color-secondary)]">
                  TravelSolution
                </span>
              </div>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed">
              India&apos;s trusted visa consulting and travel partner.
              Expert services across Bangalore, Hyderabad, Delhi, and
              Chennai with Pan India expansion.
            </p>
            <div className="space-y-3 text-sm">
              <a
                href={`tel:${SITE_CONFIG.tollFree}`}
                className="flex items-center gap-2 text-white/80 hover:text-[var(--color-secondary)] transition-colors"
              >
                <Phone className="h-4 w-4 shrink-0" />
                {SITE_CONFIG.tollFree}
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-2 text-white/80 hover:text-[var(--color-secondary)] transition-colors"
              >
                <Mail className="h-4 w-4 shrink-0" />
                {SITE_CONFIG.email}
              </a>
            </div>
            <div className="flex items-center gap-3 pt-1">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-secondary)] transition-colors"
                  aria-label={Icon.displayName || "Social media"}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-[var(--color-secondary)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Our Services
            </h3>
            <ul className="space-y-2.5">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-white/70 hover:text-[var(--color-secondary)] transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Our Locations
            </h3>
            <ul className="space-y-3">
              {LOCATIONS.map((location) => (
                <li key={location.slug}>
                  <Link
                    href={`/locations/${location.slug}`}
                    className="flex items-start gap-2 text-sm text-white/70 hover:text-[var(--color-secondary)] transition-colors"
                  >
                    <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>
                      {location.city}, {location.state}
                      {location.status === "coming-soon" && (
                        <span className="ml-1.5 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-[var(--color-secondary)]/20 text-[var(--color-secondary)]">
                          Coming Soon
                        </span>
                      )}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-white text-sm">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-xs text-white/60 mt-0.5">
                Get visa tips, travel guides, and updates delivered to your inbox.
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-sm text-white placeholder:text-white/40 outline-none focus:border-[var(--color-secondary)] transition-colors"
              />
              <button
                type="button"
                className="px-5 py-2.5 bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)] text-white font-semibold rounded-lg transition-colors text-sm shrink-0"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} CloudTravelSolution. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-white/50 hover:text-white/80 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
