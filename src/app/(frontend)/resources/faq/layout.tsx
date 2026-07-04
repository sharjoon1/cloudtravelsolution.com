import type { Metadata } from "next";

// /resources/faq is a client component (it uses useState for search/filter), so
// it can't export metadata itself. This server layout supplies the page metadata
// (title/description/canonical/OG) that the route was previously missing, while
// leaving the client page untouched. The FAQPage JSON-LD stays in the page.
export const metadata: Metadata = {
  title: "FAQ — Visa & Travel Questions Answered",
  description:
    "Answers to common questions about visa applications, required documents, fees, processing times, travel insurance, and Cloud Travel Solutions' services across India.",
  alternates: { canonical: "/resources/faq" },
  openGraph: {
    title: "FAQ — Visa & Travel Questions Answered | Cloud Travel Solutions",
    description:
      "Visa process, documents, fees, and travel insurance FAQs — answered by India's visa consulting specialists.",
    type: "article",
  },
};

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
