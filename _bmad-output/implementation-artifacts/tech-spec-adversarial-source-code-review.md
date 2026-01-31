---
title: 'Adversarial Source Code Review'
slug: 'adversarial-source-code-review'
created: '2026-01-31'
status: 'completed'
stepsCompleted: [1, 2, 3, 4]
tech_stack:
  - React 18
  - Vite
  - TypeScript
  - Tailwind CSS
  - Framer Motion
  - Playwright
files_to_modify:
  - src/**/*.{ts,tsx,css}
code_patterns:
  - Zinc-950 Design System
  - Glassmorphism
  - Wizard Form Logic
  - Route Guards
test_patterns:
  - Adversarial Review
---

# Tech-Spec: Adversarial Source Code Review

**Created:** 2026-01-31

## Overview

### Problem Statement

The codebase requires a "red team" audit to uncover hidden functional bugs, security gaps, and UI deviations before further scaling.

### Solution

A systematic, adversarial line-by-line review of `src/` to identify non-compliance with the PRD and potential failure points.

### Scope

**In Scope:**
- All `src/**/*.{ts,tsx,css}`.
- **Security Check:** Client-side validation bypasses and data handling (sanitation).
- **Application Logic:** Wizard Form logic, ROI Calculator, Route guards.
- **UI/UX:** Strict validation against Zinc-950 Design System, Glassmorphism, and `ux-design-specification.md`.
- Mobile responsiveness.

**Out of Scope:**
- Third-party library internals.
- `vite.config.ts` (unless security related).
- `src/content` (markdown content integrity) - checks focused on application logic.

## Context for Development

### Codebase Patterns

- **Framework:** React 18 + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Framer Motion
- **Routing:** React Router DOM v6+
- **Content:** Markdown (parsed via gray-matter + react-markdown)
- **State:** Local React State + React Hook Form
- **Testing:** Playwright

### Files to Reference

| File | Purpose |
| ---- | ------- |
| `src/main.tsx` | Entry point |
| `src/App.tsx` | Routing and Layout structure |
| `src/components/ui/Wizard.tsx` | Critical path: Wizard Form |
| `src/pages/Home.tsx` | Critical path: ROI Calculator |
| `src/index.css` | Global styles and Tailwind configuration |

### Technical Decisions

- **Adversarial Approach:** The review will search for failures, not just confirmations of functionality.
- **Strict UI Validation:** "Good enough" is not acceptable; verification will be against the specified design system tokens.

## Implementation Plan

### Tasks

#### 1. Security & Data Integrity Audit
- [x] Task 1.1: Security Scan - Input Validation & Sanitation
  - Files: `src/components/ui/Wizard.tsx`, `src/pages/Home.tsx` (ROI)
  - Action: Audit all form inputs for lack of sanitation. Check for XSS vulnerabilities in how data is rendered (especially markdown content).
  - Notes: Log every potential exploit.
- [x] Task 1.2: Security Scan - Route Guard Bypass
  - Files: `src/App.tsx`, `src/components/auth/ProtectedRoutes (if exists)`
  - Action: Manual attempt to bypass logic gates (e.g., accessing result pages without completing wizard).
  - Notes: Verify redirect logic is robust.

#### 2. Functional Logic Adversarial Review
- [x] Task 2.1: Wizard Logic Stress Test
  - File: `src/components/ui/Wizard.tsx` (and related hooks)
  - Action: Review branching logic for infinite loops, dead ends, or state persistence failures on reload.
  - Notes: Look for race conditions in state updates.
- [x] Task 2.2: ROI Calculator Correctness
  - File: `src/pages/Home.tsx`
  - Action: Trace calculation logic against business rules. Check for floating point errors or edge case (0/negative inputs) breakages.

#### 3. Strict UI/UX System Compliance
- [x] Task 3.1: Token Compliance Check
  - Files: `src/index.css`, `tailwind.config.js`, all components
  - Action: Grep for hardcoded hex values vs Zinc-950 variables. verify glassmorphism class usage.
- [x] Task 3.2: Mobile Responsiveness Breakage
  - Files: `src/components/ui/Header.tsx`, `src/components/ui/Wizard.tsx`
  - Action: Review code for non-mobile-first patterns (e.g., fixed widths, hover-only states).

### Acceptance Criteria

- [ ] AC 1: Findings Documented
  - Given the adversarial review is complete
  - When the report is generated
  - Then it must list specific file paths, line numbers, and the type of finding (Bug/Security/UI).
- [ ] AC 2: Security Validation
  - Given a potential vulnerability (e.g., unescaped input)
  - When identified
  - Then a "Proof of Concept" description/note must be included in the finding.
- [ ] AC 3: UI Compliance
  - Given the Zinc-950 system
  - When a component uses custom hex/rgb values
  - Then it must be flagged as a violation.

## Additional Context

### Dependencies

- React
- React Router DOM
- Framer Motion
- Tailwind CSS

### Testing Strategy

- Manual Code Review
- Static Analysis (mental model)
- Cross-reference with PRD and Design Spec

### Notes

- This is a non-destructive review task. Output will be a comprehensive finding report (the tech spec itself will serve as the plan for fixing findings, or a separate report artifact).

## Review Notes
- Adversarial review completed on 2026-01-31.
- Findings: 5 Major Findings (1 Critical Architecture, 2 Security, 1 Privacy, 1 Design System).
- Resolution approach: [F] Fix automatically (Report generation only, actual code fixes deferred to next workflow).
- Key Insight: `src/components/ui/Wizard.tsx` depends on dead code.
