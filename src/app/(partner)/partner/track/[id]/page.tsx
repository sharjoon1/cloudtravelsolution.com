"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, Plane, FileText, Upload } from "lucide-react";
import { StatusProgress } from "@/components/tracking/status-progress";
import { StatusBadge } from "@/components/partner/service-request-table";
import { DocumentUpload } from "@/components/partner/document-upload";
import type { ServiceRequest } from "@/types";

interface UploadedFile {
  file: File;
  documentType: string;
  description: string;
}

export default function PartnerTrackDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [request, setRequest] = useState<ServiceRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [newFiles, setNewFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function fetchDetail() {
      try {
        const res = await fetch(`/api/partner/service-requests/${id}`);
        if (res.ok) {
          setRequest(await res.json());
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchDetail();
  }, [id]);

  async function handleUpload() {
    if (newFiles.length === 0 || !request) return;
    setUploading(true);

    for (const item of newFiles) {
      const formData = new FormData();
      formData.append("file", item.file);
      formData.append("documentType", item.documentType);
      if (item.description) formData.append("description", item.description);
      formData.append("serviceRequestId", request.id);

      await fetch("/api/partner/documents", { method: "POST", body: formData });
    }

    setNewFiles([]);
    setShowUpload(false);
    setUploading(false);

    // Refresh
    const res = await fetch(`/api/partner/service-requests/${id}`);
    if (res.ok) setRequest(await res.json());
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#1B4D7A] border-t-transparent" />
      </div>
    );
  }

  if (!request) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-500">Service request not found</p>
        <Link href="/partner/dashboard" className="mt-4 inline-block text-sm text-[#1B4D7A] hover:underline">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const docs = Array.isArray(request.uploadedDocuments)
    ? request.uploadedDocuments.filter(
        (d): d is { id: string; filename: string; documentType: string; url?: string } =>
          typeof d === "object"
      )
    : [];

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        href="/partner/dashboard"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-mono text-2xl font-bold text-[#1B4D7A]">
            {request.trackingCode}
          </h1>
          <p className="text-sm text-gray-500">
            Created{" "}
            {new Date(request.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <StatusBadge status={request.status} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: Status Timeline */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-1">
          <h2 className="mb-4 text-sm font-semibold text-gray-700">Status Timeline</h2>
          <StatusProgress
            currentStatus={request.status}
            statusHistory={request.statusHistory || []}
          />
        </div>

        {/* Right: Details */}
        <div className="space-y-6 lg:col-span-2">
          {/* Applicant Card */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-700">
              <User className="h-4 w-4" />
              Applicant Details
            </h2>
            <div className="grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <p className="text-gray-500">Name</p>
                <p className="font-medium text-gray-900">{request.applicantName}</p>
              </div>
              <div>
                <p className="text-gray-500">Passport</p>
                <p className="font-medium text-gray-900">{request.passportNumber || "—"}</p>
              </div>
              {request.applicantEmail && (
                <div>
                  <p className="text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">{request.applicantEmail}</p>
                </div>
              )}
              {request.applicantPhone && (
                <div>
                  <p className="text-gray-500">Phone</p>
                  <p className="font-medium text-gray-900">{request.applicantPhone}</p>
                </div>
              )}
              {request.nationality && (
                <div>
                  <p className="text-gray-500">Nationality</p>
                  <p className="font-medium text-gray-900">{request.nationality}</p>
                </div>
              )}
            </div>
          </div>

          {/* Service Card */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Plane className="h-4 w-4" />
              Service Details
            </h2>
            <div className="grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <p className="text-gray-500">Service Type</p>
                <p className="font-medium text-gray-900">
                  {request.serviceType?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Destination</p>
                <p className="font-medium text-gray-900">{request.destinationCountry}</p>
              </div>
              {request.visaType && (
                <div>
                  <p className="text-gray-500">Visa Type</p>
                  <p className="font-medium text-gray-900 capitalize">{request.visaType}</p>
                </div>
              )}
              {request.travelDate && (
                <div>
                  <p className="text-gray-500">Travel Date</p>
                  <p className="font-medium text-gray-900">
                    {new Date(request.travelDate).toLocaleDateString("en-IN")}
                  </p>
                </div>
              )}
              <div>
                <p className="text-gray-500">Applicants</p>
                <p className="font-medium text-gray-900">{request.numberOfApplicants}</p>
              </div>
              <div>
                <p className="text-gray-500">Priority</p>
                <p className="font-medium capitalize text-gray-900">{request.priority}</p>
              </div>
            </div>
            {request.purposeOfVisit && (
              <div className="mt-3">
                <p className="text-sm text-gray-500">Purpose</p>
                <p className="text-sm text-gray-900">{request.purposeOfVisit}</p>
              </div>
            )}
          </div>

          {/* Documents */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FileText className="h-4 w-4" />
                Documents ({docs.length})
              </h2>
              <button
                onClick={() => setShowUpload(!showUpload)}
                className="flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-200"
              >
                <Upload className="h-3.5 w-3.5" />
                Upload More
              </button>
            </div>

            {docs.length > 0 ? (
              <ul className="space-y-2">
                {docs.map((doc) => (
                  <li
                    key={doc.id}
                    className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 text-sm"
                  >
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-gray-900">{doc.filename}</span>
                    <span className="text-xs text-gray-500">
                      ({doc.documentType?.replace(/-/g, " ")})
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400">No documents uploaded yet</p>
            )}

            {showUpload && (
              <div className="mt-4 space-y-3 border-t border-gray-100 pt-4">
                <DocumentUpload files={newFiles} onChange={setNewFiles} />
                {newFiles.length > 0 && (
                  <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="rounded-lg bg-[#1B4D7A] px-4 py-2 text-sm font-semibold text-white hover:bg-[#163f64] disabled:opacity-60"
                  >
                    {uploading ? "Uploading..." : `Upload ${newFiles.length} file(s)`}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
