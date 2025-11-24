import { test, expect } from "@playwright/test";

test("apply page has correct title", async ({ page }) => {
  await page.goto("/apply.html");
  await expect(page).toHaveTitle("Apply to Work With Agha | Agha Sultan Naseer");
});

test("apply page has all required form fields", async ({ page }) => {
  await page.goto("/apply.html");

  await expect(page.getByLabel("Name")).toBeVisible();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("WhatsApp")).toBeVisible();
  await expect(page.getByLabel("Service Interest")).toBeVisible();
  await expect(page.getByLabel("Monthly Ad Spend")).toBeVisible();
  await expect(page.getByLabel("Business Website URL")).toBeVisible();
  await expect(page.getByLabel("Your Message")).toBeVisible();
});

test("form submission shows offline message", async ({ page }) => {
  await page.goto("/apply.html");

  // Fill the form
  await page.getByLabel("Name").fill("Test Applicant");
  await page.getByLabel("Email").fill("applicant@example.com");
  await page.getByLabel("WhatsApp").fill("+15550199");
  await page.getByLabel("Service Interest").selectOption("Meta Ads");
  await page.getByLabel("Monthly Ad Spend").selectOption("10k_50k");
  await page.getByLabel("Business Website URL").fill("https://example.com");
  await page.getByLabel("Your Message").fill("I am interested in scaling my ads.");

  // Submit
  await page.getByRole("button", { name: "Submit Application" }).click();

  // Verify the offline message appears
  const successPanel = page.locator(".form-success-panel");
  await expect(successPanel).toBeVisible();
  await expect(successPanel).toContainText("Application portal is offline");
  await expect(successPanel).toContainText("Please email hello@aghasultan.com");
});
