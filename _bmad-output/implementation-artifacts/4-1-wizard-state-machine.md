# Story 4.1: Wizard State Machine

Status: in-progress

## Story

As a Developer,
I want a centralized state machine to manage the wizard's logic,
so that I can handle complex validation, navigation, and branching without "prop drilling" chaos.

## Acceptance Criteria

1.  **Given** the "Smart Qualification Wizard"
    **When** it initializes
    **Then** it should start at the "Intro" or "Step 1" state.

2.  **Given** the user interaction
    **When** triggering an action (NEXT, BACK, UPDATE_DATA)
    **Then** the State Machine should handle the transition logic.
    **And** only allow "NEXT" if validation passes.

3.  **Given** the definition
    **When** implementing
    **Then** use a robust pattern (like `useReducer` or `xstate` - for simplicity and zero-dep, `useReducer` + Context is preferred here unless complexity is huge).
    **And** Type-safe "Step" definitions.

## Tasks / Subtasks

- [x] **Task 1: Define Types & Context**
    - [x] Create `src/features/wizard/context/WizardContext.tsx`.
    - [x] Define types: `WizardStep` (enum/union), `WizardData` (interface), `WizardAction`.

- [x] **Task 2: Implement Reducer Logic**
    - [x] Implement `wizardReducer` handling `NEXT_STEP`, `PREV_STEP`, `SET_DATA`.
    - [x] Define the Step Order (array of steps).

- [x] **Task 3: Create Wizard Container**
    - [x] Create `src/features/wizard/components/WizardContainer.tsx`.
    - [x] Wrap with Provider.

- [x] **Task 4: Verification**
    - [x] Create a unit test `src/features/wizard/wizard.test.ts` testing the reducer transitions.

## Dev Notes

### Architecture Patterns
- **Context API + useReducer:** Standard React pattern for complex form state.
- **Separation of Concerns:** The reducer handles *logic* (can we go next?), the components handle *UI*.

### Config
Steps might include: `WELCOME`, `WEBSITE_CHECK` (from Epic 2?), `REVENUE_RANGE`, `GOALS`, `CONTACT`, `COMPLETED`.

### References
- [Epic 4: Smart Qualification Wizard](_bmad-output/planning-artifacts/epics.md#epic-4-smart-qualification-wizard)
