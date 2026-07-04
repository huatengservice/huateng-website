import { expect, test } from "@playwright/test";

const PAGES = [
  { nav: "服務項目", path: "/services", heading: "從緊急搶修到全屋工程" },
  { nav: "作品實績", path: "/gallery", heading: "施工前後，一目瞭然" },
  {
    nav: "關於我們",
    path: "/about",
    heading: "把每一戶的水電，當自己家的來修",
  },
  { nav: "聯絡預約", path: "/contact", heading: "馬上聯絡華騰" },
];

test.describe("navigation", () => {
  for (const { nav, path, heading } of PAGES) {
    test(`can reach ${path} from the nav`, async ({ page, isMobile }) => {
      await page.goto("/");
      if (isMobile) {
        await page.getByRole("button", { name: "開啟選單" }).click();
        await page
          .getByRole("navigation", { name: "Mobile" })
          .getByRole("link", { name: nav })
          .click();
      } else {
        await page
          .getByRole("navigation", { name: "Main" })
          .getByRole("link", { name: nav })
          .click();
      }
      await expect(page).toHaveURL(new RegExp(`${path}$`));
      await expect(
        page.getByRole("heading", { level: 1, name: heading }),
      ).toBeVisible();
    });
  }

  test("all internal nav links resolve without 404", async ({ page }) => {
    for (const { path } of [{ path: "/" }, ...PAGES]) {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
    }
  });

  test("unknown path shows the localized 404", async ({ page }) => {
    await page.goto("/this-page-does-not-exist");
    await expect(
      page.getByRole("heading", { name: "找不到這個頁面" }),
    ).toBeVisible();
  });
});
