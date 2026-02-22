# Story 4.1: Markdown Content Publishing Pipeline

## Metadata
- **Epic**: Epic 4
- **Title**: Markdown Content Publishing Pipeline
- **Role**: Technical Marketer
- **Goal**: Publish case studies using Markdown files with frontmatter, so that I can quickly upload new results without modifying React UI components.

## Acceptance Criteria
- [ ] Markdown content (title, industry, metrics) should be parsed and available to React routing.
- [ ] Added case studies dynamically appear in the Results Grid.

## Tasks
- [ ] Set up `vite-plugin-md` or custom loader to parse Markdown/MDX into React components with frontmatter.
- [ ] Configure `src/content/case-studies` or similar folder to store `.md` files.
- [ ] Update `ResultsSection.tsx` and `BentoGrid.tsx` to read dynamic case studies instead of fully mocked lists.
- [ ] Implement a dynamic route e.g., `/case-studies/:slug` that renders the compiled Markdown inside a layout template.

## Testing Strategy
- Add a test verifying `mockCaseStudies` can be replaced or matched with Markdown-imported items.
- Write E2E/Playwright tests ensuring that a dynamic case study page loads and displays content from the MD file.
