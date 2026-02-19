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
  { label: "Educational Visa Assistance", value: "educational-visa-assistance" },
  { label: "Manpower Visa Assistance", value: "manpower-visa-assistance" },
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
  const [result, setResult] = useState<{ trackingCode: string } | null>(null);
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

      // 2. Upload documents if any
      for (const item of files) {
        const formData = new FormData();
        formData.append("file", item.file);
        formData.append("documentType", item.documentType);
        if (item.description) formData.append("description", item.description);
        formData.append("serviceRequestId", doc.id);

        await fetch("/api/partner/documents", {
          method: "POST",
          body: formData,
        });
      }

      setResult({ trackingCode: doc.trackingCode });
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
          <p className="mt-1 font-mono text-3xl font-bold text-[#1B4D7A]">
            {result.trackingCode}
          </p>
          <p className="mt-3 text-xs text-gray-400">
            Save this code. You and your client can use it to track the application status.
          </p>
        </div>
        <div className="mt-6 flex justify-center gap-3">
          <a
            href="/partner/dashboard"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Go to Dashboard
          </a>
          <a
            href="/partner/submit"
            className="rounded-lg bg-[#E8963E] px-4 py-2 text-sm font-semibold text-white hover:bg-[#d4852f]"
          >
            Submit Another
          </a>
        </div>
      </div>
    );
  }

  const inputClass =
    "block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm shadow-sm transition-colors focus:border-[#1B4D7A] focus:outline-none focus:ring-1 focus:ring-[#1B4D7A]";
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
                    ? "bg-[#1B4D7A] text-white"
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
                  i < step ? "bg-[#1B4D7A]" : "bg-gray-200"
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
                  <label className={labelClass}>Full Name *</label>
                  <input {...register("applicantName")} className={inputClass} placeholder="Full name as per passport" />
                  {errors.applicantName && <p className="mt-1 text-xs text-red-600">{errors.applicantName.message}</p>}
                </div>
                <div>
                  <label className={labelClass}>Passport Number *</label>
                  <input {...register("passportNumber")} className={inputClass} placeholder="e.g. A1234567" />
                  {errors.passportNumber && <p className="mt-1 text-xs text-red-600">{errors.passportNumber.message}</p>}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Email</label>
                  <input {...register("applicantEmail")} type="email" className={inputClass} placeholder="applicant@email.com" />
                  {errors.applicantEmail && <p className="mt-1 text-xs text-red-600">{errors.applicantEmail.message}</p>}
                </div>
                <div>
                  <label className={labelClass}>Phone</label>
                  <input {...register("applicantPhone")} className={inputClass} placeholder="+91 98765 43210" />
                  {errors.applicantPhone && <p className="mt-1 text-xs text-red-600">{errors.applicantPhone.message}</p>}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className={labelClass}>Passport Expiry</label>
                  <input {...register("passportExpiry")} type="date" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Date of Birth</label>
                  <input {...register("dateOfBirth")} type="date" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Nationality</label>
                  <input {...register("nationality")} className={inputClass} />
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
                  <label className={labelClass}>Service Type *</label>
                  <select {...register("serviceType")} className={inputClass}>
                    <option value="">Select service</option>
                    {SERVICE_TYPES.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                  {errors.serviceType && <p className="mt-1 text-xs text-red-600">{errors.serviceType.message}</p>}
                </div>
                <div>
                  <label className={labelClass}>Destination Country *</label>
                  <select {...register("destinationCountry")} className={inputClass}>
                    <option value="">Select country</option>
                    {POPULAR_COUNTRIES.map((c) => (
                      <option key={c.slug} value={c.name}>{c.flag} {c.name}</option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                  {errors.destinationCountry && <p className="mt-1 text-xs text-red-600">{errors.destinationCountry.message}</p>}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className={labelClass}>Visa Type</label>
                  <select {...register("visaType")} className={inputClass}>
                    <option value="">Select type</option>
                    {VISA_TYPES.map((v) => (
                      <option key={v.value} value={v.value}>{v.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Travel Date</label>
                  <input {...register("travelDate")} type="date" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>No. of Applicants</label>
                  <input
                    {...register("numberOfApplicants", { valueAsNumber: true })}
                    type="number"
                    min={1}
                    max={50}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Purpose of Visit</label>
                <textarea {...register("purposeOfVisit")} rows={2} className={inputClass} placeholder="Brief purpose of travel..." />
              </div>
              <div>
                <label className={labelClass}>Special Instructions</label>
                <textarea {...register("specialInstructions")} rows={2} className={inputClass} placeholder="Any special requirements..." />
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

              {error && (
                <div className="rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-700">{error}</div>
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
              className="flex items-center gap-1.5 rounded-lg bg-[#1B4D7A] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#163f64]"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-1.5 rounded-lg bg-[#E8963E] px-6 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#d4852f] disabled:opacity-60"
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
