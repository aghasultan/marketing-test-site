# Story 3.3: Schema Verification Tooltip

Status: in-progress

## Story

As a Skeptical User,
I want to inspect the source of a claim,
so that I can trust that the metrics aren't made up.

## Acceptance Criteria

1.  **Given** the "Verified" badge on a Case Study card
    **When** I hover over it (or click on Mobile)
    **Then** a Tooltip must appear.

2.  **Given** the Tooltip
    **When** it renders
    **Then** it should display the structured data behind the verification:
    - Verdict (e.g., "Verified")
    - Author (e.g., "Riffat Labs Intelligence")
    - Date of Verification (or publication date)
    - Rating (5/5)

3.  **Given** the Design System
    **When** styling the tooltip
    **Then** it should use a "Technical/Code" aesthetic (monospace font, dark background) to reinforce engineering rigour.

## Tasks / Subtasks

- [x] **Task 1: Install Tooltip Component**
    - [x] Install Shadcn UI `Tooltip` component (if not already present).

- [x] **Task 2: Create VerificationToolTip**
    - [x] Create `src/features/results/components/VerificationTooltip.tsx`.
    - [x] Props: `claim: CaseStudy['claimReview']`, `date: string`.
    - [x] Layout: Small generic table or code block style.

- [x] **Task 3: Integrate into Card**
    - [x] Update `CaseStudyCard.tsx` to wrap the "Verified" badge with the Tooltip.

- [x] **Task 4: Verification**
    - [x] Verify hover state on Desktop.
    - [x] Verify touch/tap behavior on Mobile (Shadcn Tooltip usually handles touch via click/focus).

## Dev Notes

### Architecture Patterns
- **Trust Signals:** The design should look like a "system output" rather than marketing copy. Use `font-mono`.

### References
- [Epic 3: Verification & Results System](_bmad-output/planning-artifacts/epics.md#epic-3-verification--results-system)
