import { describe, it, expect } from 'vitest';
import { getBenchmarkForIndustry, INDUSTRY_BENCHMARKS } from '../benchmarks';

describe('benchmarks tests', () => {
    it('returns the saas benchmark for software related keywords', () => {
        const saas = getBenchmarkForIndustry('b2b software');
        expect(saas).toBeDefined();
        expect(saas?.id).toBe('saas');
        expect(saas?.aov).toBe(1200);
    });

    it('returns the ecommerce benchmark for retail keywords', () => {
        const ecom = getBenchmarkForIndustry('E-commerce brand');
        expect(ecom).toBeDefined();
        expect(ecom?.id).toBe('ecommerce');
        expect(ecom?.cpm).toBe(15);
    });

    it('returns the healthtech benchmark for healthcare keywords', () => {
        const health = getBenchmarkForIndustry('healthcare app');
        expect(health).toBeDefined();
        expect(health?.id).toBe('finance_health_mfg');
    });

    it('returns undefined if no matching keyword', () => {
        const unknown = getBenchmarkForIndustry('local restaurant');
        expect(unknown).toBeUndefined();
    });

    it('contains valid base benchmark data', () => {
        expect(INDUSTRY_BENCHMARKS.length).toBeGreaterThan(0);
        expect(INDUSTRY_BENCHMARKS[0].cpm).toBeGreaterThan(0);
        expect(INDUSTRY_BENCHMARKS[0].ctr).toBeGreaterThan(0);
    });
});
