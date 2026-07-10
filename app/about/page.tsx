import type { Metadata } from "next";
import AboutClient from "../components/aboutClient";
import {
  getBreadcrumbListSchema,
  getGraphSchema,
  getWebPageSchema,
  schemaIds,
  stringifySchema,
} from "../config/schema.config";
import { absoluteUrl, siteConfig } from "../config/site.config";

const title = `About ${siteConfig.name}`;
const description =
  "Learn how DK Safety Solutions plans Chennai safety net, invisible grill, bird-control, sports net, and utility installations.";
const aboutUrl = absoluteUrl("/about/");

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: aboutUrl,
  },
  openGraph: {
    title,
    description,
    url: aboutUrl,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.defaultImage,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [siteConfig.defaultImage],
  },
};

const aboutJsonLd = stringifySchema(
  getGraphSchema([
    {
      ...getWebPageSchema({
        url: aboutUrl,
        name: title,
        description,
        image: absoluteUrl(siteConfig.defaultImage),
        type: "AboutPage",
      }),
      about: {
        "@id": schemaIds.localBusiness,
      },
    },
    getBreadcrumbListSchema([
      { name: "Home", url: absoluteUrl("/") },
      { name: "About", url: aboutUrl },
    ]),
  ])
);

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: aboutJsonLd,
        }}
      />
      <AboutClient />
    </>
  );
}
