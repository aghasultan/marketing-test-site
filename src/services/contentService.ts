import matter from 'gray-matter';

export interface CaseStudy {
    slug: string;
    title: string;
    client: string;
    industry: string;
    metric: string;
    result: string;
    tags: string[];
    coverImage: string;
    date: string;
    content: string;
}

export const getCaseStudies = async (): Promise<CaseStudy[]> => {
    const modules = import.meta.glob('../content/case-studies/*.md', { as: 'raw' });

    const caseStudies: CaseStudy[] = [];

    for (const path in modules) {
        const rawContent = await modules[path]();
        const { data, content } = matter(rawContent);
        const slug = path.split('/').pop()?.replace('.md', '') || '';

        caseStudies.push({
            slug,
            title: data.title || 'Untitled',
            client: data.client || 'Unknown Client',
            industry: data.industry || 'General',
            metric: data.metric || '',
            result: data.result || '',
            tags: data.tags || [],
            coverImage: data.coverImage || '',
            date: data.date || '',
            content
        });
    }

    return caseStudies.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
