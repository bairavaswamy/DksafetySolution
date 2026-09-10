import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GatedCommunityServiceArticle from "../../../components/GatedCommunityServiceArticle";
import ManualServiceArticle from "../../../components/ManualServiceArticle";
import ManualEntryServicePage from "../../../components/ManualEntryServicePage";
import { getGatedCommunityPage } from "../../../content/gatedCommunityServicePages";
import { getManualServicePage } from "../../../content/manualPageRegistry";
import {
  getAllServiceAreaPaths,
  getAreaBySlug,
  getServiceAreaEntry,
  getServiceBySlug,
} from "../../../content/serviceAreaCatalog";
import { getServiceDetail, type ServiceSlug } from "../../../content/serviceDetails";
import { getServiceHeroImage } from "../../../content/serviceVisuals";
import {
  getBreadcrumbListSchema,
  getFAQPageSchema,
  getGraphSchema,
  getServiceSchema,
  getWebPageSchema,
  stringifySchema,
} from "../../../config/schema.config";
import { siteConfig } from "../../../config/site.config";

type ManualRouteParams = {
  city: string;
  area: string;
  service: string;
};

type ManualRouteProps = {
  params: ManualRouteParams;
};

export const dynamicParams = false;

export function generateStaticParams(): ManualRouteParams[] {
  return getAllServiceAreaPaths();
}

function absoluteUrl(path: string) {
  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  return `${baseUrl}${cleanPath}`;
}

function getManualPageUrl(page: {
  citySlug: string;
  areaSlug: string;
  serviceSlug: string;
}) {
  return absoluteUrl(
    `/${page.citySlug}/${page.areaSlug}/${page.serviceSlug}/`
  );
}

function getAbsoluteImageUrl(image?: string) {
  const defaultImage = siteConfig.defaultImage;

  const resolvedImage = image || defaultImage;

  if (
    resolvedImage.startsWith("http://") ||
    resolvedImage.startsWith("https://")
  ) {
    return resolvedImage;
  }

  return absoluteUrl(
    resolvedImage.startsWith("/") ? resolvedImage : `/${resolvedImage}`
  );
}

