const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const root = path.resolve(__dirname, "..");
const out = path.join(root, "out");
const exportedPaths = new Set();

require.extensions[".ts"] = (module, filename) => {
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    fileName: filename,
    compilerOptions: {
      esModuleInterop: true,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  });
  module._compile(outputText, filename);
};

function isFile(filename) {
  return fs.existsSync(filename) && fs.statSync(filename).isFile();
}

function isExportedFile(filename) {
  return exportedPaths.has(path.relative(out, filename).replace(/\\/g, "/"));
}

function exportedFile(pathname) {
  const filename = path.resolve(out, `.${decodeURIComponent(pathname)}`);
  const relative = path.relative(out, filename);
  if (relative.startsWith("..") || path.isAbsolute(relative)) return null;
  return [filename, path.join(filename, "index.html"), `${filename}.html`].find(isExportedFile);
}

function listFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) return listFiles(filename);
    return entry.isFile() ? [filename] : [];
  });
}

try {
  const { getStaticPagePaths } = require(path.join(root, "app/content/staticRoutes.ts"));
  const { siteConfig } = require(path.join(root, "app/config/site.config.ts"));
  const expected = getStaticPagePaths();
  const failures = [];
  const checkedUrls = new Set();
  const origin = new URL(siteConfig.url).origin;

  if (!isFile(path.join(out, "index.html"))) {
    throw new Error("No static export found. Run npm run build first.");
  }
  // Compare actual file spelling even on Windows, where existsSync ignores case.
  const files = listFiles(out);
  for (const filename of files) {
    exportedPaths.add(path.relative(out, filename).replace(/\\/g, "/"));
  }
  if (new Set(expected).size !== expected.length) failures.push("Duplicate static route URLs.");
  for (const route of expected) {
    const filename = path.join(out, route.replace(/^\//, ""), "index.html");
    if (!isExportedFile(filename)) failures.push(`Missing exported page (exact case required): ${route}`);
  }
  if (!isExportedFile(path.join(out, "404.html"))) failures.push("Missing static 404.html page.");

  const prerender = JSON.parse(fs.readFileSync(path.join(root, ".next/prerender-manifest.json"), "utf8"));
  for (const [route, config] of Object.entries(prerender.dynamicRoutes)) {
    if (config.fallback !== false) failures.push(`Runtime fallback is enabled for ${route}.`);
  }
  for (const [route, config] of Object.entries(prerender.routes)) {
    if (config.initialRevalidateSeconds !== false) {
      failures.push(`Runtime revalidation is enabled for ${route}.`);
    }
  }

  function checkUrl(value, source, baseUrl) {
    const decoded = value.replace(/&amp;/g, "&").replace(/&#(?:x26|38);/gi, "&");
    const url = new URL(decoded, baseUrl);
    if (url.origin !== origin || checkedUrls.has(url.pathname)) return;
    checkedUrls.add(url.pathname);
    if (!exportedFile(url.pathname)) {
      failures.push(`Broken local link or asset: ${url.pathname} (in ${source})`);
    }
  }

  const pages = files.filter((filename) => filename.endsWith(".html"));
  for (const filename of pages) {
    const relative = path.relative(out, filename).replace(/\\/g, "/");
    const baseUrl = new URL(relative.replace(/index\.html$/, ""), `${origin}/`);
    const html = fs.readFileSync(filename, "utf8");
    for (const match of html.matchAll(/<(?:a|link|script|img|source)\b[^>]*>/gi)) {
      for (const attribute of match[0].matchAll(/\b(href|src|srcset)="([^"]*)"/gi)) {
        const values = attribute[1].toLowerCase() === "srcset"
          ? attribute[2].split(",").map((entry) => entry.trim().split(/\s+/)[0])
          : [attribute[2]];
        for (const value of values) {
          if (value && !/^(?:data:|mailto:|tel:|javascript:)/i.test(value)) {
            checkUrl(value, relative, baseUrl);
          }
        }
      }
    }
  }

  const manifestFile = path.join(out, "manifest.webmanifest");
  if (!isExportedFile(manifestFile)) {
    failures.push("Missing static manifest.webmanifest.");
  } else {
    const manifest = JSON.parse(fs.readFileSync(manifestFile, "utf8"));
    const manifestUrl = `${origin}/manifest.webmanifest`;
    if (manifest.start_url) checkUrl(manifest.start_url, "manifest.webmanifest", manifestUrl);
    for (const icon of manifest.icons || []) {
      if (icon.src) checkUrl(icon.src, "manifest.webmanifest", manifestUrl);
    }
  }

  const sitemapFile = path.join(out, "sitemap.xml");
  if (!isExportedFile(sitemapFile) || !isExportedFile(path.join(out, "robots.txt"))) {
    failures.push("The export must include sitemap.xml and robots.txt.");
  } else {
    const sitemapPaths = new Set();
    for (const [, value] of fs.readFileSync(sitemapFile, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)) {
      sitemapPaths.add(new URL(value).pathname);
      checkUrl(value, "sitemap.xml", `${origin}/`);
    }
    for (const route of expected) {
      if (!sitemapPaths.has(route)) failures.push(`Page missing from sitemap: ${route}`);
    }
  }

  if (failures.length) {
    throw new Error(`${failures.length} static export issue(s):\n${failures.slice(0, 30).join("\n")}`);
  }
  console.log(
    `Static export validation passed: ${expected.length} content routes, ${pages.length} HTML files, ` +
    `${checkedUrls.size} local links/assets, manifest, sitemap and robots.txt. No runtime fallback or revalidation.`
  );
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
