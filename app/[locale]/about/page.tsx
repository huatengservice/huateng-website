import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { use } from "react";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/content";
import { localizedAlternates } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";
import TradeDivider from "@/components/TradeDivider";
import BrandMark from "@/components/BrandMark";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: localizedAlternates("/about", locale as Locale),
  };
}

export default function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("about");
  const tBadge = useTranslations("trustBadge");

  return (
    <>
      <section className="pt-16 pb-10">
        <div className="mx-auto max-w-[1080px] px-5 sm:px-7">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h1 className="mt-3 mb-4 text-3xl font-black sm:text-4xl">
            {t("title")}
          </h1>
          <p className="text-ink-soft max-w-[560px] text-lg">{t("lead")}</p>
        </div>
      </section>

      <TradeDivider />

      {/* Company story */}
      <section className="py-14">
        <div className="mx-auto grid max-w-[1080px] items-start gap-10 px-5 sm:px-7 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <h2 className="mb-5 text-2xl font-bold">{t("storyTitle")}</h2>
            <p className="text-navy-800 mb-4">{t("storyP1")}</p>
            <p className="text-navy-800 mb-4">{t("storyP2")}</p>
            <p className="font-mono text-ink-soft text-xs">{t("storyNote")}</p>
          </div>
          <div className="bg-paper-card border-line rounded-xl border p-7">
            <div className="mb-4 flex items-center gap-3">
              <BrandMark size={48} />
              <div>
                <div className="font-serif text-navy-900 text-lg font-bold">
                  華騰工程行
                </div>
                <div className="font-mono text-ink-soft text-[0.62rem] tracking-widest">
                  HUA TENG ENGINEERING
                </div>
              </div>
            </div>
            <dl className="grid grid-cols-3 gap-4 text-center">
              <div className="border-line rounded-lg border p-3">
                <dd className="font-serif text-amber-600 text-xl font-bold">
                  {site.reviewCount}
                </dd>
                <dt className="text-ink-soft text-xs">
                  {tBadge("statReviews")}
                </dt>
              </div>
              <div className="border-line rounded-lg border p-3">
                <dd className="font-serif text-amber-600 text-xl font-bold">
                  24hr
                </dd>
                <dt className="text-ink-soft text-xs">
                  {tBadge("statEmergency")}
                </dt>
              </div>
              <div className="border-line rounded-lg border p-3">
                <dd className="font-serif text-amber-600 text-xl font-bold">
                  {tBadge("statLevelValue")}
                </dd>
                <dt className="text-ink-soft text-xs">{tBadge("statLevel")}</dt>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Certification deep-dive */}
      <section className="pb-14">
        <div className="mx-auto max-w-[1080px] px-5 sm:px-7">
          <div className="bg-navy-900 border-navy-600 relative overflow-hidden rounded-2xl border p-7 text-white sm:p-11">
            <span
              aria-hidden="true"
              className="bg-amber-500 absolute top-0 right-0 h-[70px] w-[70px]"
              style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
            />
            <span className="eyebrow !text-amber-500">{t("certEyebrow")}</span>
            <h2 className="mt-2.5 mb-5 text-3xl font-bold text-white">
              {t("certTitle")}
            </h2>
            <div className="max-w-[720px]">
              <p className="mb-4 text-[0.95rem] text-[#C9D2E3]">
                {t("certP1")}
              </p>
              <p className="mb-8 text-[0.95rem] text-[#C9D2E3]">
                {t("certP2")}
              </p>
            </div>
            <h3 className="mb-4 text-lg font-bold text-white">
              {t("certWhyTitle")}
            </h3>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {(["1", "2", "3"] as const).map((n) => (
                <li
                  key={n}
                  className="rounded-xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="text-amber-500 mb-1.5 font-bold">
                    {t(`certWhy${n}Title`)}
                  </div>
                  <p className="text-sm text-[#D7DEEC]">{t(`certWhy${n}`)}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="pb-14">
        <div className="mx-auto max-w-[1080px] px-5 sm:px-7">
          <h2 className="mb-2 text-2xl font-bold">{t("teamTitle")}</h2>
          <p className="text-ink-soft mb-8 text-sm">{t("teamLead")}</p>
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {(["1", "2"] as const).map((n) => (
              <li
                key={n}
                className="bg-paper-card border-line flex items-center gap-5 rounded-xl border p-6"
              >
                <span className="bg-paper border-line text-ink-soft flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-dashed text-center font-mono text-[0.6rem] leading-tight">
                  {t("teamPlaceholder")}
                </span>
                <div>
                  <div className="text-navy-900 font-bold">
                    {t(`teamRole${n}`)}
                  </div>
                  <p className="text-ink-soft mt-1 text-sm">
                    {t(`teamRole${n}Desc`)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="mx-auto max-w-[1080px] px-5 sm:px-7">
          <div className="border-line bg-paper-card flex flex-col items-start justify-between gap-6 rounded-2xl border p-8 sm:flex-row sm:items-center sm:p-10">
            <div>
              <h2 className="mb-2 text-2xl font-bold">{t("ctaTitle")}</h2>
              <p className="text-ink-soft text-sm">{t("ctaText")}</p>
            </div>
            <Link
              href="/contact"
              className="bg-navy-900 hover:bg-navy-800 shrink-0 rounded-md px-6 py-3.5 text-[0.95rem] font-bold text-white transition-colors"
            >
              {t("ctaButton")} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
