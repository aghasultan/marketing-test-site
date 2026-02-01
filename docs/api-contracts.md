# API Contracts

## Service: Audit Service (`/api/audit`)

**Status**: External / Serverless Function
**Client**: `src/lib/services/auditService.ts`

### POST /api/audit
Performs a technical audit of the provided URL by fetching the page content and analyzing meta tags and scripts.

**Request:**
```json
{
  "url": "https://example.com"
}
```

**Response (Success - 200)**:
```json
{
  "success": true,
  "url": "https://example.com",
  "status": 200,
  "html": "<!DOCTYPE html>...",
  "headers": {
    "content-type": "text/html"
  },
  "meta": {
    "title": "Example Domain",
    "description": "..."
  }
}
```

**Client-Side Transforms**:
The client transforms this raw proxy response into an `AuditResult` object containing scores for Pixel, SEO, and Speed.
