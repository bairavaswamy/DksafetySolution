"use client";

import { useEffect, useRef, useState, type TouchEvent } from "react";
import { siteConfig } from "../config/site.config";

const heroImages = [
  {
    src: "/images/site/hero-v3-open-balcony-grill-desktop.webp",
    mobileSrc: "/images/site/hero-v3-open-balcony-grill-mobile.webp",
    alt: "High-rise balcony with invisible grill safety cables and open city view",
    dec: "Open-view balcony protection with clean lines, safer edges, and steady airflow.",
  },
  {
    src: "/images/site/hero-v3-balcony-evening-desktop.webp",
    mobileSrc: "/images/site/hero-v3-balcony-evening-mobile.webp",
    alt: "Balcony invisible grill installation on a high-rise apartment railing",
    dec: "Invisible grill finishes for balconies that need airflow, views, and dependable safety.",
  },
  {
    src: "/images/site/hero-v3-safety-net-view-desktop.webp",
    mobileSrc: "/images/site/hero-v3-safety-net-view-mobile.webp",
    alt: "Transparent balcony safety net covering a high-rise apartment opening",
    dec: "Transparent safety netting for balconies, open sides, and high-rise family spaces.",
  },
  {
    src: "/images/site/hero-v3-sports-court-desktop.webp",
    mobileSrc: "/images/site/hero-v3-sports-court-mobile.webp",
    alt: "Cricket and football sports net enclosure with night lighting",
    dec: "Sports net installations for cricket and community play areas with clean containment.",
  },
  {
    src: "/images/site/hero-v3-cloth-hanger-balcony-desktop.webp",
    mobileSrc: "/images/site/hero-v3-cloth-hanger-balcony-mobile.webp",
    alt: "Balcony ceiling cloth hanger installation beside an open view",
    dec: "Ceiling and balcony hanger systems fitted neatly around daily utility space.",
  },
];

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const goToSlide = (nextIndex: number) => {
    setIndex((nextIndex + heroImages.length) % heroImages.length);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];

    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || touchStartY.current === null) {
      return;
    }

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartX.current;
    const deltaY = touch.clientY - touchStartY.current;

    touchStartX.current = null;
    touchStartY.current = null;

    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) < Math.abs(deltaY) * 1.2) {
      return;
    }

    goToSlide(index + (deltaX < 0 ? 1 : -1));
  };

  useEffect(() => {
    const advance = () => setIndex((i) => (i + 1) % heroImages.length);
    let startTimer: number | null = null;

    startTimer = window.setTimeout(() => {
      intervalRef.current = window.setInterval(advance, 4500);
    }, 15000);

    return () => {
      if (startTimer) window.clearTimeout(startTimer);
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section className="-mx-4 md:-mx-6 lg:-mx-8" aria-label="Featured safety service photos">
      <div
        className="relative h-[70vh] w-full touch-pan-y overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex h-full w-full transition-transform duration-700"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {heroImages.map((item, i) => (
            <div key={item.src} className="relative h-full w-full flex-shrink-0">
              <picture className="absolute inset-0 block h-full w-full">
                <source media="(max-width: 767px)" srcSet={item.mobileSrc} />
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover"
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding={i === 0 ? "sync" : "async"}
                  fetchPriority={i === 0 ? "high" : "auto"}
                />
              </picture>

              <div className="absolute inset-0 flex items-center justify-start bg-black/25 text-left md:justify-center md:text-center">
                <div
                  className={`w-full max-w-[calc(100vw-2rem)] px-6 text-white transition-all duration-700 sm:max-w-3xl sm:px-10 md:max-w-4xl ${
                    i === index ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
                  }`}
                >
                  {/* <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-lime-200 sm:text-sm sm:tracking-[0.22em]">
                    {siteConfig.domain}
                  </p> */}
                  <h1 className="text-3xl font-extrabold leading-tight text-white drop-shadow-lg md:text-5xl">
                    {i === 0 ? siteConfig.name : item.alt}
                  </h1>

                  <p className="mt-4 text-base font-medium leading-7 text-gray-100 drop-shadow-md sm:text-xl sm:leading-8">
                    {item.dec}
                  </p>

                  <a
                    href={siteConfig.contact.phoneHref}
                    className="mt-5 inline-flex items-center justify-center rounded-full border border-[#C9A227] bg-[#C9A227] px-6 py-2 font-semibold text-black shadow-sm transition duration-300 hover:scale-105 md:px-8 md:py-3"
                  >
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
          {heroImages.map((item, i) => (
            <button
              key={item.src}
              onClick={() => goToSlide(i)}
              className={`h-4 w-4 rounded-full ${i === index ? "bg-white" : "bg-white/50"}`}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
