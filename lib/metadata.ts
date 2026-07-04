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

// Full per-page metadata: title/description + canonical/hreflang + Open Graph
export function pageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
}): Metadata {
  return {
    title,
    description,
    alternates: localizedAlternates(path, locale),
    openGraph: {
      title,
      description,
      url: localePath(locale, path),
      siteName: "華騰工程行 Hua Teng Engineering",
      locale: locale === "en" ? "en_US" : "zh_TW",
      type: "website",
      images: [{ url: "/logo.svg" }],
    },
  };
}
