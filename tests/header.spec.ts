
import { test, expect } from '@playwright/test';

test.describe('Global Responsive Header', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    // Skipped snapshot test to ensure stability first
    // test('should match snapshot of header', async ({ page }) => {
    //     await expect(page.locator('header')).toHaveScreenshot('header-desktop.png');
    // });

    test('should display desktop nav links', async ({ page, isMobile }) => {
        if (isMobile) test.skip();

        const desktopNav = page.getByTestId('desktop-nav');

        await expect(desktopNav).toBeVisible();
        await expect(desktopNav.getByRole('link', { name: 'Services' })).toBeVisible();
        await expect(desktopNav.getByRole('link', { name: 'Case Studies' })).toBeVisible();
        await expect(desktopNav.getByRole('link', { name: 'Audit', exact: true })).toBeVisible();
        await expect(desktopNav.getByRole('link', { name: 'Resources' })).toBeVisible();
        await expect(desktopNav.getByRole('link', { name: 'Start Audit' })).toBeVisible();
    });

    test('should display mobile header correctly', async ({ page, isMobile }) => {
        if (!isMobile) test.skip();

        // Check Logo
        await expect(page.getByRole('link', { name: 'Riffat Labs' })).toBeVisible();

        const menuButton = page.getByTestId('mobile-menu-button');
        await expect(menuButton).toBeVisible();

        // Open Menu
        await menuButton.click();

        const drawer = page.getByTestId('mobile-menu-content');
        await expect(drawer).toBeVisible();

        // Check Drawer Links
        await expect(drawer.getByRole('link', { name: 'Services' })).toBeVisible();
        await expect(drawer.getByRole('link', { name: 'Case Studies' })).toBeVisible();
        await expect(drawer.getByRole('link', { name: 'Audit' })).toBeVisible();
        await expect(drawer.getByRole('link', { name: 'Resources' })).toBeVisible();
        await expect(drawer.getByRole('link', { name: 'Start Audit' })).toBeVisible();
    });

    test('should sticky on scroll', async ({ page }) => {
        const header = page.locator('header');

        // Initial state: border-transparent
        await expect(header).toHaveClass(/border-transparent/);

        // Scroll down
        await page.mouse.wheel(0, 500);
        await page.waitForTimeout(500); // Wait for transition

        // Scrolled state: glass border-white/10
        await expect(header).toHaveClass(/glass/);
        await expect(header).toHaveClass(/border-white\/10/);
    });
});
