import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showCharCount?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      showCharCount = false,
      maxLength,
      id,
      disabled,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const textareaId = id || React.useId();
    const errorId = error ? `${textareaId}-error` : undefined;
    const helperId = helperText ? `${textareaId}-helper` : undefined;
    const hasError = Boolean(error);

    const [charCount, setCharCount] = React.useState(() => {
      const initial = (value ?? defaultValue ?? "") as string;
      return initial.length;
    });

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCharCount(e.target.value.length);
        onChange?.(e);
      },
      [onChange]
    );

    // Sync with controlled value
    React.useEffect(() => {
      if (value !== undefined) {
        setCharCount(String(value).length);
      }
    }, [value]);

    const describedBy =
      [errorId, helperId].filter(Boolean).join(" ") || undefined;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              "mb-1.5 block text-sm font-medium text-gray-700",
              disabled && "opacity-50"
            )}
          >
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy}
          className={cn(
            // Base styles
            "w-full rounded-lg border bg-white px-4 py-3 text-sm font-normal",
            "transition-colors duration-200 ease-in-out",
            "placeholder:text-gray-400",
            "focus:outline-none focus:ring-2 focus:ring-offset-0",
            "min-h-[100px] resize-y",
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

        <div className="mt-1.5 flex items-start justify-between gap-2">
          <div className="flex-1">
            {error && (
              <p
                id={errorId}
                role="alert"
                className="text-xs font-medium text-red-600"
              >
                {error}
              </p>
            )}

            {helperText && !error && (
              <p id={helperId} className="text-xs text-gray-500">
                {helperText}
              </p>
            )}
          </div>

          {showCharCount && (
            <p
              className={cn(
                "shrink-0 text-xs tabular-nums",
                maxLength && charCount >= maxLength
                  ? "font-medium text-red-600"
                  : "text-gray-400"
              )}
              aria-live="polite"
              aria-label={
                maxLength
                  ? `${charCount} of ${maxLength} characters used`
                  : `${charCount} characters`
              }
            >
              {charCount}
              {maxLength ? `/${maxLength}` : ""}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
