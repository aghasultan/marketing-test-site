import { test, expect } from "@playwright/test";

test("apply page has correct title", async ({ page }) => {
  await page.goto("/apply.html");
  await expect(page).toHaveTitle(/Apply to Work With Agha/);
});

test("apply page has all required form fields", async ({ page }) => {
  await page.goto("/apply.html");

  await expect(page.locator("text=Full Name")).toBeVisible();
  await expect(page.locator("text=Business Email")).toBeVisible();
  await expect(page.locator("text=Website URL")).toBeVisible();
});

test("form submission flow", async ({ page }) => {
  await page.goto("/apply.html");

  // Step 1
  await page.fill('#name', 'Test Applicant');
  await page.fill('#email', 'applicant@example.com');
  await page.fill('#website', 'https://example.com');
  await page.click('#btn-next');

  // Step 2
  await expect(page.locator('fieldset[data-step="1"]')).toBeVisible();
  await page.selectOption('#spend', '10k_50k');
  await page.selectOption('#service', 'scale');
  await page.click('#btn-next');

  // Step 3
  await expect(page.locator('fieldset[data-step="2"]')).toBeVisible();
  await page.fill('#message', 'I am interested in scaling my ads.');
  await page.click('#btn-submit');

  // Verify success message
  await expect(page.locator('#wizard-success')).toBeVisible();
  await expect(page.locator('#wizard-success')).toContainText("Application Received!");
});
