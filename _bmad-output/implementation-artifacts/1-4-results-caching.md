# Story 1.4: Results Caching

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a high-intent user,
I want my audit results to be cached locally during my session,
So that if I navigate away and back, the system doesn't waste time re-fetching my site data.

## Acceptance Criteria

1. **Given** the user has already audited a specific URL
   **When** they attempt to audit the same URL again within the same session
   **Then** the system must retrieve the results from the `TanStack Query` cache
2. **And** it must bypass the network call entirely and display the result instantly.

## Tasks / Subtasks

- [x] Task 1: Integrate TanStack Query (AC: 1)
  - [x] Wrap the `App` component or relevant high-level provider tree with `QueryClientProvider` if not already done.
  - [x] Implement a custom hook (e.g., `useAuditMutation` or `useAuditQuery`) in `src/features/audit-tool/api/useAudit.ts`.
- [x] Task 2: Implement Caching Logic (AC: 1, 2)
  - [x] Configure the query/mutation to use the parsed URL as the cache key.
  - [x] Adjust `AuditHero.tsx` to utilize this hook instead of raw `fetch()`.
  - [x] Ensure the UI bypasses the "Scanning" delay and transitions instantly to "Complete" when retrieving from cache.
  - [x] Update tests to mock the caching layer validation.

## Dev Notes

- **Technical Stack:** React, `@tanstack/react-query` v5.
- **Provider Setup:** Check `src/App.tsx` or `src/main.tsx` for existing `QueryClientProvider`. If missing, add it with a default standard `staleTime` (e.g., 5 minutes or session length).
- **Hook Design:** A `useMutation` is typically used for POST requests. However, since the endpoint is idempotent from the client's perspective, we could write a custom hook that wraps a `useQuery` with `enabled: false` that is manually triggered, OR just maintain a local map in a `useMutation` wrapper. Because TanStack Query `useMutation` doesn't cache responses by default like `useQuery`, the best approach for caching a POST request result is to manually set the query cache via `queryClient.setQueryData(['audit', url], result)` within the mutation's `onSuccess` block, and then check `queryClient.getQueryData(['audit', url])` before executing the mutation block to bypass network calls.

### File List
- src/app/App.tsx
- src/features/audit-tool/api/useAudit.ts
- src/features/audit-tool/components/AuditHero.tsx
- src/features/audit-tool/components/__tests__/AuditHero.test.tsx
