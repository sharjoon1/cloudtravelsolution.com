# Website Architecture & Sitemap - CloudTravelSolution

> **Date:** 2026-02-16
> **Version:** 1.0

---

## Information Architecture

```
cloudtravelsolution.com
│
├── / (Home)
│
├── /about
│   ├── /about/our-story
│   ├── /about/team
│   ├── /about/certifications
│   └── /about/careers
│
├── /services
│   ├── /services/visa-consulting
│   ├── /services/travel-insurance
│   ├── /services/passport-services
│   ├── /services/document-attestation
│   └── /services/corporate-travel
│
├── /visa (Primary Service Hub)
│   ├── /visa/[country-slug] (190+ country pages)
│   │   ├── /visa/united-states
│   │   ├── /visa/united-kingdom
│   │   ├── /visa/canada
│   │   ├── /visa/australia
│   │   ├── /visa/schengen
│   │   ├── /visa/singapore
│   │   ├── /visa/uae
│   │   ├── /visa/malaysia
│   │   ├── /visa/thailand
│   │   └── ... (all countries)
│   │
│   ├── /visa/types
│   │   ├── /visa/types/tourist
│   │   ├── /visa/types/business
│   │   ├── /visa/types/student
│   │   ├── /visa/types/work-permit
│   │   ├── /visa/types/transit
│   │   ├── /visa/types/medical
│   │   └── /visa/types/conference
│   │
│   └── /visa/track (Visa status tracker - future)
│
├── /locations (City Hub)
│   ├── /locations/bangalore
│   ├── /locations/hyderabad
│   ├── /locations/delhi
│   ├── /locations/chennai
│   └── /locations/expansion (Pan India roadmap)
│
├── /blog
│   ├── /blog/[slug] (Individual posts)
│   ├── /blog/category/[category]
│   │   ├── /blog/category/visa-guides
│   │   ├── /blog/category/travel-tips
│   │   ├── /blog/category/country-guides
│   │   ├── /blog/category/travel-advisories
│   │   └── /blog/category/company-news
│   └── /blog/page/[number] (Pagination)
│
├── /resources
│   ├── /resources/faq
│   ├── /resources/visa-checklist-generator
│   ├── /resources/embassy-directory
│   └── /resources/travel-advisories
│
├── /contact
│   ├── /contact (Main contact page with all locations)
│   └── /contact/callback (Callback request)
│
├── /inquiry
│   ├── /inquiry/visa (Visa consultation request)
│   ├── /inquiry/corporate (Corporate travel inquiry)
│   └── /inquiry/franchise (Franchise/partner inquiry)
│
├── /testimonials
│
├── /privacy-policy
├── /terms-of-service
└── /sitemap.xml (Auto-generated)
```

---

## Page-by-Page Specifications

### HOME PAGE (/)
**Purpose:** First impression, trust building, lead capture
**SEO Target:** "travel agency India", "visa consultant India"

