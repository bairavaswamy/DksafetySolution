import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import {
  getBreadcrumbListSchema,
  getGraphSchema,
  getWebPageSchema,
  stringifySchema,
} from "../config/schema.config";
import { absoluteUrl, siteConfig } from "../config/site.config";

const title = `${siteConfig.name} Gallery`;
const description =
  "Chennai safety net, invisible grill, bird-control, sports net, and utility installation visuals from DK Safety Solutions.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: absoluteUrl("/gallery"),
  },
  openGraph: {
    title,
    description,
    url: absoluteUrl("/gallery"),
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.defaultImage,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [siteConfig.defaultImage],
  },
};

const galleryUrl = absoluteUrl("/gallery");
const galleryJsonLd = stringifySchema(
  getGraphSchema([
    {
      ...getWebPageSchema({
        url: galleryUrl,
        name: title,
        description,
        image: absoluteUrl(siteConfig.defaultImage),
        type: "ImageGallery",
      }),
      image: siteConfig.galleryImages.map((image) => absoluteUrl(image.src)),
    },
    getBreadcrumbListSchema([
      { name: "Home", url: absoluteUrl("/") },
      { name: "Gallery", url: galleryUrl },
    ]),
  ])
);

export default function GalleryPage() {
  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: galleryJsonLd,
        }}
      />

      <section className="bg-gradient-to-r from-sky-100 to-sky-50 px-6 py-16 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-sky-600">
          Gallery
        </p>
        <h1 className="mx-auto mt-3 max-w-4xl text-4xl font-bold text-slate-950 md:text-5xl">
          Chennai safety installation visuals for {siteConfig.name}.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-600">
          A clean visual set for balcony protection, anchor details, service visits,
          area notes, and connected Chennai safety services.
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
        {siteConfig.galleryImages.map((image) => (
          <article
            key={image.src}
            className="group overflow-hidden rounded-[28px] border border-sky-100 bg-white shadow-lg shadow-sky-100/40"
          >
            <div className="relative h-72">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-500">
                {image.category}
              </p>
              <h2 className="mt-2 text-xl font-bold text-slate-950">{image.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{image.alt}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-14">
        <div className="rounded-[32px] border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-lime-50 p-6 text-center shadow-lg shadow-sky-100/50">
          <h2 className="text-2xl font-bold text-slate-950">Need a site visit?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            Share your area, photos, and service requirement so the team can plan
            the right safety net, grill, bird-control, sports, or utility setup.
          </p>
          <Link
            href="/contact-us"
            prefetch={false}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-lime-500 px-5 py-3 font-semibold text-white shadow-md transition hover:scale-[1.02]"
          >
            Contact Us
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
