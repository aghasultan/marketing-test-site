# RR Labs — Project Overview

**Brand:** RR Labs (formerly Riffat Labs)
**Type:** Marketing & Lead Generation Single Page Application (SPA)
**Domain:** Paid advertising intelligence, AI-powered ad audits, and lead qualification
**URL:** Deployed on Vercel (riffatlabs.com placeholder)

---

## Executive Summary

RR Labs is a premium marketing intelligence website built for a solo media buyer / growth consultant. The site serves as the primary sales funnel — attracting prospects via a free AI ad audit tool, qualifying leads through a multi-step wizard and a contact form, and nurturing them via automated email sequences. It is designed to convey premium authority in the paid ads space while generating and tracking leads end-to-end.

---

## Tech Stack

| Category | Technology | Version | Notes |
|---|---|---|---|
| **Framework** | React | 18.x | SPA with lazy-loaded routes |
| **Language** | TypeScript | 5.9 | Strict mode |
| **Build Tool** | Vite | 5.3 | With React plugin |
| **CSS** | Tailwind CSS | 3.4 | Utility-first, custom design tokens via CSS vars |
| **Animation** | Framer Motion | 12.x | Page transitions, micro-interactions |
| **Routing** | React Router DOM | 7.x | createBrowserRouter with lazy routes |
| **State** | Zustand + React Context | 5.x | Wizard state in Context, form stores in Zustand |
| **UI Components** | Radix UI | Various | Dialog, Label, Slider, Slot, Toast, Tooltip |
| **Forms** | React Hook Form + Zod | 7.x / 3.x | Schema-validated forms |
| **SEO** | React Helmet Async | 2.x | Dynamic meta tags per page |
| **i18n** | i18next | 25.x | Multi-language support (English default) |
| **Email (Backend)** | Nodemailer | Latest | Gmail SMTP via Vercel serverless |
| **Analytics** | Vercel Analytics + GTM dataLayer | - | Custom event tracking |
| **Deployment** | Vercel | - | Serverless functions, edge OG generation |
| **Testing** | Playwright (E2E) + Vitest (Unit) | 1.49 / 4.x | 7+ E2E test suites |

---

## Architecture Pattern

**Component-Based SPA Monolith** with Vercel serverless backend functions.

- **Frontend:** React SPA with code-splitting via `React.lazy()`. Routes are lazy-loaded for performance.
- **Backend:** Three Vercel serverless functions (`/api/audit`, `/api/contact`, `/api/og`) handle external integrations.
- **State Management:** Wizard qualification flow uses React Context + `useReducer` with localStorage persistence. Contact form uses local component state with beacon-based partial tracking.
- **Styling:** Tailwind CSS with a shadcn/ui-inspired design system using HSL CSS custom properties for theming (dark/light mode via class strategy).

---

## Key Business Features

1. **AI Ad Audit Engine** — Users paste a URL, the serverless backend scrapes it, and client-side mock analysis generates a quality score.
2. **Multi-Step Qualification Wizard** — Revenue-gated wizard flow with branching logic (qualified leads vs partner referral network).
3. **Lead Contact Form** — Full-featured contact form with service selection, budget picker, and partial form tracking via `sendBeacon`.
4. **Email Automation** — Serverless Nodemailer sends notification emails to the owner + auto-reply to the lead.
5. **Google Sheets CRM** — Form submissions logged to Google Sheets via Apps Script webhook.
6. **Case Studies (Proof)** — Markdown-based case studies with verified badges and filtering.
7. **Services Page** — Detailed service offering with ROI calculator and media buying calculator.
8. **Blog** — Markdown-powered blog with gray-matter frontmatter parsing.
9. **SEO** — Dynamic OG images via Vercel Edge, schema JSON-LD, sitemap, RSS feed.

---

## Repository Structure

```
marketing-test-site/
├── api/                    # Vercel serverless functions
│   ├── audit.ts            # URL scraping + HTML extraction
│   ├── contact.ts          # Email notifications + Google Sheets CRM
│   └── og.tsx              # Dynamic OG image generation (Edge)
├── src/
│   ├── app/                # App entry, router, global styles
│   ├── components/         # Shared UI components + layout
│   ├── features/           # Feature-based modules
│   │   ├── apply/          # Application wizard (Zustand store)
│   │   ├── audit/          # Audit scanner components
│   │   ├── results/        # Case study grid, filters, calculators
│   │   └── wizard/         # Qualification wizard (Context state machine)
│   ├── pages/              # Route-level page components
│   ├── services/           # Client-side service layer (email, CRM, audit)
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilities, SEO config, tracking, design system
│   ├── data/               # Static data (case studies array)
│   ├── content/            # Markdown content (blog, case studies)
│   └── locales/            # i18n translation files
├── tests/                  # Playwright E2E test suites
├── scripts/                # Build scripts (RSS, sitemap generation)
├── public/                 # Static assets
├── docs/                   # This documentation
└── _bmad/                  # BMAD framework configuration
```

---

## Deployment

- **Host:** Vercel
- **Build:** `npm run build` (generates RSS → sitemap → TypeScript compile → Vite build)
- **Functions:** `api/*.ts` deployed as serverless (1024MB, 10s timeout)
- **SPA Routing:** `vercel.json` rewrites all non-API paths to `/index.html`
- **Security Headers:** X-Content-Type-Options, X-Frame-Options, HSTS, XSS Protection
- **Caching:** Immutable assets (`/assets/*`), revalidate HTML

---

## Environment Variables (Vercel)

| Variable | Purpose |
|---|---|
| `GMAIL_USER` | Gmail address for sending notification emails |
| `GMAIL_APP_PASSWORD` | Gmail App Password (16-char, 2FA required) |
| `GOOGLE_SHEETS_URL` | Google Apps Script Web App URL for CRM logging |
| `VITE_ADMIN_EMAIL` | (Client-side) Admin email for mock email service |
