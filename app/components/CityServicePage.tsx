import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ClipboardCheck, IndianRupee, MapPin, MessageCircle, Phone, Ruler } from "lucide-react";
import { chennaiConfig } from "../config/chennai.config";
import { getBreadcrumbListSchema, getFAQPageSchema, getGraphSchema, getImageObjectSchema, getServiceSchema, getWebPageSchema, stringifySchema } from "../config/schema.config";
import { absoluteUrl, siteConfig } from "../config/site.config";
import type { ChennaiService } from "../content/serviceAreaCatalog";
import { getServiceDetail } from "../content/serviceDetails";
import { getServiceVisuals } from "../content/serviceVisuals";
import { getCityServiceContent } from "../content/city-services";

const priorityAreaSlugs = ["anna-nagar", "adyar", "velachery", "tambaram", "sholinganallur", "porur", "ambattur", "pallikaranai", "thoraipakkam", "medavakkam", "perungudi", "navalur"];

function ContactLinks() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <a href={siteConfig.contact.phoneHref} className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-900 px-5 py-3 text-sm font-black text-white transition hover:bg-primary-950"><Phone size={18} />Call for a Visit</a>
      <a href={siteConfig.contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent-700 px-5 py-3 text-sm font-black text-white transition hover:bg-accent-800"><MessageCircle size={18} />WhatsApp Photos</a>
    </div>
  );
}

