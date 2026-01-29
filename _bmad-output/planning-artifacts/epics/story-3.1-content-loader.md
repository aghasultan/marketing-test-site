# Story 3.1: Content Sharding & Loader

**Epic:** [Epic 3: Dynamic Case Study Engine](../epic-3-case-studies.md)
**Status:** Ready for Dev
**Assigned To:** Developer Agent

## 1. User Story
**As a** Developer,
**I want** a robust utility to parse Markdown case studies,
**So that** the frontend can query, filter, and display content dynamically without hardcoding.

## 2. Acceptance Criteria (AC)
- [ ] **Dependency:** `gray-matter` is installed for frontmatter parsing.
- [ ] **Directory Structure:** A `src/content/case-studies/` directory is created.
- [ ] **Loader Utility:** `src/lib/content-loader.ts` is implemented.
- [ ] **Functionality:** The loader must return an array of case study objects containing `slug`, `frontmatter`, and `content`.
- [ ] **Type Safety:** TypeScript interfaces defined for `CaseStudy` and `CaseStudyFrontmatter` (industry, service, metrics).

## 3. Technical Context
* **Ref:** [ADR-003] Content Sharding.
* **Input:** File system read of `.md` files.
* **Output:** JSON array for React consumption.

## 4. Implementation Plan
1.  Install `gray-matter`.
2.  Define `CaseStudy` types.
3.  Implement `getAllCaseStudies()` using Node's `fs` (if SSG) or a Vite glob import (if CSR). *Decision: Use Vite's `import.meta.glob` for pure SPA compatibility.*