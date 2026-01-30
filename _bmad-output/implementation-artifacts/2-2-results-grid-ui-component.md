# Story 2.2: Results Grid UI Component

Status: done

## Story

As a Visitor,
I want to scan a grid of success stories,
So that I can see the breadth of the agency's experience at a glance.

## Acceptance Criteria

1.  **Grid Layout:**
    *   **Given** I am on the Results/Work section
    *   **When** the page loads
    *   **Then** I see a responsive grid of Case Study cards.
2.  **Card Content:**
    *   **And** each card displays: Client Name, Key Metric (e.g., "+300% ROAS"), and Industry Tag.
3.  **Styling:**
    *   **And** the cards use the "Glassmorphism" style (border-white/10, backdrop-blur).

## Tasks / Subtasks

- [ ] Scaffold Components
    - [ ] Create `src/features/results/components/CaseStudyCard.tsx`
    - [ ] Create `src/features/results/components/ResultsGrid.tsx`
- [ ] Implement Styling (AC: 3)
    - [ ] Apply `backdrop-blur-md`, `bg-zinc-900/50`, `border-white/10` to cards.
    - [ ] Use `grid` layout with responsive columns (1 on mobile, 2 on tablet, 3 on desktop).
- [ ] Integration (AC: 1, 2)
    - [ ] Connect `ResultsGrid` to `src/data/results.ts`.
    - [ ] Render list of `CaseStudyCard`s.
- [ ] Verification
    - [ ] Component Test ensuring props are rendered correctly.
    - [ ] Visual verification of Glassmorphism.

## Dev Notes

- **Reuse:** Use `Section` layout from `src/components/layout/Section.tsx` (if exists) or create a container.
- **Animation:** `framer-motion` is mentioned in Architecture for entrance effects. Consider simple `initial={{ opacity: 0 }} animate={{ opacity: 1 }}` for the grid.
- **Types:** Import `CaseStudy` from `../types`.

## References
- Epic 2: [epics.md](../planning-artifacts/epics.md)
- Architecture: [architecture.md](../planning-artifacts/architecture.md)
