import { test, expect } from "@playwright/test";

test.describe("Smart Qualification Wizard", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/apply");
  });

  test("should navigate from Welcome to Revenue step", async ({ page }) => {
    await expect(page.getByText("Qualify for Exponential Growth")).toBeVisible();
    await page.getByRole("button", { name: "Start Qualification" }).click();
    await expect(page.getByText("What is your current monthly revenue?")).toBeVisible();
  });

  test("should branch to Partner Referral if revenue is low (< $50k)", async ({ page }) => {
    // Welcome
    await page.getByRole("button", { name: "Start Qualification" }).click();

    // Revenue
    const input = page.locator('input[type="text"]'); // CurrencyInput
    await input.fill("10k");
    await input.blur(); // Trigger format

    await page.getByRole("button", { name: "Continue" }).click();

    // Expect Partner Referral
    await expect(page.getByText("Your Growth Roadmap is Ready")).toBeVisible();
    await expect(page.getByText("Recommended Strategy: Foundation Building")).toBeVisible();
  });

  test("should branch to Goals -> Contact -> Qualified if revenue is high (>= $50k)", async ({ page }) => {
    // Welcome
    await page.getByRole("button", { name: "Start Qualification" }).click();

    // Revenue
    const input = page.locator('input[type="text"]');
    await input.fill("100k");
    await input.blur();

    await page.getByRole("button", { name: "Continue" }).click();

    // Expect Goals
    await expect(page.getByText("What is your primary goal?")).toBeVisible();

    // Select Goal
    await page.getByRole("button", { name: "Scale Revenue" }).click();

    // Expect Contact
    await expect(page.getByText("Where should we send your plan?")).toBeVisible();

    // Fill Contact
    await page.getByPlaceholder("Full Name").fill("Big Spender");
    await page.getByPlaceholder("Work Email").fill("ceo@bigcorp.com");

    await page.getByRole("button", { name: "See My Results" }).click();

    // Expect Qualified
    await expect(page.getByText("You Qualify for Dedicated Growth")).toBeVisible();
    await expect(page.getByRole("button", { name: "Book Strategy Call" })).toBeVisible();
  });

  test("should disable Continue on Revenue step if empty", async ({ page }) => {
    await page.getByRole("button", { name: "Start Qualification" }).click();

    // Expect button disabled initially (revenue is undefined)
    await expect(page.getByRole("button", { name: "Continue" })).toBeDisabled();
  });
});
