# Story 2.4: Contextual Calculator Navigation

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a high-intent User impressed by a case study,
I want to jump directly to an ROI calculator from the success story,
So that I can immediately model how those results could apply to my own revenue.

## Acceptance Criteria

1. **Given** the user is viewing a specific case study card within the grid
   **When** they click the "Calculate ROI" Call-to-Action (or the card itself)
   **Then** the application must route them to the Calculator tool
2. **And** it must pre-fill the calculator's relevant context strings or preset values based on the origin case study.

## Tasks / Subtasks

- [x] Task 1: Update CaseStudy Card Actions
  - [x] Modify `CaseStudyCard.tsx` to include an onClick handler on the bottom action row.
  - [x] Ensure the row text dynamically encourages ROI calculation (e.g., "Calculate Your ROI").
- [x] Task 2: Implement Contextual Routing
  - [x] Use `react-router-dom`'s `useNavigate` to anchor the click event to `#roi-calculator` or pass state into the calculator.
  - [x] **Technical approach:** Since the ROI Calculator is on the same page (`Home.tsx`), we need to implement a smooth scroll interceptor, or pass query parameters (e.g., `/?preset=B2B#roi-calculator`) if the user comes from another page, but currently the Grid is on the Homepage.
  - [x] Pass the `study.industry` or a benchmark ROAS into the ROI calculator component.
- [x] Task 3: Update Calculator Defaults
  - [x] In `src/features/results/components/MediaBuyingCalculator.tsx`, listen for incoming search parameters or local state injected from the Case Study click.
  - [x] Adjust the placeholder "ROAS" or "Monthly Budget" to reflect the case study's benchmarks upon arrival.

## Dev Notes
- Since both components exist on `Home.tsx`, the primary action should trigger a `window.scrollTo` or standard `<a href="#roi-calculator">` behavior with a generic `onClick` state setter for the calculator. To keep things clean, we can utilize a React context or a lightweight URL query parameter (`?preset=ecommerce#roi-calculator`) to pass the data without prop-drilling.
- Let's use standard URL `URLSearchParams` in the `MediaBuyingCalculator` so that the URLs are shareable (e.g., `?budget=50000&targetRoas=3.5`).

### File List
