import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    // Uploaded media is served from Supabase Storage.
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co" }],
  },
  // Pin the workspace root so Next ignores stray parent lockfiles.
  turbopack: {
    root: path.join(__dirname),
  },
  // Tree-shake icon imports for smaller bundles.
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
