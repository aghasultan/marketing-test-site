/// <reference types="vite/client" />

declare module '*.md' {
    export const frontmatter: Record<string, unknown>;
    export const content: string;
    const defaultExport: string;
    export default defaultExport;
}
