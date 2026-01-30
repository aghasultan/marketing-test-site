import { test, expect } from '@playwright/test';

test.describe('Global Responsive Header', () => {
    test('should display desktop header correctly', async ({ page }) => {
        // Set viewport to desktop
        await page.setViewportSize({ width: 1920, height: 1080 });
        await page.goto('/');

        // Check header exists
        const header = page.locator('header');
        await expect(header).toBeVisible();

        // Check Logo
        await expect(header.getByText('Riffat Labs')).toBeVisible();

        // Check Navigation Links (Scoped to Header)
        // Check Navigation Links (Scoped to Header)
        await expect(header.getByRole('link', { name: 'Services', exact: true })).toBeVisible();
        await expect(header.getByRole('link', { name: 'Work', exact: true })).toBeVisible();
        await expect(header.getByRole('link', { name: 'About', exact: true })).toBeVisible();

        // Check Apply Button
        await expect(header.getByRole('button', { name: 'Apply' })).toBeVisible();

        // Check Sticky Behavior
        await page.evaluate(() => document.body.style.height = '2000px');
        await page.mouse.wheel(0, 500);
        // sticky change - allow time for transition
        await expect(header).toBeVisible();
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

        // Check Desktop Navigation Links are HIDDEN
        // The desktop links are inside a div with 'max-md:hidden'
        // We verify that specific links are not visible in the viewport or are hidden
        const desktopNav = header.locator('.hidden.md\\:flex');
        await expect(desktopNav).toBeHidden();

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

        // Verify Drawer is Closed (or removed from DOM)
        // We expect it to be gone. The animation might take a moment, but .not.toBeVisible() will retry.
        await expect(drawer).not.toBeVisible();
    });

    test('should have smooth scroll and correct scroll padding', async ({ page }) => {
        await page.goto('/');
        const html = page.locator('html');
        await expect(html).toHaveCSS('scroll-behavior', 'smooth');
        await expect(html).toHaveCSS('scroll-padding-top', '80px');
    });
});
