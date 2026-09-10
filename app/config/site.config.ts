import { getServiceCardImage } from "../content/serviceVisuals";

export const siteConfig = {
  name: "DK Safety Solutions",
  shortName: "DK Safety",
  domain: "dksafetysolutions.com",
  url: "https://dksafetysolutions.com",
  tagline: "Modern safety systems for homes, balconies, windows, and open spaces.",
  description:
    "DK Safety Solutions provides balcony protection, window safety, bird control, sports netting, and utility safety services across Chennai.",
  defaultImage: "/images/site/chennai-home-hero-safety-nets.webp",
  logo: "/brand/dk-premium-icon-512.png",
  logos: {
    desktop: "/brand/dk-premium-wordmark.svg",
    desktopPng: "/brand/dk-premium-wordmark.png",
    desktopLight: "/brand/dk-premium-wordmark-light.svg",
    mobile: "/brand/dk-premium-symbol.svg",
    mobilePng: "/brand/dk-premium-symbol.png",
    favicon: "/brand/dk-premium-favicon.svg",
    faviconPng: "/brand/dk-premium-favicon-32.png",
    appleTouchIcon: "/brand/dk-premium-apple-touch-icon.png",
    icon192: "/brand/dk-premium-icon-192.png",
    icon512: "/brand/dk-premium-icon-512.png",
  },
  contact: {
    phoneLabel: "+91 9573838331",
    phoneHref: "tel:+919573838331",
    whatsappLabel: "+91 95738 38331",
    whatsappHref: "https://wa.me/919573838331",
    email: "info@dksafetysolutions.com",
    emailHref: "mailto:info@dksafetysolutions.com",
    hours: "Open 24 hours, Monday to Sunday. Holiday hours may vary.",
    location: "Chennai, Tamil Nadu",
    addressLines: [
      "L139-150, 1st Avenue, 18th St",
      "Anna Nagar East, Chennai, Tamil Nadu 600102",
      "India",
    ],
    googleBusiness: {
      name: "DK Safety Solutions : balcony safety nets, pigeon nets & invisible grills in Anna Nagar",
      shareUrl: "https://share.google/NKWcOBUaHDqsjq7HF",
      mapHref:
        "https://www.google.com/maps/search/?api=1&query=DK%20Safety%20Solutions%20balcony%20safety%20nets%20pigeon%20nets%20invisible%20grills%20Anna%20Nagar",
      mapEmbedUrl:
        "https://www.google.com/maps?q=DK%20Safety%20Solutions%20balcony%20safety%20nets%20pigeon%20nets%20invisible%20grills%20Anna%20Nagar&output=embed",
    },
  },
  business: {
    schemaTypes: ["LocalBusiness", "HomeAndConstructionBusiness"],
    legalName: "DK Safety Solutions",
    priceRange: "Contact for quote",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, UPI, Bank Transfer",
    contactType: "customer service",
    address: {
      streetAddress: "L139-150, 1st Avenue, 18th St, Anna Nagar East",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      postalCode: "600102",
      addressCountry: "IN",
    },
    geo: {
      latitude: "13.0876",
      longitude: "80.2161",
    },
    openingHours: [
      {
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    areaServed: {
      city: "Chennai",
      region: "Tamil Nadu",
      country: "IN",
    },
  },
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact-us" },
  ],
  focusAreas: [
    {
      title: "Invisible Grill Installation",
      description:
        "Clear-view grill systems for balconies and windows without blocking airflow.",
      image: getServiceCardImage("invisible-grills"),
      href: "/chennai/invisible-grills",
    },
    {
      title: "Pigeon Safety Nets",
      description:
        "Clean pigeon net protection for balconies, ducts, ledges, and utility spaces.",
      image: getServiceCardImage("pigeon-safety-nets"),
      href: "/chennai/pigeon-safety-nets",
    },
    {
      title: "Balcony Safety Nets",
      description:
        "Strong balcony safety net fitting for families, children, pets, and open edges.",
      image: getServiceCardImage("balcony-safety-nets"),
      href: "/chennai/balcony-safety-nets",
    },
    {
      title: "Sports Nets",
      description:
        "Durable practice nets for cricket, football, play areas, and terrace courts.",
      image: getServiceCardImage("football-sports-nets"),
      href: "/chennai/football-sports-nets",
    },
    {
      title: "Cloth Hanger Installation",
      description:
        "Space-saving ceiling and wall-mounted hanger systems for modern homes.",
      image: getServiceCardImage("cloth-hanger-installation"),
      href: "/chennai/cloth-hanger-installation",
    },
  ],
  galleryImages: [
    {
      src: "/images/site/chennai-home-hero-safety-nets.webp",
      title: "Chennai Balcony Safety Finish",
      alt: "Chennai apartment balcony with neat safety net and open view",
      category: "Balcony",
    },
    {
      src: "/images/site/chennai-about-installation-team.webp",
      title: "Measurement and Anchor Check",
      alt: "Installation team checking anchor points for a Chennai safety net project",
      category: "Site Visit",
    },
    {
      src: "/images/site/chennai-article-anchor-detail.webp",
      title: "Clean Anchor Detail",
      alt: "Close view of reinforced safety net anchor and rope border",
      category: "Detail",
    },
    {
      src: "/images/site/chennai-service-directory-montage.webp",
      title: "Connected Service Set",
      alt: "Chennai safety services including balcony nets, bird control, invisible grills, and sports netting",
      category: "Services",
    },
    {
      src: "/images/site/chennai-area-balcony-safety-view.webp",
      title: "Area Service View",
      alt: "Chennai apartment service area view with finished balcony safety net",
      category: "Area Pages",
    },
    {
      src: "/images/site/chennai-contact-site-visit.webp",
      title: "Contact and Site Visit",
      alt: "Safety net quote with measurement notes and mesh sample",
      category: "Contact",
    },
  ],
  trustPoints: [
    "Free site visit",
    "Clean installation",
    "Modern finish",
    "Warranty support",
  ],
  faq: [
    {
      question: "Which safety services does DK Safety Solutions provide in Chennai?",
      answer:
        "DK Safety Solutions provides balcony safety nets, pigeon safety nets, invisible grills, sports nets, cloth hanger installation, terrace nets, window nets, staircase nets, and related home safety services across Chennai.",
    },
    {
      question: "How can I contact DK Safety Solutions for a site visit?",
      answer:
        "You can call, WhatsApp, email, or use the contact form. Sharing your area, floor level, photos, and required service helps the team plan the visit faster.",
    },
    {
      question: "Does DK Safety Solutions serve Anna Nagar and other Chennai areas?",
      answer:
        "Yes. DK Safety Solutions is listed for Anna Nagar and serves Chennai areas including apartments, homes, villas, commercial spaces, and communities.",
    },
  ],
  stats: [
    { value: "Proven", label: "Bird Control", detail: "Protects balconies, terraces, and utility areas from pest birds." },
    { value: "Reliable", label: "Net Installation", detail: "Strong, low-profile nets installed with clean, safe finishes." },
    { value: "Safe", label: "Home Protection", detail: "Keeps families safe while preserving airflow and views." },
    { value: "Fast", label: "Site Survey", detail: "Quick site visits and tailored bird-control solutions for your home." },
  ],
  testimonials: [
    {
      name: "Adyar Apartment Resident",
      initials: "AR",
      location: "Adyar",
      project: "Balcony safety nets",
      quote:
        "The balcony safety net was planned around our railing gaps and cleaning access, so the space still feels open.",
    },
    {
      name: "Anna Nagar Home Owner",
      initials: "AH",
      location: "Anna Nagar",
      project: "Window safety nets",
      quote:
        "The team explained the fixing points clearly and kept the window movement easy after installation.",
    },
    {
      name: "OMR Community Manager",
      initials: "OC",
      location: "Sholinganallur",
      project: "Sports and duct nets",
      quote:
        "Our service areas needed different net types, and the Chennai page helped us compare the options quickly.",
    },
    {
      name: "Mylapore Family",
      initials: "MF",
      location: "Mylapore",
      project: "Bird control",
      quote:
        "The bird-control plan covered side gaps and cleaning needs instead of only the front balcony opening.",
    },
  ],
  clients: ["Residential Homes", "Apartments", "Villas", "Commercial Spaces", "Communities"],
  socialProfiles: [
    {
      name: "Instagram",
      href: "https://www.instagram.com/dksafetysolutions",
      label: "DK Safety Solutions on Instagram",
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/dksafetysolutions",
      label: "DK Safety Solutions on Facebook",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/dksafetysolutions",
      label: "DK Safety Solutions on LinkedIn",
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/919573838331",
      label: "DK Safety Solutions on WhatsApp",
    },
  ],
} as const;

export const absoluteUrl = (path = "/") => {
  if (path.startsWith("http")) {
    return path;
  }

  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
};
