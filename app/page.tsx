import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import ButtonCards from "./components/ButtonCards";
import ContactDetailsBar from "./components/ContactDetailsBar";
import HomeStats from "./components/HomeStats";
import { chennaiConfig } from "./config/chennai.config";
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
      <main className="overflow-hidden bg-white px-4 pb-6 sm:px-6">
        <h1 className="sr-only">{siteConfig.name}</h1>

        <Carousel />
        <div className="-mx-4 sm:-mx-6">
          <ContactDetailsBar />
        </div>

        <ButtonCards />

        <section className="mx-auto mt-10 grid max-w-7xl gap-6 rounded-[34px] border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-lime-50 p-6 shadow-lg shadow-sky-100/50 lg:grid-cols-[0.95fr_1.05fr] lg:p-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-sky-500">
              Chennai Service Network
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
              Chennai service pages are ready for quick enquiry.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              DK Safety Solutions connects Chennai customers to safety net,
              invisible grill, bird control, sports net, and utility installation
              pages with clear service choices before the area-specific visit.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                "Chennai service pages",
                "Area-specific planning",
                "Phone and WhatsApp actions",
                "Clean installation focus",
              ].map((point) => (
                <span
                  key={point}
                  className="rounded-full border border-sky-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700"
                >
                  {point}
                </span>
              ))}
            </div>
            <Link
              href={`/${chennaiConfig.citySlug}`}
              prefetch={false}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
            >
              Open Chennai Directory
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {siteConfig.galleryImages.slice(0, 3).map((image) => (
              <Link
                href="/gallery"
                prefetch={false}
                key={image.src}
                className="group overflow-hidden rounded-[24px] border border-white bg-white shadow-sm"
              >
                <div className="relative h-52">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-500">
                    {image.category}
                  </p>
                  <h3 className="mt-1 text-sm font-bold text-slate-950">{image.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <Testimonials />
        </section>

        <HomeStats />

        <section className="mx-auto mt-10 bg-primary-50 px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="mb-4 text-2xl font-semibold text-sky-900">
            Audiences We Are Preparing For
          </h2>
          <Clients />
        </section>

        <section className="mt-8">
          <ContactForm />
        </section>
      </main>
    </>
  );
}
