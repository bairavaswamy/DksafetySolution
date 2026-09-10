import type { ServiceSlug } from "../serviceDetails";

export type CityServicePoint = {
  title: string;
  text: string;
};

export type CityServiceContent = {
  metaTitle: string;
  metaDescription: string;
  intro: string;
  overview: {
    heading: string;
    paragraphs: string[];
  };
  sections: {
    id: string;
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
  options: {
    heading: string;
    intro: string;
    rows: {
      name: string;
      bestFor: string;
      considerations: string;
    }[];
  };
  pricing: {
    intro: string;
    factors: CityServicePoint[];
    quoteChecklist: string[];
  };
  process: CityServicePoint[];
  localConsiderations: string[];
  faq: {
    question: string;
    answer: string;
  }[];
  relatedServices: ServiceSlug[];
};
