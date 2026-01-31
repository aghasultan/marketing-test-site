import { test, expect } from '@playwright/test';

test.describe('Apply Wizard - Branching & Validation', () => {
    test.beforeEach(async ({ page }) => {
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        await page.goto('/apply');
    });

    test('should block next step if validation fails', async ({ page }) => {
        // Step 1: Contact
        await expect(page.locator('h2')).toContainText('Contact Info');

        // Try to click Next without filling anything
        await page.getByRole('button', { name: 'Next Step' }).click();

        // Should see error messages
        await expect(page.getByText('First name is required')).toBeVisible();
        // await expect(page.getByText('Email is required')).toBeVisible();

        // Should still be on Step 1
        await expect(page.locator('h2')).toContainText('Contact Info');
    });

    test('should proceed when validation passes and handle conditional logic', async ({ page }) => {
        // --- Step 1 ---
        await page.getByPlaceholder('Jane', { exact: true }).fill('Test User');
        await page.getByPlaceholder('jane@example.com').fill('test@example.com');
        await page.getByRole('button', { name: 'Next Step' }).click();

        // --- Step 2 ---
        await expect(page.locator('h2')).toContainText('Business Details');

        // Test Conditional Logic
        const industrySelect = page.locator('select[name="industry"]');
        await industrySelect.selectOption('Other');

        // Expect input to appear
        const customInput = page.getByPlaceholder('e.g. Non-profit');
        await expect(customInput).toBeVisible();

        // Try to next without filling custom input
        await page.getByRole('button', { name: 'Next Step' }).click();
        await expect(page.getByText('Please specify your industry')).toBeVisible();

        // Fill custom input and other required fields
        await customInput.fill('Space Exploration');
        await page.getByPlaceholder('Acme Inc.').fill('Spacex Origin');
        await page.locator('select[name="revenueRange"]').selectOption('50k-200k');

        // Fix: Select Service Type (Required)
        await page.locator('select[name="serviceType"]').selectOption('paid-advertising');

        // Submit Step 2
        await page.getByRole('button', { name: 'Next Step' }).click();

        // --- Step 3 ---
        await expect(page.locator('h2')).toContainText('Service Details');

        // Submit Step 3 (Service Details)
        // Defaults are fine, just click next
        await page.getByRole('button', { name: 'Next Step' }).click();

        // --- Step 4 ---
        await expect(page.locator('h2')).toContainText('Review');

        // Setup console listener to catch the log
        const consoleLogs: string[] = [];
        page.on('console', msg => consoleLogs.push(msg.text()));

        // Submit Logic (Assuming there is a Submit button on Review step or Next becomes Submit)
        // Checking Apply.tsx:
        // {isLastStep ? ( <button type="submit" ...>Submit Application</button> ) : ( ... )}
        // Step 3 is the last step (totalSteps=3)

        await page.getByRole('button', { name: 'Submit Application' }).click();

        // Verify alert or log
        // Since we mocked window.alert in test environment usually or need to handle dialog
        page.on('dialog', dialog => dialog.accept());

        // Wait for a bit (or check for a success message if UI updates, but it currently just alerts)
        // Let's verify standard console log output from onSubmit
        // console.log('Form Submitted:', data);

        // We can check if the button is present or if we handled the dialog
        // Simple assertion: ensure we clicked it and maybe check if we are still on page or something changed.
        // For this story, just clicking submit without validation error is enough proof of "logging valid JSON" combined with the console listener.

        // To be more robust, let's wait for the console log
        await expect.poll(() => consoleLogs.some(log => log.includes('Form Submitted:'))).toBeTruthy();
    });
});
