import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NextIntlClientProvider } from "next-intl";
import LanguageToggle from "../LanguageToggle";
import zhMessages from "@/messages/zh-TW.json";
import enMessages from "@/messages/en.json";

const mockReplace = jest.fn();

jest.mock("@/i18n/navigation", () => ({
  usePathname: () => "/services",
  useRouter: () => ({ replace: mockReplace }),
  Link: ({ children }: { children: React.ReactNode }) => <a>{children}</a>,
}));

function renderWithLocale(locale: "zh-TW" | "en") {
  const messages = locale === "en" ? enMessages : zhMessages;
  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LanguageToggle />
    </NextIntlClientProvider>,
  );
}

describe("LanguageToggle", () => {
  beforeEach(() => mockReplace.mockClear());

  it("marks the active locale as pressed", () => {
    renderWithLocale("zh-TW");
    expect(screen.getByRole("button", { name: "中文" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "EN" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("switches to English, preserving the current path", async () => {
    const user = userEvent.setup();
    renderWithLocale("zh-TW");
    await user.click(screen.getByRole("button", { name: "EN" }));
    expect(mockReplace).toHaveBeenCalledWith("/services", { locale: "en" });
  });

  it("does not navigate when clicking the already-active locale", async () => {
    const user = userEvent.setup();
    renderWithLocale("zh-TW");
    await user.click(screen.getByRole("button", { name: "中文" }));
    expect(mockReplace).not.toHaveBeenCalled();
  });
});
