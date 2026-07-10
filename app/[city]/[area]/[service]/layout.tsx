import type { ReactNode } from "react";

type ServiceLayoutProps = {
  children: ReactNode;
};

export const dynamicParams = false;

export default function ServiceLayout({ children }: ServiceLayoutProps) {
  return children;
}
