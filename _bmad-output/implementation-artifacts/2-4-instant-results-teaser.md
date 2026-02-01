# Story 2.4: Instant Results Teaser

Status: in-progress

## Story

As a User,
I want to see the key results of the audit immediately,
so that I am hooked by the value without needing to refresh or sign up yet.

## Acceptance Criteria

1.  **Given** the audit has completed successfully
    **When** the "Scanning" state finishes
    **Then** the `AuditScanner` component should transition to the Results View.

2.  **Given** the Results View
    **When** it renders
    **Then** it should display 3 standardized cards: Speed, Pixel, and SEO.
    **And** the cards should animate in (staggered fade/slide).

3.  **Given** a specific result (e.g., Pixel: Fail)
    **When** the card renders
    **Then** it should show a Red 'X' icon and the failure message.
    **And** if passed, a Green Check icon and success message.

4.  **Given** the user wants to try again
    **When** they click "Rescan"
    **Then** the UI should reset to the Input State.

## Tasks / Subtasks

- [x] **Task 1: Teaser Card Component**
    - [x] Create `src/features/audit/components/ResultCard.tsx`.
    - [x] Accept `AuditCheck` props (status, score, label, message).
    - [x] Style using `.glass-panel` but with conditional borders (green/red/zinc).

- [x] **Task 2: Integrate Results into Scanner**
    - [x] Update `AuditScanner.tsx` to use the new `ResultCard`s in the "Complete" state.
    - [x] Pass the `AuditResult` data to the cards.
    - [x] Add a "Overall Score" summary at the top.

- [x] **Task 3: Animations**
    - [x] Implement staggered Flip or Slide-in animation for the cards using Framer Motion.
    - [x] Ensure the transition from "Scanning" to "Results" is smooth (no layout jumping).

- [x] **Task 4: Verification**
    - [x] Audit a real site (e.g., example.com) and verify the cards match the data.
    - [x] Verify Mobile layout (stack vertically).

## Dev Notes

### Architecture Patterns
- **Visual Hierarchy:** The Overall Score is the "Headline", the cards are the "Details".
- **Color Coding:** Use `text-emerald-500` for Pass, `text-rose-500` for Fail, `text-amber-500` for Warning.

### References
- [Epic 2: The No-Click Audit Engine](_bmad-output/planning-artifacts/epics.md#epic-2-the-no-click-audit-engine)
