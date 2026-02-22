# Story 4.3: Build-Time Schema Validation

## Metadata
- **Epic**: Epic 4
- **Title**: Build-Time Schema Validation
- **Role**: QA Engineer
- **Goal**: Strictly validate all `ClaimReview` schemas at build time to prevent deployment of missing or invalid fields and avoid search penalties.

## Acceptance Criteria
- [ ] Missing required schema fields should cause `npm run build` to fail (FR16).
- [ ] Build script must output clear error specifying which file and field failed validation.
- [ ] 100% of case studies must meet Google Rich Snippet standards.

## Tasks
- [ ] Integrate a build script using Zod (e.g., `prebuild` hook) that scans all `.md` files in the case studies directory.
- [ ] Assert that each file contains mandatory fields (`claimDate`, `claimAppearance`, `author` etc.).
- [ ] Log an explicit error format that fails the CI build if validity checks fail.

## Testing Strategy
- Create tests for the validation script itself with mock valid/invalid Markdown files.
- Verify shell script correctly exits with a `1` status code upon invalid input.
