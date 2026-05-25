import { siteConfig } from "../config/site.config";

export type GatedCommunityServiceSlug =
  | "balcony-safety-nets"
  | "pigeon-safety-nets"
  | "invisible-grills"
  | "window-safety-nets"
  | "anti-bird-nets";

export type GatedCommunity = {
  name: string;
  slug: string;
  locality: string;
  corridor: string;
  addressNote: string;
  homeMix: string;
  dailyRhythm: string;
  accessNote: string;
  balconyNote: string;
  windowNote: string;
  birdNote: string;
  finishNote: string;
  sourceUrl: string;
};

export type GatedCommunityService = {
  name: string;
  slug: GatedCommunityServiceSlug;
  plainName: string;
  problem: string;
  quietWin: string;
  inspectionFocus: string;
  residentConcern: string;
  materialNote: string;
};

export type GatedCommunityPage = {
  citySlug: "chennai";
  community: GatedCommunity;
  service: GatedCommunityService;
  path: string;
  variant: number;
  metadata: {
    title: string;
    description: string;
    keywords: string[];
  };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
  };
  images: {
    hero: string;
    detail: string;
    context: string;
  };
  proof: {
    label: string;
    value: string;
    text: string;
  }[];
  intro: {
    heading: string;
    paragraphs: string[];
  };
  sections: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  }[];
  checklist: string[];
  faq: {
    question: string;
    answer: string;
  }[];
  closing: {
    heading: string;
    paragraphs: string[];
  };
};

export const gatedCommunityServices: GatedCommunityService[] = [
  {
    name: "Balcony Safety Nets",
    slug: "balcony-safety-nets",
    plainName: "balcony safety net",
    problem: "open balcony edges, railing gaps, children moving quickly between rooms, pets following movement outside, and drying stands kept too close to the edge",
    quietWin: "a safer balcony that still feels open for air, plants, conversations, and evening use",
    inspectionFocus: "railing height, wall edges, ceiling beam, furniture position, side gaps, association visibility rules, and how the family uses the balcony on an ordinary day",
    residentConcern: "the net looking heavy from the hall or making a premium balcony feel smaller",
    materialNote: "UV-stable mesh, firm border rope, clean anchors, and corner tension that can handle Chennai heat and monsoon dampness",
  },
  {
    name: "Pigeon Safety Nets",
    slug: "pigeon-safety-nets",
    plainName: "pigeon safety net",
    problem: "droppings near balcony corners, AC ledges, beam pockets, utility shelves, window sills, and quiet spots that birds return to every morning",
    quietWin: "a cleaner balcony routine without blocking light, airflow, or access to AC service and washing areas",
    inspectionFocus: "fresh droppings, nesting spots, ledges above eye level, side returns, pipe gaps, AC outdoor units, and where birds first land before entering",
    residentConcern: "paying for a front net while the actual bird route remains open from the side or top",
    materialNote: "tight anti-entry mesh, neat border lines, non-sagging corners, and fixing points that avoid water pockets and cleaning trouble",
  },
  {
    name: "Invisible Grills",
    slug: "invisible-grills",
    plainName: "invisible grill",
    problem: "families wanting fall protection on premium balconies and windows without losing the open view, facade finish, or natural light",
    quietWin: "stainless steel cable protection that almost disappears into the view while giving a stronger sense of edge safety",
    inspectionFocus: "frame strength, side wall depth, cable spacing, tension route, child reach, balcony use, and association rules for exterior appearance",
    residentConcern: "visible hardware, loose cable lines, or a finish that makes the home look less refined",
    materialNote: "marine-grade stainless steel cable where suitable, measured spacing, stable frames, and a clean line that respects the building elevation",
  },
  {
    name: "Window Safety Nets",
    slug: "window-safety-nets",
    plainName: "window safety net",
    problem: "wide bedroom windows, kitchen ventilation openings, child-accessible sills, utility windows, and bird entry through service-side gaps",
    quietWin: "safer window ventilation that keeps rooms usable without closing every window through the day",
    inspectionFocus: "window swing, sill depth, grill gap, cleaning access, mosquito mesh position, curtain movement, and whether the window faces ducts or open ledges",
    residentConcern: "a net interfering with window operation, cleaning, or the look of a finished room",
    materialNote: "low-profile mesh, tidy corner tying, hardware chosen for the frame, and enough slack-free clearance for daily opening and closing",
  },
  {
    name: "Anti Bird Nets",
    slug: "anti-bird-nets",
    plainName: "anti bird net",
    problem: "repeated bird entry into balconies, ducts, shafts, service yards, roof cut-outs, and utility corners where cleaning becomes a weekly fight",
    quietWin: "a practical bird-control barrier that protects the route, not just the most visible opening",
    inspectionFocus: "top beam gaps, balcony side slits, duct openings, shaft depth, AC brackets, pipe runs, drainage, and future maintenance needs",
    residentConcern: "messy netting, blocked service access, or work that solves one opening while leaving another easy entry point",
    materialNote: "route-matched mesh, firm hooks, serviceable edges, and a finish that can survive weather without sagging into the usable space",
  },
];

