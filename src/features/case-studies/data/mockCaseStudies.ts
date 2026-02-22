import { CaseStudy } from '../types';
// Dynamically import all case studies from the content directory
const mdImports = import.meta.glob('/src/content/case-studies/*.md', { eager: true, import: 'default' });

export const caseStudies: CaseStudy[] = Object.values(mdImports).map((rawMod: unknown) => {
    const mod = rawMod as { frontmatter: Record<string, unknown>, content: string };
    return {
        ...mod.frontmatter,
        markdownContent: mod.content
    } as CaseStudy;
});

console.log("Loaded case studies length:", caseStudies.length);

// Since the rest of the app might rely on mockCaseStudies export name:
export const mockCaseStudies: CaseStudy[] = caseStudies;
