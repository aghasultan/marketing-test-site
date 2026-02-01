# Story 4.5: Outcome Generation (PDF/Booking)

Status: in-progress

## Story

As a User,
I want to receive the appropriate next steps based on my qualification,
so that I can move forward with Riffat Labs (or find an alternative).

## Acceptance Criteria

1.  **Given** I am routed to `PARTNER_REFERRAL` (Low Revenue)
    **When** the step renders
    **Then** I should see a message about "Not a fit for dedicated teams yet".
    **And** a CTA to "Download Growth Roadmap PDF" (simulated download).
    **And** NO calendar link.

2.  **Given** I am routed to `COMPLETED` (Qualified)
    **When** the step renders (after Contact form)
    **Then** I should see "You Qualify!" message.
    **And** a "Book Strategy Call" button (simulating Calendly trigger or link).

## Tasks / Subtasks

- [x] **Task 1: Implement Partner Referral Step**
    - [x] Create `src/features/wizard/steps/PartnerReferralStep.tsx`.
    - [x] UI: "Good news, we have a path for you...".
    - [x] Action: Download PDF stub.

- [x] **Task 2: Implement Qualified Step**
    - [x] Create `src/features/wizard/steps/QualifiedStep.tsx`.
    - [x] UI: "Verified. Let's talk."
    - [x] Action: "Book Call" button.

- [x] **Task 3: Integrate into Renderer**
    - [x] Update `WizardStepRenderer.tsx` to handle `PARTNER_REFERRAL` and `COMPLETED` correctly.

- [x] **Task 4: Verification**
    - [x] Verify both flows end at the correct screen.

## Dev Notes

### Architecture Patterns
- **Success States:** Ensure the user feels "won" even in the referral path (positive framing).

### References
- [Epic 4: Smart Qualification Wizard](_bmad-output/planning-artifacts/epics.md#epic-4-smart-qualification-wizard)
