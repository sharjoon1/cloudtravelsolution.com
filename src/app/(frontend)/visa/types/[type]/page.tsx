import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Palmtree,
  Briefcase,
  GraduationCap,
  HardHat,
  Plane,
  HeartPulse,
  Globe,
  ArrowRight,
} from "lucide-react";

import {
  getCountriesByVisaType,
  getVisaTypeCategoryBySlug,
  getAllVisaTypeSlugs,
} from "@/lib/visa-data";
import { SITE_CONFIG } from "@/lib/constants";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CTABanner } from "@/components/sections/cta-banner";

interface PageProps {
  params: Promise<{ type: string }>;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Palmtree,
  Briefcase,
  GraduationCap,
  HardHat,
  Plane,
  HeartPulse,
};

export async function generateStaticParams() {
  return getAllVisaTypeSlugs().map((type) => ({ type }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { type: typeSlug } = await params;
  const category = getVisaTypeCategoryBySlug(typeSlug);
  if (!category) return {};

  return {
    title: `${category.name} for Indian Citizens — Requirements, Fees & Countries`,
    description: `Compare ${category.name.toLowerCase()} requirements, fees, and processing times across ${getCountriesByVisaType(typeSlug).length}+ countries. Expert ${category.name.toLowerCase()} assistance from ${SITE_CONFIG.name}.`,
    openGraph: {
      title: `${category.name} — All Countries | ${SITE_CONFIG.name}`,
      description: `Browse all countries offering ${category.name.toLowerCase()} for Indian passport holders. Compare fees, processing times, and apply with expert guidance.`,
    },
  };
}

function formatFee(fee: { embassyFee: number; currency: string }): string {
  if (fee.embassyFee === 0) return "Free";
  return `${fee.currency} ${fee.embassyFee.toLocaleString("en-IN")}`;
}

export default async function VisaTypeDetailPage({ params }: PageProps) {
  const { type: typeSlug } = await params;
  const category = getVisaTypeCategoryBySlug(typeSlug);

  if (!category) {
    notFound();
  }

  const countriesWithVisa = getCountriesByVisaType(typeSlug);
  const Icon = iconMap[category.icon] || Globe;

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Visa", href: "/visa" },
    { name: "Visa Types", href: "/visa/types" },
    { name: category.name, href: `/visa/types/${category.slug}` },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbs} />

      <div className="bg-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-white/10 backdrop-blur">
                <Icon className="h-7 w-7" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold">
                  {category.name}
                </h1>
                <p className="text-white/70 mt-1">{category.description}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-6 text-sm">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur">
                <Globe className="h-3.5 w-3.5" />
                {countriesWithVisa.length}{" "}
                {countriesWithVisa.length === 1 ? "country" : "countries"}{" "}
                available
              </span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          {countriesWithVisa.length > 0 ? (
            <>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Countries Offering {category.name}
              </h2>

              {/* Comparison table */}
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[var(--color-muted)] border-b border-border">
                      <th className="text-left px-4 py-3 font-semibold text-foreground whitespace-nowrap">
                        Country
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground whitespace-nowrap">
                        Specific Visa Name
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground whitespace-nowrap">
                        Embassy Fee
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground whitespace-nowrap">
                        Processing Time
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground whitespace-nowrap">
                        Validity
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground whitespace-nowrap">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {countriesWithVisa.map(({ country, visaDetail }) => (
                      <tr
                        key={country.slug}
                        className="hover:bg-[var(--color-muted)]/50 transition-colors"
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          <Link
                            href={`/visa/${country.slug}`}
                            className="flex items-center gap-2 font-medium text-foreground hover:text-[var(--color-primary)] transition-colors"
                          >
                            <span className="text-xl">{country.flag}</span>
                            {country.name}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {visaDetail.type}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                          {formatFee(visaDetail.fee)}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                          {visaDetail.processingTime}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {visaDetail.validity}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <Link
                            href={`/visa/${country.slug}`}
                            className="inline-flex items-center gap-1 text-xs font-medium text-[var(--color-primary)] hover:underline"
                          >
                            Details
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile-friendly card list (visible on small screens) */}
              <div className="mt-6 space-y-3 lg:hidden">
                {countriesWithVisa.map(({ country, visaDetail }) => (
                  <Link
                    key={`card-${country.slug}`}
                    href={`/visa/${country.slug}`}
                    className="group block p-4 rounded-lg border border-border hover:border-[var(--color-primary)]/30 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{country.flag}</span>
                        <span className="font-semibold text-foreground group-hover:text-[var(--color-primary)] transition-colors">
                          {country.name}
                        </span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-[var(--color-primary)] transition-colors" />
                    </div>
                    <div className="text-xs text-muted-foreground mb-1">
                      {visaDetail.type}
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span>
                        <strong>Fee:</strong> {formatFee(visaDetail.fee)}
                      </span>
                      <span>
                        <strong>Time:</strong> {visaDetail.processingTime}
                      </span>
                      <span>
                        <strong>Valid:</strong> {visaDetail.validity}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-14">
              <Icon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-bold text-foreground mb-2">
                No Countries Listed Yet
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                We are currently updating our database with {category.name.toLowerCase()}{" "}
                information. Contact us for assistance with any destination.
              </p>
              <Link
                href="/inquiry/visa"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)] text-white font-semibold rounded-lg transition-colors text-sm"
              >
                Get Expert Help
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}

          {/* Browse other types */}
          <div className="mt-14 pt-8 border-t border-border">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Browse Other Visa Types
            </h2>
            <div className="flex flex-wrap gap-3">
              {getAllVisaTypeSlugs()
                .filter((slug) => slug !== typeSlug)
                .map((slug) => {
                  const cat = getVisaTypeCategoryBySlug(slug);
                  if (!cat) return null;
                  return (
                    <Link
                      key={slug}
                      href={`/visa/types/${slug}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-[var(--color-primary)]/30 hover:shadow-sm text-sm font-medium text-foreground hover:text-[var(--color-primary)] transition-all"
                    >
                      {cat.name}
                    </Link>
                  );
                })}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-14 p-10 rounded-2xl bg-[var(--color-muted)] border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Need Help with Your {category.name} Application?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Our visa specialists have extensive experience with{" "}
              {category.name.toLowerCase()} applications. Get personalized
              guidance for your specific destination.
            </p>
            <Link
              href="/inquiry/visa"
              className="inline-flex items-center gap-2 px-7 py-3 bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)] text-white font-semibold rounded-lg transition-colors"
            >
              Book Free Consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <CTABanner />
    </>
  );
}
