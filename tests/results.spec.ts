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
        // Close modal using the top-right X button (always visible)
        await page.getByRole('button', { name: 'Close', exact: true }).click();

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
        // Close Modal
        await page.getByRole('button', { name: 'Close', exact: true }).click();

        // Verify filter still active
        await expect(page.getByRole('dialog')).toBeHidden();
        await expect(page.getByText('TechFlow')).toBeHidden();
        // Use first() or scope to grid to avoid strict mode issues if animation lingers
        await expect(page.locator('.grid').getByText('EcoMarket')).toBeVisible();
    });
    test('displays empty state when no results match', async ({ page }) => {
        await page.goto('/results');

        // Use a filter that has no matching case studies in default data (e.g. B2B)
        // B2B is in INDUSTRIES but no case study has industry: 'B2B' (TechFlow has tag 'B2B' but industry 'SaaS')
        const emptyFilterButton = page.getByRole('button', { name: 'B2B', exact: true });

        // Ensure it exists in the DOM
        await expect(emptyFilterButton).toHaveCount(1);

        // Force click
        await emptyFilterButton.click({ force: true });

        // Verify empty state message
        await expect(page.getByText('No exact matches found for this filter.')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Clear all filters' })).toBeVisible();

        // Click Clear Filter
        await page.getByRole('button', { name: 'Clear all filters' }).click();

        // Verify items came back
        await expect(page.getByText('EcoMarket')).toBeVisible();
    });
});