```
┌─────────────────────────────────────────────────┐
│ HEADER                                          │
│ Logo | Services ▾ | Visa ▾ | Locations ▾ |     │
│ Blog | Contact | [Get Free Consultation] CTA    │
│ 📞 1800-XXX-XXXX (toll-free)                   │
├─────────────────────────────────────────────────┤
│ HERO SECTION                                    │
│ "Your Trusted Visa & Travel Partner Across      │
│  India" + Subheading                            │
│ [Country Search Bar - "Which country visa?"]    │
│ Background: Professional travel photography     │
│ Trust bar: IATA | ISO | Years | Visas processed │
├─────────────────────────────────────────────────┤
│ QUICK VISA SEARCH                               │
│ Popular countries grid (US, UK, Canada, AU,     │
│ Schengen, Singapore, UAE, etc.)                 │
│ Each card: Flag + Country + "Apply Now"         │
├─────────────────────────────────────────────────┤
│ SERVICES OVERVIEW                               │
│ 4-6 service cards with icons                    │
│ Visa Consulting | Travel Insurance | Passport   │
│ Document Attestation | Corporate Travel         │
├─────────────────────────────────────────────────┤
│ WHY CHOOSE US                                   │
│ Stats: X+ visas processed | X+ countries        │
│ X locations | X% success rate                   │
│ Differentiators: Expert team, transparent       │
│ pricing, end-to-end support, fast processing    │
├─────────────────────────────────────────────────┤
│ OUR LOCATIONS                                   │
│ Interactive map or card grid showing:           │
│ Bangalore ✓ | Hyderabad ✓ | Delhi (Coming) |   │
│ Chennai (Coming) | + "Expanding Pan India"      │
├─────────────────────────────────────────────────┤
│ TESTIMONIALS                                    │
│ Carousel of client reviews with photos          │
│ Service type tags (Visa, Travel, Corporate)     │
├─────────────────────────────────────────────────┤
│ LATEST FROM BLOG                                │
│ 3 recent blog posts (visa guides, travel news)  │
├─────────────────────────────────────────────────┤
│ CTA SECTION                                     │
│ "Ready to Start Your Journey?"                  │
│ [Book Free Consultation] [Call Us Now]           │
├─────────────────────────────────────────────────┤
│ FOOTER                                          │
│ Logo | Quick Links | Services | Locations       │
│ Contact Info (all cities) | Social Media        │
│ Certifications | Legal Links | Copyright        │
└─────────────────────────────────────────────────┘
```

---

### VISA COUNTRY PAGE (/visa/[country])
**Purpose:** SEO landing page + lead capture for specific country
**SEO Target:** "[country] visa from India", "[country] visa consultant"

```
┌─────────────────────────────────────────────────┐
│ BREADCRUMB: Home > Visa > [Country]             │
├─────────────────────────────────────────────────┤
│ COUNTRY HEADER                                  │
│ [Flag] [Country Name] Visa Services             │
│ Quick stats: Processing time | Fee range |      │
│ Success rate                                    │
│ [Apply Now] [Download Checklist]                │
├─────────────────────────────────────────────────┤
│ VISA TYPES TAB NAVIGATION                       │
│ Tourist | Business | Student | Work | Transit   │
├─────────────────────────────────────────────────┤
│ SELECTED VISA TYPE DETAILS                      │
│ ├── Overview & eligibility                      │
│ ├── Required documents (checklist)              │
│ ├── Fee structure (with embassy fee disclaimer) │
│ ├── Processing timeline                         │
│ ├── Application steps (numbered)                │
│ └── Important notes & tips                      │
├─────────────────────────────────────────────────┤
│ SIDEBAR (Desktop) / Accordion (Mobile)          │
│ ├── Quick Inquiry Form                          │
│ ├── CTS Contact for this visa                   │
│ ├── Nearest office location                     │
│ └── Related countries                           │
├─────────────────────────────────────────────────┤
│ FAQ SECTION (Schema.org FAQ markup)             │
│ Common questions about [country] visa           │
├─────────────────────────────────────────────────┤
│ RELATED BLOG POSTS                              │
│ "[Country] travel guide", "Visa tips for..."    │
└─────────────────────────────────────────────────┘
```

---

### LOCATION PAGE (/locations/[city])
**Purpose:** Local SEO landing page for each city
**SEO Target:** "visa consultant in [city]", "travel agency [city]"

```
┌─────────────────────────────────────────────────┐
│ CITY HEADER                                     │
│ "CloudTravelSolution [City]"                    │
│ Hero image of city landmark                     │
├─────────────────────────────────────────────────┤
│ OFFICE DETAILS                                  │
│ ├── Full address with Google Maps embed         │
│ ├── Phone numbers (local + toll-free)           │
│ ├── Email                                       │
│ ├── Operating hours                             │
│ ├── Directions / Nearest metro/landmark         │
│ └── Photos of office                            │
├─────────────────────────────────────────────────┤
│ SERVICES AVAILABLE AT THIS LOCATION             │
│ Service cards specific to this office           │
├─────────────────────────────────────────────────┤
│ LOCAL TEAM                                      │
│ Team member profiles (photo, name, role)        │
├─────────────────────────────────────────────────┤
│ CITY-SPECIFIC TESTIMONIALS                      │
│ Reviews from clients in this city               │
├─────────────────────────────────────────────────┤
│ POPULAR VISA SERVICES IN [CITY]                 │
│ Most-requested visas from this location         │
├─────────────────────────────────────────────────┤
│ LOCAL CONTACT FORM                              │
│ Pre-filled with city, routed to local office    │
└─────────────────────────────────────────────────┘
```

