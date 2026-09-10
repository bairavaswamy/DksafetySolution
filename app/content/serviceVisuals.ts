import { chennaiConfig } from "../config/chennai.config";
import type { ManualServicePage } from "./types";

export type ServiceSlug = (typeof chennaiConfig.services)[number]["slug"];

export type ServiceVisualSet = {
  hero: string;
  mobileHero: string;
  detail: string;
  context: string;
  areaCard: string;
};

// These static WebP variants come from the reviewed source manifest in
// scripts/service-image-sources.json. Regenerate with generate:service-images.
const imageSet = (slug: ServiceSlug): ServiceVisualSet => ({
  hero: `/images/services/${slug}/${slug}-hero.webp`,
  mobileHero: `/images/services/${slug}/${slug}-mobile-hero.webp`,
  detail: `/images/services/${slug}/${slug}-detail.webp`,
  context: `/images/services/${slug}/${slug}-context.webp`,
  areaCard: `/images/services/${slug}/${slug}-area-card.webp`,
});

export const serviceVisualsBySlug = Object.fromEntries(
  chennaiConfig.services.map((service) => [service.slug, imageSet(service.slug)])
) as Record<ServiceSlug, ServiceVisualSet>;

export const getServiceVisuals = (slug: ServiceSlug) => serviceVisualsBySlug[slug];

export const getServiceCardImage = (slug: ServiceSlug) => getServiceVisuals(slug).areaCard;

export const getServiceAreaCardImage = (slug: ServiceSlug) =>
  getServiceVisuals(slug).areaCard;

export const getServiceHeroImage = (slug: ServiceSlug) => getServiceVisuals(slug).hero;

export const getServiceMobileHeroImage = (slug: ServiceSlug) =>
  getServiceVisuals(slug).mobileHero;

export const getManualArticleSectionImage = (slug: ServiceSlug, sectionIndex: number) => {
  const visuals = getServiceVisuals(slug);

  if (sectionIndex === 0) {
    return visuals.detail;
  }

  if (sectionIndex === 1) {
    return visuals.context;
  }

  return undefined;
};

export const applyManualServicePageVisuals = (page: ManualServicePage): ManualServicePage => {
  const serviceSlug = page.serviceSlug as ServiceSlug;

  return {
    ...page,
    hero: {
      ...page.hero,
      image: getServiceHeroImage(serviceSlug),
    },
    sections: page.sections.map((section, index) => {
      const image = getManualArticleSectionImage(serviceSlug, index);

      if (image) {
        return {
          ...section,
          image,
        };
      }

      return {
        eyebrow: section.eyebrow,
        heading: section.heading,
        paragraphs: section.paragraphs,
      };
    }),
  };
};
