import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export: `npm run build` writes the whole site to `out/`.
  output: "export",
  // The Next.js image optimizer needs a server, which a static export doesn't have.
  // The two images on the site are already small, pre-sized PNGs.
  images: { unoptimized: true },
};

export default nextConfig;
