---
stepsCompleted: ['step-01-validate-prerequisites', 'step-02-design-epics', 'step-03-create-stories', 'step-04-final-validation']
inputDocuments:
  - '_bmad-output/planning-artifacts/prd.md'
  - '_bmad-output/planning-artifacts/architecture.md'
  - '_bmad-output/planning-artifacts/ux-design-specification.md'
---

# marketing-test-site - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for marketing-test-site, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: User can view a grid of Case Studies filtering by Industry and Ad Spend.
FR2: User can see a "Verified" badge on Case Studies that meet `ClaimReview` criteria.
FR3: User can view 'ClaimReview' verification data via a tooltip interaction.
FR4: User can navigate to the ROI Calculator directly from a relevant Case Study.
FR5: User can input a target URL in the Hero section for instant analysis.
FR6: System can perform real-time checks for Page Speed (TTFB), Meta Pixel presence, and basic SEO tags.
FR7: User can receive immediate Pass/Fail feedback on the 3 audit criteria without page reload.
FR8: System can cache audit results to prevent duplicate API calls for the same URL.
FR9: User can input business metrics (Revenue, CAC, LTV) in a multi-step form.
FR10: System can persist user progress locally to prevents data loss on refresh.
FR11: System can conditionally route users to a "Partner Network" path if Revenue < $1M.
FR12: System can conditionally route users to a "Booking Calendar" path if Revenue > $1M.
FR13: User can download a "Growth Roadmap" PDF if disqualified (Soft Landing).
FR14: Internal User can publish Case Studies via Markdown files.
FR15: System can automatically generate `ClaimReview` JSON-LD from Markdown frontmatter.
FR16: System can validate Schema integrity at build time and fail the build if invalid.
FR17: System can render unique Meta Titles/Descriptions for every dynamic route.
FR18: System can lazy-load non-critical assets to prioritize LCP.

### NonFunctional Requirements

NFR1 (Load Time): Largest Contentful Paint (LCP) must be < 0.8 seconds on 4G networks.
NFR2 (Responsiveness): Interaction to Next Paint (INP) must be < 200ms to ensure the Wizard feels "app-like".
NFR3 (Bundle Budget): Initial JS payload must not exceed 100KB (gzipped).
NFR4 (Standards): System must pass automated WCAG 2.1 AA scans (zero critical violations).
NFR5 (Keyboard): All interactive elements (Wizard inputs, Tooltips) must be fully navigable via keyboard.
NFR6 (Motion): UI must respect `prefers-reduced-motion` media queries.
NFR7 (Schema Validity): 100% of "Case Study" pages must pass Google's Rich Results Test for `ClaimReview`.
NFR8 (Meta Accuracy): Social preview images (OG:Image) must generate dynamically for shared Audit results.
NFR9 (Audit Availability): The "No-Click Audit" service must have 99.9% uptime (with Serverless fallback strategy).

### Additional Requirements

**Architecture Constraints:**
- **Starter Template**: `npm create vite@latest marketing-test-site -- --template react-ts` (Clean Slate).
- **Core Stack**: React 18, Vite, React Router v7.13, Framer Motion 12.
- **Styling**: Tailwind CSS configured with "Glassmorphism" utility classes and `zinc-950` dark theme.
- **Data Strategy**: Local Markdown Files (`src/content/`) with Zod schema validation.
- **API Architecture**: Serverless Proxy (Vercel Functions) for "No-Click Audit" to bypass CORS.
- **State Management**: React Context for UI, TanStack Query v5 for server data, xstate/useReducer for Wizard logic.
- **Deployment**: Vercel with GitHub Actions CI/CD.

