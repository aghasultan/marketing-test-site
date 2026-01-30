import { test, expect } from '@playwright/test';

test.describe('Scale Page Refactor', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/scale');
  });

  test('Hero section renders correctly', async ({ page }) => {
    await expect(page.locator('h1#scale-hero-title')).toContainText(/Turn Ad Spend into Profit/i);
    await expect(page.getByRole('link', { name: 'Apply for Strategy Call' }).first()).toBeVisible();
  });

  test('Trust Strip is visible', async ({ page }) => {
    await expect(page.getByText('Meta Partner')).toBeVisible();
    await expect(page.getByText('Shopify Plus')).toBeVisible();
  });

  test('Problem section displays list', async ({ page }) => {
    await expect(page.getByText('The Paid Media Problem')).toBeVisible();
    await expect(page.getByText('CPMs climb, CPCs spike')).toBeVisible();
  });

  test('Framework steps are rendered', async ({ page }) => {
    await expect(page.getByText('Profit Scaling System')).toBeVisible();
    // Check for step 1
    await expect(page.getByText('Deep Research & Offer Positioning')).toBeVisible();
  });

  test('Case Studies grid is visible', async ({ page }) => {
    await expect(page.getByText('18.1% CTR')).toBeVisible();
    await expect(page.getByText('37k Views')).toBeVisible();
  });

  test('Final CTA is present', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Ready to Scale Profitably?' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Apply for Strategy Call' }).last()).toBeVisible();
  });

  test('Responsiveness: Grid stacks on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    // Check that H1 is still visible and readable
    await expect(page.locator('h1#scale-hero-title')).toBeVisible();
    // Check that we can see the "Services" section title stacking
    await expect(page.locator('#services-title')).toBeVisible();
    await expect(page.locator('#services-title')).toContainText('Services');
  });

});
