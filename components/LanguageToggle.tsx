"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export default function LanguageToggle() {
  const t = useTranslations("languageToggle");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchTo(next: Locale) {
    if (next !== locale) {
      router.replace(pathname, { locale: next });
    }
  }

  const baseBtn =
    "cursor-pointer px-3 py-1.5 font-mono text-xs transition-colors";

  return (
    <div
      role="group"
      aria-label={t("label")}
      className="border-navy-600 flex overflow-hidden rounded-full border"
    >
      <button
        type="button"
        onClick={() => switchTo("zh-TW")}
        aria-pressed={locale === "zh-TW"}
        className={`${baseBtn} ${
          locale === "zh-TW"
            ? "bg-navy-800 text-white"
            : "text-navy-600 hover:bg-navy-800/10 bg-transparent"
        }`}
      >
        {t("zh")}
      </button>
      <button
        type="button"
        onClick={() => switchTo("en")}
        aria-pressed={locale === "en"}
        className={`${baseBtn} ${
          locale === "en"
            ? "bg-navy-800 text-white"
            : "text-navy-600 hover:bg-navy-800/10 bg-transparent"
        }`}
      >
        {t("en")}
      </button>
    </div>
  );
}
