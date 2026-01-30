---
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-03-success
  - step-04-journeys
  - step-07-project-type
  - step-08-scoping
  - step-09-functional
  - step-10-nonfunctional
  - step-11-polish
inputDocuments:
  - /Users/sultan/Desktop/marketing-test-site/project-context.md
  - /Users/sultan/Desktop/marketing-test-site/_bmad-output/project_knowledge/api-contracts.md
  - /Users/sultan/Desktop/marketing-test-site/_bmad-output/project_knowledge/architecture.md
  - /Users/sultan/Desktop/marketing-test-site/_bmad-output/project_knowledge/component-inventory.md
  - /Users/sultan/Desktop/marketing-test-site/_bmad-output/project_knowledge/data-models.md
  - /Users/sultan/Desktop/marketing-test-site/_bmad-output/project_knowledge/deployment-guide.md
  - /Users/sultan/Desktop/marketing-test-site/_bmad-output/project_knowledge/development-guide.md
  - /Users/sultan/Desktop/marketing-test-site/_bmad-output/project_knowledge/index.md
  - /Users/sultan/Desktop/marketing-test-site/_bmad-output/project_knowledge/project-overview.md
  - /Users/sultan/Desktop/marketing-test-site/_bmad-output/project_knowledge/project-scan-report.json
  - /Users/sultan/Desktop/marketing-test-site/_bmad-output/project_knowledge/source-tree-analysis.md
documentCounts:
  briefCount: 0
  researchCount: 0
  brainstormingCount: 0
  projectDocsCount: 10
classification:
  projectType: Web App (SPA)
  domain: Marketing (General)
  complexity: Low/Medium
  projectContext: Brownfield
elicitationInsights:
  - "Apply Page: Conditional Logic Branching, Auto-save, Premium glassmorphism UI"
  - "Results Engine: Case Study explorer, Filterable grid, Local structured data (results.ts)"
  - "Navigation: Smooth scroll, Mobile accessibility, Sticky behavior"
---

# Product Requirements Document - marketing-test-site

**Author:** Sultan
**Date:** 2026-01-30

## Success Criteria

### User Success

*   **Apply Page:** Users feel "progress" rather than "overwhelmed" by the form. The "Conditional Logic" means they only answer relevant questions.
*   **Results Engine:** Users can instantly find case studies relevant to *their* industry/spend, creating an "aha!" moment ("They know my business").
*   **Navigation:** Users can navigate effortlessly on mobile without "fighting" the menu.

### Business Success

*   **Lead Quality:** Increase in "Qualified" leads (users who complete the full wizard with >$5k budget).
*   **Conversion Rate:** Higher % of visitors to `/apply` completing the form (reduced drop-off).
*   **Engagement:** Time spent on "Results" section > 1 minute (indicating deep reading).

### Technical Success

*   **Performance:** Apply Wizard loads in <200ms.
*   **Reliability:** Auto-save works 100% of the time (no lost data).
*   **Maintainability:** New "Results" data can be added via a simple JSON update without code changes.

### Measurable Outcomes

*   **Apply Form Completion Rate:** >X% (To be baselined)
*   **Qualified Lead Ratio:** >Y% of submissions
*   **Results Page Bounce Rate:** <Z%

## Product Scope

### MVP - Minimum Viable Product

*   Full "Wizard" Apply Form with conditional logic.
*   "Results Engine" with JSON-based data and basic filtering.
*   Visual overhaul of About/Skills/Services.
*   Fixed Top Bar & Hero Arrow.

### Growth Features (Post-MVP)

*   CMS integration for Results (contentful/sanity).
*   A/B testing on Wizard steps.
*   Advanced animations for "Skills" section.

### Vision (Future)
*   AI-driven personalized case study recommendations.
*   Client portal integration for real-time reporting.

## User Journeys

