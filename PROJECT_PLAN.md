# CloudTravelSolution - Comprehensive Development Plan

> **Version:** 1.0
> **Date:** 2026-02-16
> **Methodology:** Agile/Scrum (2-week sprints)
> **Total Sprints:** 10 (20 weeks)

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Phase Breakdown](#2-phase-breakdown)
3. [Sprint Plan](#3-sprint-plan)
4. [Design System](#4-design-system)
5. [Development Roadmap](#5-development-roadmap)
6. [Testing Strategy](#6-testing-strategy)
7. [Deployment Plan](#7-deployment-plan)
8. [Pan India Expansion Strategy](#8-pan-india-expansion-strategy)
9. [SKILLS.MD Protocol](#9-skillsmd-protocol)
10. [Risk Register](#10-risk-register)

---

## 1. Project Overview

### Vision
Build India's most modern, user-friendly travel and visa consulting website that differentiates CloudTravelSolution from legacy competitors through superior UX, transparency, and digital-first service delivery.

### Goals
1. Establish credible online presence for CTS across 4 cities
2. Generate qualified visa consultation leads via the website
3. Rank on page 1 for "visa consultant in [Bangalore/Hyderabad/Delhi/Chennai]"
4. Outperform all competitor websites on Core Web Vitals
5. Build scalable architecture for Pan India expansion

### Success Metrics
| Metric | 3-Month Target | 6-Month Target | 12-Month Target |
|--------|---------------|----------------|-----------------|
| Monthly organic traffic | 5,000 | 15,000 | 50,000 |
| Lead form submissions/month | 100 | 400 | 1,500 |
| Lead conversion rate | 5% | 8% | 12% |
| Lighthouse score | 95+ | 95+ | 95+ |
| Bounce rate | < 50% | < 40% | < 35% |
| Avg. session duration | > 2 min | > 3 min | > 4 min |

---

## 2. Phase Breakdown

### Phase 0: Foundation (Sprint 0)
**Goal:** Set up project infrastructure and finalize decisions

- [ ] Initialize Git repository
- [ ] Set up Next.js 15 project with TypeScript
- [ ] Configure Tailwind CSS 4 with brand design tokens
- [ ] Set up Payload CMS v3 embedded in Next.js
- [ ] Configure PostgreSQL on Neon.tech
- [ ] Set up Vercel project and CI/CD pipeline
- [ ] Configure ESLint, Prettier, Husky pre-commit hooks
- [ ] Set up Vitest and Playwright
- [ ] Create initial SKILLS.MD file ✓
- [ ] Create project folder structure

**Folder Structure:**
```
cloud-travel-solution/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (frontend)/         # Public-facing route group
│   │   │   ├── page.tsx        # Home page
│   │   │   ├── about/
│   │   │   ├── visa/
│   │   │   │   └── [country]/
│   │   │   ├── locations/
│   │   │   │   └── [city]/
│   │   │   ├── services/
│   │   │   ├── blog/
│   │   │   │   └── [slug]/
│   │   │   ├── contact/
│   │   │   ├── inquiry/
│   │   │   └── resources/
│   │   ├── (payload)/          # Payload CMS admin routes
│   │   │   └── admin/
│   │   ├── api/                # API routes
│   │   │   ├── inquiry/
│   │   │   ├── callback/
│   │   │   └── newsletter/
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                 # Base UI components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   ├── modal.tsx
│   │   │   └── ...
│   │   ├── layout/             # Layout components
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── navigation.tsx
│   │   │   └── mega-menu.tsx
│   │   ├── sections/           # Page sections
│   │   │   ├── hero.tsx
│   │   │   ├── services-grid.tsx
│   │   │   ├── testimonials.tsx
│   │   │   ├── locations-map.tsx
│   │   │   ├── country-grid.tsx
│   │   │   ├── stats-counter.tsx
│   │   │   └── cta-banner.tsx
│   │   ├── forms/              # Form components
│   │   │   ├── visa-inquiry-form.tsx
│   │   │   ├── callback-form.tsx
│   │   │   ├── contact-form.tsx
│   │   │   └── newsletter-form.tsx
│   │   └── visa/               # Visa-specific components
│   │       ├── country-card.tsx
│   │       ├── visa-type-tabs.tsx
│   │       ├── requirements-checklist.tsx
│   │       ├── fee-table.tsx
│   │       └── country-search.tsx
│   ├── collections/            # Payload CMS collections
│   │   ├── Countries.ts
│   │   ├── VisaTypes.ts
│   │   ├── Locations.ts
│   │   ├── BlogPosts.ts
│   │   ├── Testimonials.ts
│   │   ├── FAQs.ts
│   │   ├── Inquiries.ts
│   │   ├── TeamMembers.ts
│   │   └── Media.ts
│   ├── lib/                    # Utility functions
│   │   ├── utils.ts
│   │   ├── validations.ts
│   │   ├── constants.ts
│   │   └── seo.ts
│   ├── hooks/                  # Custom React hooks
│   ├── types/                  # TypeScript types
│   └── styles/                 # Global styles & tokens
├── public/
│   ├── images/
│   ├── icons/
│   └── fonts/
├── tests/
│   ├── unit/
│   └── e2e/
├── payload.config.ts           # Payload CMS configuration
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── SKILLS.md
├── PROJECT_PLAN.md
├── COMPETITOR_ANALYSIS.md
├── TECH_STACK.md
└── SITEMAP.md
```

---

### Phase 1: Design System & Core Layout (Sprints 1-2)

**Sprint 1: Design System + Layout Shell**
- [ ] Define brand color palette and typography
- [ ] Create Tailwind design token configuration
- [ ] Build base UI component library (Button, Input, Card, Badge, Modal)
- [ ] Build Header with responsive navigation
- [ ] Build mega menu (Services, Visa, Locations)
- [ ] Build Footer with all sections
- [ ] Build mobile navigation (hamburger + overlay)
- [ ] Create page layout wrapper component
- [ ] Implement breadcrumb component
- [ ] Source and optimize stock photography (non-AI)
- [ ] **Update SKILLS.MD** → Design decisions and component patterns

**Sprint 2: Home Page**
- [ ] Build Hero section with country search bar
- [ ] Build popular countries grid with flag cards
- [ ] Build services overview section
- [ ] Build "Why Choose Us" stats section with animated counters
- [ ] Build locations section with interactive cards
- [ ] Build testimonials carousel
- [ ] Build latest blog posts section
- [ ] Build CTA banner section
- [ ] Implement page transitions and scroll animations
- [ ] Mobile-optimize all home page sections
- [ ] **Update SKILLS.MD** → Home page implementation details

---

### Phase 2: Visa & Services Pages (Sprints 3-4)

**Sprint 3: Visa System**
- [ ] Set up Payload CMS collections (Countries, VisaTypes)
- [ ] Build country visa page template (/visa/[country])
- [ ] Build visa type tabs component
- [ ] Build requirements checklist component
- [ ] Build fee table component
- [ ] Build country search/filter component
- [ ] Build sidebar with quick inquiry form
- [ ] Implement FAQ accordion with Schema.org markup
- [ ] Create initial content for top 10 destination countries:
  - United States, United Kingdom, Canada, Australia
  - Schengen (Germany/France/Italy), Singapore
  - UAE, Malaysia, Thailand, Japan
- [ ] Implement breadcrumbs and internal linking
- [ ] **Update SKILLS.MD** → CMS patterns and visa data modeling

**Sprint 4: Services + About Pages**
- [ ] Build Services hub page (/services)
- [ ] Build individual service pages (5 pages)
- [ ] Build About page with company story
- [ ] Build Team page with member profiles
- [ ] Build Certifications page
- [ ] Build visa type category pages (/visa/types/[type])
- [ ] Add 10 more country visa pages (20 total)
- [ ] **Update SKILLS.MD** → Content architecture patterns

---

### Phase 3: Location Pages & Lead Capture (Sprints 5-6)

**Sprint 5: Location Pages**
- [ ] Build location page template (/locations/[city])
- [ ] Create Bangalore page with office details, map, local team
- [ ] Create Hyderabad page
- [ ] Create Delhi page (with "Opening Soon" treatment)
- [ ] Create Chennai page (with "Opening Soon" treatment)
- [ ] Build Pan India expansion roadmap page
- [ ] Implement Google Maps integration
- [ ] Add LocalBusiness Schema.org markup per city
- [ ] Set up Google My Business listings (link from site)
- [ ] **Update SKILLS.MD** → Local SEO implementation

**Sprint 6: Forms & Lead System**
- [ ] Build multi-step visa inquiry form
- [ ] Build callback request form
- [ ] Build contact page with city-specific routing
- [ ] Build franchise/partner inquiry form
- [ ] Set up Payload CMS Inquiries collection
- [ ] Implement Resend email notifications
  - Lead confirmation to customer
  - New lead alert to CTS team (routed by city)
- [ ] Build inquiry management interface in Payload admin
- [ ] Implement rate limiting on form submissions
- [ ] Add CAPTCHA (Cloudflare Turnstile - privacy-friendly)
- [ ] **Update SKILLS.MD** → Form system and lead management

---

### Phase 4: Content & SEO (Sprints 7-8)

**Sprint 7: Blog & Resources**
- [ ] Set up BlogPosts collection in Payload CMS
- [ ] Build blog listing page with pagination
- [ ] Build blog post page with rich content rendering
- [ ] Build category and tag filtering
- [ ] Build related posts component
- [ ] Build FAQ page with search
- [ ] Build Embassy Directory resource page
- [ ] Write and publish 10 initial blog posts:
  - "Complete Guide to US Tourist Visa from India (2026)"
  - "Schengen Visa Requirements: Everything You Need to Know"
  - "How to Choose the Right Visa Consultant in India"
  - "Student Visa Guide: Top Destinations for Indian Students"
  - "Business Visa vs Tourist Visa: Key Differences Explained"
  - "Top 10 Visa-Free Countries for Indian Passport Holders"
  - "Document Checklist: What You Need for Any Visa Application"
  - "Common Visa Rejection Reasons and How to Avoid Them"
  - "Travel Insurance: Why It's Mandatory for Visa Applications"
  - "CloudTravelSolution: Your Local Visa Expert in Bangalore & Hyderabad"
- [ ] **Update SKILLS.MD** → Content management patterns

**Sprint 8: SEO & Performance**
- [ ] Implement comprehensive meta tags (title, description, OG, Twitter)
- [ ] Add Schema.org structured data to all page types
  - Organization (home)
  - LocalBusiness (location pages)
  - FAQPage (FAQ sections)
  - Article (blog posts)
  - Service (service pages)
  - BreadcrumbList (all pages)
  - HowTo (visa application steps)
- [ ] Generate and submit XML sitemap
- [ ] Set up robots.txt
- [ ] Implement canonical URLs
- [ ] Optimize Core Web Vitals
  - Lazy load below-fold images
  - Preload critical fonts and hero image
  - Minimize JavaScript bundle
  - Implement route prefetching
- [ ] Set up Google Search Console
- [ ] Set up Google Analytics 4
- [ ] Set up Google Tag Manager with conversion tracking
- [ ] Configure Vercel Analytics
- [ ] Add 10 more country visa pages (30 total)
- [ ] **Update SKILLS.MD** → SEO and performance techniques

---

### Phase 5: Polish, Testing & Launch (Sprints 9-10)

**Sprint 9: Testing & QA**
- [ ] Unit tests for utility functions and form validation (Vitest)
- [ ] Component tests for critical UI components
- [ ] E2E tests for key user journeys (Playwright):
  - Home → Country search → Visa page → Inquiry form → Confirmation
  - Home → Location page → Contact form → Confirmation
  - Blog navigation → Post → Related posts
  - Mobile navigation flow
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile device testing (iOS Safari, Android Chrome)
- [ ] Accessibility audit (axe-core, keyboard navigation)
- [ ] Performance audit (Lighthouse CI)
- [ ] Security audit (headers, form validation, rate limiting)
- [ ] Content review and proofreading
- [ ] Broken link check
- [ ] **Update SKILLS.MD** → Testing methodologies and findings

**Sprint 10: Launch Preparation & Go-Live**
- [ ] Final content review and approval from CTS stakeholders
- [ ] Domain configuration (DNS, SSL)
- [ ] Set up production environment on Vercel
- [ ] Configure production database on Neon.tech
- [ ] Set up Cloudinary production account
- [ ] Configure production email (Resend)
- [ ] Set up error monitoring (Sentry free tier)
- [ ] Set up uptime monitoring (Better Stack free tier)
- [ ] Create 301 redirect map (if migrating from existing site)
- [ ] Pre-launch checklist verification
- [ ] **LAUNCH** 🚀
- [ ] Post-launch monitoring (48 hours)
- [ ] Submit sitemap to Google Search Console
- [ ] Verify all analytics tracking
- [ ] **Update SKILLS.MD** → Final assessment and lessons learned

---

## 3. Sprint Plan

| Sprint | Duration | Phase | Key Deliverables |
|--------|----------|-------|-----------------|
| 0 | 2 weeks | Foundation | Project setup, tooling, CI/CD, SKILLS.MD |
| 1 | 2 weeks | Design System | UI components, Header, Footer, Navigation |
| 2 | 2 weeks | Design System | Complete Home Page |
| 3 | 2 weeks | Core Pages | Visa country pages (10), CMS setup |
| 4 | 2 weeks | Core Pages | Services, About, Visa types, +10 countries |
| 5 | 2 weeks | Locations | 4 city pages, Maps, Local SEO |
| 6 | 2 weeks | Lead Capture | Forms, Email notifications, Lead management |
| 7 | 2 weeks | Content | Blog, FAQ, Resources, 10 blog posts |
| 8 | 2 weeks | SEO | Schema markup, Analytics, Performance, +10 countries |
| 9 | 2 weeks | Testing | Unit, E2E, Accessibility, Security, Cross-browser |
| 10 | 2 weeks | Launch | Production setup, DNS, Monitoring, GO-LIVE |

---

## 4. Design System

### Brand Colors (Proposed)
```
Primary:     #1B4D7A  (Deep Ocean Blue - trust, professionalism)
Secondary:   #E8963E  (Warm Amber - warmth, adventure)
Accent:      #2A9D6E  (Emerald Green - growth, prosperity)
Neutral 50:  #FAFAFA
Neutral 100: #F5F5F5
Neutral 200: #E5E5E5
Neutral 300: #D4D4D4
Neutral 500: #737373
Neutral 700: #404040
Neutral 900: #171717
Success:     #16A34A
Warning:     #EAB308
Error:       #DC2626
Info:        #2563EB
```

### Typography
```
Headings: "Plus Jakarta Sans" (Google Fonts - modern, professional, non-generic)
Body:     "Inter" (Google Fonts - excellent readability, wide language support)
Mono:     "JetBrains Mono" (for any data display)
```

### Spacing Scale (rem)
```
0.25 | 0.5 | 0.75 | 1 | 1.5 | 2 | 3 | 4 | 6 | 8 | 12 | 16
```

### Breakpoints
```
sm:  640px   (Mobile landscape)
md:  768px   (Tablet)
lg:  1024px  (Desktop)
xl:  1280px  (Wide desktop)
2xl: 1536px  (Ultra wide)
```

### Design Principles
1. **Clean over clever** - Readability and clarity above artistic expression
2. **Content-first** - Design serves the information, not the other way around
3. **Trust through consistency** - Uniform spacing, typography, and color usage
4. **Purposeful motion** - Animations that guide attention, not distract
5. **Accessible by default** - Color contrast, focus states, screen reader compatibility
6. **Photographic authenticity** - Only real, professional travel photography (no AI-generated imagery)

### Photography Direction
- Source from: Unsplash, Pexels, Shutterstock (licensed)
- Style: Authentic travel moments, landmark photography, office/team photos
- Treatment: Slight warm color grade, consistent brightness
- Hero images: High-resolution (2400px wide minimum), landscape orientation
- Office photos: Professional, well-lit, showing real workspace
- Country images: Iconic landmarks, cultural moments, natural landscapes

---

## 5. Development Roadmap

### MVP (Minimum Viable Product) - Launch
**Includes:**
- Complete home page
- 30 country visa pages (top destinations)
- All 5 service pages
- 4 location pages
- Blog with 10 posts
- Visa inquiry form + callback form
- Contact page
- FAQ page
- Full SEO setup
- Analytics integration
- Email notification system
- Responsive design (all devices)

**Does NOT include (post-launch):**
- Visa status tracker
- User accounts/login
- Online payment
- Multi-language (Hindi, regional)
- B2B portal
- Mobile app
- Live chat
- WhatsApp integration

### Post-Launch Roadmap

**Month 1-2 Post-Launch:**
- Remaining country visa pages (30 → 60)
- WhatsApp Business integration
- Zoho CRM integration
- 8 more blog posts
- Performance optimization based on real data

**Month 3-4 Post-Launch:**
- Hindi language support
- Visa status tracker (inquiry tracking)
- Live chat widget (Tawk.to or Crisp - free)
- 60 → 100 country pages
- Landing pages for PPC campaigns

**Month 5-6 Post-Launch:**
- Regional language support (Kannada, Telugu)
- Testimonials video section
- Referral program page
- Advanced analytics dashboard for CTS team
- 100 → 150 country pages

**Month 7-12 Post-Launch:**
- B2B partner portal (for travel agents)
- Franchise inquiry system
- Online document upload for visa applications
- Payment gateway (Razorpay) for service fees
- Mobile app (React Native or PWA)
- Push notifications
- Remaining country pages (150 → 190)

---

## 6. Testing Strategy

### Testing Pyramid

```
           ╱╲
          ╱ E2E ╲          (10% - Critical paths only)
         ╱────────╲
        ╱Integration╲      (20% - API routes, CMS queries)
       ╱──────────────╲
      ╱   Component     ╲   (30% - UI components with mocks)
     ╱────────────────────╲
    ╱      Unit Tests       ╲ (40% - Utils, validations, helpers)
   ╱──────────────────────────╲
```

### Unit Tests (Vitest)
- Form validation schemas (Zod)
- Utility functions (date formatting, slug generation, SEO helpers)
- Data transformation functions
- Constants and configuration

### Component Tests (Vitest + React Testing Library)
- Form components (input validation, step navigation)
- Navigation components (menu open/close, active states)
- Search components (filtering, results display)
- Card components (data rendering)
- Carousel/slider (navigation, auto-play)

### End-to-End Tests (Playwright)
| Test Scenario | Priority |
|--------------|----------|
| Home page loads with all sections | P0 |
| Country search → visa page navigation | P0 |
| Visa inquiry form complete submission | P0 |
| Callback form submission | P0 |
| Mobile navigation flow | P0 |
| Blog listing → post → related posts | P1 |
| Location page with map interaction | P1 |
| Contact form submission by city | P1 |
| SEO meta tags presence verification | P1 |
| 404 page handling | P2 |

### Performance Testing
- Lighthouse CI in GitHub Actions (block PR if score < 90)
- Core Web Vitals monitoring via Vercel Analytics
- Bundle size tracking (fail if JS > 200KB initial load)
- Image optimization verification

### Accessibility Testing
- axe-core automated checks in CI
- Keyboard navigation manual testing
- Screen reader testing (NVDA/VoiceOver)
- Color contrast verification (WCAG AA minimum)
- Focus management on modals and menus

### Cross-Browser Matrix
| Browser | Desktop | Mobile |
|---------|---------|--------|
| Chrome | ✅ Latest | ✅ Android |
| Firefox | ✅ Latest | ✅ Android |
| Safari | ✅ Latest | ✅ iOS |
| Edge | ✅ Latest | - |
| Samsung Internet | - | ✅ |

---

## 7. Deployment Plan

### Environment Strategy
```
Local Development → Preview (per PR) → Staging → Production
```

| Environment | URL | Database | Purpose |
|-------------|-----|----------|---------|
| Local | localhost:3000 | Local PostgreSQL / Neon branch | Development |
| Preview | *.vercel.app (per PR) | Neon branch | PR review |
| Staging | staging.cloudtravelsolution.com | Neon staging branch | Pre-production testing |
| Production | cloudtravelsolution.com | Neon production | Live site |

### CI/CD Pipeline (GitHub Actions)
```
Push to feature branch
  → Lint (ESLint)
  → Type check (tsc)
  → Unit tests (Vitest)
  → Build (next build)
  → Deploy to Vercel Preview
  → Lighthouse CI check

Merge to main
  → All above checks
  → E2E tests (Playwright)
  → Deploy to Vercel Production
  → Notify team (Slack/Discord)
```

### Launch Checklist
- [ ] DNS configured (A record / CNAME to Vercel)
- [ ] SSL certificate active (automatic via Vercel)
- [ ] www → non-www redirect (or vice versa)
- [ ] robots.txt allowing all crawlers
- [ ] sitemap.xml submitted to Google Search Console
- [ ] All environment variables set in Vercel
- [ ] Database migrated to production
- [ ] CMS admin accounts created for CTS team
- [ ] Email notification delivery verified
- [ ] Analytics tracking verified (GA4 real-time)
- [ ] Error monitoring active (Sentry)
- [ ] Uptime monitoring active (Better Stack)
- [ ] Backup strategy confirmed (Neon automated backups)
- [ ] 301 redirects in place (if applicable)
- [ ] Performance baseline recorded
- [ ] Content reviewed and approved by CTS team
- [ ] Legal pages reviewed (Privacy Policy, Terms)
- [ ] Contact information verified for all cities

### Post-Launch Monitoring (First 48 Hours)
- Monitor error logs (Sentry) every 4 hours
- Check uptime monitoring dashboard
- Review GA4 real-time for traffic anomalies
- Test all forms with real submissions
- Monitor Core Web Vitals in Vercel Analytics
- Check Google Search Console for crawl errors

---

## 8. Pan India Expansion Strategy

### Website Scalability Plan

**Current (4 Cities):**
```
/locations/bangalore ✅ (Live office)
/locations/hyderabad ✅ (Live office)
/locations/delhi     🔜 (Opening soon)
/locations/chennai   🔜 (Opening soon)
```

**Phase 2 (Tier 1 Expansion):**
```
/locations/mumbai
/locations/pune
/locations/kolkata
/locations/ahmedabad
```

**Phase 3 (Tier 2 Expansion):**
```
/locations/jaipur
/locations/lucknow
/locations/chandigarh
/locations/kochi
/locations/goa
/locations/indore
/locations/coimbatore
/locations/visakhapatnam
```

### How the Website Supports Expansion

1. **Template-driven location pages**
   - Adding a new city = creating a new entry in Payload CMS
   - No developer needed for basic location page launch
   - Consistent branding and UX across all locations

2. **City-specific SEO**
   - Each location page targets "[service] in [city]" keywords
   - LocalBusiness schema markup auto-generated per city
   - Google My Business integration per location

3. **Lead routing by geography**
   - Inquiry forms detect nearest city
   - Email notifications route to correct office
   - CRM lead assignment by region

4. **Regional content**
   - Blog posts can be tagged by region
   - City-specific testimonials and case studies
   - Regional language support (expandable)

5. **Franchise/Partner Model**
   - Dedicated inquiry form for potential franchise partners
   - Partner portal (future) for franchise operations
   - White-label capability consideration for future

### Content Scaling Strategy
| Milestone | Country Pages | Blog Posts | Location Pages |
|-----------|--------------|------------|----------------|
| Launch | 30 | 10 | 4 |
| Month 3 | 60 | 25 | 4 |
| Month 6 | 100 | 50 | 6 |
| Month 12 | 150 | 100 | 10 |
| Month 18 | 190 | 150 | 15+ |

---

## 9. SKILLS.MD Protocol

### When to Update

| Event | What to Update |
|-------|---------------|
| Project initialization | All sections (initial state) ✅ |
| Competitor analysis complete | Section 4: Insights and requirements |
| Design phase complete | Section 2: Design decisions, tools, color/type choices |
| Each sprint completion | Sections 1, 5: New skills used, tech decisions made |
| CMS setup complete | Section 5: Content modeling patterns |
| SEO implementation | Section 3: SEO knowledge gained |
| Testing phase | Section 6: Methodologies and findings |
| Performance optimization | Section 1: Specific techniques used |
| Launch | Section 7: Full milestone log, final assessment |
| Post-launch issues | New entries as learnings emerge |

### Update Template
When updating SKILLS.MD after a milestone, add to Section 7 (Milestone Update Log):
```markdown
| YYYY-MM-DD | [Milestone Name] | [Brief description of skills updated] |
```

And update the relevant sections with new entries, insights, or revised assessments.

---

## 10. Risk Register

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Content delays (visa info from CTS team) | High | High | Start with top 10 countries, provide content templates |
| Scope creep (new feature requests) | High | Medium | Strict MVP definition, backlog management |
| Photography sourcing delays | Medium | Medium | Use placeholder stock photos, replace iteratively |
| SEO results slower than expected | Medium | Medium | Supplement with Google Ads for initial traffic |
| CMS learning curve for CTS staff | Medium | Low | Create admin training guide, screen recording |
| Third-party API changes (Maps, etc.) | Low | Medium | Abstract integrations, have fallbacks |
| Performance regression | Low | High | Lighthouse CI gates, bundle size monitoring |
| Security vulnerability | Low | High | Dependency audits, security headers, rate limiting |

---

## Appendix A: Third-Party Accounts Needed

| Service | Purpose | Account Type | Action |
|---------|---------|-------------|--------|
| GitHub | Code repository | Team (free) | Create repo |
| Vercel | Hosting & deployment | Pro ($20/mo) | Create project |
| Neon.tech | PostgreSQL database | Free → Pro | Create database |
| Cloudinary | Image management | Free → Plus | Create account |
| Resend | Email delivery | Free → Pro | Create account |
| Google Analytics | Traffic analytics | Free | Create property |
| Google Search Console | SEO monitoring | Free | Verify domain |
| Google Tag Manager | Event tracking | Free | Create container |
| Google Maps Platform | Office maps | Pay-as-you-go | Create API key |
| Google Workspace | Business email | Starter ($6/user) | Setup domain email |
| Sentry | Error monitoring | Free (developer) | Create project |
| Better Stack | Uptime monitoring | Free | Create monitor |
| Cloudflare | DNS + Turnstile CAPTCHA | Free | Create account |

---

## Appendix B: Content Templates

### Visa Country Page Content Template
```
Country: [Name]
Flag: [Emoji/Image]
Region: [Asia/Europe/Americas/Africa/Oceania]

Visa Types Available:
  - Tourist Visa
    - Requirements: [Checklist]
    - Fee: INR [amount] (Embassy fee) + INR [amount] (Service fee)
    - Processing Time: [X] working days
    - Validity: [Duration]
    - Documents: [List]
  - Business Visa
    - [Same structure]
  - Student Visa
    - [Same structure]

Embassy/VFS Information:
  - Location in India: [City, Address]
  - Appointment required: Yes/No
  - Processing centres: [Cities]

Travel Advisory: [Green/Yellow/Red]

FAQs:
  1. Q: [Common question] A: [Answer]
  2. Q: [Common question] A: [Answer]
  3. Q: [Common question] A: [Answer]
```

### Blog Post Content Template
```
Title: [SEO-optimized title]
Meta Description: [155 characters]
Category: [visa-guides|travel-tips|country-guides|travel-advisories|company-news]
Author: [Name]
Featured Image: [Non-AI stock photo]

Structure:
  H1: [Title]
  Introduction: [Hook + what reader will learn]
  H2: [Section 1]
  H2: [Section 2]
  H2: [Section 3]
  H2: [Frequently Asked Questions]
  CTA: [Book a free consultation with CloudTravelSolution]
```

---

*This plan is a living document. Update after each sprint retrospective.*
