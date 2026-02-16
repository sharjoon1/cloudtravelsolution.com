export interface Location {
  city: string;
  state: string;
  status: "active" | "coming-soon" | "planned";
  slug: string;
  phone: string;
  email: string;
  address?: string;
  mapCoordinates?: { lat: number; lng: number };
  operatingHours?: string;
}

export interface VisaType {
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export interface Country {
  name: string;
  slug: string;
  code: string;
  flag: string;
  region: "asia" | "europe" | "americas" | "africa" | "oceania" | "middle-east";
  visaTypes: VisaTypeDetail[];
  travelAdvisory: "green" | "yellow" | "red";
  embassyInfo?: EmbassyInfo;
  faqs?: FAQ[];
}

export interface VisaTypeDetail {
  type: string;
  requirements: string[];
  fee: {
    embassyFee: number;
    serviceFee: number;
    currency: string;
  };
  processingTime: string;
  validity: string;
  documentsNeeded: string[];
  applicationSteps: string[];
  notes?: string;
}

export interface EmbassyInfo {
  name: string;
  locationInIndia: string;
  appointmentRequired: boolean;
  processingCentres: string[];
  website?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: BlogCategory;
  tags: string[];
  author: TeamMember;
  publishedAt: string;
  updatedAt?: string;
  seo: SEOMetadata;
}

export type BlogCategory =
  | "visa-guides"
  | "travel-tips"
  | "country-guides"
  | "travel-advisories"
  | "company-news";

export interface TeamMember {
  name: string;
  role: string;
  photo?: string;
  bio?: string;
  location?: string;
}

export interface Testimonial {
  clientName: string;
  company?: string;
  serviceUsed: string;
  reviewText: string;
  rating: number;
  photo?: string;
  city?: string;
}

export interface SEOMetadata {
  metaTitle: string;
  metaDescription: string;
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

export interface Inquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  destinationCountry: string;
  visaType: string;
  status: "new" | "contacted" | "proposal-sent" | "converted" | "closed";
  createdAt: string;
  notes?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface Service {
  title: string;
  slug: string;
  description: string;
  icon: string;
  features?: string[];
}
