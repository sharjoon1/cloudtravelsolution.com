# CTS — Phase 0 Audit Roadmap

> **Date:** 2026-07-03
> **Method:** Multi-agent read-only audit (7 of 8 subsystem auditors succeeded; the admin/CRM/email auditor hit a 429 rate limit and should be re-run).
> **Status:** Awaiting human approval before any code changes. This is the Phase 0 review gate.

---

## Executive snapshot

The platform is **broadly built and functional** — ~28 frontend routes, 21 collections, 16 API endpoints, partner portal, email marketing, tracking — all wired. But "built" ≠ "market-ready." The audit found:

- **3 active security issues** that are easy to exploit today (unverified email webhook, public PII/internal-note leak via `/api/track`, public `Users.read`).
- **Several silent data-loss bugs** (footer newsletter drops every subscriber, partner counters permanently read 0, document-upload failures hidden as success).
- **Zero analytics firing** (GA4/GTM env vars unset) and **no homepage metadata / Organization schema** — the money page is invisible to Google.
- **Monetization is schema-stubs only** — no Razorpay, no receipts, no invoices; the site is lead-gen, not revenue.
- **Not installable / no offline** (no service worker; manifest contradicts the brand).

Most of this is **S/M effort**. The roadmap below is prioritized **Impact × Effort**, tagged **P0/P1/P2**.

---

## Recommended execution order (cross-pillar)

1. **core-polish FIRST** — security/UX blockers + quick wins. Protects existing users & data integrity before scaling acquisition. Mostly S/M, low risk.
2. **growth-marketing SECOND** — make the site a *measurable* acquisition channel. Analytics must go live **before** monetization so revenue is attributable.
3. **monetization THIRD** — consumer Razorpay checkout + receipts first (fastest path to revenue), then partner B2B model + settlement ledger.
4. **mobile-pwa LAST** — longest pole; builds on the auth fix and versioned API from prior pillars.

---

## Pillar 1 — core-polish

### 🔴 P0
| # | Item | Effort | Files |
|---|------|--------|-------|
| 1 | **Fix on-hold tracking timeline regression** — `STATUS_ORDER` omits `on-hold`/`rejected`; `indexOf` returns -1 and turns the *entire* public timeline gray for any applicant put on hold. Preserve earned progress via `statusHistory`. | S | `src/components/tracking/status-progress.tsx` |
| 2 | **Rate-limit all public endpoints + harden `/api/track`** — add throttling to inquiry/callback/contact/lead/b2b/newsletter/track; strip `note` from the tracking response (internal notes leak today); add captcha + throttling on passport lookup (enumeration). | M | `src/app/api/track/route.ts`, `…/inquiry`, `…/callback`, `…/contact`, `…/lead`, `…/b2b-inquiry`, `…/newsletter`, `…/chat`, `tracking-search.tsx` |

