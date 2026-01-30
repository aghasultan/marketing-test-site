# API Contracts

**Generated:** 2026-01-30

## Edge Functions

### `GET /api/og`

Dynamically generates Open Graph social preview images.

- **File:** `api/og.tsx`
- **Infrastructure:** Vercel Edge Function
- **Response Content-Type:** `image/png`

#### Query Parameters

| Parameter | Type | Required | Description | Default |
| :--- | :--- | :--- | :--- | :--- |
| `title` | string | No | The headline text to display. | "Riffat Labs" |
| `description` | string | No | The subtext to display. | "Premium Marketing Solutions" |

#### Logic
1.  Extracts `title` and `description` from query params.
2.  Truncates length to 100 characters for safety.
3.  Renders a React component to an image buffer using `@vercel/og` (`satori` engine).
4.  Returns the binary image data.

---

## Mock Services

### `auditService`

- **Function:** `mockAnalyzeUrl(url: string)`
- **Behavior:**
    - Simulates network delay (1.5s - 3.5s).
    - Returns various static data based on heuristics mock.
    - Used by `AuditForm.tsx`.
