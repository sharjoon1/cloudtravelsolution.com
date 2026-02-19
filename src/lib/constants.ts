export const SITE_CONFIG = {
  name: "CloudTravelSolution",
  tagline: "Your Trusted Visa & Travel Partner Across India",
  description:
    "India's leading visa consulting and travel agency. Expert visa services for all countries from Bangalore, Hyderabad, Delhi, and Chennai. Pan India presence.",
  url: "https://cloudtravelsolution.com",
  ogImage: "/images/og-image.jpg",
  tollFree: "+91 8095976543",
  email: "info@cloudtravelsolution.com",
} as const;

export const LOCATIONS = [
  {
    city: "Bangalore",
    state: "Karnataka",
    status: "active" as const,
    slug: "bangalore",
    phone: "+91 8095976543",
    email: "bangalore@cloudtravelsolution.com",
  },
  {
    city: "Hyderabad",
    state: "Telangana",
    status: "active" as const,
    slug: "hyderabad",
    phone: "+91 8095976543",
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
  { name: "United States", slug: "united-states", code: "US", flag: "🇺🇸", processingTime: "3-5 weeks", visaFee: "₹14,000" },
  { name: "United Kingdom", slug: "united-kingdom", code: "GB", flag: "🇬🇧", processingTime: "15 working days", visaFee: "₹10,500" },
  { name: "Canada", slug: "canada", code: "CA", flag: "🇨🇦", processingTime: "4-8 weeks", visaFee: "₹7,500" },
  { name: "Australia", slug: "australia", code: "AU", flag: "🇦🇺", processingTime: "15-30 days", visaFee: "₹11,000" },
  { name: "Schengen (Europe)", slug: "schengen", code: "EU", flag: "🇪🇺", processingTime: "15 calendar days", visaFee: "₹7,000" },
  { name: "Singapore", slug: "singapore", code: "SG", flag: "🇸🇬", processingTime: "3-5 working days", visaFee: "₹2,500" },
  { name: "UAE", slug: "uae", code: "AE", flag: "🇦🇪", processingTime: "3-4 working days", visaFee: "₹5,500" },
  { name: "Malaysia", slug: "malaysia", code: "MY", flag: "🇲🇾", processingTime: "5-7 working days", visaFee: "₹3,000" },
  { name: "Thailand", slug: "thailand", code: "TH", flag: "🇹🇭", processingTime: "2-3 working days", visaFee: "₹3,500" },
  { name: "Japan", slug: "japan", code: "JP", flag: "🇯🇵", processingTime: "5-7 working days", visaFee: "₹2,000" },
  { name: "South Korea", slug: "south-korea", code: "KR", flag: "🇰🇷", processingTime: "5-7 working days", visaFee: "₹3,000" },
  { name: "New Zealand", slug: "new-zealand", code: "NZ", flag: "🇳🇿", processingTime: "20-25 days", visaFee: "₹12,000" },
] as const;

export const NAV_ITEMS = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Visa Appointment", href: "/services/visa-appointment" },
      { label: "Visa Assistance", href: "/services/visa-assistance" },
      { label: "Travel Insurance", href: "/services/travel-insurance" },
      { label: "Flight & Hotel Booking", href: "/services/flight-hotel-booking" },
      { label: "Passport Service", href: "/services/passport-services" },
      { label: "Document Attestation", href: "/services/document-attestation" },
      { label: "Educational Visa", href: "/services/educational-visa-assistance" },
      { label: "Manpower Visa", href: "/services/manpower-visa-assistance" },
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
  { label: "Track", href: "/track" },
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
    title: "Visa Appointment",
    slug: "visa-appointment",
    description: "Hassle-free visa appointment booking for embassies and consulates across all countries.",
    icon: "CalendarCheck",
  },
  {
    title: "Visa Assistance",
    slug: "visa-assistance",
    description: "End-to-end visa application support with document review, form filling, and submission guidance.",
    icon: "FileCheck",
  },
  {
    title: "Travel Insurance",
    slug: "travel-insurance",
    description: "Comprehensive travel insurance packages tailored to your destination and travel needs.",
    icon: "Shield",
  },
  {
    title: "Flight & Hotel Booking",
    slug: "flight-hotel-booking",
    description: "Best deals on flights and hotel reservations worldwide. Complete travel itinerary planning.",
    icon: "Plane",
  },
  {
    title: "Passport Service",
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
    title: "Educational Visa Assistance",
    slug: "educational-visa-assistance",
    description: "Specialized visa support for students pursuing education abroad with university-specific guidance.",
    icon: "GraduationCap",
  },
  {
    title: "Manpower Visa Assistance",
    slug: "manpower-visa-assistance",
    description: "Bulk visa processing and work permit assistance for manpower and recruitment agencies.",
    icon: "Users",
  },
] as const;

export const SERVICE_REQUEST_STATUSES = [
  { label: "Received", value: "received" },
  { label: "Documents Verified", value: "documents-verified" },
  { label: "Submitted to Embassy", value: "submitted-to-embassy" },
  { label: "Under Processing", value: "under-processing" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
  { label: "Delivered", value: "delivered" },
  { label: "On Hold", value: "on-hold" },
] as const;

export const PARTNER_TYPES = [
  { label: "Educational Consultancy", value: "educational-consultancy" },
  { label: "Manpower Company", value: "manpower-company" },
  { label: "Travel Agency", value: "travel-agency" },
  { label: "Other", value: "other" },
] as const;

export const PARTNER_NAV_ITEMS = [
  { label: "Dashboard", href: "/partner/dashboard" },
  { label: "Submit Request", href: "/partner/submit" },
  { label: "Track", href: "/track" },
] as const;
