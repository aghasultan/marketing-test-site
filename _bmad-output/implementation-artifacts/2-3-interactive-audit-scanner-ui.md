# Story 2.3: Interactive Audit Scanner UI

Status: in-progress

## Story

As a User,
I want to see a visual indication that work is happening,
so that I feel the "Magic" of the AI tool analyzing my site.

## Acceptance Criteria

1.  **Given** the Hero section
    **When** I see the audit input
    **Then** it should accept a URL (validating format).
    **And** allow submission via Enter key or Button click.

2.  **Given** I submit a URL
    **When** the analysis begins
    **Then** the UI should transition to a specific "Scanning" state (input disabled/hidden).
    **And** show a progress indicator (pulse, bar, or spinner).
    **And** cycle through status messages: "Connecting to server...", "Scanning HTML structure...", "Analyzing pixel configuration...".

3.  **Given** the scan completes
    **When** the results are ready
    **Then** the scanner should transition to a "Complete" state (or trigger the Results reveal - Story 2.4).
    **And** if an error occurs, it should show a toast notification and reset the form.

4.  **Given** the design system
    **When** rendering the scanner
    **Then** it must use the `.glass-panel` style and `Inter Tight` font.
    **And** be fully responsive on mobile.

## Tasks / Subtasks

- [x] **Task 1: Scanner Component Structure**
    - [x] Create `src/features/audit/components/AuditScanner.tsx`.
    - [x] Implement the initial "Input State".
    - [x] Use `react-hook-form` and `zod` for URL validation.

- [x] **Task 2: Scanning Animation State**
    - [x] Implement the "Scanning State" with Framer Motion.
    - [x] Create a `ScanProgress` component that cycles through messages.
    - [x] Add a visual "Radar/Scanner" effect (optional but recommended for "Magic").

- [x] **Task 3: Integration with Audit Service**
    - [x] Connect `AuditScanner` to `auditService.analyzeUrl`.
    - [x] Handle loading and error states.

- [x] **Task 4: Hero Integration**
    - [x] Replace the placeholder in `Hero.tsx` with the real `AuditScanner`.
    - [x] Remove the old mock input code from Hero.

- [x] **Task 5: Verification**
    - [x] Verify animations are smooth.
    - [x] Verify validation works (rejects non-URL).
    - [x] Verify error handling (simulated network fail).

## Dev Notes

### Architecture Patterns
- **Feature Modules:** This belongs in `src/features/audit` as it's a domain-specific complex feature.
- **State Management:** Local state (`useState` or small `useReducer`) is sufficient for the scanner phases (Idle -> Scanning -> Complete).

### References
- [Epic 2: The No-Click Audit Engine](_bmad-output/planning-artifacts/epics.md#epic-2-the-no-click-audit-engine)
