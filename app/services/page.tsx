import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, Phone } from "lucide-react";
import ChennaiServiceFinder from "../components/ChennaiServiceFinder";
import { chennaiConfig } from "../config/chennai.config";
import {
  getBreadcrumbListSchema,
  getGraphSchema,
  getWebPageSchema,
  stringifySchema,
} from "../config/schema.config";
import { absoluteUrl, siteConfig } from "../config/site.config";
import { getServiceDetail } from "../content/serviceDetails";

const servicesPageUrl = absoluteUrl("/services/");
const servicesTitle = `${siteConfig.name} Services | Safety Nets and Invisible Grills`;
const servicesDescription =
  "Browse DK Safety Solutions services for balcony safety nets, pigeon nets, invisible grills, sports nets, cloth hanger installation, and Chennai safety solutions.";

export const metadata: Metadata = {
  title: servicesTitle,
  description: servicesDescription,
  alternates: {
    canonical: servicesPageUrl,
  },
  keywords: [
    "DK Safety Solutions services",
    "balcony safety nets Chennai",
    "pigeon nets Chennai",
    "invisible grills Chennai",
    "sports nets Chennai",
    "cloth hanger installation Chennai",
  ],
  openGraph: {
    title: servicesTitle,
    description: servicesDescription,
    url: servicesPageUrl,
    siteName: siteConfig.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: absoluteUrl(siteConfig.defaultImage),
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} services`,
      },
    ],
  },
};

export default function ServicesPage() {
  const featuredServices = chennaiConfig.services.slice(0, 5);
  const jsonLd = getGraphSchema([
    getWebPageSchema({
      url: servicesPageUrl,
      name: servicesTitle,
      description: servicesDescription,
      image: absoluteUrl(siteConfig.defaultImage),
      type: "CollectionPage",
    }),
    getBreadcrumbListSchema([
      { name: "Home", url: absoluteUrl("/") },
      { name: "Services", url: servicesPageUrl },
    ]),
  ]);

  return (
    <main className="bg-[#F8FAFC] text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: stringifySchema(jsonLd),
        }}
      />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/home/pigeon-safety-net-balcony-chennai.png"
            alt="DK Safety Solutions services in Chennai"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-primary-900/72 to-primary-900/25" />
        </div>

        <div className="relative mx-auto grid min-h-[640px] max-w-7xl items-center gap-8 px-4 pb-14 pt-32 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-secondary-200">
              Services
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              Safety net, invisible grill, and utility services in Chennai
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-100">
              Choose the service you need, select your Chennai area, and contact
              DK Safety Solutions for a site visit, measurement, and quote.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={siteConfig.contact.phoneHref}
                className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-950/20 transition hover:bg-red-700"
              >
                <Phone size={18} />
                Call Now
              </a>
              <Link
                href={`/${chennaiConfig.citySlug}`}
                prefetch={false}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-5 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/25"
              >
                Browse Chennai Areas
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <ChennaiServiceFinder
            citySlug={chennaiConfig.citySlug}
            areas={chennaiConfig.areas}
            services={chennaiConfig.services}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-secondary">
              Popular Services
            </p>
            <h2 className="mt-3 text-3xl font-black text-slate-950">
              Start with the most requested services
            </h2>
          </div>
          <Link
            href="/contact-us"
            prefetch={false}
            className="inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-3 text-sm font-bold text-white transition hover:bg-secondary-600"
          >
            Request Quote
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {featuredServices.map((service) => {
            const detail = getServiceDetail(service.slug);

            return (
              <Link
                key={service.slug}
                href={`/${chennaiConfig.citySlug}/${service.slug}`}
                prefetch={false}
                className="group overflow-hidden rounded-lg border border-primary-100 bg-white shadow-sm transition hover:-translate-y-1 hover:border-secondary-200 hover:shadow-md"
              >
                <div className="relative h-44">
                  <Image
                    src={detail.cardImage}
                    alt={service.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-secondary">
                    {detail.category}
                  </p>
                  <h3 className="mt-2 text-lg font-black leading-snug text-slate-950">
                    {service.name}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{service.angle}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary transition group-hover:text-secondary">
                    Open Service
                    <ArrowRight size={15} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-primary">
                All Services
              </p>
              <h2 className="mt-3 text-3xl font-black text-slate-950">
                Complete Chennai service list
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-600">
              Each service page connects to Chennai area pages, quick contact
              actions, and practical planning information before installation.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {chennaiConfig.services.map((service) => {
              const detail = getServiceDetail(service.slug);

              return (
                <article
                  key={service.slug}
                  className="rounded-lg border border-primary-100 bg-[#F8FAFC] p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-primary">
                        {detail.category}
                      </p>
                      <h3 className="mt-2 text-xl font-black text-slate-950">
                        {service.name}
                      </h3>
                    </div>
                    <CheckCircle2 className="shrink-0 text-accent" size={22} />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {detail.shortBenefit}
                  </p>
                  <Link
                    href={`/${chennaiConfig.citySlug}/${service.slug}`}
                    prefetch={false}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-secondary transition hover:text-secondary-700"
                  >
                    View Chennai Service
                    <ArrowRight size={15} />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="rounded-lg border border-primary-100 bg-primary-50 p-6 shadow-sm md:flex md:items-center md:justify-between md:gap-6">
          <div>
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-primary">
              <MapPin size={18} />
              Service Area
            </div>
            <h2 className="mt-3 text-2xl font-black text-slate-950">
              Serving Chennai from Anna Nagar
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Use the Chennai directory to open area-specific pages for balcony
              nets, pigeon control, invisible grills, sports nets, and more.
            </p>
          </div>
          <Link
            href="/contact-us"
            prefetch={false}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-600 md:mt-0"
          >
            Contact DK Safety
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}
