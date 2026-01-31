---
title: "Adversarial Code Review Findings"
date: "2026-01-31"
status: "review-complete"
author: "Antigravity Agent"
---

# Adversarial Code Review Findings

**Date:** 2026-01-31
**Scope:** `src/**/*.{ts,tsx,css}`
**Focus:** Security, Functional Logic, UI/UX Compliance

## 0. Critical Architecture Finding

### F0: Dead Code / Logic Duplication
- **File:** `src/components/ui/Wizard.tsx` (Entire File)
- **Type:** Maintainability / Confusion
- **Description:** This component appears to be fully implemented but is **not imported** by any other file in the `src` directory. The actual application uses `src/pages/Apply.tsx` which relies on `features/apply/hooks/useWizard`.
- **Impact:** Engineers might audit or fix bugs in `Wizard.tsx` expecting changes to reflect on the `/apply` page, but they will not.
- **Recommendation:** Delete `src/components/ui/Wizard.tsx` or replace `Apply.tsx` content with it if it is the intended new version.

## 1. Security & Data Integrity

### F1: Input Validation Race Condition
- **File:** `src/components/ui/Wizard.tsx`
- **Line:** 120 (`const output = await trigger...`)
- **Type:** Race Condition
- **PoC (Proof of Concept):**
    1. User fills out Step 1.
    2. User clicks "Next Step" button (Line 350).
    3. `trigger` (React Hook Form validation) starts async execution.
    4. While `trigger` is pending (e.g., slow device), User clicks "Next Step" again.
    5. **Result:** If `setStep` relies on `prev => prev + 1`, the step counter could increment twice, skipping a step.
- **Recommendation:** Disable the "Next" and "Submit" buttons while validation is in progress (`formState.isValidating`).

### F2: Negative ROI Input Logic
- **File:** `src/pages/Home.tsx`
- **Line:** 322 (`setSpend`), 333 (`setHours`), 342 (`setRate`)
- **Type:** Functional Logic
- **PoC:**
    1. Navigate to ROI Calculator.
    2. Enter `-5000` into "Monthly Ad Spend".
    3. **Result:** Use of `Number(spend)` in calculations (Line 13) accepts negative values, potentially inverting the "Upside" logic or showing a positive ROI on negative spend depending on the formula `(totalUpside / (spend * 12))`.
- **Recommendation:** `onChange={(e) => setSpend(Math.max(0, parseFloat(e.target.value)))}`.

## 2. Functional Logic & Privacy

### F3: Missing Privacy Controls for Persistence (Recommendation)
- **File:** `src/components/ui/Wizard.tsx` (Line 102), `src/pages/Apply.tsx` (Line 10)
- **Type:** Privacy / GDPR
- **Description:** The review recommendation to "Implement localStorage persistence" (Finding 2.1 in previous draft) must be qualified.
- **Risk:** Persisting PII (Name, Email) to `localStorage` without user consent can violate privacy laws if the device is shared.
- **Recommendation:** If persistence is added, use `sessionStorage` (clears on tab close) or explicitly ask user "Save my progress?".

## 3. Strict UI/UX System Compliance

### F4: Color System Fragmentation (Violation)
- **Files & Lines:**
    - `src/components/layout/Header.tsx`: Line 46 (`bg-violet-600`)
    - `src/pages/Apply.tsx`: Line 258 (`bg-blue-600`), Lines 117/133/165 (`focus:ring-blue-500`)
    - `src/results/components/ResultsGrid.tsx`: Line 71 (`text-blue-400`)
    - `src/components/ui/Wizard.tsx`: Line 48 (`bg-slate-800`), Line 52 (`border-red-500`)
- **Type:** Design System Violation
- **Standard:** The project `index.css` (Line 22) and `Home.tsx` establish **Emerald** (`#00a86b`, `zinc-*`) as the primary design language.
- **Impact:** The application feels "stitched together" from different templates.
- **Recommendation:**
    - Standardize all Primary Actions to `bg-emerald-500`.
    - Standardize all Focus rings to `ring-emerald-500`.
    - Standardize all Neutrals to `zinc-*` (replace `slate`).

### F5: Hardcoded Colors over Utility Tokens
- **File:** `src/index.css`
- **Line:** 22 (`--primary: #00a86b`)
- **Type:** css-variables
- **Description:** While variables are defined, components often bypass them (e.g., using Tailwind's default palette `blue-600` instead of `bg-primary`).
- **Recommendation:** Configure `tailwind.config.js` to map `primary` to `var(--primary)` and enforce its usage.
