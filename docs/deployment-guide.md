# Deployment Guide

> **Platform**: Vercel
> **Type**: Static SPA + Serverless Backend

## 1. Vercel Configuration (`vercel.json`)
The project includes a `vercel.json` for optimal performance and security:

- **Security Headers**: HSTS, XSS Protection, Frame Options.
- **Rewrites**: Handles SPA routing (`/((?!api/).*)` → `/index.html`).
- **Function Config**: Optimized memory (1024MB) and timeout (10s) for `/api/*.ts` routes.

## 2. Environment Variables
Configure these secrets in the Vercel Dashboard → **Settings** → **Environment Variables**:

| Variable | Description |
|---|---|
| `GMAIL_USER` | Email address for Nodemailer (SMTP) - Sends notifications. |
| `GMAIL_APP_PASSWORD` | App Password generated for the Gmail account. |
| `GOOGLE_SHEETS_URL` | Apps Script Webhook URL for CRM logging. |

## 3. Automated Deployment (CD)
> Trigger: Push to `main` branch.

### Build Command
Vercel executes:
```bash
npm install && npm run build
```
This triggers:
1. `npm run build:rss` (Generate RSS feed from Markdown)
2. `npm run build:sitemap` (Generate Sitemap)
3. `tsc` (Type Checking)
4. `vite build` (Static Asset Bundling)

### Output Directory
Set strictly to:
> **Output Directory**: `dist`

## 4. Verification
After deployment, verify functionality:
1. **Contact Form**: Submit a test lead → Check email and Google Sheet.
2. **Audit Tool**: Ensure scan runs within 10s (Vercel timeout).
3. **OG Images**: Check generated meta images on social sharing.
