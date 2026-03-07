import * as React from "react";
import { cn } from "@/lib/utils";

const badgeVariants = {
  default:
    "bg-[#0c6cbc]/10 text-[#0c6cbc] border-[#0c6cbc]/20",
  success:
    "bg-[#00b090]/10 text-[#008f75] border-[#00b090]/20",
  warning:
    "bg-[#ffcd35]/10 text-[#8a6d00] border-[#ffcd35]/30",
  error:
    "bg-[#fc5185]/10 text-[#d63d62] border-[#fc5185]/20",
  info:
    "bg-[#0c6cbc]/10 text-[#2a63c7] border-[#0c6cbc]/20",
  outline:
    "bg-transparent text-[#36344d] border-[#dadce0]",
} as const;

type BadgeVariant = keyof typeof badgeVariants;

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  /** Render a small dot indicator before the label */
  dot?: boolean;
}

const dotColors: Record<BadgeVariant, string> = {
  default: "bg-[#0c6cbc]",
  success: "bg-[#00b090]",
  warning: "bg-[#ffcd35]",
  error: "bg-[#fc5185]",
  info: "bg-[#0c6cbc]",
  outline: "bg-[#727586]",
};

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", dot = false, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        // Base styles
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5",
        "text-xs font-medium leading-normal whitespace-nowrap",
        "transition-colors duration-150",
        // Variant
        badgeVariants[variant],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn("h-1.5 w-1.5 shrink-0 rounded-full", dotColors[variant])}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  )
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };
