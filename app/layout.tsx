import dynamic from "next/dynamic";
import "./globals.css";
import type { Metadata } from "next";
import { HeaderSkeleton, FloatingContactSkeleton } from "./components/LoadingSkeletons";
import DelayedGoogleTagManager from "./components/DelayedGoogleTagManager";
import SiteStructuredData from "./components/SiteStructuredData";
import { siteConfig } from "./config/site.config";

const FloatingContact = dynamic(() => import("./components/FloatingContact"), {
  loading: () => <FloatingContactSkeleton />,
  ssr: false,
});

const Footer = dynamic(() => import("./footer/Footer"), {
    ssr: true,
    loading: () => null,
  });

const NavBar = dynamic(() => import("./components/NavBar"), {
    loading: () => <HeaderSkeleton />,
    ssr: true,
  });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: `${siteConfig.name} | Home Safety Solutions`,
  description: siteConfig.description,
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: siteConfig.logos.faviconPng, sizes: "32x32", type: "image/png" },
      { url: siteConfig.logos.icon192, sizes: "192x192", type: "image/png" },
    ],
    shortcut: [{ url: siteConfig.logos.favicon, type: "image/png" }],
    apple: [{ url: siteConfig.logos.appleTouchIcon, sizes: "180x180", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white">
        <SiteStructuredData />
       <div>
        <NavBar />
        {children}
        <FloatingContact />
        <Footer />
        </div>
        <DelayedGoogleTagManager gtmId="GTM-MQR73NTD" />
      </body>
    </html>
  );
}
