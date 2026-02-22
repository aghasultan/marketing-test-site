import { test, expect } from '@playwright/test';

test.describe('Advanced SEO & Schema Validation', () => {

    test('Home Page: Should contain valid Organization schema', async ({ page }) => {
        await page.goto('/');

        const schemaScript = page.locator('script[type="application/ld+json"]');
        await expect(schemaScript).toBeAttached();

        const schemaContent = await schemaScript.textContent();
        expect(schemaContent).toBeTruthy();

        const schema = JSON.parse(schemaContent!);

        expect(schema['@context']).toBe('https://schema.org');
        expect(schema['@type']).toBe('Organization');
        expect(schema.name).toBe('RR Labs');
        expect(schema.url).toBe('https://riffatlabs.com');
        expect(schema.logo).toContain('riffat-labs-transparent.svg');
        expect(schema.sameAs).toContain('https://www.linkedin.com/company/riffatlabs');
    });

    test('Scale Page: Should contain valid Service schema', async ({ page }) => {
        await page.goto('/scale');

        const schemaScript = page.locator('script[type="application/ld+json"]');
        await expect(schemaScript).toBeAttached();

        const schemaContent = await schemaScript.textContent();
        expect(schemaContent).toBeTruthy();

        const schema = JSON.parse(schemaContent!);

        expect(schema['@context']).toBe('https://schema.org');
        expect(schema['@type']).toBe('Service');
        expect(schema.serviceType).toBe('Performance Paid Media');
        expect(schema.provider['@type']).toBe('Organization');
        expect(schema.provider.name).toBe('RR Labs');
        expect(schema.areaServed).toEqual(expect.arrayContaining(['US', 'UK', 'Europe']));
    });

    test('SEO Meta Tags: Should be present and correct (generic check)', async ({ page }) => {
        await page.goto('/');

        // Title
        await expect(page).toHaveTitle(/Meta & Google Ads Strategist \| (Riffat Labs|RR Labs)/);

        // Description
        const description = page.locator('meta[name="description"]');
        await expect(description).toHaveAttribute('content', /Media Buyer/i);

        // Open Graph
        await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /(Riffat Labs|RR Labs)/);
        await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /riffat-labs-transparent.svg/);
    });

});
