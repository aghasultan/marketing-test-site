# Architecture Documentation

## Executive Summary
The Riffat Labs Marketing Site is a client-side Single Page Application (SPA) designed for performance and interactivity. It leverages a modern React stack to deliver a distinct "premium" feel through animations and responsive design.

## Architecture Pattern
**Component-Based SPA** (React)
- **Presentation Layer**: React Components + TailwindCSS
- **State Management**: React Context + Local State (minimal global state)
- **Routing**: React Router DOM (Client-side routing)
- **Data Layer**: Service abstraction (Internal Mocks + Local Content)

## Key Subsystems

### 1. Results Engine (`src/features/results`)
- **Purpose**: Showcase portfolio/case studies.
- **Implementation**: Filters local markdown content (loaded via `ContentService`) based on user-selected criteria (Industry, Spend).
- **Architecture**:
  - `ContentService`: Loads/Parses Markdown.
  - `useResults` Hook: Manages filtering logic.
  - `CaseStudyGrid`: Presentation of results.

### 2. Apply Wizard (`src/features/apply`)
- **Purpose**: Qualify potential clients.
- **Implementation**: Zod-validated multi-step form.
- **Architecture**:
  - `ApplyFormSchema`: Central validation logic.
  - `StepIndicator`: Visual progress tracking.
  - `Wizard` Component: Generic step orchestration.

### 3. Audit Tool (`src/services/auditService`)
- **Purpose**: Lead magnet / Engagement tool.
- **Implementation**: Mock async service simulating analysis.

## Decision Record
- **Why Vite?** For fast dev loop and ES module support.
- **Why Tailwind?** For rapid styling and design system consistency (via Shadcn tokens).
- **Why Client-Side Content?** To minimize backend complexity for the initial "marketing site" phase. Content is embedded/loaded at build time or runtime via glob imports.

## Testing Strategy
- **E2E**: Playwright (Primary verification method).
- **Focus**: User flows (Wizard completion, Filter interaction).
