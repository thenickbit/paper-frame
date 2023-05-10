/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bjhggmghrukolvrzasek.supabase.co",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
