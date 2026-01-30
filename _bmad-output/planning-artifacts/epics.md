---
stepsCompleted:
  - step-01-validate-prerequisites
  - step-02-design-epics
  - step-03-create-stories
  - step-04-final-validation
inputDocuments:
  - /Users/sultan/Desktop/marketing-test-site/_bmad-output/planning-artifacts/prd.md
  - /Users/sultan/Desktop/marketing-test-site/_bmad-output/planning-artifacts/architecture.md
  - /Users/sultan/Desktop/marketing-test-site/_bmad-output/planning-artifacts/ux-design-specification.md
---

# marketing-test-site - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for marketing-test-site, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR01: User can start the application wizard from multiple entry points (Home, Services).
FR02: User can select "Service Type" (Ads vs Analytics) to trigger conditional branching.
FR03: System creates a unique branching path: If Ads, ask Budget & ROAS; If Analytics, ask Tech Stack & Tracking Issues.
FR04: System auto-saves progress to localStorage after each step.
FR05: User can resume an incomplete application upon returning (same device).
FR06: User can navigate Back/Next without losing data.
FR07: User can filter case studies by Industry (E-com, SaaS, B2B).
FR08: User can filter case studies by Monthly Spend (<$10k, $10k-$50k, $50k+).
FR09: System instantly updates the results grid upon filter selection (Client-side).
FR10: User can click a result to view the full details (modal or separate page).
FR11: User can access a "Sticky" top navigation bar on all pages.
FR12: User can "Smooth Scroll" to sections from Hero/Nav links.
FR13: Mobile users can access the full menu via a hamburger drawer.
FR14: Developer can add new Result items via src/data/results.ts.
FR15: System enforces type safety (TypeScript) for all Result fields to prevent broken UIs.

### NonFunctional Requirements

NFR-01 (Core Web Vitals): Landing page must achieve LCP < 2.5s and CLS < 0.1 on mobile 4G networks.
NFR-02 (Interaction Speed): Apply Wizard step transitions must complete visually within 200ms.
NFR-03 (Compliance): System must meet WCAG 2.1 Level A standards (proper ARIA labels, semantic structure, keyboard navigation).
NFR-04 (Graceful Degradation): Core functionality (Forms, Navigation) must remain usable on older enterprise browsers.
NFR-05 (Data Growth): The Results Engine must support growing to 500+ case studies without degrading LCP.
NFR-06 (Data Persistence): Auto-save mechanism must successfully persist wizard state to localStorage immediately upon ANY input change.

### Additional Requirements

**From Architecture:**
- Framework & Build: React 18 + Vite + TypeScript.
- State Management: Zustand with persistence middleware (localStorage) for the Apply Wizard.
- Data Architecture: "Code-as-CMS" with local structured data in `src/data/results.ts`.
- Styling: Tailwind CSS + Framer Motion.
- Project Structure: Feature-First organization (`src/features/wizard`, `src/features/results`).
- Component Interfaces: Strict TypeScript interfaces for all data models.

**From UX Design:**
- Aesthetic: "Technical Dark Mode" with "Glassmorphism" (bg-zinc-950/60 backdrop-blur-md).
- Typography: Inter for UI, JetBrains Mono/Geist Mono for data/pricing.
- Interactions: Framer Motion for micro-interactions and modal entry.
- Feedback: Real-time "Auto-saved" toast on every input change.
- Navigation: Sticky Top Bar, smooth scrolling, mobile hamburger drawer.
- Results Grid: Instant client-side filtering; "One-Thing-Per-Step" wizard flow with smart defaults.

### FR Coverage Map

FR01: Epic 3 - Wizard Entry
FR02: Epic 3 - Branching Logic
FR03: Epic 3 - Conditional Paths
FR04: Epic 3 - Auto-save
FR05: Epic 3 - Resume State
FR06: Epic 3 - Navigation (Back/Next)
FR07: Epic 2 - Industry Filter
FR08: Epic 2 - Spend Filter
FR09: Epic 2 - Instant Updates
FR10: Epic 2 - View Details
FR11: Epic 1 - Sticky Nav
FR12: Epic 1 - Smooth Scroll
FR13: Epic 1 - Mobile Drawer
FR14: Epic 2 - Dev Content Updates
FR15: Epic 2 - Type Safety

## Epic List

### Epic 1: Core Navigation & Responsive Layout

Users can navigate the site effortlessly on any device to find the information they need. This lays the foundation for all other journeys.

### Story 1.1: Global Responsive Header

As a Visitor,
I want a sticky navigation bar,
So that I can access key pages from anywhere without scrolling back to the top.

**Acceptance Criteria:**

**Given** I am on any page
**When** I scroll down
**Then** the header remains fixed at the top of the viewport
**And** it gains a "glassmorphism" background (blur + semi-transparent color) to separate it from content

**Given** I am on a desktop screen (>768px)
**When** I view the header
**Then** I see the "Riffat Labs" logo and links for "Services", "Work", "About", and a prominent "Apply" button

**Given** I am on a mobile screen (<768px)
**When** I view the header
**Then** I see the Logo and a Hamburger Menu icon only

### Story 1.2: Mobile Navigation Drawer

As a Mobile User (Sarah),
I want a slide-out menu,
So that I can see all navigation options clearly on my small screen.

**Acceptance Criteria:**

