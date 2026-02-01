
import { describe, it, expect } from 'vitest';
import { CaseStudySchema, MetricSchema } from './content';

describe('Content Architecture', () => {

    describe('MetricSchema', () => {
        it('validates correct metric', () => {
            const valid = { label: 'ROAS', value: '4x', change: '+10%' };
            const result = MetricSchema.safeParse(valid);
            expect(result.success).toBe(true);
        });

        it('fails on missing fields', () => {
            const invalid = { label: 'ROAS', value: '4x' };
            const result = MetricSchema.safeParse(invalid);
            expect(result.success).toBe(false);
        });
    });

    describe('CaseStudySchema', () => {
        const validCaseStudy = {
            title: 'Test Study',
            client: 'Acme',
            industry: 'Tech',
            service: 'Ads',
            date: '2025-01-01',
            author: 'Bot',
            claimReview: { verdict: 'Verified', rating: 5 },
            metrics: [{ label: 'Rev', value: '$1M', change: '+50%' }]
        };

        it('validates a complete case study', () => {
            const result = CaseStudySchema.safeParse(validCaseStudy);
            expect(result.success).toBe(true);
        });

        it('fails when claimReview is invalid', () => {
            const invalid = { ...validCaseStudy, claimReview: { verdict: 'Fake', rating: 6 } };
            const result = CaseStudySchema.safeParse(invalid);
            expect(result.success).toBe(false);
        });

        it('fails when metrics are missing', () => {
            const invalid = { ...validCaseStudy, metrics: [] };
            // Actually empty array is valid in Zod by default unless .min(1)
            // Let's test missing metrics array entirely
            const { metrics, ...missingMetrics } = validCaseStudy;
            const result = CaseStudySchema.safeParse(missingMetrics);
            expect(result.success).toBe(false);
        });
    });

});
