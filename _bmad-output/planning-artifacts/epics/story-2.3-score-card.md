# Story 2.3: Results Score Card

**Epic:** [Epic 2: AI Ad Audit Tool](../epic-2-audit-tool.md)
**Status:** Completed
**Assigned To:** Developer Agent

## 1. User Story
**As a** User,
**I want** to see my audit results in a clear score card,
**So that** I understand the gaps in my ad strategy and feel motivated to click "Fix This".

## 2. Acceptance Criteria (AC)
- [x] **Card UI:** Displays the 3 metrics returned from the service.
- [x] **CTA:** A prominent "Fix This Now" button that routes to `/apply`.
- [x] **Visuals:** Uses the Neon accents (Cyan/Purple) to highlight low scores.
- [x] **Reveal:** The card animates in after the scanning phase completes.

## 3. Technical Context
* **Component:** `src/components/features/audit/ScoreCard.tsx`.
* **Routing:** Use `useNavigate` from `react-router-dom` for the CTA.

## 4. Implementation Plan
1.  Build the layout using the `GlassCard` utility (if available) or raw Tailwind.
2.  Map `AuditResult` data to UI elements.
3.  Implement the redirect logic.