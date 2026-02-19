# Project Documentation Index

> **Last updated**: 2026-02-19 | **Brand**: Riffat Labs | **Scan**: Deep Rescan

### Project Overview

- **Type**: Monolith Web Application (SPA + Serverless Backend)
- **Primary Language**: TypeScript (React 18)
- **Architecture**: Feature-Based Monolith with Vercel Serverless Functions

### Quick Reference

- **Tech Stack**: React 18, Vite 5, Tailwind CSS 3, Framer Motion, Zustand, Nodemailer
- **Entry Point**: `src/app/main.tsx` (Inferred via Vite)
- **Architecture Pattern**: Hybrid SPA (Client-Side Routing + Serverless API)
- **Deployment**: Vercel (CD via `main`)

### Generated Documentation

- [Project Overview](./project-overview.md) — Executive summary, key features, tech stack detail
- [Architecture](./architecture.md) — System design, data flow, integration patterns
- [Source Tree Analysis](./source-tree-analysis.md) — Annotated directory structure and critical folders
- [UI Component Inventory](./ui-component-inventory.md) — Catalog of UI primitives, layout components, and features
- [API Contracts](./api-contracts.md) — Serverless function endpoints (`/api/contact`, `/api/audit`)
- [Data Models](./data-models.md) — TypeScript interfaces, Zod schemas, and state definitions
- [Development Guide](./development-guide.md) — Setup, commands, testing, adding new features
- [Deployment Guide](./deployment-guide.md) — Vercel configuration, environment variables, CI/CD pipeline

### Key Features (Current State)

| Feature | Status | Files |
|---|---|---|
| 🏠 Landing Page (Hero + Audit Scanner) | ✅ Live | `Home.tsx`, `Hero.tsx`, `AuditScanner.tsx` |
| 🔍 AI Ad Audit Tool | ✅ Live | `AuditPage.tsx`, `api/audit.ts` |
| 📊 Case Studies Grid | ✅ Live | `ResultsGrid.tsx`, `FilterBar.tsx`, case study .md files |
| 🧙 Qualification Wizard | ✅ Live | `wizard/` feature module (State Machine) |
| 📋 Application Wizard | ✅ Live | `apply/` feature module (Zustand Store) |
| 💼 Services Page | ✅ Live | `Scale.tsx` |
| 📝 Blog System | ✅ Live | `BlogIndex.tsx`, `BlogPost.tsx`, Markdown content |
| 📧 Contact Form + Email Backend | ✅ Live | `Contact.tsx`, `api/contact.ts` (Nodemailer) |
| 📊 Google Sheets CRM | ✅ Live | `api/contact.ts` → Apps Script Webhook |
| 🟡 Partial Form Tracking | ✅ Live | `Contact.tsx` (Beacon API) |
| 📨 Auto-Responder Email | ✅ Live | `api/contact.ts` (Nodemailer) |
| 📬 Newsletter Subscription | ✅ Live | `api/subscribe.ts`, `Footer.tsx` |
| 🖼️ Dynamic OG Images | ✅ Live | `api/og.tsx` (Vercel Edge) |
| 🌑 Dark/Light Mode | ✅ Live | `ThemeToggle.tsx`, CSS Variables |
| 📱 Responsive Mobile Nav | ✅ Live | `MobileNav.tsx` (Radix Sheet) |
| 🔒 Security Headers | ✅ Live | `vercel.json` (HSTS, XSS, nosniff) |
| 🧪 E2E Tests | ✅ 7 suites | Playwright test files |

### Getting Started

1. **Clone the repo**: `git clone https://github.com/aghasultan/marketing-test-site.git`
2. **Install dependencies**: `npm install`
3. **Run locally**: `npm run dev` → `http://localhost:5173/`
4. **View docs**: Start with [Project Overview](./project-overview.md) to understand the system.
