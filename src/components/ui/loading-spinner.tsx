import * as React from "react";
import { cn } from "@/lib/utils";

const spinnerSizes = {
  xs: "h-3 w-3 border",
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-8 w-8 border-[3px]",
  xl: "h-12 w-12 border-[3px]",
} as const;

type SpinnerSize = keyof typeof spinnerSizes;

export interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Diameter of the spinner */
  size?: SpinnerSize;
  /** Colour of the spinning arc — accepts any Tailwind border-color class */
  color?: string;
  /** Accessible label for screen readers */
  label?: string;
}

const LoadingSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  (
    {
      className,
      size = "md",
      color = "border-[#1B4D7A]",
      label = "Loading",
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      role="status"
      aria-label={label}
      className={cn("inline-flex items-center justify-center", className)}
      {...props}
    >
      <div
        className={cn(
          "animate-spin rounded-full border-gray-200",
          spinnerSizes[size],
          color
        )}
        style={{
          borderTopColor: "transparent",
        }}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </div>
  )
);

LoadingSpinner.displayName = "LoadingSpinner";

export { LoadingSpinner, spinnerSizes };
