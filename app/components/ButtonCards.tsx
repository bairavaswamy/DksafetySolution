"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "../config/site.config";

type FocusItem = (typeof siteConfig.focusAreas)[number];

function ButtonCardsInner({ images = siteConfig.focusAreas }: { images?: readonly FocusItem[] }) {
  return (
    <section className="w-full max-w-full overflow-clip bg-white pb-1">
      <div className="mt-12 text-center md:mb-6">
        <h2 className="text-2xl font-extrabold text-sky-900 md:text-3xl lg:text-4xl">
          Popular Safety Services
        </h2>
        <div className="mx-auto mt-4 h-1 w-28 rounded-full bg-gradient-to-r from-yellow-400 via-sky-400 to-yellow-500" />
      </div>

      <div className="mx-auto grid w-full max-w-sm gap-4 px-4 pb-4 md:hidden">
        {images.slice(0, 5).map((item) => (
          <article
            key={item.title}
            className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
          >
            <FocusCard item={item} isMobile />
          </article>
        ))}
      </div>

      <div className="mx-auto hidden w-full max-w-7xl grid-cols-2 gap-6 px-4 pb-4 md:grid lg:grid-cols-5">
        {images.map((item) => (
          <div
            key={item.title}
            className="min-w-0 overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <FocusCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}

function FocusCard({ item, isMobile = false }: { item: FocusItem; isMobile?: boolean }) {
  return (
    <>
      <div className={`${isMobile ? "h-48" : "h-40"} relative w-full bg-gray-100`}>
        <Image
          src={item.image}
          alt={`${item.title} installation photo in Chennai`}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      <div className="p-4 text-left">
        <div className="flex items-center gap-3">
          <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-primary-100 bg-white shadow-sm ring-2 ring-white">
            <Image
              src={item.image}
              alt=""
              fill
              className="object-cover"
              sizes="44px"
              unoptimized
            />
          </span>
          <h3 className="min-w-0 text-base font-semibold leading-tight text-slate-950">
            {item.title}
          </h3>
        </div>
        <p className="mt-2 min-h-[72px] text-sm leading-6 text-gray-600">{item.description}</p>

        <Link
          href={item.href}
          prefetch={false}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-600 transition hover:text-sky-700"
        >
          Open Service
          <ArrowRight size={16} />
        </Link>
      </div>
    </>
  );
}

export default memo(ButtonCardsInner);
