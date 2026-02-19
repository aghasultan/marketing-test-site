# Source Tree Analysis

> **Root Path**: `/Users/sultan/Desktop/marketing-test-site` (Monolith SPA)

## Directory Structure

```plaintext
/
├── api/                     # Vercel Serverless Functions (Backend)
│   ├── audit.ts             # scraper endpoints
│   ├── contact.ts           # email/crm endpoints
│   └── og.tsx               # OG image generator
├── src/                     # React Frontend Source
│   ├── app/                 # Application Entry
│   ├── assets/              # Static Assets
│   ├── components/          # Reusable UI Components
│   │   ├── layout/          # Page Layouts (Header, Footer, Hero)
│   │   ├── ui/              # Design System Primitives (Button, Input, Sheet)
│   │   └── seo/             # Meta tags components
│   ├── content/             # Markdown Content (CMS)
│   ├── data/                # Static Data Files
│   ├── features/            # Business Logic Domains
│   │   ├── apply/           # Application Wizard Store & Logic
│   │   ├── audit/           # Audit Tool Features
│   │   ├── results/         # Case Study Grid Logic
│   │   └── wizard/          # Multi-step Form Engine
│   ├── hooks/               # Custom React Hooks
│   ├── lib/                 # Utilities (cn, fetchers)
│   ├── locales/             # i18n Translations
│   ├── pages/               # Route Components (Home, Scale, Contact)
│   ├── server/              # Server-side Utilities (if any)
│   └── services/            # API Client Services
├── public/                  # Static Files (Favicons, Robots.txt)
└── [Config Files]           # vite.config.ts, tailwind.config.js, etc.
```

## Critical Directories

### `api/` (Serverless Backend)
Standalone Node.js functions deployed to Vercel. Handles sensitive logic like emailing (`nodemailer`), CRM logging (`Google Sheets`), and scraping (`cheerio`).
- **Entry Points**: `contact.ts` (POST), `audit.ts` (POST), `og.tsx` (GET).

### `src/features/` (Domain Logic)
Encapsulates complex business logic.
- **apply/**: Contains the global application state (Zustand store), types, and specific UI components for the "Apply Now" flow.
- **wizard/**: Generic wizard engine with step management and history stack.
- **audit/**: Client-side logic for the audit tool interaction.

### `src/components/ui/` (Design System)
Base UI primitives built with Tailwind CSS and Radix UI.
- Key Components: `Button`, `Input`, `Sheet`, `Toast`, `AnimatedBackground`.

### `src/pages/` (Routes)
Top-level route components mapped in `App.tsx` (or `main.tsx`).
- `Home.tsx`: Landing page.
- `Scale.tsx`: Services page.
- `AuditPage.tsx`: Tool page.
- `Contact.tsx`: Contact form page.
