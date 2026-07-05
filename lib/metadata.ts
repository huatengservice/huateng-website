import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://huateng-website.vercel.app";

// Full per-page metadata: title/description + canonical + Open Graph
export function pageMetadata({
  path,
  title,
  description,
}: {
  locale?: Locale;
  path: string;
  title: string;
  description: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "華騰工程行 Hua Teng Engineering",
      locale: "zh_TW",
      type: "website",
      images: [{ url: "/logo.svg" }],
    },
  };
}
