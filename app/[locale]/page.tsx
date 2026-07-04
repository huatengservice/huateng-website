import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { use } from "react";

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("home");

  return (
    <section className="mx-auto max-w-[1080px] px-5 py-20 sm:px-7">
      <span className="eyebrow">{t("heroEyebrow")}</span>
      <h1 className="mt-4 text-3xl leading-snug font-black sm:text-5xl">
        {t("heroTitleLine1")}
        <br />
        {t("heroTitleLine2Pre")}
        <span className="text-amber-600">{t("heroTitleAccent")}</span>
        {t("heroTitleLine2Post")}
      </h1>
      <p className="text-ink-soft mt-5 max-w-lg text-lg">{t("heroLead")}</p>
    </section>
  );
}
