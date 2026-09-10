const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const sources = require("./service-image-sources.json");

const rootDir = path.resolve(__dirname, "..");
const outputDir = path.join(rootDir, "public", "images", "services");

// These sources were reviewed for the actual service subject. Reuse an
// accurate image at different sizes instead of substituting unrelated scenes.
const variants = [
  { role: "hero", source: "hero", width: 1600, height: 1000 },
  { role: "mobile-hero", source: "hero", width: 720, height: 960 },
  { role: "detail", source: "detail", width: 1000, height: 750 },
  { role: "context", source: "context", width: 1000, height: 650 },
  { role: "area-card", source: "context", width: 640, height: 420 },
];

async function generate() {
  const requested = process.argv.slice(2);
  const slugs = requested.length ? requested : Object.keys(sources);

  // Verify every source before touching the exported image set.
  for (const slug of slugs) {
    if (!sources[slug]) throw new Error(`Unknown service: ${slug}`);
    for (const role of ["hero", "detail", "context"]) {
      const source = path.resolve(rootDir, sources[slug][role]);
      if (!source.startsWith(`${rootDir}${path.sep}`)) {
        throw new Error(`Image source is outside the project: ${source}`);
      }
      if (!fs.existsSync(source)) throw new Error(`Missing ${slug} ${role} source: ${source}`);
    }
  }

  let count = 0;
  for (const slug of slugs) {
    const dir = path.join(outputDir, slug);
    fs.mkdirSync(dir, { recursive: true });
    for (const variant of variants) {
      const source = path.resolve(rootDir, sources[slug][variant.source]);
      await sharp(source)
        .rotate()
        .resize(variant.width, variant.height, {
          fit: "cover",
          position: "centre",
          withoutEnlargement: true,
        })
        .webp({ quality: 85, effort: 6 })
        .toFile(path.join(dir, `${slug}-${variant.role}.webp`));
      count += 1;
    }
  }
  console.log(`Generated ${count} optimized WebP images for ${slugs.length} services.`);
}

generate().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