### Journey 1: Sarah, The E-commerce Founder (The "Trust" Journey)
**Persona:** Founder of a D2C brand doing $50k/mo. Skeptical of agencies who "burn cash".
**Goal:** Scale ad spend profitably.
**Narrative:** Sarah lands on the Home page, intrigued by the headline. She clicks "Results" to verify claims. She filters by "E-commerce" and sees a case study scaling a brand similar to hers from $10k to $50k/mo. Impressed, she clicks "Apply". The Wizard form asks her specific questions about her active ad channels and ROAS goals (Conditional Logic). She feels the agency understands her specific constraints.
**Requirements Revealed:** "Results Engine" filtering, Conditional Logic in Wizard (Branch A).

### Journey 2: David, The Technical Buyer (The "Competence" Journey)
**Persona:** Marketing Director at a mid-sized SaaS. Technical background.
**Goal:** Fix broken server-side tracking (CAPI) and attribution.
**Narrative:** David lands on the "Services" page via a specific search. He reads the "Analytics Engineering" section. He checks the "Skills" page to see if they know GTM/Server-side tracking. The page looks premium and technical, validating expertise. He clicks "Apply". He selects "Analytics Project". The Wizard *skips* ad budget questions and asks about his tech stack (Shopify/GTM).
**Requirements Revealed:** "Skills" page visual overhaul (Premium Tech aesthetic), Conditional Wizard logic (Branch B).

### Journey 3: The Admin/Owner (Internal Ops)
**Persona:** Sultan (Process Owner).
**Goal:** Quickly showcase a new client win without deployment friction.
**Narrative:** Sultan closes a big deal and wants it on the site immediately. He opens `src/data/results.ts` in his editor. He adds a new entry with the client details and results. He commits the change. The site rebuilds and the new case study appears automatically in the filtered list.
**Requirements Revealed:** TypeScript-based data structure for Results, Zero-config content updates (Code-as-CMS).

### Journey Requirements Summary

*   **Conditional Form Logic:** The Apply Wizard must branch based on "Service Type" (Ads vs Analytics) to match the user's intent.
*   **Dynamic Filtering:** The Results page must support instant client-side filtering by Industry to relevant proof.
*   **Visual Authority:** The Skills page must communicate "Technical Competence" through design (glassmorphism, clean typography) to convert technical buyers.
*   **Developer Experience:** Content management (Results) must be handled via typed JSON files for speed and stability.

## Technical Foundation

### Architecture Strategy
A performance-focused Marketing SPA built with **React 18 + Vite**, designed to maximize ad quality scores (LCP) and conversion rates.

*   **Core Stack:** React 18, Vite, TypeScript.
*   **Data Layer:** "Code-as-CMS" architecture using typed JSON (`src/data/results.ts`) for zero-latency comparisons and filtering.
*   **State Persistence:** `localStorage` for failure-proof Apply Wizard progress (see **NFR-06**).

### Strategic Constraints
*   **Browser Support:** Modern evergreen browsers, with strict **graceful degradation** for enterprise legacy browsers (see **NFR-04**).
*   **Responsiveness:** "Hybrid Heavy" optimization for complex touch (Mobile) and precision mouse (Desktop) interactions.
*   **SEO & Meta:** `react-helmet-async` for headers; JSON-LD structured data for Case Studies to drive rich search results.

*(Note: Specific performance metrics and accessibility standards are defined in the **Non-Functional Requirements** section.)*

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Feature-First Brownfield Upgrade
**Resource Requirements:** 1 Full Stack Dev (You) + AI Agents (Design/Refactor)

### MVP Feature Set (Phase 1)

**Core User Journeys Supported:**
*   Sarah (E-commerce Founder) - Trust & Apply
*   Internal Ops (Sultan) - Easy Updates
*   David (Technical Buyer) - Validation & Apply (Basic Flow)

