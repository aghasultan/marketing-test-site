// @vitest-environment happy-dom
import { describe, it, expect } from 'vitest';
import { parseAuditHtml } from '../parser';

describe('parseAuditHtml utility', () => {
    it('detects standard Meta Pixel in script tag text', () => {
        const html = `
            <html>
                <head>
                    <script>
                        !function(f,b,e,v,n,t,s){...}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
                        fbq('init', '1234567890');
                        fbq('track', 'PageView');
                    </script>
                </head>
                <body></body>
            </html>
        `;
        const result = parseAuditHtml(html);
        expect(result.pixelFound).toBe(true);
    });

    it('detects standard Meta Pixel in script tag src attribute', () => {
        const html = `
            <html>
                <head>
                    <script src="https://connect.facebook.net/en_US/fbevents.js"></script>
                </head>
                <body></body>
            </html>
        `;
        const result = parseAuditHtml(html);
        expect(result.pixelFound).toBe(true);
    });

    it('detects fallback Meta Pixel in noscript tag', () => {
        const html = `
            <html>
                <head></head>
                <body>
                    <noscript>
                        <img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1234567890&ev=PageView&noscript=1" />
                    </noscript>
                </body>
            </html>
        `;
        const result = parseAuditHtml(html);
        expect(result.pixelFound).toBe(true);
    });

    it('returns false for missing Meta Pixel', () => {
        const html = `
            <html>
                <head>
                    <script src="https://www.googletagmanager.com/gtm.js"></script>
                </head>
                <body></body>
            </html>
        `;
        const result = parseAuditHtml(html);
        expect(result.pixelFound).toBe(false);
    });

    it('detects standard SEO Title', () => {
        const html = `
            <html>
                <head>
                    <title>Riffat Labs: Performance Marketing</title>
                </head>
                <body></body>
            </html>
        `;
        const result = parseAuditHtml(html);
        expect(result.seoTitleFound).toBe(true);
    });

    it('returns false for empty SEO Title', () => {
        const html = `
            <html>
                <head>
                    <title></title>
                </head>
                <body></body>
            </html>
        `;
        const result = parseAuditHtml(html);
        expect(result.seoTitleFound).toBe(false);
    });

    it('detects standard SEO Description', () => {
        const html = `
            <html>
                <head>
                    <meta name="description" content="We scale your revenue predictably.">
                </head>
                <body></body>
            </html>
        `;
        const result = parseAuditHtml(html);
        expect(result.seoDescriptionFound).toBe(true);
    });

    it('returns false for missing SEO Description', () => {
        const html = `
            <html>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                </head>
                <body></body>
            </html>
        `;
        const result = parseAuditHtml(html);
        expect(result.seoDescriptionFound).toBe(false);
    });

    it('handles severely malformed HTML gracefully', () => {
        const html = `
            Riffat Labs
            <div id="root">
        `;
        const result = parseAuditHtml(html);
        expect(result.pixelFound).toBe(false);
        expect(result.seoTitleFound).toBe(false); // No title tag
        expect(result.seoDescriptionFound).toBe(false); // No meta desc
    });
});
