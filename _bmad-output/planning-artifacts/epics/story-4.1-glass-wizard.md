# Story 4.1: Glassmorphism Wizard Refactor

**Epic:** [Epic 4: Premium Apply Wizard](../epic-4-wizard.md)
**Status:** Ready for Dev
**Assigned To:** Developer Agent

## 1. User Story
**As a** Potential Client,
**I want** the application form to feel like a premium software experience, not a generic survey,
**So that** I trust the agency with my high-ticket budget.

## 2. Acceptance Criteria (AC)
- [ ] **Visuals:** The existing `Wizard.tsx` container uses `backdrop-blur-xl`, thin borders (`border-white/10`), and deep zinc background.
- [ ] **Progress:** A clear visual step indicator ("Step 1 of 4") is visible at all times.
- [ ] **Inputs:** Form fields use the "Modern Agency" styling (transparent bg, bottom border or floating label).
- [ ] **Responsiveness:** Fully usable on mobile devices.

## 3. Technical Context
* **Refactor:** Modify existing `src/components/features/wizard/Wizard.tsx` (or move current one there).
* **Styles:** Heavily rely on the `muted` and `accent` colors defined in Epic 1.

## 4. Implementation Plan
1.  Move existing Wizard code to `components/features/wizard`.
2.  Strip old styles.
3.  Apply new Tailwind Glass utility classes.
4.  Implement the Step Indicator component.