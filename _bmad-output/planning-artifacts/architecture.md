stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
workflowType: 'architecture'
lastStep: 8
status: 'complete'
completedAt: '2026-02-01'

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

### 1.2 System Constraints & Goals

### Requirements Overview

**Functional Requirements:**
- **Results Engine:** Filterable case study grid with "Verified" schema-backed badges.
- **No-Click Audit:** Real-time analysis (Speed/Pixel/SEO) in the Hero section without page reload.
- **Apply Wizard:** Multi-step qualification form with conditional logic (Revenue < $1M -> Partner, > $1M -> Booking).

**Non-Functional Requirements (Architectural Drivers):**
- **Performance:** Strict budget (LCP < 0.8s, Bundle < 100KB) requires aggressive code splitting and asset optimization.
- **Schema Integrity:** `ClaimReview` compliance dictates a structured data layer (Markdown frontmatter -> JSON-LD).
- **Accessibility:** WCAG 2.1 AA compliance affects component design (contrast, keyboard nav).
- **Aesthetic:** "Glassmorphism 3.0" implies advanced CSS/backdrop-filter usage which can impact performance if not managed.

**Scale & Complexity:**
- **Primary Domain:** Client-Side Web Application (Marketing/Lead Gen).
- **Complexity Level:** **Medium**. High fidelity/polish requirements raise complexity despite low data volume.
- **Estimated Components:** ~15-20 core components.

### Technical Constraints & Dependencies
- **Stack:** React 18, React Router 7, Vite.
- **Backend:** Serverless/Client-side only (No persistent DB).
- **Data Source:** Local Markdown content.

### Cross-Cutting Concerns Identified
1.  **Performance Budget:** 100KB limit influences all library choices.
2.  **Glassmorphism System:** Global theming for "frosted glass" effects.
3.  **Schema Validation:** Integrity checks for "Verified" claims.

## 2. Starter Template Evaluation

### Primary Technology Domain
**Single Page Application (SPA)** based on project requirements analysis.

### Starter Options Considered

1.  **Vite + React + TypeScript (Official)**
    *   **Pros:** Lightweight, Fast, Clean Slate. Best for custom architectures.
    *   **Cons:** Requires manual setup of Router, Styling, Linting.
    *   **Verdict:** **Selected.** Ideal for "Experience-Driven MVP" where we need full control over the bundle size (<100KB) and Glassmorphism implementation.

2.  **Create React Router (Official)**
    *   **Pros:** Batteries included (Router 7 configured).
    *   **Cons:** Can be opinionated on backend integration (loaders/actions) which might overcomplicate our "Client-Side" focus.

3.  **Shadcn UI Starters (Various)**
    *   **Pros:** Pre-configured with Tailwind + Radix.
    *   **Cons:** Often bloated with unnecessary admin components.
    *   **Verdict:** We will use the *Component Library* (Shadcn), but install it manually into a clean Vite app to keep the bundle small.

### Selected Starter: Vite + React + TypeScript

**Rationale for Selection:**
We need to hit a strict **<100KB initial bundle** target while implementing a custom "Glassmorphism 3.0" aesthetic. A clean Vite template allows us to add *only* what we need (React Router 7, Framer Motion, Tailwind) without inheriting "admin dashboard" bloat from heavier templates.

**Initialization Command:**

```bash
npm create vite@latest marketing-test-site -- --template react-ts
# Followed by manual addition of:
# npm install react-router-dom@6 (migrating to 7)
# npx shadcn@latest init
```

**Architectural Decisions Provided by Starter:**

*   **Language & Runtime:** TypeScript + React 18 (Client Side).
*   **Styling Solution:** Tailwind CSS (via PostCSS) + CSS Modules for Glassmorphism.
*   **Build Tooling:** Vite (ESBuild) for sub-second HMR.
*   **Testing Framework:** Vitest + React Testing Library (Manual setup required).
*   **Code Organization:** `/src` root. We will enforce Feature-based folders.

**Note:** Project initialization using this command should be the first implementation story.

