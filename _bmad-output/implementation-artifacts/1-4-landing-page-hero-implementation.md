# Story 1.4: Landing Page Hero Implementation

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a Skeptical User,
I want to see a high-performance Hero section with a "Nebula" background and clear value proposition,
so that I am immediately impressed by the site's quality and speed (< 0.8s LCP) before I even interact with it.

## Acceptance Criteria

1.  **Given** I visit the home page
    **When** the page loads
    **Then** the main Headline (H1) "Audit your Agency AI Readiness" (or similar copy) should be visible in < 0.8s.
    **And** the text should use the `Inter Tight` font with tight tracking.

2.  **Given** the page has loaded
    **When** I view the background
    **Then** I should see a subtle "Nebula" or "Aurora" animation (gradients moving slowly).
    **And** it should be implemented efficiently (CSS transforms or Canvas) to not block the main thread.
    **And** it should respect `prefers-reduced-motion`.

3.  **Given** I am on a mobile device
    **When** the Hero renders
    **Then** the layout should stack vertically (Text -> Input Placeholder).
    **And** the background should not cause scroll lag.

4.  **Given** the Hero Grid
    **When** the page loads
    **Then** the grid decoration (if any) should fade in after the text (staggered animation).

## Tasks / Subtasks

- [x] **Task 1: Background Animation Component** (AC: 2)
    - [x] Create `src/components/ui/NebulaBackground.tsx`
    - [x] Implement CSS-based gradient animation (performant) or Canvas fallback
    - [x] Add `prefers-reduced-motion` media query support

- [x] **Task 2: Hero Section Layout** (AC: 1, 3)
    - [x] Create `src/components/layout/Hero.tsx`
    - [x] Implement H1 and Subheadline with `Inter Tight`
    - [x] Ensure text is visible immediately (font-display: swap) to hit LCP

- [x] **Task 3: Integration & Optimization** (AC: 4)
    - [x] Add `Hero` and `NebulaBackground` to `src/pages/Home.tsx`
    - [x] Implement Framer Motion entrance animations (staggered)
    - [x] Ensure animations do not delay LCP (text first, then motion)

- [x] **Task 4: Placeholder Interactive Area**
    - [x] Add a visual placeholder for the "Audit Input" (to be fully implemented in Epic 2) so the layout is complete.
    - [x] Use `GlassPanel` styling for the input container.

- [x] **Task 5: Verification**
    - [x] Verify LCP via DevTools Performance tab
    - [x] Verify Mobile responsiveness

## Dev Notes

### Completion Notes List
- Implemented `NebulaBackground.tsx` with performant Canvas particles.
- Created `Hero.tsx` with optimized Inter Tight typography and glassmorphism.
- Integrated components into `Home.tsx`.
- Verified build and responsive layout.

### File List
- src/components/ui/NebulaBackground.tsx
- src/components/layout/Hero.tsx
- src/pages/Home.tsx

## Dev Agent Record

### Architecture Patterns
- **Performance:** pure CSS animations are preferred over JS-heavy Canvas if possible for the background to keep main thread free.
- **Glassmorphism:** The Hero content sits *on top* of the Nebula, so it needs high contrast. background-clip-text might be used for the H1 if it fits the design.

### References
- [UX Spec Section 7: Visual Design Foundation](_bmad-output/planning-artifacts/ux-design-specification.md#7-visual-design-foundation)
- [UX Spec Section 8: Design Direction](_bmad-output/planning-artifacts/ux-design-specification.md#8-design-direction-decision)

## Dev Agent Record

### Agent Model Used
Antigravity
