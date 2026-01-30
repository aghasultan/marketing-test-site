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

- [ ] Component Implementation
    - [ ] Create `src/features/results/components/ResultModal.tsx`.
    - [ ] Use `@radix-ui/react-dialog` for accessibility + Framer Motion for animations.
- [ ] Integration
    - [ ] Add state `selectedId` to `ResultsGrid`.
    - [ ] Pass `onSelect` to `CaseStudyCard`.
    - [ ] Render `ResultModal` when `selectedId` is present.
- [ ] Verification
    - [ ] Test: Click Card -> Check Modal Visible.
    - [ ] Test: Close Modal -> Check Modal Hidden & Filters Preserved.

## Dev Notes

- **Radix UI:** We have `@radix-ui/react-dialog` installed. Use it for the modal primitives (Overlay, Content, Portal).
- **Styling:** Match "Glassmorphism" — Backdrop should be `backdrop-blur-sm bg-black/60`. Content `bg-zinc-900 border border-white/10`.
- **Content:** Display `summary` plus potentially generic "How we did it" text if not in data model (AC mentions it). We might need to add a `details` field to `CaseStudy` or just use `summary` for MVP. *Self-correction:* AC says "full summary and 'How we did it' text". We should probably add a rich text field or keep it simple for now. I'll stick to displaying the `summary` prominently.

## References
- Epic 2: [epics.md](../planning-artifacts/epics.md)
