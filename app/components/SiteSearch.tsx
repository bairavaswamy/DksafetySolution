"use client";

import { FormEvent, useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Search, X } from "lucide-react";
import { chennaiConfig } from "../config/chennai.config";
import { siteConfig } from "../config/site.config";

type SearchVariant = "desktop" | "mobile" | "mobileNav";

type SearchItem = {
  title: string;
  href: string;
  category: string;
  description: string;
  keywords: string[];
  priority: number;
};

type SiteSearchProps = {
  variant?: SearchVariant;
  closeSignal?: unknown;
  onOpen?: () => void;
  onSelect?: () => void;
};

const cityHref = `/${chennaiConfig.citySlug}`;

const serviceAliases: Record<string, string[]> = {
  "balcony-safety-nets": ["balcony nets", "balcony net installation", "safety net", "fall protection"],
  "children-safety-nets": ["child safety", "kids safety", "family protection"],
  "anti-bird-nets": ["bird net", "bird control", "anti pigeon", "bird protection"],
  "pigeon-safety-nets": ["pigeon nets", "pigeon net installation", "bird nets", "balcony pigeon"],
  "invisible-grills": ["invisible grill installation", "invisible grill", "steel cable grill", "view grill"],
  "balcony-invisible-grills": ["balcony invisible grill", "balcony grill", "clear view balcony"],
  "window-safety-nets": ["window nets", "window safety", "window protection"],
  "duct-area-safety-nets": ["duct nets", "shaft nets", "utility duct"],
  "building-covering-safety-nets": ["building nets", "facade nets", "construction safety"],
  "terrace-safety-nets": ["terrace nets", "roof nets", "open terrace"],
  "staircase-safety-nets": ["staircase nets", "stair safety", "void nets"],
  "swimming-pool-safety-nets": ["pool nets", "swimming pool nets", "pool safety"],
  "cricket-practice-nets": ["cricket nets", "practice nets", "sports nets"],
  "football-sports-nets": ["football nets", "sports nets", "turf nets", "play area nets"],
  "bird-spikes-installation": ["bird spikes", "pigeon spikes", "ledge spikes"],
  "cloth-hanger-installation": ["cloth hanger", "cloth hangers", "ceiling hanger", "drying hanger"],
};

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const tokenMatches = (tokens: string[], haystack: string) =>
  tokens.every((token) => haystack.includes(token));

const pageItems: SearchItem[] = [
  ...siteConfig.navLinks.map((link, index) => ({
    title: link.label,
    href: link.href,
    category: "Page",
    description:
      link.href === "/services"
        ? "All DK Safety Solutions services in one place."
        : `${siteConfig.name} ${link.label.toLowerCase()} page.`,
    keywords: [link.label, siteConfig.name, siteConfig.shortName],
    priority: 120 - index,
  })),
  {
    title: "Request Quote",
    href: "/request-quote",
    category: "Contact",
    description: "Call, WhatsApp, or request a Chennai site visit.",
    keywords: ["quote", "estimate", "price", "call", "whatsapp", "site visit"],
    priority: 125,
  },
  {
    title: "Chennai Service Directory",
    href: cityHref,
    category: "Directory",
    description: "Browse Chennai services and area pages.",
    keywords: ["chennai", "service directory", "areas", "near me"],
    priority: 118,
  },
  {
    title: "Gated Communities",
    href: `${cityHref}/gated-communities`,
    category: "Communities",
    description: "Safety net and invisible grill services for Chennai apartments and societies.",
    keywords: ["gated community", "society", "apartment", "communities", "villa"],
    priority: 110,
  },
];

const serviceItems: SearchItem[] = chennaiConfig.services.map((service, index) => ({
  title: service.name,
  href: `${cityHref}/${service.slug}`,
  category: "Service",
  description: service.angle,
  keywords: [service.name, service.slug, ...(serviceAliases[service.slug] ?? [])],
  priority: 100 - index,
}));

const areaItems: SearchItem[] = chennaiConfig.areas.map((area, index) => ({
  title: `${area.name} Services`,
  href: `${cityHref}/${area.slug}`,
  category: "Area",
  description: `${siteConfig.name} service coverage in ${area.name}, ${chennaiConfig.city}.`,
  keywords: [area.name, area.slug, chennaiConfig.city, "near me"],
  priority: 80 - index / 10,
}));

