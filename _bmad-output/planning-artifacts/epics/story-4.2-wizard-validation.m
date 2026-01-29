#Story 4.2 : Real - time Zod Validation

**Epic:** [Epic 4: Premium Apply Wizard](../epic-4-wizard.md)
**Status:** Ready for Dev
**Assigned To:** Developer Agent

## 1. User Story
**As a** User,
**I want** instant feedback if I enter an invalid email or budget,
**So that** I don't get frustrated by submitting and getting errors later.

## 2. Acceptance Criteria (AC)
- [ ] **Schema:** Zod schema defined for all wizard fields (URL, Monthly Budget, Name, Email).
- [ ] **Feedback:** Red border and text message appear immediately upon `blur` if invalid.
- [ ] **Success:** Green border/icon appears when a field is valid.
- [ ] **Prevention:** "Next" button is disabled until the current step is valid.

## 3. Technical Context
* **Library:** `zod` and `react-hook-form` (standard BMad stack).
* **Logic:** Validation must happen on the client side.

## 4. Implementation Plan
1.  Install `zod` (if missing).
2.  Define `src/lib/schemas.ts`.
3.  Integrate `react-hook-form` into the Wizard steps.
4.  Connect Zod resolver to the form state.