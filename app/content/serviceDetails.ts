import { chennaiConfig } from "../config/chennai.config";
import { getServiceVisuals } from "./serviceVisuals";

export type ServiceSlug = (typeof chennaiConfig.services)[number]["slug"];

export type ServiceDetail = {
  image: string;
  cardImage: string;
  category: string;
  shortBenefit: string;
  bestFor: string[];
  checks: string[];
};

const serviceDetailsWithOriginalImages = {
  "balcony-safety-nets": {
    image: "/birdnet/balocny-safety-nets-installation.webp",
    cardImage: "/birdnet/balocny-safety-nets-installation.webp",
    category: "Balcony Safety",
    shortBenefit: "Fall protection and bird control for daily-use apartment balconies.",
    bestFor: ["Children", "Pets", "High-rise balconies", "Utility balconies"],
    checks: ["Opening size", "Railing gaps", "Anchor points", "Balcony use"],
  },
  "children-safety-nets": {
    image: "/images/children-safety-invisible-grills-for-balcony.webp",
    cardImage: "/cards/children-safety-invisible-grills-for-balcony.webp",
    category: "Family Safety",
    shortBenefit: "Protection for homes where children use balconies, windows, and open edges.",
    bestFor: ["Family apartments", "Window openings", "Balconies", "Duplex edges"],
    checks: ["Climb points", "Furniture position", "Gap width", "Family routine"],
  },
  "anti-bird-nets": {
    image: "/birdnet/anti-bird-nets-installation.webp",
    cardImage: "/birdnet/cards/anti-bird-net.webp",
    category: "Bird Control",
    shortBenefit: "Netting that blocks bird entry into balconies, ducts, and service shafts.",
    bestFor: ["Balconies", "Utility ducts", "Shafts", "Open ledges"],
    checks: ["Bird routes", "Cleaning access", "Side gaps", "Drainage path"],
  },
  "pigeon-safety-nets": {
    image: "/images/pigeon-safety-invisible-grills.webp",
    cardImage: "/birdnet/anti-bird-nets-installation.webp",
    category: "Pigeon Control",
    shortBenefit: "Focused pigeon route control for ledges, balcony corners, and utility areas.",
    bestFor: ["Pigeon-prone balconies", "AC ledges", "Window corners", "Shaft openings"],
    checks: ["Nesting spots", "Entry direction", "Waste buildup", "Cleaning interval"],
  },
  "invisible-grills": {
    image: "/images/invisible-grill.webp",
    cardImage: "/cards/invisible-grill.webp",
    category: "Invisible Grills",
    shortBenefit: "Open-view stainless steel cable protection for modern apartment faces.",
    bestFor: ["Premium apartments", "Open views", "Large windows", "Balcony fronts"],
    checks: ["Cable spacing", "Frame strength", "View line", "Association rules"],
  },
  "balcony-invisible-grills": {
    image: "/images/invisible-grill-for-balcony.webp",
    cardImage: "/cards/Balcony-Invisible-Grills-1.webp",
    category: "Balcony Grills",
    shortBenefit: "Premium balcony safety where airflow, view, and exterior finish all matter.",
    bestFor: ["High-rise balconies", "Premium homes", "View-facing flats", "Pet safety"],
    checks: ["Cable tension", "Edge finish", "Facade line", "Fixing surface"],
  },
  "window-safety-nets": {
    image: "/birdnet/window-safety-nets-installation.webp",
    cardImage: "/birdnet/cards/window-safety-nets.webp",
    category: "Window Safety",
    shortBenefit: "Window-level netting for child safety, bird control, and safer ventilation.",
    bestFor: ["Bedroom windows", "Kitchen windows", "Utility windows", "Rental flats"],
    checks: ["Window swing", "Frame type", "Cleaning access", "Ventilation path"],
  },
  "duct-area-safety-nets": {
    image: "/images/site/chennai-article-anchor-detail.png",
    cardImage: "/images/site/chennai-article-anchor-detail.png",
    category: "Duct Safety",
    shortBenefit: "Coverage for service shafts, ducts, open voids, and utility cut-outs.",
    bestFor: ["Duct openings", "Service shafts", "Utility voids", "Apartment blocks"],
    checks: ["Void depth", "Access route", "Pipe clearance", "Future maintenance"],
  },
  "building-covering-safety-nets": {
    image: "/images/services/building-covering-safety-nets/building-covering-safety-nets-hero.webp",
    cardImage: "/images/services/building-covering-safety-nets/building-covering-safety-nets-context.webp",
    category: "Building Safety",
    shortBenefit: "Large-area net covering for building facades, shafts, open sides, and maintenance edges.",
    bestFor: ["Building facades", "Open shafts", "Construction edges", "Maintenance zones"],
    checks: ["Coverage span", "Anchor strength", "Wind exposure", "Maintenance access"],
  },
  "terrace-safety-nets": {
    image: "/birdnet/transparabt-net-installation.webp",
    cardImage: "/birdnet/cards/transparant-balcony-safety-nets.webp",
    category: "Terrace Safety",
    shortBenefit: "Open-edge protection for terraces, rooftops, and common play corners.",
    bestFor: ["Terraces", "Rooftop play", "Open parapets", "Common areas"],
    checks: ["Parapet height", "Wind load", "Access safety", "Drainage points"],
  },
  "staircase-safety-nets": {
    image: "/images/children-safety-invisible-grills-for-balcony.webp",
    cardImage: "/cards/children-safety-invisible-grills-for-balcony.webp",
    category: "Staircase Safety",
    shortBenefit: "Vertical fall protection for staircase wells, duplex voids, and railing gaps.",
    bestFor: ["Duplex homes", "Stair wells", "Kids play zones", "Open railings"],
    checks: ["Void height", "Railing gap", "Fixing side", "Visibility"],
  },
  "swimming-pool-safety-nets": {
    image: "/images/services/swimming-pool-safety-nets/swimming-pool-safety-nets-hero.webp",
    cardImage: "/images/services/swimming-pool-safety-nets/swimming-pool-safety-nets-context.webp",
    category: "Pool Safety",
    shortBenefit: "Custom net planning for pool edges, decks, and shared amenity areas.",
    bestFor: ["Pool decks", "Amenities", "Clubs", "Gated communities"],
    checks: ["Pool edge", "Drainage", "Access gates", "Common-area rules"],
  },
  "cricket-practice-nets": {
    image: "/images/Box-cricket-sports-nets-installation.webp",
    cardImage: "/images/Box-cricket-sports-nets-installation.webp",
    category: "Cricket Nets",
    shortBenefit: "Containment netting for practice lanes, terraces, academies, and play zones.",
    bestFor: ["Practice lanes", "Terraces", "Academies", "Society play zones"],
    checks: ["Ball direction", "Height", "Pole support", "Ground surface"],
  },
  "football-sports-nets": {
    image: "/images/services/football-sports-nets/football-sports-nets-hero.webp",
    cardImage: "/images/services/football-sports-nets/football-sports-nets-context.webp",
    category: "Sports Nets",
    shortBenefit: "Sports containment for football courts, turf edges, and community play areas.",
    bestFor: ["Football courts", "Turf grounds", "Play zones", "Community sports"],
    checks: ["Boundary height", "Ball impact", "Pole spacing", "Ground anchoring"],
  },
  "bird-spikes-installation": {
    image: "/images/bird-spikes-installation.webp",
    cardImage: "/images/bird-spikes-installation.webp",
    category: "Bird Spikes",
    shortBenefit: "Perch control for ledges, parapets, AC units, pipes, and facade edges.",
    bestFor: ["Ledges", "AC units", "Parapets", "Sign boards"],
    checks: ["Perch width", "Surface type", "Access height", "Cleaning need"],
  },
  "cloth-hanger-installation": {
    image: "/images/cloth-hungers-instllations.webp",
    cardImage: "/clothhangers/cards/ceiling-cloth-hangers.webp",
    category: "Cloth Hangers",
    shortBenefit: "Ceiling and balcony drying systems planned around daily utility use.",
    bestFor: ["Utility balconies", "Dry balconies", "Ceiling mounts", "Rental homes"],
    checks: ["Ceiling strength", "Drying space", "Pulley access", "Walking clearance"],
  },
} satisfies Record<ServiceSlug, ServiceDetail>;

export const serviceDetailsBySlug = Object.fromEntries(
  Object.entries(serviceDetailsWithOriginalImages).map(([slug, detail]) => {
    const visuals = getServiceVisuals(slug as ServiceSlug);

    return [
      slug,
      {
        ...detail,
        image: visuals.hero,
        cardImage: visuals.context,
      },
    ];
  })
) as Record<ServiceSlug, ServiceDetail>;

export const getServiceDetail = (slug: ServiceSlug) => serviceDetailsBySlug[slug];
