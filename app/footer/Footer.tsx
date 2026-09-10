import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import SocialProfileLinks from "../components/SocialProfileLinks";
import { siteConfig } from "../config/site.config";

export default function Footer() {
  return (
    <footer className="mt-16 bg-primary-900 text-gray-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr]">
        <div>
          <Image
            src={siteConfig.logos.desktopLight}
            alt={`${siteConfig.name} logo`}
            width={900}
            height={338}
            className="mb-5 h-16 w-auto rounded-lg bg-transparent"
          />

          <p className="text-sm leading-relaxed text-gray-400">{siteConfig.description}</p>

          <SocialProfileLinks
            className="mt-6"
            heading="Follow Us"
            description={`Connect with ${siteConfig.name} across our official social profiles.`}
            variant="dark"
          />
        </div>

        <div>
          <h4 className="mb-4 text-lg font-semibold text-white">Pages</h4>

          <ul className="space-y-2 text-sm">
            {siteConfig.navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  prefetch={false}
                  className="transition-colors duration-300 hover:text-secondary-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-lg font-semibold text-white">Contact Us</h4>

          <div className="space-y-4 text-sm">
            <a
              href={siteConfig.contact.phoneHref}
              className="flex items-center gap-3 transition hover:text-secondary-300"
            >
              <Phone className="h-5 w-5 text-secondary-300" />
              {siteConfig.contact.phoneLabel}
            </a>

            <a
              href={siteConfig.contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 transition hover:text-accent-300"
            >
              <MessageCircle className="h-5 w-5 text-accent-300" />
              WhatsApp {siteConfig.contact.whatsappLabel}
            </a>

            <a
              href={siteConfig.contact.emailHref}
              className="flex items-center gap-3 transition hover:text-secondary-300"
            >
              <Mail className="h-5 w-5 text-secondary-300" />
              {siteConfig.contact.email}
            </a>

            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 text-secondary-300" />
              <p className="leading-relaxed text-gray-400">
                {siteConfig.contact.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-sm text-gray-400">
        Copyright {new Date().getFullYear()} {siteConfig.name}. All Rights Reserved.
      </div>
    </footer>
  );
}
