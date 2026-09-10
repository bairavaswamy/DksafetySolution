import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import ChennaiServiceFinder from "../components/ChennaiServiceFinder";
import { chennaiConfig } from "../config/chennai.config";
import {
  getBreadcrumbListSchema,
  getGraphSchema,
  getWebPageSchema,
  stringifySchema,
} from "../config/schema.config";
import { absoluteUrl, siteConfig } from "../config/site.config";
import { getServiceDetail } from "../content/serviceDetails";
import { getCityStaticParams } from "../content/staticRoutes";

type CityPageProps = {
  params: {
    city: string;
  };
};

export const dynamicParams = false;

const cityPageTitle = "Safety Nets & Invisible Grills in Chennai | DK Safety Solutions";
const cityPageDescription =
  "Explore safety nets, invisible grills, bird control, sports nets and cloth hangers in Chennai. Compare 16 services, local guides and installation requirements.";

export function generateStaticParams() {
  return getCityStaticParams();
}

export function generateMetadata({ params }: CityPageProps): Metadata {
  if (params.city !== chennaiConfig.citySlug) {
    return {
      title: "City Not Found | DK Safety Solutions",
      description: "The requested city service page could not be found.",
    };
  }

  return {
    title: cityPageTitle,
    description: cityPageDescription,
    alternates: {
      canonical: absoluteUrl(`/${chennaiConfig.citySlug}/`),
    },
    openGraph: {
      title: cityPageTitle,
      description: cityPageDescription,
      url: absoluteUrl(`/${chennaiConfig.citySlug}/`),
      siteName: siteConfig.name,
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: absoluteUrl(chennaiConfig.heroImage),
          width: 1200,
          height: 630,
          alt: cityPageTitle,
        },
      ],
    },
  };
}

