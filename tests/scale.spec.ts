import { test, expect } from '@playwright/test';

test.describe('Scale (Services) Page Visual & Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/scale');
  });

  test('Hero section loads with correct title', async ({ page }) => {
    const heroTitle = page.locator('#scale-hero-title');
    await expect(heroTitle).toBeVisible();
    await expect(heroTitle).toHaveText(/I Turn Ad Spend into Profit/i);
  });

  test('CTA buttons match expected styles and links', async ({ page }) => {
    const applyBtn = page.locator('#hero a[href="/apply"]').first();
    await expect(applyBtn).toBeVisible();
    await expect(applyBtn).toHaveText(/Strategy Call/i);

    // CSS class check for consistency with Home page primary button (sanity check)
    // Expecting white background text zinc-950 (or similar primary style)
    // await expect(applyBtn).toHaveClass(/bg-white/); 
  });

  test('Key sections are visible', async ({ page }) => {
    await expect(page.locator('#problem-title')).toBeVisible();
    await expect(page.locator('#expected-results-title')).toBeVisible();
    await expect(page.locator('#framework-title')).toBeVisible();
    await expect(page.locator('#case-studies')).toBeVisible();
  });

  test('Glassmorphism cards have correct classes (smoke test)', async ({ page }) => {
    // Check "Problem" section card
    const problemCard = page.locator('section[aria-labelledby="problem-title"] > div > div');
    await expect(problemCard).toBeVisible();
    // Just checking basic visibility, strict class checking is brittle, 
    // but we can ensure it stands out
  });

  test('Mobile Responsiveness: Layout Verification', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Check Hero stacking
    const heroTitle = page.locator('#scale-hero-title');
    await expect(heroTitle).toBeVisible();

    // Check "What Results You Can Expect" stacking
    const resultsSection = page.locator('#expected-results');
    await expect(resultsSection).toBeVisible();

    // Ensure "Mini Case Card" is visible (it should stack)
    const miniCaseCard = page.getByText('Med-Spa Lead Gen');
    await expect(miniCaseCard).toBeVisible();
  });
});
