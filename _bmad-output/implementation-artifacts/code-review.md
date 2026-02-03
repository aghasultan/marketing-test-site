# 🔥 CODE REVIEW FINDINGS: Epic 5

**Reviewer:** BMad AI (Adversarial Mode)
**Stories Reviewed:** 5.1, 5.2, 5.3, 5.4

## 🔴 CRITICAL / HIGH ISSUES
1.  **Test Coverage Regression (`tests/header.spec.ts` DELETED)**
    *   **Finding:** The header test suite was deleted to solve flakiness.
    *   **Impact:** We have zero automated coverage for the Navigation, Mobile Menu, and "Start Audit" button.
    *   **Recommendation:** Restore the test and fix the locator stability (use `testId` or robust attributes), or implement a simpler "smoke test".

## 🟡 MEDIUM ISSUES
1.  **Technical Debt in Router (`src/app/router.tsx`)**
    *   **Finding:** Line 43: `{/* Hacky close handling for now... */}`. The Wizard modal is overlaid in the Router with a manual style tag and an absolute button.
    *   **Impact:** Hard to maintain, violates React composition patterns, Z-index wars managed manually.
    *   **Recommendation:** Move Wizard rendering into a `Layout` context or uses a proper Modal component with `onClose` prop.
2.  **Type Safety in API (`api/audit.ts`)**
    *   **Finding:** Logic relies on `(arr as any).code` for error handling.
    *   **Impact:** Potential runtime errors if error shape changes.
    *   **Recommendation:** Define a proper `AxiosError` type guard.

## 🟢 LOW ISSUES
1.  **Incomplete Assets (`src/pages/Home.tsx`)**
    *   **Finding:** Line 215: `TODO: Add about image`. currently uses a placeholder div.
    *   **Recommendation:** Add a real image or remove the TODO before valid production launch.

---

## 🛡️ Decision Required

How should we proceed?

1.  **Fix High/Medium Issues**: I will restore/fix the Header test and refactor the Router/Wizard logic.
2.  **Defer**: Create tasks in the backlog and mark Epic as Done (Accept Technical Debt).
3.  **Discuss**: Explain why the Router hack is necessary.
