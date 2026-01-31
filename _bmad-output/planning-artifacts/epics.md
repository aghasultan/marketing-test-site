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

FR1: User can view a filterable grid of Case Studies by Industry and Ad Spend.
FR2: User can see a "Verified" badge on Case Studies that meet ClaimReview criteria.
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
FR15: System can automatically generate ClaimReview JSON-LD from Markdown frontmatter.
FR16: System can validate Schema integrity at build time and fail the build if invalid.
FR17: System can render unique Meta Titles/Descriptions for every dynamic route.
FR18: System can lazy-load non-critical assets to prioritize LCP.

### NonFunctional Requirements

NFR1: Largest Contentful Paint (LCP) must be < 0.8 seconds on 4G networks.
NFR2: Interaction to Next Paint (INP) must be < 200ms.
NFR3: Initial JS payload must not exceed 100KB (gzipped).
NFR4: System must pass automated WCAG 2.1 AA scans (zero critical violations).
NFR5: All interactive elements (Wizard inputs, Tooltips) must be fully navigable via keyboard.
NFR6: UI must respect prefers-reduced-motion media queries.
NFR7: 100% of "Case Study" pages must pass Google's Rich Results Test for ClaimReview.
NFR8: Social preview images (OG:Image) must generate dynamically for shared Audit results.
NFR9: The "No-Click Audit" service must have 99.9% uptime (with Serverless fallback strategy).

### Additional Requirements

- Architecture: Starter Template: `npm create vite@latest marketing-test-site -- --template react-ts`
- Architecture: Tech Stack: React 18, React Router 7, Vite, Tailwind CSS, Framer Motion 12, TanStack Query v5, Zod v3
- Architecture: API Pattern: Serverless Proxy for Audit Tool (to bypass CORS)
- Architecture: Project Structure: Feature-Based Architecture (`src/features/...`)
- Architecture: Data Strategy: Markdown files + Zod validation
- UX: Aesthetic: Glassmorphism 3.0 (Dark Mode `zinc-950`)
- UX: Core Component: `<AuditHero />` with real-time scan animation
- UX: Core Component: `<BentoGrid />` responsive layout engine
- UX: Core Component: `<SmartWizard />` with conditional logic (xstate/reducer)
- UX: Responsiveness: Mobile-First (Portrait Default), Tablet (Sidebar), Desktop (Dashboard)
- UX: Accessibility: Contrast 4.5:1 on glass backgrounds, Focus rings `ring-blue-500`
- UX: Testing: Playwright + axe-core for automated a11y testing

### FR Coverage Map

FR1: Epic 3 - Filterable Case Study Grid
FR2: Epic 3 - Verified Badges
FR3: Epic 3 - Schema Tooltips
FR4: Epic 3 - ROI Calculator
FR5: Epic 2 - Audit Input
FR6: Epic 2 - Real-time Checks
FR7: Epic 2 - Instant Feedback
FR8: Epic 2 - Caching Strategy
FR9: Epic 4 - Wizard Metrics Input
FR10: Epic 4 - Local Persistence
FR11: Epic 4 - Routing (Partner)
FR12: Epic 4 - Routing (Booking)
FR13: Epic 4 - PDF Download
FR14: Epic 3 - Markdown Publishing
FR15: Epic 3 - Auto-Schema Generation
FR16: Epic 3 - Build-time Validation
FR17: Epic 1 - Dynamic SEO
FR18: Epic 1 - Lazy Loading / LCP Optimization

## Epic List

### Epic 1: High-Performance Foundation & Branding
Establish the "Glassmorphism" design system, project infrastructure, and high-performance landing page to prove technical competence immediately upon load.
**FRs covered:** FR17, FR18, NFR1-6

### Story 1.1: Project Initialization & Architecture

As a Developer,
I want to initialize the project with Vite, TypeScript, and the defined folder structure,
So that development can proceed on a clean, architectural-compliant foundation.

**Acceptance Criteria:**

**Given** a clean working directory
**When** I run the initialization commands
**Then** a Vite + React + TS project is created
**And** the folder structure matches the `src/features` architecture defined in `architecture.md`
**And** `react-router-dom` and `framer-motion` are installed
**And** `npm run dev` starts the server without errors

### Story 1.2: Glassmorphism Design System Setup

As a Designer,
I want to configure Tailwind CSS with specific colors and utility classes,
So that I can easily apply the "Glassmorphism" aesthetic across the app.

