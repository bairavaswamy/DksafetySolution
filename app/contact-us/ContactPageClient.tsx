import Link from "next/link";
import {
  Clock3,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  ShieldCheck,
} from "lucide-react";
import ContactForm from "../components/ContactForm";
import SocialProfileLinks from "../components/SocialProfileLinks";
import { siteConfig } from "../config/site.config";

const googleBusiness = siteConfig.contact.googleBusiness;

const contactCards = [
  {
    label: "Call",
    value: siteConfig.contact.phoneLabel,
    description: "Speak directly with the DK Safety Solutions team.",
    href: siteConfig.contact.phoneHref,
    icon: Phone,
    tone: "text-secondary",
    hover: "hover:border-secondary-300",
  },
  {
    label: "WhatsApp",
    value: siteConfig.contact.whatsappLabel,
    description: "Send photos, location, and service requirement.",
    href: siteConfig.contact.whatsappHref,
    icon: MessageCircle,
    external: true,
    tone: "text-accent-700",
    hover: "hover:border-accent-300",
  },
  {
    label: "Email",
    value: siteConfig.contact.email,
    description: "Share project details for a written response.",
    href: siteConfig.contact.emailHref,
    icon: Mail,
    tone: "text-primary",
    hover: "hover:border-primary-300",
  },
  {
    label: "Google Maps",
    value: "Anna Nagar listing",
    description: "Open the live Google Business profile.",
    href: googleBusiness.mapHref,
    icon: Navigation,
    external: true,
    tone: "text-secondary",
    hover: "hover:border-secondary-300",
  },
];

const serviceLinks = [
  { label: "Invisible Grills", href: "/chennai/invisible-grills" },
  { label: "Pigeon Nets", href: "/chennai/pigeon-safety-nets" },
  { label: "Balcony Nets", href: "/chennai/balcony-safety-nets" },
  { label: "Sports Nets", href: "/chennai/football-sports-nets" },
  { label: "Cloth Hangers", href: "/chennai/cloth-hanger-installation" },
];

export default function ContactPageClient() {
  return (
    <div className="bg-neutral-50">
      <section className="mx-auto max-w-7xl px-4 pb-12 pt-28 sm:px-6 lg:pt-32">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-100 bg-white px-4 py-2 text-sm font-bold text-primary shadow-sm">
              <ShieldCheck size={16} />
              Chennai enquiry desk
            </div>

            <div>
              <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-slate-950 sm:text-5xl">
                Contact {siteConfig.name}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                Call or WhatsApp for balcony nets, pigeon nets, invisible grills,
                sports nets, and cloth hanger installation in Chennai. Share your
                area, floor level, photos, and preferred visit time.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {contactCards.map((card) => {
                const Icon = card.icon;

                return (
                  <a
                    key={card.label}
                    href={card.href}
                    target={card.external ? "_blank" : undefined}
                    rel={card.external ? "noopener noreferrer" : undefined}
                    className={`group rounded-lg border border-primary-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 ${card.hover}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <Icon className={card.tone} size={23} />
                      {card.external ? (
                        <ExternalLink
                          className="text-slate-300 transition group-hover:text-secondary"
                          size={17}
                        />
                      ) : null}
                    </div>
                    <p className={`mt-4 text-sm font-black uppercase tracking-[0.16em] ${card.tone}`}>
                      {card.label}
                    </p>
                    <p className="mt-2 break-words text-sm font-bold text-slate-950">
                      {card.value}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{card.description}</p>
                  </a>
                );
              })}
            </div>

            <div className="rounded-lg border border-primary-100 bg-white p-5 shadow-sm">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-secondary">
                Google Business Listing
              </p>
              <h2 className="mt-3 text-xl font-extrabold leading-snug text-slate-950">
                {googleBusiness.name}
              </h2>
              <div className="mt-4 grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 shrink-0 text-primary" size={18} />
                  <span>{siteConfig.contact.addressLines.join(", ")}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock3 className="mt-0.5 shrink-0 text-primary" size={18} />
                  <span>{siteConfig.contact.hours}</span>
                </div>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-lg border border-primary-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-secondary">
              Find Us
            </p>
            <h2 className="mt-3 text-2xl font-extrabold text-slate-950">
              DK Safety Solutions in Anna Nagar
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Use the map to open our Google Business listing, request directions,
              or confirm the business name before calling.
            </p>

            <a
              href={googleBusiness.mapHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-3 text-sm font-bold text-white shadow-sm shadow-secondary/30 transition hover:bg-secondary-600"
            >
              Open Google Maps
              <ExternalLink size={17} />
            </a>

            <div className="mt-7">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-primary">
                Quick Service Links
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {serviceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    prefetch={false}
                    className="rounded-full border border-primary-100 bg-primary-50 px-3 py-2 text-xs font-bold text-primary transition hover:border-secondary-300 hover:bg-secondary-50 hover:text-secondary-700"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <SocialProfileLinks
              className="mt-7 rounded-lg border border-primary-100 bg-primary-50/70 p-4"
              heading="Social Profiles"
              description="Follow DK Safety Solutions for service updates and recent work."
              showLabels
              variant="warm"
            />
          </div>

          <div className="overflow-hidden rounded-lg border border-primary-100 bg-white shadow-sm">
            <iframe
              src={googleBusiness.mapEmbedUrl}
              title={`${googleBusiness.name} map`}
              className="h-[360px] w-full border-0 md:h-[480px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </div>
  );
}
