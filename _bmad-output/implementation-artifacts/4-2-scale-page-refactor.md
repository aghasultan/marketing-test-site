# Story 4.2: Scale (Services) Page Refactor

## Context
The Services (Scale) page requires a visual update to align with the new "Glassmorphism" design system. It needs to be clean, readable, and consistent with the Home page and Apply Wizard.

## Requirements

### 1. Visual Refactor
- Replace inline styles and custom classes with Tailwind CSS utility classes.
- Ensure typography uses Inter for body and JetBrains Mono for technical details.
- Apply consistent padding and spacing.

### 2. Navigation
- Ensure the 'Apply' call-to-action buttons correctly link to the Apply Wizard.
- Verify the 'Mobile Navigation Drawer' is accessible from this page.

## Acceptance Criteria
- [x] `Scale.tsx` uses full Tailwind CSS.
- [x] Typography is consistent with the global theme.
- [x] "Glassmorphism" effect is applied where appropriate.
- [x] Page passes accessibility checks.

## Tasks/Subtasks
- [x] **Task 1: Visual Refactor (Tailwind CSS)**
    - [x] Create/Update `tests/scale.spec.ts`.
    - [x] Refactor `Scale.tsx` to use Tailwind utilities.
    - [x] Apply "Glassmorphism" to service cards.
    - [x] Update typography to `font-sans` and `font-mono`.
- [x] **Task 2: Navigation & Mobile**
    - [x] Verify "Apply" links.
    - [x] Verify Mobile Navigation (inherited from Header, but check layout).
    - [x] Add mobile responsiveness tests.

## Dev Notes
- **Styling:** Re-use `bg-zinc-900/50`, `border-white/5` pattern from Story 4.1.
- **Components:** Ensure `SEO` component is used correctly.

## Dev Agent Record

### File List
- `src/pages/Scale.tsx`
- `tests/scale.spec.ts`

### Status

### Code Review (AI)
- **Reviewer**: Auto-Fixer
- **Date**: 2026-01-31
- **Status**: Details
    - **Fixed**: Extracted hardcoded text to `SCALE_CONTENT` constant for maintainability.
    - **Outcome**: 1 Medium issue resolved. Tests passed.
