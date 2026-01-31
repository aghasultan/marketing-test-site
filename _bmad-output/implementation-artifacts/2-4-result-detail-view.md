# Story 2.4: Result Detail View

Status: done

## Story

As a Skeptical Buyer,
I want to click a card to read the full story,
So that I can understand *how* the result was achieved.

## Acceptance Criteria

1.  **Modal Interaction:**
    *   **Given** I click a Case Study card
    *   **Then** a Modal opens containing the full summary and "How we did it" text.
    *   **And** the background page is dimmed/blurred.
2.  **Context Preservation:**
    *   **Given** I am done reading
    *   **When** I click "Close" or outside the modal
    *   **Then** I return to the filtered grid exactly where I left off (context preserved).

## Tasks / Subtasks

- [x] Component Implementation
    - [x] Create `src/features/results/components/ResultModal.tsx`.
    - [x] Use `@radix-ui/react-dialog` for accessibility + Framer Motion for animations.
- [x] Integration
    - [x] Add state `selectedId` to `ResultsGrid`.
    - [x] Pass `onSelect` to `CaseStudyCard`.
    - [x] Render `ResultModal` when `selectedId` is present.
- [x] Verification
    - [x] Test: Click Card -> Check Modal Visible.
    - [x] Test: Close Modal -> Check Modal Hidden & Filters Preserved.

## Dev Notes

- **Radix UI:** We have `@radix-ui/react-dialog` installed. Use it for the modal primitives (Overlay, Content, Portal).
- **Styling:** Match "Glassmorphism" — Backdrop should be `backdrop-blur-sm bg-black/60`. Content `bg-surface-elevated border border-white/10`.
- **Content:** AC requires "How we did it" text. Currently, we display the `summary` under the "The Challenge & Solution" header. In the future, we should add a dedicated `details` field to the `CaseStudy` type for richer content.

## References
- Epic 2: [epics.md](../planning-artifacts/epics.md)

## Dev Agent Record

### File List
- `src/features/results/components/ResultModal.tsx`
- `src/features/results/components/ResultsGrid.tsx`
- `src/features/results/components/CaseStudyCard.tsx`
- `tests/results.spec.ts`
- `src/features/results/types.ts`
