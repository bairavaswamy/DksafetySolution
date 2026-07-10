import type { ReactNode } from "react";

type AreaLayoutProps = {
  children: ReactNode;
};

export const dynamicParams = false;

export default function AreaLayout({ children }: AreaLayoutProps) {
  return children;
}
