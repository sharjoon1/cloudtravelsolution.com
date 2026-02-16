import * as React from "react";
import { cn } from "@/lib/utils";

const inputSizes = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-4 text-base",
} as const;

const labelSizes = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
} as const;

type InputSize = keyof typeof inputSizes;

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: InputSize;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      error,
      helperText,
      size = "md",
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const errorId = error ? `${inputId}-error` : undefined;
    const helperId = helperText ? `${inputId}-helper` : undefined;
    const hasError = Boolean(error);

    const describedBy = [errorId, helperId].filter(Boolean).join(" ") || undefined;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "mb-1.5 block font-medium text-gray-700",
              labelSizes[size],
              disabled && "opacity-50"
            )}
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          type={type}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy}
          className={cn(
            // Base styles
            "w-full rounded-lg border bg-white font-normal",
            "transition-colors duration-200 ease-in-out",
            "placeholder:text-gray-400",
            "focus:outline-none focus:ring-2 focus:ring-offset-0",
            // Size
            inputSizes[size],
            // Default state
            !hasError && [
              "border-gray-300",
              "hover:border-gray-400",
              "focus:border-[#1B4D7A] focus:ring-[#1B4D7A]/20",
            ],
            // Error state
            hasError && [
              "border-red-500",
              "hover:border-red-600",
              "focus:border-red-500 focus:ring-red-500/20",
            ],
            // Disabled state
            disabled && "cursor-not-allowed bg-gray-50 opacity-50",
            className
          )}
          {...props}
        />

        {error && (
          <p
            id={errorId}
            role="alert"
            className="mt-1.5 text-xs font-medium text-red-600"
          >
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id={helperId} className="mt-1.5 text-xs text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, inputSizes };