export const gatedCommunities: GatedCommunity[] = [
  {
    name: "House of Hiranandani Egattur",
    slug: "house-of-hiranandani-egattur",
    locality: "Egattur",
    corridor: "OMR",
    addressNote: "near SIPCOT IT Park and the OMR-ECR connector belt",
    homeMix: "high-rise apartments inside a large township setting",
    dailyRhythm: "shift-based IT routines, school runs, evening balcony time, and weekend amenity use",
    accessNote: "tower access, lift coordination, visitor approval, and association timing should be checked before the team arrives",
    balconyNote: "tall apartment faces and open views make neat tension and discreet corner work important",
    windowNote: "upper-floor windows need safety without disturbing ventilation or curtain movement",
    birdNote: "coastal breeze, ledges, and service corners can invite repeated bird movement around higher floors",
    finishNote: "premium high-rise elevation calls for quiet hardware and straight visual lines",
    sourceUrl: "https://www.roofandfloor.com/chennai/blog/top-10-gated-community-flats-in-omr",
  },
  {
    name: "Appaswamy Altezza",
    slug: "appaswamy-altezza-perungudi",
    locality: "Perungudi",
    corridor: "OMR",
    addressNote: "on Rajiv Gandhi Salai near the Perungudi and Kottivakkam work belt",
    homeMix: "modern multi-tower apartment community with larger city-facing homes",
    dailyRhythm: "weekday commute pressure, work-from-home calls, children using balcony corners, and frequent window ventilation",
    accessNote: "parking entry, lift slot, and work timing matter because Perungudi towers stay active through the day",
    balconyNote: "balconies often face traffic, open plots, or other towers, so the finish should look clean from inside",
    windowNote: "bedroom and kitchen windows need a net line that does not interrupt daily airflow",
    birdNote: "utility ledges and AC pockets can become regular landing points if side gaps are ignored",
    finishNote: "urban apartment detailing benefits from slim borders and minimal visible knots",
    sourceUrl: "https://www.roofandfloor.com/chennai/blog/top-10-gated-community-flats-in-omr",
  },
  {
    name: "Pacifica Aurum",
    slug: "pacifica-aurum-padur",
    locality: "Padur",
    corridor: "OMR",
    addressNote: "near the Padur and Siruseri stretch of OMR",
    homeMix: "large phased residential township with families, tenants, and long-term owners",
    dailyRhythm: "IT corridor schedules, school transport, evening sports, and balcony drying routines",
    accessNote: "phase, tower, basement parking, and security gate instructions should be shared before booking",
    balconyNote: "wide tower faces need straight net lines that do not ripple across larger spans",
    windowNote: "cross-ventilation is important in Padur homes, so window protection must stay practical",
    birdNote: "open surroundings and ledges can create repeated landing routes around balconies and service areas",
    finishNote: "large-community work should look consistent from flat to flat where association rules apply",
    sourceUrl: "https://www.roofandfloor.com/chennai/blog/top-10-gated-community-flats-in-omr",
  },
  {
    name: "Olympia Opaline",
    slug: "olympia-opaline-navalur",
    locality: "Navalur",
    corridor: "OMR",
    addressNote: "on Rajiv Gandhi Salai in the Navalur IT corridor",
    homeMix: "apartment and villa-style community living around shared amenities",
    dailyRhythm: "office shuttles, family evenings, clubhouse movement, and balcony plants or drying stands",
    accessNote: "visitor entry and association permissions are easier when photos and tower details are sent early",
    balconyNote: "balcony protection should support family use without making amenity-facing homes feel closed",
    windowNote: "windows facing inner courts, roads, or service sides may need different fixing choices",
    birdNote: "birds often test quiet ledges, sunshades, and utility corners before settling into a routine",
    finishNote: "a polished community needs netting that is tidy from both inside the flat and the common view",
    sourceUrl: "https://mygate.com/blog/neighbourhood/best-residential-societies-in-chennai/",
  },
  {
    name: "Prestige Bella Vista",
    slug: "prestige-bella-vista-porur",
    locality: "Iyyappanthangal and Porur",
    corridor: "West Chennai",
    addressNote: "along Mount Poonamallee Road near Porur",
    homeMix: "large residential township with many towers and active family flats",
    dailyRhythm: "school schedules, hospital and IT commute, evening balcony use, and busy amenity weekends",
    accessNote: "block name, tower entry, lift use, and permitted work hours should be confirmed in advance",
    balconyNote: "balcony spans vary by tower, so measurements should not be assumed from a neighboring flat",
    windowNote: "higher-floor windows need safety while keeping the room open for light and air",
    birdNote: "large towers can create repeated ledge routes near AC units and balcony side returns",
    finishNote: "because the township is visually prominent, neat exterior lines matter as much as strength",
    sourceUrl: "https://mygate.com/blog/neighbourhood/best-residential-societies-in-chennai/",
  },
  {
    name: "Hiranandani Parks Oragadam",
    slug: "hiranandani-parks-oragadam",
    locality: "Oragadam",
    corridor: "Southwest Chennai",
    addressNote: "near the Singaperumal-Oragadam highway belt",
    homeMix: "large township with apartments, villas, open landscapes, and long internal movement",
    dailyRhythm: "industrial corridor commutes, family evenings, terrace use, and weekend outdoor routines",
    accessNote: "gate entry, internal directions, and the exact block should be shared because the campus is spread out",
    balconyNote: "wind exposure and open surroundings should notes anchor choice and net tension",
    windowNote: "windows may face wide open air, gardens, or road edges and need site-specific fixing",
    birdNote: "open green edges can increase bird movement around balconies, shafts, and upper ledges",
    finishNote: "township homes need a durable but calm finish that does not look temporary",
    sourceUrl: "https://mygate.com/blog/neighbourhood/best-residential-societies-in-chennai/",
  },
  {
    name: "DLF Gardencity Siruseri",
    slug: "dlf-gardencity-siruseri",
    locality: "Siruseri",
    corridor: "OMR",
    addressNote: "near Siruseri and the SIPCOT IT corridor",
    homeMix: "apartment community shaped around work-corridor family living",
    dailyRhythm: "early office travel, late returns, children using common areas, and balcony downtime",
    accessNote: "security approval, tower route, and timing should be arranged before a service team is sent",
    balconyNote: "open balconies need fall protection that keeps views and airflow comfortable",
    windowNote: "bedroom and utility windows need clean coverage without making the flat feel sealed",
    birdNote: "service corners and ledges can attract birds when flats remain quiet during work hours",
    finishNote: "the community setting rewards consistent, low-profile hardware and clean visual alignment",
    sourceUrl: "https://mygate.com/blog/neighbourhood/best-residential-societies-in-chennai/",
  },
  {
    name: "Purva Windermere",
    slug: "purva-windermere-pallikaranai",
    locality: "Pallikaranai",
    corridor: "South Chennai",
    addressNote: "near Pallikaranai and the Velachery-OMR residential belt",
    homeMix: "resort-style apartment community with many family homes",
    dailyRhythm: "school buses, work travel, balcony gardens, and evening use around amenities",
    accessNote: "tower and flat access should account for security, parking, and permitted working windows",
    balconyNote: "balcony nets should avoid blocking plant care, drying space, and open-air seating",
    windowNote: "windows around bedrooms and kitchens need protection that does not trap heat",
    birdNote: "wetland-side air movement and ledges can make bird route mapping important",
    finishNote: "the final look should feel residential and gentle, not industrial",
    sourceUrl: "https://ip.palligram.com/best-condos-in-chennai/",
  },
  {
    name: "Prestige Highline",
    slug: "prestige-highline-pallavaram",
    locality: "Pallavaram",
    corridor: "GST Road",
    addressNote: "near GST Road and Pallavaram connectivity",
    homeMix: "urban apartment community for families and professionals",
    dailyRhythm: "airport-side travel, GST Road commute, daily window ventilation, and compact balcony use",
    accessNote: "traffic timing, visitor gate entry, and lift coordination should be checked before work",
    balconyNote: "balconies often need compact but firm coverage that does not reduce movement",
    windowNote: "road-facing windows need safety and bird control while staying easy to clean",
    birdNote: "AC shelves, facade ledges, and quieter side openings can become recurring bird routes",
    finishNote: "a sharp city-facing finish works well with straight borders and minimal clutter",
    sourceUrl: "https://mygate.com/blog/neighbourhood/best-residential-societies-in-chennai/",
  },
  {
    name: "SPR Osian Chlorophyll",
    slug: "spr-osian-chlorophyll-porur",
    locality: "Porur",
    corridor: "West Chennai",
    addressNote: "near Porur Link Road and the bypass service road",
    homeMix: "green-themed apartment community with family-focused living",
    dailyRhythm: "hospital and IT corridor commute, evening balcony use, and active shared spaces",
    accessNote: "association timing and tower access should be checked because work may be visible from common areas",
    balconyNote: "balcony protection should keep the green-facing feel open and usable",
    windowNote: "window nets must allow airflow through Chennai heat without looking heavy",
    birdNote: "landscaped surroundings can increase ledge activity, especially around quiet corners",
    finishNote: "soft, tidy lines suit the community better than rough temporary fixing",
    sourceUrl: "https://mygate.com/blog/neighbourhood/best-residential-societies-in-chennai/",
  },
  {
    name: "TVS Emerald Elements",
    slug: "tvs-emerald-elements-kovilambakkam",
    locality: "Kovilambakkam",
    corridor: "Southwest Chennai",
    addressNote: "near Kovilambakkam and the Pallikaranai-Medavakkam belt",
    homeMix: "modern residential community with family apartments and shared amenities",
    dailyRhythm: "school movement, work commute, drying routines, and evening balcony breaks",
    accessNote: "the service team should know the block, parking point, lift rule, and association timing",
    balconyNote: "balcony openings need clean protection that does not disturb everyday utility use",
    windowNote: "windows facing inner courts or roads may need different frame choices",
    birdNote: "side gaps, ledges, and utility openings should be checked before quoting",
    finishNote: "newer apartment finishes deserve neat anchors and stable line work",
    sourceUrl: "https://mygate.com/blog/neighbourhood/best-residential-societies-in-chennai/",
  },
  {
    name: "Alliance Humming Gardens",
    slug: "alliance-humming-gardens-kelambakkam",
    locality: "Kelambakkam",
    corridor: "OMR",
    addressNote: "near Kelambakkam and Thaiyur on the OMR growth belt",
    homeMix: "villa and apartment-style gated living with larger residential edges",
    dailyRhythm: "IT corridor commute, children outdoors, pet movement, and balcony or terrace use",
    accessNote: "unit type, gate entry, internal roads, and exact fixing area should be shared before visit",
    balconyNote: "villa-style and apartment-style openings can need very different protection details",
    windowNote: "large windows need clean safety work without spoiling the view",
    birdNote: "open surroundings can create landing routes around terraces, balconies, and window ledges",
    finishNote: "the work should feel matched to the home, not added as an afterthought",
    sourceUrl: "https://mygate.com/blog/neighbourhood/best-residential-societies-in-chennai/",
  },
  {
    name: "BBCL Villa Haven",
    slug: "bbcl-villa-haven-thiruverkadu",
    locality: "Thiruverkadu",
    corridor: "West Chennai",
    addressNote: "near Perumalagaram and Thiruverkadu",
    homeMix: "villa-led gated living with spacious family homes",
    dailyRhythm: "independent-home routines, children moving between floors, terrace use, and outdoor drying",
    accessNote: "the installer should know whether work is on balcony, terrace, stair void, or window before arrival",
    balconyNote: "villa balconies may include side returns and decorative edges that need careful fixing",
    windowNote: "larger windows should stay openable and easy to clean after protection is added",
    birdNote: "terrace ledges and roof edges can bring bird issues even when balconies look clean",
    finishNote: "home-specific detailing matters more than a standard apartment rectangle",
    sourceUrl: "https://mygate.com/blog/neighbourhood/best-residential-societies-in-chennai/",
  },
  {
    name: "BBCL Stanburry",
    slug: "bbcl-stanburry-kolapakkam",
    locality: "Kolapakkam",
    corridor: "West Chennai",
    addressNote: "near Anna Main Road, Kolapakkam",
    homeMix: "apartment and villa-style community living",
    dailyRhythm: "family schedules, school routes, balcony utility, and quiet evening home use",
    accessNote: "flat or villa type should be confirmed because fixing and ladder access can change",
    balconyNote: "balcony safety should respect both privacy and the look of the elevation",
    windowNote: "window protection should not interrupt cross-breeze in warmer rooms",
    birdNote: "AC ledges, parapet corners, and service-side windows should be inspected together",
    finishNote: "a calm residential finish suits the community better than loud visible hardware",
    sourceUrl: "https://mygate.com/blog/neighbourhood/best-residential-societies-in-chennai/",
  },
  {
    name: "Jains Inseli Park",
    slug: "jains-inseli-park-padur",
    locality: "Padur",
    corridor: "OMR",
    addressNote: "near Padur on the OMR stretch",
    homeMix: "large apartment community serving OMR families and professionals",
    dailyRhythm: "work commutes, balcony drying, school pickups, and evening shared-space activity",
    accessNote: "tower, lift, and gate approval should be confirmed before scheduling",
    balconyNote: "balcony nets should be tight enough for higher floors and neat enough for daily living",
    windowNote: "window safety should keep rooms breathable during humid months",
    birdNote: "service ledges and quiet corners can become regular bird entry points if left open",
    finishNote: "consistent line work helps the installation blend into a large community elevation",
    sourceUrl: "https://mygate.com/blog/neighbourhood/best-residential-societies-in-chennai/",
  },
  {
    name: "Akshaya Today",
    slug: "akshaya-today-thaiyur",
    locality: "Thaiyur",
    corridor: "OMR",
    addressNote: "near Thaiyur and Kelambakkam",
    homeMix: "apartment and villa community on the southern growth corridor",
    dailyRhythm: "OMR commute, school travel, balcony utility, and weekend outdoor use",
    accessNote: "site entry and internal directions should be shared because the area has multiple developing pockets",
    balconyNote: "balcony openings can face open land, roads, or internal streets and need different tension choices",
    windowNote: "window nets should stay serviceable for cleaning and seasonal airflow",
    birdNote: "open surroundings can increase bird activity on ledges and roof-side gaps",
    finishNote: "durability matters because exposed edges can see more sun and wind",
    sourceUrl: "https://mygate.com/blog/neighbourhood/best-residential-societies-in-chennai/",
  },
  {
    name: "KG Impressions",
    slug: "kg-impressions-maduravoyal",
    locality: "Maduravoyal",
    corridor: "Chennai Bypass",
    addressNote: "near the Maduravoyal bypass and western city links",
    homeMix: "urban apartment community with strong road connectivity",
    dailyRhythm: "bypass commute, school movement, balcony drying, and practical family living",
    accessNote: "traffic timing and entry approval should be handled before the team starts toward the site",
    balconyNote: "balcony protection should be compact, strong, and easy to live with",
    windowNote: "road-facing windows need safety without making rooms dark or hard to ventilate",
    birdNote: "facade ledges and utility windows can collect droppings if side access remains open",
    finishNote: "a practical but tidy finish is the right fit for a busy urban address",
    sourceUrl: "https://mygate.com/blog/neighbourhood/best-residential-societies-in-chennai/",
  },
  {
    name: "Brigade Xanadu",
    slug: "brigade-xanadu-mogappair",
    locality: "Mogappair West",
    corridor: "West Chennai",
    addressNote: "near Mogappair West and Nolambur",
    homeMix: "large themed residential community with family apartments",
    dailyRhythm: "school runs, office commute, evening balconies, and active internal streets",
    accessNote: "community entry, block name, and flat access should be shared with photos before scheduling",
    balconyNote: "balcony work should keep the architectural feel clean and open",
    windowNote: "window protection should suit larger rooms and daily ventilation",
    birdNote: "ledge routes, AC units, and quiet service sides need checking in larger blocks",
    finishNote: "a refined community should get restrained hardware and careful tension lines",
    sourceUrl: "https://www.brigadesgroup.com/projects-in-chennai/brigade-xanadu-celeste/",
  },
  {
    name: "Radiance Flourish",
    slug: "radiance-flourish-tiruvottiyur",
    locality: "Tiruvottiyur",
    corridor: "North Chennai",
    addressNote: "near Thiruvottiyur High Road",
    homeMix: "large residential community in a fast-changing North Chennai belt",
    dailyRhythm: "port-side commute, school movement, balcony utility, and humid coastal weather",
    accessNote: "work timing, tower entry, and material movement should be confirmed before the visit",
    balconyNote: "balcony nets should suit stronger sun, humidity, and everyday utility use",
    windowNote: "window protection should not trap heat in rooms facing the road or sea breeze",
    birdNote: "coastal humidity and ledges can make bird-control maintenance important",
    finishNote: "hardware choice should respect moisture exposure and still look neat",
    sourceUrl: "https://mygate.com/blog/neighbourhood/best-residential-societies-in-chennai/",
  },
  {
    name: "Starwood Towers",
    slug: "starwood-towers-vengaivasal",
    locality: "Vengaivasal and Sithalapakkam",
    corridor: "Medavakkam belt",
    addressNote: "on the Mambakkam-Medavakkam Main Road side",
    homeMix: "multi-storied residential community with lake-side and open-area surroundings",
    dailyRhythm: "family living, school travel, balcony use, utility routines, and association-led community activity",
    accessNote: "association communication, tower access, and the exact service area should be settled before work starts",
    balconyNote: "open views and wind exposure make tension, anchoring, and corner finishing important",
    windowNote: "window nets should protect without cutting off the airy feel residents value",
    birdNote: "open surroundings can increase bird routes around balconies, ducts, and service ledges",
    finishNote: "the right result is steady and quiet, not visually busy from inside the flat",
    sourceUrl: "https://www.starwoodtowers.in/",
  },
];

