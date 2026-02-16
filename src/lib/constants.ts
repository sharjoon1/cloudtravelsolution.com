export const SITE_CONFIG = {
  name: "CloudTravelSolution",
  tagline: "Your Trusted Visa & Travel Partner Across India",
  description:
    "India's leading visa consulting and travel agency. Expert visa services for all countries from Bangalore, Hyderabad, Delhi, and Chennai. Pan India presence.",
  url: "https://cloudtravelsolution.com",
  ogImage: "/images/og-image.jpg",
  tollFree: "1800-XXX-XXXX",
  email: "info@cloudtravelsolution.com",
} as const;

export const LOCATIONS = [
  {
    city: "Bangalore",
    state: "Karnataka",
    status: "active" as const,
    slug: "bangalore",
    phone: "+91 80 XXXX XXXX",
    email: "bangalore@cloudtravelsolution.com",
  },
  {
    city: "Hyderabad",
    state: "Telangana",
    status: "active" as const,
    slug: "hyderabad",
    phone: "+91 40 XXXX XXXX",
    email: "hyderabad@cloudtravelsolution.com",
  },
  {
    city: "Delhi",
    state: "Delhi NCR",
    status: "coming-soon" as const,
    slug: "delhi",
    phone: "",
    email: "delhi@cloudtravelsolution.com",
  },
  {
    city: "Chennai",
    state: "Tamil Nadu",
    status: "coming-soon" as const,
    slug: "chennai",
    phone: "",
    email: "chennai@cloudtravelsolution.com",
  },
] as const;

export const VISA_TYPES = [
  { name: "Tourist Visa", slug: "tourist", icon: "Palmtree" },
  { name: "Business Visa", slug: "business", icon: "Briefcase" },
  { name: "Student Visa", slug: "student", icon: "GraduationCap" },
  { name: "Work Permit", slug: "work-permit", icon: "HardHat" },
  { name: "Transit Visa", slug: "transit", icon: "Plane" },
  { name: "Medical Visa", slug: "medical", icon: "HeartPulse" },
  { name: "Conference Visa", slug: "conference", icon: "Users" },
] as const;

export const POPULAR_COUNTRIES = [
  { name: "United States", slug: "united-states", code: "US", flag: "🇺🇸" },
  { name: "United Kingdom", slug: "united-kingdom", code: "GB", flag: "🇬🇧" },
  { name: "Canada", slug: "canada", code: "CA", flag: "🇨🇦" },
  { name: "Australia", slug: "australia", code: "AU", flag: "🇦🇺" },
  { name: "Schengen (Europe)", slug: "schengen", code: "EU", flag: "🇪🇺" },
  { name: "Singapore", slug: "singapore", code: "SG", flag: "🇸🇬" },
  { name: "UAE", slug: "uae", code: "AE", flag: "🇦🇪" },
  { name: "Malaysia", slug: "malaysia", code: "MY", flag: "🇲🇾" },
  { name: "Thailand", slug: "thailand", code: "TH", flag: "🇹🇭" },
  { name: "Japan", slug: "japan", code: "JP", flag: "🇯🇵" },
  { name: "South Korea", slug: "south-korea", code: "KR", flag: "🇰🇷" },
  { name: "New Zealand", slug: "new-zealand", code: "NZ", flag: "🇳🇿" },
] as const;

export const NAV_ITEMS = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Visa Consulting", href: "/services/visa-consulting" },
      { label: "Travel Insurance", href: "/services/travel-insurance" },
      { label: "Passport Services", href: "/services/passport-services" },
      { label: "Document Attestation", href: "/services/document-attestation" },
      { label: "Corporate Travel", href: "/services/corporate-travel" },
    ],
  },
  {
    label: "Visa",
    href: "/visa",
    children: POPULAR_COUNTRIES.slice(0, 6).map((c) => ({
      label: `${c.flag} ${c.name}`,
      href: `/visa/${c.slug}`,
    })),
  },
  {
    label: "Locations",
    href: "/locations",
    children: LOCATIONS.map((l) => ({
      label: `${l.city}${l.status === "coming-soon" ? " (Coming Soon)" : ""}`,
      href: `/locations/${l.slug}`,
    })),
  },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const TRAVEL_MONTHS = [
  "March 2026",
  "April 2026",
  "May 2026",
  "June 2026",
  "July 2026",
  "August 2026",
  "September 2026",
  "October 2026",
  "November 2026",
  "December 2026",
  "January 2027",
  "February 2027",
  "I'm flexible",
] as const;

export const TRIP_DURATIONS = [
  "1-7 days",
  "8-14 days",
  "15-30 days",
  "1-3 months",
  "3+ months",
  "Not sure",
] as const;

export const TRAVELER_COUNTS = [
  "1 person",
  "2 persons",
  "3 persons",
  "4 persons",
  "5+ persons",
] as const;

export const SERVICES = [
  {
    title: "Visa Consulting",
    slug: "visa-consulting",
    description: "Expert visa guidance for 190+ countries. Tourist, business, student, and work visas with high approval rates.",
    icon: "FileCheck",
  },
  {
    title: "Travel Insurance",
    slug: "travel-insurance",
    description: "Comprehensive travel insurance packages tailored to your destination and travel needs.",
    icon: "Shield",
  },
  {
    title: "Passport Services",
    slug: "passport-services",
    description: "New passport applications, renewals, and tatkal services with end-to-end assistance.",
    icon: "BookOpen",
  },
  {
    title: "Document Attestation",
    slug: "document-attestation",
    description: "Authentication and attestation of documents for embassy submissions and international use.",
    icon: "Stamp",
  },
  {
    title: "Corporate Travel",
    slug: "corporate-travel",
    description: "End-to-end corporate travel management for businesses of all sizes across India.",
    icon: "Building2",
  },
] as const;
