# Component Inventory

This document lists the key UI components available in the system.

## Shared Components (`src/components/`)
These components are reusable across the entire application.

### Layout
*   **Layout**: Main wrapper handling the global shell.
*   **Header (Legacy)**: Old header implementation (Note: Check if replaced or active).
*   **Footer**: Global application footer.

### Business Components
*   **AuditForm**: Input form for the URL audit feature.
*   **AuditResults**: Display component for showing audit scores and details.
*   **CaseStudyGrid**: Grid layout for displaying case studies/testimonials.
*   **SEO**: Head management component (React Helmet wrapper).

### Utility
*   **ErrorBoundary**: React Error Boundary for catching render runtime errors.

## Feature: Apply Wizard (`src/features/apply/components/`)
Components specific to the Lead Generation Wizard.
*   (Inferred from architecture) Step Components for the multi-step form.
*   Progress Indicators.
*   Navigation Controls (Next/Back).

## Feature: Results (`src/features/results/components/`)
Components specific to the Audit Result display.
*   **ResultsGrid**: Specialized grid for breaking down audit metrics.
*   Score Visualizers (Charts/Gauges).

## Design System (Shadcn/UI & Radix)
*   **Location:** `src/components/ui/`
*   **Primitives:** Likely includes Button, Input, Card, Dialog, Label, etc.
*   **Styling:** Tailwind CSS based.