**Given** I am on a mobile device
**When** I tap the "Hamburger" icon in the header
**Then** a side drawer slides in from the right covering part/all of the screen
**And** I see large, tappable links for all sections

**Given** the drawer is open
**When** I click a link
**Then** the drawer closes automatically and the page navigates to that section

**Given** the drawer is open
**When** I click the "X" close button or the background overlay
**Then** the drawer closes nicely

**And** the menu is accessible (keyboard focus is trapped in the drawer while open)

### Story 1.3: Smooth Scroll Behavior

As a User,
I want the page to scroll smoothly when I click a link,
So that I understand I am staying on the same page and moving to a new section.

**Acceptance Criteria:**

**Given** I click a navigation link (e.g., "Work")
**When** the page moves to the target section
**Then** it scrolls smoothly (no instinct jump)
**And** the target section is not obscured by the fixed header (scroll-margin-top is applied)

**Given** I scroll manually
**When** I reach a specific section
**Then** the URL hash does NOT need to update (simple scroll is sufficient for MVP)


### Epic 2: Results Engine & Trust Building

Users can instantly find relevant case studies to validate the agency's expertise, and Internal Ops (Developers) can easily manage this data via code.

### Story 2.1: Results Database & Type Safety

As a Developer (Internal Ops),
I want a strictly typed JSON data structure for case studies,
So that I can add new client wins quickly without breaking the site.

**Acceptance Criteria:**

**Given** I open `src/data/results.ts`
**When** I add a new case study object
**Then** TypeScript enforces required fields: id, clientName, industry, spend, resultMetric, summary, and tags
**And** the build fails if I miss a field or use the wrong type

**Given** the application loads
**When** the data is accessed
**Then** it loads instantly from the local file (no API fetch)

### Story 2.2: Results Grid UI Component

As a Visitor,
I want to scan a grid of success stories,
So that I can see the breadth of the agency's experience at a glance.

**Acceptance Criteria:**

**Given** I am on the Results/Work section
**When** the page loads
**Then** I see a responsive grid of Case Study cards
**And** each card displays: Client Name, Key Metric (e.g., "+300% ROAS"), and Industry Tag
**And** the cards use the "Glassmorphism" style (border-white/10, backdrop-blur)

### Story 2.3: Filtering Logic & State

As a User (Sarah),
I want to filter results by Industry or Spend,
So that I can see proof that matches my specific business context.

**Acceptance Criteria:**

**Given** I view the results grid
**When** I click the "E-commerce" filter button
**Then** the grid updates *instantly* to show only E-commerce case studies
**And** the "All" view is hidden

**Given** I verify the filter works
**When** I select a different filter (e.g. "SaaS")
**Then** the previous filter is cleared and new results are shown

**Given** no results match a filter combination
**When** that state occurs
**Then** I see a friendly "No exact matches, but here's how we help [Industry]" message (or similar empty state)

### Story 2.4: Result Detail View

As a Skeptical Buyer,
I want to click a card to read the full story,
So that I can understand *how* the result was achieved.

**Acceptance Criteria:**

**Given** I click a Case Study card
**When** the action triggers
**Then** a Modal opens (or navigation to detail page) containing the full summary and "How we did it" text
**And** the background page is dimmed/blurred

**Given** I am done reading
**When** I click "Close" or outside the modal
**Then** I return to the filtered grid exactly where I left off (context preserved)


### Epic 3: Smart Application Wizard

Users can complete a guided application process that feels like a consultation, with progress saved automatically to preventing data loss.

### Story 3.1: Wizard Architecture & State Management

As a Developer,
I want a centralized state store that persists to localStorage,
So that the user's progress is never lost, even if they accidentally close the tab.

**Acceptance Criteria:**

**Given** I enter data into the wizard
**When** I reload the page
**Then** the wizard returns to the exact same step with my data preserved

**Given** I am a developer
**When** I inspect the state
**Then** I see a robust Zustand store structure handling `currentStep`, `formData`, and `history` (for back navigation)

### Story 3.2: Conditional Branching Logic

As a User,
I want the form to ask questions relevant to my specific need (Ads vs Analytics),
So that I don't waste time answering irrelevant questions.

**Acceptance Criteria:**

**Given** I select "Paid Advertising" as my service
**When** I click Next
**Then** I am taken to the "Ad Budget" question (Branch A)

**Given** I select "Data & Analytics" as my service
**When** I click Next
**Then** I am taken to the "Current Tech Stack" question (Branch B)
**And** I am NOT asked about Ad Budget

### Story 3.3: Step UI & Feedback

As a User,
I want clear, beautiful questions with immediate feedback,
So that I feel confident I am filling out the form correctly.

**Acceptance Criteria:**

**Given** I select an option
**When** the selection is registered
**Then** I see a subtle "Auto-saved" toast or indicator appear

**Given** I navigate between steps
**When** the transition occurs
**Then** the old step slides out and the new one slides in smoothly (Framer Motion)
**And** the input field automatically focuses

### Story 3.4: Review & Submission

As a User,
I want to review my answers before sending,
So that I can correct any mistakes.

**Acceptance Criteria:**

**Given** I complete all steps
**When** I reach the final screen
**Then** I see a summary of all my answers

**Given** I click "Submit Application"
**When** the API call succeeds (mocked for now)
**Then** I am shown a "Success" message and next steps (e.g., "Book a Call")
**And** my local storage state is cleared
