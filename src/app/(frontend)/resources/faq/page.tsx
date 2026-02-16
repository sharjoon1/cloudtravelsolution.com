"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  ChevronRight,
  FileCheck,
  Shield,
  BookOpen,
  Globe,
  HelpCircle,
} from "lucide-react";

const faqCategories = [
  {
    name: "Visa Process",
    slug: "visa-process",
    icon: FileCheck,
    faqs: [
      {
        question: "How do I start the visa application process with CloudTravelSolution?",
        answer:
          "Simply book a free consultation through our website or call our toll-free number. Our visa specialist will assess your travel plans, recommend the right visa type, provide a document checklist, and guide you through the entire process step by step.",
      },
      {
        question: "What is your visa approval success rate?",
        answer:
          "We maintain a 95%+ approval rate across all visa categories. Our thorough document verification, application review, and interview preparation processes significantly reduce the chance of rejection.",
      },
      {
        question: "How long does the visa process take?",
        answer:
          "Processing times vary by country and visa type. Tourist visas typically take 5-15 working days, business visas 7-20 days, and student/work visas 4-12 weeks. We provide estimated timelines specific to your case during the initial consultation.",
      },
      {
        question: "Can you help if my visa was previously rejected?",
        answer:
          "Yes, we specialize in reapplication cases. We thoroughly analyze your previous rejection letter, identify the issues, and build a significantly stronger application for your next attempt. Many of our successful cases are reapplications.",
      },
      {
        question: "Do you handle urgent/express visa processing?",
        answer:
          "Yes, we offer express processing for many countries. Availability and timelines depend on the destination country and embassy schedules. Contact us with your travel dates and we'll advise on the fastest possible processing option.",
      },
      {
        question: "What countries do you provide visa services for?",
        answer:
          "We provide visa consulting services for 190+ countries worldwide, including all major destinations like USA, UK, Canada, Australia, Schengen countries, Singapore, UAE, Japan, and more.",
      },
      {
        question: "What is the difference between a visa consultant and a travel agent?",
        answer:
          "A visa consultant specializes in visa applications, documentation, embassy procedures, and interview preparation. A travel agent focuses on bookings (flights, hotels, tours). CloudTravelSolution offers both — comprehensive visa consulting combined with full travel services.",
      },
    ],
  },
  {
    name: "Documents",
    slug: "documents",
    icon: BookOpen,
    faqs: [
      {
        question: "What documents are typically needed for a tourist visa?",
        answer:
          "Common documents include: valid passport (6+ months validity), completed application form, passport-size photographs, proof of financial stability (bank statements), travel itinerary, hotel bookings, travel insurance, employment/business proof, and a cover letter. Specific requirements vary by country.",
      },
      {
        question: "Do you help with document preparation and verification?",
        answer:
          "Absolutely. Document preparation is a core part of our service. We provide a personalized checklist, review every document for accuracy and completeness, flag potential issues, and ensure everything meets embassy requirements before submission.",
      },
      {
        question: "What if I don't have all the required documents?",
        answer:
          "During your consultation, we'll identify any missing documents and suggest alternatives or workarounds. In some cases, we can help you obtain documents (like travel insurance, cover letters, or financial statements) as part of our service.",
      },
      {
        question: "How many months of bank statements are typically required?",
        answer:
          "Most embassies require 3-6 months of bank statements. US, UK, and Schengen visa applications typically need 6 months. The required minimum balance varies by destination and trip duration.",
      },
      {
        question: "Do I need to get my documents attested?",
        answer:
          "Document attestation requirements depend on your purpose. Visa applications for tourism/business rarely need attestation. However, for work permits, student visas, or immigration, you may need MEA attestation, apostille, or embassy attestation. We offer all attestation services.",
      },
    ],
  },
  {
    name: "Fees & Payment",
    slug: "fees-payment",
    icon: Globe,
    faqs: [
      {
        question: "What are your service charges?",
        answer:
          "Our service fees vary by visa type and complexity. We provide a transparent fee breakdown during your initial consultation — no hidden charges. Our fees cover document preparation, application filing, appointment scheduling, and end-to-end support.",
      },
      {
        question: "Do I need to pay the embassy fee separately?",
        answer:
          "Yes, embassy/consulate visa fees are paid directly to the embassy and are separate from our service charges. We clearly break down both costs so you know exactly what you're paying.",
      },
      {
        question: "Is the consultation free?",
        answer:
          "Yes, your initial consultation is completely free. We assess your travel plans, explain the visa process, and provide a fee estimate — with no obligation to proceed.",
      },
      {
        question: "What if my visa gets rejected? Do I get a refund?",
        answer:
          "Embassy visa fees are non-refundable regardless of the outcome (this is an embassy policy). Our service fee refund policy depends on the stage of processing. We discuss this clearly before you begin the process.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept bank transfers (NEFT/IMPS/UPI), credit/debit cards, and cash payments at our office. For corporate clients, we offer monthly invoicing with NET-30 terms.",
      },
    ],
  },
  {
    name: "Travel Insurance",
    slug: "travel-insurance",
    icon: Shield,
    faqs: [
      {
        question: "Is travel insurance mandatory for visa applications?",
        answer:
          "Travel insurance is mandatory for Schengen visa applications (minimum EUR 30,000 coverage). Many other countries strongly recommend it. Even where not mandatory, we recommend travel insurance for every international trip.",
      },
      {
        question: "What does travel insurance typically cover?",
        answer:
          "Comprehensive travel insurance covers medical emergencies, hospitalization, emergency evacuation, trip cancellation, baggage loss/delay, flight delays, and personal liability. Specific coverage limits depend on the plan chosen.",
      },
      {
        question: "How much does travel insurance cost?",
        answer:
          "Travel insurance typically costs INR 500-2,000 for a short trip (7-15 days) and INR 3,000-8,000 for longer trips or higher coverage limits. Group and annual multi-trip plans offer better per-day rates.",
      },
      {
        question: "Can I buy travel insurance for a pre-existing condition?",
        answer:
          "Coverage for pre-existing conditions varies by insurer. We partner with insurers who offer plans covering specific conditions — discuss your health requirements during consultation and we'll find the right plan.",
      },
    ],
  },
  {
    name: "General",
    slug: "general",
    icon: HelpCircle,
    faqs: [
      {
        question: "Where are your offices located?",
        answer:
          "We currently have offices in Bangalore (Karnataka) and Hyderabad (Telangana). We're expanding to Delhi NCR and Chennai in 2026. You can also access all our services online — submit an inquiry through our website.",
      },
      {
        question: "What are your working hours?",
        answer:
          "Our offices are open Monday to Saturday, 9:00 AM to 6:00 PM IST. You can submit online inquiries 24/7 through our website, and we'll respond within 2 business hours.",
      },
      {
        question: "Can I track my visa application status?",
        answer:
          "Yes. Once your application is submitted, we provide regular status updates via email and WhatsApp. You can also contact your dedicated visa specialist anytime for a status check.",
      },
      {
        question: "Do you offer services for corporate/business travelers?",
        answer:
          "Yes, we have a dedicated corporate travel desk that handles business visa processing, flight/hotel bookings, travel policy management, MICE events, and 24/7 travel support for companies of all sizes.",
      },
      {
        question: "How can I contact CloudTravelSolution?",
        answer:
          "Call our toll-free number 1800-XXX-XXXX, email info@cloudtravelsolution.com, visit our offices in Bangalore or Hyderabad, or submit an inquiry through our website. We respond to all inquiries within 2 business hours.",
      },
    ],
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const allFaqs = faqCategories.flatMap((cat) =>
    cat.faqs.map((faq) => ({ ...faq, category: cat.slug, categoryName: cat.name }))
  );

  const filteredFaqs =
    activeCategory === "all"
      ? allFaqs
      : allFaqs.filter((faq) => faq.category === activeCategory);

  const searchedFaqs = searchQuery.trim()
    ? filteredFaqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredFaqs;

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Frequently Asked Questions
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Find answers to common questions about visa applications, documents,
            fees, and our services.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        {/* Search */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-border focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all text-sm"
            />
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors ${
              activeCategory === "all"
                ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                : "border-border hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
            }`}
          >
            All ({allFaqs.length})
          </button>
          {faqCategories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors ${
                activeCategory === cat.slug
                  ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                  : "border-border hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
              }`}
            >
              {cat.name} ({cat.faqs.length})
            </button>
          ))}
        </div>

        {/* FAQ list */}
        <div className="max-w-3xl mx-auto">
          {searchedFaqs.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">
                No FAQs found matching your search. Try different keywords or{" "}
                <Link
                  href="/contact"
                  className="text-[var(--color-primary)] font-medium hover:underline"
                >
                  contact us
                </Link>{" "}
                directly.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {searchedFaqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-lg border border-border"
                >
                  <summary className="flex items-center justify-between cursor-pointer px-5 py-4 text-sm font-medium text-foreground hover:bg-[var(--color-muted)] transition-colors rounded-lg">
                    <span className="pr-4">{faq.question}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-open:rotate-90 transition-transform shrink-0" />
                  </summary>
                  <div className="px-5 pb-4">
                    {activeCategory === "all" && (
                      <span className="inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full mb-2">
                        {faq.categoryName}
                      </span>
                    )}
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          )}
        </div>

        {/* Still have questions? */}
        <div className="text-center mt-14 p-10 rounded-2xl bg-[var(--color-muted)] border border-border max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Still Have Questions?
          </h2>
          <p className="text-muted-foreground mb-6">
            Our visa specialists are ready to help. Get in touch for a free,
            no-obligation consultation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/inquiry/visa"
              className="inline-flex items-center gap-2 px-7 py-3 bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)] text-white font-semibold rounded-lg transition-colors"
            >
              Book Free Consultation
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 border border-border text-foreground font-medium rounded-lg hover:bg-white transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
