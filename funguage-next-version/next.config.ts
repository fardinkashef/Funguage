import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // We need to add this to allow Next.js to have access to these external domains for images 👇:
  images: {
    domains: ["utfs.io", "img.clerk.com"],
  },
};

export default nextConfig;