### 🟡 P1
- **Counters stuck at zero** — `Customers.totalApplications` has no hook; `serviceRequestAfterChange` increments `partner.totalRequests` without `overrideAccess` (denied on public submit, swallowed by try/catch). Add hook + `overrideAccess`, backfill. *(S)* — `Customers.ts`, `VisaApplications.ts`, `serviceRequestHooks.ts`, `Partners.ts`
- **Surface document-upload failures** — `/api/partner/documents` responses' `res.ok` is never checked; partner gets a tracking code for a request whose docs never landed. *(S)* — `partner/submit-form.tsx`, `(partner)/partner/track/[id]/page.tsx`
- **Fix user-reachable 404s** — `/testimonials` (empty dir, footer links to it), `/contact/callback` (blog sidebar links to it). Build or repoint. *(S)* — `footer.tsx`, `testimonials/`, `blog/[slug]/page.tsx`
- **Blog category filter is decorative** — buttons have no state/`onClick`; all posts always show. Wire + add real cover images. *(M)* — `blog/page.tsx`, `blog/[slug]/page.tsx`, `blog-data.ts`
- **Normalize `destinationCountry` → relationship + add `VisaApplications.statusHistory`** — free-text country breaks joins & leaks into subscriber tags; consumer apps lack the audit trail B2B has. *(M)* — `VisaApplications.ts`, `ServiceRequests.ts`, `Inquiries.ts`, `serviceRequestHooks.ts`
- **Unify contradicting trust metrics** — 98% vs 95%+, 5,000 vs 10,000+ across homepage/FAQ/services/chat/about/team. Pick one canonical set. *(S)*
- **Harden access policies** — `Users.read` is `() => true` (leaks admin emails); `EmailCampaigns.delete` is `!!req.user` (any editor deletes). Gate properly. *(S)* — `Users.ts`, `EmailCampaigns.ts`, `Subscribers.ts`
- **Notify the applicant on status transitions** — `tracking-emails.ts` emails only the partner; `applicantEmail` is collected but unused. *(M)* — `tracking-emails.ts`, `serviceRequestHooks.ts`
- **Real map embeds + per-office addresses** — "Google Maps will be embedded here" grey box on live location pages. *(M)* — `locations/[city]/page.tsx`
- **Contact form on `/contact`** — `/api/contact` exists but is used by no form. Build or remove. *(M)* — `contact/page.tsx`, `api/contact/route.ts`
- **Make `autoNumber` concurrency-safe** — `totalDocs+1` race → 500 on concurrent creates (partners, future invoices). *(M)* — `src/hooks/autoNumber.ts`

### ⚪ P2
- **Bundle polish nits** — fake Instagram QR, raw-gray b2b utilities → tokens, section rhythm, dead `PATCH` on service-requests/[id], `ZodError` → `safeParse`+`flatten`, robots noindex `/partner/*`. *(M)*
- **Editable content globals** — add Navigation + SEO/Tracking globals (optionally a Pages collection); most copy is still in code. *(L)*

---

## Pillar 2 — growth-marketing

### 🔴 P0
- **Fix broken footer newsletter signup** — footer stub has no state/onClick/API; replace with the existing `NewsletterForm`. Every footer subscribe is silently dropped today. *(S)* — `footer.tsx`, `forms/newsletter-form.tsx`
- **Secure + fix email-campaign analytics** — (a) verify Resend webhook signature (svix) before processing — anyone can currently forge `email.bounced` and mass-suppress the list; (b) make stats atomic (sendCampaign hard-zeroes counters each batch; webhook read-modify-write races). *(M)* — `api/email/webhook/route.ts`, `email-campaigns.ts`, `EmailCampaigns.ts`
- **Enable GA4 + GTM** — components early-return `null` because env IDs are unset (PM2/`.env` gotcha). Set IDs in `.env` **and** `ecosystem.config.cjs`, then `pm2 restart --update-env`. *(S)* — `.env`, `ecosystem.config.cjs`, `layout.tsx`, analytics components
- **Render Organization JSON-LD + homepage metadata + brand assets** — `generateOrganizationSchema()` defined but never rendered; homepage has no `generateMetadata`; `og-image.jpg` & `logo.png` referenced but missing. *(M)* — `seo.ts`, `(frontend)/page.tsx`, `public/images/`

### 🟡 P1
- **Conversion tracking events** — no `gtag('event')`/`dataLayer.push` anywhere; fire on form submits, phone/email clicks, partner signups. *(M)*
- **Canonical + per-page OG sweep** — ~15 transactional pages have title/desc only; fix `metadataBase` localhost fallback. *(M)*
- **FAQ/Service/HowTo structured data + sitemap coverage** — FAQ page ships no `FAQPage` schema; sitemap uses a hardcoded array. *(M)*
- **EmailSendLog collection** — per-subscriber event log so bounce/unsubscribe attribution & suppression lists can be rebuilt. *(L)*

### ⚪ P2
- **Per-city LocalBusiness geo + Reviews collection** — every city uses Bangalore lat/lng; testimonials page has no data source. *(M)*
- **subscriberSync update-path + secure cron secret** — only handles `create`; cron accepts literal default secret. *(S)*

