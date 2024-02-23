const { resolve } = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
  webpack(config) {
    config.resolve.alias["handlebars"] = resolve(
      __dirname,
      "node_modules/handlebars/dist/cjs/handlebars.js"
    );
    return config;
  },
};

module.exports = nextConfig;
