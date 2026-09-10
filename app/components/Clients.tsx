import { memo } from "react";
import Image from "next/image";
import { siteConfig } from "../config/site.config";

const audienceProfiles = {
  "Residential Homes": {
    logo: "/images/audience-logos/residential-homes.svg",
    description: "Balcony, window, terrace, and family safety planning.",
  },
  Apartments: {
    logo: "/images/audience-logos/apartments.svg",
    description: "Clean drilling, compact access, and society-friendly finish.",
  },
  Villas: {
    logo: "/images/audience-logos/villas.svg",
    description: "Open edges, stair voids, pets, and private terrace safety.",
  },
  "Commercial Spaces": {
    logo: "/images/audience-logos/commercial-spaces.svg",
    description: "Large openings, utility shafts, facades, and work zones.",
  },
  Communities: {
    logo: "/images/audience-logos/communities.svg",
    description: "Common areas, sports zones, amenities, and shared blocks.",
  },
} as const;

function Clients() {
  return (
    <div className="mx-auto mt-7 max-w-7xl">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {siteConfig.clients.map((client) => (
          <AudienceCard key={client} client={client} />
        ))}
      </div>
    </div>
  );
}

function AudienceCard({ client }: { client: string }) {
  const profile =
    audienceProfiles[client as keyof typeof audienceProfiles] ??
    audienceProfiles["Residential Homes"];

  return (
    <article className="group rounded-lg border border-primary-100 bg-white p-5 text-center shadow-[0_14px_34px_rgba(20,45,59,0.08)] transition duration-300 hover:-translate-y-1 hover:border-secondary-300 hover:shadow-[0_20px_48px_rgba(20,45,59,0.14)]">
      <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full bg-white p-1 shadow-[0_12px_26px_rgba(20,45,59,0.18)] ring-1 ring-primary-100 transition duration-300 group-hover:ring-secondary-300">
        <Image
          src={profile.logo}
          alt={`${client} safety service logo`}
          fill
          sizes="96px"
          className="object-contain"
          unoptimized
        />
      </div>
      <h3 className="mt-4 text-base font-black leading-5 text-slate-950">{client}</h3>
      <p className="mx-auto mt-2 max-w-[210px] text-sm leading-6 text-slate-600">
        {profile.description}
      </p>
      <span className="mt-4 inline-flex rounded-full bg-secondary-50 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-secondary-700">
        Site ready
      </span>
    </article>
  );
}

export default memo(Clients);
