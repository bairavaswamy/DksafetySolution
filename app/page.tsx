import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, MapPin, Star } from "lucide-react";
import ButtonCards from "./components/ButtonCards";
import HomeStats from "./components/HomeStats";
import { chennaiConfig } from "./config/chennai.config";
import { getServiceDetail } from "./content/serviceDetails";
import {
  getBreadcrumbListSchema,
  getGraphSchema,
  getWebPageSchema,
  stringifySchema,
} from "./config/schema.config";
import { absoluteUrl, siteConfig } from "./config/site.config";
import {
  CarouselSkeleton,
  TestimonialsSkeleton,
  ClientsSkeleton,
} from "./components/LoadingSkeletons";

const Carousel = dynamic(() => import("./components/Carousel"), {
  loading: () => <CarouselSkeleton />,
  ssr: true,
});

const ContactForm = dynamic(() => import("./components/ContactForm"), {
  ssr: true,
  loading: () => null,
});

const Testimonials = dynamic(() => import("./components/Testimonials"), {
  loading: () => <TestimonialsSkeleton />,
  ssr: true,
});

const Clients = dynamic(() => import("./components/Clients"), {
  loading: () => <ClientsSkeleton />,
  ssr: true,
});

const homeTitle = `${siteConfig.name} | Chennai Safety Nets and Invisible Grills`;
const homeDescription = siteConfig.description;

export const metadata: Metadata = {
  title: homeTitle,
  description: homeDescription,
  keywords: [
    "DK Safety Solutions",
    "dksafetysolutions.com",
    "balcony safety",
    "window safety",
    "bird control",
    "home safety solutions",
  ],
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: absoluteUrl("/"),
    siteName: siteConfig.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: siteConfig.defaultImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
    images: [siteConfig.defaultImage],
  },
};

const homeJsonLd = stringifySchema(
  getGraphSchema([
    getWebPageSchema({
      url: absoluteUrl("/"),
      name: homeTitle,
      description: homeDescription,
      image: absoluteUrl(siteConfig.defaultImage),
    }),
    getBreadcrumbListSchema([{ name: "Home", url: absoluteUrl("/") }]),
  ])
);

const serviceCardBadges = [
  "Best Seller",
  "Family Safe",
  "Bird Control",
  "Popular",
  "Premium View",
  "Clean Finish",
  "Window Care",
  "Duct Safe",
  "Large Coverage",
] as const;

export default function Home() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/images/home/invisible-grill-installation-chennai-balcony.png"
        media="(max-width: 767px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href="/images/home/invisible-grill-installation-chennai-balcony.png"
        media="(min-width: 768px)"
        fetchPriority="high"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: homeJsonLd,
        }}
      />
      <main className="w-full max-w-full overflow-x-hidden bg-white px-4 pb-6 pt-[1px] sm:px-6 md:pt-[3px]">
        <h1 className="sr-only">{siteConfig.name}</h1>

        <Carousel />

        <ButtonCards />

        <section className="mt-10 w-full max-w-full overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-white to-white py-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-secondary">
                  Chennai Directory
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                  Our Services
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                  Pick the right safety installation with real service visuals, quick
                  category cues, and direct Chennai service pages.
                </p>
              </div>
              <Link
                href={`/${chennaiConfig.citySlug}`}
                prefetch={false}
                className="inline-flex items-center gap-2 self-start rounded-full bg-primary px-5 py-3 text-sm font-black text-white shadow-[0_10px_24px_rgba(15,76,129,0.2)] transition hover:bg-secondary sm:self-auto"
              >
                View All Services
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {chennaiConfig.services.slice(0, 9).map((service, index) => {
                const detail = getServiceDetail(service.slug);

                return (
                  <Link
                    key={service.slug}
                    href={`/${chennaiConfig.citySlug}/${service.slug}`}
                    prefetch={false}
                    className="group mx-auto w-full max-w-[390px] overflow-hidden rounded-lg border border-primary-100 bg-white shadow-[0_14px_34px_rgba(15,76,129,0.12)] transition duration-300 hover:-translate-y-1 hover:border-secondary-300 hover:shadow-[0_20px_48px_rgba(15,76,129,0.18)] md:max-w-none"
                  >
                    <div className="relative h-[238px] overflow-hidden bg-primary-50 sm:h-[255px]">
                      <Image
                        src={detail.cardImage}
                        alt={`${service.name} service in Chennai`}
                        fill
                        sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-900/35 via-transparent to-white/10" />

                      <div className="absolute left-3 top-3 flex h-[55px] w-[55px] items-center justify-center rounded-full bg-black/75 text-center text-[9px] font-black uppercase leading-tight text-white shadow-lg shadow-primary-900/50 ring-2 ring-secondary-100">
                        Free Visit
                      </div>

                      <div className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-4 py-2 text-sm font-bold text-slate-900 shadow-lg shadow-primary-900/10">
                        <Star className="h-4 w-4 fill-secondary text-secondary" aria-hidden="true" />
                        4.9
                      </div>

                      <div className="absolute bottom-4 right-5 rounded-full bg-secondary px-4 py-2 text-xs font-black text-white shadow-lg shadow-secondary/25">
                        {serviceCardBadges[index] ?? "Popular"}
                      </div>
                    </div>

                    <div className="px-4 pb-7 pt-6 text-center">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-secondary">
                        {detail.category}
                      </p>
                      <h3 className="mt-2 text-2xl font-black leading-tight text-slate-950">
                        {service.name}
                      </h3>
                      <p className="mx-auto mt-3 min-h-[80px] max-w-[290px] text-[15px] leading-7 text-slate-600">
                        {detail.shortBenefit}
                      </p>

                      <div className="mt-2 flex flex-wrap justify-center gap-2">
                        {detail.bestFor.slice(0, 2).map((item) => (
                          <span
                            key={item}
                            className="rounded-full bg-accent-50 px-3 py-1 text-xs font-bold text-accent-700"
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      <span className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-black text-white shadow-[0_10px_24px_rgba(15,76,129,0.22)] transition group-hover:bg-secondary">
                        Explore Service
                        <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="mx-auto mb-4 max-w-7xl text-2xl font-semibold text-green-900">
            Testimonials
          </h2>
          <Testimonials />
        </section>

        <HomeStats />

        <section className="mt-10 w-full max-w-full overflow-hidden bg-[#E5E5E5] px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-secondary">
              Audiences We Are Preparing For
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-green-900">
              Clients &amp; Societies
            </h2>
          </div>
          <Clients />
        </section>

        <section className="mx-auto mt-10 max-w-7xl">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-secondary">
                Service Areas
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-green-900">
                Areas We Serve
              </h2>
            </div>
            <Link
              href={`/${chennaiConfig.citySlug}`}
              prefetch={false}
              className="inline-flex items-center gap-2 self-start rounded-md border border-primary px-3 py-2 text-sm font-semibold text-primary transition hover:border-secondary hover:bg-secondary hover:text-white sm:self-auto"
            >
              Chennai Directory
              <MapPin size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {chennaiConfig.areas.slice(0, 18).map((area) => (
              <Link
                key={area.slug}
                href={`/${chennaiConfig.citySlug}/${area.slug}`}
                prefetch={false}
                className="rounded-lg border border-slate-200 bg-white px-3 py-3 text-center text-sm font-semibold text-slate-700 shadow-soft transition hover:-translate-y-0.5 hover:border-secondary-300 hover:text-secondary"
              >
                {area.name}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <ContactForm />
        </section>
      </main>
    </>
  );
}
