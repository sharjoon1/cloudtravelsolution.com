"use client";

import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";

/**
 * Public Cloudflare Turnstile site key. When unset (env var missing) the widget is
 * not rendered and no token is sent — the server then falls back to rate-limit-only.
 * NEXT_PUBLIC_* vars are inlined at build time, so this is safe to read client-side.
 */
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

interface TurnstileRenderOptions {
  sitekey: string;
  theme?: "light" | "dark" | "auto";
  callback?: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
}

interface TurnstileApi {
  render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

// Shared promise so multiple mounts never double-inject the Turnstile script tag.
let turnstileScriptPromise: Promise<void> | null = null;

function loadTurnstileScript(): Promise<void> {
  if (turnstileScriptPromise) return turnstileScriptPromise;
  turnstileScriptPromise = new Promise<void>((resolve) => {
    if (typeof window !== "undefined" && window.turnstile) {
      resolve();
      return;
    }
    const existing = document.getElementById(
      "cf-turnstile-script"
    ) as HTMLScriptElement | null;
    if (existing) {
      if (window.turnstile) {
        resolve();
      } else {
        existing.addEventListener("load", () => resolve());
      }
      return;
    }
    const script = document.createElement("script");
    script.id = "cf-turnstile-script";
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
  return turnstileScriptPromise;
}

interface TrackingSearchProps {
  onSearch: (
    query: string,
    type: "passport" | "tracking-code",
    token: string | null
  ) => void;
  loading: boolean;
}

export function TrackingSearch({ onSearch, loading }: TrackingSearchProps) {
  const [searchType, setSearchType] = useState<"tracking-code" | "passport">("tracking-code");
  const [query, setQuery] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);

  // Render the Turnstile widget when a public site key is configured. The
  // setTurnstileToken calls live inside Turnstile's async callbacks (event-driven),
  // never synchronously in the effect body, so this is the allowed mount-time pattern.
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    let cancelled = false;
    loadTurnstileScript()
      .then(() => {
        if (cancelled) return;
        const turnstile = window.turnstile;
        const container = containerRef.current;
        if (!turnstile || !container) return;
        widgetIdRef.current = turnstile.render(container, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: "light",
          callback: (token: string) => setTurnstileToken(token),
          "expired-callback": () => setTurnstileToken(null),
          "error-callback": () => setTurnstileToken(null),
        });
      })
      .catch(() => {
        // Script failed to load — token stays null and submit stays blocked.
      });
    return () => {
      cancelled = true;
      const turnstile = window.turnstile;
      if (widgetIdRef.current !== null && turnstile) {
        turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed.length < 3) return;
    // When Turnstile is configured, require a valid token before searching.
    if (TURNSTILE_SITE_KEY && !turnstileToken) return;
    onSearch(trimmed, searchType, turnstileToken);
    // Require a fresh challenge for the next lookup.
    if (TURNSTILE_SITE_KEY) {
      setTurnstileToken(null);
      const turnstile = window.turnstile;
      if (widgetIdRef.current !== null && turnstile) {
        turnstile.reset(widgetIdRef.current);
      }
    }
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Tabs */}
      <div className="mb-4 flex rounded-lg bg-gray-100 p-1">
        <button
          type="button"
          aria-pressed={searchType === "tracking-code"}
          onClick={() => setSearchType("tracking-code")}
          className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
            searchType === "tracking-code"
              ? "bg-white text-[#0c6cbc] shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          By Tracking Code
        </button>
        <button
          type="button"
          aria-pressed={searchType === "passport"}
          onClick={() => setSearchType("passport")}
          className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
            searchType === "passport"
              ? "bg-white text-[#0c6cbc] shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          By Passport Number
        </button>
      </div>

      {/* Search Input */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            aria-label={
              searchType === "tracking-code"
                ? "Search by tracking code"
                : "Search by passport number"
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              searchType === "tracking-code"
                ? "Enter tracking code (e.g. TRK-202602-0001)"
                : "Enter passport number"
            }
            className="w-full rounded-lg border border-gray-300 py-2.5 pl-9 pr-3 text-sm focus:border-[#0c6cbc] focus:outline-none focus:ring-1 focus:ring-[#0c6cbc]"
          />
        </div>
        <button
          type="submit"
          disabled={
            loading ||
            query.trim().length < 3 ||
            (!!TURNSTILE_SITE_KEY && !turnstileToken)
          }
          className="rounded-lg bg-[#0cfcbc] px-6 py-2.5 text-sm font-semibold text-[#0c6cbc] transition-colors hover:bg-[#0adba5] disabled:opacity-50"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Cloudflare Turnstile bot verification — only rendered when a site key is configured. */}
      {TURNSTILE_SITE_KEY && <div className="mt-3" ref={containerRef} />}
    </div>
  );
}