export default function CityServicePage({ service }: { service: ChennaiService }) {
  const detail = getServiceDetail(service.slug);
  const visuals = getServiceVisuals(service.slug);
  const content = getCityServiceContent(service.slug);
  const relatedServices = content.relatedServices
    .map((slug) => chennaiConfig.services.find((item) => item.slug === slug))
    .filter((item): item is ChennaiService => Boolean(item));
  const priorityAreas = priorityAreaSlugs
    .map((slug) => chennaiConfig.areas.find((area) => area.slug === slug))
    .filter((area): area is (typeof chennaiConfig.areas)[number] => Boolean(area));
  const pageUrl = absoluteUrl(`/${chennaiConfig.citySlug}/${service.slug}/`);
  const imageUrl = absoluteUrl(visuals.hero);
  const pageTitle = `${service.name} in Chennai`;
  const guideLinks = [
    { id: "overview", label: "Overview" },
    ...content.sections.map((section) => ({ id: `guide-${section.id}`, label: section.heading })),
    { id: "options", label: "Compare options" },
    { id: "pricing", label: "Pricing and quote checklist" },
    { id: "installation", label: "Installation planning" },
    { id: "chennai-coverage", label: "Chennai site considerations" },
    { id: "faqs", label: "Frequently asked questions" },
  ];
  const jsonLd = getGraphSchema([
    getWebPageSchema({ url: pageUrl, name: pageTitle, description: content.metaDescription, image: imageUrl }),
    getServiceSchema({ url: pageUrl, name: pageTitle, description: content.metaDescription, image: imageUrl, areaName: "Chennai" }),
    getBreadcrumbListSchema([
      { name: "Home", url: absoluteUrl("/") },
      { name: "Chennai", url: absoluteUrl(`/${chennaiConfig.citySlug}/`) },
      { name: service.name, url: pageUrl },
    ]),
    getImageObjectSchema({ id: `${pageUrl}#service-image`, url: imageUrl, name: `${service.name} service visual`, caption: `Service visual for ${service.name.toLowerCase()}.` }),
    getFAQPageSchema(pageUrl, content.faq),
  ]);

  return (
    <main className="w-full max-w-full overflow-x-hidden bg-neutral-50 text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifySchema(jsonLd) }} />

      <section className="relative isolate overflow-hidden bg-primary-900 text-white">
        <div className="absolute inset-0">
          <Image src={visuals.mobileHero} alt={pageTitle} fill priority sizes="100vw" className="object-cover md:hidden" />
          <Image src={visuals.hero} alt={pageTitle} fill priority sizes="100vw" className="hidden object-cover md:block" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900 via-primary-900/[0.88] to-primary-900/[0.38]" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-neutral-50 to-transparent" />
        </div>
        <div className="relative mx-auto grid min-h-[660px] max-w-7xl items-end gap-8 px-4 pb-20 pt-28 sm:px-6 lg:min-h-[700px] lg:grid-cols-[minmax(0,1fr)_360px] lg:pb-24 lg:pt-36">
          <div className="min-w-0 max-w-4xl">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-white/80">
              <Link href="/" prefetch={false}>Home</Link><span>/</span>
              <Link href={`/${chennaiConfig.citySlug}/`} prefetch={false}>Chennai</Link><span>/</span>
              <span className="text-white">{detail.category}</span>
            </nav>
            <p className="mt-8 text-xs font-black uppercase tracking-[0.22em] text-secondary-300">Chennai {detail.category}</p>
            <h1 className="mt-4 break-words text-[2.15rem] font-black leading-[1.08] sm:text-5xl lg:text-6xl">{pageTitle}</h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-100 sm:text-lg">{content.intro}</p>
            <div className="mt-7"><ContactLinks /></div>
          </div>
          <aside className="hidden rounded-lg border border-white/20 bg-white/10 p-6 backdrop-blur-md lg:block">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-secondary-300">Before your site visit</p>
            <h2 className="mt-3 text-2xl font-black">Start with the right questions</h2>
            <ul className="mt-5 space-y-3">
              {detail.checks.map((check) => <li key={check} className="flex items-center gap-3 rounded-lg border border-white/15 p-3 text-sm font-bold"><CheckCircle2 size={18} className="shrink-0 text-accent-300" />{check}</li>)}
            </ul>
            <p className="mt-5 text-sm leading-7 text-slate-100">Share your area, photos, approximate dimensions, and intended use. Confirm the system and written scope after the site assessment.</p>
          </aside>
        </div>
      </section>

      <nav aria-label={`${service.name} guide contents`} className="relative z-10 mx-auto -mt-8 max-w-7xl px-4 sm:px-6">
        <div className="rounded-lg border border-primary-100 bg-white p-5 shadow-sm sm:p-6">
          <p className="text-sm font-black text-primary-900">In this service guide</p>
          <ul className="mt-4 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
            {guideLinks.map((link) => <li key={link.id}><a href={`#${link.id}`} className="inline-flex items-start gap-2 font-semibold leading-6 text-primary hover:underline"><ArrowRight size={14} className="mt-1 shrink-0" />{link.label}</a></li>)}
          </ul>
        </div>
      </nav>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:py-16">
        <article className="min-w-0 space-y-14" aria-label={`${service.name} service guide`}>
          <section id="overview" className="scroll-mt-32">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-secondary-700">Service overview</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{content.overview.heading}</h2>
            <div className="mt-5 space-y-4 text-base leading-8 text-slate-700">
              {content.overview.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-accent-100 bg-accent-50 p-5">
                <h3 className="font-black text-accent-900">Typical requirements</h3>
                <ul className="mt-3 space-y-2">{detail.bestFor.map((item) => <li key={item} className="flex gap-2 text-sm leading-6"><CheckCircle2 size={16} className="mt-1 shrink-0 text-accent" />{item}</li>)}</ul>
              </div>
              <div className="rounded-lg border border-primary-100 bg-primary-50 p-5">
                <h3 className="font-black text-primary-900">Important survey checks</h3>
                <ul className="mt-3 space-y-2">{detail.checks.map((item) => <li key={item} className="flex gap-2 text-sm leading-6"><Ruler size={16} className="mt-1 shrink-0 text-primary" />{item}</li>)}</ul>
              </div>
            </div>
          </section>

          <div className="relative aspect-[16/8] overflow-hidden rounded-lg bg-primary-100">
            <Image src={visuals.detail} alt={`${service.name} material and fixing detail`} fill sizes="(max-width: 1024px) 100vw, 65vw" className="object-cover" />
          </div>

          {content.sections.map((section) => (
            <section key={section.id} id={`guide-${section.id}`} className="scroll-mt-32">
              <h2 className="text-2xl font-black tracking-tight sm:text-3xl">{section.heading}</h2>
              <div className="mt-5 space-y-4 text-base leading-8 text-slate-700">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              {section.bullets && <ul className="mt-5 space-y-3 rounded-lg border border-primary-100 bg-white p-5">{section.bullets.map((point) => <li key={point} className="flex gap-3 text-sm leading-7 text-slate-700"><CheckCircle2 size={18} className="mt-1 shrink-0 text-accent" /><span>{point}</span></li>)}</ul>}
            </section>
          ))}

          <section id="options" className="scroll-mt-32">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-secondary-700">Compare options</p>
            <h2 className="mt-3 text-2xl font-black sm:text-3xl">{content.options.heading}</h2>
            <p className="mt-4 text-base leading-8 text-slate-700">{content.options.intro}</p>
            <div className="mt-6 grid gap-4">
              {content.options.rows.map((row) => (
                <section key={row.name} className="rounded-lg border border-primary-100 bg-white p-5 sm:p-6">
                  <h3 className="text-lg font-black text-primary-900">{row.name}</h3>
                  <dl className="mt-4 grid gap-4 text-sm leading-7 sm:grid-cols-2">
                    <div><dt className="font-bold text-slate-950">Suitable for</dt><dd className="mt-1 text-slate-700">{row.bestFor}</dd></div>
                    <div><dt className="font-bold text-slate-950">What to consider</dt><dd className="mt-1 text-slate-700">{row.considerations}</dd></div>
                  </dl>
                </section>
              ))}
            </div>
          </section>

          <section id="pricing" className="scroll-mt-32 rounded-lg border border-slate-200 bg-white p-5 sm:p-7">
            <IndianRupee size={26} className="text-secondary-700" />
            <h2 className="mt-4 text-2xl font-black sm:text-3xl">{service.name} pricing in Chennai</h2>
            <p className="mt-4 text-base leading-8 text-slate-700">{content.pricing.intro}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {content.pricing.factors.map((factor) => <section key={factor.title} className="rounded-lg bg-slate-50 p-5"><h3 className="font-black text-primary-900">{factor.title}</h3><p className="mt-3 text-sm leading-7 text-slate-700">{factor.text}</p></section>)}
            </div>
            <h3 className="mt-8 text-xl font-black">What to confirm in your written quote</h3>
            <ul className="mt-5 space-y-3">{content.pricing.quoteChecklist.map((point) => <li key={point} className="flex gap-3 text-sm leading-7 text-slate-700"><ClipboardCheck size={18} className="mt-1 shrink-0 text-primary" /><span>{point}</span></li>)}</ul>
            <Link href="/request-quote/" prefetch={false} className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white">Request a site-specific quote <ArrowRight size={16} /></Link>
          </section>

          <section id="installation" className="scroll-mt-32 overflow-hidden rounded-lg bg-primary-900 text-white">
            <div className="p-6 sm:p-8">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-secondary-300">Installation planning</p>
              <h2 className="mt-3 text-2xl font-black sm:text-3xl">From site assessment to handover</h2>
              <ol className="mt-7 grid gap-6 sm:grid-cols-2">
                {content.process.map((step, index) => <li key={step.title} className="flex gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-black text-primary">{index + 1}</span><div><h3 className="font-black">{step.title}</h3><p className="mt-2 text-sm leading-7 text-slate-100">{step.text}</p></div></li>)}
              </ol>
            </div>
            <div className="relative aspect-[16/7]"><Image src={visuals.context} alt={`${service.name} service application`} fill sizes="(max-width: 1024px) 100vw, 65vw" className="object-cover" /></div>
          </section>

          <section id="chennai-coverage" className="scroll-mt-32">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-secondary-700">Local considerations</p>
            <h2 className="mt-3 text-2xl font-black sm:text-3xl">Planning for your Chennai property</h2>
            <div className="mt-5 space-y-4 text-base leading-8 text-slate-700">{content.localConsiderations.map((point) => <p key={point}>{point}</p>)}</div>
            <p className="mt-6 text-sm leading-7 text-slate-600">Explore the matching service guide for your area, then share the exact property location and access details with your enquiry.</p>
            <ul className="mt-4 flex flex-wrap gap-2">{priorityAreas.map((area) => <li key={area.slug}><Link href={`/${chennaiConfig.citySlug}/${area.slug}/${service.slug}/`} prefetch={false} className="inline-block rounded-full border border-primary-200 bg-white px-4 py-2 text-sm font-semibold text-primary hover:border-secondary">{area.name}</Link></li>)}</ul>
            <Link href={`/${chennaiConfig.citySlug}/`} prefetch={false} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary underline">Browse all {chennaiConfig.areas.length} Chennai service areas <ArrowRight size={15} /></Link>
          </section>

          <section id="faqs" className="scroll-mt-32">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-secondary-700">Frequently asked questions</p>
            <h2 className="mt-3 text-2xl font-black sm:text-3xl">Questions about {service.name.toLowerCase()} in Chennai</h2>
            <div className="mt-6 grid gap-3">
              {content.faq.map((item) => <details key={item.question} className="group rounded-lg border border-slate-200 bg-white p-5"><summary className="cursor-pointer font-black leading-7 text-slate-950 hover:text-primary">{item.question}</summary><p className="mt-3 text-base leading-8 text-slate-700">{item.answer}</p></details>)}
            </div>
          </section>
        </article>

        <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
          <div className="overflow-hidden rounded-lg border border-primary-100 bg-white shadow-sm">
            <div className="relative aspect-[4/3]"><Image src={visuals.areaCard} alt={`${service.name} Chennai service`} fill sizes="(max-width: 1024px) 100vw, 320px" className="object-cover" /></div>
            <div className="p-5">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-secondary-700">Discuss your requirement</p>
              <h2 className="mt-3 text-xl font-black">Plan your {service.name.toLowerCase()} installation</h2>
              <p className="my-4 text-sm leading-7 text-slate-700">Send the location, photos of the full opening and fixing edges, and the main purpose of the work. Include any association rules or maintenance access that the proposal must allow for.</p>
              <ContactLinks />
              <Link href="/request-quote/" prefetch={false} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary underline">Send an enquiry online <ArrowRight size={15} /></Link>
            </div>
          </div>
          <div className="rounded-lg border border-primary-100 bg-white p-5">
            <MapPin size={22} className="text-secondary-700" />
            <h2 className="mt-3 text-lg font-black">Chennai service areas</h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">Find the local guide for your neighborhood and compare the requirements for your property.</p>
            <Link href="#chennai-coverage" prefetch={false} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary">View service areas <ArrowRight size={15} /></Link>
          </div>
        </aside>
      </div>

      <section className="bg-white px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-secondary-700">Related services</p>
          <h2 className="mt-3 text-3xl font-black">Other options for your property</h2>
          <div className="mt-7 grid gap-5 md:grid-cols-3">
            {relatedServices.map((related) => <Link key={related.slug} href={`/${chennaiConfig.citySlug}/${related.slug}/`} prefetch={false} className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50 transition hover:border-secondary"><div className="relative aspect-[16/9]"><Image src={getServiceVisuals(related.slug).areaCard} alt={related.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" /></div><div className="p-5"><h3 className="text-xl font-black">{related.name}</h3><p className="mt-3 text-sm leading-7 text-slate-700">{related.angle}</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary">View service guide <ArrowRight size={16} /></span></div></Link>)}
          </div>
        </div>
      </section>
    </main>
  );
}
