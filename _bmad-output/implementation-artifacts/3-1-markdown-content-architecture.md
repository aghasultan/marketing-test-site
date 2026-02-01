# Story 3.1: Markdown Content Architecture

Status: in-progress

## Story

As a Developer,
I want a type-safe system for loading Case Studies from Markdown,
so that I can ensure all content meets the strict Schema.org requirements before deployment.

## Acceptance Criteria

1.  **Given** a markdown file in `src/content/case-studies`
    **When** the build runs (or dev server starts)
    **Then** the frontmatter must be parsed and validated against a Zod schema.

2.  **Given** the `CaseStudySchema`
    **When** defining the content
    **Then** it must require:
    - `title`, `client`, `industry`, `service`
    - `metrics` (array of label/value/change)
    - `claimReview` (verdict: Trusted/Verified)
    - `author` (who verified it)
    - `date`

3.  **Given** valid content
    **When** querying for case studies
    **Then** I can retrieve them as a typed array `CaseStudy[]`.

4.  **Given** invalid content (missing fields)
    **When** validating
    **Then** it should log a clear error and potentially fail the build (strict mode).

## Tasks / Subtasks

- [x] **Task 1: Content Infrastructure**
    - [x] Install `gray-matter` (for parsing frontmatter).
    - [x] Create `src/lib/content.ts` (or `src/lib/case-studies.ts`).

- [x] **Task 2: Schema Definition**
    - [x] Define `CaseStudySchema` using Zod.
    - [x] Export TypeScript type `CaseStudy`.

- [x] **Task 3: Case Study Loader**
    - [x] Implement `getAllCaseStudies()` using `import.meta.glob`.
    - [x] Implement validation logic inside the loader.

- [x] **Task 4: Mock Content**
    - [x] Create 3 mock case study markdown files in `src/content/case-studies/` (e.g., `scale-ecommerce.md`, `b2b-lead-gen.md`).

- [x] **Task 5: Verification**
    - [x] Create a unit test `src/lib/content.test.ts` to verify the loader and validation work.

## Dev Notes

### Architecture Patterns
- **Content-as-Code:** We are treating case studies as code artifacts to ensure the "Verified" claim is backed by structured data for Schema.org.
- **Vite Glob Import:** Use `const modules = import.meta.glob('/src/content/case-studies/*.md', { as: 'raw' })` to load the text content.

### References
- [Epic 3: Verification & Results System](_bmad-output/planning-artifacts/epics.md#epic-3-verification--results-system)
