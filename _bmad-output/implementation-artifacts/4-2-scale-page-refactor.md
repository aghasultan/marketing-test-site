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

## Technical Implementation
- Edit `src/pages/Scale.tsx`.
