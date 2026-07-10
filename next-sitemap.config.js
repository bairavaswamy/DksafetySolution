const config = {
  siteUrl: "https://dksafetysolutions.com",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  trailingSlash: true,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 15000,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
  exclude: ["/admin/*", "/api/*", "/private/*", "/404", "/404.html", "/_not-found", "/manifest.webmanifest"],
  transform: async (config, path) => {
    let priority = 0.8;
    const isFile = /\.[a-z0-9]+$/i.test(path);
    const loc = path === "/" || isFile || path.endsWith("/") ? path : `${path}/`;

    if (path === "/") priority = 1.0;
    if (path === "/contact-us" || path === "/services") priority = 0.9;

    return {
      loc,
      changefreq: "daily",
      priority,
      lastmod: new Date().toISOString(),
    };
  },
  outDir: "./out",
};

module.exports = config;
