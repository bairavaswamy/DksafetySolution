import type { ReactNode } from "react";

type CityLayoutProps = {
  children: ReactNode;
};

export const dynamicParams = false;

export default function CityLayout({ children }: CityLayoutProps) {
  return children;
}
