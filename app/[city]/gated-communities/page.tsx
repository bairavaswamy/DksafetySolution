import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Building2 } from "lucide-react";
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
} from "../../content/gatedCommunityServicePages";
import { getCityStaticParams } from "../../content/staticRoutes";

type GatedCommunitiesIndexProps = {
  params: {
    city: string;
  };
};

const pageTitle = "Gated Community Safety Services in Chennai | DK Safety Solutions";
const pageDescription =
  "Find balcony safety nets, pigeon safety nets, invisible grills, window safety nets, and anti bird nets for popular gated communities in Chennai.";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCityStaticParams();
}

export function generateMetadata({ params }: GatedCommunitiesIndexProps): Metadata {
  const url = absoluteUrl(`/${chennaiConfig.citySlug}/gated-communities/`);

  if (params.city !== chennaiConfig.citySlug) {
    return {
      title: "Gated Communities Not Found | DK Safety Solutions",
      description: "The requested gated communities page could not be found.",
    };
  }

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url,
      siteName: siteConfig.name,
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: absoluteUrl(siteConfig.defaultImage),
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [absoluteUrl(siteConfig.defaultImage)],
    },
  };
}

export default function GatedCommunitiesIndex({
  params,
}: GatedCommunitiesIndexProps) {
  if (params.city !== chennaiConfig.citySlug) {
    notFound();
  }

  const pageUrl = absoluteUrl(`/${chennaiConfig.citySlug}/gated-communities/`);
  const jsonLd = getGraphSchema([
    getWebPageSchema({
      url: pageUrl,
      name: pageTitle,
      description: pageDescription,
      type: "CollectionPage",
    }),
    getBreadcrumbListSchema([
      { name: "Home", url: absoluteUrl("/") },
      { name: "Chennai", url: absoluteUrl(`/${chennaiConfig.citySlug}/`) },
      { name: "Gated Communities", url: pageUrl },
    ]),
    getItemListSchema({
      url: pageUrl,
      name: "Popular gated communities in Chennai",
      items: gatedCommunities.map((community) => ({
        name: community.name,
        url: absoluteUrl(`/${chennaiConfig.citySlug}/${community.slug}/`),
        description: `${community.locality} | ${community.homeMix}`,
      })),
    }),
  ]);

  return (
    <main className="bg-white text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: stringifySchema(jsonLd) }}
      />
      <section className="bg-slate-950 px-4 py-16 text-white lg:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-primary-300">
            Chennai gated communities
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight sm:text-5xl">
            Choose a society, then open the exact safety service page
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-200">
            These pages follow the same Chennai area-service URL pattern, so each
            society works like a service area with five focused service pages.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-6">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {gatedCommunities.map((community) => (
            <article
              key={community.slug}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <Building2 className="text-primary-600" size={24} />
              <h2 className="mt-3 text-2xl font-black text-slate-950">
                {community.name}
              </h2>
              <p className="mt-2 text-sm font-semibold text-slate-500">
                {community.locality} | {community.corridor}
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {community.homeMix}
              </p>
              <Link
                href={`/${chennaiConfig.citySlug}/${community.slug}`}
                prefetch={false}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-800"
              >
                Open society page
                <ArrowRight size={15} />
              </Link>
              <div className="mt-5 grid gap-2">
                {gatedCommunityServices.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/${chennaiConfig.citySlug}/${community.slug}/${service.slug}`}
                    prefetch={false}
                    className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-800 transition hover:border-primary-300 hover:text-primary-600"
                  >
                    {service.name}
                    <ArrowRight size={15} />
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