export function generateMetadata({
  params,
}: ManualRouteProps): Metadata {
  const resolvedParams = params;
  const gatedPage = getGatedCommunityPage({
    community: resolvedParams.area,
    service: resolvedParams.service,
  });

  if (resolvedParams.city === "chennai" && gatedPage) {
    const url = getManualPageUrl({
      citySlug: gatedPage.citySlug,
      areaSlug: gatedPage.community.slug,
      serviceSlug: gatedPage.service.slug,
    });
    const imageUrl = getAbsoluteImageUrl(gatedPage.images.hero);

    return {
      title: gatedPage.metadata.title,
      description: gatedPage.metadata.description,
      keywords: gatedPage.metadata.keywords,
      alternates: {
        canonical: url,
      },
      openGraph: {
        title: gatedPage.metadata.title,
        description: gatedPage.metadata.description,
        url,
        siteName: siteConfig.name,
        locale: "en_IN",
        type: "article",
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: gatedPage.hero.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: gatedPage.metadata.title,
        description: gatedPage.metadata.description,
        images: [imageUrl],
      },
    };
  }

  // Prefer the long-form service page when one exists.
  const manualPage = getManualServicePage(resolvedParams);

  if (manualPage) {
    // Return long-form page metadata.
    const url = `${siteConfig.url}/${resolvedParams.city}/${resolvedParams.area}/${resolvedParams.service}/`;
    const imageUrl = getAbsoluteImageUrl(
      getServiceHeroImage(manualPage.serviceSlug as ServiceSlug)
    );

    return {
      title: manualPage.metadata.title,
      description: manualPage.metadata.description,
      keywords: manualPage.metadata.keywords,
      alternates: {
        canonical: url,
      },
      openGraph: {
        title: manualPage.metadata.openGraphTitle || manualPage.metadata.title,
        description:
          manualPage.metadata.openGraphDescription || manualPage.metadata.description,
        url,
        siteName: siteConfig.name,
        locale: "en_IN",
        type: "article",
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: manualPage.hero.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: manualPage.metadata.twitterTitle || manualPage.metadata.title,
        description:
          manualPage.metadata.twitterDescription || manualPage.metadata.description,
        images: [imageUrl],
      },
    };
  }

  const entry = getServiceAreaEntry(resolvedParams);
  const area = getAreaBySlug(resolvedParams.area);
  const service = getServiceBySlug(resolvedParams.service);

  if (!entry || !area || !service) {
    return {
      title: "Service Not Found | DK Safety Solutions",
      description: "The requested service page could not be found.",
    };
  }

  const detail = getServiceDetail(service.slug);
  const title = `${service.name} in ${area.name} Chennai | DK Safety Solutions`;
  const description = `${detail.shortBenefit} ${entry.localAngle} Contact DK Safety Solutions for ${area.name}, Chennai service.`;
  const url = `${siteConfig.url}/${resolvedParams.city}/${resolvedParams.area}/${resolvedParams.service}/`;
  const imageUrl = getAbsoluteImageUrl(getServiceHeroImage(service.slug));

  return {
    title,
    description,
    keywords: [
      `${service.name.toLowerCase()} in ${area.name}`,
      `${service.name.toLowerCase()} Chennai`,
      `${area.name} ${service.name.toLowerCase()}`,
      `DK Safety Solutions Chennai`,
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: "en_IN",
      type: "article",
      images: [
        {
          url: imageUrl,
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
      images: [imageUrl],
    },
  };
}

export default function ManualServiceRoute({
  params,
}: ManualRouteProps) {
  const resolvedParams = params;
  const gatedPage = getGatedCommunityPage({
    community: resolvedParams.area,
    service: resolvedParams.service,
  });

  if (resolvedParams.city === "chennai" && gatedPage) {
    const url = getManualPageUrl({
      citySlug: gatedPage.citySlug,
      areaSlug: gatedPage.community.slug,
      serviceSlug: gatedPage.service.slug,
    });
    const imageUrl = getAbsoluteImageUrl(gatedPage.images.hero);

    const jsonLd = getGraphSchema([
      getWebPageSchema({
        url,
        name: gatedPage.metadata.title,
        description: gatedPage.metadata.description,
        image: imageUrl,
      }),
      getServiceSchema({
        url,
        name: gatedPage.metadata.title,
        description: gatedPage.metadata.description,
        image: imageUrl,
        areaName: `${gatedPage.community.name}, ${gatedPage.community.locality}, Chennai`,
      }),
      getFAQPageSchema(url, gatedPage.faq),
      getBreadcrumbListSchema([
        { name: "Home", url: absoluteUrl("/") },
        { name: "Chennai", url: absoluteUrl(`/${gatedPage.citySlug}/`) },
        {
          name: gatedPage.community.name,
          url: absoluteUrl(`/${gatedPage.citySlug}/${gatedPage.community.slug}/`),
        },
        { name: gatedPage.service.name, url },
      ]),
    ]);

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: stringifySchema(jsonLd),
          }}
        />
        <GatedCommunityServiceArticle page={gatedPage} />
      </>
    );
  }

  // Prefer the long-form service page when one exists.
  const manualPage = getManualServicePage(resolvedParams);

  if (manualPage) {
    // Render the long-form page with existing logic.
    const url = getManualPageUrl(manualPage);
    const imageUrl = getAbsoluteImageUrl(
      getServiceHeroImage(manualPage.serviceSlug as ServiceSlug)
    );

    const jsonLd = getGraphSchema([
      getWebPageSchema({
        url,
        name: manualPage.metadata.title,
        description: manualPage.metadata.description,
        image: imageUrl,
      }),
      getServiceSchema({
        url,
        name: manualPage.metadata.title,
        description: manualPage.metadata.description,
        image: imageUrl,
        areaName: `${manualPage.areaSlug}, Chennai`,
      }),
      getFAQPageSchema(url, manualPage.faq),
      getBreadcrumbListSchema([
        { name: "Home", url: absoluteUrl("/") },
        { name: "Chennai", url: absoluteUrl(`/${manualPage.citySlug}/`) },
        {
          name: manualPage.areaSlug,
          url: absoluteUrl(`/${manualPage.citySlug}/${manualPage.areaSlug}/`),
        },
        { name: manualPage.hero.title, url },
      ]),
    ]);

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: stringifySchema(jsonLd),
          }}
        />
        <ManualServiceArticle page={manualPage} />
      </>
    );
  }

  const entry = getServiceAreaEntry(resolvedParams);
  const area = getAreaBySlug(resolvedParams.area);
  const service = getServiceBySlug(resolvedParams.service);

  if (!entry || !area || !service) {
    notFound();
  }

  const url = absoluteUrl(
    `/${resolvedParams.city}/${resolvedParams.area}/${resolvedParams.service}/`
  );
  const imageUrl = getAbsoluteImageUrl(getServiceHeroImage(service.slug));
  const pageTitle = `${service.name} in ${area.name} Chennai`;
  const jsonLd = getGraphSchema([
    getWebPageSchema({
      url,
      name: pageTitle,
      description: entry.localAngle,
      image: imageUrl,
    }),
    getServiceSchema({
      url,
      name: pageTitle,
      description: entry.localAngle,
      image: imageUrl,
      areaName: `${area.name}, Chennai`,
    }),
    getBreadcrumbListSchema([
      { name: "Home", url: absoluteUrl("/") },
      { name: "Chennai", url: absoluteUrl(`/${resolvedParams.city}/`) },
      { name: area.name, url: absoluteUrl(`/${resolvedParams.city}/${area.slug}/`) },
      { name: service.name, url },
    ]),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: stringifySchema(jsonLd),
        }}
      />
      <ManualEntryServicePage area={area} service={service} entry={entry} />
    </>
  );
}
