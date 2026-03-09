import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Unsubscribe — Cloud Travel Solutions",
};

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;

  const messages: Record<string, { icon: React.ReactNode; title: string; text: string }> = {
    success: {
      icon: <CheckCircle2 className="h-16 w-16 text-[#009e7a]" />,
      title: "You've been unsubscribed",
      text: "You will no longer receive marketing emails from Cloud Travel Solutions. If this was a mistake, you can re-subscribe anytime from our website.",
    },
    already: {
      icon: <AlertCircle className="h-16 w-16 text-[#0c6cbc]" />,
      title: "Already unsubscribed",
      text: "This email address has already been unsubscribed from our mailing list.",
    },
    invalid: {
      icon: <XCircle className="h-16 w-16 text-red-500" />,
      title: "Invalid link",
      text: "This unsubscribe link is invalid or has expired. Please contact us at info@cloudtravelsolution.com if you need help.",
    },
    error: {
      icon: <XCircle className="h-16 w-16 text-red-500" />,
      title: "Something went wrong",
      text: "We couldn't process your unsubscribe request. Please try again or contact us at info@cloudtravelsolution.com.",
    },
  };

  const msg = messages[status || "invalid"] || messages.invalid;

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-[#e3ebf9]">
      <div className="max-w-md mx-auto px-6 py-16 text-center">
        <div className="flex justify-center mb-6">{msg.icon}</div>
        <h1 className="text-2xl font-bold text-[#0c6cbc] mb-3">{msg.title}</h1>
        <p className="text-muted-foreground leading-relaxed">{msg.text}</p>
        <Link
          href="/"
          className="inline-block mt-8 px-6 py-3 bg-[#0cfcbc] hover:bg-[#0adba5] text-[#094f8a] font-semibold rounded-lg transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
