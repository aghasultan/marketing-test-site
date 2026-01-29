# Story 3.2: Bento Grid UI & Filtering

**Epic:** [Epic 3: Dynamic Case Study Engine](../epic-3-case-studies.md)
**Status:** Ready for Dev
**Assigned To:** Developer Agent

## 1. User Story
**As a** Scale-Up Founder,
**I want** to filter case studies by my industry (e.g., E-com),
**So that** I see relevant proof immediately without clicking through pages.

## 2. Acceptance Criteria (AC)
- [ ] **Layout:** A responsive "Bento Grid" (masonry or variable span) layout.
- [ ] **Card Design:** Glassmorphic cards that reveal details/metrics on hover.
- [ ] **Filtering:** Tabs for "All", "SaaS", "E-commerce", "Lead Gen".
- [ ] **Interaction:** Filtering is instant (client-side state) with `framer-motion` layout animations (reordering).
- [ ] **Empty State:** Visual feedback if no items match a filter.

## 3. Technical Context
* **Styles:** Tailwind Grid (`grid-cols-1 md:grid-cols-3`). Use `col-span-2` for featured items.
* **Motion:** `AnimatePresence` from Framer Motion for filter transitions.

## 4. Implementation Plan
1.  Create `src/components/features/case-study/CaseGrid.tsx`.
2.  Create `src/components/features/case-study/CaseCard.tsx`.
3.  Implement `useState` for the active filter.
4.  Wire up data from the content loader (Story 3.1).