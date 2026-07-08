import type { Metadata } from "next";
import { connection } from "next/server";
import Link from "next/link";

import { SITE_CONFIG } from "@/lib/constants";
import { getSiteSettings } from "@/lib/payload-data";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | Cloud Travel Solutions",
  description:
    "Cloud Travel Solutions refund & cancellation policy — refund eligibility tiers, processing timelines, and non-refundable government/embassy fees for our visa consulting services.",
  alternates: { canonical: `${SITE_CONFIG.url}/refund-policy` },
};

const TBC = "TBC";

export default async function RefundPolicyPage() {
  await connection();
  const { legal } = await getSiteSettings();
  const {
    gstin,
    cin,
    refundPolicy,
    grievanceOfficerName,
    grievanceOfficerEmail,
    grievanceOfficerPhone,
  } = legal;

  const showRegisteredDetails = Boolean(gstin || cin);

  return (
    <div className="bg-[#e3ebf9]">
      <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Refund &amp; Cancellation Policy
          </h1>
          <p className="text-white/70 text-lg">
            Last updated: July 2026
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="prose prose-neutral max-w-none [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:text-foreground/70 [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:text-foreground/70 [&_ul]:mb-4 [&_li]:mb-1">
          {refundPolicy ? (
            refundPolicy
              .split(/\n{2,}/)
              .map((para, i) => (
                <p key={i} className="whitespace-pre-line">
                  {para}
                </p>
              ))
          ) : (
            <>
              <p>
                This Refund &amp; Cancellation Policy explains the terms under
                which {SITE_CONFIG.name} (&quot;we&quot;, &quot;our&quot;, or
                &quot;us&quot;) processes cancellations and refunds for our visa
                consulting and travel services. By engaging our services and
                making any payment, you agree to the terms set out below.
              </p>

              <h2>1. Fee Structure</h2>
              <p>
                For clarity, the fees you pay fall into three categories, each
                with different refund treatment:
              </p>
              <ul>
                <li>
                  <strong>Service Fees:</strong> Our consulting and processing
                  charges for preparing, reviewing, and submitting your
                  application. Eligible for partial refund per the tiers below.
                </li>
                <li>
                  <strong>Government / Embassy Fees:</strong> Visa application
                  fees, appointment (VFS/biometric) fees, and other charges
                  levied by embassies, consulates, or government authorities.
                  These are <strong>non-refundable</strong> under all
                  circumstances.
                </li>
                <li>
                  <strong>Third-Party Fees:</strong> Travel insurance, courier,
                  translation, attestation, and similar outsourced services.
                  Refundable only per the respective third-party provider&apos;s
                  policy.
                </li>
              </ul>

              <h2>2. Refund Eligibility Tiers (Service Fees)</h2>
              <p>
                Eligibility for a refund of our service fees depends on the
                stage at which you cancel:
              </p>
              <ul>
                <li>
                  <strong>Tier 1 — Before document verification:</strong> If you
                  cancel before we begin verifying your documents, you are
                  eligible for a <strong>75% refund</strong> of the service fees
                  paid. A 25% administrative fee is retained to cover
                  onboarding, consultation, and file setup.
                </li>
                <li>
                  <strong>Tier 2 — After verification, before embassy
                  submission:</strong> If you cancel after document verification
                  but before your application is submitted to the
                  embassy/consulate, you are eligible for a{" "}
                  <strong>50% refund</strong> of the service fees paid, reflecting
                  the work completed.
                </li>
                <li>
                  <strong>Tier 3 — After embassy submission:</strong> Once your
                  application has been submitted to the embassy, consulate, or
                  visa processing centre, no refund of service fees is
                  available, as the consultation and processing work is
                  complete.
                </li>
              </ul>

              <h2>3. Non-Refundable Fees</h2>
              <p>The following are strictly non-refundable:</p>
              <ul>
                <li>
                  All government and embassy/consulate visa fees and appointment
                  fees, regardless of outcome — this is an embassy policy, not
                  ours.
                </li>
                <li>
                  Service fees for applications that result in a visa rejection,
                  withdrawal after submission, or abandonment by the applicant.
                </li>
                <li>
                  Applicable GST and any payment gateway or transaction charges.
                </li>
              </ul>

              <h2>4. Visa Rejection</h2>
              <p>
                Visa decisions are made solely by the embassy or consulate of the
                destination country. In the event of a visa rejection, no refund
                of service fees or embassy fees is applicable. However, we offer
                discounted re-application assistance to help you address the
                reasons for rejection and re-apply.
              </p>

              <h2>5. Processing Time</h2>
              <p>
                Approved refunds are processed within{" "}
                <strong>7 to 14 business days</strong> from the date of approval.
                Refunds are credited back to the original payment method used at
                the time of booking. Banking delays beyond our control may extend
                this timeline.
              </p>

              <h2>6. How to Request a Refund</h2>
              <p>To request a cancellation or refund, please:</p>
              <ul>
                <li>
                  Email our Grievance Redressal Officer (details below) or
                  {` `}{SITE_CONFIG.email} with your application/reference ID.
                </li>
                <li>
                  Include your full name, destination country, and the reason for
                  cancellation.
                </li>
                <li>
                  Allow 2 to 3 business days for our team to review and respond
                  to your request.
                </li>
              </ul>

              <h2>7. Modifications</h2>
              <p>
                We reserve the right to update this Refund &amp; Cancellation
                Policy at any time. Changes will be posted on this page with an
                updated effective date. Continued use of our services after
                changes constitutes acceptance of the revised policy.
              </p>
            </>
          )}
        </div>

        {/* Grievance Redressal Officer */}
        <div className="mt-8 rounded-2xl border border-border bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-4">
            Grievance Redressal Officer
          </h2>
          <p className="text-foreground/70 leading-relaxed mb-4">
            For any concerns, complaints, or refund escalation related to our
            services, please contact our designated Grievance Redressal Officer:
          </p>
          <ul className="space-y-2 text-foreground/80">
            <li>
              <strong>Name:</strong>{" "}
              {grievanceOfficerName || TBC}
            </li>
            <li>
              <strong>Email:</strong>{" "}
              {grievanceOfficerEmail ? (
                <a
                  href={`mailto:${grievanceOfficerEmail}`}
                  className="text-[var(--color-primary)] font-medium hover:underline"
                >
                  {grievanceOfficerEmail}
                </a>
              ) : (
                TBC
              )}
            </li>
            <li>
              <strong>Phone:</strong>{" "}
              {grievanceOfficerPhone ? (
                <a
                  href={`tel:${grievanceOfficerPhone.replace(/\s+/g, "")}`}
                  className="text-[var(--color-primary)] font-medium hover:underline"
                >
                  {grievanceOfficerPhone}
                </a>
              ) : (
                TBC
              )}
            </li>
          </ul>

          {showRegisteredDetails && (
            <div className="mt-6 pt-6 border-t border-border">
              <h3 className="text-sm font-semibold text-foreground mb-2">
                Registered Details
              </h3>
              <ul className="space-y-1 text-sm text-foreground/70">
                {gstin && (
                  <li>
                    <strong>GSTIN:</strong> {gstin}
                  </li>
                )}
                {cin && (
                  <li>
                    <strong>CIN:</strong> {cin}
                  </li>
                )}
              </ul>
            </div>
          )}
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
