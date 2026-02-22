# Story 4.2: Automated Schema Generation (ClaimReview)

## Metadata
- **Epic**: Epic 4
- **Title**: Automated Schema Generation (ClaimReview)
- **Role**: Trusted Publisher
- **Goal**: Automatically generate `ClaimReview` JSON-LD based on Markdown frontmatter to avoid manual complex JSON schema injection.

## Acceptance Criteria
- [ ] ClaimReview JSON-LD script tag dynamically generated and injected in `<head>` (FR15) based on Markdown frontmatter.
- [ ] Schema data must directly match the markdown variables (`claimDate`, `claimAppearance`, `author`).

## Tasks
- [ ] Create a strongly-typed `ClaimReview` Schema builder function in a dedicated SEO helper or component.
- [ ] Map markdown frontmatter (like `claimDate`, etc.) to the Schema builder logic.
- [ ] Inject the Schema dynamically when a Case Study page component unmounts/mounts dynamically.

## Testing Strategy
- Create a unit test checking that a given mock frontmatter object outputs an exact valid `ClaimReview` JSON-LD payload.
- Create Playwright E2E tests validating that `<script type="application/ld+json">` with `"@type": "ClaimReview"` exists on the dynamically generated Case Study URL.
