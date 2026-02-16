import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MapPin, Globe, AlertTriangle, ChevronRight } from "lucide-react";

import { getCountryBySlug, getAllCountrySlugs } from "@/lib/visa-data";
import { generateFAQSchema } from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/constants";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { VisaTypeTabs } from "@/components/visa/visa-type-tabs";
import { QuickInquiryForm } from "@/components/visa/quick-inquiry-form";
import { CTABanner } from "@/components/sections/cta-banner";

interface PageProps {
  params: Promise<{ country: string }>;
}

export async function generateStaticParams() {
  return getAllCountrySlugs().map((slug) => ({ country: slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { country: slug } = await params;
  const country = getCountryBySlug(slug);
  if (!country) return {};

  return {
    title: `${country.name} Visa from India — Requirements, Fees & Process`,
    description: `Complete guide to ${country.name} visa for Indian citizens. Requirements, documents, fees, processing time, and expert assistance from ${SITE_CONFIG.name}.`,
    openGraph: {
      title: `${country.name} Visa from India | ${SITE_CONFIG.name}`,
      description: `Expert ${country.name} visa assistance. Check requirements, fees, and apply with our guidance.`,
    },
  };
}

export default async function VisaCountryPage({ params }: PageProps) {
  const { country: slug } = await params;
  const country = getCountryBySlug(slug);

  if (!country) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Visa", href: "/visa" },
    { name: country.name, href: `/visa/${country.slug}` },
  ];

  return (
    <>
      {/* Schema.org structured data */}
      {country.faqs && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateFAQSchema(country.faqs)),
          }}
        />
      )}

      <Breadcrumb items={breadcrumbs} />

      <div className="bg-white">

        {/* Country header */}
        <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">{country.flag}</span>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold">
                  {country.name} Visa Services
                </h1>
                <p className="text-white/70 mt-1">
                  Expert visa assistance for Indian passport holders
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-6 text-sm">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur">
                <Globe className="h-3.5 w-3.5" />
                {country.visaTypes.length} visa type
                {country.visaTypes.length > 1 ? "s" : ""} available
              </span>
              {country.embassyInfo && (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur">
                  <MapPin className="h-3.5 w-3.5" />
                  {country.embassyInfo.processingCentres.length} processing
                  centres in India
                </span>
              )}
              <span
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur ${
                  country.travelAdvisory === "green"
                    ? "bg-green-500/20 text-green-200"
                    : country.travelAdvisory === "yellow"
                      ? "bg-yellow-500/20 text-yellow-200"
                      : "bg-red-500/20 text-red-200"
                }`}
              >
                {country.travelAdvisory === "red" && (
                  <AlertTriangle className="h-3.5 w-3.5" />
                )}
                Travel Advisory:{" "}
                {country.travelAdvisory.charAt(0).toUpperCase() +
                  country.travelAdvisory.slice(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main column */}
            <div className="lg:col-span-2">
              <VisaTypeTabs
                visaTypes={country.visaTypes}
                countryName={country.name}
              />

              {/* FAQs */}
              {country.faqs && country.faqs.length > 0 && (
                <div className="mt-12 pt-8 border-t border-border">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    {country.faqs.map((faq, i) => (
                      <details
                        key={i}
                        className="group rounded-lg border border-border"
                      >
                        <summary className="flex items-center justify-between cursor-pointer px-5 py-4 text-sm font-medium text-foreground hover:bg-[var(--color-muted)] transition-colors rounded-lg">
                          {faq.question}
                          <ChevronRight className="h-4 w-4 text-muted-foreground group-open:rotate-90 transition-transform" />
                        </summary>
                        <div className="px-5 pb-4 text-sm text-foreground/70 leading-relaxed">
                          {faq.answer}
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              )}

              {/* Embassy info */}
              {country.embassyInfo && (
                <div className="mt-12 pt-8 border-t border-border">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Embassy & Processing Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-[var(--color-muted)]">
                      <div className="text-xs text-muted-foreground mb-1">
                        Embassy / Consulate
                      </div>
                      <div className="text-sm font-medium">
                        {country.embassyInfo.name}
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-[var(--color-muted)]">
                      <div className="text-xs text-muted-foreground mb-1">
                        Locations in India
                      </div>
                      <div className="text-sm font-medium">
                        {country.embassyInfo.locationInIndia}
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-[var(--color-muted)]">
                      <div className="text-xs text-muted-foreground mb-1">
                        Appointment Required
                      </div>
                      <div className="text-sm font-medium">
                        {country.embassyInfo.appointmentRequired ? "Yes" : "No"}
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-[var(--color-muted)]">
                      <div className="text-xs text-muted-foreground mb-1">
                        Processing Centres
                      </div>
                      <div className="text-sm font-medium">
                        {country.embassyInfo.processingCentres.join(", ")}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                {/* Quick inquiry form */}
                <QuickInquiryForm
                  countryName={country.name}
                  countrySlug={country.slug}
                />

                {/* Contact info */}
                <div className="p-6 rounded-xl border border-border bg-[var(--color-muted)]">
                  <h3 className="font-semibold text-foreground mb-3">
                    Contact Our Visa Team
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground">
                      <strong>Toll Free:</strong> 1800-XXX-XXXX
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Email:</strong> visa@cloudtravelsolution.com
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Hours:</strong> Mon-Sat, 9 AM - 6 PM
                    </p>
                  </div>
                </div>

                {/* Other countries */}
                <div className="p-6 rounded-xl border border-border">
                  <h3 className="font-semibold text-foreground mb-3">
                    Other Popular Destinations
                  </h3>
                  <div className="space-y-2">
                    {[
                      { name: "United States", slug: "united-states", flag: "\u{1F1FA}\u{1F1F8}" },
                      { name: "United Kingdom", slug: "united-kingdom", flag: "\u{1F1EC}\u{1F1E7}" },
                      { name: "Canada", slug: "canada", flag: "\u{1F1E8}\u{1F1E6}" },
                      { name: "Australia", slug: "australia", flag: "\u{1F1E6}\u{1F1FA}" },
                      { name: "Schengen", slug: "schengen", flag: "\u{1F1EA}\u{1F1FA}" },
                    ]
                      .filter((c) => c.slug !== country.slug)
                      .slice(0, 4)
                      .map((c) => (
                        <Link
                          key={c.slug}
                          href={`/visa/${c.slug}`}
                          className="flex items-center gap-2 text-sm text-foreground/70 hover:text-[var(--color-primary)] transition-colors"
                        >
                          <span>{c.flag}</span>
                          {c.name} Visa
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CTABanner />
    </>
  );
}
