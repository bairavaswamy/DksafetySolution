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
    <div className="w-full">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {siteConfig.clients.map((client) => (
          <AudienceCard key={client} client={client} />
        ))}
      </div>
    </div>
  );
}

function AudienceCard({ client }: { client: string }) {
  const image = audienceImages[client as keyof typeof audienceImages] ?? siteConfig.defaultImage;

  return (
    <div className="group flex min-h-[136px] w-full flex-col items-center justify-center gap-3 overflow-hidden rounded border border-primary-100 bg-white p-4 text-center shadow-sm shadow-soft transition-transform hover:-translate-y-1 hover:border-secondary-200">
      <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-white bg-primary-50 shadow-md shadow-primary-900/10 ring-1 ring-primary-100 transition-transform group-hover:scale-105">
        <Image
          src={image}
          alt=""
          fill
          sizes="64px"
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="text-sm font-bold text-slate-900">{client}</div>
    </div>
  );
}

export default memo(Clients);
