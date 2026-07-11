"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { siteConfig } from "../config/site.config";

type FocusItem = (typeof siteConfig.focusAreas)[number];

const cardNotes = ["Free site visit", "Clean fixing", "Chennai service"];

function ButtonCardsInner({ images = siteConfig.focusAreas }: { images?: readonly FocusItem[] }) {
  if (!images.length) return null;

  return (
    <section className="w-full max-w-full overflow-hidden bg-white pb-6 pt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-secondary">
            Current DK Safety Picks
          </p>
          <h2 className="mt-3 text-2xl font-bold text-green-900 sm:text-3xl">
            Our Services &amp; Best Picks
          </h2>
          <div className="mx-auto mt-4 h-1 w-28 rounded-full bg-gradient-to-r from-secondary via-secondary-400 to-accent" />
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            The most requested Chennai safety installations, arranged in the
            light card style from the original site design.
          </p>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-5 md:hidden">
          {images.map((item, index) => (
            <ServiceCard key={item.title} item={item} index={index} mobile />
          ))}
        </div>

        <div className="mt-8 hidden gap-5 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {images.map((item, index) => (
            <ServiceCard key={item.title} item={item} index={index} />
          ))}
        </div>

        <div className="mt-3 grid gap-3 border-y border-slate-100 bg-secondary-50 px-4 py-4 sm:grid-cols-3">
          {cardNotes.map((note) => (
            <div key={note} className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-700">
              <BadgeCheck className="h-4 w-4 text-accent" aria-hidden="true" />
              {note}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  item,
  index,
  mobile = false,
}: {
  item: FocusItem;
  index: number;
  mobile?: boolean;
}) {
  return (
    <Link
      href={item.href}
      prefetch={false}
      className={[
        "group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:border-secondary-300 hover:shadow-lg",
        mobile ? "mx-auto w-full max-w-[360px]" : "w-full",
      ].join(" ")}
    >
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <Image
          src={item.image}
          alt={`${item.title} installation in Chennai`}
          fill
          priority={index === 0}
          sizes={mobile ? "(max-width: 767px) 100vw" : "250px"}
          className="object-cover transition duration-500 group-hover:scale-105"
          unoptimized
        />
        <div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-secondary shadow-sm">
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      <div className="p-4">
        <h3 className="min-h-[48px] text-lg font-semibold leading-tight text-slate-950">
          {item.title}
        </h3>
        <p className="mt-2 min-h-[72px] text-sm leading-6 text-slate-600">
          {item.description}
        </p>
        <span className="mt-4 inline-flex items-center gap-2 rounded-md border border-primary px-3 py-2 text-sm font-semibold text-primary transition group-hover:border-secondary group-hover:bg-secondary group-hover:text-white">
          Know More
          <ArrowRight size={15} className="transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export default memo(ButtonCardsInner);