---

## Pillar 3 — monetization

### 🔴 P0
- **Consumer Razorpay checkout (SDK + createOrder + verify + webhook)** — only placeholder fields exist; `razorpay` not in deps. Build order/verify/webhook with HMAC signature verification; extend `Payments`; auto-link `ServiceRequests.totalFee`. Unverified success callbacks = spoofable today. *(L)*

### 🟡 P1
- **Partner B2B monetization model** — Partners has no plan/commission/billing fields; no Plans/Invoices(GST)/Payouts collections; `Payments` has no partner/SR relationship; `B2BInquiries` "Converted" dead-ends (no `/partner/register`). *(L)*
- **Receipt generation** — PDF + email + download route (auto-numbered `PAY-YYYYMM-XXXX`). *(M)*
- **Transactions / settlement ledger** — nowhere to settle refunds/settlements/fee-splits. *(M)*

---

## Pillar 4 — mobile-pwa

### 🟡 P1
- **Replace self-HTTP partner auth with local token verification** — every protected partner call HTTP-fetches `/api/partners/me` to verify the JWT (loopback round-trip) + a dead `payload.find`. *(M)*
- **`viewport` export + fix manifest** — no `export const viewport` anywhere; manifest `theme_color` contradicts brand. *(S)*
- **Service worker + PWA installability** — no SW, no `serwist`/`workbox`; app is not installable, no offline. *(L)*

### ⚪ P2
- **Versioned, token-based mobile API surface** — cookie auth + unversioned JSON block any native client; add `/api/v1` + JWT/refresh + consumer auth API. *(L)*

---

## Quick wins (high-impact, low-effort — do first)
1. Fix on-hold timeline (`status-progress.tsx`) — one-file S.
2. Swap footer newsletter stub → `NewsletterForm`.
3. Set GA4/GTM env IDs + restart PM2 — analytics on, no code.
4. Render Organization JSON-LD + add homepage `generateMetadata`.
5. Strip `note` from `/api/track` + add captcha/throttle.
6. Gate `Users.read` + `EmailCampaigns.delete`.
7. Reconcile the 95%/98% metrics to one set.
8. Create `og-image.jpg` + `logo.png`.
9. Add `export const viewport` + fix manifest `theme_color`.
10. Repoint `/testimonials` + `/contact/callback` dead links.

---

## Risks / blockers (must handle, not skip)
- **SQLite migrations** — every new collection/relationship/statusHistory/EmailSendLog/Invoice needs manual `sqlite3` DDL on prod **plus `payload_locked_documents_rels` columns**. Batch all data-model work into one migration.
- **PM2/`.env`** — GA/GTM IDs, `RAZORPAY_*`, `RESEND_WEBHOOK_SECRET`, `SERVER_URL` must be set via `export` + `pm2 restart --update-env` or `ecosystem.config.cjs`.
- **Webhook secrets** — signature verification needs real secrets; cron currently falls back to literal `'cron-secret-change-me'` → **fail closed**.
- **Dynamic rendering** — use `await connection()`, not `force-dynamic`, on sitemap/OG/analytics-bearing pages.
- **`payload.config` relative imports** — all new collections/globals/hooks must use `./src/` paths.
- **Two sources of truth for origin** — `metadataBase` (NEXT_PUBLIC_SITE_URL, localhost fallback) vs hardcoded `https://…` in seo/sitemap/robots. Fix in one pass.
- **`autoNumber` race** — fix concurrency before scaling monetization or partner invoices will intermittently 500.
- **Cookie-based partner auth** blocks both PWA token strategy and native clients — must change before mobile work.
- **Unverified webhooks (Resend + Razorpay)** — deploying Payments before HMAC verification = spoofable success.

---

*Generated by the Phase 0 multi-agent audit workflow. Re-run `audit:admin-crm-email` (failed on 429) for full admin-panel coverage before finalizing Pillar 1 scope.*
