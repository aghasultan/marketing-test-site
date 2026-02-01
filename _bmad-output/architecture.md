# Architecture Reference

**Type:** Single Page Application (SPA)
**Pattern:** Feature-based Modular Architecture

## High-Level Design

The application is designed as a client-side React application bundled with Vite. It follows a "Feature-First" architectural pattern where code is organized by **domain feature** (e.g., "Apply", "Results") rather than by technical layer (controllers, views). This ensures high cohesion and makes the codebase scalable for new marketing campaigns or funnels.

## Core Patterns

### 1. Feature Modules (`src/features/`)
Each major functional area is self-contained in `src/features`.
A typical feature module structure:
```
src/features/apply/
├── components/   # UI components only used by this feature
├── hooks/        # React hooks specific to this feature
├── stores/       # Local state (Zustand) for this feature
└── types.ts      # Feature-specific TypeScript definitions
```
This encapsulation allows features to be modified or removed without affecting the rest of the application.

### 2. Service Abstraction (`src/services/`)
Data access is decoupled from UI components via service modules.
*   **Current State:** Uses mock services (e.g., `auditService`) to simulate backend latency and logic.
*   **Future State:** These services can be swapped for real API clients (Axios/Fetch) without changing the component layer, maintaining the core interface contract.

### 3. State Management
*   **Global/Feature State:** **Zustand** is used for complex state that needs to persist across steps (e.g., Multi-step Wizard data).
*   **Form State:** **React Hook Form** with **Zod** validation is used for ephemeral form state and user input validation.
*   **Server State:** (Planned) React Query or similar would be used here if/when real APIs are integrated.

### 4. Routing
**Client-side routing** is handled by `react-router-dom`. Routes are defined in `src/App.tsx` and mapped to top-level `Page` components. These Page components act as the composition root for the Features.


## Data Flow
1.  **User Action:** User interacts with a specific Feature Component (e.g., "Submit URL").
2.  **Handler:** Component calls a Service function (e.g., `auditService.analyzeUrl`).
3.  **Service:** (Mock) Service processes data and returns a Promise.
4.  **State Update:**
    *   Result is stored in a Feature Store (Zustand) if needed globally.
    *   Or returned directly to the component for local rendering.
5.  **UI Update:** React re-renders based on the new state.

### Content Discovery Flow
*   **Source:** Markdown files in `src/content/blog/*.md` with YAML frontmatter.
*   **Ingestion:** `vite.glob` imports files at build/runtime.
*   **Processing:** parsed by `gray-matter`, sorted by date in `useBlog`.
*   **Syndication:** `scripts/generate-rss.ts` runs at build time to output `public/rss.xml`.

## Observability & Analytics
*   **Layer:** `src/lib/tracking.ts` acts as the single abstraction.
*   **Transport:** events are pushed to `window.dataLayer` for GTM/GA4.
*   **Dev Mode:** Events are logged to the console for easy debugging.
*   **Taxonomy:** Typed events (e.g., `wizard_step_view`) ensure consistency.

## Performance Strategy
*   **Core Web Vitals:** targeted 100/100.
*   **Rendering:** `content-visibility: auto` used to skip off-screen rendering.
*   **Layout Stability:** All images have explicit `width`/`height` to prevent CLS.
*   **Lazy Loading:** Strict policy for all non-hero assets.

## Automation & CRM Layer
*   **Email Service:** `src/services/emailService.ts` handles transactional emails.
    *   **Templates:** Content-aware templates based on lead outcome (Qualified vs Partner).
*   **CRM Service:** `src/services/crmService.ts` handles data synchronization.
    *   **Mapping:** `WizardData` is flattened and enriched into `CrmLead` objects.
*   **Trigger Logic:** The `WizardContext` acts as the orchestration point, firing Analytics, Email, and CRM events in parallel upon completion.

## Testing Strategy
*   **E2E (Playwright):** Critical user flows (Wizard completion, Audit generation) are tested end-to-end to ensure business value is delivered.
*   **Unit/Integration:** (Inferred) Component testing via React Testing Library would validate individual behaviors.
