import type React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import ChatWidget from "@/components/ui/chat-widget";
import { ConsentBanner } from "@/components/consent-banner";
import { connection } from "next/server";
import { getSiteSettings } from "@/lib/payload-data";

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();
  const faviconUrl = siteSettings.branding?.favicon?.url;

  if (faviconUrl) {
    return {
      icons: {
        icon: [
          { url: faviconUrl, sizes: "32x32", type: "image/png" },
          { url: faviconUrl, sizes: "16x16", type: "image/png" },
        ],
        apple: [
          { url: faviconUrl, sizes: "180x180", type: "image/png" },
        ],
      },
    };
  }

  return {
    icons: {
      icon: [
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon.ico", sizes: "48x48" },
      ],
      apple: [
        { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
  };
}

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connection();
  const siteSettings = await getSiteSettings();

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#0c6cbc] focus:shadow-lg"
      >
        Skip to content
      </a>
      <Header siteSettings={siteSettings} />
      <main id="main-content" className="min-h-screen">{children}</main>
      <Footer siteSettings={siteSettings} />
      <ChatWidget />
      <WhatsAppButton whatsappNumber={siteSettings.businessInfo.whatsappNumber} />
      <ScrollToTop />
      <ConsentBanner />
    </>
  );
}
