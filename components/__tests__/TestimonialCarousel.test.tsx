import { act, fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import TestimonialCarousel from "../TestimonialCarousel";
import zhMessages from "@/messages/zh-TW.json";
import type { Testimonial } from "@/lib/content";

const items: Testimonial[] = Array.from({ length: 8 }, (_, i) => ({
  author: `客戶 ${i + 1}`,
  rating: 5,
  text: `評價內容 ${i + 1}`,
}));

// jsdom has no matchMedia; simulate a desktop viewport (3 cards per view)
function mockMatchMedia({ desktop }: { desktop: boolean }) {
  window.matchMedia = jest.fn().mockImplementation((query: string) => ({
    matches: query.includes("min-width") ? desktop : false,
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));
}

function renderCarousel() {
  return render(
    <NextIntlClientProvider locale="zh-TW" messages={zhMessages}>
      <TestimonialCarousel items={items} />
    </NextIntlClientProvider>,
  );
}

describe("TestimonialCarousel", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockMatchMedia({ desktop: true });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders all testimonials and one dot per page", () => {
    renderCarousel();
    items.forEach((item) => {
      expect(screen.getByText(item.author)).toBeInTheDocument();
    });
    // 8 items at 3 per view = 3 pages
    expect(screen.getAllByRole("tab")).toHaveLength(3);
  });

  it("auto-rotates to the next page", () => {
    renderCarousel();
    const [dot1, dot2] = screen.getAllByRole("tab");
    expect(dot1).toHaveAttribute("aria-selected", "true");

    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(dot2).toHaveAttribute("aria-selected", "true");
  });

  it("pauses rotation on hover and resumes on leave", () => {
    renderCarousel();
    const region = screen.getByRole("region");
    const dots = screen.getAllByRole("tab");

    fireEvent.mouseEnter(region);
    act(() => {
      jest.advanceTimersByTime(15000);
    });
    expect(dots[0]).toHaveAttribute("aria-selected", "true");

    fireEvent.mouseLeave(region);
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(dots[1]).toHaveAttribute("aria-selected", "true");
  });

  it("pauses rotation while touched", () => {
    renderCarousel();
    const region = screen.getByRole("region");
    const dots = screen.getAllByRole("tab");

    fireEvent.touchStart(region);
    act(() => {
      jest.advanceTimersByTime(15000);
    });
    expect(dots[0]).toHaveAttribute("aria-selected", "true");
  });

  it("jumps to a page when its dot is clicked", () => {
    renderCarousel();
    const dots = screen.getAllByRole("tab");
    fireEvent.click(dots[2]);
    expect(dots[2]).toHaveAttribute("aria-selected", "true");
  });

  it("wraps back to the first page after the last", () => {
    renderCarousel();
    const dots = screen.getAllByRole("tab");
    act(() => {
      jest.advanceTimersByTime(15000);
    });
    expect(dots[0]).toHaveAttribute("aria-selected", "true");
  });
});
