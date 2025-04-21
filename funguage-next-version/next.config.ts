import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // We need to add this to allow Next.js to have access to these external domains for images 👇:
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io", // Your hostname
        pathname: "**", // Adjust the pathname as needed
      },
      {
        protocol: "https",
        hostname: "img.clerk.com", // Your hostname
        pathname: "**", // Adjust the pathname as needed
      },
    ],
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
