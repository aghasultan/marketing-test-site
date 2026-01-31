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
- [x] specific fields must be validated before calling `nextStep()`.
- [x] Visual error feedback must be shown if validation fails.

### Branching
- [x] Add `industry` field to `ApplyFormSchema`.
- [x] If `industry` is "Other", show `customIndustry` text input.
- [x] `customIndustry` should be required only if `industry` is "Other`.

### Data Fields
- [x] `firstName`, `email`, `website` (Step 1)
- [x] `companyName`, `industry`, `revenueRange`, `goals` (Step 2)

## Acceptance Criteria
- [x] User cannot click "Next" on Step 1 if Email is invalid.
- [x] Selecting "Other" in Industry reveals a text input.
- [x] Back button preserves form state.
- [x] Submitting the form logs valid JSON data including conditional fields.

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

## Dev Agent Record

### Implementation Notes (2026-01-31)
- Implemented `serviceType` selection in Step 2 and created conditional Step 3 ("Service Details").
- Updated `ApplyFormSchema` in `types.ts` to include all required fields and stricter validation checks.
- Refactored `Apply.tsx` to support 4 steps and dynamic rendering of fields based on `serviceType`.
- Updated `ReviewStep.tsx` to display the new conditional fields.
- Fixed `StepIndicator.tsx` to correctly display the current step (1-based index).
- Updated `wizard.spec.ts` to test the full flow including the new branching logic and validation.
- Fixed TypeScript errors in existing tests caused by schema changes (renamed `name` to `firstName`).

## File List
- src/features/apply/types.ts
- src/features/apply/stores/wizardStore.ts
- src/features/apply/components/StepIndicator.tsx
- src/features/apply/components/ReviewStep.tsx
- src/pages/Apply.tsx
- tests/wizard.spec.ts
- src/features/apply/hooks/useApplyForm.test.tsx
- src/features/apply/stores/wizardStore.test.ts
- src/features/apply/hooks/useApplyForm.ts

### Code Review Fixes (2026-01-31)
- Added  enum and  constant to  to replace hardcoded strings/magic numbers.
- Refactored  and  to use these constants.
- Updated  to include tests for:
    - Back button state preservation (Critical finding fixed).
    - Data & Analytics branch flow (Medium finding fixed).
- Verified all tests pass.

### Code Review Fixes (2026-01-31)
- Added `SERVICE_TYPES` enum and `TOTAL_STEPS` constant to `types.ts` to replace hardcoded strings/magic numbers.
- Refactored `Apply.tsx` and `ReviewStep.tsx` to use these constants.
- Updated `wizard.spec.ts` to include tests for:
    - Back button state preservation (Critical finding fixed).
    - Data & Analytics branch flow (Medium finding fixed).
- Verified all tests pass.
