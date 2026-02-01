# Story 4.2: Conditional Branching Logic

Status: in-progress

## Story

As a Business Owner,
I want to filter out leads that are too small for our services,
so that my sales team focuses only on high-value prospects.

## Acceptance Criteria

1.  **Given** the "Revenue" step
    **When** the user selects a range below the threshold (e.g., "< $10k/mo" or "< $50k/mo")
    **Then** the "Next" action should route them to the "Partner Network" (Downsell) step.
    **And** skip the "Goals" and "Contact" steps if appropriate (or maybe still ask contact info but route differently?).
    *refinement: The prompt says "immediately branch to Partner Network outcome". Let's assume early exit.*

2.  **Given** the "Revenue" step
    **When** the user selects a high-value range
    **Then** they proceed to the standard "Goals" step.

3.  **Given** the State Machine
    **When** calculating transitions
    **Then** it must rely on a deterministic `getNextStep(current, data)` function.

## Tasks / Subtasks

- [x] **Task 1: Update Step Definitions**
    - [x] Update `WizardStep` type to include `PARTNER_REFERRAL` (or similar).
    - [x] Update `WizardData` to ensure revenue ranges are typed closely if possible, or string constants.

- [x] **Task 2: Implement Routing Logic**
    - [x] Create `src/features/wizard/logic/routing.ts`.
    - [x] Implement `getNextStep(currentStep, data): WizardStep`.
    - [x] Rules:
        - `WELCOME` -> `REVENUE`
        - `REVENUE`:
            - If `< $50k` -> `PARTNER_REFERRAL` (Early Exit)
            - Else -> `GOALS`
        - `PARTNER_REFERRAL` -> `COMPLETED` (or explicit end).
        - `GOALS` -> `CONTACT` -> `COMPLETED`.

- [x] **Task 3: Integrate into Reducer**
    - [x] Update `wizardReducer` to call `getNextStep` instead of simple array index increment.
    - [x] Handle `PREV_STEP` logic (needs to know history or reverse logic? Use History Stack pattern?).

- [x] **Task 4: Verification**
    - [x] Unit test the routing logic for both High and Low revenue scenarios.

## Dev Notes

### Architecture Patterns
- **History Stack:** Simple increments work for linear flows. For branching, we must push visited steps to an array `history: WizardStep[]` so `PREV_STEP` just pops the last one. This handles dynamic paths elegantly.

### References
- [Epic 4: Smart Qualification Wizard](_bmad-output/planning-artifacts/epics.md#epic-4-smart-qualification-wizard)
