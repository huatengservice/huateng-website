import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { use } from "react";
import { Link } from "@/i18n/navigation";
import { getServices, getTestimonials, site } from "@/lib/content";
import type { Locale } from "@/i18n/routing";
import TrustBadge from "@/components/TrustBadge";
import TradeDivider from "@/components/TradeDivider";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCarousel from "@/components/TestimonialCarousel";

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("home");
  const tCommon = useTranslations("common");

  const services = getServices().slice(0, 4);
  const testimonials = getTestimonials();

  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden pt-16 pb-16 sm:pt-20">
        <div className="mx-auto grid max-w-[1080px] items-center gap-12 px-5 sm:px-7 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div>
            <span className="eyebrow">{t("heroEyebrow")}</span>
            <h1 className="mt-4 mb-5 text-4xl leading-[1.28] font-black tracking-[0.01em] sm:text-[2.85rem]">
              {t("heroTitleLine1")}
              <br />
              {t("heroTitleLine2Pre")}
              <span className="text-amber-600">{t("heroTitleAccent")}</span>
              {t("heroTitleLine2Post")}
            </h1>
            <p className="text-ink-soft mb-8 max-w-[480px] text-lg">
              {t("heroLead")}
            </p>
            <div className="flex flex-wrap gap-3.5">
              <Link
                href="/contact"
                className="bg-navy-900 hover:bg-navy-800 inline-flex items-center gap-2 rounded-md px-6 py-3.5 text-[0.95rem] font-bold text-white transition-colors"
              >
                {tCommon("bookVisit")} <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/contact"
                className="border-navy-800 text-navy-900 hover:bg-navy-900/5 rounded-md border-[1.5px] px-6 py-3.5 text-[0.95rem] font-bold transition-colors"
              >
                {tCommon("lineConsult")}
              </Link>
            </div>
          </div>
          <TrustBadge />
        </div>
      </section>

      <TradeDivider />

      {/* Services snapshot */}
      <section className="py-16">
        <div className="mx-auto max-w-[1080px] px-5 sm:px-7">
          <div className="mb-10 max-w-[560px]">
            <span className="eyebrow">{t("servicesEyebrow")}</span>
            <h2 className="mt-2.5 text-3xl font-bold">{t("servicesTitle")}</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/services"
              className="text-amber-700 hover:text-amber-600 font-bold"
            >
              {t("servicesViewAll")} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured testimonials */}
      <section className="py-16 pt-0">
        <div className="mx-auto max-w-[1080px] px-5 sm:px-7">
          <div className="bg-navy-900 relative overflow-hidden rounded-2xl p-7 text-white sm:p-11">
            <div className="mb-10 max-w-[560px]">
              <span className="eyebrow !text-amber-500">
                {t("testimonialsEyebrow")}
              </span>
              <h2 className="mt-2.5 text-3xl font-bold text-white">
                {t("testimonialsTitle")}
              </h2>
            </div>
            <TestimonialCarousel items={testimonials} />
            <div className="mt-6 text-right">
              <a
                href={site.googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-500 hover:text-amber-600 text-[0.82rem] font-bold"
              >
                {tCommon("viewAllReviews")} <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact strip */}
      <section className="pb-20">
        <div className="mx-auto max-w-[1080px] px-5 sm:px-7">
          <div className="mb-10 max-w-[560px]">
            <span className="eyebrow">{t("contactEyebrow")}</span>
            <h2 className="mt-2.5 text-3xl font-bold">{t("contactTitle")}</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <a
              href={site.phoneHref}
              className="bg-paper-card border-line hover:border-amber-500 rounded-xl border p-5 text-center transition-colors"
            >
              <div aria-hidden="true" className="mb-2.5 text-xl">
                📞
              </div>
              <h3 className="mb-1 text-[0.95rem] font-bold">
                {t("contactPhone")}
              </h3>
              <p className="text-ink-soft text-[0.82rem]">
                {site.phoneDisplay}
              </p>
            </a>
            <Link
              href="/contact"
              className="bg-paper-card border-line hover:border-amber-500 rounded-xl border p-5 text-center transition-colors"
            >
              <div aria-hidden="true" className="mb-2.5 text-xl">
                💬
              </div>
              <h3 className="mb-1 text-[0.95rem] font-bold">
                {t("contactLine")}
              </h3>
              <p className="text-ink-soft text-[0.82rem]">
                {t("contactLineDesc")}
              </p>
            </Link>
            <Link
              href="/contact"
              className="bg-paper-card border-line hover:border-amber-500 rounded-xl border p-5 text-center transition-colors"
            >
              <div aria-hidden="true" className="mb-2.5 text-xl">
                🗓️
              </div>
              <h3 className="mb-1 text-[0.95rem] font-bold">
                {t("contactCalendly")}
              </h3>
              <p className="text-ink-soft text-[0.82rem]">
                {t("contactCalendlyDesc")}
              </p>
            </Link>
            <Link
              href="/contact"
              className="bg-paper-card border-line hover:border-amber-500 rounded-xl border p-5 text-center transition-colors"
            >
              <div aria-hidden="true" className="mb-2.5 text-xl">
                📍
              </div>
              <h3 className="mb-1 text-[0.95rem] font-bold">
                {t("contactArea")}
              </h3>
              <p className="text-ink-soft text-[0.82rem]">
                {t("contactAreaDesc")}
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
