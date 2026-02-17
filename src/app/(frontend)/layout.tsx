import type React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { connection } from "next/server";
import { getSiteSettings } from "@/lib/payload-data";

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
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
}
