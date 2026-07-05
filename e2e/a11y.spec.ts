import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const PATHS = ["/", "/services", "/gallery", "/about", "/contact"];

// Skip on the mobile project — axe results are viewport-independent enough
// that running once per page keeps CI fast.
test.describe("accessibility", () => {
  test.skip(({ isMobile }) => isMobile, "axe runs on desktop project only");

  for (const path of PATHS) {
    test(`axe scan: ${path}`, async ({ page }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa"])
        // Third-party iframes (Calendly, Google Maps) aren't ours to fix
        .exclude("iframe")
        .analyze();
      expect(results.violations).toEqual([]);
    });
  }
});
