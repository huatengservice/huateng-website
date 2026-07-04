"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { Testimonial } from "@/lib/content";

const ROTATE_INTERVAL_MS = 5000;
const DESKTOP_QUERY = "(min-width: 768px)";

function Stars() {
  return (
    <div
      aria-hidden="true"
      className="text-amber-500 mb-2.5 text-sm tracking-[2px]"
    >
      ★★★★★
    </div>
  );
}

export default function TestimonialCarousel({
  items,
}: {
  items: Testimonial[];
}) {
  const t = useTranslations("carousel");
  const [perView, setPerView] = useState(1);
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;

    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const mq = window.matchMedia(DESKTOP_QUERY);
    const apply = () => setPerView(mq.matches ? 3 : 1);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const pages = useMemo(() => {
    const chunked: Testimonial[][] = [];
    for (let i = 0; i < items.length; i += perView) {
      chunked.push(items.slice(i, i + perView));
    }
    return chunked;
  }, [items, perView]);

  const pageCount = pages.length;
  const currentPage = Math.min(page, pageCount - 1);

  const advance = useCallback(() => {
    setPage((p) => (p + 1) % pageCount);
  }, [pageCount]);

  useEffect(() => {
    if (paused || pageCount <= 1 || reducedMotion.current) return;
    const id = setInterval(advance, ROTATE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused, pageCount, advance]);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={t("regionLabel")}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${currentPage * 100}%)` }}
        >
          {pages.map((group, gi) => (
            <ul
              key={gi}
              aria-hidden={gi !== currentPage}
              className="grid w-full shrink-0 grid-cols-1 gap-5 md:grid-cols-3"
            >
              {group.map((item) => (
                <li
                  key={item.author}
                  className="rounded-xl border border-white/10 bg-white/5 p-5"
                >
                  <Stars />
                  <p className="mb-3.5 text-sm text-[#D7DEEC]">
                    「{item.text}」
                  </p>
                  <div className="text-[0.82rem] font-bold text-white">
                    {item.author}
                  </div>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {pageCount > 1 && (
        <div
          className="mt-6 flex gap-2"
          role="tablist"
          aria-label={t("dotsLabel")}
        >
          {pages.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === currentPage}
              aria-label={t("dotLabel", { page: i + 1 })}
              onClick={() => setPage(i)}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                i === currentPage
                  ? "bg-amber-500"
                  : "bg-white/25 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
