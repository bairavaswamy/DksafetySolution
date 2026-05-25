import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Building2, MapPin, Phone, ShieldCheck } from "lucide-react";
import CityServicePage from "../../components/CityServicePage";
import { chennaiConfig } from "../../config/chennai.config";
import {
  getBreadcrumbListSchema,
  getGraphSchema,
  getItemListSchema,
  getWebPageSchema,
  stringifySchema,
} from "../../config/schema.config";
import { absoluteUrl, siteConfig } from "../../config/site.config";
import {
  gatedCommunities,
  gatedCommunityServices,
  getGatedCommunity,
} from "../../content/gatedCommunityServicePages";
import {
  getAreaBySlug,
  getServiceBySlug,
} from "../../content/serviceAreaCatalog";
import { getServiceDetail } from "../../content/serviceDetails";
import { getServiceHeroImage } from "../../content/serviceVisuals";

type AreaPageProps = {
  params: {
    city: string;
    area: string;
  };
};

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...chennaiConfig.areas.map((area) => ({
      city: chennaiConfig.citySlug,
      area: area.slug,
    })),
    ...chennaiConfig.services.map((service) => ({
      city: chennaiConfig.citySlug,
      area: service.slug,
    })),
    ...gatedCommunities.map((community) => ({
      city: chennaiConfig.citySlug,
      area: community.slug,
    })),
  ];
}