const introOpeners = [
  "A service visit in a Chennai apartment usually starts before the tool bag is opened. The guard needs the tower name, the resident checks lift access, and the installer has to understand how the balcony or window is actually used.",
  "Most calls begin with a simple concern. A child moves too close to the rail, birds keep returning to one corner, a window stays shut for safety, or the family wants protection without losing light and air.",
  "In a gated community, the opening belongs to the home but it is also visible from shared spaces. That makes clean fixing, timing, lift use, and association rules part of the job.",
  "The work is successful when daily life feels normal after installation. Curtains should open, plants should stay reachable, clothes should dry, windows should move, and the safety line should not keep asking for attention.",
  "Balconies and windows are not just measurements. Height, wind, frame depth, side gaps, bird routes, and the way a family uses the space all change the right installation method.",
];

const layoutVariants = ["emerald", "sky", "slate", "amber", "rose"] as const;

const serviceBySlug = Object.fromEntries(
  gatedCommunityServices.map((service) => [service.slug, service])
) as Record<GatedCommunityServiceSlug, GatedCommunityService>;

const communityBySlug = Object.fromEntries(
  gatedCommunities.map((community) => [community.slug, community])
) as Record<string, GatedCommunity>;

const imagePath = (
  community: GatedCommunity,
  service: GatedCommunityService,
  role: "hero" | "detail" | "context"
) => `/images/gated-communities/${community.slug}/${service.slug}-${role}.webp`;

