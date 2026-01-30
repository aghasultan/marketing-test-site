# Project Overview

**Project Name:** Riffat Labs (Marketing Site)
**Generated:** 2026-01-30

## Executive Summary

Riffat Labs is a high-performance marketing agency website built as a modern Single Page Application (SPA). The site serves as both a marketing brochure and a demonstration of the agency's technical capabilities (tracking, analytics, conversion optimization). It features a "Digital Garden" blog powered by a headless markdown architecture, an interactive ROI scaling calculator, and a multi-step application wizard.

## Technology Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | React 18 | Core UI library |
| **Bundler** | Vite | Fast build tool and dev server |
| **Language** | TypeScript | Type safety and developer experience |
| **Styling** | Tailwind CSS | Utility-first CSS framework |
| **Animation** | Framer Motion | Complex UI transitions and interactions |
| **Routing** | React Router DOM v6 | Client-side routing |
| **Forms** | React Hook Form + Zod | Form management and schema validation |
| **Content** | React Markdown + Gray Matter | Headless CMS architecture using local files |
| **Serverless** | Vercel Edge Functions | Dynamic Open Graph image generation |

## Architecture Pattern

**Type:** Monolithic Single Page Application (SPA)

The project follows a standard React SPA architecture:
- **Client-Side Rendering:** All pages function via client-side routing.
- **Headless Content:** Blog posts and case studies are stored as static Markdown files and loaded at build/runtime via Vite's glob import feature, effectively acting as a file-system based CMS.
- **Edge Capabilities:** Utilizes Vercel Edge Functions (`api/og.tsx`) for dynamic asset generation, bridging the gap between static SPA and dynamic server needs.

## Key Features

1.  **ROI Calculator:** Interactive tool with real-time state updates (`Home.tsx`).
2.  **Apply Wizard:** Multi-step form with complex validation logic (`Wizard.tsx`).
3.  **Digital Garden:** Blog and Case Study system with efficient markdown parsing.
4.  **Performance Auditing:** Interactive "AI Ad Audit" tool mock-up (`AuditPage.tsx`).
5.  **Dynamic SEO:** Automated meta tags and Open Graph images (`SEO.tsx`).
