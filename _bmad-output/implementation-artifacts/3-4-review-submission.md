# Story 3.4: Review & Submission

## Context
The Apply Wizard collects user data across multiple steps. The final step must allow users to review their information before submitting. We also need to handle the submission process gracefully, showing loading states and a final success message.

## Requirements

### 1. Review Step UI
- Display a summary of all entered information (read-only view).
- Group validation fields logic (Contact Info, Business Details) clearly.
- Provide "Edit" buttons for each section that navigate back to the respective step.
- Ensure the layout matches the glassmorphic design system.

### 2. Submission Logic
- The "Submit Application" button on the final step should trigger the actual submission.
- Maintain the `isSubmitting` loading state (disable button, show spinner/text).
- On success, transition to a "Success" view.
- On failure (mocked for now), show an error message.

### 3. Success State
- Replace the form wizard with a celebratory success message.
- "Application Received" heading.
- Brief confirmation text.
- "Back to Home" button.

## Acceptance Criteria
- [x] User can view all entered data in the Review step.
- [x] Clicking "Edit" on a section takes the user to that specific step.
- [x] User can navigate back to "Review" from an edit step (using Next/Back buttons).
- [x] Clicking "Submit" shows a loading state.
- [x] Successful submission shows the Success view.
- [x] Form data is logged to console (mock submission).

## Dev Agent Record

### Implementation Notes
- Refactored `SuccessStep.tsx` to use `react-router-dom`'s `Link` for client-side navigation to Home.
- Verified `ReviewStep.tsx` correctly displays all form fields and handles edit navigation.
- Created `tests/review-submission.spec.ts` covering:
    - Data verification in Review step.
    - Edit flow (Step 1 -> Review) and data persistence.
    - Submission flow (Loading -> Success).
    - Navigation back to Home.
- Verified regression suite `tests/wizard.spec.ts`.

## File List
- src/features/apply/components/SuccessStep.tsx
- src/features/apply/components/ReviewStep.tsx (Verified)
- tests/review-submission.spec.ts (New)
- tests/wizard.spec.ts (Ran regression)

## Status
done

## Senior Developer Review (AI)
- **Date:** 2026-01-31
- **Outcome:** Approved with fixes
- **Findings:**
    - Untracked test file `tests/review-submission.spec.ts` (Fixed)
    - Verified `SuccessStep` refactor and functionality.
- **Status:** Validated and ready for merge.
