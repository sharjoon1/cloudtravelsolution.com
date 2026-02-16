// Static service data for launch — will migrate to Payload CMS

export interface ServiceDetail {
  title: string;
  slug: string;
  icon: string;
  tagline: string;
  description: string;
  features: string[];
  process: { step: number; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
}

export const SERVICES_DATA: ServiceDetail[] = [
  {
    title: "Visa Consulting",
    slug: "visa-consulting",
    icon: "FileCheck",
    tagline:
      "Expert visa guidance for 190+ countries with industry-leading approval rates",
    description:
      "Our experienced visa consultants handle every aspect of your visa application — from document preparation to interview coaching. Whether you need a tourist, business, student, or work visa, our team ensures a smooth, stress-free process with personalized guidance at every step.",
    features: [
      "Visa assistance for 190+ countries worldwide",
      "Tourist, Business, Student, Work, Transit, and Medical visas",
      "Thorough document preparation and verification",
      "Embassy appointment scheduling and management",
      "One-on-one interview preparation coaching",
      "Real-time application tracking and status updates",
      "Express and priority processing options",
      "Post-visa travel advisory and support",
      "Dedicated visa specialist assigned to every case",
      "Free initial consultation and eligibility assessment",
    ],
    process: [
      {
        step: 1,
        title: "Free Consultation",
        description:
          "Share your travel plans with us. Our visa specialist will assess your eligibility, recommend the best visa type, and outline the complete process.",
      },
      {
        step: 2,
        title: "Document Preparation",
        description:
          "We provide a personalized document checklist and verify every document for accuracy, completeness, and embassy compliance.",
      },
      {
        step: 3,
        title: "Application Submission",
        description:
          "We complete and submit your visa application, schedule embassy appointments, and handle all communication with the visa office.",
      },
      {
        step: 4,
        title: "Interview Coaching",
        description:
          "For visas requiring interviews, we conduct mock sessions covering likely questions, presentation tips, and confidence-building exercises.",
      },
      {
        step: 5,
        title: "Tracking & Delivery",
        description:
          "We track your application in real-time and keep you updated. Once approved, we coordinate passport collection and delivery.",
      },
    ],
    faqs: [
      {
        question: "How long does the visa process take?",
        answer:
          "Processing times vary by country and visa type. Tourist visas typically take 5-15 working days, while student and work visas may take 4-12 weeks. We provide estimated timelines during your initial consultation.",
      },
      {
        question: "What is your visa approval success rate?",
        answer:
          "We maintain a 95%+ approval rate across all visa categories. Our thorough document verification and preparation process minimizes the chance of rejection.",
      },
      {
        question: "Can you help if my visa was previously rejected?",
        answer:
          "Yes. We specialize in reapplication cases. We analyze your previous rejection, identify issues, and build a stronger application for your next attempt.",
      },
      {
        question:
          "Do you handle group visa applications for families or tours?",
        answer:
          "Absolutely. We handle group applications for families, corporate groups, and tour groups with dedicated coordinators and bulk processing discounts.",
      },
    ],
  },
  {
    title: "Travel Insurance",
    slug: "travel-insurance",
    icon: "Shield",
    tagline:
      "Comprehensive travel insurance packages tailored to your destination and needs",
    description:
      "Don't let unexpected events ruin your trip. Our travel insurance packages from leading Indian and international insurers cover medical emergencies, trip cancellation, baggage loss, and more. We help you choose the right plan based on your destination, travel duration, and specific requirements — including Schengen-compliant policies.",
    features: [
      "Comprehensive medical coverage up to $500,000",
      "Trip cancellation and interruption protection",
      "Baggage loss and delay coverage",
      "Emergency medical evacuation and repatriation",
      "Schengen-compliant policies for European travel",
      "Multi-trip annual plans for frequent travelers",
      "Corporate and group travel policies",
      "Claims assistance and documentation support",
      "Adventure sports and activity coverage add-ons",
      "COVID-19 coverage included in all plans",
    ],
    process: [
      {
        step: 1,
        title: "Share Your Travel Details",
        description:
          "Tell us your destination, travel dates, number of travelers, and any specific coverage requirements.",
      },
      {
        step: 2,
        title: "Compare Plans",
        description:
          "We present the best insurance options from top providers, comparing coverage limits, premiums, and exclusions side-by-side.",
      },
      {
        step: 3,
        title: "Purchase & Documentation",
        description:
          "Once you choose a plan, we handle the purchase and provide all documentation needed for your visa application.",
      },
      {
        step: 4,
        title: "Claims Support",
        description:
          "If you need to file a claim, our team guides you through the entire process, from documentation to settlement.",
      },
    ],
    faqs: [
      {
        question: "Is travel insurance mandatory for Schengen visa?",
        answer:
          "Yes. Schengen visa applications require travel insurance with minimum coverage of EUR 30,000 covering medical expenses, emergency evacuation, and repatriation. All our Schengen plans meet these requirements.",
      },
      {
        question: "Can I buy insurance after getting my visa?",
        answer:
          "For Schengen and some other countries, you need insurance documentation at the time of visa application. For other destinations, you can purchase insurance anytime before travel, but we recommend buying early.",
      },
      {
        question: "What is the typical cost of travel insurance?",
        answer:
          "Travel insurance typically costs INR 500-2,000 for a short trip (7-15 days) and INR 3,000-8,000 for longer trips or higher coverage. Group and annual plans offer better per-day rates.",
      },
      {
        question: "Are pre-existing conditions covered?",
        answer:
          "Coverage for pre-existing conditions varies by insurer and plan. We can help you find plans that cover specific conditions — please mention any health concerns during consultation.",
      },
    ],
  },
  {
    title: "Passport Services",
    slug: "passport-services",
    icon: "BookOpen",
    tagline:
      "New passport applications, renewals, and tatkal services with end-to-end assistance",
    description:
      "Navigate the Indian passport application process with ease. From new applications and renewals to tatkal (urgent) processing and corrections, our team handles the paperwork, appointment scheduling, and follow-ups so you don't have to deal with the complexity of the Passport Seva Kendra process.",
    features: [
      "Fresh/new passport applications",
      "Passport renewals and reissue",
      "Tatkal (urgent) processing assistance",
      "Minor passport applications",
      "Name, address, and other corrections",
      "Damaged passport replacement",
      "Police verification coordination",
      "Document preparation and form filling",
      "Passport Seva Kendra appointment booking",
      "Status tracking and updates",
    ],
    process: [
      {
        step: 1,
        title: "Document Assessment",
        description:
          "We review your current documents, determine the application type (fresh/renewal/reissue), and prepare a personalized checklist.",
      },
      {
        step: 2,
        title: "Form Filling & Submission",
        description:
          "We complete the online application form on the Passport Seva portal accurately, ensuring no errors that could cause delays.",
      },
      {
        step: 3,
        title: "Appointment & Visit",
        description:
          "We book the earliest available appointment at your nearest PSK/POPSK and prepare you for the visit with a document folder.",
      },
      {
        step: 4,
        title: "Post-Submission Follow-up",
        description:
          "We track your application status, coordinate with police verification if needed, and keep you updated until passport delivery.",
      },
    ],
    faqs: [
      {
        question: "How long does a new passport take?",
        answer:
          "Normal processing takes 15-30 working days from the date of appointment. Tatkal applications are typically processed within 1-3 working days, though availability may vary by location.",
      },
      {
        question: "What documents are needed for passport renewal?",
        answer:
          "You need the original old passport, self-attested copies of the first and last pages, proof of address (if changed), and a recent passport-size photograph. Additional documents may be needed for name changes.",
      },
      {
        question: "Can you help with passport for minors?",
        answer:
          "Yes. We handle passport applications for minors (under 18) including the additional requirements such as birth certificate, parents' passports, and school ID card.",
      },
      {
        question: "What is the difference between reissue and renewal?",
        answer:
          "Renewal applies when your passport validity is expiring or pages are exhausted. Reissue covers cases like name change, address change, or damaged passport. The application process and requirements differ slightly.",
      },
    ],
  },
  {
    title: "Document Attestation",
    slug: "document-attestation",
    icon: "Stamp",
    tagline:
      "Authentication and attestation of documents for embassy submissions and international use",
    description:
      "Many countries require your documents to be attested or apostilled before they can be used internationally. Our document attestation service covers MEA attestation, state HRD attestation, embassy attestation, apostille services, and notarization — ensuring your documents are accepted by any country or institution worldwide.",
    features: [
      "MEA (Ministry of External Affairs) attestation",
      "State HRD (Human Resource Department) attestation",
      "Embassy and consulate attestation",
      "Apostille services (Hague Convention countries)",
      "Certified translation services (20+ languages)",
      "Notarization of documents",
      "Chamber of Commerce attestation",
      "Educational document verification",
      "Commercial document attestation",
      "Power of Attorney attestation",
    ],
    process: [
      {
        step: 1,
        title: "Document Review",
        description:
          "Send us your documents (scanned copies). We assess which attestations are needed based on your destination country and purpose.",
      },
      {
        step: 2,
        title: "Collection & Processing",
        description:
          "We collect original documents (with receipt), complete all required attestations in the correct order, from local to national to embassy level.",
      },
      {
        step: 3,
        title: "Attestation Chain",
        description:
          "Documents go through the required chain: Notary → State HRD/Home Department → MEA → Embassy. We manage each step and timeline.",
      },
      {
        step: 4,
        title: "Delivery",
        description:
          "Attested documents are delivered to your address via secure courier. We maintain copies and tracking records for your reference.",
      },
    ],
    faqs: [
      {
        question: "What is the difference between attestation and apostille?",
        answer:
          "Attestation is required for countries that are NOT part of the Hague Convention (e.g., UAE, Saudi Arabia, Qatar). Apostille is accepted by Hague Convention member countries (e.g., most European countries, Australia, USA). The process and cost differ for each.",
      },
      {
        question: "How long does MEA attestation take?",
        answer:
          "Normal MEA attestation takes 7-10 working days. Express processing is available in 2-3 working days for an additional fee. State HRD attestation may add 5-10 days before MEA.",
      },
      {
        question: "Which documents can be attested?",
        answer:
          "Educational documents (degrees, transcripts, marksheets), personal documents (birth certificate, marriage certificate, PCC), and commercial documents (company registration, power of attorney, invoices) can all be attested.",
      },
      {
        question: "Do you offer document translation services?",
        answer:
          "Yes. We provide certified translation in 20+ languages including Arabic, French, German, Spanish, Chinese, and Japanese. Translated documents can be notarized and attested as needed.",
      },
    ],
  },
  {
    title: "Corporate Travel",
    slug: "corporate-travel",
    icon: "Building2",
    tagline:
      "End-to-end corporate travel management for businesses of all sizes",
    description:
      "Streamline your company's travel operations with our corporate travel management services. From flight and hotel bookings to visa processing, travel insurance, and MICE events, we handle everything. Our dedicated corporate desk ensures your team travels efficiently while you maintain full control over travel policy and budget.",
    features: [
      "Negotiated corporate rates on flights and hotels",
      "Travel policy management and compliance",
      "MICE (Meetings, Incentives, Conferences, Exhibitions) organization",
      "Duty of care and traveler safety services",
      "Expense reporting and reconciliation",
      "24/7 dedicated travel support hotline",
      "Forex services and multi-currency cards",
      "Group travel coordination",
      "Visa processing for business travelers",
      "Monthly MIS reports and analytics",
    ],
    process: [
      {
        step: 1,
        title: "Onboarding & Setup",
        description:
          "We understand your company's travel patterns, budget, and policies. A dedicated account manager and corporate travel portal are set up.",
      },
      {
        step: 2,
        title: "Policy Configuration",
        description:
          "We configure travel policies, approval workflows, preferred suppliers, and budget limits in our system aligned with your company guidelines.",
      },
      {
        step: 3,
        title: "Booking & Management",
        description:
          "Your team books through our portal or contacts the dedicated desk. All bookings comply with policy, and exceptions route through approval.",
      },
      {
        step: 4,
        title: "Reporting & Optimization",
        description:
          "Monthly reports cover spend, compliance, savings, and traveler satisfaction. We continuously optimize for better rates and efficiency.",
      },
    ],
    faqs: [
      {
        question: "What size companies do you work with?",
        answer:
          "We serve companies of all sizes — from startups with 5-10 travelers per month to large enterprises with hundreds of business travelers. Our solutions scale to your needs.",
      },
      {
        question: "Do you handle international visa processing for employees?",
        answer:
          "Yes. Business visa processing for employees is a core part of our corporate offering. We handle bulk applications, document collection, and embassy coordination for your team.",
      },
      {
        question: "Can you organize MICE events?",
        answer:
          "Absolutely. We organize corporate meetings, incentive trips, conferences, and exhibitions both domestically and internationally. Our MICE team handles venue selection, logistics, accommodation, and on-ground coordination.",
      },
      {
        question: "What reporting and analytics do you provide?",
        answer:
          "We provide monthly MIS reports covering total spend, per-department breakdowns, policy compliance rates, advance booking statistics, preferred vendor usage, and cost-saving opportunities.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return SERVICES_DATA.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return SERVICES_DATA.map((s) => s.slug);
}
