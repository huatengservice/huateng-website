import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { use } from "react";
import { getAddress, getServices, site } from "@/lib/content";
import { localizedAlternates } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";
import TradeDivider from "@/components/TradeDivider";
import ContactForm from "@/components/ContactForm";
import CalendlyEmbed from "@/components/CalendlyEmbed";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: localizedAlternates("/contact", locale as Locale),
  };
}

export default function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("contact");
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

      {/* Form + direct channels */}
      <section className="py-14">
        <div className="mx-auto grid max-w-[1080px] items-start gap-8 px-5 sm:px-7 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="bg-paper-card border-line rounded-xl border p-7">
            <h2 className="mb-1 text-xl font-bold">{t("form.title")}</h2>
            <p className="text-ink-soft mb-6 text-sm">{t("form.lead")}</p>
            <ContactForm services={services} />
          </div>

          <div className="space-y-5">
            <a
              href={site.phoneHref}
              className="bg-navy-900 hover:bg-navy-800 block rounded-xl p-6 text-white transition-colors"
            >
              <div className="flex items-center gap-4">
                <span aria-hidden="true" className="text-2xl">
                  📞
                </span>
                <div>
                  <h2 className="font-bold text-white">{t("phoneTitle")}</h2>
                  <div className="font-mono text-amber-500 text-xl font-bold">
                    {site.phoneDisplay}
                  </div>
                  <p className="mt-1 text-xs text-[#C9D2E3]">
                    {t("phoneDesc")}
                  </p>
                </div>
              </div>
            </a>

            <div className="bg-paper-card border-line rounded-xl border p-6">
              <div className="flex items-start gap-4">
                <Image
                  src="/images/line-qr-placeholder.svg"
                  alt={t("lineQrNote")}
                  width={96}
                  height={96}
                  unoptimized
                  className="border-line h-24 w-24 shrink-0 rounded-lg border"
                />
                <div>
                  <h2 className="mb-1 font-bold">{t("lineTitle")}</h2>
                  <p className="text-ink-soft mb-2 text-sm">{t("lineDesc")}</p>
                  <p className="border-amber-500 text-amber-700 inline-block rounded border border-dashed bg-[#FDF1DE] px-2 py-1 font-mono text-[0.65rem]">
                    {t("lineQrNote")}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-paper-card border-line rounded-xl border p-6">
              <div className="flex items-start gap-4">
                <span aria-hidden="true" className="text-2xl">
                  📍
                </span>
                <div>
                  <h2 className="mb-1 font-bold">{t("areaTitle")}</h2>
                  <p className="text-ink-soft text-sm">{t("areaDesc")}</p>
                  <p className="text-navy-800 mt-2 text-sm font-medium">
                    {getAddress(locale)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calendly */}
      <section className="pb-14">
        <div className="mx-auto max-w-[1080px] px-5 sm:px-7">
          <div className="mb-6">
            <h2 className="mb-1 text-2xl font-bold">{t("calendlyTitle")}</h2>
            <p className="text-ink-soft text-sm">{t("calendlyDesc")}</p>
          </div>
          <CalendlyEmbed title={t("calendlyTitle")} />
        </div>
      </section>

      {/* Map */}
      <section className="pb-20">
        <div className="mx-auto max-w-[1080px] px-5 sm:px-7">
          <h2 className="mb-6 text-2xl font-bold">{t("mapTitle")}</h2>
          <div className="border-line overflow-hidden rounded-xl border">
            <iframe
              src={site.mapEmbedUrl}
              title={t("mapIframeTitle")}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[400px] w-full border-0"
            />
          </div>
        </div>
      </section>
    </>
  );
}
