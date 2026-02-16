import type { Metadata } from "next";
import Link from "next/link";

import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "CloudTravelSolution terms of service — terms and conditions governing the use of our visa consulting and travel services.",
};

export default function TermsOfServicePage() {
  return (
    <div className="bg-white">
      <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Terms of Service
          </h1>
          <p className="text-white/70 text-lg">
            Last updated: February 2026
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="prose prose-neutral max-w-none [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:text-foreground/70 [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:text-foreground/70 [&_ul]:mb-4 [&_li]:mb-1">
          <p>
            Please read these Terms of Service (&quot;Terms&quot;) carefully before
            using the services of {SITE_CONFIG.name} (&quot;we&quot;, &quot;our&quot;, or
            &quot;us&quot;). By using our website or engaging our services, you agree to
            be bound by these Terms.
          </p>

          <h2>1. Services</h2>
          <p>
            {SITE_CONFIG.name} provides visa consulting, travel insurance,
            passport assistance, document attestation, and corporate travel
            management services. We act as facilitators and consultants — we
            assist with application preparation and submission but do not
            guarantee visa approval, as final decisions rest solely with the
            respective embassies, consulates, and government authorities.
          </p>

          <h2>2. Service Engagement</h2>
          <p>
            Our service engagement begins when you submit an inquiry and we
            confirm acceptance of your case. A detailed scope of work, fee
            estimate, and timeline will be provided before any payment is
            collected. By proceeding with payment, you agree to the stated scope
            and fees.
          </p>

          <h2>3. Client Responsibilities</h2>
          <p>As a client, you agree to:</p>
          <ul>
            <li>
              Provide accurate, complete, and truthful information for all
              applications
            </li>
            <li>
              Submit all required documents within the agreed timeline
            </li>
            <li>
              Attend embassy interviews and appointments as scheduled
            </li>
            <li>
              Inform us immediately of any changes to your travel plans or
              personal details
            </li>
            <li>
              Not provide forged, fake, or misleading documents (this is a
              criminal offense)
            </li>
          </ul>

          <h2>4. Fees and Payment</h2>
          <ul>
            <li>
              <strong>Service Fees:</strong> Our consulting and processing fees
              are quoted per case and are payable as per the agreed payment
              schedule.
            </li>
            <li>
              <strong>Embassy Fees:</strong> Visa fees, appointment fees, and
              other charges payable to embassies/consulates are separate and are
              the client&apos;s responsibility.
            </li>
            <li>
              <strong>Third-Party Fees:</strong> Costs for travel insurance,
              courier, translation, attestation, and other third-party services
              are billed separately.
            </li>
            <li>
              <strong>Taxes:</strong> All fees are subject to applicable GST as
              per Indian tax regulations.
            </li>
          </ul>

          <h2>5. Cancellation and Refund Policy</h2>
          <ul>
            <li>
              <strong>Before Application Submission:</strong> If you cancel
              before we submit your application, a partial refund will be
              provided after deducting charges for work already completed.
            </li>
            <li>
              <strong>After Application Submission:</strong> No refund of
              service fees is available once your application has been submitted
              to the embassy/consulate.
            </li>
            <li>
              <strong>Embassy Fees:</strong> Visa fees paid to embassies are
              non-refundable under all circumstances (this is an embassy policy,
              not ours).
            </li>
            <li>
              <strong>Visa Rejection:</strong> In the event of visa rejection,
              no refund of service fees or embassy fees is applicable. However,
              we offer discounted re-application assistance.
            </li>
          </ul>

          <h2>6. No Guarantee of Visa Approval</h2>
          <p>
            We explicitly state that{" "}
            <strong>
              no visa consultant can guarantee visa approval
            </strong>
            . Visa decisions are made solely by the embassy/consulate of the
            destination country. Our role is to prepare the strongest possible
            application and guide you through the process. Any agent claiming to
            guarantee visa approval should be treated with caution.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>{SITE_CONFIG.name} shall not be liable for:</p>
          <ul>
            <li>Visa rejection or delays caused by embassy/consulate decisions</li>
            <li>
              Losses arising from incorrect information provided by the client
            </li>
            <li>
              Changes in embassy policies, fees, or procedures after application
              submission
            </li>
            <li>
              Delays or losses caused by courier services, government agencies,
              or third parties
            </li>
            <li>
              Travel disruptions, cancellations, or losses beyond our control
            </li>
          </ul>
          <p>
            Our total liability in any case shall not exceed the service fee
            paid by the client for the specific service in question.
          </p>

          <h2>8. Intellectual Property</h2>
          <p>
            All content on our website — including text, graphics, logos,
            images, and software — is the property of {SITE_CONFIG.name} and is
            protected by Indian intellectual property laws. Unauthorized use,
            reproduction, or distribution is prohibited.
          </p>

          <h2>9. Confidentiality</h2>
          <p>
            We treat all client information as strictly confidential. Personal
            documents and data shared for visa processing will only be used for
            the stated purpose and will not be shared with unauthorized third
            parties. See our{" "}
            <Link
              href="/privacy-policy"
              className="text-[var(--color-primary)] hover:underline"
            >
              Privacy Policy
            </Link>{" "}
            for details.
          </p>

          <h2>10. Dispute Resolution</h2>
          <p>
            Any disputes arising from these Terms or our services shall be
            resolved through amicable negotiation first. If unresolved, disputes
            shall be subject to the exclusive jurisdiction of the courts in
            Bangalore, Karnataka, India. Indian law shall govern these Terms.
          </p>

          <h2>11. Website Use</h2>
          <p>By using our website, you agree to:</p>
          <ul>
            <li>Use the website only for lawful purposes</li>
            <li>Not attempt to gain unauthorized access to any part of the website</li>
            <li>Not use automated tools to scrape or harvest content</li>
            <li>Not submit false information through our forms</li>
          </ul>

          <h2>12. Modifications</h2>
          <p>
            We reserve the right to modify these Terms at any time. Changes
            will be posted on this page with an updated effective date.
            Continued use of our services after changes constitutes acceptance
            of the modified Terms.
          </p>

          <h2>13. Contact Us</h2>
          <p>For questions about these Terms of Service:</p>
          <ul>
            <li>
              <strong>Email:</strong> legal@cloudtravelsolution.com
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
            href="/privacy-policy"
            className="text-[var(--color-primary)] font-medium hover:underline"
          >
            View Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