export default function ChennaiPage({ params }: CityPageProps) {
  if (params.city !== chennaiConfig.citySlug) {
    notFound();
  }

  const defaultArea = chennaiConfig.areas[0];
  const pageUrl = absoluteUrl(`/${chennaiConfig.citySlug}/`);
  const jsonLd = getGraphSchema([
    getWebPageSchema({
      url: pageUrl,
      name: cityPageTitle,
      description: cityPageDescription,
      image: absoluteUrl(chennaiConfig.heroImage),
      type: "CollectionPage",
    }),
    getBreadcrumbListSchema([
      { name: "Home", url: absoluteUrl("/") },
      { name: "Chennai", url: pageUrl },
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
            src={chennaiConfig.heroImage}
            alt="Chennai safety services"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/[0.82] to-slate-900/35" />
        </div>

        <div className="relative mx-auto grid min-h-[660px] max-w-7xl items-center gap-8 px-4 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-secondary-300">
              Chennai Service Directory
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              Safety nets, invisible grills and more in Chennai
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-100">
              Find the right system for a balcony, window, building opening,
              sports ground, or utility space. Compare the service options below,
              explore your Chennai area, and share the details needed for a
              site-specific installation quote.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {["Safety nets", "Invisible grills", "Bird control"].map((item) => (
                <div key={item} className="rounded-lg border border-white/15 bg-white/10 p-4 text-white backdrop-blur">
                  <p className="text-base font-black">{item}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">
                    Made for Chennai apartments, homes, and shared spaces.
                  </p>
                </div>
              ))}
            </div>
          </div>

          <ChennaiServiceFinder
            citySlug={chennaiConfig.citySlug}
            areas={chennaiConfig.areas}
            services={chennaiConfig.services}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary-600">Choose by requirement</p>
        <h2 className="mt-3 text-3xl font-black">Which safety service does your property need?</h2>
        <p className="mt-5 max-w-4xl text-base leading-8 text-slate-700">
          Start with the problem you want to solve. Keeping pigeons out of a
          utility balcony, guarding an opening used by children, and containing
          a cricket ball involve different systems. The appearance of a net or
          cable alone cannot establish whether it suits the intended use. A useful
          assessment considers the complete opening, the support surface, access
          for installation, and how the area will be cleaned and used afterwards.
        </p>
        <div className="mt-7 grid gap-6 md:grid-cols-3">
          {[
            { title: "Home openings and family use", text: "Compare balcony, window, children and staircase safety nets with invisible grills. Discuss the specific opening, existing guards, climbing opportunities, ventilation and any emergency access before choosing. Bird exclusion mesh should not be assumed to provide child fall protection. Keep the intended purpose clear in the proposed system and its supporting documentation.", href: "/chennai/balcony-safety-nets/", link: "Compare balcony protection" },
            { title: "Pigeons, ledges and service shafts", text: "Nets enclose entry routes, while spikes deter landing on suitable narrow surfaces. A balcony opening, an AC recess and a shared duct may each need a different approach. Check that birds are outside before closure and that maintenance teams can still reach equipment. Your guide explains the tradeoffs and the details to confirm in a quote.", href: "/chennai/pigeon-safety-nets/", link: "Explore bird exclusion" },
            { title: "Sports, buildings and utility spaces", text: "Sports nets depend on ball type, surrounding activity and the supporting structure. Building mesh, terrace enclosures, pool covers and ceiling hangers each have a separate purpose and assessment. A protective mesh is not automatically a load-bearing fall-arrest system. Use the individual service guides to identify the design, access and maintenance questions relevant to your project.", href: "/chennai/football-sports-nets/", link: "Explore sports containment" },
          ].map((item) => (
            <article key={item.title} className="rounded-lg border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-xl font-black">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-700">{item.text}</p>
              <Link href={item.href} prefetch={false} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary-700">{item.link}<ArrowRight size={16} /></Link>
            </article>
          ))}
        </div>
        <p className="mt-7 max-w-4xl text-base leading-8 text-slate-700">
          For a Chennai enquiry, share your neighborhood, floor level, photographs
          of the opening and fixing edges, approximate dimensions, and the main
          reason for the work. Mention association timings, permission to drill,
          existing damage, and access needed for AC servicing or routine cleaning.
          Compare quotes against the same material and installation scope, including
          access equipment, removal of old material, and written maintenance or
          warranty terms where offered.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 lg:px-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary-500">
              Services
            </p>
            <h2 className="mt-3 text-3xl font-black text-slate-950">
              Explore our Chennai service guides
            </h2>
          </div>
          <Link
            href={`/${chennaiConfig.citySlug}/${defaultArea.slug}`}
            prefetch={false}
            className="inline-flex items-center gap-2 rounded-full border border-primary-200 px-5 py-3 text-sm font-bold text-primary-600 transition hover:border-primary-400 hover:bg-primary-50"
          >
            Open {defaultArea.name}
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {chennaiConfig.services.map((service) => {
            const detail = getServiceDetail(service.slug);

            return (
              <article key={service.slug} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="relative h-44">
                  <Image
                    src={detail.cardImage}
                    alt={`${service.name} service photo in Chennai`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-500">
                    {detail.category}
                  </p>
                  <h3 className="mt-2 text-xl font-black text-slate-950">{service.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{service.angle}</p>
                  <Link
                    href={`/${chennaiConfig.citySlug}/${service.slug}`}
                    prefetch={false}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary-600 transition hover:text-primary-700"
                  >
                    View service details
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
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary-700">
                Areas
              </p>
              <h2 className="mt-3 text-3xl font-black text-slate-950">
                Chennai service areas
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-600">
              Explore installation considerations for your neighborhood. Share the
              exact property address and access conditions when arranging a visit.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {chennaiConfig.areas.map((area) => (
              <article key={area.slug} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                      Chennai
                    </p>
                    <h3 className="mt-2 text-lg font-black text-slate-950">{area.name}</h3>
                  </div>
                  <MapPin className="shrink-0 text-primary-700" size={21} />
                </div>
                <Link
                  href={`/${chennaiConfig.citySlug}/${area.slug}`}
                  prefetch={false}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary-600"
                >
                  View all services
                  <ArrowRight size={15} />
                </Link>
                <Link
                  href={`/${chennaiConfig.citySlug}/${area.slug}/${chennaiConfig.services[0].slug}`}
                  prefetch={false}
                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-800"
                >
                  Start with {chennaiConfig.services[0].name}
                  <ArrowRight size={15} />
                </Link>
                <div className="mt-4 grid gap-2">
                  {chennaiConfig.services.slice(0, 3).map((service) => (
                    <Link
                      key={service.slug}
                      href={`/${chennaiConfig.citySlug}/${area.slug}/${service.slug}`}
                      prefetch={false}
                      className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-primary-300 hover:text-primary-600"
                    >
                      {service.name}
                      <ArrowRight size={14} />
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            "Describe the intended use before selecting a net, cable, frame or fixing method.",
            "Compare quotes using the same coverage, material specification and installation scope.",
            "Confirm how cleaning, servicing and inspections will work after installation.",
          ].map((item) => (
            <div key={item} className="flex gap-3 rounded-lg border border-primary-100 bg-primary-50 p-5 text-sm font-semibold leading-6 text-slate-700">
              <CheckCircle2 className="mt-0.5 shrink-0 text-primary-700" size={18} />
              {item}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
