export type Industry = 'E-commerce' | 'SaaS' | 'B2B' | 'FinTech' | 'HealthTech';
export const INDUSTRIES: Industry[] = ['E-commerce', 'SaaS', 'B2B', 'FinTech', 'HealthTech'];

export type SpendBucket = '<$10k' | '$10k-$50k' | '$50k+';

export interface CaseStudy {
    id: string;
    clientName: string;
    industry: Industry;
    spend: SpendBucket;
    resultMetric: string;
    summary: string;
    tags: string[];
}
