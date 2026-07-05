import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // English was removed at the owner's request (2026-07); to re-add it,
  // restore "en" here plus messages/en.json and the LanguageToggle
  // component from git history.
  locales: ["zh-TW"],
  defaultLocale: "zh-TW",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
