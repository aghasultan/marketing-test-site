---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-03-success', 'step-04-journeys', 'step-05-domain', 'step-06-innovation', 'step-07-project-type', 'step-08-scoping', 'step-09-functional', 'step-10-nonfunctional', 'step-11-polish']
inputDocuments:
  - '_bmad-output/planning-artifacts/product-brief-marketing-test-site-2026-01-31.md'
  - 'docs/architecture.md'
  - 'docs/project-overview.md'
  - 'docs/source-tree-analysis.md'
  - 'docs/development-guide.md'
  - 'docs/api-contracts.md'
  - 'docs/data-models.md'
  - 'docs/component-inventory.md'
  - 'docs/implementation-artifacts/project-scan-report.json'

documentCounts:
  briefs: 1
  research: 0
  brainstorming: 0
  projectDocs: 8
classification:
  projectType: 'web_app'
  domain: 'marketing'
  complexity: 'medium'
  projectContext: 'brownfield'
header:
  project_name: 'marketing-test-site'
  user_name: 'Sultan'
  date: '2026-02-01'
workflowType: 'prd'
---

# Product Requirements Document - marketing-test-site

**Author:** Sultan
**Date:** 2026-02-01

## Executive Summary

### The Vision: Marketing as a Utility
Riffat Labs allows SaaS founders ($1M-$10M ARR) to *audit* their way to trust. We are replacing the standard "static brochure" with a **Conversion Utility** that proves competence before a single word of copy is read.

### The "Code Red" Problem
Our target persona, the "Quantified Skeptic," is immune to persuasive copy. They only trust data. Our current site is invisible to them due to poor contrast and generic messaging.

### The Solution: Radical Transparency
1.  **Instant Proof:** The **No-Click Audit** delivers immediate value (Speed/Pixel/SEO checks) in <800ms.
2.  **Verified Authority:** Every case study is backed by **Schema.org ClaimReview**, turning marketing claims into verifiable facts.
3.  **Digital Excellence:** A glassmorphic, 100/100 Lighthouse experience that *feels* like the premium product we sell.

## Success Criteria

### User Success
*   **The "Aha" Moment:** Instant load (<0.8s) + "No-Click Audit" insight proving technical prowess before any form fill.
*   **Validation:**
    *   Trust verified via **"ClaimReview" Badge** on case studies.
    *   Business alignment confirmed via **ROI Calculator** projections.
*   **Key Behavior:** High-intent completion of the "Apply" wizard after exploring the "Results Engine."

### Business Success
*   **Primary:** Increase quantity of **Qualified Leads** ($1M-$10M ARR) while automating disqualification of low-quality prospects.
*   **Secondary:** Reduce sales cycle time by establishing **Brand Authority** (pre-sold on technical superiority) before the first call.
*   **Tertiary:** Operational efficiency—saving sales team hours by filtering noise via wizard logic.

### Technical Success
*   **Performance:** 100/100 Lighthouse Scores (Performance, SEO, Accessibility).
*   **Core Web Vitals:** Mobile LCP < 2.5s, CLS < 0.1, INP < 200ms.
*   **Schema Quality:** 0 Errors on Google Rich Results Test (`ClaimReview`/`FactCheck`).

### Measurable Outcomes
*   **Wizard Completion Rate:** > 15% of starts result in submission.
*   **Lead Quality Score:** > 80% of applications meet revenue criteria ($1M+ ARR).
*   **Engagement:** Reduce Case Study bounce rate by 20% via "Predictive Navigation."

## Product Scope

### MVP Strategy & Philosophy
**MVP Approach:** **Experience-Driven MVP**. We are not building a "Minimum" product; we are building a "Minimum *Excellent* Product". Since trust is the core metric, the "polish" (animations, speed, schema) is a functional requirement, not a nice-to-have.
**Resource Requirements:** 1-2 Full Stack Devs (React/Node), 1 Designer (Glassmorphism Expert).

### MVP Feature Set (Phase 1)
*   **UI/UX "Code Red" Fixes:** Global Theme Overhaul (Dark Mode/Glassmorphism 3.0) and Premium Typography (Inter/Manrope).
*   **The "No-Click" Audit:** Hero input utilizing `auditService.ts` to deliver 3 instant pass/fail checks without page reload.
*   **Trust-First Results Engine:** `ClaimReview` schema injection and a redesigned grid highlighting "Verified" badges.
*   **Smart Conversion Pathways:** "Predictive Nav" routing and a Persistence-enabled Apply Wizard with strict $1M ARR qualification logic.

