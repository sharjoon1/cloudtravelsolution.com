import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { GoogleTagManager, GTMNoScript } from "@/components/analytics/gtm";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default: "CloudTravelSolution — Your Trusted Visa & Travel Partner Across India",
    template: "%s | CloudTravelSolution",
  },
  description:
    "India's leading visa consulting and travel agency. Expert visa services for all countries from Bangalore, Hyderabad, Delhi, and Chennai. Pan India presence.",
  keywords: [
    "visa consultant India",
    "travel agency India",
    "visa services Bangalore",
    "visa services Hyderabad",
    "visa consultant Delhi",
    "visa consultant Chennai",
    "tourist visa",
    "business visa",
    "student visa",
    "travel agency",
  ],
  authors: [{ name: "CloudTravelSolution" }],
  creator: "CloudTravelSolution",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "CloudTravelSolution",
    title: "CloudTravelSolution — Your Trusted Visa & Travel Partner Across India",
    description:
      "India's leading visa consulting and travel agency. Expert visa services for all countries.",
  },
  twitter: {
    card: "summary_large_image",
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable}`}>
      <head>
        <GoogleAnalytics />
        <GoogleTagManager />
      </head>
      <body className="min-h-screen antialiased">
        <GTMNoScript />
        {children}
      </body>
    </html>
  );
}
