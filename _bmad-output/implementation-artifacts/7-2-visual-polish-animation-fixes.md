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
- [x] **Fix Background Animation Conflict**: Remove `<InteractiveBg />` from `src/components/layout/Layout.tsx` to stop the double-rendering conflict with `NebulaBackground`.
- [x] **Fix Hero Text Contrast**: Ensure "Audit your Agency" and "AI Readiness" are legible against the background (add text-shadow or subtle backdrop).
- [x] **Fix Navigation Visibility**: Update "Riffat Labs" logo and navigation links to be visible on the light background.

### UI Polish
- [x] **Hero Badge**: Darken text/border of "AI-DRIVEN AUDIT ENGINE" badge for accessibility.
- [x] **Micro-copy**: Increase visibility of "Powered by Riffat Labs Intelligence".
- [x] **Services Section**:
    - [x] Make glass cards more distinct (borders/shadows).
    - [x] Make step numbers ("01") visible.
    - [x] Add transition/container for "The Results Engine" text.
    - [x] Style the "Paid Media Profit" card to look like a feature, not a gray block.
- [x] **Case Studies**:
    - [x] Replace broken image placeholders with valid assets (or better placeholders).
    - [x] Remove or fix the ghost "Proven Results" background text.
    - [x] Improve "Health & Wellness" tag contrast.
- [x] **ROI Calculator**:
    - [x] Style inputs to look interactive (borders/backgrounds).
    - [x] Change "Book Strategy Call" button to Primary Color (Emerald/Blue).
- [x] **About Section**:
    - [x] Replace "About Image Placeholder" with a gradient or valid placeholder.
    - [x] Improve bio paragraph contrast.

## Technical Implementation
- **Layout**: Modify `Layout.tsx` to remove `InteractiveBg`.
- **Theme**: Update `tailwind.config.ts` if needed for new utility colors, or use existing `emerald-600`/`zinc-900`.
- **Components**:
    - `Hero.tsx`: Update `h1` and `p` classes.
    - `CaseStudyGrid.tsx`: Fix image paths.
    - `MediaBuyingCalculator.tsx`: Update Button variant.

## Dev Agent Record
**File List**:
- `src/components/layout/Layout.tsx`
- `src/components/layout/Header.tsx`
- `src/pages/Home.tsx`
- `public/img/clients/new-logo-1.png`
- `public/img/clients/new-logo-2.png`
- `public/img/clients/new-logo-3.png`
- `public/img/clients/new-logo-4.png`
- `public/img/clients/new-logo-5.png`
