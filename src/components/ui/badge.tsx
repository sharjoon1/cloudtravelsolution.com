import * as React from "react";
import { cn } from "@/lib/utils";

const badgeVariants = {
  default:
    "bg-[#673de6]/10 text-[#673de6] border-[#673de6]/20",
  success:
    "bg-[#00b090]/10 text-[#00b090] border-[#00b090]/20",
  warning:
    "bg-[#fc5185]/10 text-[#fc5185] border-[#fc5185]/20",
  error:
    "bg-red-50 text-red-700 border-red-200",
  info:
    "bg-sky-50 text-sky-700 border-sky-200",
  outline:
    "bg-transparent text-gray-700 border-gray-300",
} as const;

type BadgeVariant = keyof typeof badgeVariants;

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  /** Render a small dot indicator before the label */
  dot?: boolean;
}

const dotColors: Record<BadgeVariant, string> = {
  default: "bg-[#673de6]",
  success: "bg-[#00b090]",
  warning: "bg-[#fc5185]",
  error: "bg-red-600",
  info: "bg-sky-600",
  outline: "bg-gray-500",
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
