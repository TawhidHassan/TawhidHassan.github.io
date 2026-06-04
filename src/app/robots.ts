import type { MetadataRoute } from "next";
import { siteMeta } from "@/lib/data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteMeta.url}/sitemap.xml`,
    host: siteMeta.url,
  };
}
