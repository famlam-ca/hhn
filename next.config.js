/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.famlam.ca",
      },
    ],
  },
};

module.exports = nextConfig;
