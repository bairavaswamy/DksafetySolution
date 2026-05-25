import type { ReactNode } from "react";
import { getAllServiceAreaPaths } from "../../../content/serviceAreaCatalog";

type ServiceLayoutProps = {
  children: ReactNode;
};

export const dynamicParams = false;

export function generateStaticParams({
  params,
}: {
  params: { city: string; area: string };
}) {
  return getAllServiceAreaPaths()
    .filter((item) => item.city === params.city && item.area === params.area)
    .map(({ city, area, service }) => ({ city, area, service }));
}

export default function ServiceLayout({ children }: ServiceLayoutProps) {
  return children;
}
