"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { chennaiConfig } from "../config/chennai.config";
import { siteConfig } from "../config/site.config";
import { getServiceHeroImage, getServiceMobileHeroImage } from "../content/serviceVisuals";
import { getSwipeDirection, wrapSlideIndex } from "../lib/carouselGestures";

const heroImages = [
  {
    src: getServiceHeroImage("invisible-grills"),
    mobileSrc: getServiceMobileHeroImage("invisible-grills"),
    alt: "Invisible Grill Installation",
    dec: "Clear-view invisible grill installation for balconies, windows, and high-rise apartments.",
    href: "/invisible-grills",
  },
  {
    src: getServiceHeroImage("pigeon-safety-nets"),
    mobileSrc: getServiceMobileHeroImage("pigeon-safety-nets"),
    alt: "Pigeon Safety Nets",
    dec: "Neat pigeon net installation for balconies, ducts, ledges, shafts, and open service areas.",
    href: "/pigeon-safety-nets",
  },
  {
    src: getServiceHeroImage("balcony-safety-nets"),
    mobileSrc: getServiceMobileHeroImage("balcony-safety-nets"),
    alt: "Balcony Safety Nets",
    dec: "Strong balcony safety net fitting for families, children, pets, and open apartment edges.",
    href: "/balcony-safety-nets",
  },
  {
    src: getServiceHeroImage("football-sports-nets"),
    mobileSrc: getServiceMobileHeroImage("football-sports-nets"),
    alt: "Sports Nets",
    dec: "Durable sports net installation for football, cricket, practice areas, and play zones.",
    href: "/football-sports-nets",
  },
  {
    src: getServiceHeroImage("cloth-hanger-installation"),
    mobileSrc: getServiceMobileHeroImage("cloth-hanger-installation"),
    alt: "Cloth Hanger Installation",
    dec: "Space-saving ceiling and wall-mounted cloth hanger installation for modern homes.",
    href: "/cloth-hanger-installation",
  },
];