const searchItems = [...pageItems, ...serviceItems, ...areaItems];

const popularItems = [
  "invisible-grills",
  "pigeon-safety-nets",
  "balcony-safety-nets",
  "football-sports-nets",
  "cloth-hanger-installation",
]
  .map((slug) => serviceItems.find((item) => item.href.endsWith(slug)))
  .filter((item): item is SearchItem => Boolean(item));

const itemHaystack = (item: SearchItem) =>
  normalize([item.title, item.category, item.description, ...item.keywords].join(" "));

const scoreItem = (item: SearchItem, query: string, tokens: string[]) => {
  const title = normalize(item.title);
  const haystack = itemHaystack(item);

  if (!tokenMatches(tokens, haystack) && !haystack.includes(query)) {
    return 0;
  }

  let score = item.priority;

  if (title === query) score += 120;
  if (title.startsWith(query)) score += 80;
  if (title.includes(query)) score += 45;
  if (haystack.includes(query)) score += 30;

  score += tokens.reduce((total, token) => {
    if (title.startsWith(token)) return total + 14;
    if (title.includes(token)) return total + 10;
    return total + 4;
  }, 0);

  return score;
};

const findMatchedService = (query: string, tokens: string[]) =>
  chennaiConfig.services.find((service) => {
    const haystack = normalize([
      service.name,
      service.slug,
      service.angle,
      ...(serviceAliases[service.slug] ?? []),
    ].join(" "));

    return haystack.includes(query) || tokens.some((token) => haystack.includes(token));
  });

const findMatchedArea = (query: string, tokens: string[]) =>
  chennaiConfig.areas.find((area) => {
    const haystack = normalize([area.name, area.slug, chennaiConfig.city].join(" "));

    return haystack.includes(query) || tokens.some((token) => haystack.includes(token));
  });

