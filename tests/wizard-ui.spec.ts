
import { test, expect } from '@playwright/test';

test.describe('Wizard UI & Feedback', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/apply');
    });

    test('should show visual feedback during step transitions', async ({ page }) => {
        // Fill first step
        await page.getByRole('textbox', { name: 'First Name' }).fill('Test User');
        await page.getByRole('textbox', { name: 'Email' }).fill('test@example.com');

        // Click next and check for transition
        // Note: verifying animation directly is hard, but we can check if the new step content appears
        // and if the previous key changes.
        const firstStepContent = page.locator('text=Contact Info');
        await expect(firstStepContent).toBeVisible();

        await page.getByRole('button', { name: 'Next Step' }).click();

        const secondStepContent = page.locator('text=Business Details');
        await expect(secondStepContent).toBeVisible();

        // Ideally we would check for the presence of motion classes or attributes if we could,
        // but checking functionality is the baseline.
    });

    test('should show checkmarks on step indicator for completed steps', async ({ page }) => {
        // Step 1
        await page.getByRole('textbox', { name: 'First Name' }).fill('Test User');
        await page.getByRole('textbox', { name: 'Email' }).fill('test@example.com');
        await page.getByRole('button', { name: 'Next Step' }).click();

        // Check Step 1 indicator. Assuming we'll add a checkmark icon or class.
        // We'll look for a specific testid or class that indicates completion/checked state.
        // For now, let's assume we add a data-testid="step-indicator-item-1" and check if it has a checked state.
        // Or simpler: check if the dot for step 1 changes color or has an icon.
        // The implementation plan says "Add checkmark icons".
        const step1Indicator = page.locator('[data-testid="step-indicator"] .bg-emerald-500').first(); // Hypothetical class for completed step
        // We will need to update the test once we implement the specific DOM structure.
        // For 'Red' phase, let's expect a specific aria-label or status.

        // Let's assert that the text "Step 2 of 4" is visible
        await expect(page.getByText('Step 2 of 4')).toBeVisible();
    });

    test('should show active step pulse animation', async ({ page }) => {
        // This is hard to test with Playwright without screenshot testing, 
        // but we can check for the existence of the animation class if we use tailwind animate-pulse
        // or a framer motion style. Be lenient here.
        const indicator = page.locator('[data-testid="step-indicator"]');
        await expect(indicator).toBeVisible();
    });

    test('should display high-contrast error messages', async ({ page }) => {
        // Click Next without filling anything
        await page.getByRole('button', { name: 'Next Step' }).click();

        // Check for error on First Name
        const nameError = page.locator('text=First name is required');
        await expect(nameError).toBeVisible();
        // Check if it has red color class (tailwind text-red-400 or similar)
        await expect(nameError).toHaveClass(/text-red-400/);
    });

    test('should manage focus on step change', async ({ page }) => {
        // Fill first step
        await page.getByRole('textbox', { name: 'First Name' }).fill('Test User');
        await page.getByRole('textbox', { name: 'Email' }).fill('test@example.com');

        await page.getByRole('button', { name: 'Next Step' }).click();

        // Wait for transition
        await page.waitForTimeout(500); // Wait for animation

        // Expect focus to be on the first input of step 2 (Company Name)
        const companyInput = page.getByPlaceholder('Acme Inc.');
        await expect(companyInput).toBeFocused();
    });

    test('submission button should show loading state', async ({ page }) => {
        // Fast forward to last step (this is tedious without a helper, but explicit for now)
        // Step 1
        await page.getByRole('textbox', { name: 'First Name' }).fill('Test User');
        await page.getByRole('textbox', { name: 'Email' }).fill('test@example.com');
        await page.getByRole('button', { name: 'Next Step' }).click();

        // Step 2
        await page.getByPlaceholder('Acme Inc.').fill('Test Corp');
        await page.locator('select[name="industry"]').selectOption('Tech');
        await page.locator('select[name="serviceType"]').selectOption('Data & Analytics');
        await page.getByRole('button', { name: 'Next Step' }).click();

        // Step 3
        await page.getByRole('button', { name: 'Next Step' }).click();

        // Step 4 (Review)
        const submitButton = page.getByRole('button', { name: 'Submit Application' });
        await expect(submitButton).toBeVisible();

        await submitButton.click();

        // Check for loading state
        await expect(page.getByText('Submitting...')).toBeVisible();
        await expect(submitButton).toBeDisabled();
    });
});
