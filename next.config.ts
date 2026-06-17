import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // The Craft page is now Brand. Keep old links/bookmarks working.
  async redirects() {
    return [
      {
        source: "/craft",
        destination: "/brand",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