### Growth Features (Phase 2 - Post-MVP)
*   **Client Portal:** Auth & Dashboarding.
*   **PDF Generation:** Downloadable "Audit Reports" for soft-landing leads.
*   **Multi-Language:** Localization support.

### Vision (Phase 3 - Expansion)
*   **Client Dashboard:** Real-time ad performance visualization.
*   **AI Strategy Generator:** LLM-powered comprehensive marketing plans.
*   **Automated Case Studies:** Pipeline to auto-publish results based on revenue milestones.

## User Journeys

### 1. The Skeptic's Validation (Primary User - Success Path)
**Persona:** Alex, "The Quantified Skeptic" ($5M ARR SaaS Founder).
*   **Opening:** Alex is annoyed. His previous agency burned $50k with opaque reporting. He clicks a Riffat Labs ad, expecting "fluff."
*   **Rising Action:** The site loads in 600ms. He sees the "No-Click Audit" input and types his URL. Boom. 3 red flags (Speed, Pixel, SEO) appear instantly. He scrolls to Case Studies. "300% ROAS" - he rolls his eyes. He hovers over the verified badge. A `ClaimReview` schema tooltip pops up with third-party verification data. He pauses. "Okay, they have receipts."
*   **Climax:** He enters the "Apply Wizard". It asks, "What is your CAC Target?" not "What is your budget?". He respects the precision and completes the form.
*   **Resolution:** He reaches the Success Screen: "You're Qualified. Strategy Call Unlocked." He books immediately. He feels understood, not sold to.

### 2. The Soft Landing (Primary User - Disqualification Flow)
**Persona:** Sarah, "The Local Leader" (Boutique Shop Owner, $200k ARR).
*   **Opening:** Sarah needs growth but is overwhelmed. She arrives seeking help.
*   **Rising Action:** The design feels premium. She uses the "Predictive Nav" to find the ROI Calculator. She inputs numbers and sees potential, so she enters the Wizard.
*   **Climax:** In Step 3, she enters "Current Revenue: $200k". The system logic recognizes she doesn't meet the $1M ARR threshold.
*   **Resolution:** The Wizard branches gracefully. "Riffat Labs is optimized for scaling $1M+ brands. For your stage, we recommend our Partner Network." She downloads a "Growth Roadmap" PDF and leaves feeling helped.

### 3. The Instant Triage (Admin/Ops User)
**Persona:** Mike, Agency Lead.
*   **Opening:** Monday morning. 50 new leads in the pipeline.
*   **Rising Action:** He opens the new "Lead Notification". It's not just a name/email.
*   **Climax:** The payload contains Alex's data from the Wizard + the "No-Click Audit" results. "Alex, $5M ARR. **Audit Flag:** Pixel Missing." Mike knows the problem before he calls.
*   **Resolution:** He prepares a custom pitch focusing on Pixel tracking. The diagnosis is already done.

### 4. The Verified Publisher (Internal Content Creator)
**Persona:** Sam, Technical Marketer.
*   **Opening:** Needs to publish a Case Study without breaking the "Trust" schema.
*   **Rising Action:** Sam writes in Markdown. He fills out `frontmatter` fields for `claimReview`: `claimDate`, `claimAppearance`, `author`.
*   **Climax:** He pushes to GitHub. The CI/CD pipeline triggers a `schema-validator` script. It passes.
*   **Resolution:** The site deploys. The "Verified" badge appears automatically. No manual HTML editing.

## Functional Requirements

### Results Engine & Discovery
(The mechanisms for finding and verifying proof)
*   **FR1:** User can view a grid of Case Studies filtering by Industry and Ad Spend.
*   **FR2:** User can see a "Verified" badge on Case Studies that meet `ClaimReview` criteria.
*   **FR3:** User can view 'ClaimReview' verification data via a tooltip interaction.
*   **FR4:** User can navigate to the ROI Calculator directly from a relevant Case Study.

