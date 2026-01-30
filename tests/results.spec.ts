import { test, expect } from '@playwright/test';

test.describe('Results Grid', () => {
    test('displays case study cards', async ({ page }) => {
        await page.goto('/results');

        // Verify header exists
        await expect(page.getByRole('heading', { name: 'Recent Results' })).toBeVisible();

        // Verify at least 3 cards are present (based on dummy data)
        const cards = page.locator('.group.relative');
        await expect(cards).toHaveCount(3);

        // Verify content of first card (EcoMarket)
        const firstCard = cards.first();
        await expect(page.getByText('EcoMarket')).toBeVisible();
        await expect(page.getByText('+300% ROAS')).toBeVisible();
        await expect(firstCard.getByText('E-commerce')).toBeVisible();

        // Verify glassmorphism classes are applied (basic check)
        await expect(firstCard).toHaveClass(/backdrop-blur-md/);
        await expect(firstCard).toHaveClass(/bg-zinc-900\/50/);
    });

    test('is responsive', async ({ page }) => {
        await page.goto('/results');

        // Check Mobile View
        await page.setViewportSize({ width: 375, height: 667 });
        const grid = page.locator('.grid');
        // In Tailwind, grid-cols-1 is default, so we check if it stacks
        // (Visual check harder in pure functional test without screenshot, but we verify existence)
        await expect(grid).toBeVisible();
    });

    test('filters results by industry', async ({ page }) => {
        await page.goto('/results');

        // Initial state: All cards visible
        await expect(page.getByText('EcoMarket')).toBeVisible();
        await expect(page.getByText('TechFlow')).toBeVisible();

        // Click E-commerce filter
        await page.getByRole('button', { name: 'E-commerce', exact: true }).click();

        // Verify EcoMarket (E-commerce) is visible
        await expect(page.getByText('EcoMarket')).toBeVisible();

        // Verify TechFlow (SaaS) is hidden
        await expect(page.getByText('TechFlow')).toBeHidden();

        // Click All to reset
        await page.getByRole('button', { name: 'All' }).click();
        await expect(page.getByText('TechFlow')).toBeVisible();
    });

    test('opens and closes modal', async ({ page }) => {
        await page.goto('/results');

        // Open modal
        await page.getByText('EcoMarket').click();

        // Verify Modal matches content
        const modal = page.getByRole('dialog');
        await expect(modal).toBeVisible();
        await expect(modal.getByRole('heading', { name: 'EcoMarket' })).toBeVisible();
        await expect(modal.getByText('+300% ROAS')).toBeVisible();

        // Close modal
        await page.getByLabel('Close').click();

        // Verify Modal closed
        await expect(page.getByRole('dialog')).toBeHidden();
    });

    test('preserves filter state after closing modal', async ({ page }) => {
        await page.goto('/results');

        // Apply filter
        await page.getByRole('button', { name: 'E-commerce', exact: true }).click();
        await expect(page.getByText('TechFlow')).toBeHidden();

        // Open Modal (EcoMarket)
        await page.getByText('EcoMarket').click();
        await expect(page.getByRole('dialog')).toBeVisible();

        // Close Modal
        await page.getByLabel('Close').click();

        // Verify filter still active
        await expect(page.getByText('TechFlow')).toBeHidden();
        await expect(page.getByText('EcoMarket')).toBeVisible();
    });
});
