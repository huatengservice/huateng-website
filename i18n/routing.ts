import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["zh-TW", "en"],
  defaultLocale: "zh-TW",
  // zh-TW (default) serves at "/", English at "/en/..."
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
