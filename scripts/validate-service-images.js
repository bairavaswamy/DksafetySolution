const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const ts = require("typescript");

const rootDir = path.resolve(__dirname, "..");

require.extensions[".ts"] = (module, filename) => {
  const source = fs.readFileSync(filename, "utf8");
  const result = ts.transpileModule(source, {
    fileName: filename,
    compilerOptions: {
      esModuleInterop: true,
      module: ts.ModuleKind.CommonJS,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      target: ts.ScriptTarget.ES2020,
    },
  });

  module._compile(result.outputText, filename);
};

const publicPathFromUrl = (url) => {
  if (!url.startsWith("/")) {
    throw new Error(`Service visual path must be root-relative: ${url}`);
  }

  return path.join(rootDir, "public", url.replace(/^\//, ""));
};

const allowedStaticRasterExtensions = new Set([".webp", ".jpg", ".jpeg"]);

const fileHash = (url) =>
  crypto.createHash("sha256").update(fs.readFileSync(publicPathFromUrl(url))).digest("hex");

try {
  const { chennaiConfig } = require(path.join(rootDir, "app", "config", "chennai.config.ts"));
  const { serviceVisualsBySlug } = require(path.join(rootDir, "app", "content", "serviceVisuals.ts"));
  const { manualServicePages } = require(path.join(rootDir, "app", "content", "manualServicePages.ts"));
  const { gatedCommunityPages } = require(path.join(rootDir, "app", "content", "gatedCommunityServicePages.ts"));

  const seen = new Map();
  const expectedKinds = ["hero", "mobileHero", "detail", "context", "areaCard"];

  for (const service of chennaiConfig.services) {
    const visuals = serviceVisualsBySlug[service.slug];

    if (!visuals) {
      throw new Error(`Missing service visual set for ${service.slug}`);
    }

    const values = expectedKinds.map((kind) => visuals[kind]);

    for (const kind of expectedKinds) {
      const url = visuals[kind];

      if (!url) {
        throw new Error(`Missing ${kind} visual for ${service.slug}`);
      }

      if (!url.includes(`/images/services/${service.slug}/`)) {
        throw new Error(`${service.slug} ${kind} visual is not in its own service folder: ${url}`);
      }

      const extension = path.extname(url).toLowerCase();

      if (!allowedStaticRasterExtensions.has(extension)) {
        throw new Error(
          `${service.slug} ${kind} visual must be a static raster image, not ${extension || "an extensionless file"}: ${url}`
        );
      }

      const filePath = publicPathFromUrl(url);

      if (!fs.existsSync(filePath)) {
        throw new Error(`Missing image file for ${service.slug} ${kind}: ${url}`);
      }

      if (seen.has(url)) {
        throw new Error(`${service.slug} ${kind} reuses ${url}, already used by ${seen.get(url)}`);
      }

      seen.set(url, `${service.slug} ${kind}`);
    }

    if (new Set(values).size !== expectedKinds.length) {
      throw new Error(`${service.slug} must use different visuals for each service image role.`);
    }

    const hashGroups = new Map();

    for (const kind of expectedKinds) {
      const hash = fileHash(visuals[kind]);
      hashGroups.set(hash, [...(hashGroups.get(hash) ?? []), kind]);
    }

    const repeatedHashGroup = [...hashGroups.values()].find((group) => group.length > 1);

    if (repeatedHashGroup) {
      throw new Error(
        `${service.slug} repeats the same image file content across roles: ${repeatedHashGroup.join(", ")}`
      );
    }
  }

  const expected = chennaiConfig.services.length * expectedKinds.length;

  if (seen.size !== expected) {
    throw new Error(`Expected ${expected} unique service images, found ${seen.size}.`);
  }

  const serviceSlugs = new Set(chennaiConfig.services.map((service) => service.slug));

  for (const page of manualServicePages) {
    if (!serviceSlugs.has(page.serviceSlug)) {
      throw new Error(`Manual page uses unknown service slug: ${page.serviceSlug}`);
    }

    const visuals = serviceVisualsBySlug[page.serviceSlug];
    const expectedPageImages = [visuals.hero, visuals.detail, visuals.context];
    const actualPageImages = [
      page.hero.image,
      ...page.sections.map((section) => section.image).filter(Boolean),
    ];

    if (page.hero.image !== visuals.hero) {
      throw new Error(
        `${page.citySlug}/${page.areaSlug}/${page.serviceSlug} hero image is not the service hero visual.`
      );
    }

    if (page.sections[0]?.image !== visuals.detail) {
      throw new Error(
        `${page.citySlug}/${page.areaSlug}/${page.serviceSlug} first section image is not the service detail visual.`
      );
    }

    if (page.sections[1]?.image !== visuals.context) {
      throw new Error(
        `${page.citySlug}/${page.areaSlug}/${page.serviceSlug} second section image is not the service context visual.`
      );
    }

    const laterSectionImage = page.sections.slice(2).find((section) => section.image);

    if (laterSectionImage) {
      throw new Error(
        `${page.citySlug}/${page.areaSlug}/${page.serviceSlug} has an extra later section image, which can reintroduce repeated legacy visuals.`
      );
    }

    if (new Set(actualPageImages).size !== actualPageImages.length) {
      throw new Error(
        `${page.citySlug}/${page.areaSlug}/${page.serviceSlug} repeats an image in the exported page data.`
      );
    }

    for (const image of actualPageImages) {
      if (!expectedPageImages.includes(image)) {
        throw new Error(
          `${page.citySlug}/${page.areaSlug}/${page.serviceSlug} uses a non-service visual: ${image}`
        );
      }
    }
  }

  for (const page of gatedCommunityPages) {
    const imageEntries = Object.entries(page.images);
    const imageUrls = imageEntries.map(([, url]) => url);

    if (new Set(imageUrls).size !== imageUrls.length) {
      throw new Error(`${page.path} repeats a gated community image URL.`);
    }

    const imageHashes = new Map();

    for (const [role, url] of imageEntries) {
      const extension = path.extname(url).toLowerCase();

      if (extension !== ".webp") {
        throw new Error(`${page.path} ${role} image must be WebP: ${url}`);
      }

      if (!fs.existsSync(publicPathFromUrl(url))) {
        throw new Error(`Missing gated community image for ${page.path} ${role}: ${url}`);
      }

      const hash = fileHash(url);
      imageHashes.set(hash, [...(imageHashes.get(hash) ?? []), role]);
    }

    const repeatedHashGroup = [...imageHashes.values()].find((group) => group.length > 1);

    if (repeatedHashGroup) {
      throw new Error(
        `${page.path} repeats the same image file content across roles: ${repeatedHashGroup.join(", ")}`
      );
    }
  }

  console.log(
    `Service image validation passed for ${chennaiConfig.services.length} services, ${seen.size} unique images, ${manualServicePages.length} normalized manual pages, and ${gatedCommunityPages.length} gated community pages.`
  );
} catch (error) {
  console.error("Service image validation failed.");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
