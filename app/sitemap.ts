import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/metadata";

const PATHS = ["/", "/services", "/gallery", "/about", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((path) => ({
    url: path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
