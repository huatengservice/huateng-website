import { expect, test } from "@playwright/test";

test.describe("contact page", () => {
  test("click-to-call links use the correct tel: href", async ({ page }) => {
    await page.goto("/contact");
    const telLinks = page.locator('a[href="tel:+886938969739"]');
    expect(await telLinks.count()).toBeGreaterThanOrEqual(1);
  });

  test("Calendly embed iframe is present with the booking URL", async ({
    page,
  }) => {
    await page.goto("/contact");
    const calendly = page.locator(
      'iframe[src*="calendly.com/huateng-service/30min"]',
    );
    await expect(calendly).toBeAttached();
  });

  test("Google Map embed is present", async ({ page }) => {
    await page.goto("/contact");
    const map = page.locator('iframe[src*="google.com/maps"]');
    await expect(map).toBeAttached();
  });

  test("LINE section shows the placeholder QR", async ({ page }) => {
    await page.goto("/contact");
    await expect(
      page.getByRole("heading", { name: "LINE 諮詢" }),
    ).toBeVisible();
    await expect(page.locator('img[src*="line-qr-placeholder"]')).toBeVisible();
  });

  test("form shows validation errors for missing fields", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: "送出需求" }).click();
    await expect(page.getByText("請填寫姓名")).toBeVisible();
    await expect(page.getByText("請填寫聯絡電話")).toBeVisible();
    await expect(page.getByText("請簡單描述您的狀況")).toBeVisible();
  });

  test("form submits valid data and shows success state", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel(/姓名/).fill("測試客戶");
    await page.getByLabel(/聯絡電話/).fill("0912-345-678");
    await page.getByLabel(/需要的服務/).selectOption({ index: 1 });
    await page.getByLabel(/狀況描述/).fill("E2E 測試：浴室漏水");
    await page.getByRole("button", { name: "送出需求" }).click();
    await expect(page.getByText("已收到您的需求！")).toBeVisible();
  });
});
