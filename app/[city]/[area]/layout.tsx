import type { ReactNode } from "react";
import { getAllServiceAreaPaths } from "../../content/serviceAreaCatalog";

type AreaLayoutProps = {
  children: ReactNode;
};

export const dynamicParams = false;

export function generateStaticParams({
  params,
}: {
  params: { city: string };
}) {
  const seen = new Set<string>();

  return getAllServiceAreaPaths()
    .filter((item) => item.city === params.city)
    .map(({ city, area }) => ({ city, area }))
    .filter((params) => {
      const key = `${params.city}/${params.area}`;

      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    });
}

export default function AreaLayout({ children }: AreaLayoutProps) {
  return children;
}
