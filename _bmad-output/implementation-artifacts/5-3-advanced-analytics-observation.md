---
story_id: "5-3-advanced-analytics-observation"
epic_id: "epic-5"
title: "Advanced Analytics & Observation"
description: "Implement granular event tracking for high-value user interactions including Wizard usage, Calculator engagement, and Audit triggers."
status: "in-progress"
assigned_to: "dev-agent"
---

## Tasks

- [ ] **Infrastructure**: Refactor `trackEvent` in `src/lib/tracking.ts` to support typed events and console debugging in dev mode.
- [ ] **Wizard Tracking**:
    - [ ] Track `wizard_start` when opening.
    - [ ] Track `wizard_step_view` with `step_name`.
    - [ ] Track `wizard_complete` with `outcome` (partner vs qualified).
- [ ] **Calculator Tracking**:
    - [ ] Track `calculator_interaction` (debounced) with `metric_changed`.
- [ ] **Audit Tracking**:
    - [ ] Track `audit_scan_start` with `url_domain` (anonymized if needed).
- [ ] **Performance**: Ensure tracking is non-blocking (already using `dataLayer` which is good, but verify async).

## Technical Notes
- Use `window.dataLayer` for GTM compatibility.
- Ensure strict typing for event names to avoid analytics pollution.
