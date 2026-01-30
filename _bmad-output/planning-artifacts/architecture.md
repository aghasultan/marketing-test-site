---
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-03-starter
  - step-04-decisions
  - step-05-patterns
  - step-06-structure
  - step-07-validation
  - step-08-complete
workflowType: 'architecture'
project_name: 'marketing-test-site'
user_name: 'Sultan'
date: '2026-01-30'
lastStep: 8
status: 'complete'
completedAt: '2026-01-30'
---

# Technical Architecture: marketing-test-site

## 1. Executive Summary & Context

**Project Type:** Brownfield Upgrade (React + Vite + TypeScript)
**Core Objective:** High-performance Marketing SPA with a "Premium Glassmorphism" aesthetic and complex lead qualification logic.

**Key Requirements:**
- **Code-as-CMS:** Results managed via typed JSON for zero-latency.
- **Performance:** LCP < 2.5s (Critical for ad quality).
- **Reliability:** `localStorage` persistence for the Apply Wizard.
- **Aesthetics:** High-end glassmorphism using Tailwind + Framer Motion.

## 2. Core Architectural Decisions (ADR)

### ADR-01: Framework & Build
- **Decision:** **React 18 + Vite + TypeScript**.
- **Rationale:** Matches existing stack (Brownfield), provides best-in-class dev server speed, and strict type safety is non-negotiable for the "Internal Ops" persona.

### ADR-02: State Management
- **Decision:** **Zustand**.
- **Rationale:** The Apply Wizard has complex branching logic and needs centralized state that persists. Redux is too heavy; Context is too prone to render-thrashing.
- **Persistence:** Zustand `persist` middleware synced to `localStorage`.

### ADR-03: Data Architecture
- **Decision:** **Local Structured Data (Code-as-CMS)**.
- **Rationale:** No external CMS API calls. Data lives in `src/data/results.ts`.
- **Access:** Custom hook `useCaseStudies()` with memoized filtering.

### ADR-04: Styling & Animation
- **Decision:** **Tailwind CSS + Framer Motion**.
- **Rationale:** Tailwind for utility-first layout (LCP). Framer Motion for complex "Shared Layout" animations in the Results Grid (filtering transitions) and Glassmorphism entrance effects.

## 3. Implementation Patterns & Consistency Rules

### Naming Patterns
- **Files:** `kebab-case` (e.g., `apply-wizard.tsx`, `use-wizard-store.ts`).
- **Components:** `PascalCase` exports (e.g., `export function ApplyWizard...`).
- **Interfaces:** `PascalCase` (e.g., `WizardState`, `CaseStudy`).

### Structure Patterns
- **Feature-First:** Code organized by feature, not technical type.
  - `src/features/results/`
  - `src/features/wizard/`
- **Colocation:** Tests and Types live close to the feature.

### Communication & State Patterns
- **Atomic Selection:** `const step = useWizardStore(s => s.step)`.
- **Strict Types:** No `any`. All JSON data must implement strict interfaces.

## 4. Project Structure & Boundaries

```
marketing-test-site/
├── package.json
├── tsconfig.json
├── tailwind.config.js       (Configured with 'glass' utilities)
├── vite.config.ts           (Ensure alias @ -> ./src)
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── features/            <-- NEW: Domain Logic
│   │   ├── wizard/          (Epic: Apply Form)
│   │   │   ├── components/  (Bi-directional state)
│   │   │   ├── store/       (wizardStore.ts - Zustand)
│   │   │   └── types.ts
│   │   └── results/         (Epic: Results Engine)
│   │   │   ├── components/  (ResultsGrid, FilterBar)
│   │   │   ├── hooks/       (useResultsFilter)
│   │   │   └── types.ts
│   ├── components/
│   │   ├── ui/              (Shared Primitives - Radix/Shadcn)
│   │   └── layout/          (Header, Footer, Section)
│   ├── data/
│   │   └── results.ts       (The "CMS" - SINGLE SOURCE OF TRUTH)
│   ├── lib/
│   │   └── utils.ts
│   └── styles/
│       └── globals.css
└── tests/
    └── unit/
```

**Boundaries:**
- **Smart vs Dumb:** Pages inject data; Features contain logic; UI components are pure.
- **Data Barrier:** Components NEVER hardcode data. Import from `src/data/` only.

## 5. Architecture Validation Results

### Coherence Validation ✅
- **Compatability:** React + Local JSON + Zustand work seamlessly together.
- **Performance:** Local data eliminates waterfalls; Framer handles layout shifts.

### Requirements Coverage ✅
- **Apply Wizard:** Covered by `src/features/wizard` + `localStorage`.
- **Results Engine:** Covered by `src/features/results` + client-side filtering.
- **Internal Ops:** Covered by strict TS in `src/data`.

### Readiness Status
**Status:** READY FOR IMPLEMENTATION
**Confidence:** High. The "Feature-First" structure provides clear homes for all new code.