const getResults = (query: string) => {
  const normalizedQuery = normalize(query);

  if (normalizedQuery.length < 2) {
    return popularItems;
  }

  const tokens = normalizedQuery.split(" ").filter(Boolean);
  const service = findMatchedService(normalizedQuery, tokens);
  const area = findMatchedArea(normalizedQuery, tokens);
  const combinedResult =
    service && area
      ? [
          {
            title: `${service.name} in ${area.name}`,
            href: `${cityHref}/${area.slug}/${service.slug}`,
            category: "Area Service",
            description: `${service.name} page for ${area.name}, ${chennaiConfig.city}.`,
            keywords: [service.name, area.name, "service near me", ...tokens],
            priority: 240,
          },
        ]
      : [];

  const scoredResults = searchItems
    .map((item) => ({ item, score: scoreItem(item, normalizedQuery, tokens) }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((result) => result.item);

  const uniqueResults = [...combinedResult, ...scoredResults].filter(
    (item, index, items) => items.findIndex((candidate) => candidate.href === item.href) === index
  );

  return uniqueResults.slice(0, 8);
};

const SiteSearch: React.FC<SiteSearchProps> = ({
  variant = "desktop",
  closeSignal,
  onOpen,
  onSelect,
}) => {
  const router = useRouter();
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const isDrawerMobile = variant === "mobile";
  const isMobileNav = variant === "mobileNav";
  const results = useMemo(() => getResults(query), [query]);
  const showResults = open && (query.trim().length > 0 || results.length > 0);

  useEffect(() => {
    setOpen(false);
    setQuery("");
  }, [closeSignal]);

  const closeSearch = () => {
    setOpen(false);
    setQuery("");
  };

  const handleSelect = () => {
    closeSearch();
    onSelect?.();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!results[0]) return;

    router.push(results[0].href);
    handleSelect();
  };

  const openMobileSearch = () => {
    const shouldOpen = !open;

    setOpen(shouldOpen);

    if (shouldOpen) {
      onOpen?.();
      window.setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setQuery("");
    }
  };

  const searchForm = (
    <form
      role="search"
      onSubmit={handleSubmit}
      onFocus={() => setOpen(true)}
      onBlur={isMobileNav ? undefined : () => window.setTimeout(() => setOpen(false), 140)}
      className={`relative flex items-center ${
        isDrawerMobile || isMobileNav
          ? "rounded-2xl border border-primary-100 bg-white shadow-sm"
          : "rounded-full border border-primary-100 bg-white/95 shadow-sm"
      }`}
    >
      <label htmlFor={inputId} className="sr-only">
        Search DK Safety Solutions services and areas
      </label>
      <Search
        size={17}
        aria-hidden="true"
        className={`absolute left-3 ${
          isDrawerMobile || isMobileNav ? "text-primary" : "text-slate-500"
        }`}
      />
      <input
        ref={inputRef}
        id={inputId}
        type="search"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") closeSearch();
        }}
        placeholder={isDrawerMobile || isMobileNav ? "Search services or areas" : "Search services"}
        autoComplete="off"
        className={`w-full bg-transparent py-2 pl-10 pr-9 text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-500 ${
          isDrawerMobile || isMobileNav ? "rounded-2xl" : "rounded-full"
        }`}
      />
      {query ? (
        <button
          type="button"
          onClick={closeSearch}
          aria-label="Clear search"
          className="absolute right-2 inline-flex h-7 w-7 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <X size={15} aria-hidden="true" />
        </button>
      ) : null}
    </form>
  );

  const resultsPanel = showResults ? (
    <div
      className={`z-[90] overflow-hidden border border-primary-100 bg-white shadow-xl shadow-primary-900/10 ${
        isDrawerMobile || isMobileNav
          ? "mt-2 max-h-80 overflow-y-auto rounded-2xl"
          : "absolute right-0 top-full mt-3 max-h-96 w-[28rem] overflow-y-auto rounded-2xl"
      }`}
    >
      <div className="border-b border-slate-100 px-4 py-3">
        <p className="text-[11px] font-black uppercase tracking-[0.18em] text-secondary">
          {query.trim() ? "Search Results" : "Popular Searches"}
        </p>
      </div>

      {results.length > 0 ? (
        <div className="p-2">
          {results.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              onClick={handleSelect}
              className="group flex items-start justify-between gap-3 rounded-xl px-3 py-3 transition hover:bg-secondary-50"
            >
              <span className="min-w-0">
                <span className="block truncate text-sm font-black text-slate-900 group-hover:text-secondary-700">
                  {item.title}
                </span>
                <span className="mt-1 block text-xs font-bold uppercase tracking-[0.12em] text-primary-600">
                  {item.category}
                </span>
                <span className="mt-1 line-clamp-2 block text-xs leading-5 text-slate-500">
                  {item.description}
                </span>
              </span>
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="mt-1 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-secondary"
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="px-4 py-5 text-sm leading-6 text-slate-500">
          No exact match found. Try "pigeon nets", "invisible grill", "balcony nets", or your area name.
        </div>
      )}
    </div>
  ) : null;

  if (isMobileNav) {
    return (
      <div className="relative lg:hidden">
        <button
          type="button"
          aria-label={open ? "Close search" : "Search services"}
          aria-expanded={open}
          onClick={openMobileSearch}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary-200 bg-white text-primary shadow-sm transition hover:border-secondary-400 hover:text-secondary focus:outline-none focus:ring-2 focus:ring-secondary-400"
        >
          {open ? <X size={21} aria-hidden="true" /> : <Search size={21} aria-hidden="true" />}
        </button>

        {open ? (
          <div className="fixed inset-x-0 top-[100px] z-[60] border-b border-primary-100 bg-white/95 px-4 py-3 shadow-xl shadow-primary-900/10 backdrop-blur-md sm:top-[108px] sm:px-6">
            <div className="mx-auto max-w-2xl">
              <div className="flex items-center gap-2">
                <div className="min-w-0 flex-1">{searchForm}</div>
                <button
                  type="button"
                  onClick={closeSearch}
                  aria-label="Close search"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-secondary-300 hover:text-secondary"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>
              {resultsPanel}
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className={isDrawerMobile ? "relative w-full" : "relative hidden w-48 lg:block xl:w-72"}>
      {searchForm}
      {resultsPanel}
    </div>
  );
};

export default SiteSearch;
