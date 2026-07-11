import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  MapPin,
  MessageCircle,
  Phone,
  Ruler,
  ShieldCheck,
} from "lucide-react";
import type { ManualServicePage } from "../content/manualServicePages";
import { chennaiConfig } from "../config/chennai.config";
import { siteConfig } from "../config/site.config";
import { getServiceDetail, type ServiceSlug } from "../content/serviceDetails";
import { getServiceVisuals } from "../content/serviceVisuals";

type ManualServiceArticleProps = {
  page: ManualServicePage;
};

const titleFromSlug = (slug: string) =>
  slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export default function ManualServiceArticle({ page }: ManualServiceArticleProps) {
  const serviceSlug = page.serviceSlug as ServiceSlug;
  const serviceDetail = getServiceDetail(serviceSlug);
  const visuals = getServiceVisuals(serviceSlug);
  const area = chennaiConfig.areas.find((item) => item.slug === page.areaSlug);
  const service = chennaiConfig.services.find((item) => item.slug === page.serviceSlug);
  const areaName = area?.name ?? titleFromSlug(page.areaSlug);
  const serviceName = service?.name ?? titleFromSlug(page.serviceSlug);
  const visitSteps = [
    `Share ${areaName} location, floor level, and photos`,
    "Confirm opening size, access, and fixing surface",
    "Choose material, finish, and service timing",
    "Install neatly and check tension before handover",
  ];

  return (
    <main className="bg-neutral-50 text-slate-950">
      <section className="relative overflow-hidden bg-primary-900 pb-16 pt-28 sm:pt-32 lg:pt-36">
        <div className="absolute inset-0">
          <Image
            src={visuals.mobileHero}
            alt={page.hero.title}
            fill
            priority
            className="object-cover md:hidden"
          />
          <Image
            src={page.hero.image}
            alt={page.hero.title}
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
              <Link href={`/${page.citySlug}`} prefetch={false} className="transition hover:text-white">
                Chennai
              </Link>
              <span>/</span>
              <Link
                href={`/${page.citySlug}/${page.areaSlug}`}
                prefetch={false}
                className="transition hover:text-white"
              >
                {areaName}
              </Link>
            </nav>

            <p className="mt-8 text-xs font-black uppercase tracking-[0.22em] text-secondary-300 sm:text-sm">
              {serviceDetail.category} in {areaName}
            </p>
            <h1 className="mt-5 max-w-5xl text-[2rem] font-black leading-[1.12] text-white sm:text-5xl lg:text-6xl">
              {page.hero.title}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-100 sm:text-lg">
              {page.hero.lead}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={siteConfig.contact.phoneHref}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-red-950/20 transition hover:bg-red-700 sm:w-auto"
              >
                <Phone size={18} />
                {page.hero.primaryCta}
              </a>
              <a
                href={siteConfig.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-black text-white shadow-lg shadow-accent-900/20 transition hover:bg-accent-600 sm:w-auto"
              >
                <MessageCircle size={18} />
                {page.hero.secondaryCta}
              </a>
            </div>
          </div>

          <aside className="rounded-lg border border-white/20 bg-white/95 p-5 text-slate-950 shadow-xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-secondary">
              Site Visit Snapshot
            </p>
            <h2 className="mt-3 text-2xl font-black">What this page helps decide</h2>
            <div className="mt-5 grid gap-3">
              {[
                { icon: MapPin, label: "Area", value: areaName },
                { icon: ShieldCheck, label: "Service", value: serviceName },
                { icon: Ruler, label: "Quote Basis", value: "Measured opening and access" },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.label} className="flex gap-3 border-t border-slate-200 pt-3">
                    <Icon className="mt-0.5 shrink-0 text-primary" size={18} />
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm font-bold text-slate-900">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <article className="min-w-0">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(300px,0.58fr)] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-secondary">
                Local Service Notes
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                {page.intro.heading}
              </h2>
              <div className="mt-5 space-y-5 text-[17px] leading-8 text-slate-700">
                {page.intro.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="relative min-h-[340px] overflow-hidden rounded-lg shadow-lg">
              <Image
                src={visuals.detail}
                alt={`${serviceName} detail in ${areaName}`}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="mt-14 space-y-14">
            {page.sections.map((section, index) => {
              const sectionImage = section.image;
              const isImageLeft = sectionImage && index % 2 === 1;

              return (
                <section
                  key={section.heading}
                  className={`grid gap-7 border-t border-slate-200 pt-10 ${
                    sectionImage ? "lg:grid-cols-[minmax(0,0.82fr)_minmax(280px,0.58fr)] lg:items-center" : ""
                  }`}
                >
                  <div className={isImageLeft ? "lg:order-2" : undefined}>
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-black text-white">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-secondary">
                        {section.eyebrow}
                      </p>
                    </div>
                    <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                      {section.heading}
                    </h2>
                    <div className="mt-5 space-y-5 text-[17px] leading-8 text-slate-700">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>

                  {sectionImage ? (
                    <div
                      className={`relative min-h-[310px] overflow-hidden rounded-lg shadow-lg ${
                        isImageLeft ? "lg:order-1" : ""
                      }`}
                    >
                      <Image src={sectionImage} alt={section.heading} fill className="object-cover" />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-900/75 to-transparent p-4">
                        <p className="text-sm font-bold text-white">{serviceName}</p>
                      </div>
                    </div>
                  ) : null}
                </section>
              );
            })}
          </div>
        </article>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-lg border border-primary-100 bg-white p-5 shadow-soft">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-secondary">
              Quick Enquiry
            </p>
            <h2 className="mt-3 text-2xl font-black text-slate-950">
              Ask for a measured site visit.
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Share the opening size, floor level, usage pattern, and location. The
              quote should follow the real site condition.
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
            </div>
          </div>

          <div className="mt-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">
              Visit Checklist
            </p>
            <div className="mt-4 grid gap-3">
              {visitSteps.map((item) => (
                <div key={item} className="flex gap-3 text-sm font-semibold leading-6 text-slate-700">
                  <ClipboardCheck className="mt-0.5 shrink-0 text-accent" size={17} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="bg-white px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-secondary">
              Decision Notes
            </p>
            <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
              {page.decisionGuide.heading}
            </h2>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {page.decisionGuide.points.map((point) => (
              <div key={point.title} className="rounded-lg border border-slate-200 bg-neutral-50 p-5 shadow-sm">
                <CheckCircle2 className="text-accent" size={22} />
                <h3 className="mt-4 text-lg font-black text-slate-950">{point.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-secondary">
                FAQ
              </p>
              <h2 className="mt-3 text-3xl font-black text-slate-950">
                Area questions answered clearly.
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                These answers keep the enquiry practical before the team measures the site.
              </p>
            </div>

            <div className="space-y-3">
              {page.faq.map((item) => (
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

      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 overflow-hidden rounded-lg bg-primary-900 p-6 text-white shadow-xl md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:p-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-secondary-300">
              Book a Visit
            </p>
            <h2 className="mt-3 text-3xl font-black">
              Ready to measure {serviceName.toLowerCase()} in {areaName}?
            </h2>
            <div className="mt-5 max-w-3xl space-y-4 text-sm leading-7 text-slate-100">
              {page.closing.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <a
            href={siteConfig.contact.phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-black text-primary shadow transition hover:bg-secondary hover:text-white"
          >
            {page.closing.cta}
            <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </main>
  );
}
