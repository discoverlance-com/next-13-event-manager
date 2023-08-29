/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/photo-**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/storage/events/images/**",
      },
    ],
  },
};

module.exports = nextConfig;
