"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Search, Wrench } from "lucide-react";

type FinderArea = {
  name: string;
  slug: string;
};

type FinderService = {
  name: string;
  slug: string;
  angle: string;
};

type ChennaiServiceFinderProps = {
  citySlug: string;
  areas: readonly FinderArea[];
  services: readonly FinderService[];
};

export default function ChennaiServiceFinder({
  citySlug,
  areas,
  services,
}: ChennaiServiceFinderProps) {
  const [areaSlug, setAreaSlug] = useState(areas[0]?.slug ?? "");
  const [serviceSlug, setServiceSlug] = useState(services[0]?.slug ?? "");
  const [query, setQuery] = useState("");

  const selectedArea = areas.find((area) => area.slug === areaSlug) ?? areas[0];
  const selectedService =
    services.find((service) => service.slug === serviceSlug) ?? services[0];

  const filteredAreas = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return areas.slice(0, 12);
    }

    return areas
      .filter((area) => area.name.toLowerCase().includes(normalizedQuery))
      .slice(0, 12);
  }, [areas, query]);

  const href =
    selectedArea && selectedService
      ? `/${citySlug}/${selectedArea.slug}/${selectedService.slug}`
      : `/${citySlug}`;

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60">
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr_auto]">
        <label className="block" htmlFor="chennai-area-select">
          <span className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
            <MapPin size={16} />
            Area
          </span>
          <select
            id="chennai-area-select"
            value={areaSlug}
            onChange={(event) => setAreaSlug(event.target.value)}
            className="h-12 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
          >
            {areas.map((area) => (
              <option key={area.slug} value={area.slug}>
                {area.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block" htmlFor="chennai-service-select">
          <span className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
            <Wrench size={16} />
            Service
          </span>
          <select
            id="chennai-service-select"
            value={serviceSlug}
            onChange={(event) => setServiceSlug(event.target.value)}
            className="h-12 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
          >
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.name}
              </option>
            ))}
          </select>
        </label>

        <div className="flex items-end">
          <Link
            href={href}
            prefetch={false}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary-500 px-6 text-sm font-black text-white shadow transition hover:bg-primary-600 lg:w-auto"
          >
            Open Page
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>

      <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
        <label
          className="flex min-h-11 items-center gap-3 rounded-lg border border-slate-200 bg-white px-3"
          htmlFor="chennai-area-search"
        >
          <Search size={17} className="shrink-0 text-slate-500" />
          <input
            id="chennai-area-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search Chennai areas"
            className="min-w-0 flex-1 bg-transparent py-3 text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-500"
          />
        </label>

        <div className="mt-4 flex flex-wrap gap-2">
          {filteredAreas.map((area) => (
            <button
              type="button"
              key={area.slug}
              onClick={() => setAreaSlug(area.slug)}
              className={`rounded-full border px-3 py-2 text-sm font-semibold transition ${
                area.slug === areaSlug
                  ? "border-primary-500 bg-primary-500 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-primary-300 hover:text-primary-600"
              }`}
            >
              {area.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