## 3. Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
1.  **Data Strategy:** Client-Side "Content Collections" (Markdown) vs Headless CMS.
2.  **Routing:** React Router 7 (Library Mode) vs full Framework (Remix/Next).
3.  **State Management:** Context vs Redux/Zustand.

### Data Architecture
*   **Strategy:** **Local Markdown Files** (simulating a CMS).
*   **Reason:** Zero latency, zero cost, total control. Fits "Static Marketing Site" perfectly.
*   **Pattern:** `src/content/case-studies/*.md` loaded via Vite `import.meta.glob`.
*   **Schema Validation:** **Zod (v3)** to enforce `frontmatter` shape for `ClaimReview` integration.

### Authentication & Security
*   **Strategy:** **None (Public Access).**
*   **Audit API Security:** Rate limiting via Vercel Edge Middleware to prevent abuse of the "No-Click Audit" endpoint.

### API & Communication Patterns
*   **Pattern:** **Serverless Proxy** (Next.js API Routes or Vercel Functions).
*   **Reason:** The "No-Click Audit" requires fetching 3rd-party HTML (CORS violation on client). We need a thin serverless proxy to forward these requests.
*   **Library:** native `fetch` with `TanStack Query (v5)` for caching/deduplication (FR8).

### Frontend Architecture
*   **Routing:** **React Router v7.13**. Implementing standard "Client Side Routing" to keep transitions glossy and smooth.
*   **State Management:**
    *   **Global UI:** React Context (Theme, Toast).
    *   **Server Data:** TanStack Query (Audits).
    *   **Wizard State:** `xstate` or complex `useReducer` for the multi-step branching logic.
*   **Animation:** **Framer Motion v12**. Mandatory for "Glassmorphism" feel.

### Infrastructure & Deployment
*   **Host:** **Vercel** (Zero config for Vite).
*   **CI/CD:** GitHub Actions -> Vercel Deployment.

## 4. Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:**
5 areas where AI agents could make different choices (Naming, Structure, Component Design, State, Testing).

### Naming Patterns

*   **Files:** `PascalCase.tsx` for components, `camelCase.ts` for hooks/utils.
*   **Folders:** `kebab-case` for all directories.
*   **CSS Classes:** `kebab-case` (standard Tailwind class names).
*   **Constants:** `UPPER_SNAKE_CASE` for global configs.
*   **Interfaces:** `I` prefix avoided. Type names should be descriptive (e.g., `UserData`, not `IUser`).

### Structure Patterns

*   **Feature-Based Architecture:**
    ```text
    src/
      features/
        [feature-name]/
          components/   # Feature-specific UI
          hooks/        # Logic
          types.ts      # Feature-scoped types
          index.ts      # Public API
    ```
*   **Shared Kernel:**
    ```text
    src/
      components/ui/    # Shadcn primitives
      lib/              # Utils, formatted constants
      hooks/            # Global hooks (useTheme)
    ```

### Component Patterns

*   **Composition:** Favor Composition over Inheritance. Use `children` prop.
*   **Props:** Interface defining props should be named `[ComponentName]Props`.
*   **Exports:** Named exports only (avoid `default export`).
    *   *Why?* Better refactoring support and explicit imports.

### Communication Patterns

*   **State Updates:**
    *   **Local UI:** `useState` for simple toggles.
    *   **Form Data:** Uncontrolled inputs with `React Hook Form` (Zod validation).
    *   **Server Data:** `TanStack Query` (hooks named `use[Resource]Query`).
*   **Events:** Props named `on[Event]` (e.g., `onSave`, `onCancel`).

### Enforcement Guidelines

**All AI Agents MUST:**
1.  Check `src/features` before creating new global components.
2.  Use **Typescript** strict mode (no `any`).
3.  Colocate tests with components (`Component.test.tsx`).

**Pattern Examples:**

**Good:**
```tsx
// src/features/auth/components/LoginForm.tsx
import { useAuth } from '../hooks/useAuth';

export const LoginForm = ({ onSuccess }: LoginFormProps) => { ... }
```

**Anti-Pattern:**
```tsx
// src/components/LoginForm.js (Wrong extension, global placement)
export default function Login() { ... } // Default export
```

## 5. Project Structure & Boundaries

### Complete Project Directory Structure

