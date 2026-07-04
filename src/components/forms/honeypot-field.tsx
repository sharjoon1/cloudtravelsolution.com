"use client";

import { useRef } from "react";
import { HONEYPOT_FIELD } from "@/lib/spam-check";

/**
 * Hidden honeypot input + the hook that reads it. Not registered with React Hook
 * Form and not in any Zod schema, so it survives into the raw request body for the
 * server-side `isHoneypotTripped` check.
 */
export function useHoneypot() {
  const ref = useRef<HTMLInputElement>(null);
  return {
    ref,
    name: HONEYPOT_FIELD,
    /** Value of the hidden field (non-empty means a bot filled it). */
    getValue: () => ref.current?.value ?? "",
  };
}

export function HoneypotField({ inputRef }: { inputRef: React.Ref<HTMLInputElement> }) {
  return (
    <input
      ref={inputRef}
      type="text"
      name={HONEYPOT_FIELD}
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      className="absolute left-[-9999px] top-auto h-0 w-0 opacity-0 overflow-hidden"
    />
  );
}
