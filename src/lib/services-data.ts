// Static service data for launch — will migrate to Payload CMS

export interface ServiceDetail {
  title: string;
  slug: string;
  icon: string;
  tagline: string;
  metaDescription: string;
  description: string;
  features: string[];
  process: { step: number; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
}

export const SERVICES_DATA: ServiceDetail[] = [
  {
    title: "Visa Appointment Booking",
    slug: "visa-appointment",
    icon: "CalendarCheck",
    tagline:
      "Hassle-free embassy & consulate visa appointment booking across all countries from India",
    metaDescription:
      "Book visa appointments at embassies and consulates across India. Expert appointment scheduling for US, UK, Schengen, Canada, Australia & 190+ countries. Same-day slots available. CloudTravelSolution — trusted visa appointment service in Bangalore, Hyderabad, Delhi & Chennai.",
    description:
      "Getting an embassy or consulate appointment can be the most frustrating part of the visa process — slots fill up within minutes and websites crash frequently. Our visa appointment booking service takes this headache off your plate entirely. We monitor appointment availability around the clock, secure the earliest slots for your preferred location, and handle all pre-appointment requirements. Whether it's a US B1/B2 visa appointment, UK visa application centre slot, Schengen VFS appointment, or any other country, we ensure you get your appointment on time without the stress.",
    features: [
      "Embassy & consulate appointment booking for 190+ countries",
      "US visa appointment (B1/B2, H1B, L1, F1) at all Indian consulates",
      "UK visa application centre (VFS) slot booking",
      "Schengen VFS Global appointment scheduling",
      "Canada VAC appointment booking across India",
      "Australia VFS appointment securing",
      "Early morning & priority slot monitoring",
      "Appointment rescheduling and cancellation management",
      "Pre-appointment document checklist preparation",
      "Same-day and next-day emergency appointment assistance",
    ],
    process: [
      {
        step: 1,
        title: "Share Your Requirements",
        description:
          "Tell us the country, visa type, preferred city (Bangalore, Hyderabad, Delhi, Chennai, Mumbai), and your ideal date range for the appointment.",
      },
      {
        step: 2,
        title: "Slot Monitoring & Booking",
        description:
          "Our team monitors the embassy/consulate booking system and secures the earliest available appointment slot matching your preferences.",
      },
      {
        step: 3,
        title: "Confirmation & Preparation",
        description:
          "You receive the confirmed appointment details along with a complete document checklist, dress code guidance, and what to expect on appointment day.",
      },
      {
        step: 4,
        title: "Appointment Day Support",
        description:
          "We provide day-of-appointment guidance including venue directions, reporting time, and a helpline number for any last-minute queries.",
      },
    ],
    faqs: [
      {
        question: "How quickly can you get a US visa appointment in India?",
        answer:
          "US visa appointment availability varies by season and consulate. We typically secure appointments within 1-4 weeks depending on the visa category. For urgent cases, we monitor cancellation slots daily and can often get earlier dates. B1/B2 tourist/business visas generally have shorter wait times than H1B or student visas.",
      },
      {
        question: "Which cities do you book appointments in?",
        answer:
          "We book visa appointments across all major Indian cities including Bangalore, Hyderabad, Delhi, Chennai, Mumbai, Kolkata, Ahmedabad, Pune, Chandigarh, and Kochi. We also handle appointments at VFS Global centres, BLS International, and embassy/consulate offices.",
      },
      {
        question: "Can you help with emergency or urgent appointment booking?",
        answer:
          "Yes. We offer emergency appointment assistance for urgent travel needs such as medical emergencies, family emergencies, or last-minute business trips. We monitor cancellation slots and early-release appointments to get you the earliest possible date.",
      },
      {
        question: "What information do I need to provide for appointment booking?",
        answer:
          "You'll need your passport details, visa application confirmation number (if already applied online), preferred appointment city, and date range. For some countries, you may also need payment confirmation of the visa fee. We guide you through the complete process.",
      },
    ],
  },
  {
    title: "Visa Assistance",
    slug: "visa-assistance",
    icon: "FileCheck",
    tagline:
      "End-to-end visa application support with 95%+ approval rate for all countries",
    metaDescription:
      "Complete visa assistance for 190+ countries from India. Expert document preparation, application filing, interview coaching & tracking. 95%+ approval rate. Tourist, business, student & work visas. Offices in Bangalore, Hyderabad, Delhi & Chennai.",
    description:
      "Our comprehensive visa assistance service covers every step of the visa application journey — from initial eligibility assessment to passport delivery after approval. Our experienced visa consultants handle document preparation, form filling, application submission, embassy communication, and interview coaching. Whether you need a tourist visa, business visa, student visa, or work permit, our team ensures a smooth, stress-free process with personalized guidance and a 95%+ approval rate across all visa categories.",
    features: [
      "Visa assistance for 190+ countries worldwide",
      "Tourist, Business, Student, Work, Transit & Medical visas",
      "Thorough document preparation and verification",
      "Visa application form filling and error-free submission",
      "Embassy appointment scheduling and management",
      "One-on-one visa interview preparation and mock sessions",
      "Real-time application tracking and status updates",
      "Express and priority processing options available",
      "Reapplication support for previously rejected cases",
      "Free initial consultation and eligibility assessment",
    ],
    process: [
      {
        step: 1,
        title: "Free Consultation & Eligibility Check",
        description:
          "Share your travel plans with us. Our visa specialist assesses your eligibility, recommends the best visa type, and outlines the complete process with estimated timeline and costs.",
      },
      {
        step: 2,
        title: "Document Preparation & Verification",
        description:
          "We provide a personalized document checklist and verify every document for accuracy, completeness, and embassy compliance. We flag any missing or weak documents before submission.",
      },
      {
        step: 3,
        title: "Application Filing & Submission",
        description:
          "We complete and submit your visa application with perfect accuracy, schedule your embassy appointment, and handle all communication with the visa office on your behalf.",
      },
      {
        step: 4,
        title: "Interview Coaching & Preparation",
        description:
          "For visas requiring interviews (US, UK, etc.), we conduct mock sessions covering likely questions, supporting document presentation, and confidence-building exercises.",
      },
      {
        step: 5,
        title: "Tracking & Passport Delivery",
        description:
          "We track your application in real-time and keep you updated at every stage. Once approved, we coordinate passport collection and secure delivery to your address.",
      },
    ],
    faqs: [
      {
        question: "What is your visa approval success rate?",
        answer:
          "We maintain a 95%+ approval rate across all visa categories. Our thorough document verification, error-free application filing, and interview preparation significantly minimize the chance of rejection.",
      },
      {
        question: "Can you help if my visa was previously rejected?",
        answer:
          "Absolutely. We specialize in reapplication cases. We analyze your previous rejection reasons, identify gaps in documentation or interview responses, and build a significantly stronger application for your next attempt.",
      },
      {
        question: "How long does the visa process typically take?",
        answer:
          "Processing times vary by country and visa type. Tourist visas typically take 5-15 working days, student visas 4-8 weeks, and work visas 6-12 weeks. We provide accurate estimated timelines during your initial consultation based on your specific case.",
      },
      {
        question: "Do you handle group visa applications?",
        answer:
          "Yes. We handle group applications for families, corporate teams, tour groups, and educational institutions with dedicated coordinators, bulk processing, and group discounts.",
      },
    ],
  },
  {
    title: "Travel Insurance",
    slug: "travel-insurance",
    icon: "Shield",
    tagline:
      "Comprehensive travel insurance packages from top insurers tailored to your destination",
    metaDescription:
      "Buy travel insurance for international trips from India. Schengen-compliant policies, medical coverage up to $500,000, trip cancellation protection. Compare plans from top insurers. Best rates in Bangalore, Hyderabad, Delhi & Chennai.",
    description:
      "Don't let unexpected events ruin your trip. Our travel insurance packages from leading Indian and international insurers cover medical emergencies, trip cancellation, baggage loss, flight delays, and more. We help you choose the right plan based on your destination, travel duration, and specific requirements — including Schengen-compliant policies mandatory for European visa applications. Every plan includes COVID-19 coverage and 24/7 emergency assistance worldwide.",
    features: [
      "Comprehensive medical coverage up to $500,000",
      "Trip cancellation and interruption protection",
      "Baggage loss, theft, and delay coverage",
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
          "Tell us your destination, travel dates, number of travelers, age of travelers, and any specific coverage requirements such as adventure sports or pre-existing conditions.",
      },
      {
        step: 2,
        title: "Compare Plans Side-by-Side",
        description:
          "We present the best insurance options from top providers like TATA AIG, ICICI Lombard, Bajaj Allianz, and others — comparing coverage limits, premiums, and exclusions.",
      },
      {
        step: 3,
        title: "Purchase & Documentation",
        description:
          "Once you choose a plan, we handle the instant purchase and provide all documentation needed for your visa application, including policy certificate in the required format.",
      },
      {
        step: 4,
        title: "Claims Support",
        description:
          "If you need to file a claim during or after your trip, our team guides you through the entire process from documentation to settlement with the insurer.",
      },
    ],
    faqs: [
      {
        question: "Is travel insurance mandatory for Schengen visa from India?",
        answer:
          "Yes. Schengen visa applications require travel insurance with minimum coverage of EUR 30,000 (approximately INR 27 lakhs) covering medical expenses, emergency evacuation, and repatriation. All our Schengen plans meet and exceed these requirements.",
      },
      {
        question: "What is the typical cost of travel insurance from India?",
        answer:
          "Travel insurance typically costs INR 500-2,000 for a short trip (7-15 days) and INR 3,000-8,000 for longer trips or higher coverage. Schengen-compliant plans start at INR 800 for 15 days. Group and annual plans offer better per-day rates.",
      },
      {
        question: "Can I buy insurance after getting my visa?",
        answer:
          "For Schengen and some other countries, you need insurance documentation at the time of visa application. For other destinations, you can purchase anytime before travel, but we recommend buying early for trip cancellation coverage to be effective.",
      },
      {
        question: "Are pre-existing medical conditions covered?",
        answer:
          "Coverage for pre-existing conditions varies by insurer and plan. We can help you find plans that cover specific conditions — please mention any health concerns during consultation so we can recommend the right policy.",
      },
    ],
  },
  {
    title: "Flight & Hotel Booking",
    slug: "flight-hotel-booking",
    icon: "Plane",
    tagline:
      "Best deals on international flights and hotel bookings with expert travel planning",
    metaDescription:
      "Book international flights and hotels at best prices from India. Corporate travel deals, group booking discounts, honeymoon packages & holiday planning. Trusted travel agency in Bangalore, Hyderabad, Delhi & Chennai. CloudTravelSolution.",
    description:
      "Planning international travel involves more than just getting a visa. Our flight and hotel booking service ensures you get the best deals on airfare, comfortable accommodation at your destination, and a well-planned itinerary. We work with all major airlines and hotel chains to offer competitive rates, flexible booking options, and personalized travel packages. Whether it's a family holiday, honeymoon, corporate trip, or group tour, we handle all the logistics so you can focus on enjoying your journey.",
    features: [
      "International flight bookings at competitive prices",
      "Hotel reservations across all budget categories",
      "Complete travel itinerary planning and optimization",
      "Group booking discounts for 5+ travelers",
      "Corporate travel rates with major airlines",
      "Honeymoon and holiday package deals",
      "Airport transfers and local transport arrangement",
      "Flexible booking with free cancellation options",
      "Multi-city and complex routing expertise",
      "24/7 support for booking changes and emergencies",
    ],
    process: [
      {
        step: 1,
        title: "Share Your Travel Plans",
        description:
          "Tell us your destination, travel dates, number of travelers, budget range, and any preferences for airlines, hotel star rating, or specific requirements.",
      },
      {
        step: 2,
        title: "Receive Custom Options",
        description:
          "We research and present the best flight and hotel options matching your budget and preferences, with clear pricing, cancellation policies, and our recommendations.",
      },
      {
        step: 3,
        title: "Book & Confirm",
        description:
          "Once you approve, we handle the complete booking process — flights, hotels, transfers, and any add-ons. You receive confirmed e-tickets and hotel vouchers.",
      },
      {
        step: 4,
        title: "Travel Support",
        description:
          "From pre-departure checklists to on-trip support, we're available for any booking changes, cancellations, or travel emergencies throughout your journey.",
      },
    ],
    faqs: [
      {
        question: "Can you get better flight prices than online booking sites?",
        answer:
          "Yes, often we can. We have access to consolidator fares, corporate rates, and group discounts that aren't available on consumer booking websites. For group bookings of 5+ travelers, we almost always offer significantly better rates.",
      },
      {
        question: "Do you book domestic flights and hotels too?",
        answer:
          "While our specialty is international travel, we also assist with domestic flights and hotel bookings, especially when they're part of a larger international travel plan or for corporate clients.",
      },
      {
        question: "Can I get a dummy ticket for my visa application?",
        answer:
          "We provide confirmed tentative flight itineraries (round-trip) that are accepted by embassies for visa applications. These are actual bookable itineraries, not dummy tickets, and can be confirmed once your visa is approved.",
      },
      {
        question: "What is your cancellation and refund policy?",
        answer:
          "Cancellation policies depend on the airline and hotel booked. We always present the cancellation terms before booking. Many of our options include free cancellation up to 24-72 hours before travel. We assist with all refund processing.",
      },
    ],
  },
  {
    title: "Passport Services",
    slug: "passport-services",
    icon: "BookOpen",
    tagline:
      "New passport applications, renewals, and tatkal services with complete assistance",
    metaDescription:
      "Passport services in Bangalore, Hyderabad, Delhi & Chennai. New passport application, renewal, tatkal processing, name correction & minor passports. PSK appointment booking. Fast, reliable passport assistance from CloudTravelSolution.",
    description:
      "Navigate the Indian passport application process with ease. From new applications and renewals to tatkal (urgent) processing and corrections, our team handles the paperwork, Passport Seva portal form filling, appointment scheduling, and follow-ups so you don't have to deal with the complexity of the process. We've helped thousands of applicants across Bangalore, Hyderabad, Delhi, and Chennai get their passports quickly and without errors.",
    features: [
      "Fresh/new passport applications (normal & tatkal)",
      "Passport renewals and reissue processing",
      "Tatkal (urgent) passport processing assistance",
      "Minor passport applications (under 18)",
      "Name, address, and other corrections/changes",
      "Damaged or lost passport replacement",
      "Police verification coordination and follow-up",
      "Document preparation, form filling & verification",
      "Passport Seva Kendra (PSK) appointment booking",
      "Real-time application status tracking",
    ],
    process: [
      {
        step: 1,
        title: "Document Assessment",
        description:
          "We review your documents, determine the application type (fresh/renewal/reissue/tatkal), and prepare a personalized checklist specific to your case.",
      },
      {
        step: 2,
        title: "Form Filling & Online Submission",
        description:
          "We complete the online application form on the Passport Seva portal with 100% accuracy, ensuring no errors that could cause delays or rejection at the PSK.",
      },
      {
        step: 3,
        title: "PSK Appointment & Visit Preparation",
        description:
          "We book the earliest available appointment at your nearest PSK/POPSK and prepare you with a organized document folder and visit guidelines.",
      },
      {
        step: 4,
        title: "Post-Submission Follow-up",
        description:
          "We track your application status, coordinate with police verification if needed, and keep you updated via SMS/WhatsApp until your passport is delivered.",
      },
    ],
    faqs: [
      {
        question: "How long does a new passport take in India?",
        answer:
          "Normal processing takes 15-30 working days from the date of PSK appointment. Tatkal applications are typically processed within 1-3 working days, though this depends on police verification requirements and your location.",
      },
      {
        question: "What documents are needed for passport renewal?",
        answer:
          "For passport renewal, you need the original old passport, self-attested copies of the first and last pages, current proof of address (Aadhaar card, utility bill, etc.), and recent passport-size photographs. Additional documents are needed for name or address changes.",
      },
      {
        question: "Can you help with passport for minors (children under 18)?",
        answer:
          "Yes. We handle passport applications for minors including the additional requirements such as birth certificate, school ID card, both parents' passports, and consent forms. We also guide parents through the joint visit requirement at the PSK.",
      },
      {
        question: "What is the difference between passport reissue and renewal?",
        answer:
          "Renewal applies when your passport validity is expiring (within 1 year) or booklet pages are exhausted. Reissue covers cases like name change after marriage, address change, damaged passport, or lost passport. The application process, documents required, and fees differ for each type.",
      },
    ],
  },
  {
    title: "Document Attestation",
    slug: "document-attestation",
    icon: "Stamp",
    tagline:
      "MEA attestation, apostille, and embassy legalization for international document use",
    metaDescription:
      "Document attestation services in India — MEA attestation, apostille, embassy legalization, HRD attestation & certified translation. Fast processing for UAE, Saudi, Qatar, Kuwait & all countries. Offices in Bangalore, Hyderabad, Delhi & Chennai.",
    description:
      "Many countries require your documents to be attested, apostilled, or legalized before they can be used internationally — whether for employment, education, business, or immigration purposes. Our document attestation service covers MEA (Ministry of External Affairs) attestation, state HRD attestation, embassy/consulate legalization, apostille services for Hague Convention countries, and certified translation in 20+ languages. We manage the entire attestation chain and ensure your documents are accepted by any country or institution worldwide.",
    features: [
      "MEA (Ministry of External Affairs) attestation",
      "State HRD (Human Resource Department) attestation",
      "Embassy and consulate legalization/attestation",
      "Apostille services for Hague Convention countries",
      "Certified translation services in 20+ languages",
      "Notarization of documents",
      "Chamber of Commerce attestation for commercial docs",
      "Educational document verification and attestation",
      "Commercial document attestation (invoices, MOA, etc.)",
      "Power of Attorney attestation and legalization",
    ],
    process: [
      {
        step: 1,
        title: "Document Review & Assessment",
        description:
          "Send us scanned copies of your documents. We assess which attestations are needed based on your destination country, purpose (employment, education, business), and specific requirements.",
      },
      {
        step: 2,
        title: "Collection & Processing",
        description:
          "We collect original documents from your location (with acknowledgment receipt) and begin the attestation process in the correct order as required by the destination country.",
      },
      {
        step: 3,
        title: "Attestation Chain Completion",
        description:
          "Documents go through the required chain: Notary → State HRD/Home Department → MEA → Embassy/Consulate. We manage each step, track progress, and handle any queries.",
      },
      {
        step: 4,
        title: "Secure Delivery",
        description:
          "Fully attested documents are delivered to your address via secure insured courier. We maintain scanned copies and tracking records for your reference.",
      },
    ],
    faqs: [
      {
        question: "What is the difference between attestation and apostille?",
        answer:
          "Attestation is required for countries NOT part of the Hague Convention (e.g., UAE, Saudi Arabia, Qatar, Kuwait). Apostille is a simplified certification accepted by 125+ Hague Convention member countries (e.g., most European countries, Australia, USA, UK). The process, time, and cost differ for each.",
      },
      {
        question: "How long does MEA attestation take in India?",
        answer:
          "Normal MEA attestation takes 7-10 working days. Express/tatkal processing is available in 2-3 working days for an additional fee. State HRD attestation may add 5-10 working days before MEA, depending on the state.",
      },
      {
        question: "Which documents can be attested?",
        answer:
          "Educational documents (degrees, diplomas, transcripts, marksheets), personal documents (birth certificate, marriage certificate, PCC, medical certificate), and commercial documents (company registration, power of attorney, invoices, MOA/AOA) can all be attested.",
      },
      {
        question: "Do you provide certified document translation?",
        answer:
          "Yes. We provide certified translation in 20+ languages including Arabic, French, German, Spanish, Portuguese, Chinese, Japanese, and Korean. Translated documents can be notarized and attested as needed for embassy submission.",
      },
    ],
  },
  {
    title: "Educational Visa Assistance",
    slug: "educational-visa-assistance",
    icon: "GraduationCap",
    tagline:
      "Complete student visa support for studying abroad — from admission to arrival",
    metaDescription:
      "Student visa assistance from India for USA, UK, Canada, Australia, Germany & more. University admission support, SOP review, financial documentation, visa interview prep. Expert education consultants in Bangalore, Hyderabad, Delhi & Chennai.",
    description:
      "Pursuing education abroad is a life-changing decision, and getting your student visa right is crucial. Our educational visa assistance service supports students and their families through the entire process — from university shortlisting and admission guidance to student visa application, financial documentation, SOP/LOR review, and pre-departure orientation. We work with students heading to the US (F1), UK (Tier 4), Canada (study permit), Australia (subclass 500), Germany, and 50+ other education destinations. Our education counselors have helped thousands of Indian students achieve their study abroad dreams.",
    features: [
      "Student visa applications for 50+ countries",
      "University shortlisting and admission guidance",
      "Statement of Purpose (SOP) and LOR review",
      "Financial documentation and fund proof preparation",
      "Education loan documentation assistance",
      "Visa interview preparation for US F1, UK, Canada",
      "Scholarship search and application support",
      "I-20, CAS, COE, and admission letter guidance",
      "Pre-departure orientation and travel planning",
      "Post-arrival support and accommodation guidance",
    ],
    process: [
      {
        step: 1,
        title: "Profile Evaluation & Counseling",
        description:
          "We evaluate your academic profile, budget, career goals, and preferences to recommend the best countries and universities. Our counselors have first-hand knowledge of admission requirements.",
      },
      {
        step: 2,
        title: "Admission & Documentation",
        description:
          "We assist with university applications, SOP/LOR drafting, and ensure all admission documentation is complete. Once you receive your offer letter/I-20/CAS, we move to visa preparation.",
      },
      {
        step: 3,
        title: "Visa Application & Filing",
        description:
          "We prepare your complete student visa application — DS-160, financial proof, sponsor documents, form filling, appointment booking, and submission. Every document is verified for embassy compliance.",
      },
      {
        step: 4,
        title: "Interview Prep & Visa Stamping",
        description:
          "For countries requiring interviews (US, UK), we conduct thorough mock interview sessions. Post-approval, we assist with visa stamping, travel booking, forex, and pre-departure checklist.",
      },
    ],
    faqs: [
      {
        question: "Which countries are best for Indian students to study abroad?",
        answer:
          "The most popular destinations for Indian students are USA, UK, Canada, Australia, Germany, Ireland, and New Zealand. Each offers unique advantages in terms of course quality, post-study work options, tuition costs, and living expenses. We help you choose based on your specific academic and career goals.",
      },
      {
        question: "How much bank balance is needed for a student visa?",
        answer:
          "Financial requirements vary by country. US F1 visas require proof of funds covering full tuition + living expenses. UK requires approximately £1,334/month (London) or £1,023/month (outside London) for living costs. Canada requires CAD 20,635/year. We provide exact figures and help arrange financial documentation.",
      },
      {
        question: "Can you help with education loan documentation?",
        answer:
          "Yes. We assist with education loan applications, documentation for banks and NBFCs, collateral assessment, and GIC (Guaranteed Investment Certificate) for Canada. We work with partner banks offering competitive education loan rates for Indian students.",
      },
      {
        question: "What if my student visa gets rejected?",
        answer:
          "Student visa rejections are usually due to insufficient financial proof, weak SOP, or unconvincing study plans. We analyze the rejection reason, strengthen your application, and refile. Our reapplication success rate is significantly higher than first-time applicants due to our detailed rejection analysis.",
      },
    ],
  },
  {
    title: "Manpower Visa Assistance",
    slug: "manpower-visa-assistance",
    icon: "Users",
    tagline:
      "Bulk work permit and employment visa processing for manpower recruitment agencies",
    metaDescription:
      "Manpower visa and work permit assistance from India. Bulk employment visa processing for Gulf countries (UAE, Saudi, Qatar, Kuwait, Oman, Bahrain), Europe & Asia. MOFA attestation, GAMCA medical, emigration clearance. Partner with CloudTravelSolution.",
    description:
      "We provide specialized visa processing services for manpower recruitment agencies and companies sending workers abroad. Our bulk processing capabilities handle employment visas, work permits, and labor visas for Gulf countries (UAE, Saudi Arabia, Qatar, Kuwait, Oman, Bahrain), Southeast Asia, and European countries. We manage the entire process from MOFA attestation and GAMCA medical coordination to emigration clearance and travel arrangements. Our dedicated manpower desk processes hundreds of work visas monthly with fast turnaround and competitive rates for agencies.",
    features: [
      "Bulk employment visa processing for recruitment agencies",
      "Gulf country work visas — UAE, Saudi, Qatar, Kuwait, Oman, Bahrain",
      "MOFA (Ministry of Foreign Affairs) attestation",
      "GAMCA medical appointment booking and coordination",
      "Emigration clearance (EC) from Protector of Emigrants",
      "Work permit applications for European countries",
      "Contract attestation and legalization",
      "Travel arrangements for workers (flights, insurance)",
      "Dedicated account manager for agency partners",
      "Real-time batch tracking and status dashboard",
    ],
    process: [
      {
        step: 1,
        title: "Agency Onboarding & Requirements",
        description:
          "We onboard your recruitment agency with dedicated pricing, assign an account manager, and understand your visa processing volume, destination countries, and specific requirements.",
      },
      {
        step: 2,
        title: "Document Collection & Verification",
        description:
          "We collect worker documents (passport, photos, educational certificates, medical reports), verify all details, and prepare the complete visa application package for each worker.",
      },
      {
        step: 3,
        title: "Visa Processing & Attestation",
        description:
          "We handle MOFA attestation, embassy stamping, contract legalization, and work permit submission in bulk. GAMCA medicals are coordinated at approved centres across India.",
      },
      {
        step: 4,
        title: "Emigration Clearance & Travel",
        description:
          "Post visa approval, we obtain emigration clearance, arrange flights, provide travel insurance, and coordinate departure logistics for individual or group travel.",
      },
    ],
    faqs: [
      {
        question: "Which countries do you process manpower visas for?",
        answer:
          "We primarily process employment visas for Gulf countries (UAE, Saudi Arabia, Qatar, Kuwait, Oman, Bahrain), Malaysia, Singapore, and select European countries (Poland, Romania, Croatia, Malta). We handle all categories including skilled, semi-skilled, and unskilled worker visas.",
      },
      {
        question: "What is the minimum batch size for bulk processing?",
        answer:
          "We offer competitive bulk rates starting from 10+ workers per batch. Larger batches of 50+ workers receive priority processing and the best per-visa rates. We also handle individual work visa applications for companies hiring directly.",
      },
      {
        question: "Do you handle GAMCA medical appointments?",
        answer:
          "Yes. We book GAMCA (Gulf Approved Medical Centres Association) medical appointments at approved centres across India, coordinate the medical examination, and collect results. We ensure medicals are completed within the validity period required by the destination country.",
      },
      {
        question: "How long does a Gulf country employment visa take?",
        answer:
          "UAE employment visas typically take 3-7 working days after MOFA approval. Saudi work visas take 7-15 working days. Qatar and Kuwait take 10-20 working days. Timelines can vary based on the employer's labor quota and ministry approvals. We provide real-time tracking for every application.",
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
