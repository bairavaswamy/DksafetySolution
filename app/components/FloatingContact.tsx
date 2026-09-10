"use client";

import { useEffect, useState } from "react";
import { ArrowUp, PhoneCall } from "lucide-react";
import { siteConfig } from "../config/site.config";

export default function FloatingContact() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const updateScrollTopVisibility = () => {
      const documentHeight = document.documentElement.scrollHeight;
      const scrollBottom = window.scrollY + window.innerHeight;
      setShowScrollTop(window.scrollY > 600 && scrollBottom >= documentHeight - 420);
    };

    updateScrollTopVisibility();
    window.addEventListener("scroll", updateScrollTopVisibility, { passive: true });
    window.addEventListener("resize", updateScrollTopVisibility);

    return () => {
      window.removeEventListener("scroll", updateScrollTopVisibility);
      window.removeEventListener("resize", updateScrollTopVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed right-1 top-[75%] z-50 flex -translate-y-1/2 flex-col gap-2 sm:right-5 sm:gap-3">
      <a
        href={siteConfig.contact.phoneHref}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-900 text-white shadow-lg shadow-primary-900/25 ring-1 ring-white/70 transition hover:scale-105 hover:bg-primary-950 sm:h-12 sm:w-12"
        aria-label={`Call ${siteConfig.name}`}
      >
        <span className="floating-call-icon inline-flex">
          <PhoneCall size={19} strokeWidth={2.5} />
        </span>
      </a>

      <a
        href={siteConfig.contact.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-accent/25 ring-1 ring-white/70 transition hover:scale-105 hover:bg-accent-600 sm:h-12 sm:w-12"
        aria-label={`Chat with ${siteConfig.name} on WhatsApp`}
      >
        <WhatsAppIcon />
      </a>

      {showScrollTop ? (
        <button
          type="button"
          onClick={scrollToTop}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary-900/20 ring-1 ring-white/70 transition hover:scale-105 hover:bg-primary-700 sm:h-12 sm:w-12"
          aria-label="Scroll to top"
        >
          <ArrowUp size={18} />
        </button>
      ) : null}
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      className="h-5 w-5 sm:h-[22px] sm:w-[22px]"
      fill="currentColor"
    >
      <path d="M16.02 3.2A12.7 12.7 0 0 0 5.3 22.75L3.8 28.8l6.2-1.47A12.68 12.68 0 1 0 16.02 3.2Zm0 22.98a10.2 10.2 0 0 1-5.2-1.43l-.37-.22-3.67.87.9-3.58-.24-.38a10.21 10.21 0 1 1 8.58 4.74Zm5.6-7.64c-.3-.16-1.8-.9-2.08-1-.28-.1-.48-.16-.68.16-.2.3-.78 1-.96 1.2-.18.2-.36.22-.66.08-.3-.16-1.28-.48-2.43-1.52-.9-.8-1.5-1.8-1.68-2.1-.18-.32-.02-.48.14-.64.14-.14.3-.36.46-.54.16-.18.2-.3.3-.5.1-.2.06-.38-.02-.54-.08-.16-.68-1.64-.94-2.24-.25-.6-.5-.5-.68-.52h-.58c-.2 0-.52.08-.8.38-.28.3-1.06 1.04-1.06 2.54s1.1 2.94 1.24 3.14c.16.2 2.16 3.3 5.22 4.62.72.32 1.3.5 1.74.64.74.24 1.4.2 1.92.12.58-.08 1.8-.74 2.06-1.46.26-.72.26-1.34.18-1.46-.08-.14-.28-.22-.6-.38Z" />
    </svg>
  );
}
