# Story 3.4: Verified Badge Logic

Status: in-progress

## Story

As a User,
I want to easily distinguish verified case studies from unverified ones,
so that I know which results are guaranteed by the agency.

## Acceptance Criteria

1.  **Given** the CaseStudyCard
    **When** checking `study.claimReview.verdict`
    **Then** if 'Verified', show the **Emerald/Gold Badge** with Shield Icon.
    **And** if 'Trusted', show a **Blue Badge** (Verified Source but not direct Riffat Labs audit).
    **And** if 'Pending' or missing, show **No Badge** (or a generic 'Submitted' state).

2.  **Given** the Verified Badge
    **When** displayed
    **Then** it should have a subtle pulse animation to attract attention (as per AC).

3.  **Given** unverified content
    **When** loading
    **Then** ensure no errors occur (graceful fallback).

## Tasks / Subtasks

- [x] **Task 1: Badge Component Refactor**
    - [x] Extract the current inline badge in `CaseStudyCard.tsx` to a dedicated `VerifiedBadge.tsx`.
    - [x] Implement variants: `verified` (default/emerald), `trusted` (blue).

- [x] **Task 2: Visual Polish (Pulse)**
    - [x] Add a visual "Pulse" effect to the "Verified" variant using Tailwind `animate-pulse` or Framer Motion.
    - [x] Ensure the tooltip still works with the new component.

- [x] **Task 3: Integration**
    - [x] Replace the inline code in `CaseStudyCard` with `<VerifiedBadge />`.
    - [x] Test with a mock case study that is 'Trusted' or 'Pending'.

## Dev Notes

### Architecture Patterns
- **Visual Hierarchy:** Verified items should pop. "Trusted" items are secondary.

### References
- [Epic 3: Verification & Results System](_bmad-output/planning-artifacts/epics.md#epic-3-verification--results-system)
