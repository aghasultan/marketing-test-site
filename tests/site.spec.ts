import { test, expect } from "@playwright/test";

test("homepage has title and hero text", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Agha Sultan Naseer/);
  await expect(
    page.getByRole("heading", { name: /Turn Ad Spend into Profit/i }),
  ).toBeVisible();
});

test("navigation links work", async ({ page }) => {
  await page.goto("/");

  // Click the Services link.
  await page.getByRole("link", { name: "Services", exact: true }).click();

  // Expects page to have a heading with the name of Services.
  await expect(
    page.getByRole("heading", { name: "Paid Media That Compounds Growth" }),
  ).toBeVisible();
});

test("dark mode toggle works", async ({ page }) => {
  await page.goto("/");

  const body = page.locator("body");
  const toggle = page.locator("[data-theme-toggle]");

  // Check initial state (could be light or dark depending on system, but let's assume default behavior)
  // We can check if the class 'theme-dark' is toggled.

  // Get initial class list
  const initialClasses = await body.getAttribute("class");
  const isDark = initialClasses?.includes("theme-dark");

  await toggle.click();

  // Wait for class change
  await page.waitForTimeout(500); // short wait for transition/js

  const newClasses = await body.getAttribute("class");
  if (isDark) {
    expect(newClasses).not.toContain("theme-dark");
  } else {
    expect(newClasses).toContain("theme-dark");
  }
});

test("apply page has form", async ({ page }) => {
  await page.goto("/apply.html");
  await expect(page.getByLabel("Name")).toBeVisible();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Submit Application" }),
  ).toBeVisible();
});

test("404 page works", async ({ page }) => {
  await page.goto("/non-existent-page.html");
  // Since we are using http-server locally, it might not serve 404.html automatically for unknown routes
  // unless configured (typically serves default 404).
  // However, we can explicitly test the 404.html page content.
  await page.goto("/404.html");
  await expect(
    page.getByRole("heading", { name: "404 - Page Not Found" }),
  ).toBeVisible();
});
