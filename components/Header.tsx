"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import BrandMark from "./BrandMark";
import { site } from "@/lib/content";

const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "services", href: "/services" },
  { key: "gallery", href: "/gallery" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

export default function Header() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-line bg-paper/90 sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto flex max-w-[1080px] items-center justify-between px-5 py-4 sm:px-7">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          onClick={() => setMenuOpen(false)}
        >
          <BrandMark />
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-navy-900 text-lg font-bold">
              {tCommon("brandName")}
            </span>
            <span className="font-mono text-ink-soft text-[0.62rem] tracking-widest">
              {tCommon("brandNameEn")}
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`text-navy-800 hover:text-navy-900 relative pb-1 text-[0.92rem] font-medium ${
                      active
                        ? "after:bg-amber-500 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full"
                        : ""
                    }`}
                  >
                    {t(item.key)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={site.phoneHref}
            className="bg-amber-500 text-navy-900 hover:bg-amber-600 rounded-md px-4 py-2.5 text-sm font-bold whitespace-nowrap transition-colors hover:text-white"
          >
            <span aria-hidden="true">📞 </span>
            {site.phoneDisplay}
          </a>
          <button
            type="button"
            className="text-navy-900 -mr-1 flex h-10 w-10 items-center justify-center md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="border-line bg-paper border-t md:hidden"
        >
          <ul className="flex flex-col px-5 py-3">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <li
                  key={item.key}
                  className="border-line border-b last:border-b-0"
                >
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={`block py-3 text-base font-medium ${
                      active ? "text-amber-700" : "text-navy-800"
                    }`}
                  >
                    {t(item.key)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
