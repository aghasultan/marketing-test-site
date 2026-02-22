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

        // 4. Expect navigation to the Apply Wizard page
        await expect(page).toHaveURL(/.*\/apply/);

        // 5. Verify the Wizard is loaded by checking for step 1 text
        await expect(page.getByText("Let's start with the basics")).toBeVisible({ timeout: 5000 });
    });
});
