import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  MessageCircle,
  Phone,
  Ruler,
} from "lucide-react";
import { chennaiConfig } from "../config/chennai.config";
import { siteConfig } from "../config/site.config";
import type { ManualServiceAreaEntry } from "../content/types";
import type { ChennaiArea, ChennaiService } from "../content/serviceAreaCatalog";
import { getServiceDetail } from "../content/serviceDetails";
import { getServiceVisuals } from "../content/serviceVisuals";

type ManualEntryServicePageProps = {
  area: ChennaiArea;
  service: ChennaiService;
  entry: ManualServiceAreaEntry;
};

const getNearbyAreas = (areaSlug: string) => {
  const index = chennaiConfig.areas.findIndex((item) => item.slug === areaSlug);
  const start = Math.max(0, index - 3);
  const nearby = chennaiConfig.areas
    .slice(start, start + 7)
    .filter((item) => item.slug !== areaSlug);

  if (nearby.length >= 6) {
    return nearby.slice(0, 6);
  }

  return chennaiConfig.areas
    .filter((item) => item.slug !== areaSlug && !nearby.some((near) => near.slug === item.slug))
    .slice(0, 6 - nearby.length)
    .concat(nearby)
    .slice(0, 6);
};

export default function ManualEntryServicePage({
  area,
  service,
  entry,
}: ManualEntryServicePageProps) {
  const detail = getServiceDetail(service.slug);
  const visuals = getServiceVisuals(service.slug);
  const relatedServices = chennaiConfig.services
    .filter((item) => item.slug !== service.slug)
    .slice(0, 6);
  const nearbyAreas = getNearbyAreas(area.slug);
  const visitSteps = [
    `Share ${area.name} location and photos`,
    "Send floor level, opening size, and access notes",
    "Confirm material, fixing points, and finish",
    "Book a measured visit before final installation",
  ];

  return (
    <main className="bg-neutral-50 text-slate-950">
      <section className="relative overflow-hidden bg-primary-900 pb-16 pt-28 sm:pt-32 lg:pt-36">
        <div className="absolute inset-0">
          <Image
            src={visuals.mobileHero}
            alt={`${service.name} in ${area.name}`}
            fill
            priority
            className="object-cover md:hidden"
          />
          <Image
            src={visuals.hero}
            alt={`${service.name} in ${area.name}`}
            fill
            priority
            className="hidden object-cover md:block"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900 via-primary-900/86 to-primary-900/45" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-neutral-50 to-transparent" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div className="min-w-0">
            <nav className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white/70">
              <Link href="/" prefetch={false} className="transition hover:text-white">
                Home
              </Link>
              <span>/</span>
              <Link href={`/${chennaiConfig.citySlug}`} prefetch={false} className="transition hover:text-white">
                Chennai
              </Link>
              <span>/</span>
              <Link
                href={`/${chennaiConfig.citySlug}/${area.slug}`}
                prefetch={false}
                className="transition hover:text-white"
              >
                {area.name}
              </Link>
            </nav>

            <p className="mt-8 text-xs font-black uppercase tracking-[0.22em] text-secondary-300 sm:text-sm">
              {detail.category} in {area.name}, Chennai
            </p>
            <h1 className="mt-5 max-w-5xl text-[2rem] font-black leading-[1.12] text-white sm:text-5xl lg:text-6xl">
              {service.name} in {area.name} Chennai
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-100 sm:text-lg">
              {entry.localAngle}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={siteConfig.contact.phoneHref}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-red-950/20 transition hover:bg-red-700 sm:w-auto"
              >
                <Phone size={18} />
                Call for {area.name}
              </a>
              <a
                href={siteConfig.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-black text-white shadow-lg shadow-accent-900/20 transition hover:bg-accent-600 sm:w-auto"
              >
                <MessageCircle size={18} />
                WhatsApp Details
              </a>
            </div>
          </div>

          <aside className="rounded-lg border border-white/20 bg-white/95 p-5 text-slate-950 shadow-xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-secondary">
              Chennai Service Help
            </p>
            <h2 className="mt-3 text-2xl font-black">Plan the visit before quoting</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Send photos, floor access, opening size, and the main safety issue so the
              recommendation follows the real site condition.
            </p>
            <div className="mt-5 grid gap-3 border-t border-slate-200 pt-4">
              {visitSteps.slice(0, 3).map((item) => (
                <div key={item} className="flex gap-3 text-sm font-semibold leading-6 text-slate-700">
                  <ClipboardCheck className="mt-0.5 shrink-0 text-accent" size={17} />
                  {item}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <article className="min-w-0">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(300px,0.58fr)] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-secondary">
                Site Check
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Professional {service.name.toLowerCase()} for {area.name} properties
              </h2>
              <div className="mt-5 space-y-5 text-[17px] leading-8 text-slate-700">
                {entry.articleBrief.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <p>
                  DK Safety Solutions plans every {service.name.toLowerCase()} job around
                  measured site conditions: material strength, visual finish, safe access,
                  cleaning needs, and the way the space is used every day.
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="relative min-h-[280px] overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={visuals.detail}
                  alt={`${service.name} installation detail in Chennai`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative min-h-[210px] overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={visuals.context}
                  alt={`${service.name} service visual for Chennai`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-secondary">
                Good For
              </p>
              <h2 className="mt-3 text-2xl font-black text-slate-950">
                Common {area.name} use cases
              </h2>
              <div className="mt-5 grid gap-3">
                {detail.bestFor.map((item) => (
                  <div key={item} className="flex gap-3 text-sm font-semibold leading-6 text-slate-700">
                    <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-accent" />
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-primary">
                Site Checks
              </p>
              <h2 className="mt-3 text-2xl font-black text-slate-950">
                What gets measured first
              </h2>
              <div className="mt-5 grid gap-3">
                {detail.checks.map((item) => (
                  <div key={item} className="flex gap-3 text-sm font-semibold leading-6 text-slate-700">
                    <Ruler size={17} className="mt-0.5 shrink-0 text-primary" />
                    {item}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section className="mt-14 border-t border-slate-200 pt-10">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-secondary">
              Related Services
            </p>
            <h2 className="mt-3 text-3xl font-black text-slate-950">
              More safety services in {area.name}
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {relatedServices.map((related) => (
                <Link
                  key={related.slug}
                  href={`/${chennaiConfig.citySlug}/${area.slug}/${related.slug}`}
                  prefetch={false}
                  className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-secondary-300 hover:shadow-md"
                >
                  <p className="text-lg font-black text-slate-950">{related.name}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{related.angle}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-primary">
                    Open {area.name} page
                    <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </article>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-lg border border-primary-100 bg-white p-5 shadow-soft">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-secondary">
              Quick Enquiry
            </p>
            <h2 className="mt-3 text-2xl font-black text-slate-950">
              Ask for {area.name} service.
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Share the area, opening size, floor level, and preferred service. The
              quote can then follow the real site condition.
            </p>
            <div className="mt-5 grid gap-3">
              <a
                href={siteConfig.contact.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 font-black text-white shadow transition hover:bg-red-700"
              >
                <Phone size={17} />
                Call Now
              </a>
              <a
                href={siteConfig.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 font-black text-white shadow transition hover:bg-accent-600"
              >
                <MessageCircle size={17} />
                WhatsApp Photos
              </a>
              <Link
                href="/contact-us"
                prefetch={false}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary-200 bg-white px-5 py-3 font-black text-primary transition hover:border-secondary-300 hover:text-secondary"
              >
                Contact Page
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>

          <div className="mt-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">
              Nearby Areas
            </p>
            <div className="mt-4 grid gap-2">
              {nearbyAreas.map((nearby) => (
                <Link
                  key={nearby.slug}
                  href={`/${chennaiConfig.citySlug}/${nearby.slug}/${service.slug}`}
                  prefetch={false}
                  className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-secondary-300 hover:text-secondary"
                >
                  {nearby.name}
                  <ArrowRight size={15} />
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="bg-white px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-secondary">
                FAQ
              </p>
              <h2 className="mt-3 text-3xl font-black text-slate-950">
                Questions about {service.name.toLowerCase()} in {area.name}
              </h2>
            </div>

            <div className="space-y-3">
              {[
                {
                  question: `Do you install ${service.name.toLowerCase()} in ${area.name}?`,
                  answer: `Yes. DK Safety Solutions covers ${area.name} and nearby Chennai areas for ${service.name.toLowerCase()} with site measurement, material selection, and installation support.`,
                },
                {
                  question: "How is the price decided?",
                  answer: "Pricing depends on opening size, access, material choice, fixing points, height, and finish expectations. A site visit gives a clearer quote than only a phone estimate.",
                },
                {
                  question: "Can you handle apartments and independent houses?",
                  answer: `Yes. The installation plan changes based on whether the ${area.name} property is an apartment, villa, rental flat, independent house, terrace, or common amenity area.`,
                },
                {
                  question: "How fast can the work be scheduled?",
                  answer: "Scheduling depends on technician availability, site access, and material readiness. Phone or WhatsApp is the fastest way to share details and confirm a visit window.",
                },
              ].map((item) => (
                <details key={item.question} className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <summary className="cursor-pointer text-lg font-bold text-slate-950 transition group-hover:text-primary">
                    {item.question}
                  </summary>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 overflow-hidden rounded-lg bg-primary-900 p-6 text-white shadow-xl md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:p-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-secondary-300">
              Book a Visit
            </p>
            <h2 className="mt-3 text-3xl font-black">
              Ready to measure {service.name.toLowerCase()} in {area.name}?
            </h2>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-100">
              Call DK Safety Solutions to plan material, access, installation timing,
              and a clean finish for this {area.name} service.
            </p>
          </div>
          <a
            href={siteConfig.contact.phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-black text-primary shadow transition hover:bg-secondary hover:text-white"
          >
            Call DK Safety Solutions
            <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </main>
  );
}
