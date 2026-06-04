import type { MetadataRoute } from "next";
import { siteMeta } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: siteMeta.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${siteMeta.url}/#about`, lastModified: now, priority: 0.8 },
    { url: `${siteMeta.url}/#experience`, lastModified: now, priority: 0.8 },
    { url: `${siteMeta.url}/#projects`, lastModified: now, priority: 0.9 },
    { url: `${siteMeta.url}/#contact`, lastModified: now, priority: 0.7 },
  ];
}
