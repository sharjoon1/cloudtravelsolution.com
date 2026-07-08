"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceRequestSchema, type ServiceRequestFormData } from "@/lib/validations";
import { DocumentUpload } from "./document-upload";
import { ChevronLeft, ChevronRight, Send, CheckCircle2 } from "lucide-react";
import { POPULAR_COUNTRIES } from "@/lib/constants";

interface UploadedFile {
  file: File;
  documentType: string;
  description: string;
}

const SERVICE_TYPES = [
  { label: "Visa Appointment", value: "visa-appointment" },
  { label: "Visa Assistance", value: "visa-assistance" },
  { label: "Document Attestation", value: "document-attestation" },
];

const VISA_TYPES = [
  { label: "Tourist", value: "tourist" },
  { label: "Business", value: "business" },
  { label: "Student", value: "student" },
  { label: "Work Permit", value: "work-permit" },
  { label: "Transit", value: "transit" },
  { label: "Medical", value: "medical" },
  { label: "Conference", value: "conference" },
];

const STEPS = ["Applicant Info", "Service Details", "Documents", "Review"];

export function SubmitForm() {
  const [step, setStep] = useState(0);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ trackingCode: string; uploadWarning?: string } | null>(null);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<ServiceRequestFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(serviceRequestSchema) as any,
    defaultValues: {
      nationality: "Indian",
      numberOfApplicants: 1,
    },
  });

  const formValues = watch();

  async function nextStep() {
    let fieldsToValidate: (keyof ServiceRequestFormData)[] = [];
    if (step === 0) {
      fieldsToValidate = ["applicantName", "passportNumber"];
    } else if (step === 1) {
      fieldsToValidate = ["serviceType", "destinationCountry"];
    }

    const valid = fieldsToValidate.length === 0 || await trigger(fieldsToValidate);
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  async function onSubmit(data: ServiceRequestFormData) {
    setSubmitting(true);
    setError("");

    try {
      // 1. Create the service request
      const res = await fetch("/api/partner/service-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to create request");
      }

      const { doc } = await res.json();

      // 2. Upload documents if any (track failures — the request is already created,
      //    so we still hand over the tracking code, but surface any upload failures.)
      let failedUploads = 0;
      for (const item of files) {
        const formData = new FormData();
        formData.append("file", item.file);
        formData.append("documentType", item.documentType);
        if (item.description) formData.append("description", item.description);
        formData.append("serviceRequestId", doc.id);

        const uploadRes = await fetch("/api/partner/documents", {
          method: "POST",
          body: formData,
        });
        if (!uploadRes.ok) failedUploads++;
      }

      setResult({
        trackingCode: doc.trackingCode,
        uploadWarning:
          failedUploads > 0
            ? `${failedUploads} of ${files.length} document(s) failed to upload. You can re-upload them from the tracking page.`
            : undefined,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  // Success screen
  if (result) {
    return (
      <div className="mx-auto max-w-lg py-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Request Submitted!</h2>
        <p className="mt-2 text-gray-600">Your service request has been created successfully.</p>
        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
          <p className="text-sm text-gray-500">Tracking Code</p>
          <p className="mt-1 font-mono text-3xl font-bold text-[#0c6cbc]">
            {result.trackingCode}
          </p>
          <p className="mt-3 text-xs text-gray-400">
            Save this code. You and your client can use it to track the application status.
          </p>
        </div>
        {result.uploadWarning && (
          <div className="mt-4 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-left text-sm text-amber-800">
            <strong>Heads up:</strong> {result.uploadWarning}
          </div>
        )}
        <div className="mt-6 flex justify-center gap-3">
          <a
            href="/partner/dashboard"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Go to Dashboard
          </a>
          <a
            href="/partner/submit"
            className="rounded-lg bg-[#0cfcbc] px-4 py-2 text-sm font-semibold text-[#0c6cbc] hover:bg-[#0adba5]"
          >
            Submit Another
          </a>
        </div>
      </div>
    );
  }

  const inputClass =
    "block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm shadow-sm transition-colors focus:border-[#0c6cbc] focus:outline-none focus:ring-1 focus:ring-[#0c6cbc]";
  const labelClass = "mb-1 block text-sm font-medium text-gray-700";

  return (
    <div className="mx-auto max-w-2xl">
      {/* Step Indicator */}
      <div className="mb-8 flex items-center justify-between">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                  i <= step
                    ? "bg-[#0c6cbc] text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {i + 1}
              </div>
              <span className="mt-1 hidden text-xs text-gray-500 sm:block">{label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`mx-2 h-0.5 w-8 sm:w-16 ${
                  i < step ? "bg-[#0c6cbc]" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          {/* Step 0: Applicant Info */}
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Applicant Information</h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="applicantName" className={labelClass}>Full Name *</label>
                  <input id="applicantName" {...register("applicantName")} aria-invalid={!!errors.applicantName} aria-describedby={errors.applicantName ? "applicantName-error" : undefined} className={inputClass} placeholder="Full name as per passport" />
                  {errors.applicantName && <p id="applicantName-error" className="mt-1 text-xs text-red-600">{errors.applicantName.message}</p>}
                </div>
                <div>
                  <label htmlFor="passportNumber" className={labelClass}>Passport Number *</label>
                  <input id="passportNumber" {...register("passportNumber")} aria-invalid={!!errors.passportNumber} aria-describedby={errors.passportNumber ? "passportNumber-error" : undefined} className={inputClass} placeholder="e.g. A1234567" />
                  {errors.passportNumber && <p id="passportNumber-error" className="mt-1 text-xs text-red-600">{errors.passportNumber.message}</p>}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="applicantEmail" className={labelClass}>Email</label>
                  <input id="applicantEmail" {...register("applicantEmail")} type="email" aria-invalid={!!errors.applicantEmail} aria-describedby={errors.applicantEmail ? "applicantEmail-error" : undefined} className={inputClass} placeholder="applicant@email.com" />
                  {errors.applicantEmail && <p id="applicantEmail-error" className="mt-1 text-xs text-red-600">{errors.applicantEmail.message}</p>}
                </div>
                <div>
                  <label htmlFor="applicantPhone" className={labelClass}>Phone</label>
                  <input id="applicantPhone" {...register("applicantPhone")} aria-invalid={!!errors.applicantPhone} aria-describedby={errors.applicantPhone ? "applicantPhone-error" : undefined} className={inputClass} placeholder="+91 98765 43210" />
                  {errors.applicantPhone && <p id="applicantPhone-error" className="mt-1 text-xs text-red-600">{errors.applicantPhone.message}</p>}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label htmlFor="passportExpiry" className={labelClass}>Passport Expiry</label>
                  <input id="passportExpiry" {...register("passportExpiry")} type="date" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="dateOfBirth" className={labelClass}>Date of Birth</label>
                  <input id="dateOfBirth" {...register("dateOfBirth")} type="date" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="nationality" className={labelClass}>Nationality</label>
                  <input id="nationality" {...register("nationality")} className={inputClass} />
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Service Details */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Service Details</h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="serviceType" className={labelClass}>Service Type *</label>
                  <select id="serviceType" {...register("serviceType")} aria-invalid={!!errors.serviceType} aria-describedby={errors.serviceType ? "serviceType-error" : undefined} className={inputClass}>
                    <option value="">Select service</option>
                    {SERVICE_TYPES.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                  {errors.serviceType && <p id="serviceType-error" className="mt-1 text-xs text-red-600">{errors.serviceType.message}</p>}
                </div>
                <div>
                  <label htmlFor="destinationCountry" className={labelClass}>Destination Country *</label>
                  <select id="destinationCountry" {...register("destinationCountry")} aria-invalid={!!errors.destinationCountry} aria-describedby={errors.destinationCountry ? "destinationCountry-error" : undefined} className={inputClass}>
                    <option value="">Select country</option>
                    {POPULAR_COUNTRIES.map((c) => (
                      <option key={c.slug} value={c.name}>{c.flag} {c.name}</option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                  {errors.destinationCountry && <p id="destinationCountry-error" className="mt-1 text-xs text-red-600">{errors.destinationCountry.message}</p>}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label htmlFor="visaType" className={labelClass}>Visa Type</label>
                  <select id="visaType" {...register("visaType")} className={inputClass}>
                    <option value="">Select type</option>
                    {VISA_TYPES.map((v) => (
                      <option key={v.value} value={v.value}>{v.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="travelDate" className={labelClass}>Travel Date</label>
                  <input id="travelDate" {...register("travelDate")} type="date" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="numberOfApplicants" className={labelClass}>No. of Applicants</label>
                  <input
                    id="numberOfApplicants"
                    {...register("numberOfApplicants", { valueAsNumber: true })}
                    type="number"
                    min={1}
                    max={50}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="purposeOfVisit" className={labelClass}>Purpose of Visit</label>
                <textarea id="purposeOfVisit" {...register("purposeOfVisit")} rows={2} className={inputClass} placeholder="Brief purpose of travel..." />
              </div>
              <div>
                <label htmlFor="specialInstructions" className={labelClass}>Special Instructions</label>
                <textarea id="specialInstructions" {...register("specialInstructions")} rows={2} className={inputClass} placeholder="Any special requirements..." />
              </div>
            </div>
          )}

          {/* Step 2: Documents */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Upload Documents</h2>
              <p className="text-sm text-gray-500">
                Upload supporting documents for this application. You can also upload documents later.
              </p>
              <DocumentUpload files={files} onChange={setFiles} />
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Review & Submit</h2>

              <div className="space-y-3 rounded-lg bg-gray-50 p-4">
                <h3 className="text-sm font-semibold text-gray-700">Applicant</h3>
                <div className="grid gap-2 text-sm sm:grid-cols-2">
                  <p><span className="text-gray-500">Name:</span> {formValues.applicantName}</p>
                  <p><span className="text-gray-500">Passport:</span> {formValues.passportNumber}</p>
                  {formValues.applicantEmail && <p><span className="text-gray-500">Email:</span> {formValues.applicantEmail}</p>}
                  {formValues.applicantPhone && <p><span className="text-gray-500">Phone:</span> {formValues.applicantPhone}</p>}
                  {formValues.nationality && <p><span className="text-gray-500">Nationality:</span> {formValues.nationality}</p>}
                </div>
              </div>

              <div className="space-y-3 rounded-lg bg-gray-50 p-4">
                <h3 className="text-sm font-semibold text-gray-700">Service</h3>
                <div className="grid gap-2 text-sm sm:grid-cols-2">
                  <p><span className="text-gray-500">Type:</span> {formValues.serviceType?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</p>
                  <p><span className="text-gray-500">Country:</span> {formValues.destinationCountry}</p>
                  {formValues.visaType && <p><span className="text-gray-500">Visa:</span> {formValues.visaType}</p>}
                  {formValues.travelDate && <p><span className="text-gray-500">Travel Date:</span> {formValues.travelDate}</p>}
                  <p><span className="text-gray-500">Applicants:</span> {formValues.numberOfApplicants}</p>
                </div>
              </div>

              {files.length > 0 && (
                <div className="space-y-3 rounded-lg bg-gray-50 p-4">
                  <h3 className="text-sm font-semibold text-gray-700">Documents ({files.length})</h3>
                  <ul className="space-y-1 text-sm">
                    {files.map((f, i) => (
                      <li key={i} className="text-gray-600">
                        {f.file.name} ({f.documentType.replace(/-/g, " ")})
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="space-y-2 rounded-lg border border-gray-200 bg-gray-50 p-4">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("privacyConsent")}
                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#0c6cbc] focus:ring-[#0c6cbc]"
                  />
                  <span className="text-sm text-gray-700">
                    I confirm I have the applicant&apos;s consent to share their passport
                    number, date of birth, and identity documents with Cloud Travel
                    Solutions for visa processing. I have read the{" "}
                    <a
                      href="/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#0c6cbc] underline"
                    >
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>
                {errors.privacyConsent && (
                  <p className="text-xs text-red-600">{errors.privacyConsent.message}</p>
                )}
              </div>

              {error && (
                <div role="alert" className="rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-700">{error}</div>
              )}
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(s - 1, 0))}
            disabled={step === 0}
            className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>

          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center gap-1.5 rounded-lg bg-[#0cfcbc] px-4 py-2 text-sm font-semibold text-[#0c6cbc] transition-colors hover:bg-[#0adba5]"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-1.5 rounded-lg bg-[#0cfcbc] px-6 py-2 text-sm font-semibold text-[#0c6cbc] shadow-sm transition-colors hover:bg-[#0adba5] disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {submitting ? "Submitting..." : "Submit Request"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
