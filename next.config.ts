import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ... other configurations

  // Add the domain to the list of allowed hosts
  images: {
    domains: ['i.ibb.co'], // Add this line
  },
};

export default nextConfig;
