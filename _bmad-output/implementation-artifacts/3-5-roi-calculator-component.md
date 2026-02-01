# Story 3.5: ROI Calculator Component

Status: in-progress

## Story

As a Lead,
I want to project my potential returns based on the case study metrics,
so that I can rationalize the investment to my stakeholders.

## Acceptance Criteria

1.  **Given** a Case Study Card with a high ROAS (e.g. > 3x)
    **When** I click a "Calculate ROI" button (or toggle)
    **Then** the card should reveal an interactive Calculator (Flip or Expand animation).

2.  **Given** the Calculator
    **When** I adjust the "Monthly Spend" slider ($1k - $50k)
    **Then** the "Potential Revenue" should calculate automatically: `Spend * CaseStudy.ROAS`.

3.  **Given** the result
    **When** it updates
    **Then** display a "Book Strategy" button to capture the interest immediately.

## Tasks / Subtasks

- [x] **Task 1: Install Slider**
    - [x] Install Shadcn UI `Slider` component.

- [x] **Task 2: Build Calculator Component**
    - [x] Create `src/features/results/components/ROICalculator.tsx`.
    - [x] State: `spend` (default $5000).
    - [x] Props: `roas` (number).
    - [x] UI: Simple slider and big "Potential Return" number.

- [x] **Task 3: Integrate into Card**
    - [x] Add "Calculate" button to `CaseStudyCard.tsx`.
    - [x] Use Framer Motion to flip or crossfade the card content to show the calculator.
    - [x] Add "Back" button to return to metrics view.

- [x] **Task 4: Verification**
    - [x] Verify calculation logic.
    - [x] Verify animations (smooth flip/transition).

## Dev Notes

### Architecture Patterns
- **Micro-Interaction:** The card flip/reveal keeps the user in the "flow" of browsing without navigating away.
- **Data parsing:** Extract numeric ROAS from the string format (e.g. "4.5x" -> 4.5).

### References
- [Epic 3: Verification & Results System](_bmad-output/planning-artifacts/epics.md#epic-3-verification--results-system)