**Acceptance Criteria:**

**Given** the Tailwind configuration file
**When** I define the `zinc-950` colors and extend the theme
**Then** I can use `bg-zinc-950` and `text-zinc-50` classes
**And** I can use a custom `.glass` utility class that applies `backdrop-blur` and border
**And** the `Inter` and `JetBrains Mono` fonts are loaded via `@font-source` and applied correctly

### Story 1.3: Responsive Layout Shell

As a User,
I want to see a consistent Header and Footer across all pages,
So that I can navigate the site easily and feel grounded in the brand.

**Acceptance Criteria:**

**Given** I am on any page of the site
**When** I scroll down
**Then** the Header should remain sticky with a glass background
**And** the Footer should communicate the brand links at the bottom
**And** on Mobile, the navigation should collapse into a usable menu (Sheet/Hamburger)

### Story 1.4: Landing Page Hero Implementation

As a Skeptical User,
I want to see a high-performance Hero section with the "Nebula" background,
So that I am immediately impressed by the site's quality and speed.

**Acceptance Criteria:**

**Given** I visit the root URL `/`
**When** the page loads
**Then** the Hero Text (H1) should be visible in < 0.8s (LCP)
**And** the "Nebula" background animation should play smoothly (unless reduced motion is on)
**And** the CTA button should focus clearly with keyboard navigation

### Story 1.5: SEO & Metadata System

As a Marketing Manager,
I want each page to have unique Title and Meta descriptions,
So that our site ranks well and looks good when shared on social media.

**Acceptance Criteria:**

**Given** I navigate between different routes
**When** I inspect the `<head>` tag
**Then** the `<title>` should update dynamically
**And** `react-helmet-async` should handle the meta tag injection
**And** a default OG:Image should be present for social sharing

### Epic 2: The No-Click Audit Engine

Implement the real-time agency audit tool that sits in the Hero section, providing instant value and demonstrating the "Show, Don't Tell" philosophy.
**FRs covered:** FR5, FR6, FR7, FR8, NFR9

### Story 2.1: Serverless Audit Proxy Setup

As a Developer,
I want to create a secure API proxy that bypasses CORS,
So that I can fetch external website metadata from the client-side without browser errors.

**Acceptance Criteria:**

**Given** a POST request to `/api/audit` with a target URL
**When** the server function executes
**Then** it should fetch the HTML head of the target URL
**And** it should return the headers and partial HTML body
**And** it should handle timeouts and invalid URLs gracefully

### Story 2.2: Audit Analysis Logic

As a User,
I want the system to analyze my site for technical marketing signals,
So that I get an objective score on my setup.

**Acceptance Criteria:**

**Given** the raw HTML from the proxy
**When** the `auditService` runs
**Then** it should detect if a Meta Pixel is present
**And** it should calculate the server response time (TTFB equivalent)
**And** it should validate the length of the Title Tag
**And** it should return a boolean Pass/Fail for each check

### Story 2.3: Interactive Audit Scanner UI

As a User,
I want to see a visual indication that work is happening,
So that I feel the "Magic" of the AI tool analyzing my site.

**Acceptance Criteria:**

**Given** I have typed a URL
**When** I press Enter
**Then** the input field should lock
**And** a progress bar/pulse animation should play for ~1.5s
**And** the text should cycle through "Connecting...", "Analyzing...", "Done"

### Story 2.4: Instant Results Teaser

As a User,
I want to see the key results of the audit immediately,
So that I am hooked by the value without needing to refresh or sign up yet.

**Acceptance Criteria:**

**Given** the audit is complete
**When** the results are ready
**Then** 3 distinct cards should appear below the input (Speed, Pixel, SEO)
**And** they should flip/animate into view
**And** each card should show a clear Pass (Green check) or Fail (Red X) icon


### Epic 3: Verification & Results System

Build the "Trust Engine" allowing users to filter case studies and verify their authenticity through interactive Schema tooltips and "Verified" badges.
**FRs covered:** FR1, FR2, FR3, FR4, FR14, FR15, FR16, NFR7

### Story 3.1: Markdown Content Architecture

As a Developer,
I want a type-safe system for loading Case Studies from Markdown,
So that I can ensure all content meets the strict Schema.org requirements before deployment.

**Acceptance Criteria:**

**Given** a markdown file in `src/content/case-studies`
**When** the build runs
**Then** Zod should validate the frontmatter against the `CaseStudySchema`
**And** it should enforce required fields like `claimReview`, `author`, and `metrics`
**And** any invalid file should cause the build to fail

