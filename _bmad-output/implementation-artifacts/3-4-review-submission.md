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
- [ ] User can view all entered data in the Review step.
- [ ] Clicking "Edit" on a section takes the user to that specific step.
- [ ] User can navigate back to "Review" from an edit step (using Next/Back buttons).
- [ ] Clicking "Submit" shows a loading state.
- [ ] Successful submission shows the Success view.
- [ ] Form data is logged to console (mock submission).

## Technical Implementation
- Create `src/features/apply/components/ReviewStep.tsx`.
- Update `src/pages/Apply.tsx` to include `ReviewStep` and handle `isSuccess` state.
- Ensure `useWizard` hooks `goToStep` is utilized for the Edit buttons.
