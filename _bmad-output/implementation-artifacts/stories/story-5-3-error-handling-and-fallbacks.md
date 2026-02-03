# Story 5.3: Error Handling & Fallbacks

## Rationale
To ensure the site feels professional ("Deep Glass" trust), we cannot show generic browser errors or crash the white screen of death.

## Tasks
- [x] 1. Branded 404 Page
    - Updated `NotFound.tsx` with Nebula background, deep glass typography, and Shadcn button.
    - Updated SEO title to "Riffat Labs".
- [x] 2. Global Error Boundary
    - Updated `ErrorBoundary.tsx` UI to match Deep Glass theme (Zinc-950/Emerald).
- [x] 3. API Error Handling
    - Verified `AuditScanner` handles `analyzeUrl` failures with Toasts (checks `results.overallScore === 0`).
    - Verified `WizardContext` fires notifications without blocking UI.
    - Verified `api/audit.ts` has timeout and safe parsing logic.
