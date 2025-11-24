import { test, expect } from "@playwright/test";

test("services page has correct title", async ({ page }) => {
  await page.goto("/services.html");
  await expect(page).toHaveTitle("Services | Agha Sultan Naseer");
});

test("services page displays main service sections", async ({ page }) => {
  await page.goto("/services.html");

  // Check for the 3 main sections
  await expect(
    page.getByRole("heading", { name: "Meta Ads Management" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Google Ads & P‑Max" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Full-Funnel Growth & Tracking" }),
  ).toBeVisible();
});

test("services page displays client wins", async ({ page }) => {
  await page.goto("/services.html");
  await expect(
    page.getByRole("heading", { name: "Client Wins at a Glance" }),
  ).toBeVisible();
  // Check for specific win metrics
  await expect(page.getByText("18.1% CTR")).toBeVisible();
  await expect(page.getByText("37k Visits")).toBeVisible();
});

test("apply buttons link to apply page", async ({ page }) => {
  await page.goto("/services.html");

  // Check the 'Apply to Work Together' button in the full-funnel section
  const applyBtn = page.getByRole("link", { name: "Apply to Work Together" });
  await expect(applyBtn).toHaveAttribute("href", "apply.html#apply-form");

  // Check the pre-footer CTA
  const footerCta = page.getByRole("link", { name: "Apply to Work With Agha" });
  await expect(footerCta).toHaveAttribute("href", "apply.html");
});
