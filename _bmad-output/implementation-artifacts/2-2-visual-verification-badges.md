# Story 2.2: Visual Verification Badges

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a User evaluating the agency,
I want to easily distinguish which case studies have been authenticated,
So that I know which marketing claims are backed by rigorous data standards.

## Acceptance Criteria

1. **Given** a case study is being rendered in the grid
   **When** the system detects valid `ClaimReview` frontmatter for that specific file (`isVerified` flag or existence of `claimReview` object)
   **Then** it must display a distinct "Verified" badge on the card
2. **And** the badge must use the designated Glassmorphism accent styling (e.g., amber/emerald glow).

## Tasks / Subtasks

- [x] Task 1: Create Verified Badge Component
  - [x] Create `VerifiedBadge.tsx` in `src/features/case-studies/components`.
  - [x] Style it with a transparent background, colored border (emerald/amber), and an icon (e.g., a shield or checkmark from `lucide-react`).
- [x] Task 2: Integrate Badge into CaseStudyCard
  - [x] Modify `CaseStudyCard.tsx` to conditionally render `<VerifiedBadge />` if `study.isVerified` is true.
  - [x] Ensure it's positioned prominently but non-intrusively (e.g., top right corner absolutely positioned, or next to the industry tag).
- [x] Task 3: Visual Polish & Feedback
  - [x] Add a subtle hover state to the badge to hint at future interactivity (Story 2.3).
  - [x] Ensure the glassmorphic styling matches the `zinc-950` deeply blurred theme.

## Dev Notes
- For the styling, use Tailwind utilities: `bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center px-2 py-1 text-xs font-medium`.

### File List
- src/features/case-studies/components/VerifiedBadge.tsx
- src/features/case-studies/components/CaseStudyCard.tsx
- src/features/case-studies/index.ts
