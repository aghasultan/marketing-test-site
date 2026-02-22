import { test, expect } from "@playwright/test";

test.describe("Smart Qualification Wizard", () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test so we start fresh
    await page.goto("/apply");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test("should navigate from Basic Details to Metrics step", async ({ page }) => {
    await expect(page.getByText("Let's start with the basics")).toBeVisible();
    await page.getByPlaceholder("Alex", { exact: true }).fill("John");
    await page.getByPlaceholder("Founder").fill("Doe");
    await page.getByPlaceholder("CloudOps Ltd.").fill("Acme Corp");
    await page.getByPlaceholder("alex@cloudops.com").fill("john@acme.com");
    await page.getByRole("button", { name: "Continue to Metrics" }).click();

    await expect(page.getByText("Growth Diagnostics")).toBeVisible();
  });

  test("should branch to Partner Referral if revenue is low (< $1M ARR)", async ({ page }) => {
    // Step 1: Basics
    await page.getByPlaceholder("Alex", { exact: true }).fill("John");
    await page.getByPlaceholder("Founder").fill("Doe");
    await page.getByPlaceholder("CloudOps Ltd.").fill("Small Corp");
    await page.getByPlaceholder("alex@cloudops.com").fill("john@small.com");
    await page.getByRole("button", { name: "Continue to Metrics" }).click();

    // Step 2: Metrics
    await expect(page.getByText("Growth Diagnostics")).toBeVisible();

    // Fill MRR (10k * 12 = 120k ARR, which is < 1M)
    const revenueInput = page.getByPlaceholder("$80,000");
    await revenueInput.fill("10k");
    await revenueInput.blur(); // Trigger format

    // Check consent checkbox
    await page.locator('input[type="checkbox"]').check();

    await page.getByRole("button", { name: "View Qualification Results" }).click();

    // Expect Disqualified
    await expect(page.getByText("Let's build your foundation first.")).toBeVisible();
    await expect(page.getByText("Download Growth Roadmap")).toBeVisible();
  });

  test("should branch to Qualified Booking if revenue is high (>= $1M ARR)", async ({ page }) => {
    // Step 1: Basics
    await page.getByPlaceholder("Alex", { exact: true }).fill("Jane");
    await page.getByPlaceholder("Founder").fill("Smith");
    await page.getByPlaceholder("CloudOps Ltd.").fill("Big Corp");
    await page.getByPlaceholder("alex@cloudops.com").fill("jane@bigcorp.com");
    await page.getByRole("button", { name: "Continue to Metrics" }).click();

    // Step 2: Metrics
    await expect(page.getByText("Growth Diagnostics")).toBeVisible();

    // Fill MRR (100k * 12 = 1.2M ARR, which is >= 1M)
    const revenueInput = page.getByPlaceholder("$80,000");
    await revenueInput.fill("100k");
    await revenueInput.blur();

    // Check consent checkbox
    await page.locator('input[type="checkbox"]').check();

    await page.getByRole("button", { name: "View Qualification Results" }).click();

    // Expect Qualified
    await expect(page.getByText("You Qualify.")).toBeVisible();
    await expect(page.getByRole("button", { name: "Book Strategic Consultation" })).toBeVisible();
  });
});
