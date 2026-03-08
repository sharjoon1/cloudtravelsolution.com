import type { Metadata } from "next";
import { B2BForm } from "./b2b-form";
import { Users, Headphones, BarChart3, Percent } from "lucide-react";

export const metadata: Metadata = {
  title: "B2B Partners — Cloud Travel Solutions",
  description:
    "Partner with Cloud Travel Solutions for bulk visa processing. Special discounts for Education Consultancies and Manpower Agencies. Dedicated account management.",
};

export default function B2BPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0c6cbc] via-[#0a5a9e] to-[#094f8a] text-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Partner with Cloud Travel Solutions
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-6">
            Special bulk processing rates for Education Consultancies and
            Manpower Agencies. Get up to 20% discount on visa processing fees.
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#0cfcbc]/20 rounded-full text-[#0cfcbc] font-semibold">
            <Percent className="h-5 w-5" />
            Up to 20% Off on Bulk Processing
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0c6cbc] text-center mb-8">
            Why Partner With Us?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Percent,
                title: "Bulk Discounts",
                desc: "Up to 20% off on visa processing for high-volume partners",
              },
              {
                icon: Users,
                title: "Dedicated Account Manager",
                desc: "Personal point of contact for all your visa processing needs",
              },
              {
                icon: Headphones,
                title: "Priority Support",
                desc: "Fast-track processing and priority customer support",
              },
              {
                icon: BarChart3,
                title: "Real-time Tracking",
                desc: "Track all applications in real-time via partner dashboard",
              },
            ].map((item, i) => (
              <div key={i} className="group p-6 bg-[#e3ebf9] rounded-xl text-center hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                <div className="h-12 w-12 rounded-lg bg-white border-2 border-[#0c6cbc]/30 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#0cfcbc] group-hover:border-[#0cfcbc] transition-colors">
                  <item.icon className="h-6 w-6 text-[#009e7a] group-hover:text-[#094f8a] transition-colors" />
                </div>
                <h3 className="font-semibold text-[#0c6cbc] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 bg-[#e3ebf9]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-[#0c6cbc] mb-2">
              Register Your Interest
            </h2>
            <p className="text-muted-foreground mb-6">
              Fill in your details and our B2B team will contact you within 24
              hours.
            </p>
            <B2BForm />
          </div>
        </div>
      </section>
    </>
  );
}
