import { manualServicePages, type ManualServicePage } from "./manualServicePages";

export const MANUAL_PAGE_WORD_MIN = 2450;
export const MANUAL_PAGE_WORD_MAX = 2550;

type ManualPageParams = {
  city: string;
  area: string;
  service: string;
};

const pageKey = (page: Pick<ManualServicePage, "citySlug" | "areaSlug" | "serviceSlug">) =>
  `${page.citySlug}/${page.areaSlug}/${page.serviceSlug}`;

const paramsKey = ({ city, area, service }: ManualPageParams) => `${city}/${area}/${service}`;
const manualPageByKey = new Map(manualServicePages.map((page) => [pageKey(page), page]));
let manualPagesValidated = false;

const textFromPage = (page: ManualServicePage) =>
  [
    page.metadata.title,
    page.metadata.description,
    page.metadata.openGraphTitle,
    page.metadata.openGraphDescription,
    page.metadata.twitterTitle,
    page.metadata.twitterDescription,
    page.hero.eyebrow,
    page.hero.title,
    page.hero.lead,
    page.intro.heading,
    ...page.intro.paragraphs,
    ...page.proof.flatMap((item) => [item.stat, item.label, item.description]),
    ...page.sections.flatMap((section) => [
      section.eyebrow,
      section.heading,
      ...section.paragraphs,
    ]),
    page.decisionGuide.heading,
    ...page.decisionGuide.points.flatMap((point) => [point.title, point.description]),
    ...page.faq.flatMap((item) => [item.question, item.answer]),
    page.closing.heading,
    ...page.closing.paragraphs,
    page.closing.cta,
  ].join(" ");

export const countManualPageWords = (page: ManualServicePage) => {
  const words = textFromPage(page).match(/[A-Za-z0-9]+(?:['-][A-Za-z0-9]+)?/g);
  return words?.length ?? 0;
};

const assertUnique = (items: string[], label: string) => {
  const seen = new Set<string>();

  for (const item of items) {
    const normalized = item.trim().toLowerCase();

    if (seen.has(normalized)) {
      throw new Error(`Manual service page validation failed: duplicate ${label} "${item}".`);
    }

    seen.add(normalized);
  }
};

export const validateManualServicePages = () => {
  if (manualPagesValidated) {
    return;
  }

  assertUnique(manualServicePages.map(pageKey), "path");
  assertUnique(manualServicePages.map((page) => page.metadata.title), "meta title");
  assertUnique(manualServicePages.map((page) => page.metadata.description), "meta description");

  for (const page of manualServicePages) {
    const words = countManualPageWords(page);

    if (words < MANUAL_PAGE_WORD_MIN || words > MANUAL_PAGE_WORD_MAX) {
      throw new Error(
        `Manual page ${pageKey(page)} has ${words} words. Required range is ${MANUAL_PAGE_WORD_MIN}-${MANUAL_PAGE_WORD_MAX}.`
      );
    }

    if (page.faq.length < 5) {
      throw new Error(`Manual page ${pageKey(page)} needs at least 5 unique FAQ entries.`);
    }

    assertUnique(
      page.faq.map((item) => item.question),
      `FAQ question inside ${pageKey(page)}`
    );
  }

  manualPagesValidated = true;
};

export const getManualServicePaths = () => {
  validateManualServicePages();

  return manualServicePages.map((page) => ({
    city: page.citySlug,
    area: page.areaSlug,
    service: page.serviceSlug,
  }));
};

export const getManualServicePage = (params: ManualPageParams) => {
  validateManualServicePages();

  return manualPageByKey.get(paramsKey(params));
};
