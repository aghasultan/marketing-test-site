# Story 7-2: Visual Polish & Animation Fixes

**Epic:** Epic 7: Visual Personalization
**Status:** ready-for-dev
**Priority:** High
**Estimation:** 3 Points

## User Story
As a site visitor,
I want the website to be readable, accessible, and visually coherent (no glitchy background animations),
So that I can trust the professionalism of Riffat Labs.

## Context
A recent review identified 16+ UI/UX issues, including a critical conflict between a legacy "Green Mesh" background and the new "Nebula" background, causing visual artifacts. Text contrast is also failing in multiple sections.

## Acceptance Criteria

### Critical Fixes
- [ ] **Fix Background Animation Conflict**: Remove `<InteractiveBg />` from `src/components/layout/Layout.tsx` to stop the double-rendering conflict with `NebulaBackground`.
- [ ] **Fix Hero Text Contrast**: Ensure "Audit your Agency" and "AI Readiness" are legible against the background (add text-shadow or subtle backdrop).
- [ ] **Fix Navigation Visibility**: Update "Riffat Labs" logo and navigation links to be visible on the light background.

### UI Polish
- [ ] **Hero Badge**: Darken text/border of "AI-DRIVEN AUDIT ENGINE" badge for accessibility.
- [ ] **Micro-copy**: Increase visibility of "Powered by Riffat Labs Intelligence".
- [ ] **Services Section**:
    - [ ] Make glass cards more distinct (borders/shadows).
    - [ ] Make step numbers ("01") visible.
    - [ ] Add transition/container for "The Results Engine" text.
    - [ ] Style the "Paid Media Profit" card to look like a feature, not a gray block.
- [ ] **Case Studies**:
    - [ ] Replace broken image placeholders with valid assets (or better placeholders).
    - [ ] Remove or fix the ghost "Proven Results" background text.
    - [ ] Improve "Health & Wellness" tag contrast.
- [ ] **ROI Calculator**:
    - [ ] Style inputs to look interactive (borders/backgrounds).
    - [ ] Change "Book Strategy Call" button to Primary Color (Emerald/Blue).
- [ ] **About Section**:
    - [ ] Replace "About Image Placeholder" with a gradient or valid placeholder.
    - [ ] Improve bio paragraph contrast.

## Technical Implementation
- **Layout**: Modify `Layout.tsx` to remove `InteractiveBg`.
- **Theme**: Update `tailwind.config.ts` if needed for new utility colors, or use existing `emerald-600`/`zinc-900`.
- **Components**:
    - `Hero.tsx`: Update `h1` and `p` classes.
    - `CaseStudyGrid.tsx`: Fix image paths.
    - `MediaBuyingCalculator.tsx`: Update Button variant.
