# Story 3.1: Multi-Step Form Structure

Status: done

## Story

As a User (Founder),
I want a clear, step-by-step application form,
So that I don't feel overwhelmed by 20 questions at once.

## Acceptance Criteria

*   **Local-First Persistence:**
    *   **Given** I enter data into the wizard
    *   **When** I reload the page
    *   **Then** the wizard returns to the exact same step with my data preserved
    *   **And** specific "Local-First Persistence" logic ensures zero data loss on refresh
*   **State Store Structure:**
    *   **Given** I am a developer
    *   **When** I inspect the state
    *   **Then** I see a robust Zustand store structure handling `currentStep`, `formData`, and `history`
    *   **And** `persist` middleware is correctly configured
*   **Wizard Transition Animations:**
    *   **Given** I navigate between steps
    *   **When** the transition occurs
    *   **Then** the new step slides in from the right (`x: 20`) and fades in
    *   **And** the previous step slides out to the left (`x: -20`)
    *   **And** the transition feels like a linear progression (duration ~300ms)
1.  **Wizard Layout:**
    *   **Given** I visit `/apply`
    *   **Then** I see a "Step X of Y" progress indicator.
    *   **And** only the current step's questions are visible.
2.  **Navigation:**
    *   **Given** I am on Step 1
    *   **When** I click "Next"
    *   **Then** I proceed to Step 2 (if validation passes).
    *   **When** I click "Back" (from Step 2)
    *   **Then** I return to Step 1 with my data preserved.
3.  **State Management:**
    *   Form state is managed globally (or hoisted) so data persists between steps.

## Tasks / Subtasks

- [x] Component Structure
    - [x] Create `src/features/apply/components/WizardLayout.tsx`.
    - [x] Create `src/features/apply/components/StepIndicator.tsx`.
    - [x] Create `src/features/apply/types.ts` (Zod Schema).
- [x] State Implementation
    - [x] Setup `react-hook-form` with `zodResolver`.
    - [x] Create `useApplyForm` hook (or Context) to manage steps.
- [x] Verification
    - [x] Test: Step navigation (Next/Back).
    - [x] Test: Progress bar updates.

## Dev Notes

- **Tech:** `react-hook-form`, `zod`, `framar-motion` (for step transitions).
- **Design:** Keep it clean. Progress bar at top. "Next" button primary, "Back" secondary ghost.
- **Reference:** See `Apply.tsx` page (currently likely empty or placeholder).

## References
- Epic 3: [epics.md](../planning-artifacts/epics.md)

## Dev Agent Record

### Implementation Notes (2026-01-31)
- Implemented `wizardStore` using Zustand with `persist` middleware.
- Implemented `useApplyForm` hook with auto-save subscription to prevent infinite loops.
- Updated `StepIndicator` to handle 0-based indexing correctly.
- Added robust unit tests for store, hook, and components (100% pass).
- Handling `localStorage` in tests required manual mocking due to environment setup.

## File List
- src/features/apply/types.ts
- src/features/apply/stores/wizardStore.ts
- src/features/apply/stores/wizardStore.test.ts
- src/features/apply/components/StepIndicator.tsx
- src/features/apply/components/StepIndicator.test.tsx
- src/features/apply/components/WizardLayout.tsx
- src/features/apply/components/WizardLayout.test.tsx
- src/features/apply/hooks/useApplyForm.ts
- src/features/apply/hooks/useApplyForm.test.tsx

### Code Review Fixes (2026-01-31)
- **UX**: Implemented dynamic transition direction logic in `wizardStore` and `WizardLayout`.
- **Performance**: Added debounce (500ms) to `useApplyForm` using `lodash`.
- **Docs**: Added `WizardLayout.tsx` to File List.
- **Tests**: Updated `useApplyForm.test.tsx` to use `fakeTimers` for debounce verification.
