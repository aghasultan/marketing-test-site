# Architecture Documentation

> **Project Type**: Monolith SPA + Serverless Backend
> **Framework**: React 18 (Vite) + Vercel Functions + TypeScript

## Executive Summary
This project is a high-performance marketing agency website ("Riffat Labs") functioning as a Single Page Application (SPA). It integrates server-side capabilities via Vercel Serverless Functions for critical operations like data scraping (Audit Tool), email dispatch (SMTP), and CRM logging (Google Sheets). The architecture prioritizes client-side interactivity (Framer Motion) while offloading sensitive/heavy tasks to the backend.

## Technology Stack

| Layer | Technology | Role |
|---|---|---|
| **Frontend** | React 18, TypeScript | UI Library & Logic |
| **Build Tool** | Vite 5 | Development Server & Bundling |
| **Styling** | Tailwind CSS v3 | Utility-first Styling |
| **Animation** | Framer Motion 12 | Interaction Design |
| **State Management** | Zustand | Global State (Wizard/Apply Flow) |
| **Backend** | Vercel Serverless (Node.js) | API Endpoints (`/api/*`) |
| **Email** | Nodemailer | SMTP Transport (Gmail) |
| **Content** | Markdown (frontmatter) | Blog & Case Studies CMS |
| **Testing** | Playwright | End-to-End Testing |

## Architecture Pattern

### 1. Hybrid SPA with Serverless Backend
The application is served as a static SPA (`dist/index.html`) but relies on dynamic API routes for specific features.
- **Client-Side Routing**: Handled by `react-router-dom`.
- **Server-Side API**: Handled by Vercel (`api/*.ts`).
- **Data Flow**:
    1. Client (React) initiates request (e.g., Audit or Contact Form).
    2. Request hits Vercel Function (`/api/contact`).
    3. Function processes logic (e.g., sends email, scrapes URL).
    4. Function returns JSON response to Client.
    5. Client updates UI state (Zustand or Local State).

### 3. Feature-Based Organization
Code is organized by domain in `src/features/` rather than purely technical layers.
- **Wizard Engine**: Reusable logic in `src/features/wizard`.
- **Apply Flow**: Specific implementation in `src/features/apply`.
- **Audit Tool**: Scraper logic in `src/features/audit`.
- **Newsletter**: Subscription logic in `api/subscribe.ts` and `Footer.tsx`.

## Data Architecture

### State Management
- **Zustand**: Used for complex multi-step forms (e.g., `WizardState`).
- **React Query / Fetch**: Used for API interactions (Audit, Contact).
- **URL State**: Used for deep-linking (e.g., blog posts).

### Persisted Data
- **CRM**: Google Sheets (via Apps Script Webhook).
- **Email**: Gmail (SMTP via Nodemailer).
- **FileSystem**: Markdown files store static content (`src/content`).

## Integration Architecture
- **Nodemailer**: SMTP usage for transactional emails.
- **Google Sheets**: "Poor man's CRM" via `contact.ts`.
- **Cheerio/Axios**: Server-side scraping for Audit tool.

## Security
- **Environment Variables**: secrets (SMTP pass, Sheet URL) stored in Vercel Env Vars.
- **Headers**: Production headers configured in `vercel.json` (HSTS, XSS Protection).
- **CORS**: Configured in API functions to allow specific origins.