---

### INQUIRY FORM (/inquiry/visa)
**Purpose:** Primary lead capture for visa services
**Design:** Multi-step form to reduce abandonment

```
Step 1: Personal Information
├── Full Name *
├── Email *
├── Phone (with +91 prefix) *
└── City (dropdown: Bangalore, Hyderabad, Delhi, Chennai, Other)

Step 2: Visa Requirements
├── Destination Country (searchable dropdown) *
├── Visa Type (Tourist, Business, Student, Work, etc.) *
├── Number of Travelers
├── Preferred Travel Date
└── Have you applied before? (Yes/No)

Step 3: Additional Details
├── Purpose of visit (textarea)
├── Preferred contact method (Call, Email, WhatsApp)
├── Preferred time for callback
└── How did you hear about us? (dropdown)

Step 4: Confirmation
├── Summary of submission
├── Privacy policy consent checkbox *
├── [Submit Inquiry] button
└── "We'll contact you within 2 business hours"
```

---

## SEO Strategy per Page Type

| Page Type | Primary Keywords | Schema Markup |
|-----------|-----------------|---------------|
| Home | "visa consultant India", "travel agency India" | Organization, LocalBusiness |
| Visa/Country | "[country] visa from India", "[country] visa requirements" | FAQPage, HowTo |
| Visa/Type | "[type] visa India", "student visa consultant" | Service |
| Location | "visa consultant [city]", "travel agency [city]" | LocalBusiness |
| Blog | Long-tail informational queries | Article, BlogPosting |
| FAQ | Question-based queries | FAQPage |

---

## URL Structure Conventions

- All lowercase, hyphenated slugs
- No trailing slashes
- Country slugs use full names: `/visa/united-states` not `/visa/us`
- Blog slugs use descriptive titles: `/blog/usa-tourist-visa-guide-2026`
- Location slugs use city names: `/locations/bangalore`
- Maximum URL depth: 3 levels
- Canonical URLs on all pages
- Hreflang tags when multi-language is enabled

---

## Navigation Structure

### Primary Navigation (Desktop)
```
Logo | Services ▾ | Visa ▾ | Locations ▾ | Blog | About ▾ | Contact | [Free Consultation]
```

### Services Mega Menu
```
┌──────────────────────────────────────┐
│ Visa Consulting    | Travel Insurance│
│ Passport Services  | Document Attest │
│ Corporate Travel   | [View All →]    │
└──────────────────────────────────────┘
```

### Visa Mega Menu
```
┌──────────────────────────────────────────────┐
│ Popular Countries      │ By Visa Type        │
│ 🇺🇸 United States     │ Tourist Visa        │
│ 🇬🇧 United Kingdom    │ Business Visa       │
│ 🇨🇦 Canada            │ Student Visa        │
│ 🇦🇺 Australia         │ Work Permit         │
│ 🇸🇬 Singapore         │ Transit Visa        │
│ 🇦🇪 UAE               │                     │
│ [View All Countries →] │ [All Visa Types →]  │
└──────────────────────────────────────────────┘
```

### Mobile Navigation
- Hamburger menu with full-screen overlay
- Accordion-style dropdowns for nested items
- Sticky "Call Us" and "Inquire" buttons at bottom
- Search functionality accessible from menu

---

## Content Volume Estimates

| Content Type | Initial Count | Monthly Growth |
|-------------|---------------|----------------|
| Country visa pages | 30 (top destinations) | +5/month → 190 |
| Blog posts | 10 (launch) | +4/month |
| Location pages | 4 (BLR, HYD, DEL, CHE) | As expansion happens |
| FAQs | 50 (launch) | +10/month |
| Testimonials | 15 (launch) | +5/month |
| Team profiles | 8 (launch) | As hired |

---

*This sitemap will evolve as the project progresses. Priority pages for MVP launch are marked in the Project Plan.*
