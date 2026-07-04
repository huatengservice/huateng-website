import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://huateng-website.vercel.app";

function localePath(locale: Locale, path: string): string {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const suffix = path === "/" ? "" : path;
  return `${prefix}${suffix}` || "/";
}

// Canonical + hreflang alternates for a page, e.g. localizedAlternates("/services", "en")
export function localizedAlternates(
  path: string,
  locale: Locale,
): NonNullable<Metadata["alternates"]> {
  return {
    canonical: localePath(locale, path),
    languages: {
      "zh-TW": localePath("zh-TW", path),
      en: localePath("en", path),
      "x-default": localePath(routing.defaultLocale, path),
    },
  };
}
