import type { Metadata } from "next";

// /track is a client component (it uses useState for the lookup form), so it
// can't export metadata itself. This server layout supplies the page metadata
// (title/description/canonical/OG) that the route was previously missing, while
// leaving the client page untouched.
export const metadata: Metadata = {
  title: "Track Your Visa Application | Cloud Travel Solutions",
  description:
    "Check the real-time status of your visa or service application with your tracking code or passport number. Fast, secure tracking from Cloud Travel Solutions.",
  alternates: { canonical: "/track" },
  openGraph: {
    title: "Track Your Visa Application | Cloud Travel Solutions",
    description:
      "Check the status of your visa application anytime with your tracking code or passport number.",
    type: "website",
  },
};

export default function TrackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
