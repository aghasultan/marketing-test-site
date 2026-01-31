# Story 4.1: Home Page Visual Refactor

## Context
The current Home page uses a mix of custom CSS/BEM classes and some inline styles. It does not fully align with the "Glassmorphism" design system established in the Apply Wizard and Results Engine. To build trust and authority, the Home page must look consistent and premium.

## Requirements

### 1. Visual Refactor (Tailwind CSS)
- Remove `hero-section`, `hero-grid`, `section-label` classes and replace with Tailwind utilities.
- Implement the "Glassmorphism" card style (bg-zinc-900/50, border-white/5, backdrop-blur) for:
    - Performance Snapshot card.
    - Service Cards.
    - Bento Grid items.
- Ensure consistent typography using `font-sans` (Inter) for body and `font-mono` (JetBrains/Geist) for metrics.

### 2. ROI Calculator Polish
- Style the inputs to match the Apply Wizard (bg-zinc-800, border-white/10, focus-ring).
- Add a smoothed animation for result updates.

### 3. Mobile Responsiveness
- Ensure `hero-grid` stacks correctly on mobile.
- Ensure padding and font sizes are legible on small screens.

## Acceptance Criteria
- [x] `Home.tsx` contains NO custom CSS class references (unless defined in base Tailwind layer).
- [x] Hero section matches the "Premium Technical" aesthetic.
- [x] ROI Calculator inputs look identical to the Apply Form inputs.
- [x] Page passes accessibility check (contrast, interactive elements).

## Tasks/Subtasks
    - [ ] Update typography to use `font-sans` and `font-mono` correctly.
    - [ ] Remove unused custom classes from `index.css`.
- [ ] **Task 2: ROI Calculator Polish**
    - [ ] Update `tests/home.spec.ts` to test ROI calculator interactions.
    - [ ] Style ROI inputs to match Apply Wizard (bg-zinc-800, border-white/10).
    - [ ] Implement smooth animation for result updates.
- [ ] **Task 3: Mobile Responsiveness**
    - [ ] Add mobile responsiveness tests to `tests/home.spec.ts`.
    - [ ] Adjust `hero-grid` and padding for mobile devices.
    - [ ] Verify font sizes on small screens.

## Dev Notes
- **Architecture:** Use Tailwind generic utilities. Avoid creating new custom classes in `index.css`.
- **Styling:** Refer to `Wizard.tsx` for input field styles to ensure consistency.
- **Animation:** Use `framer-motion` for the ROI calculator updates if possible, or standard CSS transitions.

## Dev Agent Record

### File List
- `src/pages/Home.tsx`
- `src/index.css`
- `tests/home.spec.ts`

### Status

### Code Review (AI)
- **Reviewer**: Auto-Fixer
- **Date**: 2026-01-31
- **Status**: Details
    - **Fixed**: Moved animation variants outside component for performance.
    - **Fixed**: Extracted hardcoded Hero text to constants for maintainability.
    - **Outcome**: 2 Medium issues resolved. Tests passed.
