"use client";

import { useState, useRef } from "react";
import { Upload, X, FileText, AlertCircle } from "lucide-react";

interface UploadedFile {
  file: File;
  documentType: string;
  description: string;
}

interface DocumentUploadProps {
  files: UploadedFile[];
  onChange: (files: UploadedFile[]) => void;
}

const DOCUMENT_TYPES = [
  { label: "Passport Copy", value: "passport" },
  { label: "Photo", value: "photo" },
  { label: "Bank Statement", value: "bank-statement" },
  { label: "Employment Letter", value: "employment-letter" },
  { label: "Invitation Letter", value: "invitation-letter" },
  { label: "Travel Itinerary", value: "travel-itinerary" },
  { label: "Hotel Booking", value: "hotel-booking" },
  { label: "Flight Booking", value: "flight-booking" },
  { label: "Insurance", value: "insurance" },
  { label: "Educational Certificate", value: "educational-certificate" },
  { label: "Offer Letter", value: "offer-letter" },
  { label: "NOC", value: "noc" },
  { label: "Other", value: "other" },
];

const ACCEPTED_TYPES = ".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp";
const MAX_SIZE_MB = 10;

export function DocumentUpload({ files, onChange }: DocumentUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");

  function addFiles(fileList: FileList) {
    setError("");
    const newFiles: UploadedFile[] = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];

      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setError(`${file.name} exceeds ${MAX_SIZE_MB}MB limit`);
        continue;
      }

      newFiles.push({
        file,
        documentType: "other",
        description: "",
      });
    }

    onChange([...files, ...newFiles]);
  }

  function removeFile(index: number) {
    onChange(files.filter((_, i) => i !== index));
  }

  function updateFileType(index: number, documentType: string) {
    const updated = [...files];
    updated[index] = { ...updated[index], documentType };
    onChange(updated);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files);
    }
  }

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
          dragActive
            ? "border-[#1B4D7A] bg-blue-50/50"
            : "border-gray-300 hover:border-gray-400"
        }`}
      >
        <Upload className="mx-auto h-8 w-8 text-gray-400" />
        <p className="mt-2 text-sm font-medium text-gray-700">
          Drag & drop files or click to browse
        </p>
        <p className="mt-1 text-xs text-gray-500">
          PDF, DOC, DOCX, PNG, JPEG, WEBP (max {MAX_SIZE_MB}MB each)
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_TYPES}
          multiple
          onChange={(e) => e.target.files && addFiles(e.target.files)}
          className="hidden"
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3"
            >
              <FileText className="h-5 w-5 shrink-0 text-gray-400" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">
                  {item.file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(item.file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
              <select
                value={item.documentType}
                onChange={(e) => updateFileType(index, e.target.value)}
                className="rounded-lg border border-gray-300 px-2 py-1.5 text-xs focus:border-[#1B4D7A] focus:outline-none"
              >
                {DOCUMENT_TYPES.map((dt) => (
                  <option key={dt.value} value={dt.value}>
                    {dt.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
