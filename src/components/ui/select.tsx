import * as React from "react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string;
  error?: string;
  helperText?: string;
  placeholder?: string;
  options?: SelectOption[];
  size?: "sm" | "md" | "lg";
}

const selectSizes = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-4 text-base",
} as const;

const labelSizes = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
} as const;

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      placeholder,
      options,
      size = "md",
      id,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const selectId = id || generatedId;
    const errorId = error ? `${selectId}-error` : undefined;
    const helperId = helperText ? `${selectId}-helper` : undefined;
    const hasError = Boolean(error);

    const describedBy =
      [errorId, helperId].filter(Boolean).join(" ") || undefined;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className={cn(
              "mb-1.5 block font-medium text-gray-700",
              labelSizes[size],
              disabled && "opacity-50"
            )}
          >
            {label}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            aria-invalid={hasError || undefined}
            aria-describedby={describedBy}
            className={cn(
              // Base styles
              "w-full appearance-none rounded-lg border bg-white pr-10 font-normal",
              "transition-colors duration-200 ease-in-out",
              "focus:outline-none focus:ring-2 focus:ring-offset-0",
              // Size
              selectSizes[size],
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
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}

            {options
              ? options.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </option>
                ))
              : children}
          </select>

          {/* Custom chevron */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              className="h-4 w-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

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

Select.displayName = "Select";

export { Select };
