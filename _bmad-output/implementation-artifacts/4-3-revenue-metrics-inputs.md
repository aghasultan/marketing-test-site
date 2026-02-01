# Story 4.3: Revenue & Metrics Inputs

Status: in-progress

## Story

As a User,
I want easy-to-use inputs for my financial data,
so that I can enter accurate numbers without formatting frustration.

## Acceptance Criteria

1.  **Given** the "Revenue" step
    **When** I type into the Revenue field
    **Then** it should auto-format as currency (e.g., "$1,000,000").
    **And** it should allow shorthand typing (e.g., "1m" -> 1,000,000, "50k" -> 50,000).

2.  **Given** the typed revenue
    **When** clicking "Next"
    **Then** the System should use this exact number to determine the branching logic (from Story 4.2).

3.  **Given** the Input UI
    **When** rendering
    **Then** it should be large, clear, and focused (auto-focus on mount).

## Tasks / Subtasks

- [ ] **Task 1: Update Data Model**
    - [ ] Update `WizardData` in `WizardContext.tsx` to include `revenue: number`.
    - [ ] Update `routing.ts` to use `revenue` number for comparison (e.g. `< 50000`).

- [ ] **Task 2: Build CurrencyInput Component**
    - [ ] Create `src/components/ui/currency-input.tsx`.
    - [ ] Implement `formatValue` (adds commas, $) and `parseValue` (handles k/m suffixes).
    - [ ] Handle `onChange` to return raw number to parent.

- [ ] **Task 3: Create RevenueStep Component**
    - [ ] Create `src/features/wizard/steps/RevenueStep.tsx`.
    - [ ] Use `CurrencyInput`.
    - [ ] CTA: "Next".

- [ ] **Task 4: Wizard Integration**
    - [ ] Create `src/features/wizard/components/WizardStepRenderer.tsx` to switch components based on `currentStep`.
    - [ ] Update `WizardContainer` to use the Renderer.

## Dev Notes

### Architecture Patterns
- **Controlled Components:** The input should be fully controlled.
- **Derived State:** The routing logic now derives "Low/High" status from the raw number, which is more robust than string matching ranges.

### References
- [Epic 4: Smart Qualification Wizard](_bmad-output/planning-artifacts/epics.md#epic-4-smart-qualification-wizard)
