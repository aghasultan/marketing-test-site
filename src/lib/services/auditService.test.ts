
import { describe, it, expect } from 'vitest';
import { checkMetaPixel, checkSEO, checkPerformance } from './auditService';

describe('Audit Service Logic', () => {

    describe('checkMetaPixel', () => {
        it('should detect standard pixel init code', () => {
            const html = `<html><script>fbq('init', '123456');</script></html>`;
            const result = checkMetaPixel(html);
            expect(result.status).toBe('pass');
            expect(result.score).toBe(100);
        });

        it('should detect connect.facebook.net script', () => {
            const html = `<html><script src="https://connect.facebook.net/en_US/fbevents.js"></script></html>`;
            const result = checkMetaPixel(html);
            expect(result.status).toBe('pass');
        });

        it('should fail when no pixel logic is present', () => {
            const html = `<html><body>Just text</body></html>`;
            const result = checkMetaPixel(html);
            expect(result.status).toBe('fail');
            expect(result.score).toBe(0);
        });
    });

    describe('checkSEO', () => {
        it('should pass with valid title and description', () => {
            const meta = { title: 'Perfect Title Length', description: 'A good description' };
            const result = checkSEO('', meta);
            expect(result.status).toBe('pass');
        });

        it('should fail if title is too short', () => {
            const meta = { title: 'Hi', description: 'Desc' };
            const result = checkSEO('', meta);
            expect(result.status).toBe('fail');
            expect(result.message).toContain('too short');
        });

        it('should fail if description is missing', () => {
            const meta = { title: 'Good Title Here', description: '' };
            const result = checkSEO('', meta);
            expect(result.message).toContain('Missing meta description');
        });
    });

    describe('checkPerformance', () => {
        it('should pass if duration < 1000ms', () => {
            const result = checkPerformance(1000, 1500); // 500ms
            expect(result.status).toBe('pass');
        });

        it('should fail if duration > 1000ms', () => {
            const result = checkPerformance(1000, 2500); // 1500ms
            expect(result.status).toBe('fail');
        });
    });

});
