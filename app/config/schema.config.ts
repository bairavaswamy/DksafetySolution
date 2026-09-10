import { absoluteUrl, siteConfig } from "./site.config";

type SchemaValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | SchemaObject
  | readonly SchemaValue[];

type SchemaObject = {
  [key: string]: SchemaValue;
};

const compactObject = (value: SchemaObject): SchemaObject =>
  Object.fromEntries(
    Object.entries(value).filter(([, entry]) => {
      if (entry === undefined || entry === null || entry === "") {
        return false;
      }

      if (Array.isArray(entry)) {
        return entry.length > 0;
      }

      return true;
    })
  );

export const schemaIds = {
  localBusiness: absoluteUrl("/#local-business"),
  website: absoluteUrl("/#website"),
  organization: absoluteUrl("/#organization"),
  primaryImage: absoluteUrl("/#primary-image"),
  logoImage: absoluteUrl("/#logo-image"),
  siteFaq: absoluteUrl("/#site-faq"),
};

export const getPostalAddressSchema = () =>
  compactObject({
    "@type": "PostalAddress",
    streetAddress: siteConfig.business.address.streetAddress,
    addressLocality: siteConfig.business.address.addressLocality,
    addressRegion: siteConfig.business.address.addressRegion,
    postalCode: siteConfig.business.address.postalCode,
    addressCountry: siteConfig.business.address.addressCountry,
  });

export const getGeoSchema = () => {
  const { latitude, longitude } = siteConfig.business.geo;

  if (!latitude || !longitude) {
    return undefined;
  }

  return {
    "@type": "GeoCoordinates",
    latitude,
    longitude,
  };
};

export const getAreaServedSchema = () => ({
  "@type": "City",
  name: siteConfig.business.areaServed.city,
  address: {
    "@type": "PostalAddress",
    addressRegion: siteConfig.business.areaServed.region,
    addressCountry: siteConfig.business.areaServed.country,
  },
});

export const getLocalBusinessSchema = () =>
  compactObject({
    "@type": siteConfig.business.schemaTypes,
    "@id": schemaIds.localBusiness,
    name: siteConfig.name,
    legalName: siteConfig.business.legalName,
    url: siteConfig.url,
    logo: {
      "@id": schemaIds.logoImage,
    },
    image: {
      "@id": schemaIds.primaryImage,
    },
    hasMap: siteConfig.contact.googleBusiness.mapHref,
    telephone: siteConfig.contact.phoneLabel,
    email: siteConfig.contact.email,
    priceRange: siteConfig.business.priceRange,
    currenciesAccepted: siteConfig.business.currenciesAccepted,
    paymentAccepted: siteConfig.business.paymentAccepted,
    address: getPostalAddressSchema(),
    geo: getGeoSchema(),
    openingHoursSpecification: siteConfig.business.openingHours.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours.dayOfWeek,
      opens: hours.opens,
      closes: hours.closes,
    })),
    openingHours: ["Mo-Su 00:00-23:59"],
    areaServed: getAreaServedSchema(),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: siteConfig.business.contactType,
        telephone: siteConfig.contact.phoneLabel,
        email: siteConfig.contact.email,
        availableLanguage: ["en", "ta"],
        areaServed: siteConfig.business.areaServed.country,
      },
      {
        "@type": "ContactPoint",
        contactType: "WhatsApp enquiry",
        telephone: siteConfig.contact.phoneLabel,
        url: siteConfig.contact.whatsappHref,
        availableLanguage: ["en", "ta"],
      },
    ],
    sameAs: [
      ...siteConfig.socialProfiles.map((profile) => profile.href),
      siteConfig.contact.googleBusiness.shareUrl,
    ],
  });

export const getImageObjectSchema = ({
  id,
  url,
  name,
  caption,
}: {
  id: string;
  url: string;
  name: string;
  caption?: string;
}) =>
  compactObject({
    "@type": "ImageObject",
    "@id": id,
    url,
    contentUrl: url,
    name,
    caption,
    representativeOfPage: id === schemaIds.primaryImage,
  });

