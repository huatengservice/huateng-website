import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { use } from "react";
import { getGallery } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";
import TradeDivider from "@/components/TradeDivider";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gallery" });
  return pageMetadata({
    locale: locale as Locale,
    path: "/gallery",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default function GalleryPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("gallery");
  const items = getGallery();

  return (
    <>
      <section className="pt-16 pb-10">
        <div className="mx-auto max-w-[1080px] px-5 sm:px-7">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h1 className="mt-3 mb-4 text-3xl font-black sm:text-4xl">
            {t("title")}
          </h1>
          <p className="text-ink-soft max-w-[560px] text-lg">{t("lead")}</p>
          <p className="border-amber-500 text-amber-700 mt-5 inline-block rounded-md border border-dashed bg-[#FDF1DE] px-3 py-2 font-mono text-xs">
            {t("placeholderNotice")}
          </p>
        </div>
      </section>

      <TradeDivider />

      <section className="py-14 pb-20">
        <div className="mx-auto max-w-[1080px] px-5 sm:px-7">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="bg-paper-card border-line overflow-hidden rounded-xl border"
              >
                <div className="grid grid-cols-2">
                  <figure className="relative">
                    <Image
                      src={item.before}
                      alt={`${item.caption} — ${t("before")}`}
                      width={800}
                      height={600}
                      unoptimized
                      className="aspect-[4/3] w-full object-cover"
                    />
                    <figcaption className="text-navy-800 absolute top-2 left-2 rounded bg-white/85 px-2 py-0.5 font-mono text-[0.65rem]">
                      {t("before")}
                    </figcaption>
                  </figure>
                  <figure className="relative">
                    <Image
                      src={item.after}
                      alt={`${item.caption} — ${t("after")}`}
                      width={800}
                      height={600}
                      unoptimized
                      className="aspect-[4/3] w-full object-cover"
                    />
                    <figcaption className="bg-amber-500 text-navy-900 absolute top-2 left-2 rounded px-2 py-0.5 font-mono text-[0.65rem]">
                      {t("after")}
                    </figcaption>
                  </figure>
                </div>
                <div className="p-5">
                  <h2 className="mb-1 text-base font-bold">{item.caption}</h2>
                  <p className="font-mono text-ink-soft text-xs">{item.tag}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
