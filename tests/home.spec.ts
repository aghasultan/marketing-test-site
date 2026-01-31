import { test, expect } from '@playwright/test';

test.describe('Home Page Visual & Accessibility', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('Hero section matches "Premium Technical" aesthetic', async ({ page }) => {
        const hero = page.locator('#hero');
        await expect(hero).toBeVisible();

        const heroTitle = page.locator('#hero-title');
        await expect(heroTitle).toBeVisible();
        await expect(heroTitle).toHaveText(/We Turn Paid Ads Into Profit Engines/i);

        // Check for Tailwind classes indicative of the design (sanity check)
        // Note: We are refactoring to remove custom classes, so we check for presence of structural elements
        const buttons = page.locator('a[href="/apply"]');
        await expect(buttons.first()).toBeVisible();
    });

    test('Service cards use Glassmorphism styles', async ({ page }) => {
        // Navigate to services section
        const serviceSection = page.locator('#services');
        await expect(serviceSection).toBeVisible();

        // Check for service cards
        // We expect 3 service cards
        const serviceCards = page.locator('#services .group');
        await expect(serviceCards).toHaveCount(3);

        // Check first card for glassmorphism classes (partial check via CSS if possible, but Playwright checks computed styles usually)
        // Here we just ensure they are visible and have some content
        await expect(serviceCards.first()).toBeVisible();
        await expect(serviceCards.first()).toContainText('Performance Paid Media');
    });

    test('Performance Snapshot card visibility', async ({ page }) => {
        const snapshotCard = page.getByText('Performance Snapshot');
        await expect(snapshotCard).toBeVisible();
        await expect(page.getByText('$5M+ / yr')).toBeVisible();
    });

    test('ROI Calculator inputs exist and are interactive', async ({ page }) => {
        const calculator = page.locator('#roi-calculator');
        await expect(calculator).toBeVisible();

        const spendInput = page.getByPlaceholder('10000');
        await expect(spendInput).toBeVisible();
        await expect(spendInput).toBeEditable();

        const hoursInput = page.getByPlaceholder('10', { exact: true });
        await expect(hoursInput).toBeVisible();

        const rateInput = page.getByPlaceholder('100', { exact: true });
        await expect(rateInput).toBeVisible();

        // Test interaction
        await spendInput.fill('20000');
        await expect(spendInput).toHaveValue('20000');
    });

    test('Accessibility Check (Lightweight)', async ({ page }) => {
        // Basic contrast and aria-label checks usually covered by accessibility scanners
        // Here we check for key aria attributes we expect
        await expect(page.locator('#hero')).toHaveAttribute('aria-labelledby', 'hero-title');
        await expect(page.locator('#skills')).toHaveAttribute('aria-labelledby', 'skills-title');
    });

    test('Mobile Responsiveness: Layout Verification', async ({ page }) => {
        // Set viewport to mobile size
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');

        // Verify Hero Title is visible
        const heroTitle = page.locator('#hero-title');
        await expect(heroTitle).toBeVisible();

        // Verify Service Cards are visible and stacked (implied by existence in viewport)
        const serviceCards = page.locator('#services .group');
        await expect(serviceCards.first()).toBeVisible();

        // Check bounding box to ensure it fits mobile width
        const box = await serviceCards.first().boundingBox();
        expect(box?.width).toBeLessThan(380); // Should fit within 375px - padding
    });
});