export const getOrganizationSchema = () => ({
  "@type": "Organization",
  "@id": schemaIds.organization,
  name: siteConfig.name,
  url: siteConfig.url,
  logo: {
    "@id": schemaIds.logoImage,
  },
  address: getPostalAddressSchema(),
  contactPoint: {
    "@type": "ContactPoint",
    contactType: siteConfig.business.contactType,
    telephone: siteConfig.contact.phoneLabel,
    email: siteConfig.contact.email,
    availableLanguage: ["en", "ta"],
  },
  sameAs: siteConfig.socialProfiles.map((profile) => profile.href),
});

export const getWebSiteSchema = () => ({
  "@type": "WebSite",
  "@id": schemaIds.website,
  name: siteConfig.name,
  url: siteConfig.url,
  publisher: {
    "@id": schemaIds.localBusiness,
  },
});

export const getSiteSchemaGraph = () => ({
  "@context": "https://schema.org",
  "@graph": [
    getLocalBusinessSchema(),
    getOrganizationSchema(),
    getWebSiteSchema(),
    getImageObjectSchema({
      id: schemaIds.logoImage,
      url: absoluteUrl(siteConfig.logos.desktopPng),
      name: `${siteConfig.name} logo`,
      caption: `${siteConfig.name} brand logo`,
    }),
    getImageObjectSchema({
      id: schemaIds.primaryImage,
      url: absoluteUrl(siteConfig.defaultImage),
      name: `${siteConfig.name} service image`,
      caption: siteConfig.description,
    }),
  ],
});

export const getWebPageSchema = ({
  url,
  name,
  description,
  image,
  type = "WebPage",
}: {
  url: string;
  name: string;
  description: string;
  image?: string;
  type?: string;
}) =>
  compactObject({
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "en-IN",
    isPartOf: {
      "@id": schemaIds.website,
    },
    about: {
      "@id": schemaIds.localBusiness,
    },
    primaryImageOfPage: image
      ? {
          "@type": "ImageObject",
          url: image,
        }
      : undefined,
  });

export const getServiceSchema = ({
  url,
  name,
  description,
  image,
  areaName,
}: {
  url: string;
  name: string;
  description: string;
  image?: string;
  areaName?: string;
}) =>
  compactObject({
    "@type": "Service",
    "@id": `${url}#service`,
    url,
    name,
    description,
    image,
    provider: {
      "@id": schemaIds.localBusiness,
    },
    areaServed: areaName
      ? {
          "@type": "Place",
          name: areaName,
          containedInPlace: getAreaServedSchema(),
        }
      : getAreaServedSchema(),
    mainEntityOfPage: {
      "@id": `${url}#webpage`,
    },
  });

export const getBreadcrumbListSchema = (
  items: Array<{
    name: string;
    url: string;
  }>
) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const getItemListSchema = ({
  url,
  name,
  items,
}: {
  url: string;
  name: string;
  items: Array<{
    name: string;
    url: string;
    description?: string;
  }>;
}) =>
  compactObject({
    "@type": "ItemList",
    "@id": `${url}#item-list`,
    name,
    itemListElement: items.map((item, index) =>
      compactObject({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: item.url,
        description: item.description,
      })
    ),
  });

export const getFAQPageSchema = (
  url: string,
  faq: ReadonlyArray<{
    question: string;
    answer: string;
  }>,
  id = `${url}#faq`
) => ({
  "@type": "FAQPage",
  "@id": id,
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
});

export const getGraphSchema = (items: SchemaObject[]) => ({
  "@context": "https://schema.org",
  "@graph": items,
});

export const stringifySchema = (schema: SchemaObject) =>
  JSON.stringify(schema).replace(/</g, "\\u003c");
