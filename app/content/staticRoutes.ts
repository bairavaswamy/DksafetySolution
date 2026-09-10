import { chennaiConfig } from "../config/chennai.config";
import { gatedCommunities } from "./gatedCommunityServicePages";
import { getAllServiceAreaPaths } from "./serviceAreaCatalog";

export type CityStaticParams = {
  city: string;
};

export type HubStaticParams = CityStaticParams & {
  area: string;
};

export const getCityStaticParams = (): CityStaticParams[] => [
  { city: chennaiConfig.citySlug },
];

// The [area] segment serves neighborhood, city-service, and community hubs.
export const getHubStaticParams = (): HubStaticParams[] =>
  Array.from(
    new Set([
      ...chennaiConfig.areas.map((area) => area.slug),
      ...chennaiConfig.services.map((service) => service.slug),
      ...gatedCommunities.map((community) => community.slug),
    ])
  ).map((area) => ({ city: chennaiConfig.citySlug, area }));

// Shared with export validation so every published route must have an HTML file.
export const getStaticPagePaths = (): string[] => [
  "/",
  "/about/",
  "/contact-us/",
  "/gallery/",
  "/request-quote/",
  "/services/",
  ...getCityStaticParams().flatMap(({ city }) => [
    `/${city}/`,
    `/${city}/gated-communities/`,
  ]),
  ...getHubStaticParams().map(({ city, area }) => `/${city}/${area}/`),
  ...getAllServiceAreaPaths().map(
    ({ city, area, service }) => `/${city}/${area}/${service}/`
  ),
];