const wordCount = (text: string) =>
  text.match(/[A-Za-z0-9]+(?:['-][A-Za-z0-9]+)?/g)?.length ?? 0;

const paragraph = (sentences: string[]) => sentences.join(" ");

const pick = <T,>(items: T[], index: number) => items[index % items.length];

const titleTemplates = [
  (service: GatedCommunityService, community: GatedCommunity) =>
    `${service.name} for ${community.name}`,
  (service: GatedCommunityService, community: GatedCommunity) =>
    `${service.name} for ${community.name}`,
  (service: GatedCommunityService, community: GatedCommunity) =>
    `${service.name} for ${community.name}`,
  (service: GatedCommunityService, community: GatedCommunity) =>
    `${service.name} for ${community.name}`,
  (service: GatedCommunityService, community: GatedCommunity) =>
    `${service.name} for ${community.name}`,
];

const heroLeadTemplates = [
  (service: GatedCommunityService, community: GatedCommunity) =>
    `${community.name} needs ${service.name.toLowerCase()} shaped around gate access, family routines, association rules, and the exact balcony, window, ledge, or service route inside the home.`,
  (service: GatedCommunityService, community: GatedCommunity) =>
    `For ${community.name}, ${service.name.toLowerCase()} should protect the opening without making the flat feel closed, untidy, or difficult to maintain.`,
  (service: GatedCommunityService, community: GatedCommunity) =>
    `${service.name} in ${community.name} works better when the visit starts with the tower, floor, opening shape, and the way the family uses the space.`,
  (service: GatedCommunityService, community: GatedCommunity) =>
    `A clean ${service.plainName} layout for ${community.name} should handle safety, airflow, access, and appearance together.`,
  (service: GatedCommunityService, community: GatedCommunity) =>
    `${community.locality} homes like ${community.name} need ${service.name.toLowerCase()} that feels practical after the team leaves, not just neat in one photograph.`,
];

const introHeadingTemplates = [
  (service: GatedCommunityService, community: GatedCommunity) =>
    `${service.name} for ${community.name}`,
  (service: GatedCommunityService, community: GatedCommunity) =>
    `${community.name} ${service.name}`,
  (service: GatedCommunityService, community: GatedCommunity) =>
    `${service.name} inside ${community.name}`,
  (service: GatedCommunityService, community: GatedCommunity) =>
    `${service.name} for ${community.locality} homes`,
  (service: GatedCommunityService, community: GatedCommunity) =>
    `${service.name} for ${community.name} with a clean finish`,
];

const serviceHomeLines: Record<GatedCommunityServiceSlug, string[]> = {
  "balcony-safety-nets": [
    "Balcony work has to respect drying space, plants, railing height, and the way children or pets move between the hall and the outside edge.",
    "The main point is not only closing the balcony; it is keeping the balcony usable after the net is fixed.",
    "A balcony net should follow the real risk line, including side gaps, rail reach, planter position, and any upper opening birds can use.",
    "The family should still be able to stand, clean, dry clothes, and use the balcony without feeling the mesh every minute.",
    "A measured balcony net keeps the open feel while making the edge less worrying for daily family use.",
  ],
  "pigeon-safety-nets": [
    "Pigeon work starts by finding the entry route, because the mess on the floor is usually only the last sign.",
    "The useful fix is the one that blocks ledges, side returns, beam pockets, and AC corners without making cleaning harder.",
    "Pigeons often return to the same quiet corner, so the installer has to read the landing points before quoting.",
    "A front-facing net alone may not solve the problem when birds are entering from a top slit or side service gap.",
    "The plan should leave AC service and balcony cleaning possible while cutting off the regular bird route.",
  ],
  "invisible-grills": [
    "Invisible grill work is about edge safety without taking away the view that made the balcony or window pleasant.",
    "Cable spacing, frame strength, and clean alignment matter more than a quick visual promise.",
    "The installation should look calm from the living room and stay firm under normal family use.",
    "A good cable line protects the opening while letting light, air, and the outside view remain part of the room.",
    "The installer should check wall depth and fixing strength before promising an invisible grill layout.",
  ],
  "window-safety-nets": [
    "Window work has to keep shutters, curtains, cleaning access, and ventilation in mind.",
    "A window net should make the room easier to use, not make the family keep the window closed again.",
    "The fixing point depends on sill depth, grill position, frame type, and whether the window faces a duct or open side.",
    "Bedrooms, kitchens, and utility windows each need a slightly different treatment.",
    "The net should sit low-profile enough that the window still feels like part of the room.",
  ],
  "anti-bird-nets": [
    "Anti bird netting should cover the route birds use, not only the most visible opening.",
    "The installer has to check beam gaps, pipes, AC brackets, ducts, ledges, and service corners before deciding the scope.",
    "A neat bird-control job prevents repeat entry while keeping drain, cleaning, and maintenance access in mind.",
    "The work should reduce cleaning stress without creating sagging pockets where dust collects.",
    "Bird-control netting is most useful when it follows movement, not a square-foot guess.",
  ],
};

const accessLines = [
  "Before the team arrives, the resident can save time by sharing the tower name, block, lift instruction, preferred slot, and photos of the opening.",
  "A smoother visit comes from simple preparation: gate approval, tower details, parking instruction, and a clear note on the opening that needs work.",
  "In a busy society, entry timing matters because loose material, ladder movement, and drilling time all affect common areas.",
  "The visit should fit the building rules instead of forcing the resident to manage confusion at the gate.",
  "A few details before the visit usually prevent delay, extra material trips, and rushed fixing.",
];

const inspectionLines = [
  "A phone photo helps, but the quote should still account for wall edge, frame depth, ceiling beam, ledge shape, and side gaps.",
  "The installer should check where the risk starts, how the opening is cleaned, and whether the family needs access later for AC or maintenance.",
  "Width and height alone are not enough when the fixing surface, corner return, and daily use can change the whole job.",
  "A careful measurement looks at the usable space, not just the empty opening.",
  "The right scope becomes clear only after the team sees the route, reach point, fixing surface, and expected finish.",
];

const finishLines = [
  "The final line should look straight from inside the room and calm from the common-view side.",
  "Clean corners, tidy knots, and stable tension matter because residents see the work every day.",
  "A neat finish should not draw attention when curtains are open or when someone stands near the balcony.",
  "The material should feel like part of the home, not like a temporary patch.",
  "Good finishing is quiet: firm, aligned, easy to clean around, and not visually heavy.",
];

const quoteLines = [
  "The quote should explain what is covered, what is not covered, and whether side gaps, top gaps, AC ledges, hooks, clamps, drilling, and cleanup are included.",
  "A clear scope prevents the common problem where a low phone estimate changes after the opening is inspected.",
  "The resident should know how the material is fixed, how long the work may take, and what support is available after installation.",
  "The price should be connected to the actual opening, not to a rough guess made before seeing the home.",
  "A useful quote is short, clear, and specific enough that the resident knows what will happen on installation day.",
];

const personalizeParagraph = (
  text: string,
  _community: GatedCommunity,
  _service: GatedCommunityService,
  _index: number
) => text;

const buildPage = (
  community: GatedCommunity,
  service: GatedCommunityService,
  communityIndex: number,
  serviceIndex: number
): GatedCommunityPage => {
  const variant = (communityIndex + serviceIndex) % layoutVariants.length;
  const route = `/chennai/${community.slug}/${service.slug}`;
  const opener = introOpeners[(communityIndex + serviceIndex * 2) % introOpeners.length];
  const pageIndex = communityIndex * gatedCommunityServices.length + serviceIndex;
  const title = pick(titleTemplates, pageIndex)(service, community);
  const description = `${service.name} for ${community.name} in ${community.locality}, Chennai, with clear notes on access, measurement, material choice, finish, and day-to-day use.`;
  const homeLine = pick(serviceHomeLines[service.slug], pageIndex);
  const accessLine = pick(accessLines, pageIndex + serviceIndex);
  const inspectionLine = pick(inspectionLines, pageIndex + communityIndex);
  const finishLine = pick(finishLines, pageIndex + serviceIndex * 2);
  const quoteLine = pick(quoteLines, pageIndex + communityIndex * 2);

  const sectionPool = [
    {
      eyebrow: "Home Context",
      heading: `${service.name} in daily use`,
      paragraphs: [
        paragraph([
          opener,
          `At ${community.name}, the setting is ${community.homeMix}, and the daily pattern includes ${community.dailyRhythm}.`,
          `That matters because ${service.name.toLowerCase()} changes how the family uses a balcony, window, or service edge every day.`,
          homeLine,
        ]),
        paragraph([
          `The concern is often connected to ${service.problem}.`,
          `A rushed measurement can miss the route, the reach point, or the visual line that makes the job succeed.`,
          `The useful questions are simple: where does the issue begin, who uses the space, what should remain easy after installation, and what will the association notice from outside.`,
          `The aim is ${service.quietWin}.`,
        ]),
      ],
    },
    {
      eyebrow: "Community Access",
      heading: `${community.name} gate entry and lift timing`,
      paragraphs: [
        paragraph([
          `${community.name} is not a stand-alone house where an installer can simply arrive and begin.`,
          `The location cue is ${community.addressNote}, and the practical access note is simple: ${community.accessNote}.`,
          accessLine,
          `For the installation team, it means bringing the correct ladder, anchor set, rope, mesh, and tools for the actual fixing surface instead of guessing at the gate.`,
        ]),
        paragraph([
          `Large societies often allow service work only during certain hours, and the team should respect those rules even when the job itself is small.`,
          `A neat visit avoids blocking the lift lobby, leaving dust near a corridor, or carrying loose material through a common area without preparation.`,
          `Residents notice those details because they are part of community life.`,
          `A good ${service.plainName} installation should feel organized from entry to cleanup, not only strong after the final knot is tied.`,
        ]),
      ],
    },
    {
      eyebrow: "Inspection",
      heading: `What should be checked before quoting ${community.name}`,
      paragraphs: [
        paragraph([
          `The inspection should focus on ${service.inspectionFocus}.`,
          inspectionLine,
          `A quote that only asks for width and height may look fast, yet it can miss the small detail that later creates sagging, bird entry, window obstruction, or a finish the resident does not like.`,
        ]),
        paragraph([
          `The installer should also ask what has already been tried.`,
          `Some residents have tied temporary plastic mesh, some have closed the window for months, some clean the same ledge every week, and some are acting before a child or pet grows into a risky habit.`,
          `Those details change the job.`,
          `They help decide whether the answer is a full opening cover, a side return, a stronger border, a slimmer cable line, or a serviceable net edge that can be opened later for maintenance.`,
        ]),
      ],
    },
    {
      eyebrow: "Balcony Use",
      heading: `Keeping the ${community.locality} balcony usable`,
      paragraphs: [
        paragraph([
          community.balconyNote,
          `That is especially important when families use the same balcony for plants, drying clothes, storing a small stool, speaking on the phone, watching children play below, or getting ten quiet minutes after work.`,
          `A ${service.plainName} should not steal that use.`,
          `It should protect the edge or entry route while letting the resident keep the rhythm that made the balcony worth using.`,
        ]),
        paragraph([
          `The safest layout is often the one that anticipates movement.`,
          `If a drying stand comes close to the rail, if a child can climb a planter, if a pet watches the road through a side gap, or if birds enter from above the visible opening, the fixing line has to respond to that behavior.`,
          `A clean rectangle may look tidy in a photo, but a lived-in balcony needs a layout that follows risk and daily use together.`,
        ]),
      ],
    },
    {
      eyebrow: "Window Use",
      heading: `Windows at ${community.name} should still open easily`,
      paragraphs: [
        paragraph([
          community.windowNote,
          `Many Chennai residents delay window safety because they worry about losing breeze, blocking cleaning access, or making the room look unfinished.`,
          `That worry is fair.`,
          `The answer is careful frame reading: how the shutter opens, where the grill sits, how curtains fall, whether there is an existing mosquito mesh, and whether the window faces a duct, road, inner court, or open side.`,
        ]),
        paragraph([
          `For ${service.name.toLowerCase()}, window work should be measured with the resident present when possible.`,
          `A small change in fixing point can decide whether the window remains easy to open or becomes irritating every morning.`,
          `The line should be firm enough to stay safe, but not so intrusive that the family stops using the window.`,
          `That balance is what separates careful residential work from quick net tying.`,
        ]),
      ],
    },
    {
      eyebrow: "Bird Route",
      heading: `Bird entry points around ${community.name}`,
      paragraphs: [
        paragraph([
          community.birdNote,
          `The visible mess is often only the last step in the route.`,
          `Birds may first sit on a beam, test an AC bracket, slip through a side slit, settle near a pipe, or use a quiet ledge before the resident notices the floor.`,
          `For ${community.name}, the inspection should follow those clues before any final material quantity is promised.`,
        ]),
        paragraph([
          `This is why ${service.name.toLowerCase()} work can overlap with cleaning habits, AC maintenance, and balcony storage.`,
          `A net that blocks the front but leaves a top pocket open can disappoint the resident within days.`,
          `A stronger plan closes the repeated entry path, keeps drain and service access in mind, and avoids loose pockets where dust or feathers collect.`,
          `The result should be cleaner living, not just a covered photograph.`,
        ]),
      ],
    },
    {
      eyebrow: "Material And Finish",
      heading: `Material and finish for ${community.corridor} weather`,
      paragraphs: [
        paragraph([
          `${service.materialNote} are the practical heart of this page.`,
          `Chennai heat, coastal humidity in some belts, monsoon dampness, and high-rise wind can all expose weak material choices.`,
          `In ${community.name}, the right material is the one that suits the opening and the resident's expectation, not simply the lowest square-foot number.`,
        ]),
        paragraph([
          community.finishNote,
          `Residents in established communities often care deeply about the line they see from the living room.`,
          `Crooked edges, hanging knots, mismatched fixing points, and sagging corners make even strong work feel unfinished.`,
          finishLine,
        ]),
      ],
    },
    {
      eyebrow: "Quote Details",
      heading: `What the ${community.name} quote should say clearly`,
      paragraphs: [
        paragraph([
          quoteLine,
          `If the work is for ${service.plainName}, the quote should also explain why that scope was chosen for ${community.name}.`,
          `A clear written scope avoids the familiar frustration where a low phone estimate changes after the installer sees the site.`,
        ]),
        paragraph([
          `This is also where holiday timing, 24-hour enquiry, and emergency requests should be handled honestly.`,
          `${siteConfig.name} can receive calls and WhatsApp enquiries through the day, but community work still depends on resident availability, gate approval, and association rules.`,
          `When everyone knows the timing, the visit becomes easier, the work finishes cleaner, and the resident has a clear reason to trust the service after installation.`,
        ]),
      ],
    },
    {
      eyebrow: "Maintenance",
      heading: `${service.name} care after installation`,
      paragraphs: [
        paragraph([
          `After installation, the resident should avoid tying heavy items to the net or cable, pulling the mesh during cleaning, or cutting a small opening for convenience.`,
          `Those little changes weaken a safety system.`,
          `For ${community.name}, a simple maintenance habit helps: look at corners after heavy rain or strong wind, check whether a fixing point has moved, and call for adjustment before a loose edge becomes a bigger repair.`,
        ]),
        paragraph([
          `Maintenance should be easy if the installation leaves enough access for normal home use.`,
          `The resident should still be able to clean the balcony floor, open windows, service AC units, move plants, and use the utility space without fighting the protection.`,
          `That is the standard for ${service.plainName}: it makes the home safer and cleaner while staying quiet in daily life.`,
        ]),
      ],
    },
    {
      eyebrow: "Family Use",
      heading: `${community.name} homes need room to move`,
      paragraphs: [
        paragraph([
          `${community.homeMix} means the same opening may be used by children, elders, tenants, pets, guests, and domestic help at different times of the day.`,
          `The installation should not turn a normal corner into something everyone has to work around.`,
          `For ${service.name.toLowerCase()}, the safer result is the one that protects the risk point and still lets the room breathe.`,
        ]),
        paragraph([
          `The small habits matter: where a stool is kept, where clothes dry, how the curtain falls, how often the window is opened, and whether a plant stand sits near the rail.`,
          `Those details are easy to miss in a quick quote.`,
          `They are also the details that decide whether the work feels comfortable after a week of normal use.`,
        ]),
      ],
    },
    {
      eyebrow: "Work Timing",
      heading: `Service timing inside ${community.name}`,
      paragraphs: [
        paragraph([
          `${community.dailyRhythm} can make timing important, especially when residents are working from home or children are moving in and out after school.`,
          `The visit should be fixed for a slot where drilling, ladder use, and balcony access can happen without rushing.`,
          `If the association has a work-hour rule, it should be followed from the beginning.`,
        ]),
        paragraph([
          `A clean visit also means fewer calls from security, less waiting near the lift, and less pressure on the resident during the job.`,
          `${siteConfig.name} can receive enquiries through the day, but the actual work still has to fit the building's access rules.`,
          `That keeps the service simple for the resident and respectful for the community.`,
        ]),
      ],
    },
    {
      eyebrow: "Before Work Starts",
      heading: `Photos that help for ${community.name}`,
      paragraphs: [
        paragraph([
          `Useful photos show the full opening, both side corners, the top beam, the floor edge, nearby AC units, and any place where birds or safety concerns are noticed.`,
          `For ${service.name.toLowerCase()}, close-up photos can help explain the problem, but wide photos show the fixing route.`,
          `Both are useful before a team is sent.`,
        ]),
        paragraph([
          `The resident should also mention the floor level, tower or block, and whether the opening faces a road, duct, inner court, open land, or another tower.`,
          `That information helps the team carry the right material and avoid guesswork.`,
          `It also makes the first quote conversation more honest.`,
        ]),
      ],
    },
  ];

  const sections = sectionPool
    .slice(pageIndex % 3)
    .concat(sectionPool.slice(0, pageIndex % 3))
    .slice(0, 9);

  const personalizedSections = sections.map((section, sectionIndex) => ({
    ...section,
    paragraphs: section.paragraphs.map((item, paragraphIndex) =>
      personalizeParagraph(
        item,
        community,
        service,
        sectionIndex * 3 + paragraphIndex + communityIndex + serviceIndex
      )
    ),
  }));

  const checklistPool = [
    `Share ${community.name} tower, block, flat, and gate-entry details before the visit.`,
    `Send clear photos of the balcony, window, ledge, and service-side gaps from inside the home.`,
    `Confirm drilling, facade visibility, lift use, and working-hour rules with the association.`,
    `Ask whether side gaps, top gaps, AC ledges, and duct edges are included in the scope.`,
    `Check that cleaning, window movement, drying space, and future AC service remain possible.`,
    `Confirm material, fixing method, visit time, after-service contact, and cleanup before approval.`,
    `Mention whether children, elders, pets, plants, or drying stands use the opening often.`,
    `Tell the team if birds enter from the top, side, AC bracket, pipe route, or duct edge.`,
    `Share the floor level and whether the opening faces road, open land, inner court, or another tower.`,
  ];

  const checklist = checklistPool
    .slice(pageIndex % checklistPool.length)
    .concat(checklistPool.slice(0, pageIndex % checklistPool.length))
    .slice(0, 6);

  const faqPool = [
    {
      question: `Can ${service.name.toLowerCase()} be done in ${community.name} without changing the look too much?`,
      answer: `Yes, if the fixing line is measured carefully. The team should check the wall edge, corner tension, border rope or cable line, and common-view side before starting so the work stays neat from inside and outside.`,
    },
    {
      question: `What details should I send for ${service.name.toLowerCase()} at ${community.name}?`,
      answer: `Send the tower or block, floor level, photos of the full opening, close-ups of side and top gaps, and a short note on the problem you want solved. Wide photos are useful because they show the fixing route.`,
    },
    {
      question: `Will the ${service.plainName} block air or light in my ${community.locality} flat?`,
      answer: `The material is chosen to keep normal airflow and light as much as possible. The final feel depends on the mesh or cable type, spacing, opening size, and how close the work sits to the living area.`,
    },
    {
      question: `Do ${community.name} residents need association approval before this work?`,
      answer: `It is better to check first. Many communities have rules for drilling, exterior appearance, lift use, work timing, and visitor entry. Approval before the visit avoids delay at the gate.`,
    },
    {
      question: `How is the quote decided for ${service.name.toLowerCase()} in ${community.name}?`,
      answer: `The quote depends on the opening size, fixing surface, floor access, side and top gaps, AC ledges, material choice, and whether any serviceable edge is needed for future cleaning or maintenance.`,
    },
    {
      question: `Can the balcony or window still be cleaned after the work?`,
      answer: `It should be possible if cleaning access is discussed before fixing. The installer should understand how the resident cleans the sill, floor, grill, AC area, and corners before deciding the final line.`,
    },
    {
      question: `What if birds are entering from only one corner in ${community.name}?`,
      answer: `The team should still inspect the full route. Birds may land at one place and enter from another. Closing only the visible corner can leave the same problem active after a few days.`,
    },
    {
      question: `Is drilling always needed for ${service.name.toLowerCase()}?`,
      answer: `Not always. It depends on the frame, wall, grill, beam, and fixing strength available at the opening. The installer should explain the method before starting.`,
    },
    {
      question: `How long does a ${community.name} visit usually take?`,
      answer: `Timing depends on gate entry, lift access, opening size, material, drilling points, and cleanup. A simple opening may finish faster, while larger balconies or difficult ledges need more time.`,
    },
    {
      question: `Can I ask for ${service.name.toLowerCase()} only for one window or one balcony?`,
      answer: `Yes. A single opening can be handled if that is the only concern. The team should still check nearby gaps so the result does not leave an obvious safety or bird-entry route open.`,
    },
  ];

  const faq = faqPool
    .slice(pageIndex % faqPool.length)
    .concat(faqPool.slice(0, pageIndex % faqPool.length))
    .slice(0, 6);

  return {
    citySlug: "chennai",
    community,
    service,
    path: route,
    variant,
    metadata: {
      title,
      description,
      keywords: [
        `${service.name} ${community.name}`,
        `${service.name} ${community.locality}`,
        `${community.name} safety nets`,
        `${community.name} Chennai service`,
      ],
    },
    hero: {
      eyebrow: `${community.locality} apartment service`,
      title: `${service.name} for ${community.name}`,
      lead: pick(heroLeadTemplates, pageIndex)(service, community),
    },
    images: {
      hero: imagePath(community, service, "hero"),
      detail: imagePath(community, service, "detail"),
      context: imagePath(community, service, "context"),
    },
    proof: [
      {
        label: "Community",
        value: community.locality,
        text: `${community.name} sits in the ${community.corridor} residential pattern.`,
      },
      {
        label: "Service",
        value: service.name,
        text: service.quietWin,
      },
      {
        label: "Visit",
        value: "Site Check",
        text: community.accessNote,
      },
    ],
    intro: {
      heading: pick(introHeadingTemplates, pageIndex)(service, community),
      paragraphs: [
        personalizeParagraph(
          paragraph([
            `${community.name} is ${community.homeMix} in ${community.locality}.`,
            `The day-to-day rhythm includes ${community.dailyRhythm}, so ${service.name.toLowerCase()} should match the way the home is used.`,
            `The measurement, fixing point, material, and finish should all respond to the actual balcony, window, ledge, or service opening.`,
          ]),
          community,
          service,
          communityIndex + serviceIndex
        ),
        personalizeParagraph(
          paragraph([
            `For ${community.name}, the important points are gate entry, tower access, opening shape, resident comfort, material behavior, maintenance, and a finish that does not make the home feel smaller.`,
            `No two flats should be assumed to be the same, because the small details are usually where safety and neatness are decided.`,
          ]),
          community,
          service,
          communityIndex + serviceIndex + 1
        ),
      ],
    },
    sections: personalizedSections,
    checklist,
    faq,
    closing: {
      heading: `${service.name} for ${community.name}, measured at the home.`,
      paragraphs: [
        personalizeParagraph(
          paragraph([
            `The right installation is the one that solves the reason behind the call while keeping the home easy to live in.`,
            `For ${community.name}, that means respecting access rules, studying the exact opening, choosing material for the site, and finishing the work cleanly enough that the resident stops noticing it.`,
          ]),
          community,
          service,
          communityIndex + serviceIndex + 40
        ),
        personalizeParagraph(
          paragraph([
            `Share photos on WhatsApp, mention the community and tower, and explain what is bothering you most.`,
            `A clearer first conversation leads to a better site visit, a more honest quote, and a finished result that feels made for the home rather than forced onto it.`,
          ]),
          community,
          service,
          communityIndex + serviceIndex + 41
        ),
      ],
    },
  };
};

export const gatedCommunityPages = gatedCommunities.flatMap((community, communityIndex) =>
  gatedCommunityServices.map((service, serviceIndex) =>
    buildPage(community, service, communityIndex, serviceIndex)
  )
);

export const getGatedCommunityService = (slug: string) =>
  serviceBySlug[slug as GatedCommunityServiceSlug];

export const getGatedCommunity = (slug: string) => communityBySlug[slug];

export const getGatedCommunityPage = ({
  community,
  service,
}: {
  community: string;
  service: string;
}) =>
  gatedCommunityPages.find(
    (page) => page.community.slug === community && page.service.slug === service
  );

export const getGatedCommunityStaticParams = () =>
  gatedCommunityPages.map((page) => ({
    city: page.citySlug,
    community: page.community.slug,
    service: page.service.slug,
  }));

export const countGatedCommunityPageWords = (page: GatedCommunityPage) =>
  wordCount(
    [
      page.metadata.title,
      page.metadata.description,
      page.hero.eyebrow,
      page.hero.title,
      page.hero.lead,
      page.intro.heading,
      ...page.intro.paragraphs,
      ...page.proof.flatMap((item) => [item.label, item.value, item.text]),
      ...page.sections.flatMap((section) => [
        section.eyebrow,
        section.heading,
        ...section.paragraphs,
      ]),
      ...page.checklist,
      ...page.faq.flatMap((item) => [item.question, item.answer]),
      page.closing.heading,
      ...page.closing.paragraphs,
    ].join(" ")
  );

export const gatedCommunityLayoutVariants = layoutVariants;
