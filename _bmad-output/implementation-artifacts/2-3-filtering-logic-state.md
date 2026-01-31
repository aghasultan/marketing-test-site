# Story 2.3: Filtering Logic & State

Status: done

## Story

As a User (Sarah),
I want to filter results by Industry or Spend,
So that I can see proof that matches my specific business context.

## Acceptance Criteria

1.  **Instant Filtering:**
    *   **Given** I view the results grid
    *   **When** I click a filter button (e.g., "E-commerce")
    *   **Then** the grid updates *instantly* to show only matching case studies.
2.  **Filter Logic:**
    *   Selecting a new filter clears the previous one (Single Select per category, or simple tag list). *Note: Epic implies single active filter or simple switching.* "The previous filter is cleared".
    *   "All" button restores full list.
3.  **Empty State:**
    *   **Given** no results match
    *   **Then** I see a friendly "No exact matches" message.

## Tasks / Subtasks

- [x] Logic Implementation
    - [x] Create `src/features/results/hooks/useResultsFilter.ts`.
    - [x] Implement state checking against `CaseStudy` fields.
- [x] UI Implementation
    - [x] Create `src/features/results/components/FilterBar.tsx`.
    - [x] Add filter buttons for Industries (dynamic from types?).
- [x] Integration
    - [x] Update `ResultsGrid` to use the hook.
    - [x] Insert `FilterBar` above the grid.
    - [x] Implement Empty State view.
- [x] Verification
    - [x] Automated Test: Click filter -> Verify count decreases -> Click All -> Verify count restores.
    - [x] Empty State Test: Verify "No exact matches" message appears for empty results.

## File List

- src/features/results/hooks/useResultsFilter.ts (New)
- src/features/results/components/FilterBar.tsx (New)
- src/features/results/components/ResultsGrid.tsx (Modified)
- tests/results.spec.ts (Modified - enabled tests)

## Dev Notes

- **Hook:** `useResultsFilter(caseStudies)` returning `{ filteredResults, activeFilter, setFilter }`.
- **Animation:** Use `AnimatePresence` from framer-motion for smooth grid re-ordering.
- **Types:** Derive filter options from `Industry` type to avoid hardcoding strings.

## References
- Epic 2: [epics.md](../planning-artifacts/epics.md)
- Architecture: [architecture.md](../planning-artifacts/architecture.md)
