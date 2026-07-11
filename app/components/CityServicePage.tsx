import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ClipboardCheck,
  IndianRupee,
  Layers3,
  MapPin,
  MessageCircle,
  Phone,
  Ruler,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { chennaiConfig } from "../config/chennai.config";
import {
  getBreadcrumbListSchema,
  getFAQPageSchema,
  getGraphSchema,
  getImageObjectSchema,
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

const priorityAreaSlugs = [
  "anna-nagar",
  "adyar",
  "velachery",
  "tambaram",
  "sholinganallur",
  "porur",
] as const;

const getCityServiceFaq = (
  service: ChennaiService,
  detail: ReturnType<typeof getServiceDetail>
) => [
  {
    question: `How is ${service.name.toLowerCase()} price decided in Chennai?`,
    answer: `The quote is based on measured coverage, fixing surface, frame or anchor method, material grade, height, access, and finish expectations. DK Safety Solutions confirms these details before giving a clearer Chennai estimate.`,
  },
  {
    question: `Do you provide fixed frame support for ${service.name.toLowerCase()}?`,
    answer: `Yes, fixed frames or reinforced border systems are recommended where ${service.name.toLowerCase()} needs a neat edge, repeated daily use, stronger tension, or a cleaner building-facing finish.`,
  },
  {
    question: `Which Chennai properties are best suited for ${service.name.toLowerCase()}?`,
    answer: `${service.name} is commonly planned for ${detail.bestFor.join(", ").toLowerCase()}, with the final method adjusted after checking the exact opening and access conditions.`,
  },
  {
    question: "What should I share before booking a site visit?",
    answer: `Share your area name, photos or video, approximate measurements, floor level, access limitations, and the main reason for the work. For ${service.name.toLowerCase()}, photos of corners and fixing points are especially useful.`,
  },
  {
    question: `How do I maintain ${service.name.toLowerCase()} after installation?`,
    answer:
      "Keep the area clean, avoid hanging extra loads on the net or cable, and call for a check if you notice slackness, damaged anchors, corrosion, or any change after heavy rain, cleaning, or renovation work.",
  },
];

export default function CityServicePage({ service }: CityServicePageProps) {
  const detail = getServiceDetail(service.slug);
  const visuals = getServiceVisuals(service.slug);
  const relatedServices = chennaiConfig.services
    .filter((item) => item.slug !== service.slug)
    .slice(0, 6);
  const priorityAreas = priorityAreaSlugs
    .map((slug) => chennaiConfig.areas.find((area) => area.slug === slug))
    .filter((area): area is (typeof chennaiConfig.areas)[number] => Boolean(area));
  const pageUrl = absoluteUrl(`/${chennaiConfig.citySlug}/${service.slug}/`);
  const imageUrl = absoluteUrl(visuals.hero);
  const pageTitle = `${service.name} in Chennai`;
  const serviceFaq = getCityServiceFaq(service, detail);

  const proofCards = [
    {
      icon: ShieldCheck,
      eyebrow: "Best For",
      title: detail.bestFor.slice(0, 2).join(" + "),
      text: detail.shortBenefit,
    },
    {
      icon: Ruler,
      eyebrow: "First Site Check",
      title: detail.checks.slice(0, 2).join(" + "),
      text: "Opening, fixing surface, access, and finish are checked before quoting.",
    },
    {
      icon: BadgeCheck,
      eyebrow: "Finish Style",
      title: "Fixed-frame ready",
      text: "Cleaner edge lines and stronger tension where the site needs a premium finish.",
    },
    {
      icon: IndianRupee,
      eyebrow: "Quote Style",
      title: "Measured estimate",
      text: "No blind rate card. The quote follows actual span, material, and access.",
    },
  ];

  const pricingFactors = [
    {
      title: "Coverage and shape",
      text: `${service.name} pricing starts with the real span, corners, side gaps, bends, and whether the work is one compact opening or a continuous run.`,
    },
    {
      title: "Frame and fixing surface",
      text: "A fixed frame, reinforced border, anchor spacing, drilling surface, and cable or rope tension decide the material and labour plan.",
    },
    {
      title: "Exposure and usage",
      text: "Rain splash, UV, dust, birds, children, pets, cleaning access, or ball impact can change the recommended net, cable, rope, or steel grade.",
    },
    {
      title: "Access and permissions",
      text: "Floor level, ladder access, scaffold need, society timing, parking, lift movement, and facade rules can affect the schedule.",
    },
  ];

  const processSteps = [
    {
      title: "Photo review",
      text: `Share photos, area, floor level, and the exact reason you need ${service.name.toLowerCase()}.`,
    },
    {
      title: "Site measurement",
      text: `The team checks ${detail.checks.slice(0, 2).join(", ").toLowerCase()}, fixing points, and access before final advice.`,
    },
    {
      title: "Method selection",
      text: "Material, fixed frame need, border finish, anchor spacing, and maintenance access are confirmed.",
    },
    {
      title: "Clean installation",
      text: "Edges are tensioned, fixing points are checked, and simple care instructions are explained before handover.",
    },
  ];

  const comparisonRows = [
    {
      title: "Fixed frame",
      bestFor:
        "Premium flats, wide balcony fronts, child and pet safety, visible facades, and community-facing openings.",
      note: "Best finish and tension control when the site allows a neat frame or strong anchor line.",
      featured: true,
    },
    {
      title: "Reinforced border",
      bestFor: "Openings that need clean edges but do not require a full frame on every side.",
      note: "A practical middle option for many Chennai balconies, ducts, terraces, and utility spaces.",
      featured: false,
    },
    {
      title: "Direct fixing",
      bestFor: "Simple compact openings with reliable fixing points and a straightforward edge line.",
      note: "Useful for smaller work, but long-term neatness depends heavily on site condition.",
      featured: false,
    },
  ];

  const localPoints = [
    `${service.name} should be planned around Chennai humidity, dust, monsoon rain, and regular cleaning needs.`,
    "Apartment associations may care about drilling time, exterior appearance, common-area access, and lift movement.",
    "High-rise flats need edge-to-edge checks so side gaps, corners, and service ledges do not stay open.",
    `Homes using the area for ${detail.bestFor.slice(0, 2).join(" or ").toLowerCase()} need stronger daily-use planning than a purely visual installation.`,
  ];

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
    getImageObjectSchema({
      id: `${pageUrl}#service-image`,
      url: imageUrl,
      name: `${service.name} Chennai installation image`,
      caption: detail.shortBenefit,
    }),
    getFAQPageSchema(pageUrl, serviceFaq),
  ]);

  return (
    <main className="w-full max-w-full overflow-x-hidden bg-[#F8FAFC] text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: stringifySchema(jsonLd),
        }}
      />

      <section className="relative isolate w-full max-w-full overflow-hidden bg-primary-900 text-white">
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
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900 via-primary-900/88 to-primary-900/38" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#F8FAFC] to-transparent" />
        </div>

        <div className="relative mx-auto grid min-h-[660px] w-full max-w-7xl items-end gap-8 px-4 pb-20 pt-32 sm:px-6 sm:pt-36 lg:min-h-[700px] lg:grid-cols-[minmax(0,0.95fr)_410px] lg:pb-24 lg:pt-40">
          <div className="max-w-[22rem] sm:max-w-3xl lg:max-w-4xl">
            <nav className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-white/70">
              <Link href="/" prefetch={false} className="transition hover:text-white">
                Home
              </Link>
              <span>/</span>
              <Link
                href={`/${chennaiConfig.citySlug}`}
                prefetch={false}
                className="transition hover:text-white"
              >
                Chennai
              </Link>
              <span>/</span>
              <span className="text-white">{detail.category}</span>
            </nav>

            <p className="mt-8 text-xs font-black uppercase tracking-[0.24em] text-secondary-300 sm:text-sm">
              Chennai {detail.category}
            </p>
            <h1 className="mt-4 break-words text-[2.15rem] font-black leading-[1.06] text-white sm:text-5xl lg:text-6xl">
              {service.name} in Chennai
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-100 sm:text-lg">
              {detail.shortBenefit} Planned with clean fixing, practical access,
              fixed-frame options, and a finish that suits Chennai apartments,
              villas, communities, and commercial spaces.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={siteConfig.contact.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-red-950/20 transition hover:bg-red-700"
              >
                <Phone size={18} />
                Call for Visit
              </a>
              <a
                href={siteConfig.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-black text-white shadow-lg shadow-accent-900/20 transition hover:bg-accent-600"
              >
                <MessageCircle size={18} />
                WhatsApp Photos
              </a>
            </div>
          </div>

          <aside className="hidden rounded-lg border border-white/15 bg-white/12 p-6 shadow-2xl shadow-primary-950/30 backdrop-blur-md lg:block">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-secondary-300">
              Chennai Service Brief
            </p>
            <h2 className="mt-3 text-2xl font-black">Measured before quoting</h2>
            <div className="mt-5 grid gap-3">
              {[
                `Use case: ${detail.bestFor[0]}`,
                `First check: ${detail.checks[0]}`,
                "Frame option: available",
                "Quote: site-specific",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-lg border border-white/12 bg-white/10 px-4 py-3 text-sm font-bold text-white"
                >
                  <CheckCircle2 className="shrink-0 text-accent-300" size={18} />
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-lg bg-white p-4 text-primary-900">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-secondary">
                Better visit prep
              </p>
              <p className="mt-2 text-sm font-semibold leading-7">
                Send two clear photos, floor level, and rough width. The team can
                shortlist material and fixing method before arrival.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="relative z-10 -mt-12 px-4 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {proofCards.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.eyebrow}
                className="rounded-lg border border-primary-100 bg-white p-5 shadow-lg shadow-primary-900/10"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-50 text-primary">
                  <Icon size={21} />
                </div>
                <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-secondary">
                  {item.eyebrow}
                </p>
                <h2 className="mt-2 text-lg font-black leading-7 text-slate-950">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:py-16">
        <div className="min-w-0 space-y-16">
          <section className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="relative min-h-[340px] overflow-hidden rounded-lg bg-primary-900 shadow-xl shadow-primary-900/15 sm:min-h-[420px]">
              <Image
                src={visuals.detail}
                alt={`${service.name} installation detail in Chennai`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-900/92 to-transparent p-5 text-white">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-secondary-300">
                  Site-led finish
                </p>
                <h2 className="mt-2 text-2xl font-black">{detail.category}</h2>
              </div>
            </div>

            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-secondary">
                Service Planning
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                A cleaner installation starts with the exact opening.
              </h2>
              <div className="mt-5 space-y-4 text-[16px] leading-8 text-slate-700">
                <p>
                  {service.name} in Chennai needs a practical check of the opening,
                  fixing surface, access route, weather exposure, and how the space is
                  used every day.
                </p>
                <p>
                  The visit confirms where protection starts and ends, how cleaning
                  or maintenance works later, and whether the finish should stay
                  low-profile from inside the home or from the building exterior.
                </p>
              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-accent-100 bg-accent-50 p-5">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-accent-700">
                    Good for
                  </p>
                  <div className="mt-3 grid gap-2">
                    {detail.bestFor.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm font-bold text-slate-800">
                        <CheckCircle2 className="shrink-0 text-accent" size={16} />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border border-primary-100 bg-primary-50 p-5">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-primary-700">
                    Site checks
                  </p>
                  <div className="mt-3 grid gap-2">
                    {detail.checks.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm font-bold text-slate-800">
                        <Ruler className="shrink-0 text-primary" size={16} />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-7">
            <div className="grid gap-7 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary-50 text-secondary">
                  <IndianRupee size={24} />
                </div>
                <p className="mt-5 text-sm font-black uppercase tracking-[0.2em] text-secondary">
                  Price Guidance
                </p>
                <h2 className="mt-3 text-3xl font-black text-slate-950">
                  Quote depends on site reality, not a pasted rate.
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Use this section to understand what changes the estimate. The
                  final amount should be confirmed only after measurement, access
                  review, material selection, and fixing method.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {pricingFactors.map((factor) => (
                  <article
                    key={factor.title}
                    className="rounded-lg border border-slate-200 bg-[#F8FAFC] p-5"
                  >
                    <h3 className="text-base font-black text-primary">{factor.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{factor.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-primary">
                  Fixed Frame Focus
                </p>
                <h2 className="mt-3 text-3xl font-black text-slate-950">
                  Pick the right fixing style for the opening.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-slate-600">
                The best method depends on strength, visibility, cleaning route,
                building rules, and how often the space is used.
              </p>
            </div>

            <div className="mt-7 grid gap-4 lg:grid-cols-3">
              {comparisonRows.map((row, index) => (
                <article
                  key={row.title}
                  className={`rounded-lg border p-5 shadow-sm ${
                    row.featured
                      ? "border-primary-800 bg-primary-900 text-white shadow-primary-900/15"
                      : "border-slate-200 bg-white text-slate-950"
                  }`}
                >
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-lg ${
                      row.featured ? "bg-white text-primary" : "bg-secondary-50 text-secondary"
                    }`}
                  >
                    {index === 0 ? <ShieldCheck size={21} /> : <Wrench size={21} />}
                  </div>
                  <h3 className="mt-5 text-xl font-black">{row.title}</h3>
                  <p
                    className={`mt-3 text-sm font-semibold leading-7 ${
                      row.featured ? "text-slate-100" : "text-slate-600"
                    }`}
                  >
                    <span className={row.featured ? "text-white" : "text-slate-900"}>
                      Best:
                    </span>{" "}
                    {row.bestFor}
                  </p>
                  <p
                    className={`mt-3 border-t pt-3 text-sm leading-7 ${
                      row.featured
                        ? "border-white/15 text-slate-100"
                        : "border-slate-200 text-slate-600"
                    }`}
                  >
                    {row.note}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="overflow-hidden rounded-lg bg-primary-900 text-white shadow-xl shadow-primary-900/15">
            <div className="grid gap-0 lg:grid-cols-[0.58fr_0.42fr]">
              <div className="p-6 sm:p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-primary">
                  <ClipboardCheck size={24} />
                </div>
                <p className="mt-5 text-sm font-black uppercase tracking-[0.2em] text-secondary-300">
                  Process
                </p>
                <h2 className="mt-3 text-3xl font-black">
                  How the Chennai installation is handled
                </h2>
                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  {processSteps.map((step, index) => (
                    <article
                      key={step.title}
                      className="grid grid-cols-[42px_minmax(0,1fr)] gap-3"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-black text-primary">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-base font-black">{step.title}</h3>
                        <p className="mt-1 text-sm leading-7 text-slate-100">{step.text}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className="relative min-h-[280px] border-t border-white/10 lg:border-l lg:border-t-0">
                <Image
                  src={visuals.context}
                  alt={`${service.name} Chennai installation context`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 to-transparent" />
              </div>
            </div>
          </section>

          <section>
            <div className="grid gap-8 lg:grid-cols-[0.38fr_0.62fr]">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-50 text-accent">
                  <Layers3 size={24} />
                </div>
                <p className="mt-5 text-sm font-black uppercase tracking-[0.2em] text-accent-700">
                  Local Fit
                </p>
                <h2 className="mt-3 text-3xl font-black text-slate-950">
                  Chennai-specific points worth checking.
                </h2>
              </div>
              <div className="grid gap-3">
                {localPoints.map((point) => (
                  <article
                    key={point}
                    className="flex gap-3 rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <CheckCircle2 className="mt-1 shrink-0 text-accent" size={18} />
                    <p className="text-sm font-semibold leading-7 text-slate-700">{point}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-secondary">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-black text-slate-950">
              Questions before booking {service.name.toLowerCase()}
            </h2>
            <div className="mt-6 grid gap-3">
              {serviceFaq.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <summary className="cursor-pointer text-base font-black text-slate-950 transition group-hover:text-primary">
                    {item.question}
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
          <div className="overflow-hidden rounded-lg border border-primary-100 bg-white shadow-lg shadow-primary-900/10">
            <div className="relative min-h-[250px]">
              <Image
                src={visuals.areaCard}
                alt={`${service.name} Chennai service context`}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-secondary">
                Quick Enquiry
              </p>
              <h2 className="mt-3 text-2xl font-black text-slate-950">
                Ask for {service.name.toLowerCase()}.
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Share photos, area name, opening size, floor access, and the main
                issue. The quote can then follow the actual site condition.
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
          </div>

          <div className="rounded-lg border border-primary-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <MapPin className="text-secondary" size={22} />
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">
                  Key Areas
                </p>
                <h2 className="text-xl font-black text-slate-950">Popular Chennai links</h2>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {priorityAreas.map((area) => (
                <Link
                  key={area.slug}
                  href={`/${chennaiConfig.citySlug}/${area.slug}/${service.slug}`}
                  prefetch={false}
                  className="rounded-full border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-secondary-300 hover:text-secondary"
                >
                  {area.name}
                </Link>
              ))}
            </div>
            <Link
              href={`/${chennaiConfig.citySlug}`}
              prefetch={false}
              className="mt-5 inline-flex items-center gap-2 text-sm font-black text-primary transition hover:text-secondary"
            >
              View Chennai directory
              <ArrowRight size={15} />
            </Link>
          </div>
        </aside>
      </section>

      <section className="bg-white px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-secondary">
                Related Services
              </p>
              <h2 className="mt-3 text-3xl font-black text-slate-950">
                Other Chennai safety services
              </h2>
            </div>
            <Link
              href="/services"
              prefetch={false}
              className="inline-flex items-center gap-2 self-start rounded-lg border border-primary-200 px-4 py-3 text-sm font-black text-primary transition hover:border-secondary-300 hover:text-secondary md:self-auto"
            >
              View all services
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((related) => {
              const relatedVisuals = getServiceVisuals(related.slug);

              return (
                <Link
                  key={related.slug}
                  href={`/${chennaiConfig.citySlug}/${related.slug}`}
                  prefetch={false}
                  className="group overflow-hidden rounded-lg border border-slate-200 bg-[#F8FAFC] shadow-sm transition hover:border-secondary-300 hover:bg-white hover:shadow-md"
                >
                  <div className="relative min-h-[170px]">
                    <Image
                      src={relatedVisuals.context}
                      alt={`${related.name} Chennai service`}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-900/10 to-transparent" />
                    <span className="absolute bottom-3 left-3 rounded-full bg-secondary px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white">
                      Chennai
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="text-lg font-black text-slate-950">{related.name}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{related.angle}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-primary">
                      Open Chennai page
                      <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
