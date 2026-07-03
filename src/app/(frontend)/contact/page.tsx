import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, Clock } from "lucide-react";

import { LOCATIONS, SITE_CONFIG } from "@/lib/constants";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Cloud Travel Solutions. Visit our offices in Bangalore, Hyderabad, Delhi, or Chennai. Call us toll-free or submit an online inquiry.",
};

export default function ContactPage() {
  return (
    <>
    <Breadcrumb
      items={[
        { name: "Home", href: "/" },
        { name: "Contact", href: "/contact" },
      ]}
    />

    <div className="bg-[#e3ebf9]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Contact Us</h1>
          <p className="text-white/70 text-lg">
            We&apos;re here to help with all your visa and travel needs
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        {/* Quick contact */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <a
            href={`tel:${SITE_CONFIG.tollFree}`}
            className="flex items-center gap-4 p-5 rounded-xl border border-border hover:border-[var(--color-primary)]/30 hover:shadow-sm transition-all"
          >
            <div className="h-12 w-12 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center">
              <Phone className="h-6 w-6 text-[var(--color-primary)]" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Toll Free</div>
              <div className="font-semibold">{SITE_CONFIG.tollFree}</div>
            </div>
          </a>

          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="flex items-center gap-4 p-5 rounded-xl border border-border hover:border-[var(--color-primary)]/30 hover:shadow-sm transition-all"
          >
            <div className="h-12 w-12 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center">
              <Mail className="h-6 w-6 text-[var(--color-primary)]" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Email</div>
              <div className="font-semibold text-sm">{SITE_CONFIG.email}</div>
            </div>
          </a>

          <div className="flex items-center gap-4 p-5 rounded-xl border border-border">
            <div className="h-12 w-12 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center">
              <Clock className="h-6 w-6 text-[var(--color-primary)]" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Working Hours</div>
              <div className="font-semibold">Mon-Sat, 9 AM - 6 PM</div>
            </div>
          </div>
        </div>

        {/* Office locations */}
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Our Office Locations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {LOCATIONS.map((location) => (
            <Link
              key={location.slug}
              href={`/locations/${location.slug}`}
              className="p-6 rounded-xl border border-border hover:border-[var(--color-primary)]/30 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-[var(--color-primary)] transition-colors">
                  {location.city}
                </h3>
                {location.status === "coming-soon" && (
                  <span className="px-2 py-0.5 text-[10px] font-semibold uppercase bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] rounded-full">
                    Coming Soon
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {location.state}, India
              </p>
              {location.status === "active" && (
                <div className="space-y-1.5 text-sm text-muted-foreground">
                  {location.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5" />
                      {location.phone}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5" />
                    {location.email}
                  </div>
                </div>
              )}
            </Link>
          ))}
        </div>

        {/* Contact form */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-foreground mb-3">Send Us a Message</h2>
            <p className="text-muted-foreground mb-4">
              Have a question? Fill out the form and our visa specialists will get back to you within 2 business hours.
            </p>
            <div className="rounded-xl border border-border bg-[var(--color-muted)] p-5 text-sm">
              <p className="font-medium text-foreground mb-1">Need a detailed visa inquiry?</p>
              <Link
                href="/inquiry/visa"
                className="text-[var(--color-primary)] font-medium hover:underline"
              >
                Use our full visa inquiry form →
              </Link>
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-border bg-white p-6 sm:p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
