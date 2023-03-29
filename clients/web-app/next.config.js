const path = require("path");
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
  output: "standalone",
};

module.exports = nextConfig;
