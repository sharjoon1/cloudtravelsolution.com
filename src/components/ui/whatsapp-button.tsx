"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

const WHATSAPP_NUMBER = "919999999999"; // Replace with actual WhatsApp Business number
const DEFAULT_MESSAGE =
  "Hi CloudTravelSolution! I need help with visa/travel services.";

export function WhatsAppButton() {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show button after a short delay for better UX
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Tooltip */}
      {isTooltipOpen && (
        <div className="bg-white rounded-xl shadow-lg border border-border p-4 max-w-[260px] animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-foreground">
              Need Help?
            </span>
            <button
              type="button"
              onClick={() => setIsTooltipOpen(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Chat with our visa specialists on WhatsApp for instant support.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center px-4 py-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold rounded-lg transition-colors text-sm"
          >
            Start Chat
          </a>
        </div>
      )}

      {/* FAB Button */}
      <button
        type="button"
        onClick={() => setIsTooltipOpen(!isTooltipOpen)}
        className="h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center hover:scale-105"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  );
}
