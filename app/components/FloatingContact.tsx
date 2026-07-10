"use client";

import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle, Phone } from "lucide-react";
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
    <div className="fixed right-4 top-[75%] z-50 flex -translate-y-1/2 flex-col gap-3 sm:right-5">
      <a
        href={siteConfig.contact.phoneHref}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-lg shadow-red-600/25 ring-1 ring-white/70 transition hover:scale-105 hover:bg-red-700"
        aria-label={`Call ${siteConfig.name}`}
      >
        <Phone size={20} />
      </a>

      <a
        href={siteConfig.contact.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-accent/25 ring-1 ring-white/70 transition hover:scale-105 hover:bg-accent-600"
        aria-label={`Chat with ${siteConfig.name} on WhatsApp`}
      >
        <MessageCircle size={20} />
      </a>

      {showScrollTop ? (
        <button
          type="button"
          onClick={scrollToTop}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary-900/20 ring-1 ring-white/70 transition hover:scale-105 hover:bg-primary-700"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      ) : null}
    </div>
  );
}
