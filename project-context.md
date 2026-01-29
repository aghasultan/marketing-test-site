# Project Context: Marketing Test Site (React Migration)

**Status:** Implementation / Migration (React Rewrite)
**Type:** Single Page Application (SPA)
**Repository:** aghasultan/marketing-test-site

## Tech Stack
- **Framework:** React 18 + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Framer Motion
- **Routing:** React Router DOM v6+
- **Content:** Markdown (parsed via gray-matter + react-markdown)
- **State:** Local React State + React Hook Form
- **Testing:** Playwright
- **Deployment:** Vercel

## Architecture
- **Entry Point:** `src/main.tsx` -> `src/App.tsx`
- **Routing:** Client-side routing defined in `src/App.tsx`.
- **Content Strategy:** Blog posts are stored as MD files in `src/content/blog/` and loaded dynamically.

## Domain & Services
- **Core Offerings:** Performance Paid Media (Meta/Google/TikTok Ads), Lead Gen, Sales Ads.
- **Specialization:** Analytics Engineering (CAPI, Server-side tracking) & Marketing Automation (GoHighLevel workflows).
- **Value Prop:** "Turning ad spend into profit" / 7-figure budget scaling.

## Key Features & Components
1.  **ROI Calculator:** Interactive React component in `Home.tsx` (Lead Magnet).
2.  **Bento Grid:** CSS Grid implementation using Tailwind classes for visual authority.
3.  **Wizard Form:** Multi-step application form (`src/components/ui/Wizard.tsx`) for qualifying leads.
4.  **SEO:** Managed per-page via `SEO.tsx` component (using `react-helmet-async`).

## Business Rules
- **Conversion Goal:** Drive traffic to `/scale` -> `/apply`.
- **Branding:** "Riffat Labs" / "Agha Sultan Naseer".
- **Performance:** High priority on Core Web Vitals (crucial for Ad Quality Score).