# Story 4.4: Dynamic SEO Metadata & Prerendering

## Metadata
- **Epic**: Epic 4
- **Title**: Dynamic SEO Metadata & Prerendering
- **Role**: SEO Specialist
- **Goal**: Render unique Meta Titles, Descriptions, and OpenGraph tags dynamically per route for SEO optimization.

## Acceptance Criteria
- [ ] Render dynamic `<title>`, `<meta name="description">` and `og:tags` contextualized to the viewed Markdown page (FR17).
- [ ] Automatically generate the social preview image based on the underlying case study detail.

## Tasks
- [ ] Implement or employ React Helmet, or manually hook `<head>` element to inject dynamically derived title/description tags on component mount.
- [ ] Connect the frontmatter values mapped in Story 4.1 to be pulled and injected by this SEO header component.

## Testing Strategy
- Perform tests ensuring that meta descriptions and titles strictly shift and represent the data bound to the individual Case Study.
