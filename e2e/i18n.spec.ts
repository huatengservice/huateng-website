import { expect, test } from "@playwright/test";

test.describe("language toggle", () => {
  test("switches zh-TW → English and back", async ({ page, isMobile }) => {
    await page.goto("/services");
    await expect(
      page.getByRole("heading", { level: 1, name: "從緊急搶修到全屋工程" }),
    ).toBeVisible();

    if (isMobile) {
      await page.getByRole("button", { name: "開啟選單" }).click();
    }
    await page.getByRole("button", { name: "EN", exact: true }).click();

    await expect(page).toHaveURL(/\/en\/services$/);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "From emergency fixes to full renovations",
      }),
    ).toBeVisible();

    if (isMobile) {
      await page.getByRole("button", { name: "Open menu" }).click();
    }
    await page.getByRole("button", { name: "中文", exact: true }).click();
    await expect(page).toHaveURL(/\/services$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "從緊急搶修到全屋工程" }),
    ).toBeVisible();
  });

  test("locale choice persists across navigation", async ({
    page,
    isMobile,
  }) => {
    await page.goto("/");
    if (isMobile) {
      await page.getByRole("button", { name: "開啟選單" }).click();
    }
    await page.getByRole("button", { name: "EN", exact: true }).click();
    await expect(page).toHaveURL(/\/en$/);

    // Revisiting the bare root should remember English via cookie
    await page.goto("/");
    await expect(page).toHaveURL(/\/en$/);
  });
});
