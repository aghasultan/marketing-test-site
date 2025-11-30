import { test, expect } from "@playwright/test";
test.describe("Contact Wizard Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/apply.html");
  });
  test("should enforce validation on Step 1", async ({ page }) => {
    await page.click("#btn-next");
    await expect(page.locator("#name")).toBeFocused();
    await page.fill("#name", "Test Lead");
    await page.fill("#email", "test@example.com");
    await page.fill("#website", "https://example.com");
    await page.click("#btn-next");
    await expect(page.locator("fieldset[data-step='1']")).not.toHaveClass(
      /hidden/,
    );
  });
  test("should complete full submission flow", async ({ page }) => {
    await page.route("https://formspree.io/f/**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      });
    });
    await page.fill("#name", "Valid User");
    await page.fill("#email", "valid@user.com");
    await page.fill("#website", "https://valid-site.com");
    await page.click("#btn-next");
    await page.selectOption("#spend", "10k_50k");
    await page.selectOption("#service", "scale");
    await page.click("#btn-next");
    await page.fill("#message", "Ready to scale.");
    await page.click("#btn-submit");
    await expect(page.locator("#wizard-success")).toBeVisible();
  });
});
