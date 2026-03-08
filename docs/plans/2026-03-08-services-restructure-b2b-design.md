# Services Restructure + B2B Inquiry Page

**Date:** 2026-03-08
**Status:** Approved

## Summary

Remove "Educational Visa Assistance" and "Manpower Visa Assistance" as standalone services. Restructure them as child pages under "Visa Assistance" targeting Education Consultancies and Manpower Agencies. Add a B2B inquiry page with partner registration form and discount messaging.

## Navigation Changes

Remove from Services dropdown:
- Educational Visa
- Manpower Visa

New structure:
```
Services
  Visa Appointment         -> /services/visa-appointment
  Visa Assistance          -> /services/visa-assistance
    For Education Consultancies -> /services/visa-assistance/education-consultancies
    For Manpower Agencies       -> /services/visa-assistance/manpower-agencies
  Travel Insurance         -> /services/travel-insurance
  Flight & Hotel Booking   -> /services/flight-hotel-booking
  Passport Service         -> /services/passport-services
  Document Attestation     -> /services/document-attestation
```

Add "B2B Partners" button in header (next to "Free Consultation").

## Pages

### Modified
- `/services/visa-assistance` — add links to the two child pages
- Homepage services grid — show 6 services (remove educational/manpower)

### New
- `/services/visa-assistance/education-consultancies` — reuses educational visa content, reframed for consultancies
- `/services/visa-assistance/manpower-agencies` — reuses manpower visa content, reframed for agencies
- `/b2b` — B2B inquiry page with form + static discount text

### Removed
- `/services/educational-visa-assistance` (content moves to education-consultancies)
- `/services/manpower-visa-assistance` (content moves to manpower-agencies)

## B2B Inquiry Page (/b2b)

### Content
- Hero: "Partner with Cloud Travel Solutions"
- Static discount text (e.g., "Up to 20% off for bulk partners")
- Benefits section for partnering

### Form Fields
1. Company Name (required)
2. Contact Person Name (required)
3. Email (required)
4. Phone (required, Indian format)
5. Business Type (required, select: Education Consultancy / Manpower Agency)
6. City (required)
7. Expected Monthly Volume (required, select: 1-10 / 10-50 / 50-100 / 100+)
8. Message (optional, textarea)

### Backend
- POST `/api/b2b-inquiry` — validates, stores in Payload, sends email notification
- New Payload collection: `B2BInquiries` (group: "Lead Management")
- Email via Resend to team

## Admin Panel

### New Collection: B2B Inquiries
- Fields: companyName, contactPerson, email, phone, businessType, city, expectedVolume, message, status (new/contacted/converted/rejected), createdAt
- Group: Lead Management
- Read-only from admin (submissions come from frontend form)

## What Stays the Same
- Partner portal (/partner/*) unchanged
- All other services unchanged
- Service request form service types updated (remove educational/manpower standalone, keep visa-assistance)
