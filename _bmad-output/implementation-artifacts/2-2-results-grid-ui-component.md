# Story 2.2: Results Grid UI Component

Status: done

## Story

As a Visitor,
I want to scan a grid of success stories,
So that I can see the breadth of the agency's experience at a glance.

## Acceptance Criteria

**Given** I am on the Results/Work section
**When** the page loads
**Then** I see a responsive grid of Case Study cards
**And** each card displays: Client Name, Key Metric (e.g., "+300% ROAS"), and Industry Tag
**And** the cards use the "Glassmorphism" style (border-white/10, backdrop-blur)
**And** hovering a card triggers the "Glass Lift" effect:
  - Scale up to 1.02
  - Increase shadow opacity
  - Duration: 200ms ease-out



## Tasks / Subtasks

- [x] Scaffold Components
    - [x] Create `src/features/results/components/CaseStudyCard.tsx`
    - [x] Create `src/features/results/components/ResultsGrid.tsx`
- [x] Implement Styling (AC: 3)
    - [x] Apply `backdrop-blur-md`, `bg-zinc-900/50`, `border-white/10` to cards.
    - [x] Use `grid` layout with responsive columns (1 on mobile, 2 on tablet, 3 on desktop).
- [x] Integration (AC: 1, 2)
    - [x] Connect `ResultsGrid` to `src/data/results.ts`.
    - [x] Render list of `CaseStudyCard`s.
- [x] Verification
    - [x] Component Test ensuring props are rendered correctly.
    - [x] Visual verification of Glassmorphism.

## File List

- src/features/results/components/CaseStudyCard.tsx (New)
- src/features/results/components/ResultsGrid.tsx (New)
- tests/results.spec.ts (Modified - skipped future tests)

## Dev Notes

- **Reuse:** Use `Section` layout from `src/components/layout/Section.tsx` (if exists) or create a container.
- **Animation:** `framer-motion` is mentioned in Architecture for entrance effects. Consider simple `initial={{ opacity: 0 }} animate={{ opacity: 1 }}` for the grid.
- **Types:** Import `CaseStudy` from `../types`.

## Senior Developer Review (AI)

- **Date:** 2026-01-31
- **Reviewer:** Code Review Agent (Amelia)
- **Outcome:** Approved (with fixes)

### Review Notes
- **Critical Fixed:** Removed out-of-scope Acceptance Criteria for Filtering (moved to Story 2.3).
- **UX Fixed:** Removed misleading `cursor-pointer` on non-interactive cards.
- **Low:** Noted hardcoded header in grid, deferred for later refactoring.

### Action Items
- [x] Remove out-of-scope ACs
- [x] Fix cursor pointer UX
