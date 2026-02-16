import type { Metadata } from "next";
import Link from "next/link";

import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "CloudTravelSolution privacy policy — how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white">
      <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Privacy Policy
          </h1>
          <p className="text-white/70 text-lg">
            Last updated: February 2026
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="prose prose-neutral max-w-none [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:text-foreground/70 [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:text-foreground/70 [&_ul]:mb-4 [&_li]:mb-1">
          <p>
            {SITE_CONFIG.name} (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to
            protecting your privacy. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you
            visit our website at {SITE_CONFIG.url} and use our services.
          </p>

          <h2>1. Information We Collect</h2>
          <p>We collect information that you provide directly to us, including:</p>
          <ul>
            <li>
              <strong>Personal Information:</strong> Name, email address, phone
              number, city, and other details you provide when submitting inquiry
              forms or contacting us.
            </li>
            <li>
              <strong>Travel Information:</strong> Destination country, visa
              type, travel dates, passport details, and related documents you
              share for visa processing.
            </li>
            <li>
              <strong>Communication Data:</strong> Records of your communication
              with us via email, phone, WhatsApp, or our website forms.
            </li>
            <li>
              <strong>Usage Data:</strong> Information about how you interact
              with our website, including pages visited, time spent, browser
              type, and device information — collected via analytics tools.
            </li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Process your visa applications and provide travel services</li>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Send you service-related updates and notifications</li>
            <li>Improve our website, services, and user experience</li>
            <li>Comply with legal obligations and regulatory requirements</li>
            <li>
              Send marketing communications (only with your explicit consent)
            </li>
          </ul>

          <h2>3. Information Sharing</h2>
          <p>
            We do not sell, trade, or rent your personal information. We may
            share your information with:
          </p>
          <ul>
            <li>
              <strong>Embassies and Consulates:</strong> As required for visa
              application processing.
            </li>
            <li>
              <strong>Service Partners:</strong> Travel insurance providers,
              airlines, and hotels necessary to deliver our services.
            </li>
            <li>
              <strong>Legal Authorities:</strong> When required by law, court
              order, or government regulation.
            </li>
          </ul>

          <h2>4. Data Security</h2>
          <p>
            We implement appropriate technical and organizational security
            measures to protect your personal information against unauthorized
            access, alteration, disclosure, or destruction. These include
            encrypted data transmission (SSL/TLS), secure data storage, access
            controls, and regular security reviews.
          </p>

          <h2>5. Cookies and Tracking</h2>
          <p>
            Our website uses cookies and similar technologies to enhance your
            browsing experience. These include:
          </p>
          <ul>
            <li>
              <strong>Essential Cookies:</strong> Required for website
              functionality.
            </li>
            <li>
              <strong>Analytics Cookies:</strong> Help us understand how visitors
              use our website (Google Analytics, Microsoft Clarity).
            </li>
            <li>
              <strong>Marketing Cookies:</strong> Used to deliver relevant
              advertisements (only with consent).
            </li>
          </ul>
          <p>
            You can control cookie preferences through your browser settings.
          </p>

          <h2>6. Data Retention</h2>
          <p>
            We retain your personal information only as long as necessary to
            fulfill the purposes for which it was collected, comply with legal
            obligations, resolve disputes, and enforce our agreements. Visa
            application data is retained for up to 3 years after service
            completion for reference purposes.
          </p>

          <h2>7. Your Rights</h2>
          <p>Under applicable Indian data protection laws, you have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your personal information</li>
            <li>Withdraw consent for marketing communications</li>
            <li>Lodge a complaint with relevant data protection authorities</li>
          </ul>

          <h2>8. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites (embassy
            portals, insurance providers, etc.). We are not responsible for the
            privacy practices of these external sites. We recommend reviewing
            their privacy policies independently.
          </p>

          <h2>9. Children&apos;s Privacy</h2>
          <p>
            Our services are not directed to individuals under 18 without
            parental/guardian involvement. We process minor passport and visa
            applications only with verified parental consent.
          </p>

          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will
            be posted on this page with an updated effective date. We encourage
            you to review this policy periodically.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or wish to exercise
            your data rights, please contact us:
          </p>
          <ul>
            <li>
              <strong>Email:</strong> privacy@cloudtravelsolution.com
            </li>
            <li>
              <strong>Phone:</strong> {SITE_CONFIG.tollFree}
            </li>
            <li>
              <strong>Office:</strong> CloudTravelSolution, Bangalore,
              Karnataka, India
            </li>
          </ul>
        </div>

        <div className="mt-10 pt-8 border-t border-border text-center">
          <Link
            href="/terms-of-service"
            className="text-[var(--color-primary)] font-medium hover:underline"
          >
            View Terms of Service
          </Link>
        </div>
      </div>
    </div>
  );
}
