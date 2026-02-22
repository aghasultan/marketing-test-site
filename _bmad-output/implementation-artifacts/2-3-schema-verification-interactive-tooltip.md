# Story 2.3: Schema Verification Interactive Tooltip

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a Quantified Skeptic,
I want to inspect the underlying verification data behind a "Verified" claim,
So that I can trust the structural authenticity of the reported success metrics.

## Acceptance Criteria

1. **Given** the user sees a "Verified" badge on a case study
   **When** they hover over or tab to focus on the badge
   **Then** an accessible `<Tooltip />` must appear
2. **And** it must display the raw, technical `ClaimReview` schema details (dates, author, verification source) formatted in a monospace font to emphasize technical precision.

## Tasks / Subtasks

- [x] Task 1: Initialize Tooltip Architecture
  - [x] If not using Radix UI or similar headless UI, build an accessible `Tooltip` wrapper or use `framer-motion` to handle hover/focus states to show a portal/absolute element.
- [x] Task 2: Build `SchemaTooltipContent` Component
  - [x] Accept `ClaimReviewSchema` object as a prop.
  - [x] Render the JSON-like or strict data keys (`Date Published`, `Audit Source`, `Claim`) in a highly technical, monospace (`font-mono`) layout.
- [x] Task 3: Integrate with `VerifiedBadge`
  - [x] Update `VerifiedBadge` to accept the `claimReview` object as a prop (passed down from `CaseStudyCard`).
  - [x] Wrap the badge trigger in the new Tooltip component.
  - [x] Ensure tooltip does not clip outside bounded containers (use Radix primitives or standard CSS offsets).

## Dev Notes
- The "Deep Glass" aesthetic requires the tooltip to feel premium: use `bg-zinc-950/90`, `backdrop-blur-2xl`, with thin `border-emerald-500/30` walls.
- Monospace styling for the data points reinforces the "developer-grade" trust theme we want for RR Labs.

### File List
- src/features/case-studies/components/VerifiedBadge.tsx
- src/features/case-studies/components/CaseStudyCard.tsx
