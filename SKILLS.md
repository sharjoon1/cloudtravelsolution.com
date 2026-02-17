# SKILLS.MD - CloudTravelSolution Project Skills Registry

> **Protocol:** This file is updated after every major project milestone.
> **Last Updated:** 2026-02-17 | **Phase:** Production Deployment & Email Integration

---

## 1. Technical Skills Required

### Frontend Development
| Skill | Proficiency Needed | Status |
|-------|-------------------|--------|
| Next.js 15 (App Router) | Advanced | Required |
| React 19 | Advanced | Required |
| TypeScript | Advanced | Required |
| Tailwind CSS 4 | Advanced | Required |
| Framer Motion (animations) | Intermediate | Required |
| Responsive Design / Mobile-First | Advanced | Required |
| SEO Implementation (metadata, structured data) | Advanced | Required |
| Accessibility (WCAG 2.1 AA) | Intermediate | Required |
| Performance Optimization (Core Web Vitals) | Advanced | Required |

### Backend Development
| Skill | Proficiency Needed | Status |
|-------|-------------------|--------|
| Node.js | Advanced | Required |
| Payload CMS (v3+) | Intermediate | Required |
| PostgreSQL | Intermediate | Required |
| REST API Design | Intermediate | Required |
| Authentication (NextAuth.js) | Intermediate | Required |
| Email Integration (Resend/Nodemailer) | Basic | Required |

### DevOps & Infrastructure
| Skill | Proficiency Needed | Status |
|-------|-------------------|--------|
| Vercel Deployment | Intermediate | Required |
| Docker (development) | Basic | Required |
| CI/CD (GitHub Actions) | Intermediate | Required |
| DNS & Domain Management | Basic | Required |
| SSL/TLS Configuration | Basic | Required |
| CDN Configuration | Basic | Required |

### Analytics & Marketing
| Skill | Proficiency Needed | Status |
|-------|-------------------|--------|
| Google Analytics 4 | Intermediate | Required |
| Google Tag Manager | Intermediate | Required |
| Google Search Console | Intermediate | Required |
| Microsoft Clarity (Heatmaps) | Basic | Required |
| Schema.org Structured Data | Intermediate | Required |
| UTM Tracking | Basic | Required |

### India-Specific Integrations
| Skill | Proficiency Needed | Status |
|-------|-------------------|--------|
| WhatsApp Business API (Interakt) | Intermediate | Required |
| SMS Integration (MSG91) | Basic | Required |
| Razorpay Payment Gateway | Intermediate | Phase 2 |
| Zoho CRM API | Intermediate | Phase 2 |
| UPI Payment Flow | Basic | Phase 2 |

---

## 2. Design Competencies

| Competency | Notes |
|------------|-------|
| UI/UX Design for Travel Industry | Professional, trust-building aesthetic |
| Typography Selection | Readable, modern, professional fonts |
| Color Theory | Brand colors that convey trust, adventure, professionalism |
| Photography Direction | Non-AI, authentic travel imagery sourcing |
| Responsive Layout Design | Mobile-first with desktop excellence |
| Interaction Design | Subtle, purposeful micro-interactions |
| Form UX Design | Multi-step visa inquiry forms with validation |
| Information Architecture | Country-wise visa data organization |

---

## 3. Business Domain Knowledge

### Travel Industry
- Indian travel market dynamics (Tier 1, 2, 3 city demand patterns)
- Visa processing workflows for 190+ countries
- Visa categories: Tourist, Business, Student, Work, Transit, Medical, Conference
- Embassy/Consulate/VFS centre processes in India
- B2B travel agent ecosystem
- MICE (Meetings, Incentives, Conferences, Exhibitions) segment
- Travel insurance requirements and integrations
- Foreign exchange services landscape

### Regulatory Knowledge
- IATA accreditation requirements
- Ministry of External Affairs guidelines
- Data privacy (IT Act 2000, upcoming DPDP Act compliance)
- Consumer protection regulations for travel services
- GST implications for travel services

---

## 4. Competitor Analysis Insights

> **Updated after:** Initial competitor research (2026-02-16)

### Key Findings

| Competitor | Founded | Strength | Weakness for CTS to Exploit |
|------------|---------|----------|---------------------------|
| **Udaan India** | 1992 | Visa specialization, first visa portal (2000), Akasa Air partnership | Dated website design, limited service breadth |
| **FCM Travel** | 2004 | AI-powered platform, $163.9M revenue, 95+ countries | Corporate-focused, not consumer-friendly |
| **Riya Travel** | 1980 | 40+ years, 1M+ visas processed, 300+ visa staff, B2B portal | Cluttered UI, overwhelming information architecture |
| **Jetsave** | 1990 | 35+ years, paperless visa process, strong embassy relations | Limited digital presence, basic website |
| **Thomas Cook** | 1881 | Brand legacy, omnichannel, comprehensive packages | High prices, slow digital adaptation |
| **SOTC** | 1949 | 75+ year legacy, spiritual tourism niche | Premium positioning, limited visa focus |

