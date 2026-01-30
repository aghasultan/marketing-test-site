# Deployment Guide

**Generated:** 2026-01-30

## Infrastructure

The project is designed to be deployed on **Vercel**, leveraging its specific features for optimal performance.

- **Frontend:** Deployed as a static site (SPA) to Vercel's Edge Network.
- **Backend:** `api/og.tsx` runs as a Vercel Edge Function.
- **Analytics:** `@vercel/analytics` and `@vercel/speed-insights` are integrated in `App.tsx` for real-time performance monitoring.

## Deployment Configuration (`vercel.json`)

The project includes a `vercel.json` configuration file.
*(Note: File exists but content was not explicitly read in deep dive, assumed standard SPA rewrite rules usually).*

## Continuous Deployment

1.  Push to `main` branch.
2.  Vercel automatically detects the commit.
3.  Vercel runs `npm install` and `npm run build`.
4.  If build succeeds, unique preview URL is generated (for PRs) or `main` is promoted to production.

## Environment Variables

No `.env` file was strictly required for basic scanning, but the following may be managed in Vercel Project Settings:
- `VITE_API_URL` (if external APIs are added later).
- Any analytics keys if not handled automatically by Vercel integration.
