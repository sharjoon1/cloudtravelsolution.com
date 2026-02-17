import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

import { SITE_CONFIG } from "@/lib/constants";
import type { SiteSettingsData } from "@/lib/payload-data";

type CTABannerProps = {
  ctaData?: {
    heading?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
  };
  siteSettings?: SiteSettingsData;
};

export function CTABanner({ ctaData, siteSettings }: CTABannerProps) {
  const heading = ctaData?.heading || "Ready to Start Your Journey?";
  const description =
    ctaData?.description ||
    "Get expert visa guidance from India's trusted travel consultants. Book a free consultation today and let us handle the paperwork.";
  const buttonText = ctaData?.buttonText || "Book Free Consultation";
  const buttonLink = ctaData?.buttonLink || "/inquiry/visa";
  const tollFree = siteSettings?.businessInfo?.tollFreeNumber || SITE_CONFIG.tollFree;

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          {heading}
        </h2>
        <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={buttonLink}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)] text-white font-semibold rounded-lg transition-colors shadow-lg"
          >
            {buttonText}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={`tel:${tollFree}`}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors backdrop-blur"
          >
            <Phone className="h-4 w-4" />
            Call {tollFree}
          </a>
        </div>
      </div>
    </section>
  );
}
