/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.famlam.ca",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
    ],
  },
};

module.exports = nextConfig;
