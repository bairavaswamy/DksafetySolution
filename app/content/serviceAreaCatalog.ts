import { chennaiConfig } from "../config/chennai.config";
import { gatedCommunityPages } from "./gatedCommunityServicePages";
import { manualServicePages } from "./manualServicePages";
import { manualServiceAreaEntries } from "./service-areas";

export type ChennaiArea = (typeof chennaiConfig.areas)[number];
export type ChennaiService = (typeof chennaiConfig.services)[number];

export type ServiceAreaParams = {
  city: string;
  area: string;
  service: string;
};

export const serviceAreaEntryKey = (params: ServiceAreaParams) =>
  `${params.city}/${params.area}/${params.service}`;

const entriesByKey = new Map(
  manualServiceAreaEntries.map((entry) => [serviceAreaEntryKey({
    city: entry.citySlug,
    area: entry.areaSlug,
    service: entry.serviceSlug,
  }), entry])
);

const manualPageKeys = new Set(
  manualServicePages.map((page) =>
    serviceAreaEntryKey({
      city: page.citySlug,
      area: page.areaSlug,
      service: page.serviceSlug,
    })
  )
);

export const getAllServiceAreaPaths = (): ServiceAreaParams[] => {
  const paths: ServiceAreaParams[] = [
    ...manualServiceAreaEntries.map((entry) => ({
      city: entry.citySlug,
      area: entry.areaSlug,
      service: entry.serviceSlug,
    })),
    ...manualServicePages.map((page) => ({
      city: page.citySlug,
      area: page.areaSlug,
      service: page.serviceSlug,
    })),
    ...gatedCommunityPages.map((page) => ({
      city: page.citySlug,
      area: page.community.slug,
      service: page.service.slug,
    })),
  ];

  return Array.from(
    new Map(paths.map((params) => [serviceAreaEntryKey(params), params])).values()
  );
};

export const getAreaBySlug = (slug: string) =>
  chennaiConfig.areas.find((area) => area.slug === slug);

export const getServiceBySlug = (slug: string) =>
  chennaiConfig.services.find((service) => service.slug === slug);

export const getServiceAreaEntry = (params: ServiceAreaParams) =>
  entriesByKey.get(serviceAreaEntryKey(params));

export const getEntriesForArea = (areaSlug: string) =>
  manualServiceAreaEntries.filter((entry) => entry.areaSlug === areaSlug);

export const getEntriesForService = (serviceSlug: string) =>
  manualServiceAreaEntries.filter((entry) => entry.serviceSlug === serviceSlug);

export const hasManualArticle = (params: ServiceAreaParams) =>
  manualPageKeys.has(serviceAreaEntryKey(params));

export const serviceAreaStats = {
  areaCount: chennaiConfig.areas.length,
  serviceCount: chennaiConfig.services.length,
  entryCount: manualServiceAreaEntries.length,
  manualArticleCount: manualServicePages.length,
} as const;
