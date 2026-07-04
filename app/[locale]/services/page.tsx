import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { use } from "react";
import { Link } from "@/i18n/navigation";
import { getServices, site } from "@/lib/content";
import type { Locale } from "@/i18n/routing";
import ServiceIcon from "@/components/ServiceIcon";
import TradeDivider from "@/components/TradeDivider";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default function ServicesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("services");
  const services = getServices(locale);

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

      <section className="py-14">
        <div className="mx-auto max-w-[1080px] px-5 sm:px-7">
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {services.map((service, i) => (
              <li
                key={service.id}
                className="bg-paper-card border-line hover:border-amber-500 rounded-xl border p-7 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <ServiceIcon name={service.icon} />
                  <span className="font-mono text-amber-700 text-xs">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h2 className="mt-4 mb-1.5 text-xl font-bold">
                  {service.name}
                </h2>
                <p className="text-navy-800 mb-3 text-sm font-medium">
                  {service.description}
                </p>
                <p className="text-ink-soft text-sm">{service.details}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-[1080px] px-5 sm:px-7">
          <div className="bg-navy-900 flex flex-col items-start justify-between gap-6 rounded-2xl p-8 sm:flex-row sm:items-center sm:p-10">
            <div>
              <h2 className="mb-2 text-2xl font-bold text-white">
                {t("ctaTitle")}
              </h2>
              <p className="max-w-[440px] text-sm text-[#C9D2E3]">
                {t("ctaText")}
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3.5">
              <Link
                href="/contact"
                className="bg-amber-500 text-navy-900 hover:bg-amber-600 rounded-md px-6 py-3.5 text-[0.95rem] font-bold transition-colors hover:text-white"
              >
                {t("ctaButton")} <span aria-hidden="true">→</span>
              </Link>
              <a
                href={site.phoneHref}
                className="rounded-md border-[1.5px] border-white/40 px-6 py-3.5 text-[0.95rem] font-bold text-white transition-colors hover:border-white"
              >
                {t("ctaCall")} {site.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