export function generateMetadata({ params }: AreaPageProps): Metadata {
  const area = getAreaBySlug(params.area);
  const service = getServiceBySlug(params.area);
  const community = getGatedCommunity(params.area);

  if (params.city !== chennaiConfig.citySlug || (!area && !service && !community)) {
    return {
      title: "Page Not Found | DK Safety Solutions",
      description: "The requested Chennai service page could not be found.",
    };
  }

  if (service) {
    const detail = getServiceDetail(service.slug);
    const title = `${service.name} in Chennai | DK Safety Solutions`;
    const description = `${detail.shortBenefit} Chennai service checks for homes, apartments, communities, terraces, utility spaces, and open building edges.`;

    return {
      title,
      description,
      alternates: {
        canonical: absoluteUrl(`/${chennaiConfig.citySlug}/${service.slug}/`),
      },
      openGraph: {
        title,
        description,
        url: absoluteUrl(`/${chennaiConfig.citySlug}/${service.slug}/`),
        siteName: siteConfig.name,
        locale: "en_IN",
        type: "website",
        images: [
          {
            url: absoluteUrl(getServiceHeroImage(service.slug)),
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
    };
  }

  if (community) {
    const title = `${community.name} Safety Services in Chennai | DK Safety Solutions`;
    const description = `Choose balcony safety nets, pigeon safety nets, invisible grills, window safety nets, and anti bird nets for ${community.name}, ${community.locality}.`;

    return {
      title,
      description,
      alternates: {
        canonical: absoluteUrl(`/${chennaiConfig.citySlug}/${community.slug}/`),
      },
      openGraph: {
        title,
        description,
        url: absoluteUrl(`/${chennaiConfig.citySlug}/${community.slug}/`),
        siteName: siteConfig.name,
        locale: "en_IN",
        type: "website",
        images: [
          {
            url: absoluteUrl(chennaiConfig.areaImage),
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [absoluteUrl(chennaiConfig.areaImage)],
      },
    };
  }

  if (!area) {
    return {
      title: "Area Not Found | DK Safety Solutions",
      description: "The requested Chennai area page could not be found.",
    };
  }

  const title = `${area.name} Chennai Safety Services | DK Safety Solutions`;
  const description = `Browse DK Safety Solutions services in ${area.name}, Chennai, including safety nets, invisible grills, bird control, sports nets, and utility installations.`;

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(`/${chennaiConfig.citySlug}/${area.slug}/`),
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/${chennaiConfig.citySlug}/${area.slug}/`),
      siteName: siteConfig.name,
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: absoluteUrl(chennaiConfig.areaImage),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

const getNearbyAreas = (areaSlug: string) => {
  const index = chennaiConfig.areas.findIndex((item) => item.slug === areaSlug);
  const start = Math.max(0, index - 4);

  return chennaiConfig.areas
    .slice(start, start + 9)
    .filter((area) => area.slug !== areaSlug)
    .slice(0, 8);
};

export default function AreaPage({ params }: AreaPageProps) {
  const area = getAreaBySlug(params.area);
  const service = getServiceBySlug(params.area);
  const community = getGatedCommunity(params.area);

  if (params.city !== chennaiConfig.citySlug || (!area && !service && !community)) {
    notFound();
  }

  if (service) {
    return <CityServicePage service={service} />;
  }

  if (community) {
    const pageUrl = absoluteUrl(`/${chennaiConfig.citySlug}/${community.slug}/`);
    const jsonLd = getGraphSchema([
      getWebPageSchema({
        url: pageUrl,
        name: `${community.name} Safety Services`,
        description: community.homeMix,
        image: absoluteUrl(chennaiConfig.areaImage),
        type: "CollectionPage",
      }),
      getBreadcrumbListSchema([
        { name: "Home", url: absoluteUrl("/") },
        { name: "Chennai", url: absoluteUrl(`/${chennaiConfig.citySlug}/`) },
        { name: "Gated Communities", url: absoluteUrl(`/${chennaiConfig.citySlug}/gated-communities/`) },
        { name: community.name, url: pageUrl },
      ]),
      getItemListSchema({
        url: pageUrl,
        name: `${community.name} safety services`,
        items: gatedCommunityServices.map((communityService) => ({
          name: communityService.name,
          url: absoluteUrl(
            `/${chennaiConfig.citySlug}/${community.slug}/${communityService.slug}/`
          ),
          description: communityService.quietWin,
        })),
      }),
    ]);

    return (
      <main className="bg-white text-slate-950">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: stringifySchema(jsonLd),
          }}
        />
        <section className="relative overflow-hidden bg-slate-950 px-4 py-16 text-white lg:px-6">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-sky-300">
              {community.locality} | {community.corridor}
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight sm:text-5xl">
              Safety services for {community.name}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-200">
              {community.homeMix}. Choose the service page below for community-specific checks,
              access notes, images, FAQs, and quote details.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={`/${chennaiConfig.citySlug}/gated-communities`}
                prefetch={false}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                All gated communities
                <ArrowRight size={16} />
              </Link>
              <a
                href={siteConfig.contact.phoneHref}
                className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-sky-600"
              >
                <Phone size={16} />
                Call for visit
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 lg:px-6">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
            <Building2 className="text-sky-600" size={24} />
            <p className="mt-3 text-sm font-bold uppercase tracking-[0.18em] text-sky-700">
              Community Details
            </p>
            <p className="mt-2 text-lg font-black text-slate-950">{community.addressNote}</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">{community.accessNote}</p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {gatedCommunityServices.map((communityService) => (
              <Link
                key={communityService.slug}
                href={`/${chennaiConfig.citySlug}/${community.slug}/${communityService.slug}`}
                prefetch={false}
                className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-sky-300 hover:shadow-md"
              >
                <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-600">
                  {community.locality}
                </p>
                <h2 className="mt-2 text-2xl font-black text-slate-950">
                  {communityService.name}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {communityService.quietWin}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-sky-700">
                  Open service page
                  <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    );
  }

  if (!area) {
    notFound();
  }

  const nearbyAreas = getNearbyAreas(area.slug);
  const firstService = chennaiConfig.services[0];
  const pageUrl = absoluteUrl(`/${chennaiConfig.citySlug}/${area.slug}/`);
  const pageTitle = `${area.name} Chennai Safety Services | DK Safety Solutions`;
  const pageDescription = `Browse DK Safety Solutions services in ${area.name}, Chennai, including safety nets, invisible grills, bird control, sports nets, and utility installations.`;
  const jsonLd = getGraphSchema([
    getWebPageSchema({
      url: pageUrl,
      name: pageTitle,
      description: pageDescription,
      image: absoluteUrl(chennaiConfig.areaImage),
      type: "CollectionPage",
    }),
    getBreadcrumbListSchema([
      { name: "Home", url: absoluteUrl("/") },
      { name: "Chennai", url: absoluteUrl(`/${chennaiConfig.citySlug}/`) },
      { name: area.name, url: pageUrl },
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
            src={chennaiConfig.areaImage}
            alt={`${area.name} safety services`}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-900/35" />
        </div>

        <div className="relative mx-auto grid min-h-[560px] max-w-7xl items-center gap-8 px-4 py-16 lg:grid-cols-[1fr_0.75fr] lg:px-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-lime-300">
              {area.name} Chennai
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              All safety services in {area.name}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-100">
              Choose the right service for {area.name}, from balcony and window
              safety to bird control, sports netting, building coverage, and utility
              installations.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={siteConfig.contact.phoneHref}
                className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-3 font-bold text-white shadow-lg transition hover:bg-sky-600"
              >
                <Phone size={18} />
                Call for {area.name}
              </a>
              <Link
                href={`/${chennaiConfig.citySlug}/${area.slug}/${firstService.slug}`}
                prefetch={false}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-3 font-bold text-white backdrop-blur transition hover:bg-white/20"
              >
                Start with {firstService.name}
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-white/15 bg-white/12 p-6 text-white shadow-2xl backdrop-blur-md">
            <MapPin size={26} className="text-lime-200" />
            <h2 className="mt-4 text-2xl font-black">{area.name} service hub</h2>
            <p className="mt-3 text-sm leading-7 text-slate-100">
              Each card below opens a direct service page for {area.name}, with
              area-specific checks, nearby links, and contact actions.
            </p>
            <Link
              href={`/${chennaiConfig.citySlug}/${area.slug}/${firstService.slug}`}
              prefetch={false}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-sky-50"
            >
              Open first service
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-6">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-500">
            Services in {area.name}
          </p>
          <h2 className="mt-3 text-3xl font-black text-slate-950">
            Choose the exact service page
          </h2>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {chennaiConfig.services.map((service) => {
            const detail = getServiceDetail(service.slug);

            return (
              <article key={service.slug} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="relative h-44">
                  <Image
                    src={detail.cardImage}
                    alt={`${service.name} installation photo in ${area.name}, Chennai`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-500">
                      {detail.category}
                    </p>
                    <ShieldCheck className="shrink-0 text-indigo-700" size={18} />
                  </div>
                  <h3 className="mt-2 text-xl font-black text-slate-950">
                    {service.name}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{detail.shortBenefit}</p>
                  <Link
                    href={`/${chennaiConfig.citySlug}/${area.slug}/${service.slug}`}
                    prefetch={false}
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-800"
                  >
                    Open {area.name} page
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-14 lg:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-700">
                Nearby Areas
              </p>
              <h2 className="mt-3 text-3xl font-black text-slate-950">
                Move to nearby Chennai service hubs
              </h2>
            </div>
            <Link
              href={`/${chennaiConfig.citySlug}`}
              prefetch={false}
              className="inline-flex items-center gap-2 rounded-full border border-indigo-200 px-5 py-3 text-sm font-bold text-indigo-700 transition hover:border-indigo-400 hover:bg-indigo-50"
            >
              View all areas
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {nearbyAreas.map((nearby) => (
              <Link
                key={nearby.slug}
                href={`/${chennaiConfig.citySlug}/${nearby.slug}`}
                prefetch={false}
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-4 text-sm font-bold text-slate-800 shadow-sm transition hover:border-sky-300 hover:text-sky-600"
              >
                {nearby.name}
                <ArrowRight size={16} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
