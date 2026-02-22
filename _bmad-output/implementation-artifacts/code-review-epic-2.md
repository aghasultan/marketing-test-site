# 🔥 CODE REVIEW FINDINGS: Epic 2 (Verified Results Discovery)

**Reviewer:** BMad AI (Adversarial Mode)
**Stories Reviewed:** 2.1, 2.2, 2.3, 2.4

## 🔴 CRITICAL / HIGH ISSUES
1.  **Test Coverage Non-Existent (`src/features/case-studies/components/*`)**
    *   **Finding:** No `__tests__` directory exists for *any* components developed in Epic 2 (`BentoGrid`, `FilterBar`, `VerifiedBadge`, `ResultsSection`, `CaseStudyCard`).
    *   **Impact:** We have zero automated coverage for the core filtering mechanism, the ROI navigation logic, or the verification schemas. If a regression breaks the filters, no tests will catch it.
    *   **Recommendation:** Stop feature work. Architect a comprehensive Vitest/Testing Library suite for the `ResultsSection` and `FilterBar` state interactions immediately.

2.  **Missing Error Boundaries in Dynamic Grids (`src/features/case-studies/components/ResultsSection.tsx`)**
    *   **Finding:** The `ResultsSection.tsx` blindly maps over the `filteredStudies` state without an Error Boundary or suspense fallback wrapping the grid.
    *   **Impact:** If a single case study has malformed markup (e.g., missing metrics or broken schema), the entire `BentoGrid` will crash the React tree.
    *   **Recommendation:** Wrap the dynamic `AnimatePresence` grid layout in a targeted `ErrorBoundary`.

## 🟡 MEDIUM ISSUES
1.  **Hardcoded Search Param Logic (`src/features/results/components/MediaBuyingCalculator.tsx`)**
    *   **Finding:** The URL `preset` logic uses hardcoded `.includes('saas')` strings rather than a centralized constant mapping.
    *   **Impact:** If industries scale or get renamed in the `mockCaseStudies.ts`, the calculator presets will silently decouple.
    *   **Recommendation:** Extract the benchmark mappings to a shared constant file (`src/features/shared/benchmarks.ts`).

2.  **Potential Memory Leak in Framer Motion Layouts**
    *   **Finding:** `BentoGrid.tsx` uses `layout` on a large amount of DOM nodes inside `<AnimatePresence>`. If the dataset grows to ~50 studies, filtering will cause severe main-thread lag.
    *   **Recommendation:** Implement virtualization for the grid if data grows, or cap the filter results at 9-12 items.

## 🟢 LOW ISSUES
1.  **Missing `aria-label` on Interactive Tooltip**
    *   **Finding:** `VerifiedBadge.tsx` implements a Radix Tooltip but relies solely on visual indicators for the trigger.
    *   **Recommendation:** Add an explicit `aria-label="View verification details"` to the `TooltipTrigger` for screen readers.

2.  **Incomplete Assets (`src/features/case-studies/data/mockCaseStudies.ts`)**
    *   **Finding:** Relies strictly on mock data strings instead of connecting to a real headless CMS or markdown parser as outlined in earlier architectural specs.
    *   **Recommendation:** Technical debt acknowledged for Epic 4, but should be tracked.

---

## 🛡️ Decision Required

How should we proceed?

1.  **Fix High/Medium Issues**: I will immediately generate test suites for the filtering and calculator components, create an Error Boundary, and refactor the hardcoded strings.
2.  **Create Action Items**: Add these to the sprint backlog and move on.
3.  **Show me details**: Deep dive into specific issues such as the lack of tests.
