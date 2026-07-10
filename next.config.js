/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV === "development";

const nextConfig = {
  reactStrictMode: true,
  ...(isDev ? {} : { output: "export" }),
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

module.exports = nextConfig;
