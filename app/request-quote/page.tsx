import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, MapPin, Phone } from "lucide-react";
import ContactForm from "../components/ContactForm";
import {
  getBreadcrumbListSchema,
  getGraphSchema,
  getWebPageSchema,
  stringifySchema,
} from "../config/schema.config";
import { absoluteUrl, siteConfig } from "../config/site.config";
import { chennaiConfig } from "../config/chennai.config";

const url = absoluteUrl("/request-quote");
const title = `Request a Quote | ${siteConfig.name}`;
const description =
  "Request a Chennai safety service quote for balcony safety nets, invisible grills, bird control, sports nets, terrace nets, duct nets, and utility installations.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: url,
  },
  keywords: [
    `${siteConfig.name} quote`,
    "Chennai safety net quote",
    "invisible grill quote Chennai",
    "bird control quote Chennai",
  ],
  openGraph: {
    title,
    description,
    url,
    siteName: siteConfig.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: siteConfig.defaultImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} quote request`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [siteConfig.defaultImage],
  },
};

const quoteJsonLd = stringifySchema(
  getGraphSchema([
    getWebPageSchema({
      url,
      name: title,
      description,
      image: absoluteUrl(siteConfig.defaultImage),
    }),
    getBreadcrumbListSchema([
      { name: "Home", url: absoluteUrl("/") },
      { name: "Request Quote", url },
    ]),
  ])
);

const quoteSteps = [
  "Share your Chennai area and service type.",
  "Add opening size, floor level, and access notes.",
  "Mention photos or site timing if available.",
];

export default function RequestQuotePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: quoteJsonLd,
        }}
      />
      <main className="bg-gradient-to-b from-primary-50 via-white to-secondary-50 text-slate-950">
        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[0.82fr_1.18fr] lg:px-6 lg:py-16">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white px-4 py-2 text-sm font-bold text-primary-600 shadow-sm">
              <Clock3 size={16} />
              Quote request
            </div>

            <div>
              <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-slate-950 sm:text-5xl">
                Request a Chennai safety service quote.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                Send the service, area, opening size, and floor access details. The
                same form is used by the contact page, so enquiries stay in one
                place.
              </p>
            </div>

            <div className="grid gap-3">
              {quoteSteps.map((step) => (
                <div
                  key={step}
                  className="flex items-start gap-3 rounded-2xl border border-primary-100 bg-white p-4 text-sm font-semibold leading-6 text-slate-700 shadow-sm"
                >
                  <CheckCircle2 className="mt-0.5 shrink-0 text-primary-500" size={18} />
                  {step}
                </div>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href={siteConfig.contact.phoneHref}
                className="rounded-2xl border border-primary-100 bg-white p-5 shadow-sm transition hover:border-primary-300"
              >
                <Phone className="text-primary-500" size={22} />
                <p className="mt-3 text-sm font-bold uppercase tracking-[0.16em] text-primary-500">
                  Call
                </p>
                <p className="mt-2 text-sm font-black text-slate-950">
                  {siteConfig.contact.phoneLabel}
                </p>
              </a>

              <Link
                href={`/${chennaiConfig.citySlug}`}
                prefetch={false}
                className="rounded-2xl border border-primary-100 bg-white p-5 shadow-sm transition hover:border-primary-300"
              >
                <MapPin className="text-primary-700" size={22} />
                <p className="mt-3 text-sm font-bold uppercase tracking-[0.16em] text-primary-700">
                  Directory
                </p>
                <p className="mt-2 inline-flex items-center gap-2 text-sm font-black text-slate-950">
                  Browse Chennai services
                  <ArrowRight size={15} />
                </p>
              </Link>
            </div>
          </div>

          <ContactForm
            eyebrow="Quote Request"
            heading="Tell us what needs to be measured."
            description="Include the service name, Chennai area, floor level, opening size, and any timing preference. Photos can be shared later on WhatsApp if needed."
            formTitle="Request Quote"
            submitLabel="Submit Quote Request"
            subjectLabel={`${siteConfig.name} - Quote Request`}
          />
        </section>
      </main>
    </>
  );
}