```text
marketing-test-site/
├── src/
│   ├── app/                    # Global App Setup
│   │   ├── main.tsx            # Entry Point
│   │   ├── App.tsx             # Root Component (Providers)
│   │   ├── router.tsx          # React Router 7 config
│   │   └── globals.css         # Tailwind directives
│   ├── assets/                 # SVGs, Fonts
│   ├── components/             # Shared Kernel
│   │   ├── ui/                 # Shadcn Atoms (Button, Input)
│   │   ├── layout/             # Header, Footer, Hero
│   │   └── shared/             # Logic-less shared molecules
│   ├── content/                # Local CMS
│   │   ├── case-studies/       # Markdown files
│   │   └── config.ts           # Zod Schemas
│   ├── features/               # Domain Logic (Vertical Slices)
│   │   ├── apply-wizard/       # [Complex] Multi-step form
│   │   ├── audit-tool/         # [Complex] Analysis engine
│   │   └── results-engine/     # [Complex] Filtering/Badge Logic
│   └── lib/                    # Utilities
│       ├── api.ts              # Fetch wrappers (TanStack Query)
│       └── utils.ts            # CN/Formatting helpers
├── public/                     # Static Root (Robots.txt)
├── server/                     # Serverless Function Proxies
│   └── api/                    # Vercel Functions
│       └── audit.ts            # [Proxy] Third-party fetcher
└── tests/                      # Setup & Integration Tests
```

### Architectural Boundaries

**API Boundaries:**
*   **Audit Proxy:** `src/features/audit-tool` → `fetch('/api/audit')` → `server/api/audit.ts` → `External APIs`.
    *   *Reason:* Bypass CORS and protect API distinctions.
*   **Content:** `src/features/results-engine` → `import.meta.glob` → `src/content/*.md`.
    *   *Reason:* Compile-time content loading (No API).

**State Boundaries:**
*   **Wizard:** `ApplyWizard` context is **isolated** to `features/apply-wizard`. No logic leakage to global `App.tsx`.
*   **Audit:** `AuditResult` is cached globally via `TanStack Query` key `['audit', url]`.

### Requirements to Structure Mapping

**Epic: No-Click Audit**
*   **UI:** `src/features/audit-tool/components/AuditHero.tsx`
*   **Logic:** `src/features/audit-tool/hooks/useAudit.ts`
*   **Schema:** `src/features/audit-tool/types.ts` (Zod validation for analysis results)

**Epic: Apply Wizard**
*   **State Machine:** `src/features/apply-wizard/machines/wizardMachine.ts`
*   **Steps:** `src/features/apply-wizard/steps/*` (Revenue, Booking, etc.)

**Cross-Cutting Concerns:**
*   **Glossiness:** `src/lib/glassmorphism.ts` (Shared tokens for backdrop-blur/gradients).

## 6. Architecture Validation Results

### Coherence Validation ✅
*   **Compatibility:** React Router 7 + Framer Motion 12 is a proven stack.
*   **Consistency:** "Glassmorphism" theme is enforced via strict Tailwind tokens `src/lib/glassmorphism.ts`.

### Requirements Coverage Validation ✅
*   **Epic: Apply Wizard:** Fully supported by `xstate` machine and `src/features/apply-wizard` module isolation.
*   **Epic: No-Click Audit:** Supported by Serverless Proxy (`server/api/audit.ts`) to bypass CORS, meeting the "Real-time" requirement.
*   **NFR: Performance:** 100KB budget is achievable with the "Clean Slate" Vite approach + Code Splitting by Route.

### Architecture Completeness Checklist
*   ✅ **Requirements Analysis:** All FRs mapped to features.
*   ✅ **Architectural Decisions:** Stack verified (React 18, Vite 5, Router 7).
*   ✅ **Implementation Patterns:** Naming & Structure defined.
*   ✅ **Project Structure:** Full file tree specified.

### Architecture Readiness Assessment
**Overall Status:** 🚀 **READY FOR IMPLEMENTATION**

**First Implementation Priority:**
```bash
npm create vite@latest marketing-test-site -- --template react-ts
# This initializes the project structure defined in Section 5.
```





