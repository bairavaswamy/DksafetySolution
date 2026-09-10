import type { ReactNode } from "react";
import { socialProfiles } from "./constants/socialProfiles";

type SocialProfileLinksProps = {
  className?: string;
  description?: string;
  heading?: string;
  showLabels?: boolean;
  variant?: "dark" | "light" | "warm";
};

const iconMap: Record<string, ReactNode> = {
  LinkedIn: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M8 10v7M8 7.5v.2M12 17v-7M12 13.2c0-2 1.1-3.2 2.8-3.2 1.6 0 2.7 1.1 2.7 3.2V17" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  ),
  Facebook: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path d="M14 8h2V5h-2.4C10.8 5 10 6.7 10 8.8V11H8v3h2v6h3v-6h2.4l.6-3h-3V9c0-.7.3-1 1-1Z" fill="currentColor" />
    </svg>
  ),
  Pinterest: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M10.4 18.5 12 11.3m0 0c.5-2.1 3.3-1.6 3.3.8 0 2-1.4 3.6-3.4 3.6-2.3 0-3.8-1.7-3.8-4 0-3 2.2-5.1 5.1-5.1 3.1 0 5 2.1 5 4.8 0 2.8-1.7 5.1-4.2 5.1" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  ),
  Tumblr: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path d="M11 4h3v4h3v3h-3v4.5c0 1.1.6 1.7 1.7 1.7.5 0 1-.1 1.5-.3v2.8c-.7.3-1.6.5-2.6.5-2.4 0-3.6-1.4-3.6-4V11H9V8c1.3-.5 1.9-1.6 2-4Z" fill="currentColor" />
    </svg>
  ),
  Medium: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <circle cx="7" cy="12" r="5" fill="currentColor" />
      <ellipse cx="15" cy="12" rx="3" ry="5" fill="currentColor" />
      <ellipse cx="20" cy="12" rx="1.2" ry="4.5" fill="currentColor" />
    </svg>
  ),
  X: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path d="m5 5 14 14M19 5 5 19" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.4" />
    </svg>
  ),
  Instagram: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <rect x="4" y="4" width="16" height="16" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="16.8" cy="7.2" r="1" fill="currentColor" />
    </svg>
  ),
  WhatsApp: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path d="M5.5 19 6.6 15.7A7 7 0 1 1 9 18.1L5.5 19Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
      <path d="M9.4 8.7c.2-.4.4-.4.7-.4h.5c.2 0 .4 0 .5.4l.5 1.2c.1.3.1.5-.1.7l-.4.5c.6 1 1.4 1.8 2.5 2.3l.5-.5c.2-.2.4-.3.7-.2l1.2.5c.4.2.4.4.4.7v.4c0 .5-.4.9-.9 1-3.2.2-6.7-3.2-6.6-6.5 0-.4.4-.8.9-.8Z" fill="currentColor" />
    </svg>
  ),
  Blogspot: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <rect x="4" y="4" width="16" height="16" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M9 8h4.2c1.4 0 2.3.8 2.3 2 0 .9-.4 1.5-1.1 1.8.9.3 1.6 1 1.6 2.2 0 1.4-1.1 2.3-2.7 2.3H9V8Zm3.8 3.2c.7 0 1-.3 1-.8s-.4-.8-1-.8h-2v1.6h2Zm.3 3.4c.8 0 1.2-.3 1.2-.9 0-.6-.4-.9-1.2-.9h-2.3v1.8h2.3Z" fill="currentColor" />
    </svg>
  ),
};

const variantClasses = {
  dark: {
    heading: "text-white",
    text: "text-gray-400",
    link: "border-white/10 bg-white/5 text-gray-200 hover:border-primary-300/50 hover:bg-primary-400/10 hover:text-primary-300",
  },
  light: {
    heading: "text-slate-900",
    text: "text-slate-600",
    link: "border-slate-200 bg-white text-slate-700 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-600",
  },
  warm: {
    heading: "text-slate-900",
    text: "text-slate-600",
    link: "border-primary-200 bg-white/90 text-slate-700 hover:border-primary-400 hover:bg-primary-50 hover:text-primary-600",
  },
};

export default function SocialProfileLinks({
  className = "",
  description,
  heading,
  showLabels = false,
  variant = "light",
}: SocialProfileLinksProps) {
  const styles = variantClasses[variant];

  return (
    <div className={className}>
      {heading ? (
        <h3 className={`text-lg font-semibold ${styles.heading}`}>{heading}</h3>
      ) : null}

      {description ? (
        <p className={`mt-2 text-sm leading-6 ${styles.text}`}>{description}</p>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2">
        {socialProfiles.map((profile) => (
          <a
            key={profile.href}
            href={profile.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={profile.label}
            title={profile.name}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold transition ${styles.link}`}
          >
            {iconMap[profile.name]}
            {showLabels ? <span>{profile.name}</span> : <span className="sr-only">{profile.name}</span>}
          </a>
        ))}
      </div>
    </div>
  );
}
