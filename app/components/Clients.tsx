import { memo } from "react";
import Image from "next/image";
import { siteConfig } from "../config/site.config";

function Clients() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {siteConfig.clientCards.map((client) => (
          <div
            key={client.name}
            className="flex min-h-[112px] w-full flex-col items-center justify-center gap-3 overflow-hidden rounded border bg-white p-4 text-center shadow-sm shadow-soft transition-transform hover:scale-105"
          >
            <div className="relative h-14 w-14 overflow-hidden rounded-full bg-slate-100 ring-2 ring-white">
              <Image
                src={client.image}
                alt={`${client.name} safety installation example`}
                fill
                className="object-cover"
                sizes="56px"
              />
            </div>
            <div className="text-sm font-medium">{client.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(Clients);
