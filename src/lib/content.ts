
import matter from 'gray-matter';
import { z } from 'zod';

export const MetricSchema = z.object({
    label: z.string(),
    value: z.string(),
    change: z.string(),
});

export const CaseStudySchema = z.object({
    title: z.string(),
    client: z.string(),
    industry: z.string(),
    service: z.string(),
    date: z.string(),
    author: z.string(),
    claimReview: z.object({
        verdict: z.enum(['Verified', 'Trusted', 'Pending']),
        rating: z.number().min(1).max(5),
    }),
    metrics: z.array(MetricSchema),
    tags: z.array(z.string()).optional(),
});

export type CaseStudy = z.infer<typeof CaseStudySchema> & {
    slug: string;
    content: string;
};

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
    const modules = import.meta.glob('/src/content/case-studies/*.md', { as: 'raw', eager: true });

    const caseStudies: CaseStudy[] = [];

    for (const path in modules) {
        const rawContent = modules[path] as string;
        const { data, content } = matter(rawContent);

        const parsedData = CaseStudySchema.safeParse(data);

        if (!parsedData.success) {
            console.error(`Validation failed for ${path}:`, parsedData.error);
            continue; // Skip invalid files
        }

        const slug = path.split('/').pop()?.replace('.md', '') || '';

        caseStudies.push({
            ...parsedData.data,
            slug,
            content,
        });
    }

    return caseStudies;
}
