import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle, Phone } from "lucide-react";
import type { ManualServicePage } from "../content/manualServicePages";
import { siteConfig } from "../config/site.config";
import { getServiceDetail, type ServiceSlug } from "../content/serviceDetails";
import { getServiceVisuals } from "../content/serviceVisuals";

type ManualServiceArticleProps = {
  page: ManualServicePage;
};

export default function ManualServiceArticle({ page }: ManualServiceArticleProps) {
  const serviceSlug = page.serviceSlug as ServiceSlug;
  const serviceDetail = getServiceDetail(serviceSlug);
  const visuals = getServiceVisuals(serviceSlug);

  return (
    <main className="bg-white text-slate-950">
      <section className="relative overflow-hidden">
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
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/76 to-slate-900/30" />
        </div>

        <div className="relative mx-auto grid min-h-[620px] w-full max-w-7xl items-center gap-8 px-4 py-12 sm:gap-10 sm:py-16 lg:grid-cols-[1.05fr_0.75fr] lg:px-6">
          <div className="min-w-0 max-w-full">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-lime-300 sm:text-sm sm:tracking-[0.24em]">
              {page.hero.eyebrow}
            </p>
            <h1 className="mt-5 w-full max-w-full whitespace-normal break-words text-[1.75rem] font-black leading-[1.18] text-white [overflow-wrap:anywhere] sm:max-w-4xl sm:text-5xl sm:leading-tight lg:text-6xl">
              {page.hero.title}
            </h1>
            <p className="mt-5 w-full max-w-full text-sm leading-7 text-slate-100 sm:mt-6 sm:max-w-3xl sm:text-lg sm:leading-8">
              {page.hero.lead}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={siteConfig.contact.phoneHref}
                className="inline-flex w-full max-w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-lime-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-sky-950/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-sky-950/30 sm:w-auto sm:text-base"
              >
                <Phone size={18} />
                <span className="truncate">{page.hero.primaryCta}</span>
              </a>
              <a
                href={siteConfig.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full max-w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur transition-all duration-300 hover:border-white/40 hover:bg-white/20 sm:w-auto sm:text-base"
              >
                <MessageCircle size={18} />
                <span className="truncate">{page.hero.secondaryCta}</span>
              </a>
            </div>
          </div>

          <div className="w-full max-w-full rounded-[24px] border border-white/15 bg-white/12 p-5 text-white shadow-2xl backdrop-blur-md sm:rounded-[34px] sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-lime-200">
              Article Details
            </p>
            <h2 className="mt-3 text-2xl font-black">Full service notes</h2>
            <p className="mt-3 text-sm leading-7 text-slate-100">
              This page explains the area condition, service route, fixing choices,
              access needs, and contact steps before a site visit.
            </p>
            <div className="mt-6 rounded-2xl bg-white/12 p-4 text-sm leading-7 text-slate-100">
              Use it to compare the real site requirement before choosing material,
              access method, and finishing style.
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-10 grid max-w-7xl gap-4 px-4 lg:grid-cols-3 lg:px-6">
        {page.proof.map((item) => (
          <div
            key={item.label}
            className="relative z-10 rounded-[24px] border border-indigo-100 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.12)] transition-all duration-300 hover:shadow-[0_25px_80px_rgba(15,23,42,0.18)] hover:-translate-y-1"
          >
            <h2 className="mt-2 text-sm font-bold uppercase tracking-[0.18em] text-slate-900">
              {item.label}
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-[0.7fr_0.3fr] lg:px-6">
        <article>
          <div className="max-w-4xl">
            <h2 className="text-3xl font-black tracking-tight text-slate-950">
              {page.intro.heading}
            </h2>
            <div className="mt-5 space-y-5 text-[17px] leading-8 text-slate-700">
              {page.intro.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="mt-12 space-y-12">
            {page.sections.map((section, index) => {
              const sectionImage = section.image;

              return (
                <section
                  key={section.heading}
                  className={`grid items-center gap-8 ${
                    sectionImage ? "lg:grid-cols-2" : "lg:grid-cols-1"
                  }`}
                >
                  <div className={sectionImage && index % 2 === 1 ? "lg:order-2" : undefined}>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-500">
                      {section.eyebrow}
                    </p>
                    <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                      {section.heading}
                    </h2>
                    <div className="mt-5 space-y-5 text-[17px] leading-8 text-slate-700">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>

                  {sectionImage ? (
                    <div className="relative min-h-[340px] overflow-hidden rounded-[30px] shadow-xl">
                      <Image src={sectionImage} alt={section.heading} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
                    </div>
                  ) : null}
                </section>
              );
            })}
          </div>
        </article>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[28px] border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-lime-50 p-6 shadow-lg shadow-sky-100/50">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-500">
              {serviceDetail.category}
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
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 font-bold text-white shadow transition-all duration-300 hover:bg-slate-800 hover:shadow-lg hover:scale-105"
              >
                <Phone size={17} />
                Call
              </a>
              <Link
                href="/contact-us"
                prefetch={false}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-sky-200 bg-white px-5 py-3 font-bold text-sky-600 shadow-sm transition-all duration-300 hover:border-sky-400 hover:bg-sky-50 hover:shadow-md hover:scale-105"
              >
                Contact Page
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </aside>
      </section>

      <section className="bg-[#f7faf7] px-4 py-14">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-700">
              Decision Notes
            </p>
            <h2 className="mt-3 text-3xl font-black text-slate-950">
              {page.decisionGuide.heading}
            </h2>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {page.decisionGuide.points.map((point) => (
              <div key={point.title} className="rounded-[24px] border border-indigo-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-indigo-200 hover:-translate-y-0.5">
                <CheckCircle2 className="text-indigo-600 transition-colors duration-300 hover:text-indigo-700" size={22} />
                <h3 className="mt-4 text-lg font-black text-slate-950">{point.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14">
        <p className="text-center text-sm font-bold uppercase tracking-[0.2em] text-sky-500">
          FAQ
        </p>
        <h2 className="mt-3 text-center text-3xl font-black text-slate-950">
          Area questions answered clearly.
        </h2>
        <div className="mt-8 space-y-4">
          {page.faq.map((item) => (
            <details key={item.question} className="group rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-300">
              <summary className="cursor-pointer text-lg font-bold text-slate-950 transition-colors duration-300 group-hover:text-sky-600">
                {item.question}
              </summary>
              <p className="mt-4 text-sm leading-7 text-slate-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="mx-auto max-w-7xl rounded-[34px] bg-[#344A6C] p-8 text-center text-white shadow-xl">
          <h2 className="text-3xl font-black">{page.closing.heading}</h2>
          <div className="mx-auto mt-5 max-w-3xl space-y-4 text-sm leading-7 text-slate-100">
            {page.closing.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <a
            href={siteConfig.contact.phoneHref}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-sky-500 shadow transition-all duration-300 hover:bg-gray-50 hover:shadow-lg hover:scale-105"
          >
            {page.closing.cta}
            <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </main>
  );
}
