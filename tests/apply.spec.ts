import { test, expect } from '@playwright/test';

test.describe('Apply Wizard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/apply');
  });

  test('navigates through steps correctly', async ({ page }) => {
    // Step 1: Contact Info
    await expect(page.getByText('Contact Info')).toBeVisible();
    await expect(page.getByText('Step 1 of 3')).toBeVisible();
    await expect(page.getByPlaceholder('Jane', { exact: true })).toBeVisible();

    // Fill Step 1
    await page.getByPlaceholder('Jane', { exact: true }).fill('John Doe');
    await page.getByPlaceholder('jane@example.com').fill('john@example.com');

    // Click Next
    await page.getByRole('button', { name: 'Next Step' }).click();

    // Step 2: Business Details
    await expect(page.getByText('Business Details')).toBeVisible();
    await expect(page.getByText('Step 2 of 3')).toBeVisible();
    await expect(page.getByPlaceholder('Acme Inc.')).toBeVisible();

    // Fill Step 2
    await page.getByPlaceholder('Acme Inc.').fill('My Startup');
    await page.getByRole('combobox', { name: 'Industry' }).selectOption('Tech');

    // Click Next
    await page.getByRole('button', { name: 'Next Step' }).click();

    // Step 3: Review
    await expect(page.getByText('Review Your Application')).toBeVisible();
    await expect(page.getByText('Step 3 of 3')).toBeVisible();

    // Verify Review Content
    await expect(page.getByText('John Doe')).toBeVisible();
    await expect(page.getByText('john@example.com')).toBeVisible();
    await expect(page.getByText('My Startup')).toBeVisible();
    await expect(page.getByText('Tech', { exact: true })).toBeVisible();

    // Submit
    await page.getByRole('button', { name: 'Submit Application' }).click();

    // Verify Success
    await expect(page.getByText('Application Received!')).toBeVisible();
    await expect(page.getByText('Back to Home')).toBeVisible();
  });

  test('supports back navigation and editing', async ({ page }) => {
    // Fill Step 1
    await page.getByPlaceholder('Jane', { exact: true }).fill('John Doe');
    await page.getByPlaceholder('jane@example.com').fill('john@example.com');
    await page.getByRole('button', { name: 'Next Step' }).click();

    // Fill Step 2
    await page.getByPlaceholder('Acme Inc.').fill('My Startup');
    await page.getByRole('combobox', { name: 'Industry' }).selectOption('Tech');
    await page.getByRole('button', { name: 'Next Step' }).click();

    // Verify Review Step
    await expect(page.getByText('Review Your Application')).toBeVisible();

    // Click Edit Contact Info (index 0 implies first edit button)
    const editbuttons = page.getByRole('button', { name: 'Edit' });
    await editbuttons.first().click();

    // Verify back at Step 1
    await expect(page.getByText('Contact Info')).toBeVisible();
    await expect(page.getByPlaceholder('Jane', { exact: true })).toHaveValue('John Doe');

    // Change Name
    await page.getByPlaceholder('Jane', { exact: true }).fill('Jane Doe');

    // Go forward to Review (Step 1 -> Next -> Step 2 -> Next -> Review)
    await page.getByRole('button', { name: 'Next Step' }).click();
    await page.getByRole('button', { name: 'Next Step' }).click();

    // Verify Updated Name
    await expect(page.getByText('Jane Doe')).toBeVisible();
  });
});
