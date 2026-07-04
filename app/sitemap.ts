import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/metadata";

const PATHS = ["/", "/services", "/gallery", "/about", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((path) => {
    const suffix = path === "/" ? "" : path;
    return {
      url: `${SITE_URL}${suffix || "/"}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: path === "/" ? 1 : 0.8,
      alternates: {
        languages: {
          "zh-TW": `${SITE_URL}${suffix || "/"}`,
          en: `${SITE_URL}/en${suffix}`,
        },
      },
    };
  });
}
