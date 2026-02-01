# Story 3.2: Bento Grid Layout Engine

Status: in-progress

## Story

As a User,
I want to view case studies in an organized, responsive grid,
so that I can quickly scan for relevant results without being overwhelmed.

## Acceptance Criteria

1.  **Given** a list of `CaseStudy` objects
    **When** rendered in the UI
    **Then** they should appear in a responsive Grid layout.

2.  **Given** the Desktop view
    **When** viewing the grid
    **Then** it should use a "Bento" style layout (mixed sizes).
    **And** certain items (e.g., first 1 or 2 high-impact studies) should span multiple columns/rows for visual weight.

3.  **Given** the Mobile view
    **When** viewing the grid
    **Then** it should stack vertically (1 column).

4.  **Given** the Design System
    **When** styling the cards
    **Then** they must use `glass-panel` classes.
    **And** display Title, Client, and Key Metrics prominently.

## Tasks / Subtasks

- [x] **Task 1: Case Study Card Component**
    - [x] Create `src/features/results/components/CaseStudyCard.tsx`.
    - [x] Props: `study: CaseStudy`, `variant: 'standard' | 'featured'`.
    - [x] Display metrics in a distinct visual way (e.g., large numbers).

- [x] **Task 2: Bento Grid Container**
    - [x] Create `src/features/results/components/ResultsGrid.tsx`.
    - [x] Use CSS Grid (Tailwind `grid-cols-1 md:grid-cols-3` etc.).
    - [x] Implement logic to assign "featured" size to the first item.

- [x] **Task 3: Integration with Content**
    - [x] Fetch studies using `getAllCaseStudies()` (from Story 3.1).
    - [x] Pass data to the Grid.

- [x] **Task 4: Results Page**
    - [x] Update `src/pages/ResultsPage.tsx` (or `ResultsGrid` route) to render the full feature.

## Dev Notes

### Architecture Patterns
- **Smart Components:** The Grid component will handle the layout logic (which items span rows).
- **Dumb Components:** The Card component just renders data based on props.

### References
- [Epic 3: Verification & Results System](_bmad-output/planning-artifacts/epics.md#epic-3-verification--results-system)
