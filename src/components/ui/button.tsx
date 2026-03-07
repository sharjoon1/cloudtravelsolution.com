import * as React from "react";
import { cn } from "@/lib/utils";

const spinnerSizes = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
} as const;

const buttonVariants = {
  primary:
    "bg-[#0cfcbc] text-[#0c6cbc] font-bold hover:bg-[#0adba5] active:bg-[#08b88c] focus-visible:ring-[#0cfcbc]/40",
  secondary:
    "bg-[#0cfcbc] text-[#0c6cbc] font-bold hover:bg-[#0adba5] active:bg-[#08b88c] focus-visible:ring-[#0cfcbc]/40",
  accent:
    "bg-[#00b090] text-white font-semibold hover:bg-[#008f75] active:bg-[#007a65] focus-visible:ring-[#00b090]/40",
  outline:
    "border-2 border-[#0c6cbc] text-[#0c6cbc] bg-transparent hover:bg-[#0c6cbc]/5 active:bg-[#0c6cbc]/10 focus-visible:ring-[#0c6cbc]/40",
  ghost:
    "text-[#0c6cbc] bg-transparent hover:bg-[#0c6cbc]/5 active:bg-[#0c6cbc]/10 focus-visible:ring-[#0c6cbc]/40",
  destructive:
    "bg-[#fc5185] text-white hover:bg-[#e8456f] active:bg-[#d63d62] focus-visible:ring-[#fc5185]/40",
} as const;

const buttonSizes = {
  sm: "h-8 px-3 text-sm gap-1.5 rounded-md",
  md: "h-10 px-5 text-sm gap-2 rounded-lg",
  lg: "h-12 px-7 text-base gap-2.5 rounded-lg",
} as const;

type ButtonVariant = keyof typeof buttonVariants;
type ButtonSize = keyof typeof buttonSizes;

function LoadingSpinner({ size }: { size: ButtonSize }) {
  return (
    <svg
      className={cn("animate-spin", spinnerSizes[size])}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      children,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const classes = cn(
      // Base styles
      "inline-flex items-center justify-center font-medium whitespace-nowrap",
      "transition-all duration-200 ease-in-out",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      "select-none",
      // Variant
      buttonVariants[variant],
      // Size
      buttonSizes[size],
      // Disabled state
      isDisabled && "pointer-events-none opacity-50",
      // Shadow for filled variants
      variant !== "ghost" &&
        variant !== "outline" &&
        "shadow-sm hover:shadow-md",
      className
    );

    return (
      <button
        ref={ref}
        className={classes}
        disabled={isDisabled}
        aria-disabled={isDisabled || undefined}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading && <LoadingSpinner size={size} />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export interface ButtonLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center font-medium whitespace-nowrap",
      "transition-all duration-200 ease-in-out",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      "select-none no-underline",
      buttonVariants[variant],
      buttonSizes[size],
      variant !== "ghost" &&
        variant !== "outline" &&
        "shadow-sm hover:shadow-md",
      className
    );

    return (
      <a ref={ref} className={classes} {...props}>
        {children}
      </a>
    );
  }
);

ButtonLink.displayName = "ButtonLink";

export { Button, ButtonLink, buttonVariants, buttonSizes };
