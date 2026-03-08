# Services Restructure + B2B Inquiry Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Remove Educational Visa & Manpower Visa as standalone services, restructure them as child pages under Visa Assistance, add B2B inquiry page with form, and add B2B Partners button to header.

**Architecture:** Update NAV_ITEMS and SERVICES constants to remove standalone entries and add nested children. Create two new child pages under visa-assistance using existing content. Create B2BInquiries Payload collection, API route, validation schema, and frontend form page. Update header to support nested nav items and show B2B button.

**Tech Stack:** Next.js 15.4, Payload CMS 3.76, TypeScript, Tailwind CSS 4, Zod v4, Resend email

---

### Task 1: Update Constants — NAV_ITEMS and SERVICES

**Files:**
- Modify: `src/lib/constants.ts:72-107` (NAV_ITEMS) and `src/lib/constants.ts:142-191` (SERVICES)

**Step 1: Update NAV_ITEMS to restructure services dropdown**

In `src/lib/constants.ts`, change NAV_ITEMS Services children to remove Educational Visa and Manpower Visa, and add nested children under Visa Assistance:

```typescript
// Change the NAV_ITEMS type to support nested children
export type NavChild = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Visa Appointment", href: "/services/visa-appointment" },
      {
        label: "Visa Assistance",
        href: "/services/visa-assistance",
        children: [
          { label: "For Education Consultancies", href: "/services/visa-assistance/education-consultancies" },
          { label: "For Manpower Agencies", href: "/services/visa-assistance/manpower-agencies" },
        ],
      },
      { label: "Travel Insurance", href: "/services/travel-insurance" },
      { label: "Flight & Hotel Booking", href: "/services/flight-hotel-booking" },
      { label: "Passport Service", href: "/services/passport-services" },
      { label: "Document Attestation", href: "/services/document-attestation" },
    ],
  },
  // ... rest stays the same
];
```

**Step 2: Remove Educational Visa and Manpower Visa from SERVICES array**

Remove the last two entries (lines 179-190) from SERVICES array so homepage grid shows 6 services.

**Step 3: Commit**

```bash
git add src/lib/constants.ts
git commit -m "feat: restructure nav — remove educational/manpower visa, add nested visa assistance children"
```

---

### Task 2: Update Header — Support Nested Nav Children + B2B Button

**Files:**
- Modify: `src/components/layout/header.tsx`

**Step 1: Update desktop dropdown to render nested children**

The desktop dropdown (lines 120-134) currently renders flat `item.children`. Update to check if a child has its own `children` array and render a sub-group:

For desktop dropdown, replace the flat child rendering with:
```tsx
{item.children.map((child) => (
  <div key={child.href}>
    <Link
      href={child.href}
      className="block px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors"
    >
      {child.label}
    </Link>
    {"children" in child && child.children && (
      <div className="ml-3 border-l border-white/20">
        {child.children.map((sub) => (
          <Link
            key={sub.href}
            href={sub.href}
            className="block px-4 py-1.5 text-xs text-white/60 hover:bg-white/10 hover:text-white transition-colors"
          >
            {sub.label}
          </Link>
        ))}
      </div>
    )}
  </div>
))}
```

**Step 2: Update mobile accordion to render nested children**

Same pattern for mobile menu (lines 228-236): render sub-items with extra indentation when a child has children.

**Step 3: Add B2B Partners button next to Free Consultation**

In the CTA area (line 141-146), add a B2B button:
```tsx
<Link
  href="/b2b"
  className="hidden sm:inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-transparent border border-[#0cfcbc] rounded-lg hover:bg-[#0cfcbc] hover:text-[#094f8a] transition-colors"
>
  B2B Partners
</Link>
```

Also add in mobile menu bottom section (line 246-252), after Free Consultation.

**Step 4: Update import for NavItem type**

Import the new `NavItem` type from constants if needed for type safety.

**Step 5: Commit**

```bash
git add src/components/layout/header.tsx
git commit -m "feat: header supports nested nav children, add B2B Partners button"
```

---

### Task 3: Create Child Pages Under Visa Assistance

**Files:**
- Create: `src/app/(frontend)/services/visa-assistance/education-consultancies/page.tsx`
- Create: `src/app/(frontend)/services/visa-assistance/manpower-agencies/page.tsx`
- Modify: `src/lib/services-data.ts` — add data for the two child pages

**Step 1: Add child page data to services-data.ts**

