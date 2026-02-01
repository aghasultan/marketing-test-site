# Project Overview

**Project Name:** riffat-labs
**Version:** 0.0.0
**Generated:** 2026-02-01

## Executive Summary
Riffat Labs is a high-performance marketing audit and lead generation web application. It features a "No-Click Audit Engine" that analyzes ad agency performance, a Qualification Wizard for potential clients, and a rich, interactive UI built with Glassmorphism aesthetics. The project is designed for speed, SEO optimization, and high conversion rates.

## Technology Stack

| Category | Technology | Version | Justification |
| :--- | :--- | :--- | :--- |
| **Framework** | React | 18.3.1 | Component-based UI library |
| **Bundler** | Vite | 5.3.1 | Fast build tool and dev server |
| **Language** | TypeScript | 5.9.3 | Static typing for reliability |
| **Styling** | Tailwind CSS | 3.4.16 | Utility-first CSS framework |
| **Animation** | Framer Motion | 12.29.2 | Complex declarative animations |
| **State Management** | Zustand | 5.0.10 | Lightweight global state |
| **Forms** | React Hook Form | 7.71.1 | Performance-focused form validation |
| **Validation** | Zod | 3.25.76 | Schema validation |
| **Testing** | Playwright | 1.49.0 | E2E testing |
| **Testing** | Vitest | 4.0.18 | Unit testing |
| **UI Primitives** | Radix UI | Latest | Accessible unstyled components |

## Architecture Classification
**Type:** Monolith Web Application
**Architecture Pattern:** Component-Based SPA (Single Page Application) with Modular Feature Folder Structure (`src/features/*`).

## Repository Structure
The project follows a standard Vite/React structure with feature-based encapsulation.

- `src/features/`: Core business logic domains (Wizard, Audit, Results)
- `src/components/ui/`: Reusable atomic UI components (Design System)
- `src/components/layout/`: Global layout blocks (Hero, Footer)
- `src/pages/`: Routing views
- `public/`: Static assets

## Key Documentation Links
- [Source Tree Analysis](./source-tree-analysis.md)
- [Component Inventory](./component-inventory.md)
- [Development Guide](./development-guide.md)
- [Sprint Status](./implementation-artifacts/sprint-status.yaml)
