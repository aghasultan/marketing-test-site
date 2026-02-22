export interface IndustryBenchmark {
    id: string;
    keywords: string[];
    cpm: number;
    ctr: number;
    cv: number;
    aov: number;
}

export const INDUSTRY_BENCHMARKS: IndustryBenchmark[] = [
    {
        id: 'ecommerce',
        keywords: ['e-commerce', 'ecommerce', 'retail', 'dtc'],
        cpm: 15,
        ctr: 2.0,
        cv: 3.5,
        aov: 85
    },
    {
        id: 'saas',
        keywords: ['saas', 'software', 'b2b', 'technology'],
        cpm: 45,
        ctr: 1.2,
        cv: 1.5,
        aov: 1200
    },
    {
        id: 'finance_health_mfg',
        keywords: ['finance', 'healthcare', 'manufacturing', 'fintech', 'healthtech'],
        cpm: 35,
        ctr: 2.1,
        cv: 4.0,
        aov: 450
    }
];

export const getBenchmarkForIndustry = (industryString: string): IndustryBenchmark | undefined => {
    const normalized = industryString.toLowerCase();
    return INDUSTRY_BENCHMARKS.find(benchmark =>
        benchmark.keywords.some(keyword => normalized.includes(keyword))
    );
};
