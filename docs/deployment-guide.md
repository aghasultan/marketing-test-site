# Deployment Guide

## Infrastructure
- **Platform**: Vercel
- **Framework**: Vite (React)
- **Functions**: Vercel Serverless Functions (Node.js) for `/api` routes (e.g., Audit Proxy).

## Build Pipeline
The build command has been updated to generate all static assets and verify types.

```bash
npm run build
```
**Steps Executed:**
1.  `npm run build:rss` -> Generates `public/rss.xml` from Markdown blog posts.
2.  `npm run build:sitemap` -> Generates `public/sitemap.xml` for SEO.
3.  `tsc` -> Type checking.
4.  `vite build` -> Bundles application to `dist/`.

## Vercel Configuration (`vercel.json`)
The project includes a `vercel.json` file that handles:
- **Security Headers**: HSTS, X-Frame-Options, X-Content-Type-Options.
- **Caching**: Immutable caching for hashed assets in `/assets/`, no-cache for HTML.
- **Rewrites**: SPA fallback to `index.html`.
- **Functions**: Memory optimization for API routes.

## Environment Variables
Ensure these variables are set in Vercel Project Settings:

| Variable | Description | Required | try Defaults |
|----------|-------------|----------|--------------|
| `VITE_API_URL` | Base URL for API calls | No | `/api` |
| `admin_email` | For Wizard lead notifications (future) | No | - |

## DNS & Domains
- **Production**: `riffatlabs.com`
- **Redirects**: Ensure `www` redirects to root (handled by Vercel default).
