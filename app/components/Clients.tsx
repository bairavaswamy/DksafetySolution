import { memo } from "react";
import Image from "next/image";
import { siteConfig } from "../config/site.config";

const audienceImages = {
  "Residential Homes": "/images/home/balcony-safety-net-installation-chennai-apartment.png",
  Apartments: "/images/home/pigeon-safety-net-balcony-chennai.png",
  Villas: "/images/home/open-balcony-safety-net.webp",
  "Commercial Spaces": "/images/services/building-covering-safety-nets/building-covering-safety-nets-hero.webp",
  Communities: "/images/home/sports-net-installation-cricket-chennai.png",
} as const;

function Clients() {
  return (
    <div className="mx-auto mt-6 max-w-7xl">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {siteConfig.clients.map((client) => (
          <AudienceCard key={client} client={client} />
        ))}
      </div>
    </div>
  );
}

function AudienceCard({ client }: { client: string }) {
  const image = audienceImages[client as keyof typeof audienceImages] ?? siteConfig.defaultImage;
  const initials = client
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 text-center shadow-soft transition duration-300 hover:-translate-y-1 hover:border-secondary-300 hover:shadow-lg">
      <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-full border-4 border-secondary-100 bg-slate-100">
        <Image
          src={image}
          alt={`${client} safety service planning`}
          fill
          sizes="80px"
          className="object-cover"
          unoptimized
        />
      </div>
      <p className="mx-auto mt-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
        {initials}
      </p>
      <h3 className="mt-2 text-sm font-semibold leading-5 text-green-900">{client}</h3>
    </article>
  );
}

export default memo(Clients);
