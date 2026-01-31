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
- [ ] Implement smooth slide/fade transitions between steps using Framer Motion.
- [ ] Enhance the Step Indicator (e.g., checkmarks for completed steps, active state pulsing).

### Feedback
- [ ] Style error messages to be high-contrast and prominent.
- [ ] Add a "Submitting..." state to the final button to prevent double-clicks.

### Accessibility
- [ ] Ensure focus moves to the top of the form on step change.
- [ ] Announce step changes to screen readers.

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
- [ ] Changing steps animates the content (slide/fade).
- [ ] Submit button shows spinner/text change when processing.
- [ ] Focus resets to the first field or step header on navigation.
- [ ] Errors are clearly visible (red border/text).
