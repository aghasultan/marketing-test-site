import { CaseStudy } from '../types';
import matter from 'gray-matter';

// Dynamically import all case studies from the content directory
const mdImports = import.meta.glob('/src/content/case-studies/*.md', { query: '?raw', eager: true });

export const caseStudies: CaseStudy[] = Object.values(mdImports).map((rawMod: unknown) => {
    const rawString = (rawMod as { default: string }).default;
    const parsed = matter(rawString);
    return {
        ...parsed.data,
        markdownContent: parsed.content
    } as unknown as CaseStudy;
});

console.log("Loaded case studies length:", caseStudies.length);

// Since the rest of the app might rely on mockCaseStudies export name:
export const mockCaseStudies: CaseStudy[] = caseStudies;
