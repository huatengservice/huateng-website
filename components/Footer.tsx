import { useTranslations } from "next-intl";
import { site } from "@/lib/content";

export default function Footer() {
  const t = useTranslations("footer");
  const tCommon = useTranslations("common");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 py-10 text-sm text-[#9FADC7]">
      <div className="mx-auto flex max-w-[1080px] flex-wrap items-center justify-between gap-4 px-5 sm:px-7">
        <div>
          <strong className="text-white">{tCommon("brandName")}</strong> ·{" "}
          {t("tagline")}
          <div className="mt-1 text-xs">{t("serviceArea")}</div>
        </div>
        <div className="flex flex-col items-start gap-1 sm:items-end">
          <a
            href={site.phoneHref}
            className="hover:text-amber-500 font-medium text-white transition-colors"
          >
            {site.phoneDisplay}
          </a>
          <span className="text-xs">{t("copyright", { year })}</span>
        </div>
      </div>
    </footer>
  );
}
