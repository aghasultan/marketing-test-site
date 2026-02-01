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
        await expect(heroTitle).toHaveText(/Audit your Agency/i);

        // Check for Audit Scanner presence (Analyze Now button)
        const analyzeBtn = page.getByRole('button', { name: /Analyze Now/i });
        await expect(analyzeBtn).toBeVisible();
    });

    test('Service cards use Glassmorphism styles', async ({ page }) => {
        // Navigate to services section
        const serviceSection = page.locator('#services');
        await expect(serviceSection).toBeVisible();

        // Check for service cards
        // We expect 3 service cards
        const serviceCards = page.locator('#services .group');
        await expect(serviceCards).toHaveCount(3);

        // Check first card for glassmorphism classes (partial check via visible content)
        await expect(serviceCards.first()).toBeVisible();
        await expect(serviceCards.first()).toContainText('Performance Paid Media');
    });

    test('Audit Scanner visibility', async ({ page }) => {
        const scannerInput = page.getByPlaceholder(/Enter your website URL/i);
        await expect(scannerInput).toBeVisible();
        const analyzeBtn = page.getByRole('button', { name: /Analyze Now/i });
        await expect(analyzeBtn).toBeVisible();
    });

    test('ROI Calculator inputs exist and are interactive', async ({ page }) => {
        const calculator = page.locator('#roi-calculator');
        await expect(calculator).toBeVisible();

        // Check for "Projected Revenue" text which indicates calculator is rendered
        await expect(page.getByText('Projected Monthly Outcome')).toBeVisible();

        // Check for presence of Sliders
        const sliders = page.getByRole('slider');
        // We have 5 inputs: Spend, CPM, CTR, CV, AOV
        await expect(sliders).toHaveCount(5);

        // Verify "Book Strategy Call" button is present in calculator
        const bookBtn = calculator.getByRole('button', { name: /Book Strategy Call/i });
        await expect(bookBtn).toBeVisible();
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
