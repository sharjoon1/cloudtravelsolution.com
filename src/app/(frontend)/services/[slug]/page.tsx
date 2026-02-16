import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  FileCheck,
  Shield,
  BookOpen,
  Stamp,
  Building2,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import {
  getServiceBySlug,
  getAllServiceSlugs,
} from "@/lib/services-data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/constants";
import { CTABanner } from "@/components/sections/cta-banner";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileCheck,
  Shield,
  BookOpen,
  Stamp,
  Building2,
};

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: `${service.title} — ${SITE_CONFIG.name}`,
    description: service.tagline,
    openGraph: {
      title: `${service.title} | ${SITE_CONFIG.name}`,
      description: service.tagline,
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const Icon = iconMap[service.icon] || FileCheck;

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: service.title, href: `/services/${service.slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.title,
            description: service.description,
            provider: {
              "@type": "Organization",
              name: SITE_CONFIG.name,
              url: SITE_CONFIG.url,
            },
            areaServed: { "@type": "Country", name: "India" },
          }),
        }}
      />

      <div className="bg-white">
        {/* Breadcrumbs */}
        <div className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-sm"
            >
              {breadcrumbs.map((crumb, i) => (
                <span key={crumb.href} className="flex items-center gap-1.5">
                  {i > 0 && (
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                  {i === breadcrumbs.length - 1 ? (
                    <span className="text-foreground font-medium">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="text-muted-foreground hover:text-[var(--color-primary)] transition-colors"
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
            <div className="flex items-center gap-4 mb-4">
              <div className="h-14 w-14 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
                <Icon className="h-7 w-7" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold">
                  {service.title}
                </h1>
                <p className="text-white/70 mt-1">{service.tagline}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main column */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Overview
                </h2>
                <p className="text-foreground/70 leading-relaxed text-lg">
                  {service.description}
                </p>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  What&apos;s Included
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3 p-3 rounded-lg bg-[var(--color-muted)]"
                    >
                      <CheckCircle2 className="h-5 w-5 text-[var(--color-accent)] shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/80">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  How It Works
                </h2>
                <div className="space-y-6">
                  {service.process.map((step) => (
                    <div key={step.step} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="h-10 w-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-bold text-sm shrink-0">
                          {step.step}
                        </div>
                        {step.step < service.process.length && (
                          <div className="w-0.5 h-full bg-border mt-2" />
                        )}
                      </div>
                      <div className="pb-6">
                        <h3 className="font-semibold text-foreground text-lg">
                          {step.title}
                        </h3>
                        <p className="text-sm text-foreground/70 mt-1 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              <div className="pt-8 border-t border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {service.faqs.map((faq, i) => (
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
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                <div className="p-6 rounded-xl border border-border bg-white shadow-sm">
                  <h3 className="font-semibold text-foreground mb-1">
                    Get Started Today
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Book a free consultation with our {service.title.toLowerCase()}{" "}
                    specialists.
                  </p>
                  <Link
                    href="/inquiry/visa"
                    className="block w-full text-center px-5 py-3 bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)] text-white font-semibold rounded-lg transition-colors text-sm"
                  >
                    Book Free Consultation
                  </Link>
                  <Link
                    href="/contact"
                    className="block w-full text-center px-5 py-3 mt-2 border border-border text-foreground/80 font-medium rounded-lg hover:bg-[var(--color-muted)] transition-colors text-sm"
                  >
                    Contact Us
                  </Link>
                </div>

                <div className="p-6 rounded-xl border border-border bg-[var(--color-muted)]">
                  <h3 className="font-semibold text-foreground mb-3">
                    Contact Our Team
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground">
                      <strong>Toll Free:</strong> {SITE_CONFIG.tollFree}
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Email:</strong> {SITE_CONFIG.email}
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Hours:</strong> Mon-Sat, 9 AM - 6 PM
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-xl border border-border">
                  <h3 className="font-semibold text-foreground mb-3">
                    Other Services
                  </h3>
                  <div className="space-y-2">
                    {[
                      { title: "Visa Consulting", slug: "visa-consulting" },
                      { title: "Travel Insurance", slug: "travel-insurance" },
                      { title: "Passport Services", slug: "passport-services" },
                      {
                        title: "Document Attestation",
                        slug: "document-attestation",
                      },
                      { title: "Corporate Travel", slug: "corporate-travel" },
                    ]
                      .filter((s) => s.slug !== service.slug)
                      .map((s) => (
                        <Link
                          key={s.slug}
                          href={`/services/${s.slug}`}
                          className="flex items-center gap-2 text-sm text-foreground/70 hover:text-[var(--color-primary)] transition-colors"
                        >
                          <ArrowRight className="h-3 w-3" />
                          {s.title}
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
