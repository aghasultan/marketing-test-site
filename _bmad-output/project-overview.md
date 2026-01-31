# Project Overview

**Project Name:** Riffat Labs (Marketing Site)
**Version:** 0.0.0 (Pre-release)
**Classification:** Monolith Web Application (Single Page Application)

## Executive Summary

The Riffat Labs Marketing Site is a high-performance Single Page Application (SPA) built to showcase the agency's performance marketing capabilities. It serves as both a marketing brochure and a functional demonstration of the tracking and conversion technologies (CAPI, Server-Side Tracking) that the agency implements for clients.

Key features include an interactive ROI Calculator, a multi-step Apply Wizard for lead qualification, and a markdown-based blog system. The application emphasizes Core Web Vitals performance and SEO readiness.

## Technology Stack Summary

| Category | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | React | 18.3.1 | Core UI Library |
| **Language** | TypeScript | 5.x | Static Typing |
| **Build Tool** | Vite | 5.3.1 | Development & Bundling |
| **Styling** | Tailwind CSS | 3.4.16 | Utility-first Styling |
| **UI Library** | Radix UI | 1.x | Headless UI Components |
| **Animations** | Framer Motion | 11.18.2 | Fluid Interactions |
| **Routing** | React Router DOM | 7.0.2 | Client-side Routing |
| **State Management** | Zustand | 5.0.10 | Global State (Wizard/Auth) |
| **Validation** | Zod | 3.23.8 | Schema Validation |
| **Forms** | React Hook Form | 7.53.2 | Form Handling |
| **Testing** | Playwright | 1.49.0 | E2E Testing |

## Architecture Type

**Pattern:** Feature-based Single Page Application (SPA)
**Description:** The application routes request client-side, consuming mock/local services for data. It uses a "Feature-first" folder structure where domain logic (Apply, Results) is encapsulated within `src/features`, while shared UI elements reside in `src/components`.

## Repository Structure

The project is structured as a **Monolith**, containing all frontend code in a single repository root.

- **Root:** `/`
- **Source:** `/src`
- **Output:** `/dist` (Build artifacts)

## Documentation Index

- [Source Tree Analysis](./source-tree-analysis.md) - Detailed directory breakdown
- [Architecture](./architecture.md) - Technical design and patterns
- [Component Inventory](./component-inventory.md) - UI Library and Feature components
- [Development Guide](./development-guide.md) - Setup, Build, and Test instructions
- [API Contracts](./api-contracts.md) - Service interfaces (Validation/Audit)
- [Data Models](./data-models.md) - Type definitions and Schemas
