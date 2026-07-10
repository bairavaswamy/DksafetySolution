"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import SocialProfileLinks from "./SocialProfileLinks";
import { siteConfig } from "../config/site.config";

export default function AboutClient() {
  return (
    <div className="bg-white text-gray-800">
      <section className="bg-gradient-to-r from-sky-100 to-sky-50 px-6 py-16 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-sky-600">
          About {siteConfig.shortName}
        </p>
        <h1 className="mx-auto mt-3 max-w-4xl text-4xl font-bold text-slate-950 md:text-5xl">
          {siteConfig.name} connects safety services across Chennai.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-600">
          The site now links Chennai areas with balcony, window, bird-control,
          sports, and utility safety services from one central system.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-12 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-3xl font-semibold">Who We Are</h2>
          <p className="mb-4 leading-relaxed text-gray-600">
            {siteConfig.name} plans safety net, invisible grill, bird-control,
            sports net, and utility installations for Chennai homes, apartments,
            communities, and outdoor spaces. The service catalog connects every
            configured area to every active service page.
          </p>
          <p className="leading-relaxed text-gray-600">
            Brand and contact details live in one central config, so the header,
            contact bar, floating buttons, forms, footer, and structured metadata
            stay aligned across the site.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {siteConfig.trustPoints.map((point) => (
              <div
                key={point}
                className="flex items-center gap-3 rounded-2xl border border-sky-100 bg-sky-50/70 px-4 py-3 text-sm font-semibold text-slate-700"
              >
                <CheckCircle2 size={17} className="text-sky-500" />
                {point}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {siteConfig.galleryImages.slice(0, 4).map((image) => (
            <div key={image.src} className="relative h-40 w-full overflow-hidden rounded-xl shadow-md">
              <Image src={image.src} alt={image.alt} fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-12">
        <h2 className="mb-8 text-center text-3xl font-semibold">Website Focus</h2>
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-4">
          {siteConfig.focusAreas.map((area) => (
            <div key={area.title} className="rounded-2xl bg-white p-6 shadow transition hover:shadow-lg">
              <h3 className="text-lg font-semibold">{area.title}</h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">{area.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-[32px] border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-lime-50 p-6 shadow-lg shadow-sky-100/50 md:p-8">
          <SocialProfileLinks
            heading={`Connect With ${siteConfig.name}`}
            description="Instagram, Facebook, LinkedIn, and WhatsApp are arranged from the central site profile list."
            showLabels
            variant="warm"
          />
        </div>
      </section>

      <section className="bg-primary-900 px-6 py-12 text-center text-white">
        <h2 className="mb-4 text-3xl font-bold">Ready to plan a safety installation.</h2>
        <p className="mx-auto mb-6 max-w-2xl">
          Pick a Chennai area, choose the service, and contact DK Safety Solutions
          from the exact area page.
        </p>
        <Link
          href="/contact-us"
          prefetch={false}
          className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 font-semibold text-white shadow transition hover:bg-secondary-600"
        >
          Contact Us
          <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  );
}