### Differentiation Opportunities for CloudTravelSolution
1. **Modern UX** - Most competitors have dated or cluttered websites
2. **Visa-First Digital Experience** - Interactive country selector, real-time status tracking
3. **City-Specific Landing Pages** - Hyper-local SEO for Bangalore, Hyderabad, Delhi, Chennai
4. **Transparent Pricing** - Competitors hide fees; transparency builds trust
5. **Mobile-First** - Many competitors have poor mobile experiences
6. **Content Marketing** - Visa guides, travel advisories as SEO magnets
7. **Speed** - Faster page loads than any competitor

---

## 5. Technology Stack Decisions

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Framework** | Next.js 15 (App Router) | SSR/SSG for SEO, React ecosystem, Vercel deployment |
| **Language** | TypeScript | Type safety, better DX, maintainability |
| **Styling** | Tailwind CSS 4 | Rapid development, consistent design, small bundle |
| **CMS** | Payload CMS v3 | Open-source, TypeScript-native, self-hosted control, React admin UI |
| **Database** | PostgreSQL | Reliable, scalable, Payload CMS native support |
| **Deployment** | Vercel | Next.js-optimized, edge network, auto-scaling |
| **Image CDN** | Cloudinary | Travel imagery optimization, transformations, free tier |
| **Email** | Resend | Developer-friendly, reliable delivery, React email templates |
| **Analytics** | GA4 + Plausible | GA4 for depth, Plausible for privacy-friendly dashboard |
| **Forms** | React Hook Form + Zod | Validation, multi-step forms, type safety |
| **Animation** | Framer Motion | Smooth, professional micro-interactions |
| **Icons** | Lucide React | Consistent, lightweight, tree-shakeable |
| **Maps** | Google Maps API | Office locations, visa centre locations |
| **i18n** | next-intl | Multi-language support for Hindi, English, regional |
| **Lead Tracking** | Custom + CRM webhook | Integrate with Zoho CRM or HubSpot Free |

---

## 6. Development Methodology

- **Agile/Scrum** with 2-week sprints
- **Git Flow** branching strategy (main, develop, feature/*, release/*)
- **Code Review** mandatory for all PRs
- **Testing** with Vitest (unit) + Playwright (E2E)
- **CI/CD** via GitHub Actions → Vercel
- **Documentation** inline JSDoc + Storybook for components

---

## 7. Milestone Update Log

| Date | Milestone | Skills Updated |
|------|-----------|---------------|
| 2026-02-16 | Project Initialization & Planning | All sections initialized |
| 2026-02-16 | Sprint 0 Complete | Foundation built: Next.js 16 + Payload CMS v3 + Tailwind 4. 10 CMS collections, 9 UI components, 7 page sections, Header/Footer, 19 passing tests. Full design tokens configured. |
| 2026-02-16 | Sprint 1 Complete | 10 visa country pages, multi-step inquiry form, visa components (VisaTypeTabs, RequirementsChecklist, FeeTable), API routes, location city pages, blog listing, services hub, about, contact pages. Schema.org structured data. |
| 2026-02-16 | Sprint 2 Complete | 10 more visa countries (20 total), 6 full blog posts with detail pages, 5 individual service pages, FAQ page with search/filter, locations hub + expansion roadmap, privacy policy + terms of service, callback + newsletter forms with API routes, robots.txt + XML sitemap. 25 passing tests, 69 source files, 17 page routes. |
| 2026-02-17 | **Production Deployment** | Deployed to Debian 11 server (161.97.114.189). Cloned repo, npm install, built Next.js (81 pages). PM2 process manager. Nginx reverse proxy with SSL. SQLite production DB with schema. Fixed 7 build issues: React.useId conditional calls, zodResolver type mismatch, TypeScript nav narrowing, Zod v4 API compat, payload.config.ts relative imports. |
| 2026-02-17 | **Resend Email Integration** | Connected Resend API (re_X66W...). Verified domain on Cloudflare: DKIM + SPF + DMARC. Emails now sent from hello@cloudtravelsolution.com. Team notifications to sharjoon1@gmail.com. Fixed destination display names in emails (slug→proper name mapping). |
| - | Competitor Analysis Complete | Section 4 to be updated |
| - | Design Phase Complete | Section 2 to be updated |
| - | Testing Complete | Section 6 to be updated |
| - | Domain Email Setup | Verify cloudtravelsolution.com in Resend, update RESEND_FROM_EMAIL |

---

*This document is a living artifact. Update after each milestone completion.*
