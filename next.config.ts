import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'shorturl.at'], 
  },
  eslint: {
    ignoreDuringBuilds: true, 
  },
};

export default nextConfig;
