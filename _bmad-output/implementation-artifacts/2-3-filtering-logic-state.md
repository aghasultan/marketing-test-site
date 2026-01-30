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

- [ ] Logic Implementation
    - [ ] Create `src/features/results/hooks/useResultsFilter.ts`.
    - [ ] Implement state checking against `CaseStudy` fields.
- [ ] UI Implementation
    - [ ] Create `src/features/results/components/FilterBar.tsx`.
    - [ ] Add filter buttons for Industries (dynamic from types?).
- [ ] Integration
    - [ ] Update `ResultsGrid` to use the hook.
    - [ ] Insert `FilterBar` above the grid.
    - [ ] Implement Empty State view.
- [ ] Verification
    - [ ] Automated Test: Click filter -> Verify count decreases -> Click All -> Verify count restores.

## Dev Notes

- **Hook:** `useResultsFilter(caseStudies)` returning `{ filteredResults, activeFilter, setFilter }`.
- **Animation:** Use `AnimatePresence` from framer-motion for smooth grid re-ordering.
- **Types:** Derive filter options from `Industry` type to avoid hardcoding strings.

## References
- Epic 2: [epics.md](../planning-artifacts/epics.md)
- Architecture: [architecture.md](../planning-artifacts/architecture.md)
