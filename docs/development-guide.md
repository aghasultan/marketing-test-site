# Development Guide

> **Stack**: React 18, Vite, TypeScript

## Prerequisites
- **Node.js**: v18+ (Required for Vercel Functions)
- **PackageManager**: npm v9+

## 1. Installation

```bash
git clone https://github.com/aghasultan/marketing-test-site.git
cd marketing-test-site
npm install
```

## 2. Configuration (`.env.local`)
Create a `.env.local` file in the root for API functionality.

```bash
# Email Integration (Nodemailer - Gmail SMTP)
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=your_app_password

# CRM Integration (Google Sheets Webhook)
GOOGLE_SHEETS_URL=https://script.google.com/macros/s/xxx/exec
```

## 3. Running Locally

```bash
npm run dev
# Starts Vite server → http://localhost:5173
```

> **Note**: API functions (`/api/*`) are handled by Vite's proxy during dev or require `vercel dev` to emulate the serverless backend.

## 4. Building for Production

```bash
npm run build
# Runs: build:rss → build:sitemap → tsc → vite build
```

This generates:
- `dist/`: Static assets
- `public/rss.xml`: RSS Feed (from markdown content)
- `public/sitemap.xml`: Sitemap (including dynamic blog routes)

## 5. Testing

### End-to-End Tests (Playwright)
```bash
npm run test  # Runs all E2E tests
```

### Linting & Formatting
```bash
npm run lint  # Check code quality
npm run format # Format with Prettier
```

## Adding a New Page
1. Create page component in `src/pages/NewPage.tsx`.
2. Add route in `src/App.tsx`.
3. Add link in `src/components/layout/Header.tsx` (if needed).
4. Update `scripts/generate-sitemap.ts` if static route.
