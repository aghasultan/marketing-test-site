# Story 3.3: Step UI & Feedback

**Parent Epic:** Epic 3 (Apply Wizard)
**Status:** Done
**Priority:** Medium

## Context
The Apply Wizard currently functions logic-wise but lacks polished visual feedback. The user experience can be dry and error states might be easy to miss.

## Goals
1.  **Visual Polish:** Make the wizard feel "app-like" with smooth transitions and clear progress indicators.
2.  **Validation Feedback:** Ensure errors are instantly recognizable and accessible.
3.  **Loading States:** Show clear feedback during submission.

## Requirements

### Visuals
- [x] Implement smooth slide/fade transitions between steps using Framer Motion.
- [x] Enhance the Step Indicator (e.g., checkmarks for completed steps, active state pulsing).

### Feedback
- [x] Style error messages to be high-contrast and prominent.
- [x] Add a "Submitting..." state to the final button to prevent double-clicks.

### Accessibility
- [x] Ensure focus moves to the top of the form on step change.
- [x] Announce step changes to screen readers.

**Acceptance Criteria:**

**Given** I select an option (e.g., "E-commerce")
**When** the selection is registered
**Then** I see a subtle "Auto-saved" toast or indicator appear (bottom right or near input)
**And** the feedback is non-intrusive (doesn't block next action)

**Given** I navigate to a new step
**When** the new question slides in
**Then** the input field is automatically focused (keyboard ready)
**And** the "Next" button state updates based on validation

**Given** I execute a micro-interaction (hover/select)
**When** the action occurs
**Then** the UI responds with "Typeform-like" immediacy (no lag)

## Acceptance Criteria
- [x] Changing steps animates the content (slide/fade).
- [x] Submit button shows spinner/text change when processing.
- [x] Focus resets to the first field or step header on navigation.
- [x] Errors are clearly visible (red border/text).

## Dev Agent Record

### Implementation Notes
- Implemented `Framer Motion` variants in `WizardLayout.tsx` for smooth slide transitions.
- Enhanced `StepIndicator.tsx` with:
  - Checkmarks for completed steps.
  - Pulse animation for the active step.
  - `aria-live` region for screen reader announcements of step progress.
- Updated `Apply.tsx` with:
  - Explicit `htmlFor` and `id` associations for all inputs (Accessibility).
  - Enhanced error message styling using icons and high-contrast red text.
  - Focus management: First input of the new step is automatically focused after transition logic.
  - Submission state visual feedback.
- Created `tests/wizard-ui.spec.ts` to validate UI enhancements and accessibility.
- Verified all regression tests pass (`tests/wizard.spec.ts`).

### Debug Log
- Initial tests failed due to ambiguous selectors, which highlighted the need for better accessibility labels.
- Fixed accessibility by adding explicit labels and IDs, then updated tests to use `getByRole`.

## File List
- src/features/apply/components/StepIndicator.tsx
- src/features/apply/components/WizardLayout.tsx (Verified)
- src/pages/Apply.tsx
- tests/wizard-ui.spec.ts (New)
- tests/wizard.spec.ts (Ran regression)

## Status
done

## Senior Developer Review (AI)
- **Date:** 2026-01-31
- **Outcome:** Approved with fixes
- **Findings:**
    - Untracked test file `tests/wizard-ui.spec.ts` (Fixed)
    - Accessibility improvements for `StepIndicator` (Fixed)
- **Status:** Validated and ready for merge.
