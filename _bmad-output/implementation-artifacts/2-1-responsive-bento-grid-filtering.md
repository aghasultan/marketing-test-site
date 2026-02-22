# Story 2.1: Responsive Bento Grid & Filtering

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a Skeptical CMO,
I want to view and filter case studies seamlessly by Industry and Ad Spend,
So that I can quickly find results that are highly relevant to my specific business context.

## Acceptance Criteria

1. **Given** the user navigates to the Results section
   **When** the case studies are loaded from local markdown files
   **Then** they must be displayed in a responsive `<BentoGrid />` layout
2. **And** selecting filters must instantly update the grid without page reload
3. **And** the layout must collapse gracefully to a single column on mobile.

## Tasks / Subtasks

- [x] Task 1: Initialize Case Studies Data Structure (AC: 1)
  - [x] Define the TypeScript interfaces (`CaseStudy`, `FilterCategory`) in `src/features/case-studies/types.ts`.
  - [x] Create a mock data service or utility (until markdown parsing is fully built in Epic 4) to supply at least 4-6 diverse mock case studies in `src/features/case-studies/data/mockCaseStudies.ts`.
- [x] Task 2: Create BentoGrid Component (AC: 1, 3)
  - [x] Scaffold `BentoGrid.tsx` in `src/features/case-studies/components/` using Tailwind CSS grid layouts (`gap-4`, `md:grid-cols-2`, `lg:grid-cols-3` or similar bento style).
  - [x] Ensure it accurately falls back to `grid-cols-1` on mobile screens.
- [x] Task 3: Implement Stateful Filtering (AC: 2)
  - [x] Create a `Filtering` UI component (e.g., buttons or dropdowns for Industry and Ad Spend).
  - [x] Wrap the `BentoGrid` in a container (e.g., `ResultsSection.tsx`) that manages the filter state via React `useState`.
  - [x] Write logic to accurately filter the incoming case study data array based on active filters in real-time.
- [x] Task 4: UI/UX Motion
  - [x] Implement `framer-motion` `AnimatePresence` and layout animations to make the filtering feel fluid and premium.

## Dev Notes
- For the Bento Grid, look to modern aesthetics: deep zinc-950 background, white/5 borders, frosted glass cards over a gradient mesh.
- Make sure that filtering has zero layout shift problems (use `framer-motion` layout prop on grid items).

### File List
- src/features/case-studies/types.ts
- src/features/case-studies/data/mockCaseStudies.ts
- src/features/case-studies/components/FilterBar.tsx
- src/features/case-studies/components/CaseStudyCard.tsx
- src/features/case-studies/components/BentoGrid.tsx
- src/features/case-studies/components/ResultsSection.tsx
- src/features/case-studies/index.ts
- src/pages/Home.tsx
