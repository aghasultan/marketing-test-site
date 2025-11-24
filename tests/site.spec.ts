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

  // Expects page to have a heading with the name of Services.
  await expect(
    page.getByRole("heading", { name: "Paid Media That Compounds Growth" }),
  ).toBeVisible();
});

test("dark mode toggle works", async ({ page }) => {
  await page.goto("/");

  const body = page.locator("body");
  const toggle = page.locator("[data-theme-toggle]");

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
  await page.goto("/404.html");
  await expect(
    page.getByRole("heading", { name: "404 - Page Not Found" }),
  ).toBeVisible();
});

test("favicons are correct", async ({ page }) => {
  await page.goto("/");
  const icon = page.locator('link[rel="icon"]').first();
  await expect(icon).toHaveAttribute("href", /riffat-labs-favicon.svg/);
});

test("no console errors on homepage", async ({ page }) => {
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      errors.push(msg.text());
    }
  });
  await page.goto("/");
  // Wait a bit for scripts to run
  await page.waitForTimeout(1000);
  expect(errors).toHaveLength(0);
});

test("index page form simulation works", async ({ page }) => {
  await page.goto("/");

  // Fill the form
  await page.getByLabel("Name").fill("Test User");
  await page.getByLabel("Email").fill("test@example.com");
  await page.getByLabel("WhatsApp").fill("+1234567890");
  await page.getByLabel("Service Interest").selectOption("Meta Ads");
  await page.getByLabel("Your Message").fill("Hello world");

  // Click submit
  await page.getByRole("button", { name: "Send Proposal Request" }).click();

  // Expect button text to change or success message
  // script.js changes button text first
  await expect(page.getByRole("button", { name: "Sending..." })).toBeVisible();

  // Then eventually it shows "Sent" or success panel
  // The script.js shows success panel if present, else changes button text
  // index.html has .form-success-panel
  const successPanel = page.locator(".form-success-panel").first();
  await expect(successPanel).toBeVisible({ timeout: 5000 });
});
