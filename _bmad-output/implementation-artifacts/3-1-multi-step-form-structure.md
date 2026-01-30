# Story 3.1: Multi-Step Form Structure

Status: done

## Story

As a User (Founder),
I want a clear, step-by-step application form,
So that I don't feel overwhelmed by 20 questions at once.

## Acceptance Criteria

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

- [ ] Component Structure
    - [ ] Create `src/features/apply/components/WizardLayout.tsx`.
    - [ ] Create `src/features/apply/components/StepIndicator.tsx`.
    - [ ] Create `src/features/apply/types.ts` (Zod Schema).
- [ ] State Implementation
    - [ ] Setup `react-hook-form` with `zodResolver`.
    - [ ] Create `useApplyForm` hook (or Context) to manage steps.
- [ ] Verification
    - [ ] Test: Step navigation (Next/Back).
    - [ ] Test: Progress bar updates.

## Dev Notes

- **Tech:** `react-hook-form`, `zod`, `framar-motion` (for step transitions).
- **Design:** Keep it clean. Progress bar at top. "Next" button primary, "Back" secondary ghost.
- **Reference:** See `Apply.tsx` page (currently likely empty or placeholder).

## References
- Epic 3: [epics.md](../planning-artifacts/epics.md)
