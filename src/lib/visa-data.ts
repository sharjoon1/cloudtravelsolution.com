import type { Country } from "@/types";

// Static visa data for initial launch — will migrate to Payload CMS
export const COUNTRIES_DATA: Country[] = [
  {
    name: "United States",
    slug: "united-states",
    code: "US",
    flag: "\u{1F1FA}\u{1F1F8}",
    region: "americas",
    travelAdvisory: "green",
    visaTypes: [
      {
        type: "Tourist Visa (B1/B2)",
        requirements: [
          "Valid passport with at least 6 months validity",
          "DS-160 online application form",
          "Visa interview appointment at US Embassy/Consulate",
          "Proof of financial stability (bank statements for 6 months)",
          "Proof of ties to India (employment letter, property documents)",
          "Travel itinerary and hotel bookings",
          "Passport-size photographs (2x2 inches, white background)",
        ],
        fee: { embassyFee: 14000, serviceFee: 2500, currency: "INR" },
        processingTime: "3-5 weeks (after interview)",
        validity: "Up to 10 years (multiple entry)",
        documentsNeeded: [
          "Original passport + old passports",
          "DS-160 confirmation page",
          "Interview appointment letter",
          "Bank statements (6 months)",
          "Income tax returns (3 years)",
          "Employment/business proof",
          "Photographs (2x2 inches)",
          "Cover letter",
        ],
        applicationSteps: [
          "Complete DS-160 form online at ceac.state.gov",
          "Pay the visa fee (MRV fee) of $185",
          "Schedule a visa interview at the nearest US Embassy/Consulate",
          "Attend biometrics appointment (OFC visit)",
          "Attend the visa interview with all documents",
          "Wait for visa processing (passport returned via courier)",
        ],
        notes:
          "US visa interviews are conducted in New Delhi, Mumbai, Chennai, Hyderabad, and Kolkata. Early morning appointments are recommended.",
      },
      {
        type: "Business Visa (B1)",
        requirements: [
          "Valid passport with at least 6 months validity",
          "DS-160 online application form",
          "Invitation letter from US company",
          "Proof of business ties and purpose of visit",
          "Company registration documents",
          "Bank statements and financial proof",
        ],
        fee: { embassyFee: 14000, serviceFee: 2500, currency: "INR" },
        processingTime: "3-5 weeks (after interview)",
        validity: "Up to 10 years (multiple entry)",
        documentsNeeded: [
          "Original passport",
          "DS-160 confirmation",
          "Business invitation letter",
          "Company letterhead cover letter",
          "Company financials",
          "Personal bank statements",
          "ITR (3 years)",
        ],
        applicationSteps: [
          "Obtain invitation letter from US business partner",
          "Complete DS-160 form online",
          "Pay the MRV fee of $185",
          "Schedule and attend OFC and interview",
          "Carry all business documentation to interview",
        ],
      },
      {
        type: "Student Visa (F1)",
        requirements: [
          "I-20 form from SEVP-certified institution",
          "SEVIS fee receipt (I-901)",
          "Valid passport with 6+ months validity",
          "DS-160 confirmation",
          "Financial proof covering tuition and living expenses",
          "Academic transcripts and test scores (GRE/GMAT/TOEFL/IELTS)",
          "Admission letter from university",
        ],
        fee: { embassyFee: 14000, serviceFee: 3000, currency: "INR" },
        processingTime: "4-8 weeks",
        validity: "Duration of study program",
        documentsNeeded: [
          "Original passport",
          "I-20 form",
          "SEVIS fee receipt",
          "DS-160 confirmation",
          "University admission letter",
          "Financial documents (bank statements, loan sanction letter)",
          "Academic certificates and transcripts",
          "Standardized test scores",
          "Statement of Purpose",
          "Sponsor documents (if applicable)",
        ],
        applicationSteps: [
          "Receive I-20 from your US university",
          "Pay SEVIS fee at fmjfee.com",
          "Complete DS-160 form online",
          "Pay the MRV fee of $185",
          "Schedule OFC and visa interview",
          "Attend interview with all academic and financial documents",
        ],
      },
    ],
    embassyInfo: {
      name: "U.S. Embassy & Consulates in India",
      locationInIndia: "New Delhi, Mumbai, Chennai, Hyderabad, Kolkata",
      appointmentRequired: true,
      processingCentres: ["New Delhi", "Mumbai", "Chennai", "Hyderabad", "Kolkata"],
      website: "https://www.ustraveldocs.com/in",
    },
    faqs: [
      {
        question: "How long does it take to get a US visa from India?",
        answer:
          "The total process takes 3-8 weeks. This includes filling the DS-160 form, scheduling an interview (wait times vary by city and season), attending the interview, and receiving the passport back. Peak season (May-August) has longer wait times.",
      },
      {
        question: "What is the US visa interview like?",
        answer:
          "The interview lasts 2-5 minutes. The consular officer will ask about your travel purpose, ties to India, financial capability, and plans in the US. Be honest, concise, and confident. Carry all supporting documents.",
      },
      {
        question: "Can I get a 10-year US visa?",
        answer:
          "Yes, B1/B2 tourist and business visas are typically issued for 10 years with multiple entry. However, the consular officer has discretion to issue shorter validity based on individual circumstances.",
      },
      {
        question: "What are the common reasons for US visa rejection?",
        answer:
          "Common reasons include insufficient ties to India, inadequate financial proof, incomplete documentation, previous visa violations, and inability to clearly articulate the purpose of visit. Our consultants help you avoid these pitfalls.",
      },
    ],
  },
  {
    name: "United Kingdom",
    slug: "united-kingdom",
    code: "GB",
    flag: "\u{1F1EC}\u{1F1E7}",
    region: "europe",
    travelAdvisory: "green",
    visaTypes: [
      {
        type: "Standard Visitor Visa",
        requirements: [
          "Valid passport",
          "Completed online application form",
          "Proof of accommodation in the UK",
          "Financial evidence (bank statements, payslips)",
          "Travel itinerary",
          "Employment or business proof",
          "Biometric appointment at VFS Global",
        ],
        fee: { embassyFee: 8500, serviceFee: 2000, currency: "INR" },
        processingTime: "15 working days (standard), 5 working days (priority)",
        validity: "6 months (single/multiple entry)",
        documentsNeeded: [
          "Original passport",
          "Online application confirmation",
          "Bank statements (6 months)",
          "Employment letter",
          "Hotel booking or sponsor letter",
          "Travel insurance",
          "Photographs",
          "ITR (2-3 years)",
        ],
        applicationSteps: [
          "Apply online at gov.uk/apply-uk-visa",
          "Pay the visa fee online",
          "Book biometric appointment at nearest VFS Global centre",
          "Attend appointment with documents",
          "Wait for processing (track online)",
          "Collect passport from VFS or via courier",
        ],
      },
      {
        type: "Student Visa (Tier 4)",
        requirements: [
          "CAS (Confirmation of Acceptance for Studies) from UK institution",
          "Proof of English language ability (IELTS/PTE)",
          "Financial proof covering tuition + living costs",
          "Valid passport",
          "TB test certificate (from approved centre)",
        ],
        fee: { embassyFee: 30000, serviceFee: 3000, currency: "INR" },
        processingTime: "3-4 weeks",
        validity: "Duration of course + additional period",
        documentsNeeded: [
          "CAS letter",
          "IELTS/PTE score report",
          "Financial documents",
          "Academic certificates",
          "TB test certificate",
          "Passport",
        ],
        applicationSteps: [
          "Receive CAS from your UK university",
          "Complete online application",
          "Pay visa fee and Immigration Health Surcharge (IHS)",
          "Book and attend biometric appointment",
          "Submit documents and wait for decision",
        ],
      },
    ],
    embassyInfo: {
      name: "British High Commission / VFS Global",
      locationInIndia: "New Delhi, Mumbai, Chennai, Bangalore, Hyderabad, Kolkata, Chandigarh, Cochin",
      appointmentRequired: true,
      processingCentres: ["New Delhi", "Mumbai", "Chennai", "Bangalore", "Hyderabad"],
      website: "https://www.vfsglobal.co.uk/in",
    },
    faqs: [
      {
        question: "How long does a UK visa take from India?",
        answer: "Standard processing is 15 working days. Priority service (5 working days) and super-priority (next working day) are available for additional fees.",
      },
      {
        question: "Do I need to attend an interview for UK visa?",
        answer: "Most applicants only need a biometric appointment (fingerprints and photo) at VFS Global. Interviews are rare for standard visitor visas but may be requested.",
      },
    ],
  },
  {
    name: "Canada",
    slug: "canada",
    code: "CA",
    flag: "\u{1F1E8}\u{1F1E6}",
    region: "americas",
    travelAdvisory: "green",
    visaTypes: [
      {
        type: "Temporary Resident Visa (Tourist)",
        requirements: [
          "Valid passport",
          "Completed IMM 5257 form",
          "Digital photographs meeting specifications",
          "Proof of financial support",
          "Travel itinerary",
          "Proof of ties to India",
          "Letter of invitation (if applicable)",
        ],
        fee: { embassyFee: 7200, serviceFee: 2000, currency: "INR" },
        processingTime: "4-6 weeks",
        validity: "Up to 10 years (multiple entry)",
        documentsNeeded: [
          "Passport",
          "Application form IMM 5257",
          "Family information form IMM 5645",
          "Digital photos",
          "Bank statements (6 months)",
          "Employment proof",
          "Travel insurance",
          "Purpose of visit letter",
        ],
        applicationSteps: [
          "Create account on IRCC portal",
          "Complete online application",
          "Pay processing fee of CAD 100",
          "Provide biometrics at VFS Global (CAD 85 additional)",
          "Submit passport for stamping",
          "Receive decision and collect passport",
        ],
      },
      {
        type: "Study Permit",
        requirements: [
          "Letter of acceptance from DLI (Designated Learning Institution)",
          "Proof of financial support (tuition + CAD 20,635 for living expenses)",
          "Valid passport",
          "Biometrics",
          "Medical examination (from panel physician)",
          "Police clearance certificate",
        ],
        fee: { embassyFee: 12600, serviceFee: 3000, currency: "INR" },
        processingTime: "6-12 weeks",
        validity: "Duration of study program + 90 days",
        documentsNeeded: [
          "Acceptance letter from DLI",
          "GIC certificate (CAD 20,635)",
          "First year tuition receipt",
          "Academic transcripts",
          "IELTS/TOEFL scores",
          "SOP (Statement of Purpose)",
          "Passport",
          "Medical examination report",
        ],
        applicationSteps: [
          "Obtain acceptance from a DLI",
          "Get a GIC from a participating bank",
          "Create IRCC account and apply online",
          "Pay application fee (CAD 150)",
          "Provide biometrics at VFS Global",
          "Complete medical examination",
          "Wait for processing and decision",
        ],
      },
    ],
    embassyInfo: {
      name: "High Commission of Canada / VFS Global",
      locationInIndia: "New Delhi, Chandigarh",
      appointmentRequired: true,
      processingCentres: ["New Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad", "Kolkata", "Chandigarh"],
    },
    faqs: [
      {
        question: "How long does a Canada visa take from India?",
        answer: "Tourist visas take 4-6 weeks. Study permits can take 6-12 weeks. Processing times vary by season. Apply well in advance of your travel dates.",
      },
      {
        question: "Is Canada visa easy to get from India?",
        answer: "Canada assesses financial ability, purpose of visit, and ties to home country. With proper documentation and genuine travel intent, approval rates are good. Our experts help maximize your chances.",
      },
    ],
  },
  {
    name: "Australia",
    slug: "australia",
    code: "AU",
    flag: "\u{1F1E6}\u{1F1FA}",
    region: "oceania",
    travelAdvisory: "green",
    visaTypes: [
      {
        type: "Visitor Visa (Subclass 600)",
        requirements: [
          "Valid passport",
          "Completed online application via ImmiAccount",
          "Financial proof",
          "Health insurance",
          "Purpose of visit documentation",
          "Character requirements (police clearance if needed)",
        ],
        fee: { embassyFee: 12000, serviceFee: 2000, currency: "INR" },
        processingTime: "20-30 days",
        validity: "3, 6, or 12 months",
        documentsNeeded: [
          "Passport",
          "Online application form",
          "Bank statements",
          "Employment proof",
          "Travel insurance",
          "Travel itinerary",
          "Invitation letter (if visiting family/friends)",
          "Photographs",
        ],
        applicationSteps: [
          "Create ImmiAccount at online.immi.gov.au",
          "Complete Subclass 600 application",
          "Upload supporting documents",
          "Pay the visa application charge (AUD 190)",
          "Attend biometrics if requested",
          "Wait for processing and decision",
        ],
      },
      {
        type: "Student Visa (Subclass 500)",
        requirements: [
          "CoE (Confirmation of Enrolment) from Australian institution",
          "GTE (Genuine Temporary Entrant) statement",
          "English proficiency proof (IELTS 5.5+)",
          "Financial capacity proof",
          "OSHC (Overseas Student Health Cover)",
          "Medical and character requirements",
        ],
        fee: { embassyFee: 52000, serviceFee: 3500, currency: "INR" },
        processingTime: "4-6 weeks",
        validity: "Duration of course + additional months",
        documentsNeeded: [
          "CoE from registered institution",
          "GTE statement",
          "IELTS/PTE scores",
          "Financial documents",
          "OSHC policy",
          "Academic transcripts",
          "Medical examination report",
          "Police clearance",
        ],
        applicationSteps: [
          "Get CoE from your Australian university",
          "Purchase OSHC",
          "Create ImmiAccount and lodge application",
          "Upload documents and pay fee (AUD 710)",
          "Complete health and character checks",
          "Wait for visa grant",
        ],
      },
    ],
    embassyInfo: {
      name: "Australian High Commission / VFS Global",
      locationInIndia: "New Delhi",
      appointmentRequired: false,
      processingCentres: ["New Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad"],
    },
    faqs: [
      {
        question: "Is the Australia visa process online?",
        answer: "Yes, Australia has a fully online visa system via ImmiAccount. All applications, document uploads, and payments are done online. Physical biometrics may be requested.",
      },
    ],
  },
  {
    name: "Schengen (Europe)",
    slug: "schengen",
    code: "EU",
    flag: "\u{1F1EA}\u{1F1FA}",
    region: "europe",
    travelAdvisory: "green",
    visaTypes: [
      {
        type: "Schengen Tourist Visa (Type C)",
        requirements: [
          "Valid passport (issued within last 10 years, valid 3+ months after return)",
          "Completed Schengen visa application form",
          "Two recent passport photographs (35x45mm)",
          "Travel insurance (minimum EUR 30,000 coverage)",
          "Flight itinerary (round trip)",
          "Hotel bookings for entire stay",
          "Bank statements (3 months)",
          "Employment proof or business registration",
          "Cover letter explaining purpose and itinerary",
        ],
        fee: { embassyFee: 7000, serviceFee: 2000, currency: "INR" },
        processingTime: "15 calendar days (standard)",
        validity: "Up to 90 days within 180-day period",
        documentsNeeded: [
          "Passport (original + copy of all pages)",
          "Application form",
          "Photographs (2 nos, 35x45mm)",
          "Travel insurance certificate",
          "Flight booking",
          "Hotel reservation",
          "Bank statements (3 months)",
          "Salary slips (3 months)",
          "Employment letter",
          "ITR (2-3 years)",
          "Cover letter",
          "Day-wise travel itinerary",
        ],
        applicationSteps: [
          "Determine which country to apply to (main destination or first entry)",
          "Fill the Schengen visa application form",
          "Book appointment at VFS Global or Embassy",
          "Pay visa fee (EUR 80) + VFS service charge",
          "Attend appointment with all documents and biometrics",
          "Wait for processing (usually 15 days)",
          "Collect passport with visa sticker",
        ],
        notes: "Apply to the embassy of the country where you will spend the most days. If equal days, apply to the country of first entry.",
      },
      {
        type: "Schengen Business Visa",
        requirements: [
          "All tourist visa requirements",
          "Business invitation letter from European company",
          "Company registration documents",
          "Company bank statements",
          "Previous business travel history",
        ],
        fee: { embassyFee: 7000, serviceFee: 2000, currency: "INR" },
        processingTime: "15 calendar days",
        validity: "Up to 90 days within 180-day period",
        documentsNeeded: [
          "All tourist visa documents",
          "Business invitation letter",
          "Company letterhead cover",
          "Company registration certificate",
          "Company bank statements",
        ],
        applicationSteps: [
          "Obtain business invitation from European partner",
          "Determine which embassy to apply at",
          "Complete application with business justification",
          "Attend appointment with biometrics",
          "Await processing",
        ],
      },
    ],
    embassyInfo: {
      name: "Various Embassies / VFS Global",
      locationInIndia: "New Delhi, Mumbai, Bangalore, Chennai, Hyderabad, Kolkata, Pune, Ahmedabad",
      appointmentRequired: true,
      processingCentres: ["New Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad", "Kolkata"],
    },
    faqs: [
      {
        question: "Which embassy should I apply for Schengen visa?",
        answer: "Apply at the embassy of your main destination country (where you'll spend the most days). If visiting multiple countries for equal duration, apply at the embassy of your first entry country.",
      },
      {
        question: "How many days can I stay with a Schengen visa?",
        answer: "A standard Schengen visa allows up to 90 days within any 180-day period. This applies across all 27 Schengen countries combined.",
      },
      {
        question: "Is travel insurance mandatory for Schengen visa?",
        answer: "Yes. You must have travel insurance with minimum EUR 30,000 coverage for medical expenses and repatriation, valid across all Schengen states.",
      },
    ],
  },
  {
    name: "Singapore",
    slug: "singapore",
    code: "SG",
    flag: "\u{1F1F8}\u{1F1EC}",
    region: "asia",
    travelAdvisory: "green",
    visaTypes: [
      {
        type: "Tourist Visa",
        requirements: [
          "Valid passport with 6+ months validity",
          "Completed visa application form (Form 14A)",
          "Recent passport photograph",
          "Flight itinerary",
          "Hotel booking",
          "Bank statement (3 months)",
          "Employment proof",
        ],
        fee: { embassyFee: 2500, serviceFee: 1500, currency: "INR" },
        processingTime: "3-5 working days",
        validity: "Up to 2 years (multiple entry, 30 days per visit)",
        documentsNeeded: [
          "Passport",
          "Form 14A",
          "Photograph",
          "Cover letter",
          "Bank statements",
          "Employment proof",
          "Flight and hotel bookings",
        ],
        applicationSteps: [
          "Apply through authorized visa agent or Singapore Embassy",
          "Submit Form 14A with documents",
          "Pay visa fee of SGD 30",
          "Wait for processing (3-5 days)",
          "Receive e-visa via email",
        ],
        notes: "Singapore tourist visa can be applied through authorized agents like Udaan and CTS. e-Visa is issued electronically.",
      },
    ],
    embassyInfo: {
      name: "Singapore Embassy / Authorized Agents",
      locationInIndia: "New Delhi, Mumbai, Chennai, Bangalore, Hyderabad",
      appointmentRequired: false,
      processingCentres: ["New Delhi", "Mumbai", "Chennai", "Bangalore", "Hyderabad", "Pune", "Ahmedabad"],
    },
    faqs: [
      {
        question: "Can I get Singapore visa on arrival?",
        answer: "No, Indian passport holders need a visa before travel. However, the e-visa process is quick (3-5 days) and done entirely through authorized agents.",
      },
    ],
  },
  {
    name: "UAE",
    slug: "uae",
    code: "AE",
    flag: "\u{1F1E6}\u{1F1EA}",
    region: "middle-east",
    travelAdvisory: "green",
    visaTypes: [
      {
        type: "Tourist Visa (30 days)",
        requirements: [
          "Valid passport with 6+ months validity",
          "Passport-size photograph",
          "Confirmed return flight ticket",
          "Hotel booking or sponsor details",
          "Bank statement showing sufficient funds",
        ],
        fee: { embassyFee: 6000, serviceFee: 1500, currency: "INR" },
        processingTime: "3-4 working days",
        validity: "30 days (single entry)",
        documentsNeeded: [
          "Passport color scan",
          "Photograph",
          "Flight booking",
          "Hotel booking",
          "Bank statement",
        ],
        applicationSteps: [
          "Submit application through authorized agent or airline",
          "Provide passport scan and photograph",
          "Pay visa fee",
          "Receive e-visa via email (3-4 days)",
          "Print e-visa for travel",
        ],
        notes: "UAE visa can also be obtained through airlines (Emirates, Etihad, FlyDubai) for an additional fee. Transit visas (48/96 hours) available for shorter stays.",
      },
    ],
    embassyInfo: {
      name: "UAE Embassy / Authorized Agents / Airlines",
      locationInIndia: "New Delhi",
      appointmentRequired: false,
      processingCentres: ["New Delhi", "Mumbai"],
    },
    faqs: [
      {
        question: "Can Indians get UAE visa on arrival?",
        answer: "No, but the e-visa process is fast (3-4 working days). You can also get a visa on arrival if you hold a valid US visa/Green Card or have certain professional designations.",
      },
    ],
  },
  {
    name: "Malaysia",
    slug: "malaysia",
    code: "MY",
    flag: "\u{1F1F2}\u{1F1FE}",
    region: "asia",
    travelAdvisory: "green",
    visaTypes: [
      {
        type: "eNTRI (Electronic Travel Registration & Information)",
        requirements: [
          "Valid passport with 6+ months validity",
          "Return flight ticket",
          "Accommodation proof",
          "Sufficient funds for stay",
        ],
        fee: { embassyFee: 1700, serviceFee: 1000, currency: "INR" },
        processingTime: "1-3 working days (online)",
        validity: "15 days (single entry, non-extendable)",
        documentsNeeded: [
          "Passport scan",
          "Return flight ticket",
          "Hotel booking",
          "Passport-size photo",
        ],
        applicationSteps: [
          "Apply online at windowmalaysia.my",
          "Upload documents",
          "Pay fee online (MYR 20)",
          "Receive eNTRI note via email",
          "Print and carry while traveling",
        ],
        notes: "eNTRI is for tourism only and valid for 15 days. For longer stays, apply for e-Visa.",
      },
      {
        type: "e-Visa (30 days)",
        requirements: [
          "Valid passport with 6+ months validity",
          "Return flight ticket",
          "Accommodation proof",
          "Bank statement showing sufficient funds",
          "Passport photograph",
        ],
        fee: { embassyFee: 4200, serviceFee: 1000, currency: "INR" },
        processingTime: "2-5 working days",
        validity: "30 days (single entry)",
        documentsNeeded: [
          "Passport scan",
          "Return flight ticket",
          "Hotel booking",
          "Bank statement (3 months)",
          "Passport photograph",
        ],
        applicationSteps: [
          "Apply online at windowmalaysia.my",
          "Upload all documents",
          "Pay visa fee online (MYR 200)",
          "Receive e-Visa via email",
          "Print and carry",
        ],
      },
    ],
    embassyInfo: {
      name: "High Commission of Malaysia / Authorized Agents",
      locationInIndia: "New Delhi, Mumbai, Chennai",
      appointmentRequired: false,
      processingCentres: ["New Delhi", "Mumbai", "Chennai"],
    },
    faqs: [
      {
        question: "What is the difference between eNTRI and e-Visa for Malaysia?",
        answer: "eNTRI is valid for 15 days, cheaper, and quicker. e-Visa allows up to 30 days. Both are single entry. Choose based on your trip duration.",
      },
    ],
  },
  {
    name: "Thailand",
    slug: "thailand",
    code: "TH",
    flag: "\u{1F1F9}\u{1F1ED}",
    region: "asia",
    travelAdvisory: "green",
    visaTypes: [
      {
        type: "Visa on Arrival",
        requirements: [
          "Valid passport with 6+ months validity",
          "Return flight ticket within 15 days",
          "Proof of accommodation",
          "THB 10,000 per person cash or equivalent",
          "Recent passport photograph (4x6 cm)",
        ],
        fee: { embassyFee: 1700, serviceFee: 0, currency: "INR" },
        processingTime: "On arrival (30-60 minutes at airport)",
        validity: "15 days (non-extendable)",
        documentsNeeded: [
          "Passport",
          "Return ticket",
          "Hotel booking",
          "Cash (THB 10,000)",
          "Photograph",
          "Completed TM.88 form",
        ],
        applicationSteps: [
          "Arrive at designated Thai airport",
          "Fill TM.88 arrival form",
          "Submit documents at VOA counter",
          "Pay THB 2,000 fee",
          "Receive passport stamp",
        ],
        notes: "Visa on Arrival is available at major airports including Suvarnabhumi (Bangkok), Don Mueang, Phuket, and Chiang Mai. Carry sufficient cash as proof of funds.",
      },
      {
        type: "Tourist Visa (60 days)",
        requirements: [
          "Valid passport with 6+ months validity",
          "Visa application form",
          "Passport photographs",
          "Bank statement (3 months) showing THB 20,000+ equivalent",
          "Flight itinerary",
          "Hotel bookings",
        ],
        fee: { embassyFee: 3400, serviceFee: 1000, currency: "INR" },
        processingTime: "5-7 working days",
        validity: "60 days (single entry, extendable by 30 days)",
        documentsNeeded: [
          "Passport",
          "Application form",
          "Photographs",
          "Bank statement",
          "Flight booking",
          "Hotel booking",
          "Cover letter",
        ],
        applicationSteps: [
          "Apply at Royal Thai Embassy/Consulate or VFS Global",
          "Submit completed application with documents",
          "Pay visa fee",
          "Wait for processing",
          "Collect passport with visa",
        ],
      },
    ],
    embassyInfo: {
      name: "Royal Thai Embassy / VFS Global",
      locationInIndia: "New Delhi, Mumbai, Kolkata, Chennai",
      appointmentRequired: false,
      processingCentres: ["New Delhi", "Mumbai", "Kolkata", "Chennai"],
    },
    faqs: [
      {
        question: "Do Indians need visa for Thailand?",
        answer: "Indians can get a Visa on Arrival (15 days) or apply for a pre-approved tourist visa (60 days). For stays under 15 days, VOA at the airport is the easiest option.",
      },
    ],
  },
  {
    name: "Japan",
    slug: "japan",
    code: "JP",
    flag: "\u{1F1EF}\u{1F1F5}",
    region: "asia",
    travelAdvisory: "green",
    visaTypes: [
      {
        type: "Tourist Visa (Short-term Stay)",
        requirements: [
          "Valid passport",
          "Visa application form",
          "Passport photograph (4.5x4.5 cm)",
          "Detailed daily itinerary",
          "Flight reservation",
          "Hotel bookings for entire stay",
          "Bank statements (6 months)",
          "Employment proof",
          "Income tax returns (3 years)",
        ],
        fee: { embassyFee: 500, serviceFee: 2000, currency: "INR" },
        processingTime: "5-7 working days",
        validity: "15-90 days (single/double/multiple entry)",
        documentsNeeded: [
          "Passport (original)",
          "Application form",
          "Photograph (4.5x4.5cm, white background)",
          "Day-wise itinerary",
          "Hotel bookings",
          "Flight reservation",
          "Bank statements (6 months)",
          "Employment letter",
          "ITR (3 years)",
          "Cover letter",
        ],
        applicationSteps: [
          "Prepare a detailed day-wise itinerary",
          "Submit application at VFS Global or Embassy",
          "Pay visa fee",
          "Wait for processing (5-7 days)",
          "Collect passport with visa",
        ],
        notes: "Japan requires a very detailed day-wise itinerary including transport between cities. The visa fee is one of the lowest (single entry: free for Indian nationals through certain programs, otherwise INR 500).",
      },
    ],
    embassyInfo: {
      name: "Embassy of Japan / VFS Global",
      locationInIndia: "New Delhi, Mumbai, Bangalore, Chennai, Kolkata",
      appointmentRequired: true,
      processingCentres: ["New Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata"],
    },
    faqs: [
      {
        question: "Is Japan visa hard to get for Indians?",
        answer: "Japan is strict about documentation, especially the daily itinerary. However, with a well-prepared application showing clear travel plans and financial stability, approval rates are good.",
      },
    ],
  },
  {
    name: "South Korea",
    slug: "south-korea",
    code: "KR",
    flag: "\u{1F1F0}\u{1F1F7}",
    region: "asia",
    travelAdvisory: "green",
    visaTypes: [
      {
        type: "Tourist Visa (C-3-9)",
        requirements: [
          "Valid passport with at least 6 months validity",
          "Completed visa application form",
          "Passport-size photograph (3.5x4.5 cm, white background)",
          "Bank statements (3 months) showing sufficient funds",
          "Employment proof or business registration",
          "Income tax returns (2-3 years)",
          "Flight reservation (round trip)",
          "Hotel booking for entire stay",
          "Cover letter with travel itinerary",
        ],
        fee: { embassyFee: 3500, serviceFee: 1500, currency: "INR" },
        processingTime: "5-7 working days",
        validity: "Up to 90 days (single/multiple entry)",
        documentsNeeded: [
          "Original passport + old passports",
          "Application form",
          "Photograph (3.5x4.5 cm, white background)",
          "Bank statements (3 months)",
          "Salary slips (3 months)",
          "Employment letter on company letterhead",
          "ITR (2-3 years)",
          "Flight itinerary",
          "Hotel bookings",
          "Cover letter with day-wise itinerary",
        ],
        applicationSteps: [
          "Complete visa application form (download from Embassy website)",
          "Book appointment at Korean Embassy or KVAC (Korea Visa Application Centre)",
          "Submit application with all required documents",
          "Pay visa fee",
          "Wait for processing (5-7 working days)",
          "Collect passport with visa sticker",
        ],
        notes:
          "South Korea has introduced K-ETA (Korea Electronic Travel Authorization) for certain nationalities, but Indian passport holders still need a regular visa. Apply through KVAC centres for faster processing.",
      },
      {
        type: "Business Visa (C-3-4)",
        requirements: [
          "Valid passport with at least 6 months validity",
          "Completed visa application form",
          "Passport-size photograph",
          "Invitation letter from Korean company",
          "Business registration of Korean company",
          "Company registration documents of Indian company",
          "Bank statements and financial proof",
          "Previous travel history proof",
        ],
        fee: { embassyFee: 3500, serviceFee: 1500, currency: "INR" },
        processingTime: "5-7 working days",
        validity: "Up to 90 days (single/multiple entry)",
        documentsNeeded: [
          "Original passport",
          "Application form",
          "Photograph",
          "Invitation letter from Korean company",
          "Korean company business registration",
          "Indian company documents",
          "Bank statements (3 months)",
          "ITR (2-3 years)",
          "Cover letter on company letterhead",
        ],
        applicationSteps: [
          "Obtain invitation letter from Korean business partner",
          "Complete visa application form",
          "Book appointment at KVAC or Embassy",
          "Submit all documents with fee",
          "Wait for processing",
          "Collect passport with visa",
        ],
      },
    ],
    embassyInfo: {
      name: "Embassy of the Republic of Korea / KVAC",
      locationInIndia: "New Delhi, Mumbai, Chennai",
      appointmentRequired: true,
      processingCentres: ["New Delhi", "Mumbai", "Chennai"],
      website: "https://overseas.mofa.go.kr/in-en",
    },
    faqs: [
      {
        question: "How long does it take to get a South Korea visa from India?",
        answer:
          "Processing typically takes 5-7 working days. During peak season (spring cherry blossom and autumn foliage), it may take slightly longer. Apply at least 2-3 weeks before your travel date.",
      },
      {
        question: "Can Indians get K-ETA for South Korea?",
        answer:
          "No, K-ETA (Korea Electronic Travel Authorization) is currently not available for Indian passport holders. Indians must apply for a regular visa through the Korean Embassy or KVAC.",
      },
      {
        question: "What is the required bank balance for a South Korea tourist visa?",
        answer:
          "There is no officially stated minimum, but a healthy bank balance showing at least INR 3-5 lakhs with consistent transactions over 3 months is recommended to demonstrate financial capability.",
      },
      {
        question: "Is South Korea visa easy to get for Indians?",
        answer:
          "South Korea has a straightforward visa process. With proper documentation including a clear itinerary, good financial proof, and employment stability, the approval rate is high for Indian applicants.",
      },
    ],
  },
  {
    name: "New Zealand",
    slug: "new-zealand",
    code: "NZ",
    flag: "\u{1F1F3}\u{1F1FF}",
    region: "oceania",
    travelAdvisory: "green",
    visaTypes: [
      {
        type: "Visitor Visa",
        requirements: [
          "Valid passport with at least 3 months validity beyond intended stay",
          "Completed online application via Immigration New Zealand",
          "Proof of sufficient funds (NZD 1,000 per month of stay)",
          "Return or onward flight ticket",
          "Proof of accommodation",
          "Travel insurance",
          "Chest X-ray or medical certificate (if stay exceeds 6 months)",
        ],
        fee: { embassyFee: 12000, serviceFee: 2000, currency: "INR" },
        processingTime: "20-25 working days",
        validity: "Up to 9 months",
        documentsNeeded: [
          "Passport",
          "Online application confirmation",
          "Bank statements (3-6 months)",
          "Employment proof",
          "Flight booking (return)",
          "Hotel booking or invitation letter",
          "Travel insurance",
          "Photographs",
          "ITR (2-3 years)",
        ],
        applicationSteps: [
          "Create account on Immigration New Zealand website",
          "Complete online Visitor Visa application",
          "Upload all supporting documents",
          "Pay the visa fee (NZD 211)",
          "Provide biometrics at VFS Global if requested",
          "Wait for processing (20-25 working days)",
          "Receive visa decision via email",
        ],
        notes:
          "New Zealand uses an online visa system. Most applications can be completed without visiting a physical centre. e-Visa is linked electronically to your passport.",
      },
      {
        type: "Student Visa",
        requirements: [
          "Offer of place from a New Zealand education provider",
          "Proof of tuition fee payment or financial guarantee",
          "Proof of living funds (NZD 20,000 per year)",
          "Valid passport",
          "Medical and chest X-ray certificates",
          "Police clearance certificate",
          "Travel insurance",
          "English proficiency proof (IELTS/PTE)",
        ],
        fee: { embassyFee: 23000, serviceFee: 3000, currency: "INR" },
        processingTime: "4-8 weeks",
        validity: "Duration of study + 1-3 months",
        documentsNeeded: [
          "Offer of place letter",
          "Tuition fee receipt",
          "Proof of living funds",
          "Passport",
          "Medical certificate",
          "Chest X-ray",
          "Police clearance",
          "IELTS/PTE scores",
          "Academic transcripts",
          "SOP (Statement of Purpose)",
        ],
        applicationSteps: [
          "Receive offer of place from NZ institution",
          "Pay tuition fee or arrange financial guarantee",
          "Apply online through Immigration New Zealand",
          "Upload all documents",
          "Complete medical and police checks",
          "Pay the visa fee (NZD 375)",
          "Wait for processing and decision",
        ],
      },
    ],
    embassyInfo: {
      name: "New Zealand High Commission / VFS Global",
      locationInIndia: "New Delhi",
      appointmentRequired: false,
      processingCentres: ["New Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad"],
      website: "https://www.immigration.govt.nz",
    },
    faqs: [
      {
        question: "How long does a New Zealand visa take from India?",
        answer:
          "Visitor visa processing takes 20-25 working days on average. Student visas may take 4-8 weeks. Apply well in advance as processing times can vary.",
      },
      {
        question: "Is New Zealand visa online or offline?",
        answer:
          "New Zealand has a fully online visa system. You apply and upload documents through the Immigration New Zealand portal. Physical submission is only needed in rare cases.",
      },
      {
        question: "What is the minimum bank balance for a New Zealand visitor visa?",
        answer:
          "You need to show NZD 1,000 per month of intended stay (approximately INR 50,000 per month). A healthy bank balance with regular income deposits strengthens your application.",
      },
    ],
  },
  {
    name: "Germany",
    slug: "germany",
    code: "DE",
    flag: "\u{1F1E9}\u{1F1EA}",
    region: "europe",
    travelAdvisory: "green",
    visaTypes: [
      {
        type: "Short-Stay Schengen Visa (Tourist)",
        requirements: [
          "Valid passport (issued within last 10 years, valid 3+ months after return)",
          "Completed Schengen visa application form",
          "Two passport photographs (35x45 mm, biometric)",
          "Travel medical insurance (EUR 30,000 minimum coverage)",
          "Proof of accommodation in Germany",
          "Round-trip flight reservation",
          "Bank statements (3 months)",
          "Employment proof with salary details",
          "Cover letter with detailed itinerary",
        ],
        fee: { embassyFee: 7000, serviceFee: 2000, currency: "INR" },
        processingTime: "15 calendar days (standard)",
        validity: "Up to 90 days within 180-day period",
        documentsNeeded: [
          "Passport (original + copies)",
          "Application form (signed)",
          "Photographs (2, biometric format)",
          "Travel insurance certificate",
          "Flight reservation",
          "Hotel bookings or invitation letter",
          "Bank statements (3 months)",
          "Salary slips (3 months)",
          "Employment letter",
          "ITR (2-3 years)",
          "Cover letter with itinerary",
        ],
        applicationSteps: [
          "Book appointment at VFS Global for Germany",
          "Complete Schengen visa application form",
          "Prepare all supporting documents",
          "Attend VFS appointment with biometrics",
          "Pay visa fee (EUR 80) + VFS service charge",
          "Wait for processing (15 calendar days)",
          "Collect passport with visa from VFS",
        ],
        notes:
          "Germany is one of the most popular Schengen visa destinations. Appointment slots fill up fast; book well in advance. German consulates are strict about document completeness.",
      },
      {
        type: "Business Visa",
        requirements: [
          "All Schengen tourist visa requirements",
          "Invitation letter from German company (with company details and purpose)",
          "Indian company registration and letter",
          "Proof of business relationship",
          "Previous business travel proof",
        ],
        fee: { embassyFee: 7000, serviceFee: 2000, currency: "INR" },
        processingTime: "15 calendar days",
        validity: "Up to 90 days within 180-day period",
        documentsNeeded: [
          "All tourist visa documents",
          "Business invitation letter from German company",
          "Company cover letter on letterhead",
          "Company registration (Indian)",
          "Business bank statements",
          "Previous travel history",
        ],
        applicationSteps: [
          "Obtain invitation letter from German business partner",
          "Book VFS Global appointment",
          "Complete Schengen visa application form",
          "Attend appointment with business documents",
          "Pay visa fee and wait for processing",
        ],
      },
      {
        type: "National Visa (Student - Type D)",
        requirements: [
          "Admission letter from German university",
          "Proof of financial resources (EUR 11,208 per year in blocked account)",
          "Valid passport",
          "Health insurance valid in Germany",
          "German language proficiency (if applicable) or English proficiency",
          "Academic certificates and transcripts",
          "APS certificate (Akademische Pruefungsstelle)",
        ],
        fee: { embassyFee: 6300, serviceFee: 3000, currency: "INR" },
        processingTime: "6-12 weeks",
        validity: "Duration of study program",
        documentsNeeded: [
          "Admission letter (Zulassungsbescheid)",
          "Blocked account proof (EUR 11,208)",
          "Passport",
          "Health insurance",
          "APS certificate",
          "Language proficiency proof",
          "Academic certificates",
          "Transcripts (attested)",
          "Motivation letter",
          "CV/Resume",
        ],
        applicationSteps: [
          "Obtain admission from a German university",
          "Get APS certificate (required for Indian students)",
          "Open a blocked account (Sperrkonto) with EUR 11,208",
          "Purchase German health insurance",
          "Book appointment at German Embassy/Consulate",
          "Attend appointment with all documents",
          "Wait for processing (6-12 weeks)",
        ],
        notes:
          "German public universities have no or very low tuition fees. The blocked account (Sperrkonto) is mandatory as proof of financial sustenance. APS verification is compulsory for Indian students.",
      },
    ],
    embassyInfo: {
      name: "German Embassy / VFS Global",
      locationInIndia: "New Delhi, Mumbai, Bangalore, Chennai, Kolkata",
      appointmentRequired: true,
      processingCentres: ["New Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune"],
      website: "https://india.diplo.de",
    },
    faqs: [
      {
        question: "How long does a Germany visa take from India?",
        answer:
          "Short-stay Schengen visas take about 15 calendar days. Student visas (National Visa Type D) can take 6-12 weeks. Appointment availability at VFS is the main bottleneck, so book early.",
      },
      {
        question: "Do I need separate visa for Germany if I have a Schengen visa?",
        answer:
          "No. A Schengen visa issued by any member state allows travel to all 27 Schengen countries, including Germany, for up to 90 days within 180 days.",
      },
      {
        question: "What is the APS certificate for Germany student visa?",
        answer:
          "APS (Akademische Pruefungsstelle) is a mandatory verification process for Indian students. It verifies the authenticity of academic documents. You must clear APS before applying for a German student visa.",
      },
      {
        question: "Is studying in Germany free for Indian students?",
        answer:
          "Most German public universities charge no tuition fees except a small semester contribution (EUR 150-350). However, you need to show EUR 11,208 per year in a blocked account for living expenses.",
      },
    ],
  },
  {
    name: "France",
    slug: "france",
    code: "FR",
    flag: "\u{1F1EB}\u{1F1F7}",
    region: "europe",
    travelAdvisory: "green",
    visaTypes: [
      {
        type: "Short-Stay Schengen Visa (Tourist)",
        requirements: [
          "Valid passport (issued within last 10 years, valid 3+ months beyond intended stay)",
          "Completed Schengen visa application form",
          "Two recent passport photographs (35x45 mm)",
          "Travel medical insurance (EUR 30,000 minimum)",
          "Proof of accommodation in France",
          "Round-trip flight reservation",
          "Bank statements (3 months)",
          "Employment proof or business registration",
          "Cover letter with detailed itinerary",
        ],
        fee: { embassyFee: 7000, serviceFee: 2000, currency: "INR" },
        processingTime: "15 calendar days (standard)",
        validity: "Up to 90 days within 180-day period",
        documentsNeeded: [
          "Passport (original + copies of all stamped pages)",
          "Application form (signed and dated)",
          "Photographs (2 nos, 35x45 mm)",
          "Travel insurance certificate",
          "Flight reservation (round trip)",
          "Hotel bookings or attestation d'accueil (host invitation)",
          "Bank statements (3 months)",
          "Salary slips (3 months)",
          "Employment letter",
          "ITR (2-3 years)",
          "Cover letter with day-wise itinerary",
        ],
        applicationSteps: [
          "Register on France-Visas portal (france-visas.gouv.fr)",
          "Complete online application and download form",
          "Book appointment at VFS Global for France",
          "Attend appointment with documents and biometrics",
          "Pay visa fee (EUR 80) + VFS service charge",
          "Wait for processing (15 calendar days)",
          "Collect passport from VFS Global",
        ],
        notes:
          "France is the most visited country in the world. Apply through VFS Global centres in India. The France-Visas portal pre-checks your application for completeness before submission.",
      },
      {
        type: "Business Visa",
        requirements: [
          "All Schengen tourist visa requirements",
          "Invitation letter from French company",
          "French company registration extract (K-bis)",
          "Indian company registration and cover letter",
          "Proof of business purpose",
        ],
        fee: { embassyFee: 7000, serviceFee: 2000, currency: "INR" },
        processingTime: "15 calendar days",
        validity: "Up to 90 days within 180-day period",
        documentsNeeded: [
          "All tourist visa documents",
          "Business invitation letter from French company",
          "Company cover letter (Indian company)",
          "Company registration documents",
          "Business bank statements",
        ],
        applicationSteps: [
          "Obtain invitation from French business partner",
          "Register on France-Visas portal",
          "Book VFS appointment",
          "Submit documents with business justification",
          "Await processing",
        ],
      },
      {
        type: "Long-Stay Student Visa (VLS-TS)",
        requirements: [
          "Admission letter from French educational institution",
          "Campus France registration and interview completion",
          "Proof of financial resources (EUR 615 per month minimum)",
          "Valid passport",
          "Health insurance",
          "Academic transcripts and certificates",
          "French or English language proficiency proof",
        ],
        fee: { embassyFee: 8500, serviceFee: 3000, currency: "INR" },
        processingTime: "4-8 weeks",
        validity: "Duration of study program (up to 1 year, renewable)",
        documentsNeeded: [
          "Admission letter from French institution",
          "Campus France interview attestation",
          "Proof of financial resources",
          "Passport",
          "Health insurance",
          "Academic transcripts (attested)",
          "Language proficiency certificate",
          "Birth certificate (translated to French if required)",
          "Passport photographs",
          "Motivation letter",
        ],
        applicationSteps: [
          "Register and complete Campus France procedure (Etudes en France)",
          "Attend Campus France interview",
          "Receive Campus France approval",
          "Book appointment at VFS Global for long-stay visa",
          "Submit documents and attend appointment",
          "Pay visa fee (EUR 99)",
          "Wait for processing (4-8 weeks)",
        ],
        notes:
          "Campus France is mandatory for Indian students applying to French universities. The procedure includes academic profile review and an interview. Public university tuition in France is heavily subsidized.",
      },
    ],
    embassyInfo: {
      name: "Embassy of France / VFS Global",
      locationInIndia: "New Delhi, Mumbai, Bangalore, Kolkata, Hyderabad, Puducherry",
      appointmentRequired: true,
      processingCentres: ["New Delhi", "Mumbai", "Bangalore", "Kolkata", "Hyderabad", "Chennai"],
      website: "https://france-visas.gouv.fr",
    },
    faqs: [
      {
        question: "How long does a France visa take from India?",
        answer:
          "Short-stay Schengen visas for France are processed in about 15 calendar days. Long-stay student visas can take 4-8 weeks. VFS appointment availability varies by city.",
      },
      {
        question: "Can I use a France Schengen visa to visit other European countries?",
        answer:
          "Yes. A Schengen visa issued by France allows travel to all 27 Schengen member states. However, France must be your main destination or first point of entry if visiting multiple countries equally.",
      },
      {
        question: "What is Campus France and is it mandatory?",
        answer:
          "Campus France is the French government agency for promoting higher education. Indian students must register on the Etudes en France platform, complete an academic profile, and attend an interview before applying for a student visa.",
      },
      {
        question: "Is France expensive for Indian tourists?",
        answer:
          "France can be moderate to expensive. Budget INR 8,000-15,000 per day for accommodation, food, and transport. Showing a bank balance of INR 3-5 lakhs for a 10-15 day trip is recommended for visa purposes.",
      },
    ],
  },
  {
    name: "Italy",
    slug: "italy",
    code: "IT",
    flag: "\u{1F1EE}\u{1F1F9}",
    region: "europe",
    travelAdvisory: "green",
    visaTypes: [
      {
        type: "Short-Stay Schengen Visa (Tourist)",
        requirements: [
          "Valid passport (issued within last 10 years, valid 3+ months beyond intended stay)",
          "Completed Schengen visa application form",
          "Two passport photographs (35x45 mm, biometric)",
          "Travel medical insurance (EUR 30,000 minimum coverage)",
          "Proof of accommodation in Italy",
          "Round-trip flight reservation",
          "Bank statements (3 months)",
          "Employment proof with salary slips",
          "Detailed day-wise travel itinerary",
        ],
        fee: { embassyFee: 7000, serviceFee: 2000, currency: "INR" },
        processingTime: "15 calendar days (standard)",
        validity: "Up to 90 days within 180-day period",
        documentsNeeded: [
          "Passport (original + copies of all pages with stamps)",
          "Application form",
          "Photographs (2, biometric, 35x45 mm)",
          "Travel insurance",
          "Flight booking (round trip)",
          "Hotel bookings or host invitation letter",
          "Bank statements (3 months)",
          "Salary slips (3 months)",
          "Employment letter",
          "ITR (2-3 years)",
          "Cover letter with day-wise plan",
        ],
        applicationSteps: [
          "Book appointment at VFS Global for Italy",
          "Complete the Schengen visa application form",
          "Gather all supporting documents",
          "Attend VFS appointment with biometrics",
          "Pay visa fee (EUR 80) + VFS service charge",
          "Wait for processing (approximately 15 calendar days)",
          "Collect passport with visa from VFS",
        ],
        notes:
          "Italy is one of the most popular Schengen destinations from India. VFS Global handles applications. Appointment slots, especially in peak travel season (April-September), fill up quickly.",
      },
      {
        type: "Business Visa",
        requirements: [
          "All Schengen tourist visa requirements",
          "Invitation letter from Italian company with full details",
          "Camera di Commercio (Chamber of Commerce) extract of Italian company",
          "Indian company registration and cover letter",
          "Previous Italy/Schengen travel proof (if available)",
        ],
        fee: { embassyFee: 7000, serviceFee: 2000, currency: "INR" },
        processingTime: "15 calendar days",
        validity: "Up to 90 days within 180-day period",
        documentsNeeded: [
          "All tourist visa documents",
          "Business invitation letter",
          "Italian company registration (Visura Camerale)",
          "Indian company letterhead cover letter",
          "Company bank statements",
          "Business travel history",
        ],
        applicationSteps: [
          "Obtain invitation letter from Italian business partner",
          "Book appointment at VFS Global",
          "Complete application with business documents",
          "Attend appointment with biometrics",
          "Pay fee and await processing",
        ],
      },
    ],
    embassyInfo: {
      name: "Embassy of Italy / VFS Global",
      locationInIndia: "New Delhi, Mumbai, Kolkata, Chennai",
      appointmentRequired: true,
      processingCentres: ["New Delhi", "Mumbai", "Kolkata", "Chennai", "Bangalore", "Hyderabad"],
      website: "https://ambdelhi.esteri.it",
    },
    faqs: [
      {
        question: "How long does an Italy visa take from India?",
        answer:
          "Standard processing is 15 calendar days from the date of submission. During peak tourist season, it may take slightly longer. Book VFS appointments well in advance.",
      },
      {
        question: "Do I need a separate visa for Italy if I have a Schengen visa from another country?",
        answer:
          "No. Any valid Schengen visa allows entry to all Schengen countries including Italy. You only need a separate Italy visa if Italy is your main destination and you don't have an existing Schengen visa.",
      },
      {
        question: "What is the best time to apply for Italy tourist visa?",
        answer:
          "Apply at least 4-6 weeks before your travel date. For summer travel (June-August), apply as early as 3 months in advance as appointment slots fill quickly.",
      },
      {
        question: "Is travel insurance mandatory for Italy Schengen visa?",
        answer:
          "Yes, travel insurance with a minimum coverage of EUR 30,000 is mandatory. It must cover medical emergencies, hospitalization, and repatriation across all Schengen states.",
      },
    ],
  },
  {
    name: "China",
    slug: "china",
    code: "CN",
    flag: "\u{1F1E8}\u{1F1F3}",
    region: "asia",
    travelAdvisory: "yellow",
    visaTypes: [
      {
        type: "Tourist Visa (L Visa)",
        requirements: [
          "Valid passport with at least 6 months validity and 2 blank pages",
          "Completed China visa application form (Form V.2013)",
          "Recent passport photograph (48x33 mm, white background)",
          "Round-trip flight booking",
          "Hotel reservation for entire stay",
          "Detailed travel itinerary",
          "Bank statements (3 months)",
          "Employment proof",
        ],
        fee: { embassyFee: 5500, serviceFee: 2000, currency: "INR" },
        processingTime: "4-5 working days (regular), 2-3 days (express)",
        validity: "30-90 days (single/double/multiple entry)",
        documentsNeeded: [
          "Passport (original + copy of data page)",
          "Application form (Form V.2013)",
          "Photograph (48x33 mm, white background, no border)",
          "Flight booking (round trip)",
          "Hotel reservations",
          "Day-wise itinerary",
          "Bank statements (3 months)",
          "Employment letter",
          "Cover letter",
          "Copy of old Chinese visas (if any)",
        ],
        applicationSteps: [
          "Complete visa application form (download from Embassy website or CVASC)",
          "Book appointment at Chinese Visa Application Service Centre (CVASC)",
          "Attend appointment with all documents",
          "Pay visa fee",
          "Wait for processing (4-5 working days for regular)",
          "Collect passport with visa sticker",
        ],
        notes:
          "China has specific photo requirements (48x33 mm, head size 28-33 mm, white background). The CVASC handles most applications in India. Visa policies may change — check the latest requirements before applying.",
      },
      {
        type: "Business Visa (M Visa)",
        requirements: [
          "Valid passport with at least 6 months validity",
          "Completed visa application form",
          "Passport photograph (48x33 mm)",
          "Invitation letter from Chinese company or trade fair",
          "Indian company registration and letter",
          "Bank statements and financial proof",
          "Previous China travel history (if any)",
        ],
        fee: { embassyFee: 5500, serviceFee: 2000, currency: "INR" },
        processingTime: "4-5 working days (regular), 2-3 days (express)",
        validity: "30-90 days (single/double/multiple entry)",
        documentsNeeded: [
          "Passport (original)",
          "Application form",
          "Photograph (48x33 mm)",
          "Invitation letter from Chinese company (PU letter or regular invitation)",
          "Indian company cover letter",
          "Company registration",
          "Bank statements",
          "Business card",
        ],
        applicationSteps: [
          "Obtain invitation letter from Chinese business partner",
          "Complete visa application form",
          "Book appointment at CVASC",
          "Submit documents and attend appointment",
          "Pay visa fee",
          "Collect passport after processing",
        ],
      },
    ],
    embassyInfo: {
      name: "Chinese Visa Application Service Centre (CVASC)",
      locationInIndia: "New Delhi, Mumbai, Kolkata",
      appointmentRequired: true,
      processingCentres: ["New Delhi", "Mumbai", "Kolkata"],
      website: "https://www.visaforchina.cn",
    },
    faqs: [
      {
        question: "How long does a China visa take from India?",
        answer:
          "Regular processing takes 4-5 working days. Express processing (2-3 days) is available for an additional fee. Rush processing (next working day) may also be available in some centres.",
      },
      {
        question: "What are the photo requirements for a China visa?",
        answer:
          "China has strict photo specs: 48x33 mm, white background, no border, head width 15-22 mm, head height 28-33 mm. Many regular photo studios are not aware of these specs — use CVASC recommended studios.",
      },
      {
        question: "Do I need to book hotels in advance for China visa?",
        answer:
          "Yes, you need confirmed hotel bookings for your entire stay in China. The itinerary and accommodation must match your visa application dates.",
      },
      {
        question: "Can I get a China visa on arrival as an Indian?",
        answer:
          "No. Indian passport holders must obtain a visa before travel. There is no visa on arrival or e-visa facility for Indians traveling to mainland China. Apply through CVASC.",
      },
    ],
  },
  {
    name: "Sri Lanka",
    slug: "sri-lanka",
    code: "LK",
    flag: "\u{1F1F1}\u{1F1F0}",
    region: "asia",
    travelAdvisory: "green",
    visaTypes: [
      {
        type: "ETA (Electronic Travel Authorization) - Tourist",
        requirements: [
          "Valid passport with at least 6 months validity",
          "Return or onward flight ticket",
          "Proof of sufficient funds for the stay",
          "Proof of accommodation",
        ],
        fee: { embassyFee: 1700, serviceFee: 500, currency: "INR" },
        processingTime: "1-3 working days (online)",
        validity: "30 days (double entry, extendable up to 90 days)",
        documentsNeeded: [
          "Passport scan (bio-data page)",
          "Return flight ticket",
          "Hotel booking",
          "Passport-size photograph (digital)",
        ],
        applicationSteps: [
          "Visit the official ETA website (eta.gov.lk)",
          "Complete the online application form",
          "Pay the ETA fee online (USD 20 or equivalent)",
          "Receive ETA approval via email (usually within 24-48 hours)",
          "Print the ETA approval letter",
          "Present at immigration on arrival in Sri Lanka",
        ],
        notes:
          "Sri Lanka ETA is one of the easiest visas for Indians. The process is fully online and approval is usually within 24 hours. ETA can also be obtained on arrival at Bandaranaike Airport, but applying online beforehand is recommended.",
      },
      {
        type: "Business Visa (ETA - Business)",
        requirements: [
          "Valid passport with at least 6 months validity",
          "Invitation letter from Sri Lankan company",
          "Indian company cover letter",
          "Proof of business purpose",
        ],
        fee: { embassyFee: 3400, serviceFee: 500, currency: "INR" },
        processingTime: "1-3 working days (online)",
        validity: "30 days (extendable)",
        documentsNeeded: [
          "Passport scan",
          "Business invitation letter",
          "Company letter",
          "Flight booking",
          "Hotel booking",
        ],
        applicationSteps: [
          "Visit the ETA website (eta.gov.lk)",
          "Select 'Business' purpose",
          "Complete application and upload documents",
          "Pay fee online (USD 40)",
          "Receive approval via email",
          "Print and carry ETA letter",
        ],
      },
    ],
    embassyInfo: {
      name: "High Commission of Sri Lanka",
      locationInIndia: "New Delhi, Mumbai, Chennai",
      appointmentRequired: false,
      processingCentres: ["New Delhi", "Mumbai", "Chennai"],
      website: "https://eta.gov.lk",
    },
    faqs: [
      {
        question: "Do Indians need visa for Sri Lanka?",
        answer:
          "Yes, Indian nationals need an ETA (Electronic Travel Authorization). It can be obtained online within 24-48 hours or on arrival at the airport, though online application is recommended.",
      },
      {
        question: "How long can Indians stay in Sri Lanka?",
        answer:
          "The ETA allows a stay of up to 30 days with double entry. This can be extended up to 90 days by visiting the Department of Immigration in Colombo.",
      },
      {
        question: "Can I get Sri Lanka visa on arrival?",
        answer:
          "Yes, Indians can obtain ETA on arrival at Bandaranaike International Airport. However, applying online in advance (eta.gov.lk) is faster and avoids queuing at the airport.",
      },
      {
        question: "Is Sri Lanka safe for Indian tourists?",
        answer:
          "Sri Lanka is generally safe and welcoming for Indian tourists. It shares cultural and historical ties with India. Exercise normal precautions, especially in remote areas.",
      },
    ],
  },
  {
    name: "Nepal",
    slug: "nepal",
    code: "NP",
    flag: "\u{1F1F3}\u{1F1F5}",
    region: "asia",
    travelAdvisory: "green",
    visaTypes: [
      {
        type: "Free Entry (No Visa Required)",
        requirements: [
          "Valid Indian passport OR valid government-issued photo ID (Voter ID, Aadhaar, etc.)",
          "Indian nationals do not require a visa to enter Nepal",
        ],
        fee: { embassyFee: 0, serviceFee: 0, currency: "INR" },
        processingTime: "On arrival (immediate entry)",
        validity: "Unlimited stay for Indian nationals",
        documentsNeeded: [
          "Valid Indian passport (recommended) OR",
          "Government-issued photo ID (Voter ID, Aadhaar card)",
          "Passport-size photographs (may be required at some border crossings)",
        ],
        applicationSteps: [
          "Carry a valid Indian passport or government photo ID",
          "Arrive at Tribhuvan International Airport (Kathmandu) or any land border crossing",
          "Present your passport/ID at immigration",
          "Receive entry stamp (no visa fee, no form filling required)",
        ],
        notes:
          "India and Nepal share an open border. Indian nationals can enter Nepal freely without a visa. However, carrying a valid passport is strongly recommended for air travel and hotel check-ins. For land borders, government photo ID is sufficient.",
      },
      {
        type: "Business/Work Permit",
        requirements: [
          "Valid Indian passport",
          "Invitation or employment letter from Nepali organization",
          "Company registration documents",
          "Passport photographs",
          "Nepal Department of Labour approval (for work permits)",
        ],
        fee: { embassyFee: 0, serviceFee: 500, currency: "INR" },
        processingTime: "On arrival for entry; work permit takes 2-4 weeks",
        validity: "As per employment contract",
        documentsNeeded: [
          "Valid passport",
          "Employment or invitation letter",
          "Company documents (Nepali employer)",
          "Photographs",
          "Educational certificates (if applicable)",
        ],
        applicationSteps: [
          "Enter Nepal on Indian passport (no entry visa needed)",
          "Employer applies for work permit at Department of Labour",
          "Submit required documents to Department of Immigration",
          "Receive work permit approval",
          "Register with local authorities if stay exceeds 30 days",
        ],
        notes:
          "While Indians do not need a visa to enter Nepal, a formal work permit is required for employment. The employer typically handles the work permit process.",
      },
    ],
    embassyInfo: {
      name: "Embassy of Nepal",
      locationInIndia: "New Delhi, Kolkata, Chennai, Mumbai, Patna, Biratnagar (border)",
      appointmentRequired: false,
      processingCentres: ["New Delhi", "Kolkata"],
      website: "https://in.nepalembassy.gov.np",
    },
    faqs: [
      {
        question: "Do Indians need visa for Nepal?",
        answer:
          "No. Indian nationals enjoy visa-free entry to Nepal. You can stay for an unlimited period. Carry a valid Indian passport for air travel or a government photo ID for land border crossings.",
      },
      {
        question: "Can I enter Nepal with Aadhaar card?",
        answer:
          "Yes, for land border crossings, Indian nationals can enter Nepal with any government-issued photo ID including Aadhaar card, Voter ID, or driving license. However, a passport is required for air travel.",
      },
      {
        question: "Is there any registration requirement for long stays in Nepal?",
        answer:
          "Indian nationals staying in Nepal for extended periods should register with the local ward office. While there is no formal visa requirement, registration helps with local documentation and services.",
      },
      {
        question: "Can I work in Nepal as an Indian citizen?",
        answer:
          "While entry is visa-free, you need a work permit issued by Nepal's Department of Labour to work formally. Your Nepali employer must sponsor and apply for the work permit.",
      },
      {
        question: "What currency should I carry to Nepal?",
        answer:
          "Indian Rupees (INR) are widely accepted in Nepal, especially notes of INR 100 and lower denominations. Notes of INR 200, 500, and 2000 are officially not accepted in Nepal. Nepali Rupees (NPR) can be exchanged easily at the border or in Kathmandu.",
      },
    ],
  },
  {
    name: "Bangladesh",
    slug: "bangladesh",
    code: "BD",
    flag: "\u{1F1E7}\u{1F1E9}",
    region: "asia",
    travelAdvisory: "yellow",
    visaTypes: [
      {
        type: "Tourist Visa",
        requirements: [
          "Valid passport with at least 6 months validity",
          "Completed visa application form",
          "Recent passport-size photographs (2 nos)",
          "Confirmed return flight ticket",
          "Hotel booking or invitation letter from host in Bangladesh",
          "Bank statements (3 months)",
          "Employment proof",
        ],
        fee: { embassyFee: 1500, serviceFee: 1000, currency: "INR" },
        processingTime: "5-7 working days",
        validity: "30-90 days (single/multiple entry)",
        documentsNeeded: [
          "Original passport",
          "Visa application form",
          "Photographs (2 nos, passport size)",
          "Return flight ticket",
          "Hotel booking or invitation letter",
          "Bank statements (3 months)",
          "Employment letter",
          "Cover letter stating purpose of visit",
        ],
        applicationSteps: [
          "Complete the visa application form (available at Embassy or online)",
          "Submit application at Bangladesh High Commission or Consulate",
          "Pay visa fee",
          "Wait for processing (5-7 working days)",
          "Collect passport with visa sticker",
        ],
        notes:
          "Indian nationals can also apply for a visa on arrival at Hazrat Shahjalal International Airport (Dhaka), Shah Amanat International Airport (Chittagong), and Osmani International Airport (Sylhet). Pre-approved visa is recommended for hassle-free entry.",
      },
      {
        type: "Business Visa",
        requirements: [
          "Valid passport with at least 6 months validity",
          "Completed visa application form",
          "Invitation letter from Bangladeshi company",
          "Indian company cover letter and registration",
          "Passport photographs",
          "Previous travel history to Bangladesh (if any)",
        ],
        fee: { embassyFee: 2500, serviceFee: 1000, currency: "INR" },
        processingTime: "5-7 working days",
        validity: "Up to 1 year (multiple entry)",
        documentsNeeded: [
          "Original passport",
          "Application form",
          "Photographs",
          "Business invitation letter",
          "Indian company documents",
          "Bank statements",
          "Cover letter",
        ],
        applicationSteps: [
          "Obtain invitation letter from Bangladeshi company",
          "Complete visa application form",
          "Submit at Bangladesh High Commission or Consulate",
          "Pay visa fee",
          "Wait for processing",
          "Collect passport with visa",
        ],
      },
    ],
    embassyInfo: {
      name: "Bangladesh High Commission",
      locationInIndia: "New Delhi, Kolkata, Mumbai, Agartala, Guwahati",
      appointmentRequired: false,
      processingCentres: ["New Delhi", "Kolkata", "Mumbai", "Agartala"],
      website: "https://bdhcdelhi.org",
    },
    faqs: [
      {
        question: "Do Indians need visa for Bangladesh?",
        answer:
          "Yes, Indian nationals need a visa. You can apply in advance at the Bangladesh High Commission or get a visa on arrival at major airports in Bangladesh (Dhaka, Chittagong, Sylhet).",
      },
      {
        question: "Can Indians get Bangladesh visa on arrival?",
        answer:
          "Yes, visa on arrival is available for Indian nationals at Dhaka (Shahjalal), Chittagong (Shah Amanat), and Sylhet (Osmani) airports for a fee of approximately USD 51. Carry supporting documents and sufficient funds.",
      },
      {
        question: "How long can Indians stay in Bangladesh?",
        answer:
          "Tourist visas are usually granted for 30-90 days depending on the type. Business visas may be valid for up to 1 year with multiple entries. Extensions can be applied for at the Department of Immigration in Dhaka.",
      },
      {
        question: "What is the best way to travel from India to Bangladesh?",
        answer:
          "You can fly directly from several Indian cities (Delhi, Kolkata, Mumbai) to Dhaka. Land border crossings at Petrapole-Benapole (West Bengal) and Agartala-Akhaura are also popular. A valid visa/visa on arrival is needed for all entry points.",
      },
    ],
  },
  {
    name: "Indonesia",
    slug: "indonesia",
    code: "ID",
    flag: "\u{1F1EE}\u{1F1E9}",
    region: "asia",
    travelAdvisory: "green",
    visaTypes: [
      {
        type: "Visa on Arrival (VOA)",
        requirements: [
          "Valid passport with at least 6 months validity and 2 blank pages",
          "Return or onward flight ticket",
          "Proof of sufficient funds (USD 500 equivalent)",
          "Passport-size photograph",
        ],
        fee: { embassyFee: 4200, serviceFee: 0, currency: "INR" },
        processingTime: "On arrival (15-30 minutes at airport)",
        validity: "30 days (single entry, extendable once for 30 more days)",
        documentsNeeded: [
          "Valid passport",
          "Return/onward flight ticket",
          "Cash or card for VOA fee (IDR 500,000 or USD 35)",
          "Passport-size photograph",
        ],
        applicationSteps: [
          "Arrive at a designated Indonesian airport or seaport",
          "Proceed to the Visa on Arrival counter before immigration",
          "Pay VOA fee of IDR 500,000 (approximately USD 35)",
          "Receive VOA sticker in passport",
          "Proceed through immigration",
        ],
        notes:
          "VOA is available at major airports including Bali (Ngurah Rai), Jakarta (Soekarno-Hatta), Surabaya, Yogyakarta, and Medan. VOA is extendable once for 30 additional days at a local immigration office in Indonesia.",
      },
      {
        type: "e-Visa (B211A - Tourist/Business Visit)",
        requirements: [
          "Valid passport with at least 6 months validity",
          "Passport-size photograph (4x6 cm, white background)",
          "Return flight booking",
          "Hotel booking or sponsor letter in Indonesia",
          "Bank statement showing sufficient funds",
          "Sponsor in Indonesia (for B211A, a local sponsor or agent is required)",
        ],
        fee: { embassyFee: 8400, serviceFee: 2000, currency: "INR" },
        processingTime: "3-5 working days",
        validity: "60 days (single entry, extendable up to 180 days)",
        documentsNeeded: [
          "Passport scan (bio-data page)",
          "Passport photograph (digital, white background)",
          "Return flight booking",
          "Hotel booking or sponsor letter",
          "Bank statement (3 months)",
          "Sponsor's KTP (Indonesian ID) or company letter",
        ],
        applicationSteps: [
          "Register on the Indonesian immigration e-visa portal (molina.imigrasi.go.id)",
          "Complete the online application",
          "Upload all required documents",
          "Pay the e-visa fee online",
          "Receive e-visa approval via email (3-5 working days)",
          "Print e-visa and carry while traveling",
        ],
        notes:
          "The B211A e-Visa allows a longer stay than VOA. It requires a local sponsor (individual or company) in Indonesia. Many travel agents and visa agencies can arrange sponsorship for a fee.",
      },
      {
        type: "Business Visa (B211A - Business)",
        requirements: [
          "Valid passport with at least 6 months validity",
          "Invitation letter from Indonesian company (as sponsor)",
          "Indian company cover letter",
          "Company registration documents",
          "Passport photograph",
          "Flight itinerary",
        ],
        fee: { embassyFee: 8400, serviceFee: 2000, currency: "INR" },
        processingTime: "3-5 working days",
        validity: "60 days (single entry, extendable)",
        documentsNeeded: [
          "Passport scan",
          "Sponsor company letter (Indonesian)",
          "Indian company letter",
          "Company registration documents",
          "Photograph",
          "Flight booking",
          "Bank statement",
        ],
        applicationSteps: [
          "Indonesian sponsor company applies on molina.imigrasi.go.id",
          "Complete application and upload documents",
          "Pay e-visa fee online",
          "Receive e-visa approval",
          "Print and carry e-visa",
        ],
      },
    ],
    embassyInfo: {
      name: "Embassy of Indonesia / Indonesian Visa Application Centre",
      locationInIndia: "New Delhi, Mumbai, Chennai",
      appointmentRequired: false,
      processingCentres: ["New Delhi", "Mumbai", "Chennai"],
      website: "https://molina.imigrasi.go.id",
    },
    faqs: [
      {
        question: "Do Indians need visa for Indonesia/Bali?",
        answer:
          "Yes, but Indians can get a Visa on Arrival (VOA) at major Indonesian airports including Bali. The VOA costs IDR 500,000 (approximately USD 35) and is valid for 30 days.",
      },
      {
        question: "Can I extend my Indonesia visa on arrival?",
        answer:
          "Yes, the VOA can be extended once for an additional 30 days (total 60 days) at a local immigration office in Indonesia. The extension costs approximately IDR 500,000 and takes 5-7 working days.",
      },
      {
        question: "What is the difference between VOA and e-Visa for Indonesia?",
        answer:
          "VOA is obtained at the airport on arrival (30 days, extendable to 60). The B211A e-Visa is obtained before travel (60 days, extendable up to 180 days) and requires a local Indonesian sponsor. Choose e-Visa for longer planned stays.",
      },
      {
        question: "Is Bali safe for Indian tourists?",
        answer:
          "Bali and most of Indonesia are safe for Indian tourists. Bali is one of the most popular destinations for Indian travelers. Exercise standard precautions, be aware of ocean currents at beaches, and respect local customs at temples.",
      },
      {
        question: "What currency should I carry to Indonesia?",
        answer:
          "Indonesian Rupiah (IDR) is the local currency. Carry US Dollars to exchange on arrival. ATMs are widely available in tourist areas. 1 INR is approximately 190 IDR. Credit cards are accepted at most hotels and restaurants in Bali.",
      },
    ],
  },
  {
    name: "South Africa",
    slug: "south-africa",
    code: "ZA",
    flag: "\u{1F1FF}\u{1F1E6}",
    region: "africa",
    travelAdvisory: "yellow",
    visaTypes: [
      {
        type: "Tourist Visa",
        requirements: [
          "Valid passport with at least 30 days validity beyond intended stay and 2 blank pages",
          "Completed visa application form (DHA-84)",
          "Two recent passport-size photographs (35x45 mm)",
          "Proof of sufficient financial means (bank statements for 3 months)",
          "Return or onward flight ticket",
          "Proof of accommodation in South Africa",
          "Yellow fever vaccination certificate (if traveling from endemic area)",
          "Cover letter stating purpose of visit",
        ],
        fee: { embassyFee: 3500, serviceFee: 2000, currency: "INR" },
        processingTime: "5-10 working days",
        validity: "Up to 90 days (single/multiple entry)",
        documentsNeeded: [
          "Original passport + copy of bio-data page",
          "Application form DHA-84",
          "Photographs (2, 35x45 mm)",
          "Bank statements (3 months)",
          "Employment letter with salary details",
          "ITR (2-3 years)",
          "Return flight booking",
          "Hotel booking or invitation letter",
          "Travel insurance",
          "Cover letter with itinerary",
        ],
        applicationSteps: [
          "Complete visa application form DHA-84",
          "Book appointment at VFS Global for South Africa",
          "Attend appointment with all documents and biometrics",
          "Pay visa fee at VFS centre",
          "Wait for processing (5-10 working days)",
          "Collect passport with visa from VFS or via courier",
        ],
        notes:
          "South Africa requires biometric data capture at VFS Global. Processing times may vary depending on the season. Apply well in advance, especially for peak travel periods (December-January).",
      },
      {
        type: "Business Visa",
        requirements: [
          "Valid passport with at least 30 days validity beyond intended stay",
          "Completed visa application form (DHA-84)",
          "Passport photographs",
          "Invitation letter from South African company",
          "Indian company registration and cover letter",
          "Proof of business purpose and financial means",
          "Previous travel history (if any)",
        ],
        fee: { embassyFee: 3500, serviceFee: 2000, currency: "INR" },
        processingTime: "5-10 working days",
        validity: "Up to 90 days (single/multiple entry)",
        documentsNeeded: [
          "Original passport",
          "Application form DHA-84",
          "Photographs",
          "Business invitation letter from South African company",
          "Indian company cover letter on letterhead",
          "Company registration documents",
          "Bank statements (3 months)",
          "ITR (2-3 years)",
          "Previous travel history proof",
        ],
        applicationSteps: [
          "Obtain invitation letter from South African business partner",
          "Complete visa application form DHA-84",
          "Book appointment at VFS Global",
          "Submit all documents and provide biometrics",
          "Pay visa fee",
          "Wait for processing and collect passport",
        ],
      },
    ],
    embassyInfo: {
      name: "South African High Commission / VFS Global",
      locationInIndia: "New Delhi, Mumbai, Bangalore, Kolkata, Chennai",
      appointmentRequired: true,
      processingCentres: ["New Delhi", "Mumbai", "Bangalore", "Kolkata", "Chennai"],
      website: "https://www.vfsglobal.com/southafrica/india",
    },
    faqs: [
      {
        question: "How long does a South Africa visa take from India?",
        answer:
          "Processing typically takes 5-10 working days from the date of submission at VFS Global. During peak season (November-January), it may take longer. Apply at least 3-4 weeks before your travel date.",
      },
      {
        question: "Is South Africa safe for Indian tourists?",
        answer:
          "South Africa is generally safe for tourists in popular areas like Cape Town, Johannesburg, and Kruger National Park. Exercise caution in urban areas, avoid walking alone at night, and keep valuables secure. Guided tours are recommended for safaris.",
      },
      {
        question: "Do I need yellow fever vaccination for South Africa?",
        answer:
          "A yellow fever vaccination certificate is required only if you are traveling from or transiting through a yellow fever endemic country. If traveling directly from India, it is not mandatory but recommended.",
      },
      {
        question: "What is the best time to visit South Africa?",
        answer:
          "The best time for safari is June-September (dry winter season). For Cape Town and the Garden Route, October-March (summer) is ideal. South Africa can be visited year-round depending on your interests.",
      },
    ],
  },
  {
    name: "Vietnam",
    slug: "vietnam",
    code: "VN",
    flag: "\u{1F1FB}\u{1F1F3}",
    region: "asia",
    travelAdvisory: "green",
    visaTypes: [
      {
        type: "e-Visa",
        requirements: [
          "Valid passport with at least 6 months validity",
          "Passport-size digital photograph (4x6 cm, white background)",
          "Scanned copy of passport bio-data page",
          "Return or onward flight booking",
          "Proof of accommodation",
        ],
        fee: { embassyFee: 2100, serviceFee: 1000, currency: "INR" },
        processingTime: "3-5 working days (online)",
        validity: "Up to 90 days (single/multiple entry)",
        documentsNeeded: [
          "Passport scan (bio-data page)",
          "Digital photograph (4x6 cm, white background)",
          "Return flight booking",
          "Hotel booking",
          "Travel itinerary",
        ],
        applicationSteps: [
          "Visit the official Vietnam e-Visa portal (evisa.xuatnhapcanh.gov.vn)",
          "Complete the online application form",
          "Upload passport scan and photograph",
          "Pay the e-visa fee online (USD 25)",
          "Receive e-visa approval via email (3-5 working days)",
          "Print the e-visa and carry while traveling",
        ],
        notes:
          "Vietnam e-Visa is valid for entry at all international airports, land borders, and seaports. Indians are eligible for the 90-day e-visa since August 2023. The process is fully online.",
      },
      {
        type: "Tourist Visa (Sticker Visa)",
        requirements: [
          "Valid passport with at least 6 months validity and 2 blank pages",
          "Completed visa application form",
          "Two passport-size photographs (4x6 cm)",
          "Bank statements (3 months)",
          "Flight itinerary",
          "Hotel booking",
        ],
        fee: { embassyFee: 3400, serviceFee: 1500, currency: "INR" },
        processingTime: "5-7 working days",
        validity: "30-90 days (single/multiple entry)",
        documentsNeeded: [
          "Original passport",
          "Application form",
          "Photographs (2 nos, 4x6 cm)",
          "Bank statements (3 months)",
          "Flight booking",
          "Hotel booking",
          "Cover letter",
        ],
        applicationSteps: [
          "Complete visa application form (available at Embassy website)",
          "Submit application at Vietnam Embassy or authorized agent",
          "Pay visa fee",
          "Wait for processing (5-7 working days)",
          "Collect passport with visa sticker",
        ],
      },
      {
        type: "Business Visa",
        requirements: [
          "Valid passport with at least 6 months validity",
          "Invitation letter from Vietnamese company or sponsor",
          "Indian company cover letter and registration",
          "Passport photographs",
          "Visa application form",
          "Business purpose documentation",
        ],
        fee: { embassyFee: 4200, serviceFee: 1500, currency: "INR" },
        processingTime: "5-7 working days",
        validity: "Up to 90 days (single/multiple entry)",
        documentsNeeded: [
          "Original passport",
          "Application form",
          "Photographs",
          "Invitation letter from Vietnamese company",
          "Indian company cover letter",
          "Company registration documents",
          "Bank statements",
        ],
        applicationSteps: [
          "Obtain invitation/sponsorship from Vietnamese business partner",
          "Complete visa application form",
          "Submit at Vietnam Embassy or apply for e-visa online",
          "Pay visa fee",
          "Wait for processing and collect passport",
        ],
      },
    ],
    embassyInfo: {
      name: "Embassy of Vietnam",
      locationInIndia: "New Delhi, Mumbai",
      appointmentRequired: false,
      processingCentres: ["New Delhi", "Mumbai"],
      website: "https://evisa.xuatnhapcanh.gov.vn",
    },
    faqs: [
      {
        question: "Do Indians need visa for Vietnam?",
        answer:
          "Yes, Indian nationals need a visa. The easiest option is the e-Visa, which can be obtained online within 3-5 working days for stays up to 90 days. Alternatively, you can apply at the Vietnam Embassy for a sticker visa.",
      },
      {
        question: "Can Indians get Vietnam visa on arrival?",
        answer:
          "Visa on Arrival (VOA) is available but requires a pre-approved invitation letter. The e-Visa is simpler and recommended over VOA for most travelers. Apply online at the official Vietnam e-Visa portal.",
      },
      {
        question: "How long can Indians stay in Vietnam?",
        answer:
          "With an e-Visa, Indians can stay up to 90 days (single or multiple entry). Sticker visas from the Embassy can also be issued for 30-90 days depending on the type.",
      },
      {
        question: "Is Vietnam expensive for Indian tourists?",
        answer:
          "Vietnam is one of the most affordable Southeast Asian destinations for Indian tourists. Budget INR 2,000-5,000 per day for accommodation, food, and local transport. The Vietnamese Dong (VND) is the local currency.",
      },
    ],
  },
  {
    name: "Turkey",
    slug: "turkey",
    code: "TR",
    flag: "\u{1F1F9}\u{1F1F7}",
    region: "europe",
    travelAdvisory: "green",
    visaTypes: [
      {
        type: "e-Visa (Tourist)",
        requirements: [
          "Valid passport with at least 6 months validity",
          "Valid email address for e-visa delivery",
          "Debit or credit card for online payment",
          "Return or onward flight ticket",
          "Proof of accommodation",
          "Proof of sufficient funds (USD 50 per day)",
        ],
        fee: { embassyFee: 4200, serviceFee: 500, currency: "INR" },
        processingTime: "Instant to 24 hours (online)",
        validity: "Up to 30 days within 180-day period (single/multiple entry)",
        documentsNeeded: [
          "Valid passport",
          "Return flight booking",
          "Hotel booking",
          "Bank statement showing sufficient funds",
          "Travel insurance (recommended)",
        ],
        applicationSteps: [
          "Visit the official Turkey e-Visa portal (evisa.gov.tr)",
          "Select nationality and travel dates",
          "Fill in passport details and personal information",
          "Pay the e-Visa fee online (USD 50)",
          "Receive e-Visa instantly via email",
          "Print the e-Visa and carry while traveling",
        ],
        notes:
          "Turkey e-Visa is one of the easiest visas for Indians. The process is fully online and approval is almost instant. The e-Visa is valid for tourism, business meetings, and transit purposes.",
      },
      {
        type: "Business Visa (Sticker Visa)",
        requirements: [
          "Valid passport with at least 6 months validity",
          "Completed visa application form",
          "Passport photographs",
          "Invitation letter from Turkish company",
          "Indian company cover letter and registration",
          "Bank statements and financial proof",
          "Travel insurance",
        ],
        fee: { embassyFee: 5000, serviceFee: 1500, currency: "INR" },
        processingTime: "7-10 working days",
        validity: "Up to 90 days (single/multiple entry)",
        documentsNeeded: [
          "Original passport",
          "Application form",
          "Photographs",
          "Business invitation letter",
          "Indian company documents",
          "Bank statements (3 months)",
          "ITR (2-3 years)",
          "Travel insurance",
          "Cover letter",
        ],
        applicationSteps: [
          "Obtain invitation letter from Turkish business partner",
          "Complete visa application form",
          "Submit application at Turkish Embassy or VFS Global",
          "Pay visa fee",
          "Wait for processing (7-10 working days)",
          "Collect passport with visa sticker",
        ],
      },
    ],
    embassyInfo: {
      name: "Embassy of the Republic of Turkey / VFS Global",
      locationInIndia: "New Delhi, Mumbai",
      appointmentRequired: false,
      processingCentres: ["New Delhi", "Mumbai"],
      website: "https://www.evisa.gov.tr",
    },
    faqs: [
      {
        question: "Do Indians need visa for Turkey?",
        answer:
          "Yes, but Indians can get an e-Visa online in minutes through the official portal (evisa.gov.tr). The e-Visa costs approximately USD 50 and allows a stay of up to 30 days.",
      },
      {
        question: "Is Turkey e-Visa instant?",
        answer:
          "Yes, the Turkey e-Visa is usually approved instantly after payment. In rare cases, it may take up to 24 hours. The e-Visa is delivered to your email and should be printed before travel.",
      },
      {
        question: "Can I extend my Turkey e-Visa?",
        answer:
          "The e-Visa cannot be extended within Turkey. If you need to stay longer, you must apply for a residence permit at the local Directorate of Migration Management within 10 days of entry.",
      },
      {
        question: "Is Turkey safe for Indian tourists?",
        answer:
          "Turkey is generally safe and is one of the most popular destinations for Indian tourists. Istanbul, Cappadocia, Pamukkale, and Antalya are well-visited. Exercise normal precautions and be mindful of local customs.",
      },
    ],
  },
  {
    name: "Egypt",
    slug: "egypt",
    code: "EG",
    flag: "\u{1F1EA}\u{1F1EC}",
    region: "africa",
    travelAdvisory: "yellow",
    visaTypes: [
      {
        type: "e-Visa (Tourist)",
        requirements: [
          "Valid passport with at least 6 months validity",
          "Scanned copy of passport bio-data page",
          "Passport-size digital photograph",
          "Return or onward flight ticket",
          "Hotel booking or tour itinerary",
          "Proof of sufficient funds",
        ],
        fee: { embassyFee: 2100, serviceFee: 1000, currency: "INR" },
        processingTime: "3-7 working days (online)",
        validity: "30 days (single entry) or 90 days (multiple entry)",
        documentsNeeded: [
          "Passport scan (bio-data page)",
          "Digital photograph",
          "Return flight booking",
          "Hotel booking",
          "Bank statement",
        ],
        applicationSteps: [
          "Visit the official Egypt e-Visa portal (visa2egypt.gov.eg)",
          "Create an account and complete the online application",
          "Upload passport scan and photograph",
          "Pay the e-visa fee online (USD 25 single entry / USD 60 multiple entry)",
          "Receive e-visa approval via email (3-7 working days)",
          "Print the e-visa and carry while traveling",
        ],
        notes:
          "Egypt e-Visa is available for Indian nationals. Single entry allows 30 days, multiple entry allows 90 days. The e-Visa is valid for entry at all Egyptian airports.",
      },
      {
        type: "Tourist Visa (Embassy)",
        requirements: [
          "Valid passport with at least 6 months validity and 2 blank pages",
          "Completed visa application form",
          "Two passport-size photographs",
          "Bank statements (3 months)",
          "Employment proof",
          "Flight booking (round trip)",
          "Hotel booking for entire stay",
          "Cover letter with travel itinerary",
        ],
        fee: { embassyFee: 2500, serviceFee: 1500, currency: "INR" },
        processingTime: "5-7 working days",
        validity: "30-90 days (single/multiple entry)",
        documentsNeeded: [
          "Original passport",
          "Application form",
          "Photographs (2 nos)",
          "Bank statements (3 months)",
          "Employment letter",
          "Flight booking",
          "Hotel booking",
          "Cover letter",
          "ITR (2 years)",
        ],
        applicationSteps: [
          "Complete visa application form",
          "Submit at Egyptian Embassy or Consulate in India",
          "Pay visa fee",
          "Wait for processing (5-7 working days)",
          "Collect passport with visa sticker",
        ],
      },
      {
        type: "Business Visa",
        requirements: [
          "Valid passport with at least 6 months validity",
          "Invitation letter from Egyptian company",
          "Indian company cover letter and registration documents",
          "Passport photographs",
          "Visa application form",
          "Financial proof",
        ],
        fee: { embassyFee: 3500, serviceFee: 1500, currency: "INR" },
        processingTime: "7-10 working days",
        validity: "Up to 90 days (single/multiple entry)",
        documentsNeeded: [
          "Original passport",
          "Application form",
          "Photographs",
          "Business invitation letter",
          "Indian company documents",
          "Bank statements (3 months)",
          "Cover letter on company letterhead",
        ],
        applicationSteps: [
          "Obtain invitation letter from Egyptian business partner",
          "Complete visa application form",
          "Submit at Egyptian Embassy",
          "Pay visa fee",
          "Wait for processing and collect passport",
        ],
      },
    ],
    embassyInfo: {
      name: "Embassy of the Arab Republic of Egypt",
      locationInIndia: "New Delhi, Mumbai",
      appointmentRequired: false,
      processingCentres: ["New Delhi", "Mumbai"],
      website: "https://visa2egypt.gov.eg",
    },
    faqs: [
      {
        question: "Do Indians need visa for Egypt?",
        answer:
          "Yes, Indian nationals need a visa. The easiest option is the e-Visa, available online through visa2egypt.gov.eg. Single entry costs approximately USD 25 and multiple entry costs USD 60.",
      },
      {
        question: "Can Indians get Egypt visa on arrival?",
        answer:
          "Visa on arrival is available for Indians at Egyptian airports, but it is subject to approval and not guaranteed. Applying for an e-Visa in advance is strongly recommended for hassle-free entry.",
      },
      {
        question: "Is Egypt safe for Indian tourists?",
        answer:
          "Egypt is generally safe for tourists in popular areas like Cairo, Luxor, Aswan, and the Red Sea resorts. Follow government travel advisories and avoid border areas with Libya and Sudan. Guided tours are recommended.",
      },
      {
        question: "What is the best time to visit Egypt?",
        answer:
          "October to April is the best time as temperatures are moderate (20-25 degrees Celsius). Summers (May-September) can be extremely hot, especially in Upper Egypt. Peak tourist season is November-February.",
      },
    ],
  },
  {
    name: "Ireland",
    slug: "ireland",
    code: "IE",
    flag: "\u{1F1EE}\u{1F1EA}",
    region: "europe",
    travelAdvisory: "green",
    visaTypes: [
      {
        type: "Short Stay Tourist Visa (C Visa)",
        requirements: [
          "Valid passport with at least 6 months validity beyond intended stay",
          "Completed online application (AVATS system)",
          "Two recent passport-size photographs",
          "Proof of accommodation in Ireland",
          "Travel insurance covering minimum EUR 25,000",
          "Bank statements (6 months) showing sufficient funds",
          "Employment proof or business registration",
          "Detailed travel itinerary",
          "Cover letter explaining purpose of visit",
        ],
        fee: { embassyFee: 5000, serviceFee: 2000, currency: "INR" },
        processingTime: "10-15 working days",
        validity: "Up to 90 days (single/multiple entry)",
        documentsNeeded: [
          "Original passport + old passports",
          "Online application summary page",
          "Photographs (2 nos, 35x45 mm)",
          "Travel insurance certificate",
          "Flight reservation (round trip)",
          "Hotel booking or sponsor invitation letter",
          "Bank statements (6 months)",
          "Salary slips (3 months)",
          "Employment letter on company letterhead",
          "ITR (3 years)",
          "Cover letter with itinerary",
        ],
        applicationSteps: [
          "Complete online application on AVATS (Irish visa application system)",
          "Print the application summary page",
          "Submit application and documents at VFS Global centre",
          "Pay visa fee",
          "Provide biometrics at VFS Global",
          "Wait for processing (10-15 working days)",
          "Collect passport from VFS or via courier",
        ],
        notes:
          "Ireland is NOT part of the Schengen Area. A separate Irish visa is required even if you hold a valid Schengen visa. The Irish Short Stay Visa Waiver Programme allows holders of certain UK visas to visit Ireland without a separate Irish visa.",
      },
      {
        type: "Business Visa",
        requirements: [
          "Valid passport with at least 6 months validity",
          "Completed online application (AVATS)",
          "Passport photographs",
          "Invitation letter from Irish company",
          "Indian company registration and cover letter",
          "Bank statements and financial proof",
          "Travel insurance",
        ],
        fee: { embassyFee: 5000, serviceFee: 2000, currency: "INR" },
        processingTime: "10-15 working days",
        validity: "Up to 90 days (single/multiple entry)",
        documentsNeeded: [
          "Original passport",
          "Application summary page",
          "Photographs",
          "Business invitation from Irish company",
          "Indian company cover letter",
          "Company registration documents",
          "Bank statements (6 months)",
          "ITR (3 years)",
          "Travel insurance",
        ],
        applicationSteps: [
          "Obtain invitation letter from Irish business partner",
          "Complete AVATS online application",
          "Submit documents at VFS Global",
          "Pay visa fee and provide biometrics",
          "Wait for processing and collect passport",
        ],
      },
    ],
    embassyInfo: {
      name: "Embassy of Ireland / VFS Global",
      locationInIndia: "New Delhi, Mumbai",
      appointmentRequired: true,
      processingCentres: ["New Delhi", "Mumbai"],
      website: "https://www.irishimmigration.ie",
    },
    faqs: [
      {
        question: "Is Ireland part of the Schengen Area?",
        answer:
          "No, Ireland is NOT part of the Schengen Area. You need a separate Irish visa even if you hold a valid Schengen visa. However, the Irish Short Stay Visa Waiver Programme allows some UK visa holders to also visit Ireland.",
      },
      {
        question: "How long does an Ireland visa take from India?",
        answer:
          "Standard processing takes 10-15 working days. During peak travel season (summer months), it may take up to 20 working days. Apply at least 4-6 weeks before your travel date.",
      },
      {
        question: "Can I travel to Northern Ireland with an Irish visa?",
        answer:
          "No. Northern Ireland is part of the United Kingdom, so you need a valid UK visa to visit Northern Ireland. An Irish visa does not cover Northern Ireland.",
      },
      {
        question: "What is the Irish Short Stay Visa Waiver Programme?",
        answer:
          "This programme allows nationals of certain countries (including India) who hold a short-stay UK visa to also travel to Ireland without a separate Irish visa. The UK visa must be used to enter the UK first before traveling to Ireland.",
      },
    ],
  },
  {
    name: "Switzerland",
    slug: "switzerland",
    code: "CH",
    flag: "\u{1F1E8}\u{1F1ED}",
    region: "europe",
    travelAdvisory: "green",
    visaTypes: [
      {
        type: "Schengen Tourist Visa (Type C)",
        requirements: [
          "Valid passport (issued within last 10 years, valid 3+ months after intended departure from Schengen)",
          "Completed Schengen visa application form",
          "Two recent passport photographs (35x45 mm, biometric)",
          "Travel medical insurance (EUR 30,000 minimum coverage)",
          "Proof of accommodation in Switzerland",
          "Round-trip flight reservation",
          "Bank statements (3 months) showing sufficient funds",
          "Employment proof with salary details",
          "Cover letter with detailed travel itinerary",
        ],
        fee: { embassyFee: 7000, serviceFee: 2500, currency: "INR" },
        processingTime: "15 calendar days (standard)",
        validity: "Up to 90 days within 180-day period",
        documentsNeeded: [
          "Passport (original + copies of all stamped pages)",
          "Application form (signed and dated)",
          "Photographs (2, biometric, 35x45 mm)",
          "Travel insurance certificate (EUR 30,000 coverage)",
          "Flight reservation (round trip)",
          "Hotel bookings or invitation letter from Swiss resident",
          "Bank statements (3 months)",
          "Salary slips (3 months)",
          "Employment letter on company letterhead",
          "ITR (2-3 years)",
          "Cover letter with day-wise itinerary",
          "Proof of previous travel (if any)",
        ],
        applicationSteps: [
          "Book appointment at VFS Global for Switzerland",
          "Complete the Schengen visa application form",
          "Prepare all supporting documents",
          "Attend VFS appointment with documents and biometrics",
          "Pay visa fee (EUR 80) + VFS service charge",
          "Wait for processing (15 calendar days)",
          "Collect passport with visa from VFS or via courier",
        ],
        notes:
          "Switzerland is part of the Schengen Area but not the EU. A Schengen visa issued by Switzerland allows travel to all 27 Schengen member states. VFS Global appointments fill quickly, especially before summer and ski season.",
      },
      {
        type: "Business Visa",
        requirements: [
          "All Schengen tourist visa requirements",
          "Invitation letter from Swiss company with purpose and duration details",
          "Indian company registration and cover letter",
          "Proof of business relationship",
          "Company bank statements",
          "Previous business travel history",
        ],
        fee: { embassyFee: 7000, serviceFee: 2500, currency: "INR" },
        processingTime: "15 calendar days",
        validity: "Up to 90 days within 180-day period",
        documentsNeeded: [
          "All tourist visa documents",
          "Business invitation letter from Swiss company",
          "Company cover letter on Indian company letterhead",
          "Company registration documents (Indian)",
          "Business bank statements (3 months)",
          "Previous Schengen travel history",
        ],
        applicationSteps: [
          "Obtain invitation letter from Swiss business partner",
          "Book VFS Global appointment for Switzerland",
          "Complete Schengen visa application form with business details",
          "Attend appointment with biometrics and all documents",
          "Pay visa fee and await processing",
        ],
      },
    ],
    embassyInfo: {
      name: "Embassy of Switzerland / VFS Global",
      locationInIndia: "New Delhi, Mumbai, Bangalore, Chennai, Kolkata, Hyderabad",
      appointmentRequired: true,
      processingCentres: ["New Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Hyderabad"],
      website: "https://www.eda.admin.ch/newdelhi",
    },
    faqs: [
      {
        question: "Is Switzerland part of the Schengen Area?",
        answer:
          "Yes, Switzerland is a member of the Schengen Area (though not an EU member). A Schengen visa issued by Switzerland allows travel across all 27 Schengen countries for up to 90 days within a 180-day period.",
      },
      {
        question: "How expensive is Switzerland for Indian tourists?",
        answer:
          "Switzerland is one of the most expensive European countries. Budget INR 15,000-25,000 per day for accommodation, food, and transport. Showing a bank balance of INR 5-8 lakhs for a week-long trip is recommended for visa purposes.",
      },
      {
        question: "Do I need a separate visa for Switzerland if I have a Schengen visa?",
        answer:
          "No, if you already hold a valid Schengen visa from any member state, you can enter Switzerland. You only need to apply separately at the Swiss Embassy if Switzerland is your main or only destination.",
      },
      {
        question: "What is the Swiss Travel Pass and does it help with the visa?",
        answer:
          "The Swiss Travel Pass provides unlimited travel on trains, buses, and boats across Switzerland. While it is not required for the visa, showing a purchased Swiss Travel Pass strengthens your visa application by demonstrating a concrete travel plan.",
      },
    ],
  },
  {
    name: "Hong Kong",
    slug: "hong-kong",
    code: "HK",
    flag: "\u{1F1ED}\u{1F1F0}",
    region: "asia",
    travelAdvisory: "green",
    visaTypes: [
      {
        type: "Tourist Visa (Pre-Arrival Registration - PAR)",
        requirements: [
          "Valid passport with at least 6 months validity",
          "Online pre-arrival registration (PAR) or visa application",
          "Return or onward flight ticket",
          "Proof of accommodation",
          "Proof of sufficient funds for the stay",
        ],
        fee: { embassyFee: 1700, serviceFee: 1000, currency: "INR" },
        processingTime: "3-5 working days",
        validity: "14 days per visit (multiple entries within 6 months)",
        documentsNeeded: [
          "Valid passport",
          "PAR notification slip (if eligible) or visa application",
          "Return flight booking",
          "Hotel booking",
          "Bank statement showing sufficient funds",
        ],
        applicationSteps: [
          "Check eligibility for Pre-Arrival Registration (PAR) on Hong Kong Immigration website",
          "If PAR eligible, complete online registration and receive notification slip",
          "If PAR not eligible, apply for visa at Chinese Visa Application Service Centre",
          "Carry PAR notification slip or visa along with passport",
          "Present documents at Hong Kong immigration on arrival",
        ],
        notes:
          "Indian nationals may be eligible for visa-free Pre-Arrival Registration (PAR) which allows 14-day stays. PAR is free and processed online. If not eligible for PAR, a regular visa must be obtained through the Chinese Visa Application Service Centre (CVASC).",
      },
      {
        type: "Business Visa",
        requirements: [
          "Valid passport with at least 6 months validity",
          "Completed visa application form (ID 1003A)",
          "Passport photographs",
          "Invitation letter from Hong Kong company",
          "Indian company registration and cover letter",
          "Proof of business purpose",
          "Bank statements and financial proof",
        ],
        fee: { embassyFee: 2500, serviceFee: 1500, currency: "INR" },
        processingTime: "5-7 working days",
        validity: "Up to 14-90 days depending on purpose",
        documentsNeeded: [
          "Original passport",
          "Application form ID 1003A",
          "Photographs",
          "Business invitation from Hong Kong company",
          "Indian company documents",
          "Bank statements (3 months)",
          "Cover letter",
        ],
        applicationSteps: [
          "Obtain invitation letter from Hong Kong business partner",
          "Complete visa application form ID 1003A",
          "Submit application at CVASC or Hong Kong Immigration",
          "Pay visa fee",
          "Wait for processing (5-7 working days)",
          "Collect passport with visa",
        ],
      },
    ],
    embassyInfo: {
      name: "Chinese Visa Application Service Centre (CVASC) / Hong Kong Immigration",
      locationInIndia: "New Delhi, Mumbai, Kolkata",
      appointmentRequired: true,
      processingCentres: ["New Delhi", "Mumbai", "Kolkata"],
      website: "https://www.immd.gov.hk",
    },
    faqs: [
      {
        question: "Do Indians need a visa for Hong Kong?",
        answer:
          "Indian nationals may be eligible for visa-free Pre-Arrival Registration (PAR) allowing 14-day visits. If not eligible for PAR, a regular visa is required. Check eligibility on the Hong Kong Immigration Department website.",
      },
      {
        question: "What is Pre-Arrival Registration (PAR) for Hong Kong?",
        answer:
          "PAR is an online registration that allows eligible Indian passport holders to visit Hong Kong for up to 14 days without a visa. It is free and can be completed online. The notification slip is valid for 6 months with multiple entries.",
      },
      {
        question: "Can I use a Hong Kong visa to enter mainland China?",
        answer:
          "No. Hong Kong and mainland China have separate immigration systems. You need a separate Chinese visa to enter mainland China even if you have a Hong Kong visa or PAR.",
      },
      {
        question: "Is Hong Kong expensive for Indian tourists?",
        answer:
          "Hong Kong is moderately expensive. Budget INR 8,000-15,000 per day for accommodation, food, and transport. The Hong Kong Dollar (HKD) is the local currency. Public transport (MTR/Octopus card) is efficient and affordable.",
      },
    ],
  },
  {
    name: "Taiwan",
    slug: "taiwan",
    code: "TW",
    flag: "\u{1F1F9}\u{1F1FC}",
    region: "asia",
    travelAdvisory: "green",
    visaTypes: [
      {
        type: "Tourist Visa",
        requirements: [
          "Valid passport with at least 6 months validity",
          "Completed visa application form",
          "Two recent passport-size photographs (2 inches x 2 inches, white background)",
          "Bank statements (3 months) showing sufficient funds",
          "Employment proof or business registration",
          "Round-trip flight reservation",
          "Hotel booking for entire stay",
          "Detailed travel itinerary",
        ],
        fee: { embassyFee: 5500, serviceFee: 1500, currency: "INR" },
        processingTime: "5-7 working days",
        validity: "Up to 90 days (single/multiple entry)",
        documentsNeeded: [
          "Original passport + copy of bio-data page",
          "Application form",
          "Photographs (2, 2x2 inches, white background)",
          "Bank statements (3 months)",
          "Employment letter with salary details",
          "ITR (2-3 years)",
          "Return flight booking",
          "Hotel bookings",
          "Cover letter with itinerary",
        ],
        applicationSteps: [
          "Complete visa application form (download from TECC website)",
          "Submit application at India-Taipei Association (TECC) or authorized agent",
          "Pay visa fee",
          "Wait for processing (5-7 working days)",
          "Collect passport with visa sticker",
        ],
        notes:
          "Taiwan visas are processed through the Taipei Economic and Cultural Centre (TECC) in India, which functions as the de facto embassy. Taiwan is not recognized as a country by India officially, but visa services are available through TECC.",
      },
      {
        type: "Business Visa",
        requirements: [
          "Valid passport with at least 6 months validity",
          "Completed visa application form",
          "Passport photographs",
          "Invitation letter from Taiwanese company",
          "Indian company cover letter and registration",
          "Bank statements and financial proof",
          "Purpose of visit documentation",
        ],
        fee: { embassyFee: 5500, serviceFee: 1500, currency: "INR" },
        processingTime: "5-7 working days",
        validity: "Up to 90 days (single/multiple entry)",
        documentsNeeded: [
          "Original passport",
          "Application form",
          "Photographs",
          "Business invitation from Taiwanese company",
          "Indian company documents",
          "Bank statements (3 months)",
          "Cover letter on company letterhead",
        ],
        applicationSteps: [
          "Obtain invitation letter from Taiwanese business partner",
          "Complete visa application form",
          "Submit at TECC (India-Taipei Association)",
          "Pay visa fee",
          "Wait for processing and collect passport",
        ],
      },
    ],
    embassyInfo: {
      name: "India-Taipei Association (Taipei Economic and Cultural Centre)",
      locationInIndia: "New Delhi, Chennai",
      appointmentRequired: true,
      processingCentres: ["New Delhi", "Chennai"],
      website: "https://www.india.org.tw",
    },
    faqs: [
      {
        question: "How do Indians apply for a Taiwan visa?",
        answer:
          "Indians apply through the India-Taipei Association (Taipei Economic and Cultural Centre - TECC) in New Delhi or Chennai. The process involves submitting an application form with supporting documents. Processing takes 5-7 working days.",
      },
      {
        question: "Is there an e-Visa for Taiwan for Indians?",
        answer:
          "Taiwan has an online travel authorization for certain nationalities, but Indian passport holders are currently not eligible. Indians must apply for a regular visa sticker through TECC in India.",
      },
      {
        question: "Can I use a China visa for Taiwan?",
        answer:
          "No. Taiwan and mainland China have completely separate immigration systems. A Chinese visa is not valid for Taiwan, and a Taiwan visa is not valid for mainland China. Each requires its own visa.",
      },
      {
        question: "Is Taiwan safe for Indian tourists?",
        answer:
          "Taiwan is one of the safest destinations in Asia with very low crime rates. It is known for friendly locals, excellent public transport, and delicious street food. Vegetarian food options are widely available.",
      },
    ],
  },
  {
    name: "Philippines",
    slug: "philippines",
    code: "PH",
    flag: "\u{1F1F5}\u{1F1ED}",
    region: "asia",
    travelAdvisory: "green",
    visaTypes: [
      {
        type: "Tourist Visa (9A)",
        requirements: [
          "Valid passport with at least 6 months validity beyond intended stay",
          "Completed visa application form",
          "Two recent passport-size photographs (2x2 inches, white background)",
          "Confirmed return or onward flight ticket",
          "Hotel booking or letter of invitation from host",
          "Bank statements (3 months) showing sufficient funds",
          "Employment proof or business registration",
          "Personal appearance at Embassy/Consulate",
        ],
        fee: { embassyFee: 3200, serviceFee: 1500, currency: "INR" },
        processingTime: "5-10 working days",
        validity: "Up to 59 days (single/multiple entry)",
        documentsNeeded: [
          "Original passport + copy of bio-data page",
          "Application form",
          "Photographs (2, 2x2 inches, white background)",
          "Return flight booking",
          "Hotel booking or invitation letter",
          "Bank statements (3 months)",
          "Employment letter with salary details",
          "ITR (2 years)",
          "Cover letter stating purpose of visit",
        ],
        applicationSteps: [
          "Complete the visa application form (available at Philippine Embassy website)",
          "Book an appointment at the Philippine Embassy or Consulate",
          "Attend appointment and submit all documents in person",
          "Pay visa fee",
          "Wait for processing (5-10 working days)",
          "Collect passport with visa sticker or receive via courier",
        ],
        notes:
          "Indian nationals require a visa for the Philippines. The 9A visa is the standard tourist visa. Extensions of up to 36 months total stay can be obtained at the Bureau of Immigration in the Philippines.",
      },
      {
        type: "Business Visa (9A - Business)",
        requirements: [
          "Valid passport with at least 6 months validity",
          "Completed visa application form",
          "Passport photographs",
          "Invitation letter from Philippine company with SEC registration",
          "Indian company cover letter and registration documents",
          "Bank statements and financial proof",
          "Proof of business activities",
        ],
        fee: { embassyFee: 3200, serviceFee: 1500, currency: "INR" },
        processingTime: "5-10 working days",
        validity: "Up to 59 days (single/multiple entry)",
        documentsNeeded: [
          "Original passport",
          "Application form",
          "Photographs",
          "Business invitation from Philippine company",
          "SEC registration of Philippine company",
          "Indian company cover letter and registration",
          "Bank statements (3 months)",
          "Cover letter on company letterhead",
        ],
        applicationSteps: [
          "Obtain invitation letter from Philippine business partner",
          "Complete visa application form",
          "Submit at Philippine Embassy or Consulate",
          "Pay visa fee",
          "Wait for processing",
          "Collect passport with visa",
        ],
      },
    ],
    embassyInfo: {
      name: "Embassy of the Philippines",
      locationInIndia: "New Delhi",
      appointmentRequired: true,
      processingCentres: ["New Delhi"],
      website: "https://newdelhipe.dfa.gov.ph",
    },
    faqs: [
      {
        question: "Do Indians need visa for the Philippines?",
        answer:
          "Yes, Indian nationals need a visa to visit the Philippines. There is no visa on arrival or e-visa facility for Indians. Apply at the Philippine Embassy in New Delhi with the required documents.",
      },
      {
        question: "How long can Indians stay in the Philippines?",
        answer:
          "The initial tourist visa (9A) allows a stay of up to 59 days. This can be extended at the Bureau of Immigration in Manila or at regional offices. Extensions of up to 36 months total are possible.",
      },
      {
        question: "Is the Philippines safe for Indian tourists?",
        answer:
          "Popular tourist destinations like Boracay, Palawan, Cebu, and Manila are generally safe. Avoid conflict-affected areas in Mindanao. Exercise standard travel precautions, especially during typhoon season (June-November).",
      },
      {
        question: "What is the best time to visit the Philippines?",
        answer:
          "The best time is November to May (dry season). January to February offers the best weather with less humidity. Avoid June to November if possible due to typhoon season, particularly August-October.",
      },
      {
        question: "Is the Philippines expensive for Indian tourists?",
        answer:
          "The Philippines is very affordable for Indian travelers. Budget INR 2,500-5,000 per day for accommodation, food, and local transport. The Philippine Peso (PHP) is the local currency (1 INR is approximately 0.67 PHP).",
      },
    ],
  },
  {
    name: "Kenya",
    slug: "kenya",
    code: "KE",
    flag: "\u{1F1F0}\u{1F1EA}",
    region: "africa",
    travelAdvisory: "green",
    visaTypes: [
      {
        type: "eTA (Electronic Travel Authorization)",
        requirements: [
          "Valid passport with at least 6 months validity",
          "Passport-size digital photograph",
          "Scanned copy of passport bio-data page",
          "Return or onward flight ticket",
          "Proof of accommodation in Kenya",
          "Yellow fever vaccination certificate",
        ],
        fee: { embassyFee: 2500, serviceFee: 1000, currency: "INR" },
        processingTime: "3-5 working days (online)",
        validity: "Up to 90 days (single entry)",
        documentsNeeded: [
          "Passport scan (bio-data page)",
          "Digital photograph (passport size)",
          "Return flight booking",
          "Hotel booking or safari itinerary",
          "Yellow fever vaccination certificate",
          "Bank statement showing sufficient funds",
        ],
        applicationSteps: [
          "Visit the official Kenya eTA portal (etakenya.go.ke)",
          "Create an account and complete the online application",
          "Upload passport scan, photograph, and supporting documents",
          "Pay the eTA fee online (USD 30)",
          "Receive eTA approval via email (3-5 working days)",
          "Print the eTA and carry while traveling",
        ],
        notes:
          "Kenya replaced its e-Visa system with the Electronic Travel Authorization (eTA) in January 2024. All visitors, including Indians, must obtain an eTA before travel. Yellow fever vaccination is mandatory for entry.",
      },
      {
        type: "Business eTA",
        requirements: [
          "Valid passport with at least 6 months validity",
          "Invitation letter from Kenyan company or organization",
          "Indian company cover letter and registration documents",
          "Passport photographs",
          "Yellow fever vaccination certificate",
          "Proof of business purpose",
        ],
        fee: { embassyFee: 2500, serviceFee: 1000, currency: "INR" },
        processingTime: "3-5 working days (online)",
        validity: "Up to 90 days (single entry)",
        documentsNeeded: [
          "Passport scan",
          "Digital photograph",
          "Business invitation letter",
          "Indian company documents",
          "Return flight booking",
          "Hotel booking",
          "Yellow fever vaccination certificate",
        ],
        applicationSteps: [
          "Obtain invitation letter from Kenyan business partner",
          "Visit the Kenya eTA portal (etakenya.go.ke)",
          "Complete the online application selecting business purpose",
          "Upload all documents",
          "Pay eTA fee online (USD 30)",
          "Receive approval via email",
        ],
      },
      {
        type: "Transit eTA",
        requirements: [
          "Valid passport with at least 6 months validity",
          "Confirmed onward flight ticket from Kenya",
          "Valid visa for final destination (if required)",
          "Yellow fever vaccination certificate",
        ],
        fee: { embassyFee: 2500, serviceFee: 500, currency: "INR" },
        processingTime: "3-5 working days (online)",
        validity: "Up to 72 hours",
        documentsNeeded: [
          "Passport scan",
          "Onward flight ticket",
          "Visa for final destination",
          "Yellow fever certificate",
        ],
        applicationSteps: [
          "Visit Kenya eTA portal",
          "Select transit purpose",
          "Complete application and upload documents",
          "Pay fee and receive approval",
        ],
      },
    ],
    embassyInfo: {
      name: "High Commission of Kenya",
      locationInIndia: "New Delhi, Mumbai",
      appointmentRequired: false,
      processingCentres: ["New Delhi", "Mumbai"],
      website: "https://www.etakenya.go.ke",
    },
    faqs: [
      {
        question: "Do Indians need visa for Kenya?",
        answer:
          "Yes, Indian nationals need an Electronic Travel Authorization (eTA) to visit Kenya. The eTA replaced the previous e-Visa system in January 2024. Apply online at etakenya.go.ke. The fee is USD 30.",
      },
      {
        question: "Is yellow fever vaccination mandatory for Kenya?",
        answer:
          "Yes, a yellow fever vaccination certificate is mandatory for entry into Kenya. Get vaccinated at least 10 days before travel at an authorized yellow fever vaccination centre. The certificate is valid for life.",
      },
      {
        question: "What is the best time for safari in Kenya?",
        answer:
          "The best time for the Great Migration in Masai Mara is July-October. For general wildlife viewing, the dry seasons (January-March and June-October) are ideal. The short rains (November-December) also offer good game viewing with fewer tourists.",
      },
      {
        question: "Is Kenya safe for Indian tourists?",
        answer:
          "Kenya is generally safe for tourists in popular areas like Nairobi, Masai Mara, Amboseli, and coastal resorts in Mombasa/Diani. Avoid border areas with Somalia. Use reputable safari operators and follow local security advice.",
      },
      {
        question: "What currency should I carry to Kenya?",
        answer:
          "The Kenyan Shilling (KES) is the local currency. Carry US Dollars to exchange on arrival. ATMs are widely available in cities. 1 USD is approximately 155 KES. Most hotels and safari lodges accept credit cards.",
      },
    ],
  },
];

