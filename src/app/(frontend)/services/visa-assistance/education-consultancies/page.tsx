import type { Metadata } from "next";
import Link from "next/link";
import {
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { EDUCATION_CONSULTANCY_DATA } from "@/lib/services-data";
import { CTABanner } from "@/components/sections/cta-banner";

export const metadata: Metadata = {
  title: "Visa Assistance for Education Consultancies | Cloud Travel Solutions",
  description: EDUCATION_CONSULTANCY_DATA.metaDescription,
};

export default function EducationConsultanciesPage() {
  const data = EDUCATION_CONSULTANCY_DATA;

  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-[#e3ebf9] border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-[#0c6cbc]">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/services" className="hover:text-[#0c6cbc]">
              Services
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link
              href="/services/visa-assistance"
              className="hover:text-[#0c6cbc]"
            >
              Visa Assistance
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#0c6cbc] font-medium">
              Education Consultancies
            </span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0c6cbc] via-[#0a5a9e] to-[#094f8a] text-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-lg bg-[#0cfcbc]/20 flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-[#0cfcbc]" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              {data.title}
            </h1>
            <p className="text-lg text-white/80 mb-6">{data.tagline}</p>
            <Link
              href="/b2b"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0cfcbc] text-[#094f8a] font-bold rounded-lg hover:bg-[#0adba5] transition-colors"
            >
              Become a Partner
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {data.description}
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-[#e3ebf9]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0c6cbc] mb-8">
            What We Offer
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {data.features.map((feature, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 bg-white rounded-lg"
              >
                <CheckCircle2 className="h-5 w-5 text-[#0cfcbc] mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0c6cbc] mb-8">
            Our Process
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.process.map((step, i) => (
              <div key={i} className="relative p-6 bg-[#e3ebf9] rounded-xl">
                <div className="text-3xl font-bold text-[#0cfcbc]/30 mb-2">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-semibold text-[#0c6cbc] mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 bg-[#e3ebf9]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0c6cbc] mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 max-w-3xl">
            {data.faqs.map((faq, i) => (
              <details key={i} className="group bg-white rounded-lg p-4">
                <summary className="font-medium text-gray-800 cursor-pointer list-none flex items-center justify-between">
                  {faq.question}
                  <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner />
    </>
  );
}
