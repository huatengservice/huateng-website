import { useTranslations } from "next-intl";
import { site } from "@/lib/content";

export default function TrustBadge() {
  const t = useTranslations("trustBadge");

  return (
    <div className="bg-navy-900 border-navy-600 relative overflow-hidden rounded-2xl border p-8 text-white">
      <span
        aria-hidden="true"
        className="bg-amber-500 absolute top-0 right-0 h-[70px] w-[70px]"
        style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
      />
      <div className="font-mono text-amber-500 text-[0.7rem] tracking-[0.12em]">
        {t("rank")}
      </div>
      <h3 className="mt-2.5 mb-3.5 font-serif text-2xl font-bold text-white">
        {t("title")}
      </h3>
      <p className="text-[0.92rem] text-[#C9D2E3]">{t("description")}</p>
      <dl className="mt-5 flex gap-6 border-t border-white/15 pt-5">
        <div>
          <dd className="font-serif text-amber-500 text-2xl font-bold">
            {site.reviewCount}
          </dd>
          <dt className="text-xs text-[#9FADC7]">{t("statReviews")}</dt>
        </div>
        <div>
          <dd className="font-serif text-amber-500 text-2xl font-bold">24hr</dd>
          <dt className="text-xs text-[#9FADC7]">{t("statEmergency")}</dt>
        </div>
        <div>
          <dd className="font-serif text-amber-500 text-2xl font-bold">
            {t("statLevelValue")}
          </dd>
          <dt className="text-xs text-[#9FADC7]">{t("statLevel")}</dt>
        </div>
      </dl>
    </div>
  );
}
