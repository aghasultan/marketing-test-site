# Story 3.2: Conditional Branching & Validation

**Parent Epic:** Epic 3 (Apply Wizard)
**Status:** Done
**Priority:** High

## Context
The Apply Wizard currently allows free navigation between steps without validation. We need to enforce data integrity and support dynamic form flows based on user input.

## Goals
1.  **Strict Validation:** Users cannot proceed to the next step until the current step is valid.
2.  **Branching Logic:** Display different fields based on previous answers (e.g., "Other" industry leads to custom input).
3.  **Schema Expansion:** Flesh out the business details section.

## Requirements

### Validation
- [ ] specific fields must be validated before calling `nextStep()`.
- [ ] Visual error feedback must be shown if validation fails.

### Branching
- [ ] Add `industry` field to `ApplyFormSchema`.
- [ ] If `industry` is "Other", show `customIndustry` text input.
- [ ] `customIndustry` should be required only if `industry` is "Other`.

### Data Fields
- [ ] `firstName`, `email`, `website` (Step 1)
- [ ] `companyName`, `industry`, `revenueRange`, `goals` (Step 2)

## Acceptance Criteria
- [ ] User cannot click "Next" on Step 1 if Email is invalid.
- [ ] Selecting "Other" in Industry reveals a text input.
- [ ] Back button preserves form state.
- [ ] Submitting the form logs valid JSON data including conditional fields.

**Given** I select "Paid Advertising" as my service (Branch A)
**When** I click Next
**Then** I am taken to the "Ad Budget" question
**And** I am NOT asked about Tech Stack initially

**Given** I select "Data & Analytics" as my service (Branch B)
**When** I click Next
**Then** I am taken to the "Current Tech Stack" question
**And** I am NOT asked about Ad Budget (skipped)

**Given** I am on a branch
**When** I click "Back"
**Then** I return to the parent question (Service Type) correctlying conditional fields.