export function getCountryBySlug(slug: string): Country | undefined {
  return COUNTRIES_DATA.find((c) => c.slug === slug);
}

export function getAllCountrySlugs(): string[] {
  return COUNTRIES_DATA.map((c) => c.slug);
}

// --- Visa type category helpers ---

export interface VisaTypeCategory {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

const VISA_TYPE_CATEGORIES: VisaTypeCategory[] = [
  {
    slug: "tourist",
    name: "Tourist Visa",
    description:
      "Travel for leisure, sightseeing, and holidays. Ideal for vacations, family visits, and exploring new destinations.",
    icon: "Palmtree",
  },
  {
    slug: "business",
    name: "Business Visa",
    description:
      "Attend meetings, conferences, and business negotiations. Required for professional engagements abroad.",
    icon: "Briefcase",
  },
  {
    slug: "student",
    name: "Student Visa",
    description:
      "Pursue education abroad including undergraduate, postgraduate, and research programs at international universities.",
    icon: "GraduationCap",
  },
  {
    slug: "work",
    name: "Work Visa",
    description:
      "Employment-based visas and work permits for professionals seeking job opportunities in foreign countries.",
    icon: "HardHat",
  },
  {
    slug: "transit",
    name: "Transit Visa",
    description:
      "Short-stay visas for passing through a country en route to your final destination. Usually valid for 24-72 hours.",
    icon: "Plane",
  },
  {
    slug: "medical",
    name: "Medical Visa",
    description:
      "Travel for medical treatment, surgery, or healthcare services abroad. Includes companion visas for attendants.",
    icon: "HeartPulse",
  },
];

/** Keywords used to classify a visa type string into a category slug */
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  tourist: [
    "tourist",
    "visitor",
    "visit",
    "eta",
    "entri",
    "visa on arrival",
    "voa",
    "free entry",
    "e-visa",
    "short-stay",
    "short stay",
    "schengen tourist",
    "travel authorization",
  ],
  business: ["business"],
  student: ["student", "study", "education"],
  work: ["work", "employment"],
  transit: ["transit"],
  medical: ["medical", "health"],
};