const AUTOPLAY_DELAY = 6000;
type Gesture = { id: number; x: number; y: number; axis: "pending" | "horizontal" | "vertical" };

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [inView, setInView] = useState(true);
  const [cycle, setCycle] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const activeIndexRef = useRef(0);
  const requestedIndexRef = useRef(0);
  const requestRef = useRef(0);
  const gestureRef = useRef<Gesture | null>(null);
  const suppressClickUntilRef = useRef(0);
  const totalSlides = heroImages.length;
  const cityHref = `/${chennaiConfig.citySlug}`;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => { if (preference.matches) setPaused(true); };
    const syncVisibility = () => setPageVisible(document.visibilityState === "visible");
    syncMotion();
    syncVisibility();
    preference.addEventListener("change", syncMotion);
    document.addEventListener("visibilitychange", syncVisibility);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio >= 0.2), { threshold: [0, 0.2] });
    if (viewportRef.current) observer.observe(viewportRef.current);
    return () => {
      preference.removeEventListener("change", syncMotion);
      document.removeEventListener("visibilitychange", syncVisibility);
      observer.disconnect();
      requestRef.current += 1;
    };
  }, []);

  const selectSlide = useCallback(async (target: number) => {
    const next = wrapSlideIndex(target, heroImages.length);
    requestedIndexRef.current = next;
    const request = ++requestRef.current;
    setCycle((value) => value + 1);
    setLoading(true);
    const img = imagesRef.current[next];
    if (img) {
      img.loading = "eager";
      try { await img.decode(); } catch {
        // Keep the current service visible if the requested image cannot load.
        if (request === requestRef.current) {
          requestedIndexRef.current = activeIndexRef.current;
          setLoading(false);
        }
        return;
      }
    }
    if (request !== requestRef.current) return;
    const focused = document.activeElement;
    if (next !== activeIndexRef.current && focused instanceof Element && focused.closest("[data-carousel-slide]") && viewportRef.current?.contains(focused)) {
      viewportRef.current.focus({ preventScroll: true });
    }
    activeIndexRef.current = next;
    setIndex(next);
    setLoading(false);
  }, []);

  const stepSlide = useCallback((step: number) => {
    void selectSlide(requestedIndexRef.current + step);
  }, [selectSlide]);

  useEffect(() => {
    if (paused || hovered || interacting || loading || !pageVisible || !inView) return;
    const timer = window.setTimeout(() => stepSlide(1), AUTOPLAY_DELAY);
    return () => window.clearTimeout(timer);
  }, [paused, hovered, interacting, loading, pageVisible, inView, cycle, stepSlide]);

  const cancelGesture = (event: ReactPointerEvent<HTMLDivElement>) => {
    const gesture = gestureRef.current;
    gestureRef.current = null;
    setInteracting(false);
    if (gesture && event.currentTarget.hasPointerCapture(gesture.id)) event.currentTarget.releasePointerCapture(gesture.id);
  };

  const startGesture = (event: ReactPointerEvent<HTMLDivElement>) => {
    // A second finger cancels swiping so native pinch zoom remains available.
    if (!event.isPrimary) { cancelGesture(event); return; }
    if (event.button !== 0) return;
    suppressClickUntilRef.current = 0;
    if ((event.target as Element).closest("button")) return;
    gestureRef.current = { id: event.pointerId, x: event.clientX, y: event.clientY, axis: "pending" };
    setInteracting(true);
  };

  const moveGesture = (event: ReactPointerEvent<HTMLDivElement>) => {
    const gesture = gestureRef.current;
    if (!gesture || event.pointerId !== gesture.id) return;
    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;
    if (gesture.axis === "pending" && Math.max(Math.abs(dx), Math.abs(dy)) >= 10) {
      if (Math.abs(dx) > Math.abs(dy) * 1.25) {
        gesture.axis = "horizontal";
        // Capture only after a drag is clear, leaving normal link taps intact.
        event.currentTarget.setPointerCapture(event.pointerId);
      } else if (Math.abs(dy) >= Math.abs(dx)) {
        gesture.axis = "vertical";
      }
    }
    if (gesture.axis === "horizontal") event.preventDefault();
  };

  const finishGesture = (event: ReactPointerEvent<HTMLDivElement>) => {
    const gesture = gestureRef.current;
    if (!gesture || event.pointerId !== gesture.id) return;
    if (gesture.axis === "horizontal") {
      event.preventDefault();
      suppressClickUntilRef.current = Date.now() + 500;
      const step = getSwipeDirection(event.clientX - gesture.x, event.clientY - gesture.y, event.currentTarget.clientWidth);
      if (step) stepSlide(step);
    }
    cancelGesture(event);
  };

  return (
    <section className="-mx-4 sm:-mx-6" aria-label="Featured safety services" aria-roledescription="carousel">
      <div
        ref={viewportRef}
        tabIndex={-1}
        data-interacting={interacting}
        className="carousel-viewport relative h-[520px] w-full overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary-300 sm:h-[560px] md:h-[640px] lg:h-[720px]"
        onPointerDown={startGesture}
        onPointerMove={moveGesture}
        onPointerUp={finishGesture}
        onPointerCancel={cancelGesture}
        onLostPointerCapture={(event) => {
          if (event.target === event.currentTarget && event.pointerId === gestureRef.current?.id) cancelGesture(event);
        }}
        onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(true); }}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") {
            setHovered(false);
            if (!event.currentTarget.hasPointerCapture(event.pointerId)) cancelGesture(event);
          }
        }}
        onDragStart={(event) => event.preventDefault()}
        onClickCapture={(event) => {
          if (event.detail !== 0 && Date.now() < suppressClickUntilRef.current) {
            event.preventDefault();
            event.stopPropagation();
            suppressClickUntilRef.current = 0;
          }
        }}
        onFocusCapture={(event) => {
          if (event.target.matches(":focus-visible")) setPaused(true);
        }}
        onKeyDown={(event) => {
          if (event.altKey || event.ctrlKey || event.metaKey) return;
          const steps: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1 };
          if (event.key in steps || event.key === "Home" || event.key === "End") {
            event.preventDefault();
            setPaused(true);
            if (event.key in steps) stepSlide(steps[event.key]);
            else void selectSlide(event.key === "Home" ? 0 : totalSlides - 1);
          }
        }}
      >
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          className="absolute bottom-1 left-[calc(50%+4.5rem)] z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-primary-950/55 text-white transition-colors hover:bg-primary-950/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-300"
          aria-label={paused ? "Play slideshow" : "Pause slideshow"}
        >
          {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
        </button>
        {heroImages.map((item, i) => (
          <div
            key={item.src}
            data-carousel-slide={i}
            id={`featured-service-${i}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${totalSlides}: ${item.alt}`}
            aria-hidden={i !== index}
            className={`carousel-slide absolute inset-0 ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <picture className="absolute inset-0 block">
              <source media="(max-width: 767px)" srcSet={item.mobileSrc} />
              <img
                ref={(element) => { imagesRef.current[i] = element; }}
                src={item.src}
                alt={item.alt}
                className="h-full w-full object-cover"
                draggable={false}
                loading={i === 0 || i === index || i === wrapSlideIndex(index + 1, totalSlides) || i === wrapSlideIndex(index - 1, totalSlides) ? "eager" : "lazy"}
                decoding={i === 0 ? "sync" : "async"}
                fetchPriority={i === 0 ? "high" : "low"}
              />
            </picture>

            <div className="absolute inset-0 flex items-center justify-start bg-gradient-to-r from-primary-950/[0.82] via-primary-950/[0.74] to-primary-950/[0.64] pt-24 text-left md:justify-center md:text-center">
              <div className="w-full max-w-[calc(100vw-2rem)] px-6 text-white sm:max-w-3xl sm:px-10 md:max-w-4xl">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-secondary-200 sm:text-sm sm:tracking-[0.22em]">
                  {siteConfig.name}
                </p>
                <h2 className="text-4xl font-extrabold leading-tight text-white drop-shadow-lg md:text-6xl">
                  {item.alt}
                </h2>

                <p className="mt-4 text-base font-medium leading-7 text-gray-100 drop-shadow-md sm:text-xl sm:leading-8">
                  {item.dec}
                </p>

                <div className="mt-5 flex flex-wrap gap-3 md:justify-center">
                  <Link
                    href={`${cityHref}${item.href}`}
                    prefetch={false}
                    tabIndex={i === index ? 0 : -1}
                    draggable={false}
                    className="inline-flex items-center justify-center rounded-full border border-secondary bg-secondary px-6 py-2 font-semibold text-white shadow-sm shadow-secondary/30 transition duration-300 hover:scale-105 hover:bg-secondary-600 md:px-8 md:py-3"
                  >
                    View Service
                  </Link>
                  <a
                    href={siteConfig.contact.phoneHref}
                    tabIndex={i === index ? 0 : -1}
                    draggable={false}
                    className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/15 px-6 py-2 font-semibold text-white backdrop-blur transition duration-300 hover:bg-white/25 md:px-8 md:py-3"
                  >
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => stepSlide(-1)}
          className="absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-primary-950/35 text-white shadow-lg backdrop-blur transition hover:bg-primary-950/55 sm:inline-flex"
          aria-label="Previous carousel slide"
        >
          <ChevronLeft size={24} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => stepSlide(1)}
          className="absolute right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-primary-950/35 text-white shadow-lg backdrop-blur transition hover:bg-primary-950/55 sm:inline-flex"
          aria-label="Next carousel slide"
        >
          <ChevronRight size={24} aria-hidden="true" />
        </button>

        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2" role="group" aria-label="Choose featured service">
          {heroImages.map((item, i) => (
            <button
              key={item.src}
              type="button"
              onClick={() => { void selectSlide(i); }}
              className={`carousel-dot relative h-4 w-4 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-300 ${i === index ? "bg-secondary-300" : "bg-white/50"}`}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              aria-controls={`featured-service-${i}`}
            />
          ))}
        </div>
        <p className="sr-only" aria-live={paused ? "polite" : "off"} aria-atomic="true">
          {`${index + 1} of ${totalSlides}: ${heroImages[index].alt}`}
        </p>
      </div>
    </section>
  );
}
