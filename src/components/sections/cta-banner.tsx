import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

import { SITE_CONFIG } from "@/lib/constants";

export function CTABanner() {
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Ready to Start Your Journey?
        </h2>
        <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
          Get expert visa guidance from India&apos;s trusted travel consultants.
          Book a free consultation today and let us handle the paperwork.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/inquiry/visa"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)] text-white font-semibold rounded-lg transition-colors shadow-lg"
          >
            Book Free Consultation
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={`tel:${SITE_CONFIG.tollFree}`}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors backdrop-blur"
          >
            <Phone className="h-4 w-4" />
            Call {SITE_CONFIG.tollFree}
          </a>
        </div>
      </div>
    </section>
  );
}
