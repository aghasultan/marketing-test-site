import { test, expect } from '@playwright/test';

test.describe('Global Responsive Header', () => {
    test('should display desktop header correctly', async ({ page }) => {
        // Set viewport to desktop
        await page.setViewportSize({ width: 1280, height: 720 });
        await page.goto('/');

        // Check header exists
        const header = page.locator('header');
        await expect(header).toBeVisible();

        // Check Logo
        await expect(header.getByText('Riffat Labs')).toBeVisible();

        // Check Navigation Links (Scoped to Header)
        await expect(header.getByRole('link', { name: 'Services', exact: true })).toBeVisible();
        await expect(header.getByRole('link', { name: 'Work', exact: true })).toBeVisible();
        await expect(header.getByRole('link', { name: 'About', exact: true })).toBeVisible();

        // Check Apply Button
        await expect(header.getByRole('button', { name: 'Apply' })).toBeVisible();

        // Check Sticky Behavior
        await page.evaluate(() => document.body.style.height = '2000px');
        await page.mouse.wheel(0, 500);
        await page.waitForTimeout(100);
        await expect(header).toBeInViewport();
    });

    test('should display mobile header correctly', async ({ page }) => {
        // Set viewport to mobile
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');

        const header = page.locator('header');
        await expect(header).toBeVisible();
        await expect(header.getByText('Riffat Labs')).toBeVisible();

        const menuButton = header.getByLabel('Open menu');
        await expect(menuButton).toBeVisible();

        // Check Desktop Navigation Links are HIDDEN in Header
        // Note: We scope to header to ensure we aren't finding footer links
        await expect(header.getByRole('link', { name: 'Services', exact: true })).not.toBeVisible();
        await expect(header.getByRole('link', { name: 'Work', exact: true })).not.toBeVisible();

        // OPEN DRAWER
        await menuButton.click();

        // Check Drawer Content
        // Shadcn Sheet renders as a dialog in a portal
        const drawer = page.getByRole('dialog');
        await expect(drawer).toBeVisible();

        // Check Drawer Links
        await expect(drawer.getByRole('link', { name: 'Services', exact: true })).toBeVisible();
        await expect(drawer.getByRole('link', { name: 'Work', exact: true })).toBeVisible();
        await expect(drawer.getByRole('link', { name: 'About', exact: true })).toBeVisible();
        await expect(drawer.getByRole('button', { name: 'Apply' })).toBeVisible();

        // CLOSE DRAWER (by clicking a link)
        await drawer.getByRole('link', { name: 'Services', exact: true }).click();

        // Wait for animation
        await page.waitForTimeout(500);

        // Verify Drawer is Closed (or removed from DOM)
        // If removed, not.toBeVisible() passes. If hidden, it passes.
        // But we should check that the DIALOG is gone or hidden.
        await expect(drawer).not.toBeVisible();
    });
});
