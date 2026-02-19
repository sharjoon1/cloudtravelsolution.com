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
  status: "new" | "contacted" | "proposal-sent" | "follow-up" | "converted" | "closed";
  appliedBefore?: boolean;
  preferredCallbackTime?: string;
  referralSource?: string;
  customer?: string;
  createdAt: string;
  notes?: string;
}

export interface Customer {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  dateOfBirth?: string;
  passportNumber?: string;
  passportExpiry?: string;
  city?: "bangalore" | "hyderabad" | "delhi" | "chennai" | "other";
  address?: string;
  status: "active" | "inactive" | "vip";
  source?: "lead-form" | "inquiry-form" | "walk-in" | "referral" | "manual";
  assignedTo?: string;
  branch?: string;
  notes?: string;
  totalApplications: number;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentItem {
  documentName: string;
  status: "pending" | "received" | "verified" | "rejected";
  notes?: string;
  receivedDate?: string;
}

export interface VisaApplication {
  id: string;
  applicationNumber: string;
  customer: string;
  destinationCountry: string;
  visaType?: "tourist" | "business" | "student" | "work-permit" | "transit" | "medical" | "conference";
  numberOfTravelers: number;
  travelDate?: string;
  returnDate?: string;
  purposeOfVisit?: string;
  status:
    | "documents-pending"
    | "documents-received"
    | "under-review"
    | "submitted-to-embassy"
    | "interview-scheduled"
    | "processing"
    | "approved"
    | "rejected"
    | "on-hold"
    | "cancelled";
  priority: "normal" | "urgent" | "tatkal";
  assignedTo?: string;
  documents?: DocumentItem[];
  embassySubmissionDate?: string;
  embassyReferenceNumber?: string;
  interviewDate?: string;
  expectedDecisionDate?: string;
  decisionDate?: string;
  visaNumber?: string;
  visaValidFrom?: string;
  visaValidUntil?: string;
  rejectionReason?: string;
  embassyFee?: number;
  serviceFee?: number;
  totalFee?: number;
  sourceInquiry?: string;
  sourceLead?: string;
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  receiptNumber: string;
  customer: string;
  visaApplication?: string;
  amount: number;
  paymentType?: "embassy-fee" | "service-fee" | "consultation-fee" | "courier" | "insurance" | "other";
  paymentMethod?: "cash" | "upi" | "bank-transfer" | "card" | "razorpay" | "cheque";
  status: "pending" | "received" | "partial" | "refunded" | "cancelled";
  paymentDate?: string;
  razorpayPaymentId?: string;
  razorpayOrderId?: string;
  notes?: string;
  receivedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  id: string;
  type: "call" | "email" | "whatsapp" | "meeting" | "follow-up" | "document-received" | "status-update" | "note";
  subject: string;
  description?: string;
  customer: string;
  visaApplication?: string;
  inquiry?: string;
  dueDate?: string;
  status: "pending" | "completed" | "cancelled";
  assignedTo?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
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

// ── B2B Partner & Tracking Types ──────────────────────────────────────

export interface Partner {
  id: string;
  partnerCode: string;
  companyName: string;
  type: "educational-consultancy" | "manpower-company" | "travel-agency" | "other";
  contactPerson: string;
  email: string;
  phone: string;
  address?: string;
  city?: "bangalore" | "hyderabad" | "delhi" | "chennai" | "other";
  gstNumber?: string;
  status: "active" | "inactive" | "suspended";
  assignedManager?: string;
  notes?: string;
  totalRequests: number;
  createdAt: string;
  updatedAt: string;
}

export interface StatusHistoryEntry {
  status: string;
  timestamp: string;
  note?: string;
  updatedBy?: string;
}

export type ServiceRequestStatus =
  | "received"
  | "documents-verified"
  | "submitted-to-embassy"
  | "under-processing"
  | "approved"
  | "rejected"
  | "delivered"
  | "on-hold";

export interface ServiceRequest {
  id: string;
  trackingCode: string;
  partner: string | Partner;
  applicantName: string;
  applicantEmail?: string;
  applicantPhone?: string;
  passportNumber?: string;
  passportExpiry?: string;
  dateOfBirth?: string;
  nationality?: string;
  serviceType: string;
  destinationCountry: string;
  visaType?: string;
  travelDate?: string;
  numberOfApplicants: number;
  purposeOfVisit?: string;
  specialInstructions?: string;
  status: ServiceRequestStatus;
  statusHistory?: StatusHistoryEntry[];
  priority: "normal" | "urgent" | "tatkal";
  assignedTo?: string;
  uploadedDocuments?: string[] | { id: string; filename: string; documentType: string; url?: string }[];
  embassySubmissionDate?: string;
  expectedCompletionDate?: string;
  completionDate?: string;
  embassyReferenceNumber?: string;
  serviceFee?: number;
  embassyFee?: number;
  totalFee?: number;
  rejectionReason?: string;
  holdReason?: string;
  internalNotes?: string;
  linkedVisaApplication?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TrackingResult {
  trackingCode: string;
  applicantName: string;
  serviceType: string;
  destinationCountry: string;
  status: ServiceRequestStatus;
  statusHistory: StatusHistoryEntry[];
  createdAt: string;
  updatedAt: string;
}
