import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, MessageCircle, Phone, Ruler } from "lucide-react";
import { chennaiConfig } from "../config/chennai.config";
import {
  getBreadcrumbListSchema,
  getGraphSchema,
  getServiceSchema,
  getWebPageSchema,
  stringifySchema,
} from "../config/schema.config";
import { absoluteUrl, siteConfig } from "../config/site.config";
import type { ChennaiService } from "../content/serviceAreaCatalog";
import { getServiceDetail } from "../content/serviceDetails";
import { getServiceVisuals } from "../content/serviceVisuals";

type CityServicePageProps = {
  service: ChennaiService;
};

export default function CityServicePage({ service }: CityServicePageProps) {
  const detail = getServiceDetail(service.slug);
  const visuals = getServiceVisuals(service.slug);
  const relatedServices = chennaiConfig.services
    .filter((item) => item.slug !== service.slug)
    .slice(0, 6);
  const featuredAreas = chennaiConfig.areas.slice(0, 12);
  const pageUrl = absoluteUrl(`/${chennaiConfig.citySlug}/${service.slug}/`);
  const imageUrl = absoluteUrl(visuals.hero);
  const pageTitle = `${service.name} in Chennai`;
  const jsonLd = getGraphSchema([
    getWebPageSchema({
      url: pageUrl,
      name: pageTitle,
      description: detail.shortBenefit,
      image: imageUrl,
    }),
    getServiceSchema({
      url: pageUrl,
      name: pageTitle,
      description: detail.shortBenefit,
      image: imageUrl,
      areaName: "Chennai",
    }),
    getBreadcrumbListSchema([
      { name: "Home", url: absoluteUrl("/") },
      { name: "Chennai", url: absoluteUrl(`/${chennaiConfig.citySlug}/`) },
      { name: service.name, url: pageUrl },
    ]),
  ]);

  return (
    <main className="bg-white text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: stringifySchema(jsonLd),
        }}
      />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={visuals.mobileHero}
            alt={`${service.name} in Chennai`}
            fill
            priority
            className="object-cover md:hidden"
          />
          <Image
            src={visuals.hero}
            alt={`${service.name} in Chennai`}
            fill
            priority
            className="hidden object-cover md:block"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-900/35" />
        </div>

        <div className="relative mx-auto grid min-h-[620px] max-w-7xl items-center gap-8 px-4 py-16 lg:grid-cols-[1fr_0.75fr] lg:px-6">
          <div className="min-w-0">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-lime-300">
              Chennai {detail.category}
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              {service.name} in Chennai
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-100">
              DK Safety Solutions plans {service.name.toLowerCase()} for Chennai
              apartments, villas, communities, terraces, utility spaces, and open
              building edges with clean fixing, practical access, and a finish that
              suits daily use.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={siteConfig.contact.phoneHref}
                className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-3 font-bold text-white shadow-lg transition hover:bg-sky-600"
              >
                <Phone size={18} />
                Call for Chennai Visit
              </a>
              <a
                href={siteConfig.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-3 font-bold text-white backdrop-blur transition hover:bg-white/20"
              >
                <MessageCircle size={18} />
                WhatsApp Details
              </a>
            </div>
          </div>

          <div className="rounded-lg border border-white/15 bg-white/12 p-6 text-white shadow-2xl backdrop-blur-md">
            <MapPin size={26} className="text-lime-200" />
            <h2 className="mt-4 text-2xl font-black">Choose your Chennai area</h2>
            <p className="mt-3 text-sm leading-7 text-slate-100">
              Start from this city service page, then open the exact area page for
              measurement, access notes, nearby service links, and contact action.
            </p>
            <div className="mt-5 grid gap-2">
              {featuredAreas.slice(0, 4).map((area) => (
                <Link
                  key={area.slug}
                  href={`/${chennaiConfig.citySlug}/${area.slug}/${service.slug}`}
                  prefetch={false}
                  className="flex items-center justify-between rounded-lg border border-white/15 bg-white/10 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/20"
                >
                  {area.name}
                  <ArrowRight size={16} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 lg:grid-cols-[0.7fr_0.3fr] lg:px-6">
        <article>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-500">
            Chennai Service Notes
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
            Built around site condition and daily use
          </h2>
          <div className="mt-5 space-y-5 text-[17px] leading-8 text-slate-700">
            <p>
              {service.name} in Chennai needs a practical check of the opening,
              fixing surface, access route, weather exposure, and how the space is
              used every day. A balcony, duct, terrace, staircase, window, play
              zone, or building face can all need a different material line and
              fixing pattern.
            </p>
            <p>
              The service visit should confirm where the protection starts and ends,
              how cleaning or maintenance will happen later, and whether the finish
              should stay low-profile from inside the home or from the building
              exterior. That care keeps the finished work useful after
              installation, not just neat on the first day.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <section className="rounded-lg border border-indigo-100 bg-indigo-50 p-6">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-700">
                Good For
              </p>
              <h2 className="mt-3 text-2xl font-black text-slate-950">
                Common Chennai use cases
              </h2>
              <div className="mt-5 grid gap-3">
                {detail.bestFor.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-slate-700">
                    <CheckCircle2 size={17} className="shrink-0 text-indigo-600" />
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-sky-100 bg-sky-50 p-6">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-500">
                Site Checks
              </p>
              <h2 className="mt-3 text-2xl font-black text-slate-950">
                What should be checked first
              </h2>
              <div className="mt-5 grid gap-3">
                {detail.checks.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-slate-700">
                    <Ruler size={17} className="shrink-0 text-sky-500" />
                    {item}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section className="mt-12">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-700">
              Chennai Areas
            </p>
            <h2 className="mt-3 text-3xl font-black text-slate-950">
              Open the area page for {service.name.toLowerCase()}
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {chennaiConfig.areas.map((area) => (
                <Link
                  key={area.slug}
                  href={`/${chennaiConfig.citySlug}/${area.slug}/${service.slug}`}
                  prefetch={false}
                  className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-800 shadow-sm transition hover:border-sky-300 hover:text-sky-600"
                >
                  {area.name}
                  <ArrowRight size={15} />
                </Link>
              ))}
            </div>
          </section>
        </article>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="mb-5 grid gap-4">
            <div className="relative min-h-[220px] overflow-hidden rounded-lg shadow-lg">
              <Image src={visuals.detail} alt={`${service.name} installation detail`} fill className="object-cover" />
            </div>
            <div className="relative min-h-[180px] overflow-hidden rounded-lg shadow-lg">
              <Image src={visuals.context} alt={`${service.name} Chennai service context`} fill className="object-cover" />
            </div>
          </div>

          <div className="rounded-lg border border-sky-100 bg-sky-50 p-6 shadow-lg shadow-sky-100/50">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-500">
              Quick Enquiry
            </p>
            <h2 className="mt-3 text-2xl font-black text-slate-950">
              Ask for {service.name.toLowerCase()}.
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Share photos, area name, approximate opening size, floor access, and
              the main issue. The visit can then follow the real site condition.
            </p>
            <div className="mt-5 grid gap-3">
              <a
                href={siteConfig.contact.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 font-bold text-white shadow transition hover:bg-slate-800"
              >
                <Phone size={17} />
                Call Now
              </a>
              <Link
                href="/contact-us"
                prefetch={false}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-sky-200 bg-white px-5 py-3 font-bold text-sky-600 shadow-sm transition hover:border-sky-400 hover:bg-sky-50"
              >
                Contact Page
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </aside>
      </section>

      <section className="bg-slate-50 px-4 py-14 lg:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-500">
            Related Services
          </p>
          <h2 className="mt-3 text-3xl font-black text-slate-950">
            Other Chennai safety services
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((related) => (
              <Link
                key={related.slug}
                href={`/${chennaiConfig.citySlug}/${related.slug}`}
                prefetch={false}
                className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-sky-300 hover:shadow-md"
              >
                <p className="text-lg font-black text-slate-950">{related.name}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{related.angle}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-sky-600">
                  Open Chennai page
                  <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
