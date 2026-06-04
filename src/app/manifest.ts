import type { MetadataRoute } from "next";
import { profile, siteMeta } from "@/lib/data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} — Senior Flutter Developer`,
    short_name: profile.name,
    description: siteMeta.description,
    start_url: "/",
    display: "standalone",
    background_color: "#050509",
    theme_color: "#050509",
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
