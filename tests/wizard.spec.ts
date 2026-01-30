import { test, expect } from "@playwright/test";
test.describe("Contact Wizard Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/apply");
  });

  test("should enforce validation on Step 1", async ({ page }) => {
    // Try to click Next without filling anything
    await page.getByRole("button", { name: "Next Step" }).click();

    // Expect validation errors (Apply.tsx uses custom Zod messages defined in types.ts)
    await expect(page.locator("text=First name is required")).toBeVisible();
    await expect(page.locator("text=Invalid email address")).toBeVisible();

    // Check that we are still on Step 1
    // Actually Apply.tsx uses zod output.
    // "name is required" or similar.
    // The zod schema in Apply.tsx is imported from features/apply/types. 
    // Let's just check that we are still on step 1 (Next didn't work)
    await expect(page.getByText("Step 1 of 3")).toBeVisible();

    // Fill step 1
    await page.locator('input[name="firstName"]').fill("Test Lead");
    await page.locator('input[name="email"]').fill("test@example.com");
    await page.locator('input[name="website"]').fill("https://example.com");

    await page.getByRole("button", { name: "Next Step" }).click();

    // Should be on Step 2
    await expect(page.getByText("Step 2 of 3")).toBeVisible();
  });

  test("should complete full submission flow", async ({ page }) => {
    // Step 1
    await page.locator('input[name="firstName"]').fill("Valid User");
    await page.locator('input[name="email"]').fill("valid@user.com");
    await page.locator('input[name="website"]').fill("https://valid-site.com");
    await page.getByRole("button", { name: "Next Step" }).click();

    // Step 2
    await expect(page.getByText("Step 2 of 3")).toBeVisible();
    await page.locator('input[name="companyName"]').fill("SpaceX Origin");
    await page.locator('select[name="industry"]').selectOption("Other");
    // "Other" triggers custom industry input
    await page.locator('input[name="customIndustry"]').fill("Space Travel");
    await page.locator('select[name="revenueRange"]').selectOption("50k-200k");
    await page.locator('textarea[name="goals"]').fill("Mars colonization marketing.");
    await page.getByRole("button", { name: "Next Step" }).click();

    // Step 3 (Review)
    await expect(page.getByText("Step 3 of 3")).toBeVisible();
    // Check if summary details are present
    await expect(page.getByText("SpaceX Origin")).toBeVisible();

    // Submit
    await page.getByRole("button", { name: "Submit Application" }).click();

    // Success State
    await expect(page.getByText("Application Received!")).toBeVisible();
  });
});
