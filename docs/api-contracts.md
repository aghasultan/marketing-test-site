# RR Labs — API Contracts

## Overview

The application exposes 3 Vercel serverless endpoints under the `/api/` path. All are TypeScript functions using `@vercel/node` (except OG which uses Edge Runtime).

**Function Configuration** (from `vercel.json`):
- Memory: 1024 MB
- Max Duration: 10 seconds

---

## `POST /api/contact`

**Purpose:** Lead capture — processes form submissions and partial form tracking data.

### Request

```typescript
// Content-Type: application/json
interface ContactPayload {
    fullName?: string;         // Lead's full name
    email?: string;            // Lead's email address
    company?: string;          // Company name
    budget?: string;           // Budget range (e.g. "$5,000 – $15,000/mo")
    services?: string[];       // Selected services: ['meta','google','tiktok','seo','full-stack']
    message?: string;          // Free-text message
    partial?: boolean;         // true = abandoned form (sendBeacon)
    fieldsInteracted?: string[]; // Fields the user touched before leaving
    timeOnPage?: number;       // Milliseconds spent on page
}
```

### Response

**Success (200):**
```json
{ "success": true }
```

**Error (405):** Method not allowed
```json
{ "error": "Method not allowed" }
```

**Error (500):** Email sending failure
```json
{ "error": "Failed to send email" }
```

### Side Effects

1. **Owner notification email** — Sent to `GMAIL_USER` with subject:
   - Full: `🟢 New Lead — John Smith ($5k-$15k/mo)`
   - Partial: `🟡 Partial Lead — john@example.com`
2. **Auto-reply email** — Sent to the lead's email (full submissions only) with branded HTML
3. **Google Sheets log** — POST to `GOOGLE_SHEETS_URL` webhook with row data

### Environment Variables Required
- `GMAIL_USER` — Gmail address (sender)
- `GMAIL_APP_PASSWORD` — Gmail App Password
- `GOOGLE_SHEETS_URL` — Google Apps Script Web App URL (optional)

---

## `POST /api/audit`

**Purpose:** URL proxy — fetches a target URL's HTML for client-side audit analysis.

### Request

```typescript
// Content-Type: application/json
{
    url: string; // Full URL to audit (e.g. "https://example.com")
}
```

### Response

**Success (200):**
```typescript
{
    success: true,
    url: string,         // Echo of requested URL
    status: number,      // HTTP status of target
    headers: object,     // Response headers from target
    html: string,        // First 500KB of HTML content
    meta: {
        title: string,       // <title> tag content
        description: string  // <meta name="description"> content
    }
}
```

**Error (400):** Missing URL
```json
{ "error": "Missing or invalid URL" }
```

**Error (405):** Method not allowed
```json
{ "error": "Method Not Allowed" }
```

**Error (502):** Failed to fetch target
```json
{ "error": "Failed to fetch target URL", "details": "..." }
```

**Error (504):** Timeout
```json
{ "error": "Target URL timed out" }
```

### Security
- 8-second timeout
- 5MB max content length
- Custom User-Agent: `RiffatLabs-AuditBot/1.0`
- CORS headers set dynamically
- Handles OPTIONS preflight

---

## `GET /api/og`

**Purpose:** Dynamic Open Graph image generation for social media previews.

**Runtime:** Vercel Edge

### Request

Query parameters:
- `title` — Image title (max 100 chars, default: "Riffat Labs")
- `description` — Image subtitle (max 100 chars, default: "Premium Marketing Solutions")

### Response

**Success (200):**
- Content-Type: `image/png`
- Dimensions: 1200 × 630
- Branded dark template with emerald gradient text

**Error (500):**
```text
Failed to generate the image
```

---

## Client-Side API Calls

### Contact Form → `/api/contact`

```typescript
// Full submission (src/pages/Contact.tsx)
const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...form, partial: false }),
});

// Partial submission (sendBeacon on page exit)
navigator.sendBeacon('/api/contact', JSON.stringify({
    ...partialData,
    partial: true,
    fieldsInteracted: [...interactedFields],
    timeOnPage: Date.now() - startTime,
}));
```

### Audit Scanner → `/api/audit`

```typescript
// src/lib/services/auditService.ts (real implementation)
const res = await fetch('/api/audit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
});
```
