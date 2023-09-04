/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['bjhggmghrukolvrzasek.supabase.co'],
  },
  experimental: {
    serverActions: true,
    mdxRs: true,
  },
};

const withMDX = require('@next/mdx')();
module.exports = withMDX(nextConfig);
