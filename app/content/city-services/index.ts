import type { ServiceSlug } from "../serviceDetails";
import { homeCityServices } from "./home";
import { birdAndUtilityCityServices } from "./bird-and-utility";
import { specialistCityServices } from "./specialist";
import type { CityServiceContent } from "./types";

// City landing-page content is separate from the neighborhood article catalog.
// This stays in server components and is rendered into HTML during static export.
export const cityServiceContent = {
  ...homeCityServices,
  ...birdAndUtilityCityServices,
  ...specialistCityServices,
} satisfies Record<ServiceSlug, CityServiceContent>;

export const getCityServiceContent = (slug: ServiceSlug): CityServiceContent =>
  cityServiceContent[slug];
