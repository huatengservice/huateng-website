"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFoundPage() {
  const t = useTranslations("notFound");

  return (
    <section className="mx-auto max-w-[1080px] px-5 py-24 text-center sm:px-7">
      <div className="font-mono text-amber-600 text-sm tracking-widest">
        404
      </div>
      <h1 className="mt-3 mb-4 text-3xl font-black sm:text-4xl">
        {t("title")}
      </h1>
      <p className="text-ink-soft mx-auto mb-8 max-w-md">{t("text")}</p>
      <Link
        href="/"
        className="bg-navy-900 hover:bg-navy-800 inline-block rounded-md px-6 py-3.5 text-[0.95rem] font-bold text-white transition-colors"
      >
        {t("backHome")}
      </Link>
    </section>
  );
}
