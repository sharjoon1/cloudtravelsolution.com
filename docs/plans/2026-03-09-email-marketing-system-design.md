# Email Marketing System — Design Document

**Date:** 2026-03-09
**Status:** Approved

## Goal

Build a fully integrated email marketing system inside Cloud Travel Solutions' existing Payload CMS + Resend infrastructure. Compose campaigns from admin, target audience segments, schedule sends, and track analytics — all without external tools.

## Architecture

Two new Payload collections (Subscribers, EmailCampaigns), four pre-built HTML email templates, auto-sync hooks from existing collections, Resend webhooks for analytics, and a cron-based scheduler.

### Tech Stack
- Payload CMS 3.76 (admin UI, collections, hooks)
- Resend API (sending, webhooks for tracking)
- Next.js API routes (send, schedule, webhook, unsubscribe)
- SQLite (production database)

---

## Data Model

### Subscribers Collection (`subscribers`)

| Field | Type | Details |
|-------|------|---------|
| email | email | Unique, required |
| name | text | Optional |
| source | select | newsletter-form, lead-form, inquiry-form, b2b-form, manual, import |
| status | select | active, unsubscribed, bounced |
| segments | array of text | Tags like "us-visa", "bangalore", "student", "vip" |
| subscribedAt | date | Auto-set on creation |
| unsubscribedAt | date | Set when unsubscribed |
| unsubscribeToken | text | Unique token for unsubscribe link |

**Admin group:** Lead Management

### EmailCampaigns Collection (`email-campaigns`)

| Field | Type | Details |
|-------|------|---------|
| name | text | Internal campaign name, required |
| subject | text | Email subject line, required |
| template | select | newsletter, promotion, travel-alert, visa-update, custom |
| content | richText | Lexical editor, for custom template |
| templateData | group | Structured fields per template type |
| audience | select | all-active, segment-filter |
| segmentFilter | array of text | Segment tags to target |
| status | select | draft, scheduled, sending, sent, failed |
| scheduledAt | date | For scheduled sends |
| sentAt | date | When campaign was sent |
| stats | group | totalSent, delivered, opened, clicked, bounced, unsubscribed |

**Admin group:** Lead Management

### templateData Group Fields

- `headline` — text (used by all pre-built templates)
- `bodyText` — textarea (promotion, travel-alert, visa-update)
- `offerPercentage` — text (promotion)
- `ctaText` — text (CTA button label)
- `ctaUrl` — text (CTA button link)
- `alertType` — select: info, warning, urgent (travel-alert)
- `countryName` — text (travel-alert, visa-update)
- `featuredImage` — upload/media (optional)

---

## Subscriber Management

### Auto-sync from existing collections

`afterChange` hooks on Leads, Inquiries, Customers, and B2BInquiries collections. When a new record is created, check if email exists in Subscribers. If not, create a subscriber with:
- `source` mapped from the originating collection
- `segments` auto-tagged from context (destination country, city, visa type)
- `status` = active

### Unsubscribe Flow

1. Every outgoing email includes an unsubscribe link: `/api/email/unsubscribe?token=<unique-token>`
2. GET request to that endpoint sets subscriber status to `unsubscribed`, records `unsubscribedAt`
3. Shows a simple confirmation page: "You've been unsubscribed"
4. Subscriber is excluded from all future campaigns

### Manual Management

- Add/edit subscribers from admin panel
- Bulk CSV import (future enhancement, not in initial build)
- Edit segment tags per subscriber

---

## Campaign Composer

### Flow in Admin Panel

1. Create new EmailCampaign
2. Fill in: name, subject, template choice
3. For pre-built templates → fill structured fields (headline, body, offer %, CTA, etc.)
4. For custom → use Lexical rich text editor
5. Pick audience: all active subscribers or filter by segment tags
6. Sidebar: "Send Test Email" button → sends preview to admin's email
7. Choose: "Send Now" or "Schedule" (pick date/time)
8. Confirm → triggers send or sets status to scheduled

### Sending Flow

1. Status changes to `sending`
2. API route `/api/email/send-campaign` fetches matching subscribers
3. Renders email HTML using selected template + data
4. Sends in batches of 50 with 1-second delay between batches
5. Each email tagged with campaign ID in Resend metadata
6. Updates `stats.totalSent` as batches complete
7. Sets status to `sent` (or `failed` on error)

### Scheduled Sends

- Cron endpoint: `/api/email/cron`
- Runs every 5 minutes (PM2 cron or external trigger)
- Finds campaigns with status = `scheduled` and `scheduledAt` <= now
- Triggers send flow for each

---

## Email Templates

All templates wrap content in the existing `emailLayout()` branded frame (blue header, company footer).

### 1. Newsletter
Weekly/monthly update format. Heading, intro paragraph, 2-3 content sections, footer CTA.

### 2. Promotion
Discount/offer emails. Big headline, offer badge/percentage, description, CTA button, terms.

### 3. Travel Alert
Visa policy changes, embassy updates. Alert type badge (info/warning/urgent), country reference, description, action steps.

### 4. Visa Update
Service changes, processing time updates. Country/service name, change summary, key details table, CTA.

### 5. Custom
Free-form Lexical rich text content rendered into the branded email layout.

All templates include: unsubscribe link, company footer, "You're receiving this because..." text.

---

## Analytics

### Resend Webhooks

Endpoint: `/api/email/webhook`
Secured with Resend webhook signing secret.

Events tracked:
- `email.delivered` → increment `stats.delivered`
- `email.opened` → increment `stats.opened`
- `email.clicked` → increment `stats.clicked`
- `email.bounced` → increment `stats.bounced`, set subscriber status to `bounced`
- `email.complained` → set subscriber status to `unsubscribed`

Campaign ID mapped from Resend email metadata.

### Admin Display

Campaign list view shows stats as numbers + percentages (e.g., "245 sent / 230 delivered / 89 opened (38.7%)").

---

## New Files

| File | Purpose |
|------|---------|
| `src/collections/Subscribers.ts` | Subscriber collection |
| `src/collections/EmailCampaigns.ts` | Campaign collection |
| `src/lib/email-templates.ts` | 4 pre-built HTML template functions |
| `src/lib/email-campaigns.ts` | Send logic, batch processing, subscriber querying |
| `src/hooks/subscriberSync.ts` | Auto-add subscribers from Leads, Inquiries, etc. |
| `src/app/api/email/send-campaign/route.ts` | Trigger campaign send |
| `src/app/api/email/cron/route.ts` | Scheduled campaign processor |
| `src/app/api/email/webhook/route.ts` | Resend webhook receiver |
| `src/app/api/email/unsubscribe/route.ts` | Unsubscribe handler |
| `src/app/(frontend)/unsubscribe/page.tsx` | Unsubscribe confirmation page |

### Modified Files

| File | Change |
|------|--------|
| `payload.config.ts` | Add Subscribers + EmailCampaigns collections |
| `src/app/api/newsletter/route.ts` | Store subscriber in collection |
| `src/lib/email.ts` | Add unsubscribe link helper |

---

## Production Database

New tables to create on server:
- `subscribers` — all fields above
- `email_campaigns` — all fields above
- `email_campaigns_segment_filter` — array sub-table
- `subscribers_segments` — array sub-table
- `email_campaigns_template_data` — group fields
- `email_campaigns_stats` — group fields
- `payload_locked_documents_rels` — add `subscribers_id`, `email_campaigns_id` columns
