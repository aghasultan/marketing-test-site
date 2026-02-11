# Project Documentation Index

> **Last updated:** 2026-02-11 | **Brand:** RR Labs | **Scan:** Exhaustive Rescan

### Project Overview

- **Type**: Monolith Web Application (SPA + Serverless Backend)
- **Primary Language**: TypeScript (React 18)
- **Architecture**: Component-Based SPA with Vercel Serverless Functions

### Quick Reference

- **Tech Stack**: React 18, Vite 5, Tailwind CSS 3, Framer Motion, Zustand, Nodemailer
- **Entry Point**: `src/app/main.tsx`
- **Architecture Pattern**: Feature-Based Monolith with Server-Side Functions
- **Deployment**: Vercel (auto-deploy on push to `main`)

### Generated Documentation

- [Project Overview](./project-overview.md) — Executive summary, tech stack table, architecture pattern, key features
- [Architecture](./architecture.md) — Routing, API layer, state management, design system, integrations, security
- [Source Tree Analysis](./source-tree-analysis.md) — Annotated directory tree with every file documented
- [UI Component Inventory](./ui-component-inventory.md) — 45+ components across layout, design system, features
- [API Contracts](./api-contracts.md) — `/api/contact`, `/api/audit`, `/api/og` with request/response schemas
- [Data Models](./data-models.md) — TypeScript interfaces, content schemas, Google Sheets schema
- [Development Guide](./development-guide.md) — Setup, commands, testing, adding pages/endpoints
- [Deployment Guide](./deployment-guide.md) — Vercel config, env vars, monitoring, troubleshooting

### Key Features (Current State)

| Feature | Status | Files |
|---|---|---|
| 🏠 Landing Page (Hero + Audit Scanner) | ✅ Live | `Home.tsx`, `Hero.tsx`, `AuditScanner.tsx` |
| 🔍 AI Ad Audit Tool | ✅ Live | `AuditPage.tsx`, `api/audit.ts` |
| 📊 Case Studies Grid | ✅ Live | `ResultsGrid.tsx`, `FilterBar.tsx`, case study .md files |
| 🧙 Qualification Wizard | ✅ Live | `wizard/` feature module (6 steps) |
| 📋 Application Wizard | ✅ Live | `apply/` feature module (Zustand) |
| 💼 Services Page | ✅ Live | `Scale.tsx` |
| 📝 Blog System | ✅ Live | `BlogIndex.tsx`, `BlogPost.tsx`, Markdown content |
| 📧 Contact Form + Email Backend | ✅ Live | `Contact.tsx`, `api/contact.ts` |
| 📊 Google Sheets CRM | ✅ Live | `api/contact.ts` → Apps Script webhook |
| 🟡 Partial Form Tracking | ✅ Live | `Contact.tsx` sendBeacon on page exit |
| 📨 Auto-Responder Email | ✅ Live | `api/contact.ts` (Nodemailer) |
| 🖼️ Dynamic OG Images | ✅ Live | `api/og.tsx` (Edge Runtime) |
| 🌑 Dark/Light Mode | ✅ Live | `ThemeToggle.tsx`, CSS custom properties |
| 📱 Responsive Mobile Nav | ✅ Live | `MobileNav.tsx` (Radix Sheet) |
| 🔒 Security Headers | ✅ Live | `vercel.json` (HSTS, XSS, nosniff) |
| 🧪 E2E Tests | ✅ 7 suites | Playwright test files |

### Getting Started

1. **Clone the repo**: `git clone https://github.com/aghasultan/marketing-test-site.git`
2. **Install dependencies**: `npm install`
3. **Run locally**: `npm run dev` → `http://localhost:5173/`
4. **View docs**: Start with [Project Overview](./project-overview.md) to understand the system.
