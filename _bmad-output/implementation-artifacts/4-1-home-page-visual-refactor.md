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
- [ ] `Home.tsx` contains NO custom CSS class references (unless defined in base Tailwind layer).
- [ ] Hero section matches the "Premium Technical" aesthetic.
- [ ] ROI Calculator inputs look identical to the Apply Form inputs.
- [ ] Page passes accessibility check (contrast, interactive elements).

## Technical Implementation
- Edit `src/pages/Home.tsx`.
- Potentially clean up `src/index.css` if custom classes are no longer used.
