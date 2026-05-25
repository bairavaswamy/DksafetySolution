"use client";

import { memo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ChevronDown, Mail, Menu, MessageCircle, Phone, X } from "lucide-react";
import { chennaiConfig } from "../config/chennai.config";
import { siteConfig } from "../config/site.config";

const MenuClient = dynamic(() => import("./Menuclient"), {
  ssr: false,
});

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const cityHref = `/${chennaiConfig.citySlug}`;
  const standardLinks = siteConfig.navLinks.filter((link) => link.href !== cityHref);

  return (
    <>
      <div className="fixed left-0 top-0 z-50 w-full bg-white shadow-md">
        <header className="flex items-center justify-between gap-3 bg-transparent px-3 py-3 sm:px-6 sm:py-4">
          <Link href="/" prefetch={false} className="flex min-w-0 items-center">
            <Image
              src={siteConfig.logos.desktop}
              alt={`${siteConfig.name} mobile logo`}
              width={200}
              height={60}
              priority
              className="h-12 w-auto shrink-0 sm:hidden"
            />
            <Image
              src={siteConfig.logos.desktop}
              alt={`${siteConfig.name} desktop logo`}
              width={260}
              height={64}
              priority
              className="hidden h-14 w-auto sm:block lg:h-16"
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {standardLinks.slice(0, 1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={false}
                className="group relative px-4 py-2 text-base font-medium text-gray-700 transition-all duration-300 hover:text-sky-500"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-sky-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            <div className="group relative">
              <Link
                href={cityHref}
                prefetch={false}
                className="group/menu relative inline-flex items-center gap-1 px-4 py-2 text-base font-medium text-gray-700 transition-all duration-300 hover:text-sky-500"
              >
                Services
                <ChevronDown
                  size={16}
                  className="transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180"
                />
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-sky-500 transition-all duration-300 group-hover/menu:w-full" />
              </Link>

              <div className="invisible absolute left-1/2 top-full z-[80] mt-3 w-[760px] -translate-x-1/2 opacity-0 shadow-2xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <div className="overflow-hidden rounded-xl border border-sky-100 bg-white">
                  <div className="flex items-center justify-between gap-4 border-b border-slate-100 bg-gradient-to-r from-sky-50 via-white to-indigo-50 px-5 py-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-500">
                        Chennai Directory
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-700">
                        Open a Chennai service page or browse by area.
                      </p>
                    </div>
                    <Link
                      href={cityHref}
                      prefetch={false}
                      className="shrink-0 rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-800"
                    >
                      Open Directory
                    </Link>
                    <Link
                      href={`${cityHref}/gated-communities`}
                      prefetch={false}
                      className="shrink-0 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-700 transition hover:bg-sky-50"
                    >
                      Gated Communities
                    </Link>
                  </div>

                  <div className="grid grid-cols-[0.9fr_1.1fr] gap-4 p-4">
                    <div>
                      <p className="px-2 text-xs font-black uppercase tracking-[0.18em] text-indigo-700">
                        Services
                      </p>
                      <div className="mt-3 max-h-[420px] space-y-2 overflow-y-auto pr-2">
                        {chennaiConfig.services.map((service) => (
                          <Link
                            key={service.slug}
                            href={`${cityHref}/${service.slug}`}
                            prefetch={false}
                            className="block rounded-lg border border-slate-200 px-3 py-2.5 transition hover:border-sky-300 hover:bg-sky-50"
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
                      <p className="px-2 text-xs font-black uppercase tracking-[0.18em] text-indigo-700">
                        Areas
                      </p>
                      <div className="mt-3 max-h-[420px] grid grid-cols-2 gap-2 overflow-y-auto pr-2">
                        {chennaiConfig.areas.map((area) => (
                          <Link
                            key={area.slug}
                            href={`${cityHref}/${area.slug}`}
                            prefetch={false}
                            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-600"
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
                className="group relative px-4 py-2 text-base font-medium text-gray-700 transition-all duration-300 hover:text-sky-500"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-sky-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={siteConfig.contact.phoneHref}
              className="hidden items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-sky-400 hover:text-sky-500 sm:inline-flex"
            >
              <Phone size={16} />
              {siteConfig.contact.phoneLabel}
            </a>

            <Link
              href="/request-quote"
              prefetch={false}
              className="hidden rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700 md:inline-block"
            >
              Request Quote
            </Link>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              className="relative z-[70] inline-flex h-11 w-11 items-center justify-center rounded-full border border-sky-200 bg-white text-slate-900 shadow-md shadow-sky-100 transition hover:border-sky-400 hover:text-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400 lg:hidden"
            >
              {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </header>

        <div className="border-t border-slate-200 bg-slate-900 text-white">
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 overflow-x-auto whitespace-nowrap px-3 py-2 text-[11px] font-bold sm:gap-5 sm:text-xs">
            <a
              href={siteConfig.contact.phoneHref}
              className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 transition hover:bg-white/10 hover:text-[#C9A227]"
            >
              <Phone size={13} />
              {siteConfig.contact.phoneLabel}
            </a>

            <a
              href={siteConfig.contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 transition hover:bg-white/10 hover:text-[#C9A227]"
            >
              <MessageCircle size={13} />
              WhatsApp {siteConfig.contact.whatsappLabel}
            </a>

            <a
              href={siteConfig.contact.emailHref}
              className="hidden items-center gap-1.5 rounded-full px-2 py-1 transition hover:bg-white/10 hover:text-[#C9A227] sm:inline-flex"
            >
              <Mail size={13} />
              {siteConfig.contact.email}
            </a>
          </div>
        </div>
      </div>

      <div className="pt-[112px] sm:pt-[124px] lg:pt-[132px]" />
      <div className="block lg:hidden">
        <MenuClient open={open} onClose={() => setOpen(false)} />
      </div>
    </>
  );
};

export default memo(Header);
