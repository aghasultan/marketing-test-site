# Story 4.4: Local Persistence Layer

Status: in-progress

## Story

As a User,
I want my progress saved if I accidentally refresh,
so that I don't have to re-type 10 fields of data.

## Acceptance Criteria

1.  **Given** I have filled out fields and progressed to Step N
    **When** I refresh the browser
    **Then** the Wizard should initialize at Step N.
    **And** `WizardState` (data + history) should be restored.

2.  **Given** I complete the wizard or explicitly reset
    **When** the action completes
    **Then** the local storage should be cleared.

3.  **Given** Validation
    **When** loading potentially stale data
    **Then** ensure structure is valid (basic safety check).

## Tasks / Subtasks

- [ ] **Task 1: Create Persistence Hook/Utility**
    - [ ] Create `src/features/wizard/logic/persistence.ts`.
    - [ ] Functions: `saveState(state)`, `loadState()`, `clearState()`.
    - [ ] Key: `riffat-labs-wizard-state`.

- [ ] **Task 2: Integrate into Provider**
    - [ ] Update `WizardProvider` to load initial state from localStorage.
    - [ ] Update `WizardProvider` to subscribe to state changes and save (using `useEffect`).
    - [ ] Handle `RESET` action to call `clearState`.

- [ ] **Task 3: Verification**
    - [ ] Manual verification (since unit tests in Node environment might be tricky without mocks, or use JSDOM).

## Dev Notes

### Architecture Patterns
- **Sync vs Async:** LocalStorage is synchronous, so we can lazily initialize the `useReducer` state.
- **Privacy:** Avoid storing sensitive PII in localStorage if possible, but for a session wizard it is usually acceptable until submission. We will assume standard session persistence.

### References
- [Epic 4: Smart Qualification Wizard](_bmad-output/planning-artifacts/epics.md#epic-4-smart-qualification-wizard)
