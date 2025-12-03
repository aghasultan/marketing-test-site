import { test, expect } from "@playwright/test";

test("scale page has correct title", async ({ page }) => {
  await page.goto("/#/scale");
  await expect(page).toHaveTitle(
    "Meta & Google Ads Growth Partner | Agha Sultan Naseer",
  );
});

test("scale page displays hero section", async ({ page }) => {
  await page.goto("/#/scale");
  await expect(
    page.getByRole("heading", {
      name: "I Turn Ad Spend into Profit for Brands Ready to Scale",
    }),
  ).toBeVisible();
  await expect(page.getByText("7-figure Meta & Google Ads")).toBeVisible();
});

test("scale page displays profit scaling system", async ({ page }) => {
  await page.goto("/#/scale");
  await expect(
    page.getByRole("heading", { name: "Profit Scaling System™" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "The Framework Behind Sustainable" }),
  ).toBeVisible();

  // Check for a few list items in the framework
  await expect(
    page.getByText("Deep Research & Offer Positioning"),
  ).toBeVisible();
  await expect(page.getByText("Tracking & Attribution Setup")).toBeVisible();
  await expect(page.getByText("Campaign Architecture")).toBeVisible();
});

test("scale page displays case studies", async ({ page }) => {
  await page.goto("/#/scale");
  await expect(
    page.getByRole("heading", { name: "Case Studies & Wins" }),
  ).toBeVisible();
  await expect(page.getByText("18.1% CTR")).toBeVisible();
  await expect(page.getByText("15% Lift")).toBeVisible();
  await expect(page.getByText("37k Views")).toBeVisible();
});

test("cta buttons link to apply page", async ({ page }) => {
  await page.goto("/#/scale");

  // Hero CTA
  await expect(
    page
      .locator(".hero-cta")
      .getByRole("link", { name: "Apply for Strategy Call" }),
  ).toHaveAttribute("href", "/#/apply");

  // Final CTA
  await expect(
    page
      .locator(".contact-section")
      .getByRole("link", { name: "Apply for Strategy Call" }),
  ).toHaveAttribute("href", "/#/apply");
});
