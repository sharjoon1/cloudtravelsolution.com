import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

import { LOCATIONS, SITE_CONFIG, POPULAR_COUNTRIES } from "@/lib/constants";
import { generateBreadcrumbSchema, generateLocalBusinessSchema } from "@/lib/seo";
import { CTABanner } from "@/components/sections/cta-banner";

interface PageProps {
  params: Promise<{ city: string }>;
}

export function generateStaticParams() {
  return LOCATIONS.map((loc) => ({ city: loc.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { city: slug } = await params;
  const location = LOCATIONS.find((l) => l.slug === slug);
  if (!location) return {};

  return {
    title: `Visa Consultant in ${location.city} — ${SITE_CONFIG.name}`,
    description: `Visit CloudTravelSolution ${location.city} office for expert visa consulting, passport services, and travel assistance. ${location.state}.`,
  };
}

export default async function LocationPage({ params }: PageProps) {
  const { city: slug } = await params;
  const location = LOCATIONS.find((l) => l.slug === slug);

  if (!location) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Locations", href: "/locations" },
    { name: location.city, href: `/locations/${location.slug}` },
  ];

  const isActive = location.status === "active";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs)),
        }}
      />
      {isActive && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              generateLocalBusinessSchema({
                city: location.city,
                address: `${location.city}, ${location.state}, India`,
                phone: location.phone || SITE_CONFIG.tollFree,
                lat: 12.9716,
                lng: 77.5946,
              })
            ),
          }}
        />
      )}

      <div className="bg-white">
        {/* Breadcrumbs */}
        <div className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-1.5 text-sm">
              {breadcrumbs.map((crumb, i) => (
                <span key={crumb.href} className="flex items-center gap-1.5">
                  {i > 0 && (
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                  {i === breadcrumbs.length - 1 ? (
                    <span className="font-medium">{crumb.name}</span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="text-muted-foreground hover:text-[var(--color-primary)]"
                    >
                      {crumb.name}
                    </Link>
                  )}
                </span>
              ))}
            </nav>
          </div>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="h-6 w-6" />
              {!isActive && (
                <span className="px-2 py-0.5 text-xs font-semibold uppercase tracking-wider bg-[var(--color-secondary)]/20 text-[var(--color-secondary)] rounded-full">
                  Coming Soon
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold">
              CloudTravelSolution {location.city}
            </h1>
            <p className="text-white/70 mt-2 text-lg">{location.state}, India</p>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          {isActive ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Office details */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Office Details
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-[var(--color-muted)]">
                      <MapPin className="h-5 w-5 text-[var(--color-primary)] mt-0.5" />
                      <div>
                        <div className="text-xs text-muted-foreground">Address</div>
                        <div className="text-sm font-medium mt-0.5">
                          {location.city}, {location.state}, India
                        </div>
                      </div>
                    </div>
                    {location.phone && (
                      <div className="flex items-start gap-3 p-4 rounded-lg bg-[var(--color-muted)]">
                        <Phone className="h-5 w-5 text-[var(--color-primary)] mt-0.5" />
                        <div>
                          <div className="text-xs text-muted-foreground">Phone</div>
                          <a
                            href={`tel:${location.phone}`}
                            className="text-sm font-medium mt-0.5 hover:text-[var(--color-primary)]"
                          >
                            {location.phone}
                          </a>
                        </div>
                      </div>
                    )}
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-[var(--color-muted)]">
                      <Mail className="h-5 w-5 text-[var(--color-primary)] mt-0.5" />
                      <div>
                        <div className="text-xs text-muted-foreground">Email</div>
                        <a
                          href={`mailto:${location.email}`}
                          className="text-sm font-medium mt-0.5 hover:text-[var(--color-primary)]"
                        >
                          {location.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-[var(--color-muted)]">
                      <Clock className="h-5 w-5 text-[var(--color-primary)] mt-0.5" />
                      <div>
                        <div className="text-xs text-muted-foreground">Hours</div>
                        <div className="text-sm font-medium mt-0.5">
                          Mon-Sat: 9:00 AM - 6:00 PM
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map placeholder */}
                <div className="rounded-xl bg-[var(--color-muted)] h-72 flex items-center justify-center border border-border">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Google Maps will be embedded here</p>
                  </div>
                </div>

                {/* Popular services */}
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Popular Visa Services in {location.city}
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {POPULAR_COUNTRIES.slice(0, 6).map((country) => (
                      <Link
                        key={country.slug}
                        href={`/visa/${country.slug}`}
                        className="flex items-center gap-2 p-3 rounded-lg border border-border hover:border-[var(--color-primary)]/30 hover:shadow-sm transition-all"
                      >
                        <span className="text-xl">{country.flag}</span>
                        <span className="text-sm font-medium">
                          {country.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div>
                <div className="sticky top-28 space-y-6">
                  <div className="p-6 rounded-xl border border-border bg-white shadow-sm">
                    <h3 className="font-semibold text-foreground mb-3">
                      Visit Our {location.city} Office
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Walk in for a free consultation or book an appointment.
                    </p>
                    <Link
                      href="/inquiry/visa"
                      className="block w-full text-center px-5 py-3 bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)] text-white font-semibold rounded-lg transition-colors text-sm"
                    >
                      Book Appointment
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Coming Soon */
            <div className="text-center py-12 max-w-2xl mx-auto">
              <div className="h-16 w-16 rounded-full bg-[var(--color-secondary)]/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-[var(--color-secondary)]" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                Coming Soon to {location.city}!
              </h2>
              <p className="text-muted-foreground mb-6">
                We are expanding to {location.city}, {location.state}. Until
                our office opens, you can reach us through our existing
                locations or submit an online inquiry.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/inquiry/visa"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-secondary)] text-white font-semibold rounded-lg hover:bg-[var(--color-secondary-dark)] transition-colors"
                >
                  Submit Online Inquiry
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-medium rounded-lg hover:bg-[var(--color-muted)] transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <CTABanner />
    </>
  );
}