Add two new exports at the bottom of services-data.ts:
```typescript
export const EDUCATION_CONSULTANCY_DATA = {
  title: "Visa Assistance for Education Consultancies",
  slug: "education-consultancies",
  // Reuse content from existing educational-visa-assistance entry, reframed for consultancies
  ...
};

export const MANPOWER_AGENCY_DATA = {
  title: "Visa Assistance for Manpower Agencies",
  slug: "manpower-agencies",
  // Reuse content from existing manpower-visa-assistance entry, reframed for agencies
  ...
};
```

**Step 2: Create education-consultancies page**

Create `src/app/(frontend)/services/visa-assistance/education-consultancies/page.tsx`:
- SEO metadata with title and description
- Breadcrumbs: Home > Services > Visa Assistance > Education Consultancies
- Hero section with title, tagline, and B2B CTA button
- Features list, process steps, FAQs (reuse from educational visa data)
- CTA banner linking to `/b2b`

**Step 3: Create manpower-agencies page**

Same structure as education-consultancies but with manpower content.

**Step 4: Update the visa-assistance service page**

Modify the existing visa-assistance page or its data to include links to the two child pages. Add a "Specialized Services" section at the bottom of the visa-assistance page with cards linking to:
- For Education Consultancies
- For Manpower Agencies

**Step 5: Commit**

```bash
git add src/app/(frontend)/services/visa-assistance/ src/lib/services-data.ts
git commit -m "feat: add education consultancies and manpower agencies child pages under visa assistance"
```

---

### Task 4: Create B2B Inquiries Payload Collection

**Files:**
- Create: `src/collections/B2BInquiries.ts`
- Modify: `payload.config.ts` — register collection

**Step 1: Create the collection**

Create `src/collections/B2BInquiries.ts`:
```typescript
import type { CollectionConfig } from "payload";

export const B2BInquiries: CollectionConfig = {
  slug: "b2b-inquiries",
  admin: {
    useAsTitle: "companyName",
    group: "Lead Management",
    defaultColumns: ["companyName", "contactPerson", "businessType", "city", "status", "createdAt"],
  },
  access: {
    read: ({ req }) => !!req.user,
    create: () => true,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    { name: "companyName", type: "text", required: true },
    { name: "contactPerson", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "phone", type: "text", required: true },
    {
      name: "businessType",
      type: "select",
      required: true,
      options: [
        { label: "Education Consultancy", value: "education-consultancy" },
        { label: "Manpower Agency", value: "manpower-agency" },
      ],
    },
    { name: "city", type: "text", required: true },
    {
      name: "expectedVolume",
      type: "select",
      required: true,
      options: [
        { label: "1-10 per month", value: "1-10" },
        { label: "10-50 per month", value: "10-50" },
        { label: "50-100 per month", value: "50-100" },
        { label: "100+ per month", value: "100+" },
      ],
    },
    { name: "message", type: "textarea" },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      admin: { position: "sidebar" },
      options: [
        { label: "New", value: "new" },
        { label: "Contacted", value: "contacted" },
        { label: "Converted", value: "converted" },
        { label: "Rejected", value: "rejected" },
      ],
    },
    {
      name: "assignedTo",
      type: "relationship",
      relationTo: "users",
      admin: { position: "sidebar" },
    },
  ],
};
```

**Step 2: Register in payload.config.ts**

Add import and add to collections array (after Leads):
```typescript
import { B2BInquiries } from "./src/collections/B2BInquiries";
// ...
collections: [
  // ... existing
  B2BInquiries,
],
```

**Step 3: Commit**

```bash
git add src/collections/B2BInquiries.ts payload.config.ts
git commit -m "feat: add B2BInquiries Payload collection"
```

---

### Task 5: Add B2B Validation Schema and API Route

**Files:**
- Modify: `src/lib/validations.ts` — add b2bInquirySchema
- Create: `src/app/api/b2b-inquiry/route.ts`
- Modify: `src/lib/email.ts` — add B2B notification email function

**Step 1: Add Zod schema**

In `src/lib/validations.ts`, add:
```typescript
export const b2bInquirySchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters").max(200),
  contactPerson: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().regex(phoneRegex, "Please enter a valid Indian phone number"),
  businessType: z.enum(["education-consultancy", "manpower-agency"], {
    message: "Please select a business type",
  }),
  city: z.string().min(2, "City must be at least 2 characters").max(100),
  expectedVolume: z.enum(["1-10", "10-50", "50-100", "100+"], {
    message: "Please select expected volume",
  }),
  message: z.string().max(2000).optional(),
});
```

**Step 2: Add email notification function**

In `src/lib/email.ts`, add `sendB2BInquiryNotification` function following the pattern of `sendLeadNotification`. Email subject: "New B2B Partner Inquiry — {companyName}".

