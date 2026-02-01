# Architecture Documentation

## Executive Summary
This project is a high-performance **React Web Application** built with **Vite**. It features a "Glassmorphism" UI design system (Nebula theme) and provides interactive tools for marketing agency audits. It follows a **Monolithic SPA** architecture.

## Technology Stack

| Category | Technology | Version | Justification |
|----------|------------|---------|---------------|
| **Core** | React | 18.3.1 | Component-based UI library |
| **Language** | TypeScript | 5.x | Type safety and scalability |
| **Build** | Vite | 5.3.1 | Fast HMR and bundling |
| **Styling** | Tailwind CSS | 3.4 | Utility-first styling |
| **Animation**| Framer Motion| 12.x | Complex UI transitions |
| **State** | Zustand | 5.x | Lightweight global state |
| **Routing** | React Router | 7.x | Client-side routing |
| **Testing** | Playwright | 1.49 | End-to-End testing |

## Architecture Pattern
**Single Page Application (SPA)** using Client-Side Rendering (CSR).
- **Presentation Layer**: React Components (`src/components`, `src/features`)
- **Domain Layer**: Feature modules (`src/features/apply`, `src/features/wizard`)
- **Data Layer**: Service modules (`src/lib/services`) calling external APIs.

## Data Flow
1.  **User Interaction**: User fills out Audit forms (Wizard).
2.  **State Management**: `Zustand` stores (implied) or local React state manages form progress.
3.  **Service Call**: `auditService.ts` calls `/api/audit`.
4.  **Display**: Results are rendered via `AuditResults.tsx`.

## Key Features
- **Agency Audit**: Analyzes URLs for Pixel, SEO, and Speed metics.
- **Wizard Flow**: Multi-step application process for potential clients.
- **Content System**: Markdown-based Blog and Case Studies.
- **Responsive Design**: Mobile-first approach with custom Tailwind breakpoints.