### No-Click Audit System
(The mechanism for immediate value delivery)
*   **FR5:** User can input a target URL in the Hero section for instant analysis.
*   **FR6:** System can perform real-time checks for Page Speed (TTFB), Meta Pixel presence, and basic SEO tags.
*   **FR7:** User can receive immediate Pass/Fail feedback on the 3 audit criteria without page reload.
*   **FR8:** System can cache audit results to prevent duplicate API calls for the same URL.

### Apply Wizard (Qualification Engine)
(The mechanism for lead routing and disqualification)
*   **FR9:** User can input business metrics (Revenue, CAC, LTV) in a multi-step form.
*   **FR10:** System can persist user progress locally to prevents data loss on refresh.
*   **FR11:** System can conditionally route users to a "Partner Network" path if Revenue < $1M.
*   **FR12:** System can conditionally route users to a "Booking Calendar" path if Revenue > $1M.
*   **FR13:** User can download a "Growth Roadmap" PDF if disqualified (Soft Landing).

### Content Management & Integrity (Internal)
(The mechanism for maintaining the system)
*   **FR14:** Internal User can publish Case Studies via Markdown files.
*   **FR15:** System can automatically generate `ClaimReview` JSON-LD from Markdown frontmatter.
*   **FR16:** System can validate Schema integrity at build time and fail the build if invalid.

### SEO & Performance
(The foundational technical capabilities)
*   **FR17:** System can render unique Meta Titles/Descriptions for every dynamic route.
*   **FR18:** System can lazy-load non-critical assets to prioritize LCP.

## Non-Functional Requirements

### Performance (The "Trust" Metric)
*   **NFR1 (Load Time):** Largest Contentful Paint (LCP) must be **< 0.8 seconds** on 4G networks.
*   **NFR2 (Responsiveness):** Interaction to Next Paint (INP) must be **< 200ms** to ensure the Wizard feels "app-like".
*   **NFR3 (Bundle Budget):** Initial JS payload must not exceed **100KB (gzipped)**.

### Accessibility (Compliance)
*   **NFR4 (Standards):** System must pass automated WCAG 2.1 AA scans (zero critical violations).
*   **NFR5 (Keyboard):** All interactive elements (Wizard inputs, Tooltips) must be fully navigable via keyboard.
*   **NFR6 (Motion):** UI must respect `prefers-reduced-motion` media queries.

### SEO & Discoverability
*   **NFR7 (Schema Validity):** 100% of "Case Study" pages must pass Google's Rich Results Test for `ClaimReview`.
*   **NFR8 (Meta Accuracy):** Social preview images (OG:Image) must generate dynamically for shared Audit results.

### Reliability
*   **NFR9 (Audit Availability):** The "No-Click Audit" service must have 99.9% uptime (with Serverless fallback strategy).

## Domain-Specific Requirements [Marketing]

### Compliance & Regulatory
*   **Schema.org Strict Compliance:** All Case Studies **MUST** pass Google's Rich Results Test for `ClaimReview` and `FactCheck`.
*   **GDPR/CCPA:** The Apply Wizard must collect explicit consent for data processing.
*   **WCAG 2.1 AA:** Strict compliance to protect against accessibility penalties.

### Integration Requirements
*   **No-Click Audit Engine:** Real-time client-side analysis (or serverless proxy) to fetch target URL headers without CORS errors.
*   **Lead Handoff:** Secure payload formatting for Wizard submission (ready for CRM webhooks).

## Innovation & Novel Patterns

### Detected Innovation Areas
*   **The "Verified" Marketing Pattern:** Applying journalistic standards (`ClaimReview`) to commercial claims challenges the industry norm of unverifiable testimonials.
*   **Zero-Friction Value Delivery:** Moving value *before* the conversion gate via the "No-Click Audit" inverts the typical flow.

### Risk Mitigation
*   **Schema Penalty Risk:** Misusing `ClaimReview` could trigger Google manual actions. *Mitigation:* Strict editorial guidelines and automated validation.
*   **Complexity Cost:** The "No-Click" audit API adds overhead. *Mitigation:* Serverless architecture to scale costs with usage.

## Web App Specific Requirements

### Technical Architecture
*   **Stack:** Client-Side SPA (React 18 + Router 7) for performance/interactivity.
*   **Browser Support:** Modern Browsers (Last 2 versions), Mobile-First (iOS Safari 15+, Android Chrome). No IE11.
*   **SEO Strategy:** Client-side rendering (MVP) with aggressive metadata injection and prerendering for static pages.