/**
 * Classify a visa type string (e.g. "Tourist Visa (B1/B2)") into a category slug.
 * Returns undefined if no category matches.
 */
function classifyVisaType(typeName: string): string | undefined {
  const lower = typeName.toLowerCase();

  // Business/Work Permit is a special combined case -- classify as work
  if (lower.includes("business/work")) return "work";

  // Check each category in priority order (more specific first)
  for (const slug of ["transit", "medical", "student", "work", "business", "tourist"]) {
    const keywords = CATEGORY_KEYWORDS[slug];
    if (keywords.some((kw) => lower.includes(kw))) {
      return slug;
    }
  }
  return undefined;
}

/** Return all 6 visa type categories with the count of countries offering each */
export function getVisaTypeCategories(): (VisaTypeCategory & {
  countryCount: number;
})[] {
  return VISA_TYPE_CATEGORIES.map((cat) => {
    const countryCount = COUNTRIES_DATA.filter((country) =>
      country.visaTypes.some((vt) => classifyVisaType(vt.type) === cat.slug)
    ).length;
    return { ...cat, countryCount };
  });
}

/** Return all countries that offer a given visa type category, with the matching visa detail */
export function getCountriesByVisaType(
  typeSlug: string
): {
  country: Country;
  visaDetail: import("@/types").VisaTypeDetail;
}[] {
  const results: {
    country: Country;
    visaDetail: import("@/types").VisaTypeDetail;
  }[] = [];

  for (const country of COUNTRIES_DATA) {
    for (const vt of country.visaTypes) {
      if (classifyVisaType(vt.type) === typeSlug) {
        results.push({ country, visaDetail: vt });
        break; // one entry per country — use the first matching visa type
      }
    }
  }

  return results.sort((a, b) => a.country.name.localeCompare(b.country.name));
}

/** Get a single visa type category by slug */
export function getVisaTypeCategoryBySlug(
  slug: string
): VisaTypeCategory | undefined {
  return VISA_TYPE_CATEGORIES.find((cat) => cat.slug === slug);
}

/** Return all valid visa type category slugs (for generateStaticParams) */
export function getAllVisaTypeSlugs(): string[] {
  return VISA_TYPE_CATEGORIES.map((cat) => cat.slug);
}
