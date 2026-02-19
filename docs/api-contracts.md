# API Contracts

> **Base URL**: `/api` (Vercel Serverless Functions)

## Endpoints

### 1. Contact Form Submission
**POST** `/api/contact`

Handles contact form submissions, sends email notifications via Nodemailer (Gmail), and logs leads to Google Sheets.

#### Request Body (`ContactPayload`)
```typescript
{
  fullName?: string;
  email?: string;
  company?: string;
  budget?: string;
  services?: string[]; // e.g., ['meta', 'seo']
  message?: string;
  partial?: boolean;   // true if abandoned form
  fieldsInteracted?: string[]; // List of touched fields (for partials)
  timeOnPage?: number; // Time in ms
}
```

#### Response
**Success (200 OK)**
```json
{
  "success": true
}
```

**Error (400 Bad Request)**
```json
{
  "error": "At least name or email required"
}
```

**Error (500 Internal Server Error)**
```json
{
  "error": "Failed to send email"
}
```

---

### 2. Audit Scanner
**POST** `/api/audit`

Scrapes a target URL to extract HTML, metadata, and HTTP status for the client-side audit analysis. Used by the "No-Click Audit" feature.

#### Request Body
```json
{
  "url": "https://example.com"
}
```

#### Response
**Success (200 OK)**
```json
{
  "success": true,
  "url": "https://example.com",
  "status": 200,
  "headers": { ... },
  "html": "<!DOCTYPE html>...", // Truncated to 500KB
  "meta": {
    "title": "Example Domain",
    "description": "..."
  }
}
```

**Error (400 Bad Request)**
```json
{
  "error": "Missing or invalid URL"
}
```

**Error (502 Bad Gateway)**
```json
{
  "error": "Failed to fetch target URL",
  "details": "..."
}
```

---

### 3. Open Graph Image Generator
**GET** `/api/og`

Dynamically generates Open Graph images for shared links using `@vercel/og` (Edge Runtime).

#### Query Parameters
- `title`: Title text to display on the image.

#### Response
Returns an image (image/png).

---

### 4. Newsletter Subscription
**POST** `/api/subscribe`

Handles newsletter subscriptions. Sends an admin notification and a welcome email to the subscriber in parallel. Logs the subscription to Google Sheets.

#### Request Body
```typescript
{
  email: string;
}
```

#### Response
**Success (200 OK)**
```json
{
  "success": true
}
```

**Error (400 Bad Request)**
```json
{
  "error": "Valid email required"
}
```

**Error (500 Internal Server Error)**
```json
{
  "error": "Failed to process subscription"
}
```
