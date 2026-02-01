# Component Inventory

This document lists the key UI components available in the system, categorized by their scope and purpose.

## Shared Components (`src/components/`)
These components are reusable across the entire application and form the foundation of the UI.

### Layout (`src/components/layout/`)
*   **Hero**: Main landing section. High-priority for rendering (LCP). Features `id="hero"`, `aria-labelledby`, and Framer Motion animations.
*   **Header**: Main navigation bar. Includes desktop links and mobile drawer.
*   **Footer**: Global application footer.
*   **NebulaBackground**: Visual effect component for Hero background.

### Design System (`src/components/ui/`)
Built with Radix UI + Tailwind. Atomic blocks.
*   **Button**: Standard interactive element. Variants: `default`, `outline`, `ghost`, `link`.
*   **Card**: Container for grouped content.
*   **Input**: Form text fields.
*   **Label**: Accessible form labels.
*   **Slider**: Interactive range input (used in ROI Calculator).
*   **Sheet**: Drawer component (used for Mobile Navigation).
*   **Dialog/Modal**: Overlays for detailed views.
*   **ThemeToggle**: Switcher for Light/Dark mode.

### Business Components (`src/components/`)
*   **AuditForm**: Input form for the URL audit feature.
*   **AuditResults**: Display component for showing audit scores and details.
*   **CaseStudyGrid**: Grid layout for displaying case studies/testimonials.
*   **SEO**: Head management component (React Helmet wrapper). Handles titles and meta tags.

### Utilities
*   **ErrorBoundary**: React Error Boundary for catching render runtime errors.

## Feature Modules (`src/features/`)

### Feature: Audit (`src/features/audit/`)
*   **AuditScanner**: Interactive component for running the initial audit. Input field + "Analyze Now" button.
*   (Inferred) **ScoreCard**: Displays individual metric scores.

### Feature: Results (`src/features/results/`)
*   **MediaBuyingCalculator**: ROI Calculator using Sliders. Estimates revenue based on Ad Spend, CPM, CTR, etc.
*   **ResultsGrid**: Specialized grid for breaking down audit metrics.
*   **Visualization**: Charts or Gauges for score representation.

### Feature: Apply/Wizard (`src/features/apply/`, `src/features/wizard/`)
*   **Step Components**: Individual forms for multi-step qualification.
*   **ProgressStepper**: Visual indicator of wizard progress.
*   **NavigationControls**: "Next" / "Back" buttons with logic.

## Pages (`src/pages/`)
*   **Home**: Landing page. Composes `Hero`, `AuditScanner`, `MediaBuyingCalculator`.
*   **Scale**: "Scale" offering page. Composes Hero-like sections and CTA.
*   **Results**: Detailed report view.
