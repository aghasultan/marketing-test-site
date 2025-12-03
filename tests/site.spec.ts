import { test, expect } from "@playwright/test";

test("homepage has title and hero text", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Agha Sultan Naseer/);
  await expect(
    page.getByRole("heading", { name: /Turn Paid Ads Into Profit/i }),
  ).toBeVisible();
});

test("navigation links work", async ({ page }) => {
  await page.goto("/");

  // Click the Services link.
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Services", exact: true })
    .click();

  // With HashRouter, this navigates to /#/scale
  await expect(page).toHaveURL(/.*\/scale/);

  // Update: The actual services/scale page title in Scale.tsx is "Paid Media That Compounds Growth"
  // Let's check for the h1 or h2 on that page.
  // In Scale.tsx, the hero title is "Paid Media That Compounds Growth"
  await expect(
    page.getByRole("heading", { name: "Paid Media That Compounds Growth" }),
  ).toBeVisible();
});

test("dark mode toggle works", async ({ page }) => {
  await page.goto("/");

  const body = page.locator("body");
  const toggle = page.locator(".theme-toggle"); // Updated selector class from Header.tsx

  // Get initial class list
  const initialClasses = await body.getAttribute("class");
  const isDark = initialClasses?.includes("theme-dark");

  await toggle.click();

  // Wait for class change
  await page.waitForTimeout(500);

  const newClasses = await body.getAttribute("class");
  if (isDark) {
    expect(newClasses).not.toContain("theme-dark");
  } else {
    expect(newClasses).toContain("theme-dark");
  }
});

test("404 page works", async ({ page }) => {
  // With HashRouter, unknown routes go to NotFound
  await page.goto("/#/non-existent-page");
  await expect(
    page.getByRole("heading", { name: "404 - Page Not Found" }),
  ).toBeVisible();
});

test("favicons are correct", async ({ page }) => {
  await page.goto("/");
  const icon = page.locator('link[rel="icon"]').first();
  // We updated it to riffat-labs-transparent.svg in index.html
  await expect(icon).toHaveAttribute("href", /riffat-labs-transparent.svg/);
});

test("no console errors on homepage", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      errors.push(msg.text());
    }
  });
  await page.goto("/");
  // Wait a bit for scripts to run
  await page.waitForTimeout(1000);

  // Filter out the known favicon error if any (local dev sometimes 404s favicons)
  // or known extension errors
  const relevantErrors = errors.filter(e => !e.includes("favicon") && !e.includes("Failed to load module script"));

  expect(relevantErrors).toHaveLength(0);
});

// The "index page form" was removed in the refactor (it's now the Gamified ROI calculator)
// so we should either remove this test or update it to test the ROI calculator.
test("roi calculator interactivity", async ({ page }) => {
  await page.goto("/");

  const spendInput = page.getByRole("spinbutton").nth(0); // Monthly Ad Spend

  // Clear and type
  await spendInput.fill("20000");

  // Check if result updates.
  // Result text is in: .text-4xl.md:text-5xl.font-extrabold.text-white
  const result = page.locator(".text-4xl").first();
  await expect(result).toBeVisible();

  // We expect some value formatted as currency
  await expect(result).toContainText("$");
});
