import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";
import {
  getBreadcrumbListSchema,
  getGraphSchema,
  getWebPageSchema,
  schemaIds,
  stringifySchema,
} from "../config/schema.config";
import { absoluteUrl, siteConfig } from "../config/site.config";

const url = absoluteUrl("/contact-us/");
const title = `Contact ${siteConfig.name}`;
const description = `Contact ${siteConfig.name} in Anna Nagar, Chennai for balcony safety nets, pigeon nets, invisible grills, sports nets, and cloth hanger installation.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: url,
  },
  keywords: [
    `contact ${siteConfig.name}`,
    siteConfig.domain,
    "DK Safety Solutions phone",
    "DK Safety Solutions Anna Nagar",
    "DK Safety Solutions Google Maps",
    "home safety enquiry",
  ],
  openGraph: {
    title,
    description,
    url,
    siteName: siteConfig.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: siteConfig.defaultImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} contact page`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [siteConfig.defaultImage],
  },
};

const contactJsonLd = stringifySchema(
  getGraphSchema([
    {
      ...getWebPageSchema({
        url,
        name: title,
        description,
        image: absoluteUrl(siteConfig.defaultImage),
        type: "ContactPage",
      }),
      mainEntity: {
        "@id": schemaIds.localBusiness,
      },
    },
    getBreadcrumbListSchema([
      { name: "Home", url: absoluteUrl("/") },
      { name: "Contact", url },
    ]),
  ])
);

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: contactJsonLd,
        }}
      />
      <ContactPageClient />
    </>
  );
}
