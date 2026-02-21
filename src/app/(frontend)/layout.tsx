import type React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
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
      <Header siteSettings={siteSettings} />
      <main className="min-h-screen">{children}</main>
      <Footer siteSettings={siteSettings} />
      <WhatsAppButton whatsappNumber={siteSettings.businessInfo.whatsappNumber} />
      <ScrollToTop />
    </>
  );
}