**Step 3: Create API route**

Create `src/app/api/b2b-inquiry/route.ts` following the pattern of `src/app/api/lead/route.ts`:
- Validate with b2bInquirySchema
- Store in Payload `b2b-inquiries` collection
- Send email notification
- Return success response

**Step 4: Commit**

```bash
git add src/lib/validations.ts src/lib/email.ts src/app/api/b2b-inquiry/route.ts
git commit -m "feat: add B2B inquiry validation, API route, and email notification"
```

---

### Task 6: Create B2B Inquiry Page

**Files:**
- Create: `src/app/(frontend)/b2b/page.tsx`

**Step 1: Create the page**

Create `src/app/(frontend)/b2b/page.tsx` with:
- SEO metadata: "B2B Partners — Cloud Travel Solutions"
- Hero section: "Partner with Cloud Travel Solutions" + static discount text ("Up to 20% discount on bulk visa processing")
- Benefits cards (Dedicated Account Manager, Bulk Processing Discounts, Priority Support, Real-time Tracking)
- B2B inquiry form using React Hook Form + Zod resolver
- Form fields: Company Name, Contact Person, Email, Phone, Business Type (select), City, Expected Monthly Volume (select), Message (textarea)
- Submit to `/api/b2b-inquiry`
- Success state with confirmation message
- Style matching existing site theme (blue/green colors)

**Step 2: Commit**

```bash
git add src/app/(frontend)/b2b/page.tsx
git commit -m "feat: add B2B partner inquiry page with form"
```

---

### Task 7: Clean Up Old Service Entries and Update References

**Files:**
- Modify: `src/lib/services-data.ts` — remove educational-visa-assistance and manpower-visa-assistance from SERVICES_DATA
- Modify: `src/components/partner/submit-form.tsx` — update SERVICE_TYPES
- Modify: `src/components/sections/services-grid.tsx` — ensure it only renders 6 services

**Step 1: Remove standalone entries from SERVICES_DATA**

In services-data.ts, remove the `educational-visa-assistance` and `manpower-visa-assistance` entries from the SERVICES_DATA object. Keep the content accessible via the new EDUCATION_CONSULTANCY_DATA and MANPOWER_AGENCY_DATA exports.

**Step 2: Update partner submit form SERVICE_TYPES**

In `src/components/partner/submit-form.tsx`, remove:
```
{ label: "Educational Visa Assistance", value: "educational-visa-assistance" },
{ label: "Manpower Visa Assistance", value: "manpower-visa-assistance" },
```

The visa-assistance option already covers these.

**Step 3: Update getAllServiceSlugs**

Make sure `getAllServiceSlugs()` in services-data.ts no longer returns the old slugs, so static generation doesn't create the old pages.

**Step 4: Commit**

```bash
git add src/lib/services-data.ts src/components/partner/submit-form.tsx
git commit -m "feat: remove standalone educational/manpower visa entries, update references"
```

---

### Task 8: Create DB Table and Deploy

**Step 1: Push to GitHub**

```bash
git push origin main
```

**Step 2: Deploy on production server**

```bash
ssh root@161.97.114.189 "cd /www/wwwroot/cloudtravelsolution.com && git pull origin main && rm -rf .next && npm run build && pm2 restart cloudtravelsolution"
```

**Step 3: Create the b2b-inquiries table on production**

Since SQLite with `push: true` only works in dev mode, manually create the table:

```bash
ssh root@161.97.114.189 "cd /www/wwwroot/cloudtravelsolution.com && sqlite3 data/prod.db \"CREATE TABLE IF NOT EXISTS b2b_inquiries (
  id integer PRIMARY KEY NOT NULL,
  company_name text NOT NULL,
  contact_person text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  business_type text NOT NULL DEFAULT 'education-consultancy',
  city text NOT NULL,
  expected_volume text NOT NULL DEFAULT '1-10',
  message text,
  status text DEFAULT 'new',
  assigned_to_id integer,
  updated_at text,
  created_at text,
  FOREIGN KEY (assigned_to_id) REFERENCES users(id) ON UPDATE no action ON DELETE set null
);\""
```

Also add to payload_locked_documents_rels:
```bash
sqlite3 data/prod.db "ALTER TABLE payload_locked_documents_rels ADD COLUMN b2b_inquiries_id integer REFERENCES b2b_inquiries(id) ON DELETE CASCADE;"
```

**Step 4: Verify deployment**

```bash
curl -s -o /dev/null -w '%{http_code}' https://cloudtravelsolution.com/b2b
```

Expected: 200
