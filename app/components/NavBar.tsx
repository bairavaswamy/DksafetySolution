"use client";

import { memo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { chennaiConfig } from "../config/chennai.config";
import { siteConfig } from "../config/site.config";
import SiteSearch from "./SiteSearch";

const MenuClient = dynamic(() => import("./Menuclient"), {
  ssr: false,
});

const marqueeItems = [
  { label: siteConfig.contact.phoneLabel, href: siteConfig.contact.phoneHref },
  { label: "Invisible Grills Installation", href: `/${chennaiConfig.citySlug}/invisible-grills` },
  { label: "Balcony Safety Nets", href: `/${chennaiConfig.citySlug}/balcony-safety-nets` },
  { label: "Pigeon Nets", href: `/${chennaiConfig.citySlug}/pigeon-safety-nets` },
  { label: "Sports Nets", href: `/${chennaiConfig.citySlug}/football-sports-nets` },
  { label: "Cloth Hangers", href: `/${chennaiConfig.citySlug}/cloth-hanger-installation` },
];

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const cityHref = `/${chennaiConfig.citySlug}`;
  const standardLinks = siteConfig.navLinks.filter((link) => link.href !== cityHref);

  return (
    <>
      <div className="fixed left-0 top-0 z-50 w-screen max-w-[100vw] border-b border-primary-100 bg-white/95 shadow-lg shadow-primary-900/5 backdrop-blur-md">
        <header className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-3 px-4 sm:h-[76px] sm:px-6 lg:h-20">
          <Link
            href="/"
            prefetch={false}
            className="flex max-w-[calc(100vw-8.75rem)] shrink-0 items-center gap-2 rounded-xl bg-white p-1 pr-2 ring-1 ring-primary-100 sm:max-w-none sm:px-2 sm:py-1"
          >
            <Image
              src={siteConfig.logos.mobile}
              alt={`${siteConfig.name} logo`}
              width={192}
              height={192}
              priority
              unoptimized
              className="h-11 w-11 shrink-0 rounded-full object-contain sm:hidden"
            />
            <span className="block min-w-0 leading-tight sm:hidden">
              <span className="block truncate text-sm font-black text-primary-900">
                DK Safety
              </span>
              <span className="block truncate text-[10px] font-bold uppercase tracking-[0.12em] text-secondary">
                Solutions
              </span>
            </span>
            <Image
              src={siteConfig.logos.desktop}
              alt={`${siteConfig.name} logo`}
              width={900}
              height={338}
              priority
              unoptimized
              className="hidden h-[3.25rem] w-auto object-contain sm:block lg:h-14"
            />
          </Link>

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0 lg:flex">
            {standardLinks.slice(0, 1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={false}
                className="group relative px-3 py-2 text-base font-medium text-gray-700 transition-all duration-300 hover:text-secondary xl:px-4"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-secondary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            <div className="group relative">
              <Link
                href={cityHref}
                prefetch={false}
                className="group/menu relative inline-flex items-center gap-1 px-3 py-2 text-base font-medium text-gray-700 transition-all duration-300 hover:text-secondary xl:px-4"
              >
                Services
                <ChevronDown
                  size={16}
                  className="transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180"
                />
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-secondary transition-all duration-300 group-hover/menu:w-full" />
              </Link>

              <div className="invisible absolute left-1/2 top-full z-[80] mt-3 w-[760px] -translate-x-1/2 opacity-0 shadow-2xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <div className="overflow-hidden rounded-xl border border-primary-100 bg-white">
                  <div className="flex items-center justify-between gap-4 border-b border-slate-100 bg-gradient-to-r from-primary-50 via-white to-accent-50 px-5 py-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-secondary">
                        Chennai Directory
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-700">
                        Open a Chennai service page or browse by area.
                      </p>
                    </div>
                    <Link
                      href={cityHref}
                      prefetch={false}
                      className="shrink-0 rounded-full bg-secondary px-4 py-2 text-sm font-bold text-white transition hover:bg-secondary-600"
                    >
                      Open Directory
                    </Link>
                  </div>

                  <div className="grid grid-cols-[0.9fr_1.1fr] gap-4 p-4">
                    <div>
                      <p className="px-2 text-xs font-black uppercase tracking-[0.18em] text-primary-700">
                        Services
                      </p>
                      <div className="mt-3 max-h-[420px] space-y-2 overflow-y-auto pr-2">
                        {chennaiConfig.services.map((service) => (
                          <Link
                            key={service.slug}
                            href={`${cityHref}/${service.slug}`}
                            prefetch={false}
                            className="block rounded-lg border border-slate-200 px-3 py-2.5 transition hover:border-secondary-300 hover:bg-secondary-50"
                          >
                            <span className="block text-sm font-black text-slate-900">
                              {service.name}
                            </span>
                            <span className="mt-1 line-clamp-2 block text-xs leading-5 text-slate-500">
                              {service.angle}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="px-2 text-xs font-black uppercase tracking-[0.18em] text-primary-700">
                        Areas
                      </p>
                      <div className="mt-3 max-h-[420px] grid grid-cols-2 gap-2 overflow-y-auto pr-2">
                        {chennaiConfig.areas.map((area) => (
                          <Link
                            key={area.slug}
                            href={`${cityHref}/${area.slug}`}
                            prefetch={false}
                            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 transition hover:border-secondary-300 hover:bg-secondary-50 hover:text-secondary-700"
                          >
                            {area.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {standardLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={false}
                className="group relative px-3 py-2 text-base font-medium text-gray-700 transition-all duration-300 hover:text-secondary xl:px-4"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-secondary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <SiteSearch variant="desktop" />
            <SiteSearch
              variant="mobileNav"
              closeSignal={open}
              onOpen={() => setOpen(false)}
            />

            <a
              href={siteConfig.contact.phoneHref}
              className="hidden items-center gap-2 rounded-full border border-primary-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-secondary-400 hover:text-secondary lg:inline-flex"
            >
              <Phone size={16} />
              {siteConfig.contact.phoneLabel}
            </a>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((current) => !current)}
              className="relative z-[70] inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary-200 bg-white text-slate-900 shadow-md shadow-primary-100 transition hover:border-secondary-400 hover:text-secondary focus:outline-none focus:ring-2 focus:ring-secondary-400 lg:hidden"
            >
              {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </header>

        <div className="overflow-hidden border-t border-primary-100 bg-primary-900 text-white">
          <div className="navbar-marquee-mask h-8 overflow-hidden">
            <div className="navbar-marquee-track flex h-full w-max items-center">
              {[0, 1].map((group) => (
                <div
                  key={group}
                  aria-hidden={group === 1}
                  className="flex h-full shrink-0 items-center gap-3 px-3"
                >
                  {marqueeItems.map((item) => {
                    const className =
                      "inline-flex h-6 items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-white/10 px-3 text-[11px] font-black uppercase tracking-[0.14em] text-white transition hover:border-secondary-300 hover:bg-secondary hover:text-white sm:text-xs";
                    const content = (
                      <>
                        <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                        {item.label}
                      </>
                    );

                    if (item.href.startsWith("tel:")) {
                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          tabIndex={group === 1 ? -1 : undefined}
                          className={className}
                        >
                          {content}
                        </a>
                      );
                    }

                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        prefetch={false}
                        tabIndex={group === 1 ? -1 : undefined}
                        className={className}
                      >
                        {content}
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="block lg:hidden">
        <MenuClient open={open} onClose={() => setOpen(false)} />
      </div>
    </>
  );
};

export default memo(Header);
