"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

import { cn } from "@/lib/utils";

const testimonials = [
  {
    clientName: "Rajesh Kumar",
    company: "TechVision Solutions",
    serviceUsed: "US Business Visa",
    reviewText:
      "CloudTravelSolution made our US visa process incredibly smooth. Their team handled all the documentation and prep, and our entire team got approved on the first attempt. Highly recommended for corporate travel needs!",
    rating: 5,
    city: "Bangalore",
  },
  {
    clientName: "Priya Sharma",
    serviceUsed: "Schengen Tourist Visa",
    reviewText:
      "I was nervous about applying for a Schengen visa, but the team guided me through every step. From document preparation to interview tips, they covered everything. Got my visa in just 10 days!",
    rating: 5,
    city: "Hyderabad",
  },
  {
    clientName: "Mohammed Faisal",
    company: "Global Exports Ltd",
    serviceUsed: "UK Business Visa",
    reviewText:
      "Excellent service! They understood our tight timeline and expedited the process. Their knowledge of UK visa requirements is exceptional. We've now made them our permanent travel partner.",
    rating: 5,
    city: "Bangalore",
  },
  {
    clientName: "Anita Desai",
    serviceUsed: "Canada Student Visa",
    reviewText:
      "My daughter's Canada student visa was handled perfectly. They knew exactly what documents were needed and prepared everything meticulously. The counselors were always available for our questions.",
    rating: 5,
    city: "Hyderabad",
  },
  {
    clientName: "Vikram Patel",
    company: "Patel Industries",
    serviceUsed: "Multiple Country Visas",
    reviewText:
      "We process 50+ visas annually through CloudTravelSolution. Their consistency, reliability, and professionalism are unmatched. They truly understand the needs of growing Indian businesses.",
    rating: 5,
    city: "Bangalore",
  },
];

type TestimonialsProps = {
  headings?: {
    testimonialsHeading?: string;
    testimonialsSubheading?: string;
  };
};

export function Testimonials({ headings }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const heading = headings?.testimonialsHeading || "What Our Clients Say";
  const subheading =
    headings?.testimonialsSubheading ||
    "Trusted by thousands of happy travelers and businesses across India.";

  const next = () =>
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  const testimonial = testimonials[currentIndex];

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            {heading}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {subheading}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative bg-[var(--color-muted)] rounded-2xl p-8 sm:p-10">
            <Quote className="absolute top-6 left-6 h-8 w-8 text-[var(--color-primary)]/15" />

            {/* Stars */}
            <div className="flex items-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-5 w-5",
                    i < testimonial.rating
                      ? "text-[var(--color-secondary)] fill-[var(--color-secondary)]"
                      : "text-gray-300"
                  )}
                />
              ))}
            </div>

            {/* Review */}
            <blockquote className="text-lg sm:text-xl text-foreground/90 leading-relaxed mb-6 italic">
              &ldquo;{testimonial.reviewText}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-foreground">
                  {testimonial.clientName}
                </div>
                <div className="text-sm text-muted-foreground">
                  {testimonial.company && `${testimonial.company} · `}
                  {testimonial.serviceUsed} · {testimonial.city}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prev}
                  className="h-9 w-9 rounded-full border border-border flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="h-9 w-9 rounded-full border border-border flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-1.5 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentIndex(i)}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    i === currentIndex
                      ? "w-6 bg-[var(--color-primary)]"
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                  )}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
