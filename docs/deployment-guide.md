# RR Labs — Deployment Guide

## Platform

**Vercel** — Git-based deployments triggered on push to `main`.

**Repository:** `github.com/aghasultan/marketing-test-site`

---

## Deployment Flow

```
git push origin main
    │
    ▼
┌─────────────────────────────┐
│ Vercel Build Pipeline       │
│                             │
│ 1. npm install              │
│ 2. npm run build            │
│    ├── generate-rss.ts      │
│    ├── generate-sitemap.ts  │
│    ├── tsc (type check)     │
│    └── vite build → dist/   │
│ 3. Deploy dist/ as static   │
│ 4. Deploy api/ as functions │
└─────────────────────────────┘
```

---

## Vercel Configuration (`vercel.json`)

### Security Headers
Applied to all routes (`/(.*)`):
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`

### Caching
- `/assets/*` → `public, max-age=31536000, immutable` (Vite fingerprinted assets)
- `/*.html` → `public, max-age=0, must-revalidate` (always fresh)

### SPA Routing
```json
{ "source": "/((?!api/).*)", "destination": "/index.html" }
```
All non-API routes rewrite to `index.html` for client-side routing.

### Serverless Functions
```json
{ "api/*.ts": { "memory": 1024, "maxDuration": 10 } }
```

---

## Environment Variables

Set in **Vercel Dashboard → Settings → Environment Variables**:

| Variable | Scope | Required | Description |
|---|---|---|---|
| `GMAIL_USER` | Production | Yes (for email) | Gmail sender: `nesser111@gmail.com` |
| `GMAIL_APP_PASSWORD` | Production | Yes (for email) | 16-char App Password (requires 2FA) |
| `GOOGLE_SHEETS_URL` | Production | Optional | Google Apps Script web app URL |

### Setting Up Gmail App Password

1. Go to [Google Account → App Passwords](https://myaccount.google.com/apppasswords)
2. 2FA must be enabled
3. Generate a password for "Mail"
4. Copy the 16-character password
5. Add as `GMAIL_APP_PASSWORD` in Vercel

### Setting Up Google Sheets CRM

1. Create a Google Sheet with columns: Timestamp, Type, Name, Email, Company, Budget, Services, Message, Fields Interacted, Time on Page
2. Open Extensions → Apps Script
3. Deploy the `doPost` handler (see implementation plan)
4. Copy the Web App URL
5. Add as `GOOGLE_SHEETS_URL` in Vercel

---

## Static Assets

### SEO Files
| File | Purpose | Generated |
|---|---|---|
| `robots.txt` | Search engine directives | Manual |
| `sitemap.xml` | URL listing for crawlers | Auto (build:sitemap) |
| `public/rss.xml` | RSS feed | Auto (build:rss) |

### Fallback Pages
| File | Purpose |
|---|---|
| `404.html` | Static 404 for non-SPA pre-render scenarios |
| `index.html` | SPA entry (Vite-managed) |

---

## Monitoring

- **Vercel Analytics** — Automatically tracks page views and Web Vitals
- **Vercel Speed Insights** — Core Web Vitals monitoring in production
- **Function Logs** — Vercel Dashboard → Logs → Filter by function name
- **GTM dataLayer** — Custom events pushed for wizard steps, audit scans, calculator interactions

---

## Troubleshooting

### SPA Routes Return 404
- Ensure `vercel.json` has the catch-all rewrite: `/((?!api/).*)` → `/index.html`
- Check that the 404.html static fallback exists

### Emails Not Sending
- Check `GMAIL_USER` and `GMAIL_APP_PASSWORD` are set in Vercel env vars
- Verify 2FA is enabled on the Google account
- Check Vercel function logs for `nodemailer` errors

### Google Sheets Not Logging
- Verify `GOOGLE_SHEETS_URL` is set
- Check the Apps Script `doPost` deployment is "Anyone" access
- Check Vercel function logs for `Google Sheets log status:` output
- Ensure Apps Script handles `text/plain` content type
