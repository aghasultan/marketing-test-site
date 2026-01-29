# Story 2.2: Hero Input & Animation

**Epic:** [Epic 2: AI Ad Audit Tool](../epic-2-audit-tool.md)
**Status:** Ready for Dev
**Assigned To:** Developer Agent

## 1. User Story
**As a** User,
**I want** to paste my URL and see a high-tech "Scanning" animation,
**So that** I feel like a sophisticated analysis is taking place.

## 2. Acceptance Criteria (AC)
- [ ] **Input UI:** Glassmorphic input field floating in the Hero section.
- [ ] **Interaction:** Clicking "Scan" triggers the `audit-service`.
- [ ] **Loading State:** During the 3s await, the UI replaces the input with a "Scanning..." Lottie or CSS animation.
- [ ] **Validation:** Basic regex check to ensure input is a valid URL before submitting.

## 3. Technical Context
* **Styles:** Use Tailwind for the Glassmorphism (backdrop-blur).
* **State:** Local React state (`idle` | `scanning` | `complete`).
* **Motion:** Use `framer-motion` for the transition between Input and Loading state.

## 4. Implementation Plan
1.  Create `src/components/features/audit/AuditHero.tsx`.
2.  Implement state machine logic.
3.  Add CSS/Motion pulse effect for "Scanning".