### Story 3.2: Bento Grid Layout Engine

As a User,
I want to view case studies in an organized, responsive grid,
So that I can quickly scan for relevant results without being overwhelmed.

**Acceptance Criteria:**

**Given** I am browsing the Case Studies section
**When** I resize the window
**Then** the grid should adapt from a single column (Mobile) to a 3-column "Bento" layout (Desktop)
**And** "Featured" case studies should span 2 columns/rows
**And** the cards should use the glassmorphism aesthetic (backdrop-blur)

### Story 3.3: Schema Verification Tooltip

As a Skeptical User,
I want to inspect the source of a claim,
So that I can trust that the metrics aren't made up.

**Acceptance Criteria:**

**Given** I hover over a "Verified" badge
**When** the tooltip appears
**Then** it should show the raw `ClaimReview` data (Date, Author, Verification Method)
**And** it should look like a technical "Code Block" to signal engineering rigour
**And** it should remain accessible via keyboard focus

### Story 3.4: Verified Badge Logic

As a User,
I want to easily distinguish verified case studies from unverified ones,
So that I know which results are guaranteed by the agency.

**Acceptance Criteria:**

**Given** a case study card is rendering
**When** the component checks the frontmatter
**Then** IF `claimReview` is present AND valid, display the Golden "Verified" Badge
**And** IF schema is missing, do NOT show the badge
**And** the badge should pulse slightly to attract attention

### Story 3.5: ROI Calculator Component

As a Lead,
I want to project my potential returns based on the case study metrics,
So that I can rationalize the investment to my stakeholders.

**Acceptance Criteria:**

**Given** I am viewing a successful case study
**When** I interact with the ROI Calculator slider
**Then** the "Potential Revenue" number should update in real-time based on the Case Study's ROAS
**And** a "Book Strategy" button should appear near the result


### Epic 4: Smart Qualification Wizard

Develop the persistence-enabled, multi-step application form that uses conditional logic to route leads to the appropriate offer based on revenue.
**FRs covered:** FR9, FR10, FR11, FR12, FR13

### Story 4.1: Wizard State Machine

As a Developer,
I want a centralized state machine to manage the wizard's logic,
So that I can handle complex validation, navigation, and branching without "prop drilling" chaos.

**Acceptance Criteria:**

**Given** the user is in the wizard
**When** they click "Next"
**Then** the state machine should validate the current step's data
**And** transition to the next step defined in the `machineConfig`
**And** prevent transition if validation fails

### Story 4.2: Conditional Branching Logic

As a Business Owner,
I want to filter out leads that are too small for our services,
So that my sales team focuses only on high-value prospects.

**Acceptance Criteria:**

**Given** the user is on the "Revenue" step
**When** they select "< $1M ARR"
**Then** the wizard should immediately branch to the "Partner Network" outcome
**And** they should NOT be asked about Budget or Timeline
**And** IF they select "> $1M ARR", they proceed to "Deep Discovery"

### Story 4.3: Revenue & Metrics Inputs

As a User,
I want easy-to-use inputs for my financial data,
So that I can enter accurate numbers without formatting frustration.

**Acceptance Criteria:**

**Given** the "Metrics" step
**When** I type into the Revenue field
**Then** it should auto-format as currency (e.g., "$1,000,000")
**And** it should allow shorthand typing (e.g., "1m" converts to 1,000,000)
**And** adequate "Smart Defaults" should be suggested

### Story 4.4: Local Persistence Layer

As a User,
I want my progress saved if I accidentally refresh,
So that I don't have to re-type 10 fields of data.

**Acceptance Criteria:**

**Given** I have filled out 3 steps
**When** I refresh the page
**Then** the wizard should reload at Step 3
**And** all my previously entered data should be pre-filled
**And** the data should be cleared upon successful submission

### Story 4.5: Outcome Generation (PDF/Booking)

As a User,
I want to receive the appropriate next steps based on my qualification,
So that I can move forward with Riffat Labs (or find an alternative).

**Acceptance Criteria:**

**Given** I am a Disqualified User (<$1M)
**When** I complete the flow
**Then** I should be offered a "Growth Roadmap" PDF download
**And** I should NOT see the Calendar booking link

**Given** I am a Qualified User (>$1M)
**When** I complete the flow
**Then** I should see the Calendly embed to book a strategy call immediately

