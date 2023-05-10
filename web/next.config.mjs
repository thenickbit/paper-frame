import "./src/env.mjs";

/** @type {import("next").NextConfig} */
const config = {
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

export default config;