**UX & Design Requirements:**
- **Aesthetic**: "Deep Glass" Theme (Dark Mode #09090b, Blue/Gold accents, heavy backdrop-blur).
- **Primary Interaction**: "No-Click Audit" visualization (1.5s scan animation loop).
- **Layout**: Mobile-First "Thumb-Zone" design; "Bento Grid" for desktop case studies.
- **Typography**: Inter Tight (Headlines) + JetBrains Mono (Data/Technical).
- **Accessibility**: High contrast white text on glass; clear focus rings (blue-500); graceful degradation for reduced motion.
- **Component System**: Custom Shadcn UI implementation (manually installed to avoid bloat).

### FR Coverage Map

FR1: Epic 3 - Case Study Grid Visualization
FR2: Epic 3 - Verified Badges
FR3: Epic 3 - Schema Tooltips
FR4: Epic 3 - ROI Calculator Link
FR5: Epic 2 - Audit Input & Hook
FR6: Epic 2 - Real-time Analysis Logic
FR7: Epic 2 - Immediate Feedback UI
FR8: Epic 2 - Result Caching
FR9: Epic 4 - Wizard Input Steps
FR10: Epic 4 - Progress Persistence
FR11: Epic 4 - Logic Routing (Disqualification)
FR12: Epic 4 - Logic Routing (Qualification)
FR13: Epic 4 - PDF Download
FR14: Epic 3 - Content Publication Flow
FR15: Epic 3 - JSON-LD Generation
FR16: Epic 3 - Schema Validation
FR17: Epic 1 - Dynamic Metadata
FR18: Epic 1 - Lazy Loading Foundation

## Epic List

### Epic 1: High-Performance Foundation & Branding
Establish the "Deep Glass" aesthetic, project structure, and core layout so that all future features have a polished home.
**FRs covered:** FR17, FR18, NFR1-6

### Epic 2: No-Click Audit Engine
Build the immediate value delivery system that analyzes user URLs and hooks them into the funnel.
**FRs covered:** FR5, FR6, FR7, FR8, NFR9

### Epic 3: Verification & Results System
Convert the "Hooked" user into a "Believer" by showing verified proofs via Case Studies and Claims.
**FRs covered:** FR1, FR2, FR3, FR4, FR14, FR15, FR16, NFR7

### Epic 4: Smart Qualification Wizard
Capture high-intent leads that pass the trust threshold using advanced conditional logic.
**FRs covered:** FR9, FR10, FR11, FR12, FR13, NFR2

{{epics_list}}

## Epic 1: High-Performance Foundation & Branding

Establish the "Deep Glass" aesthetic, project structure, and core layout so that all future features have a polished home.

### Story 1.1: Project Initialization & Architecture Setup

As a Developer,
I want to initialize the project with Vite, React 18, and Tailwind,
So that I have a clean, high-performance foundation.

**Acceptance Criteria:**

**Given** a clean directory
**When** I run the initialization commands
**Then** a React 18 + TypeScript + Vite project is created
**And** the file structure matches the Architectural Decision (`src/features`, `src/content`)
**And** `pnpm dev` starts the server without errors

### Story 1.2: Design System & Glassmorphism Implementation

As a Designer,
I want to implement the "Deep Glass" theme tokens and atomic components,
So that the UI looks premium and consistent.

**Acceptance Criteria:**

**Given** the Tailwind configuration
**When** I load the app
**Then** the background is `zinc-950` (#09090b)
**And** I can use the `.glass` utility class to see `backdrop-blur-xl` and `bg-white/5`
**And** Shadcn UI components (Button, Input) use the custom dark theme

### Story 1.3: Core Layout & Navigation

As a User,
I want to navigate between pages using a responsive layout,
So that I can access the site on Mobile and Desktop.

**Acceptance Criteria:**

**Given** I am on the Homepage
**When** I resize the window to Mobile width (<640px)
**Then** the Header navigation collapses into a "Sheet" or Hamburger menu
**And** I can navigate to `/audit` and `/case-studies` using React Router 7
**And** the Layout wrapper persists across route changes

### Story 1.4: SEO & Performance Foundations

As a Developer,
I want to implement dynamic meta tags and lazy loading,
So that the site ranks well and loads fast.

**Acceptance Criteria:**

**Given** I navigate to a new route
**When** I inspect the `<head>`
**Then** the `<title>` and `<meta name="description">` update dynamically
**And** non-critical routes are code-split (verified via Network tab)

## Epic 2: The No-Click Audit Engine

Build the immediate value delivery system that analyzes user URLs and hooks them into the funnel.

### Story 2.1: Audit API Proxy Service

As a Developer,
I want to create a secure API proxy,
So that I can fetch external website data without CORS errors.

**Acceptance Criteria:**

**Given** the serverless function template
**When** I make a `GET /api/audit?url=example.com` request
**Then** the server fetches the HTML of the target URL
**And** the response returns JSON including status 200 and html content
**And** it handles invalid URLs with a 400 Bad Request

### Story 2.2: Audit Analysis Logic & Caching

As a Developer,
I want to implement the logic to detect Pixels, Speed, and SEO tags,
So that I can return a Pass/Fail score.

**Acceptance Criteria:**

**Given** I have the HTML content of a target site
**When** the analysis function runs
**Then** it detects if `fbq` (Meta Pixel) exists
**And** it checks if `<title>` and `<meta description>` exist
**And** it reports the TTFB (speed)
**And** the result is cached for the same URL (via TanStack Query or server cache)

### Story 2.3: Audit Hero Component & Input

As a User,
I want to enter my URL in a high-vis input field,
So that I can start the audit.

**Acceptance Criteria:**

**Given** I am on the Hero section
**When** I type a valid URL and click "Scan Now"
**Then** the input state changes to "Processing"
**And** a loading animation (Glass/Scanning) is triggered
**And** the API request is fired

### Story 2.4: Audit Results Visualization

As a User,
I want to see my results in an interactive card,
So that I understand where I'm failing.

**Acceptance Criteria:**

**Given** the audit is complete
**When** the results are returned
**Then** 3 cards appear (Pixel, Speed, SEO)
**And** they show "Pass" (Green) or "Fail" (Red) status
**And** a generic "Unlock Full Report" button appears below

## Epic 3: Verification & Results System

Convert the "Hooked" user into a "Believer" by showing verified proofs via Case Studies and Claims.

### Story 3.1: Markown Content System & Zod Schema

As a Developer,
I want to configure the Content Collections for Case Studies,
So that I can write content in Markdown with type safety.

**Acceptance Criteria:**

**Given** a new markdown file in `src/content/case-studies`
**When** I run the validation script or build
**Then** Zod ensures the frontmatter matches the `CaseStudy` schema (title, stats, verificationData)
**And** it throws an error if required fields are missing

### Story 3.2: Case Study Bento Grid UI

As a User,
I want to browse case studies in a responsive grid,
So that I can find examples relevant to me.

**Acceptance Criteria:**

**Given** a list of case studies
**When** I view the Case Studies section
**Then** they are displayed in a "Bento" style grid (varying sizes)
**And** I can filter them by Industry or Ad Spend
**And** the layout adapts to Mobile (vertical stack)

### Story 3.3: Verified Badge & Schema Tooltip

As a User,
I want to see verification proof for claimed results,
So that I trust the data.

**Acceptance Criteria:**

**Given** a Case Study card
**When** I hover over the "Verified" badge
**Then** a tooltip appears showing the raw `claimReview` data (Date, Location, Validator)
**And** the badge glows (Gold/Green) to indicate trust

### Story 3.4: JSON-LD Schema Generation Injection

As a System,
I want to inject `ClaimReview` schema into the page head,
So that Google recognizes the verified data.

**Acceptance Criteria:**

**Given** a case study page load
**When** the page renders
**Then** a `<script type="application/ld+json">` tag exists in the head
**And** it contains valid `ClaimReview` structure matching the content
**And** the Google Rich Results Test passes

## Epic 4: Smart Qualification Wizard

Capture high-intent leads that pass the trust threshold using advanced conditional logic.

### Story 4.1: Wizard State Machine & Persistence

As a Developer,
I want to manage the multi-step form state locally,
So that users don't lose progress if they refresh.

**Acceptance Criteria:**

**Given** I am on step 2 of the form
**When** I refresh the page
**Then** I return to step 2 with my data intact
**And** the state is managed via `useWizard` hook

### Story 4.2: Step Logic & Branching System

As a System,
I want to route users based on their inputs,
So that I filter unqualified leads.

**Acceptance Criteria:**

**Given** I am on the "Revenue" step
**When** I select "< $1M" and click Next
**Then** I am routed to the "Partner Network" (Disqualification) path
**And** If I select "> $1M", I am routed to the "Booking" path

### Story 4.3: Wizard UI & Transitions

As a User,
I want to fill out forms with smooth transitions,
So that the experience feels like an app.

**Acceptance Criteria:**

**Given** I click "Next"
**When** the step changes
**Then** the old step slides out and the new step slides in (AnimatePresence)
**And** the input field is automatically focused

### Story 4.4: Submission Handlers & PDF Generation

As a User,
I want to receive a roadmap even if I'm disqualified,
So that I leave with value.

**Acceptance Criteria:**

**Given** I reach the "Partner Network" end screen
**When** I click "Download Roadmap"
**Then** a PDF is generated (or link opened) customized to my inputs
**And** If I am "Qualified", I am redirected to the Calendly booking page

## Epic 5: Production Readiness & Optimization

Ensure the site meets all Non-Functional Requirements (Performance, Accessibility, SEO) and is ready for public traffic.

### Story 5.1: Performance Optimization (LCP & CLS)

As a Developer,
I want to optimize assets and loading strategies,
So that the site scores 90+ on Lighthouse Performance.

**Acceptance Criteria:**

**Given** I run a Lighthouse audit
**When** the report finishes
**Then** the Performance score is > 90
**And** LCP is < 2.5s on Mobile
**And** Images use modern formats (WebP/AVIF) and explicit dimensions

### Story 5.2: Accessibility & SEO Finalization

As a Developer,
I want to ensure the site is accessible and crawlable,
So that I don't exclude users or search engines.

**Acceptance Criteria:**

**Given** I run an Accessibility scan
**When** validation completes
**Then** there are zero critical WCAG violations
**And** `sitemap.xml` and `robots.txt` are present and valid
**And** All images have alt text

### Story 5.3: Error Handling & Fallbacks

As a User,
I want to see graceful error pages,
So that I'm not stuck if something breaks.

**Acceptance Criteria:**

**Given** I navigate to a non-existent route
**When** the page loads
**Then** I see a branded 404 page
**And** I can navigate back to Home
**And** API failures triggers a discrete toast notification instead of crashing

### Story 5.4: Deployment Pipeline & Documentation

As a DevOps Engineer,
I want to finalize the build settings and documentation,
So that the project is maintainable.

**Acceptance Criteria:**

**Given** the codebase
**When** I run `npm run build`
**Then** it completes without type errors
**And** A README provides setup instructions
**And** The site is deployed to Vercel (Production)

## Epic 8: UI/UX Theme Compliance (Light & Dark Mode)

Fix all light-mode UI/UX issues identified during the comprehensive visual audit. Currently, most components use hard-coded dark-mode colors (`text-white`, `text-zinc-300`, `bg-zinc-900`) without light-mode counterparts, making the site nearly unusable in light mode.

**Root Cause:** Tailwind is configured with `darkMode: ["class"]` and CSS variables swap via `.light` class, but many components bypass the semantic variables and use hard-coded color classes intended only for the dark theme.

**Strategy:** Replace hard-coded colors with semantic Tailwind classes using the `dark:` prefix pattern (e.g., `text-zinc-900 dark:text-white`) or CSS variable-based classes (`text-foreground`, `bg-background`).

### Story 8.1: Hero Section & Global Layout Components

As a User,
I want all hero section text and global layout elements to be readable in both light and dark modes,
So that I can use the site regardless of my theme preference.

**Acceptance Criteria:**

**Given** I toggle to light mode
**When** I view the Hero section on the Home page
**Then** the heading "Audit your Agency AI Readiness" is dark text on a light background
**And** the subtitle text has sufficient contrast (WCAG AA)
**And** the "AI-DRIVEN AUDIT ENGINE" badge is readable
**And** the "Powered by" trust signal is readable
**And** dark mode remains visually identical to current design

**Files:** `src/components/layout/Hero.tsx`, `src/components/layout/Layout.tsx`, `src/components/layout/Footer.tsx`, `src/components/layout/Header.tsx`

---

### Story 8.2: Scale Page Theme Compliance

As a User,
I want the Scale page to be fully readable in light mode,
So that I can understand the value proposition regardless of theme.

**Acceptance Criteria:**

**Given** I navigate to `/scale` in light mode
**When** the page loads
**Then** all headings are dark on light background
**And** all body text paragraphs have sufficient contrast
**And** all buttons have visible labels
**And** certification badges are readable
**And** case study stats and framework steps are legible
**And** the CTA section at the bottom has proper contrast
**And** dark mode remains visually identical to current design

**Files:** `src/pages/Scale.tsx`

---

### Story 8.3: Case Studies & Results Page Theme Compliance

As a User,
I want case study cards and the Results page to adapt to light mode,
So that I can browse verified results in any theme.

**Acceptance Criteria:**

**Given** I view the Case Studies section (Home or Results page) in light mode
**When** the cards render
**Then** card backgrounds adapt to the current theme (not hard-coded dark navy)
**And** case study titles, metrics, and descriptions are readable
**And** filter tabs on the Results page have visible active/inactive states
**And** tags (CRO, Health, Google Ads) are readable in both themes
**And** "Read Case Study" links have proper contrast

**Files:** `src/components/CaseStudyGrid.tsx`, `src/pages/Home.tsx` (case studies section)

---

### Story 8.4: Wizard & Apply Flow Theme Compliance

As a User,
I want the qualification wizard and application flow to work correctly in light mode,
So that I can complete the application process in any theme.

**Acceptance Criteria:**

**Given** I open the wizard or navigate to `/apply` in light mode
**When** the wizard steps render
**Then** all step headings and descriptions are readable
**And** the wizard container background adapts to light mode
**And** the review step shows all fields with proper contrast
**And** the success step is readable
**And** the step indicator bar and labels are visible
**And** form inputs have appropriate styling for light mode

**Files:** `src/features/apply/components/WizardLayout.tsx`, `src/features/apply/components/ReviewStep.tsx`, `src/features/apply/components/SuccessStep.tsx`, `src/features/apply/components/StepIndicator.tsx`, `src/features/wizard/components/WizardContainer.tsx`, `src/features/wizard/steps/WelcomeStep.tsx`, `src/features/wizard/steps/RevenueStep.tsx`

---

### Story 8.5: Audit Components Theme Compliance

As a User,
I want the audit input form and results display to work in light mode,
So that I can use the audit feature regardless of theme.

**Acceptance Criteria:**

**Given** I navigate to `/audit` in light mode
**When** the page loads
**Then** the heading and instructional text are readable
**And** the URL input field has appropriate light-mode styling
**And** the "Audit Now" button is visible with proper label contrast
**And** audit result cards (Headlines, Descriptions, Keywords) are readable

**Files:** `src/components/AuditForm.tsx`, `src/components/AuditResults.tsx`, `src/pages/AuditPage.tsx`

---

### Story 8.6: Glass Utilities, Shared Components & Error Pages

As a User,
I want all shared UI components and error pages to work in both themes,
So that the experience is consistent everywhere.

**Acceptance Criteria:**

**Given** I am in light mode
**When** I encounter glass-styled panels, buttons, or error pages
**Then** glass utilities (`.glass`, `.glass-panel`, `.glass-input`) adapt to light mode
**And** the Button component variants work in both themes
**And** the ErrorBoundary page is readable in light mode
**And** the 404 page is readable in light mode

**Files:** `src/app/globals.css`, `src/components/ui/button.tsx`, `src/components/ErrorBoundary.tsx`, `src/pages/NotFound.tsx`
