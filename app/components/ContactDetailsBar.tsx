import { siteConfig } from "../config/site.config";
import { chennaiConfig } from "../config/chennai.config";

export default function ContactDetailsBar() {
  const marqueeItems = [
    `${chennaiConfig.services.length}+ Safety Services`,
    `${chennaiConfig.areas.length}+ Chennai Areas`,
    "Free Site Visit",
    "Invisible Grill Installation",
    "Pigeon Nets",
    "Balcony Nets",
    "Sports Nets",
    "Cloth Hangers",
    siteConfig.contact.phoneLabel,
    `WhatsApp ${siteConfig.contact.whatsappLabel}`,
  ];

  return (
    <div className="w-full overflow-hidden bg-primary-900 text-sm text-white shadow-sm shadow-primary-900/20">
      <div className="marquee-mask relative flex whitespace-nowrap py-2.5">
        {[0, 1].map((group) => (
          <div key={group} className="marquee-track flex shrink-0 items-center gap-4 px-2">
            {marqueeItems.map((item) => (
              <span
                key={`${group}-${item}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white sm:text-xs"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                {item}
              </span>
            ))}
            <a
              href={siteConfig.contact.phoneHref}
              className="inline-flex items-center rounded-full bg-red-600 px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-white transition hover:bg-red-700 sm:text-xs"
            >
              Call Now
            </a>
            <a
              href={siteConfig.contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-white transition hover:bg-accent-600 sm:text-xs"
            >
              WhatsApp
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
