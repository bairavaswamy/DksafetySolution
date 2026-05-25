"use client";

import { MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "../config/site.config";

export default function FloatingContact() {
  return (
    <div className="fixed right-3 top-[70vh] z-50 flex -translate-y-1/2 flex-col gap-3 sm:right-4">
      <a
        href={siteConfig.contact.phoneHref}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-slate-900/20 transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-300 sm:h-14 sm:w-14"
        aria-label={`Call ${siteConfig.name}`}
      >
        <Phone size={20} />
      </a>

      <a
        href={siteConfig.contact.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-600 text-white shadow-lg shadow-slate-900/20 transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-300 sm:h-14 sm:w-14"
        aria-label={`Chat with ${siteConfig.name} on WhatsApp`}
      >
        <MessageCircle size={20} />
      </a>
    </div>
  );
}
