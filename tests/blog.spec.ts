import { test, expect } from "@playwright/test";
test.describe("Digital Garden (Blog)", () => {
  test("index page should load", async ({ page }) => {
    await page.goto("/blog.html");
    await expect(page).toHaveTitle(/Digital Garden/);
    await expect(page.locator("h1")).toHaveText("Digital Garden");
    await expect(page.locator(".card-grid")).toBeVisible();
  });
});
