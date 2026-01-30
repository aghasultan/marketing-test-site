# UI Component Inventory (web-app)

## Overview
This document lists the reusable UI components and layout elements available in the application.

## Core UI Library (`src/components/ui`)
Base components, likely built with Shadcn/UI and Radix Primitives.

- **Button** (`button.tsx`): Standard interactive button component.
- **Sheet** (`sheet.tsx`): Drawer/Sheet component for overlays (used in Mobile Nav).
- **Wizard** (`Wizard.tsx`): Multi-step form container component.
- **AnimatedBackground** (`AnimatedBackground.ts`): Utility for background animations.
- **InteractiveBg** (`InteractiveBg.tsx`): React component wrapper for interactive backgrounds.

## Layout Components (`src/components/layout`)
Structural components for page conceptualization.

- **Header** (`Header.legacy.tsx`?): *Note: Main header seems to be in root components or refactored.*
- **Footer** (`Footer.tsx`): Site footer.
- **Layout** (`Layout.tsx`): Main application layout wrapper.
- **ErrorBoundary** (`ErrorBoundary.tsx`): React error boundary for catching rendering errors.
- **SEO** (`SEO.tsx`): Head management component (React Helmet).

## Feature Components (`src/components`)
Feature-specific or composite components.

- **AuditForm** (`AuditForm.tsx`): Input form for the audit tool.
- **AuditResults** (`AuditResults.tsx`): Display component for audit outcomes.
- **CaseStudyGrid** (`CaseStudyGrid.tsx`): Grid layout for displaying case study definitions.

## Pages (`src/pages`)
Top-level route components.

- **Home**: Landing page.
- **Apply**: Application wizard page.
- **AuditPage**: Audit tool page.
- **BlogIndex**: Blog listing.
- **BlogPost**: Individual blog post viewer.
- **Scale**: "Scale" offering page.
- **NotFound**: 404 error page.
