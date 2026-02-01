# Deployment Guide

This project is optimized for deployment on **Vercel**, but can be hosted on any static site provider (Netlify, AWS Amplify, GitHub Pages).

## 1. Prerequisites

Ensure you have the following configured in your environment variables (Project Settings > Environment Variables):

| Variable | Description | Default / Mock |
|----------|-------------|----------------|
| `VITE_EMAIL_API_KEY` | API Key for transactional emails (e.g., Resend) | Mocked in dev |
| `VITE_CRM_API_KEY` | API Key for CRM synchronization | Mocked in dev |
| `VITE_ADMIN_EMAIL` | Email address to receive lead notifications | `admin@riffatlabs.com` |

## 2. Vercel Deployment (Recommended)

1.  **Connect GitHub**: Go to Vercel Dashboard -> Add New -> Project -> Import `marketing-test-site`.
2.  **Framework Preset**: Select **Vite**.
3.  **Build Command**: `npm run build`
    *   *Note*: This automatically triggers `npm run build:rss` to generate the RSS feed.
4.  **Output Directory**: `dist`
5.  **Deploy**: Click Deploy.

## 3. Post-Deployment Checks

After deployment is live:
1.  **RSS Feed**: Visit `/rss.xml` to ensure it renders valid XML.
2.  **Wizard Flow**: Complete the "Apply" wizard and check the Vercel Function logs (if using real backend) or console (if client-side mock).
3.  **SEO**: Verify `robots.txt` and `sitemap.xml` (if generated) are accessible.

## 4. Manual / Local Build

To build the production artifacts locally:

```bash
npm run build
```

This will output the static site to the `dist/` folder. You can preview it with:

```bash
npm run preview
```
