
import { test, expect } from '@playwright/test';

test.describe('Audit: Wizard Integration', () => {
    test('opens wizard from Media Buying Calculator on Home Page', async ({ page }) => {
        // 1. Go to Home Page
        await page.goto('/');

        // 2. Locate the "Book Strategy Call" button in the calculator section
        // The calculator is in #roi-calculator section.
        // Button text is "Book Strategy Call".
        const bookButton = page.locator('#roi-calculator').getByRole('button', { name: 'Book Strategy Call' });

        // Scroll to it to ensure visibility
        await bookButton.scrollIntoViewIfNeeded();
        await expect(bookButton).toBeVisible();

        // 3. Click it
        await bookButton.click();

        // 4. Expect Wizard Trigger
        // The wizard renders in a portal/overlay.
        // It should have "Let's Get Started" or similar text from Welcome Step.
        // Or check for the container class/id.
        // Equal to: page.locator('[data-testid="wizard-container"]');
        // If data-testid is not present, look for known text.
        // Welcome step text: "Qualify Your Brand" or "Welcome"

        // Let's assume there is a dialog or we look for text.
        // Based on viewed files, WelcomeStep.tsx usually has "Qualify your brand for partnership" or similar.
        // And WizardContainer.tsx usually wraps it.

        // Let's rely on the text "Qualify your brand" (standard template)
        // or the Close button I added "✕"

        // Check for the heading text "Qualify for Exponential Growth"
        await expect(page.getByRole('heading', { name: 'Qualify for Exponential Growth' })).toBeVisible({ timeout: 5000 });

        // 5. Close it
        await page.getByRole('button', { name: '✕' }).click();
        await expect(page.getByRole('heading', { name: 'Qualify for Exponential Growth' })).not.toBeVisible();
    });
});