**Must-Have Capabilities:**
*   **Apply Wizard:** Step-by-step form with Branching Logic (Ads vs Analytics) + LocalStorage Auto-save.
*   **Results Engine:** JSON-based data source + Client-side Filtering Grid (Industry, Spend).
*   **Navigation:** Fixed Top Bar + Smooth Scroll to sections.
*   **SEO:** Schema.org markup for Result/Case Study items.
*   **Visuals:** Refreshed Hero, About, and Skills sections with premium polished UI (Glassmorphism).

### Post-MVP Features

**Phase 2 (Growth):**
*   CMS integration for Results (contentful/sanity).
*   A/B testing on Wizard steps.
*   Advanced animations for "Skills" section.

**Phase 3 (Expansion):**
*   Client Portal login integration.
*   AI-driven personalized case study recommendations.

### Risk Mitigation Strategy

**Technical Risks:**
*   **JSON Bloat:** Large results file hurting LCP. -> **Mitigation:** Code-split `results.ts` and load mostly on interaction.
*   **Browser Compatibility:** Glassmorphism breaking on old corporate browsers. -> **Mitigation:** Fallback CSS variables for solid colors if `backdrop-filter` is unsupported.

**Market Risks:**
*   **Low Conversion:** Users abandoning the long wizard. -> **Mitigation:** "Saved to this device" reassurance and simplifying the initial questions to reduce friction.

**Resource Risks:**
*   **Time Constraint:** Running out of time for clean code. -> **Mitigation:** Strict TS interfaces first. If animations take too long, ship static versions first (Function over Form priority).

## Functional Requirements

### Application Wizard (The Core)
*   **FR01:** User can start the application wizard from multiple entry points (Home, Services).
*   **FR02:** User can select "Service Type" (Ads vs Analytics) to trigger conditional branching.
*   **FR03:** System creates a unique branching path:
    *   *If Ads:* Ask Budget & ROAS.
    *   *If Analytics:* Ask Tech Stack & Tracking Issues.
*   **FR04:** System auto-saves progress to `localStorage` after each step.
*   **FR05:** User can resume an incomplete application upon returning (same device).
*   **FR06:** User can navigate Back/Next without losing data.

### Results Engine (Trust Builder)
*   **FR07:** User can filter case studies by **Industry** (E-com, SaaS, B2B).
*   **FR08:** User can filter case studies by **Monthly Spend** (<$10k, $10k-$50k, $50k+).
*   **FR09:** System instantly updates the results grid upon filter selection (Client-side).
*   **FR10:** User can click a result to view the full details (modal or separate page).

### Navigation & Layout
*   **FR11:** User can access a "Sticky" top navigation bar on all pages.
*   **FR12:** User can "Smooth Scroll" to sections from Hero/Nav links.
*   **FR13:** Mobile users can access the full menu via a hamburger drawer.

### Content Management (Internal)
*   **FR14:** Developer can add new Result items via `src/data/results.ts`.
*   **FR15:** System enforces type safety (TypeScript) for all Result fields to prevent broken UIs.

## Non-Functional Requirements

### Performance
*   **NFR-01 (Core Web Vitals):** Landing page must achieve LCP < 2.5s and CLS < 0.1 on mobile 4G networks to ensure high ad quality scores.
*   **NFR-02 (Interaction Speed):** Apply Wizard step transitions must complete visually within 200ms to maintain user flow.

### Accessibility
*   **NFR-03 (Compliance):** System must meet **WCAG 2.1 Level A** standards (proper ARIA labels, semantic structure, keyboard navigation).
*   **NFR-04 (Graceful Degradation):** Core functionality (Forms, Navigation) must remain usable on older enterprise browsers that do not support `backdrop-filter` or modern glassmorphism effects.

### Scalability
*   **NFR-05 (Data Growth):** The Results Engine must support growing to 500+ case studies without degrading LCP, utilizing code-splitting/lazy-loading for the dataset.

### Reliability
*   **NFR-06 (Data Persistence):** Auto-save mechanism must successfully persist wizard state to `localStorage` immediately upon ANY input change.
