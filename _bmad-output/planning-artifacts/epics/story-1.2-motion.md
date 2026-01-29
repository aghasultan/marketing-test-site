# Story 1.2: Lenis Scroll & Framer Motion Setup

**Epic:** [Epic 1: Core Infrastructure & Global Styles](../epic-1-infra.md)
**Status:** Ready for Dev
**Assigned To:** Developer Agent

## 1. User Story
**As a** User,
**I want** the site to have momentum-based scrolling and elements that gently reveal themselves,
**So that** the experience feels "buttery smooth" and premium, reducing bounce rates.

## 2. Acceptance Criteria (AC)
- [ ] **Smooth Scroll:** `lenis` (or `@studio-freight/lenis`) is installed and wrapped around the root application.
- [ ] **Animation Library:** `framer-motion` is installed.
- [ ] **Reveal Component:** A reusable `<ScrollReveal>` component is created that fades elements in and slides them up (`y: 20` -> `y: 0`) as they enter the viewport.
- [ ] **Performance:** Animations use hardware-accelerated properties (transform/opacity) to avoid layout thrashing.
- [ ] **Reduced Motion:** Animations respect the user's `prefers-reduced-motion` setting.

## 3. Technical Context
* **Lenis:** Initialize in `src/main.tsx` or a root layout wrapper. Ensure it doesn't conflict with React 18 strict mode.
* **Framer Motion:** Use the `useInView` hook for the scroll reveal trigger.
* **Ref:** See [ADR-001] in Architecture for Glassmorphism/Animation constraints.

## 4. Implementation Plan
1.  `npm install lenis framer-motion`.
2.  Create `src/components/ui/SmoothScroll.tsx` (Context provider or wrapper).
3.  Create `src/components/ui/ScrollReveal.tsx`.
4.  Wrap the app in `SmoothScroll`.