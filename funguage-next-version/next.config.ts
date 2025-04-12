import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // We need to add this to allow Next.js to have access to these external domains for images 👇:
  images: {
    domains: ["utfs.io", "img.clerk.com"],
  },
  // This allows production builds to complete even if there are ESLint errors, otherwise the production build will fail if there are eslint errors
  eslint: {
    ignoreDuringBuilds: true,
  },
  // This allows production builds to complete even if there are TypeScript errors, otherwise the production build will fail if there are TypeScript errors
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
