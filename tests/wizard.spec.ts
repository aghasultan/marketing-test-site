import { test, expect } from "@playwright/test";
test.describe("Contact Wizard Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/apply");
  });

  test("should enforce validation on Step 1", async ({ page }) => {
    // Try to click Next without filling anything
    await page.getByRole("button", { name: "Next Step" }).click();

    // Expect validation errors (Apply.tsx uses custom Zod messages defined in types.ts)
    await expect(page.getByText("First name is required")).toBeVisible();
    await expect(page.getByText("First name is required")).toBeVisible();
    // await expect(page.getByText(/Email.*required/)).toBeVisible();

    // Check that we are still on Step 1
    // Actually Apply.tsx uses zod output.
    // "name is required" or similar.
    // The zod schema in Apply.tsx is imported from features/apply/types. 
    // Check that we are still on Step 1
    await expect(page.getByText("Step 1 of 4")).toBeVisible();

    // Fill step 1
    await page.locator('input[name="firstName"]').fill("Test Lead");
    await page.locator('input[name="email"]').fill("test@example.com");
    await page.locator('input[name="website"]').fill("https://example.com");

    await page.getByRole("button", { name: "Next Step" }).click();

    // Should be on Step 2
    await expect(page.getByText("Step 2 of 4")).toBeVisible();
  });

  test("should complete full submission flow with Paid Advertising branch", async ({ page }) => {
    // Step 1
    await page.locator('input[name="firstName"]').fill("Valid User");
    await page.locator('input[name="email"]').fill("valid@user.com");
    await page.locator('input[name="website"]').fill("https://valid-site.com");
    await page.getByRole("button", { name: "Next Step" }).click();

    // Step 2
    await expect(page.getByText("Step 2 of 4")).toBeVisible();
    await page.locator('input[name="companyName"]').fill("SpaceX Origin");
    await page.locator('select[name="industry"]').selectOption("Other");
    // "Other" triggers custom industry input
    await page.locator('input[name="customIndustry"]').fill("Space Travel");
    await page.locator('select[name="revenueRange"]').selectOption("50k-200k");
    await page.locator('textarea[name="goals"]').fill("Mars colonization marketing.");

    // Select Service Type triggering Branch A
    await page.locator('select[name="serviceType"]').selectOption("paid-advertising");

    await page.getByRole("button", { name: "Next Step" }).click();

    // Step 3 (Branch A)
    await expect(page.getByText("Step 3 of 4")).toBeVisible();
    await expect(page.getByText("Service Details")).toBeVisible();
    // Validate Branch A fields are present
    await expect(page.locator('select[name="monthlyBudget"]')).toBeVisible();
    await expect(page.locator('input[name="targetRoas"]')).toBeVisible();
    // Validate Branch B fields are ABSENT
    await expect(page.locator('input[name="techStack"]')).not.toBeVisible();

    await page.locator('select[name="monthlyBudget"]').selectOption("50k+");
    await page.locator('input[name="targetRoas"]').fill("4.5");

    await page.getByRole("button", { name: "Next Step" }).click();

    // Step 4 (Review)
    await expect(page.getByText("Step 4 of 4")).toBeVisible();
    // Check if summary details are present
    await expect(page.getByText("SpaceX Origin")).toBeVisible();
    await expect(page.getByText("Paid Advertising")).toBeVisible();
    await expect(page.getByText("Monthly Budget")).toBeVisible();
    await expect(page.getByText("50k+")).toBeVisible();

    // Submit
    await page.getByRole("button", { name: "Submit Application" }).click();

    // Success State
    await expect(page.getByText("Application Received!")).toBeVisible();
  });
  test("should preserve state when navigating back", async ({ page }) => {
    // Step 1
    await page.locator('input[name="firstName"]').fill("Back Tester");
    await page.locator('input[name="email"]').fill("back@test.com");
    await page.getByRole("button", { name: "Next Step" }).click();

    // Step 2
    await expect(page.getByText("Step 2 of 4")).toBeVisible();
    await page.locator('input[name="companyName"]').fill("State Preservation Co");

    // Go back
    await page.getByRole("button", { name: "Back" }).click();
    await expect(page.getByText("Step 1 of 4")).toBeVisible();

    // Check if data persists
    await expect(page.locator('input[name="firstName"]')).toHaveValue("Back Tester");

    // Go forward again
    await page.getByRole("button", { name: "Next Step" }).click();
    await expect(page.getByText("Step 2 of 4")).toBeVisible();
    await expect(page.locator('input[name="companyName"]')).toHaveValue("State Preservation Co");
  });

  test("should complete full submission flow with Data & Analytics branch", async ({ page }) => {
    // Step 1
    await page.locator('input[name="firstName"]').fill("Analytics Pro");
    await page.locator('input[name="email"]').fill("analytics@test.com");
    await page.locator('input[name="website"]').fill("https://analytics.com");
    await page.getByRole("button", { name: "Next Step" }).click();

    // Step 2
    await expect(page.getByText("Step 2 of 4")).toBeVisible();
    await page.locator('input[name="companyName"]').fill("Data Corp");
    await page.locator('select[name="industry"]').selectOption("Tech");
    await page.locator('select[name="revenueRange"]').selectOption("200k+");

    // Select Service Type triggering Branch B
    await page.locator('select[name="serviceType"]').selectOption("data-analytics");

    await page.getByRole("button", { name: "Next Step" }).click();

    // Step 3 (Branch B)
    await expect(page.getByText("Step 3 of 4")).toBeVisible();
    await expect(page.getByText("Service Details")).toBeVisible();

    // Validate Branch B fields are present
    await expect(page.locator('input[name="techStack"]')).toBeVisible();
    await expect(page.locator('textarea[name="trackingIssues"]')).toBeVisible();

    // Validate Branch A fields are ABSENT
    await expect(page.locator('select[name="monthlyBudget"]')).not.toBeVisible();

    await page.locator('input[name="techStack"]').fill("Segment, Mixpanel");
    await page.locator('textarea[name="trackingIssues"]').fill("Data discrepancy issues");

    await page.getByRole("button", { name: "Next Step" }).click();

    // Step 4 (Review)
    await expect(page.getByText("Step 4 of 4")).toBeVisible();
    // Check if summary details are present
    await expect(page.getByText("Data Corp")).toBeVisible();
    await expect(page.getByText("Data & Analytics")).toBeVisible();
    await expect(page.getByText("Segment, Mixpanel")).toBeVisible();

    // Submit
    await page.getByRole("button", { name: "Submit Application" }).click();

    // Success State
    await expect(page.getByText("Application Received!")).toBeVisible();
  });
});
