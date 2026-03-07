import * as React from "react";
import { cn } from "@/lib/utils";

const sectionVariants = {
  default: "bg-[#e3ebf9] text-[#1d1e20]",
  muted: "bg-[#ebe4ff] text-[#1d1e20]",
  primary: "bg-[#0c6cbc] text-white",
  dark: "bg-[#0c6cbc] text-white",
} as const;

type SectionVariant = keyof typeof sectionVariants;

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: SectionVariant;
  /** Tighter vertical padding */
  compact?: boolean;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = "default", compact = false, children, ...props }, ref) => (
    <section
      ref={ref}
      className={cn(
        // Vertical padding — responsive
        compact
          ? "py-8 sm:py-12"
          : "py-12 sm:py-16 lg:py-20",
        sectionVariants[variant],
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
);

Section.displayName = "Section";

export { Section, sectionVariants };
