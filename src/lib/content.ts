
import { z } from 'zod';

export const MetricSchema = z.object({
    label: z.string(),
    value: z.string(),
    change: z.string().optional(),
});

export const CaseStudySchema = z.object({
    id: z.string(),
    title: z.string(),
    clientName: z.string(),
    industry: z.string(),
    adSpendRange: z.string().optional(),
    excerpt: z.string(),
    isVerified: z.boolean(),
    claimReview: z.any().optional(),
    metrics: z.array(MetricSchema),
    tags: z.array(z.string()).optional(),
});

export type CaseStudy = z.infer<typeof CaseStudySchema> & {
    slug: string;
    content: string;
};

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
    const modules = import.meta.glob('/src/content/case-studies/*.md', { eager: true });

    const caseStudies: CaseStudy[] = [];

    for (const path in modules) {
        const mod = modules[path] as any;
        const parsedData = CaseStudySchema.safeParse(mod.frontmatter);

        if (!parsedData.success) {
            console.error(`Validation failed for ${path}:`, parsedData.error);
            continue; // Skip invalid files
        }

        const slug = path.split('/').pop()?.replace('.md', '') || '';

        caseStudies.push({
            ...parsedData.data,
            slug,
            content: mod.content,
        });
    }

    return caseStudies;
}
