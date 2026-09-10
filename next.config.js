/** @type {import('next').NextConfig} */

const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  staticPageGenerationTimeout: 180,
  images: {
    unoptimized: true,
  },
  productionBrowserSourceMaps: false,
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },
  experimental: {
    cpus: 1,
  },
  webpack: (config, { dev }) => {
    if (!dev) {
      config.cache = false;
    }

    return config;
  },
};

// Next 13's dev server misreports missing generateStaticParams when export mode
// is combined with dynamicParams=false (vercel/next.js#56253). Every production
// phase still uses static export; the dev server is only an editing tool.
module.exports = (phase) => ({
  ...nextConfig,
  ...(phase === PHASE_DEVELOPMENT_SERVER ? {} : { output: "export" }),
});
