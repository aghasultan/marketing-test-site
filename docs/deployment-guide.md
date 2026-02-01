# Deployment Guide

## Infrastructure
- **Platform**: Vercel (Recommended/Implied)
- **Runtime**: Static / Edge (for Vite SPA)

## Configuration
- **Vite Config**: `base: '/'` ensures correct asset paths on Vercel.
- **Build Output**: `dist/` directory is the deployment artifact.

## Pipeline
1.  **Trigger**: Git push to `main` branch.
2.  **Build**: `npm run build`
    - Generates RSS feeds (`scripts/generate-rss.ts`)
    - Compiles TypeScript
    - Bundles via Vite
3.  **Deploy**: Static files from `dist/` served via Vercel CDN.

## Environment Variables
Ensure the following variables are set in the deployment environment:
- `VITE_API_URL` (if applicable for external API)
- `NEXT_PUBLIC_ANALYTICS_ID` (if using Vercel Analytics)
