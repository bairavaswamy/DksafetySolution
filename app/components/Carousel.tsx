"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { chennaiConfig } from "../config/chennai.config";
import { siteConfig } from "../config/site.config";

const heroImages = [
  {
    src: "/images/home/invisible-grill-installation-chennai-balcony.png",
    alt: "Invisible Grill Installation",
    dec: "Clear-view invisible grill installation for balconies, windows, and high-rise apartments.",
    href: "/invisible-grills",
  },
  {
    src: "/images/home/pigeon-safety-net-balcony-chennai.png",
    alt: "Pigeon Safety Nets",
    dec: "Neat pigeon net installation for balconies, ducts, ledges, shafts, and open service areas.",
    href: "/pigeon-safety-nets",
  },
  {
    src: "/images/home/balcony-safety-net-installation-chennai-apartment.png",
    alt: "Balcony Safety Nets",
    dec: "Strong balcony safety net fitting for families, children, pets, and open apartment edges.",
    href: "/balcony-safety-nets",
  },
  {
    src: "/images/home/sports-net-installation-cricket-chennai.png",
    alt: "Sports Nets",
    dec: "Durable sports net installation for football, cricket, practice areas, and play zones.",
    href: "/football-sports-nets",
  },
  {
    src: "/images/home/ceiling-cloth-hanger-installation-chennai.png",
    alt: "Cloth Hanger Installation",
    dec: "Space-saving ceiling and wall-mounted cloth hanger installation for modern homes.",
    href: "/cloth-hanger-installation",
  },
];

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const totalSlides = heroImages.length;
  const cityHref = `/${chennaiConfig.citySlug}`;

  useEffect(() => {
    const advance = () => setIndex((i) => (i + 1) % totalSlides);
    intervalRef.current = window.setInterval(advance, 4500);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [totalSlides]);

  const goToPrevious = () => setIndex((i) => (i - 1 + totalSlides) % totalSlides);
  const goToNext = () => setIndex((i) => (i + 1) % totalSlides);

  return (
    <section className="-mx-4 sm:-mx-6">
      <div className="relative h-[520px] w-full overflow-hidden sm:h-[560px] md:h-[640px] lg:h-[720px]">
        <div
          className="flex h-full w-full transition-transform duration-700"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {heroImages.map((item, i) => (
            <div key={item.src} className="relative h-full w-full flex-shrink-0">
              <picture className="absolute inset-0 block">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover"
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding={i === 0 ? "sync" : "async"}
                  fetchPriority={i === 0 ? "high" : "auto"}
                />
              </picture>

              <div className="absolute inset-0 flex items-center justify-start bg-gradient-to-r from-primary-900/82 via-primary-900/52 to-primary-900/10 pt-24 text-left md:justify-center md:text-center">
                <div
                  className={`w-full max-w-[calc(100vw-2rem)] px-6 text-white transition-all duration-700 sm:max-w-3xl sm:px-10 md:max-w-4xl ${
                    i === index ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
                  }`}
                >
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-secondary-200 sm:text-sm sm:tracking-[0.22em]">
                    {siteConfig.name}
                  </p>
                  <h1 className="text-4xl font-extrabold leading-tight text-white drop-shadow-lg md:text-6xl">
                    {item.alt}
                  </h1>

                  <p className="mt-4 text-base font-medium leading-7 text-gray-100 drop-shadow-md sm:text-xl sm:leading-8">
                    {item.dec}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3 md:justify-center">
                    <Link
                      href={`${cityHref}${item.href}`}
                      prefetch={false}
                      className="inline-flex items-center justify-center rounded-full border border-secondary bg-secondary px-6 py-2 font-semibold text-white shadow-sm shadow-secondary/30 transition duration-300 hover:scale-105 hover:bg-secondary-600 md:px-8 md:py-3"
                    >
                      View Service
                    </Link>
                    <a
                      href={siteConfig.contact.phoneHref}
                      className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/15 px-6 py-2 font-semibold text-white backdrop-blur transition duration-300 hover:bg-white/25 md:px-8 md:py-3"
                    >
                      Call Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={goToPrevious}
          className="absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-primary-900/35 text-white shadow-lg backdrop-blur transition hover:bg-primary-900/55 sm:inline-flex"
          aria-label="Previous carousel slide"
        >
          <ChevronLeft size={24} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={goToNext}
          className="absolute right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-primary-900/35 text-white shadow-lg backdrop-blur transition hover:bg-primary-900/55 sm:inline-flex"
          aria-label="Next carousel slide"
        >
          <ChevronRight size={24} aria-hidden="true" />
        </button>

        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
          {heroImages.map((item, i) => (
            <button
              key={item.src}
              onClick={() => setIndex(i)}
              className={`h-4 w-4 rounded-full ${i === index ? "bg-white" : "bg-white/50"}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
