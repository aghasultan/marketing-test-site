---
stepsCompleted: ['step-01-validate-prerequisites', 'step-02-design-epics']
inputDocuments:
  - '_bmad-output/planning-artifacts/prd.md'
  - '_bmad-output/planning-artifacts/architecture.md'
---

# Epics and Stories - marketing-test-site

## 1. Requirements Reference

### Functional Requirements (FRs)

**From PRD:**
FR9: User can input business metrics (Revenue, CAC, LTV) in a multi-step form.
FR10: System can persist user progress locally to prevents data loss on refresh.
FR11: System can conditionally route users to a "Partner Network" path if Revenue < $1M.
FR12: System can conditionally route users to a "Booking Calendar" path if Revenue > $1M.
FR13: User can download a "Growth Roadmap" PDF if disqualified (Soft Landing).

### Non-Functional Requirements (NFRs)

**From PRD:**
NFR1 (Load Time): Largest Contentful Paint (LCP) must be < 0.8 seconds on 4G networks.
NFR2 (Responsiveness): Interaction to Next Paint (INP) must be < 200ms to ensure the Wizard feels "app-like".
NFR3 (Bundle Budget): Initial JS payload must not exceed 100KB (gzipped).
NFR4 (Standards): System must pass automated WCAG 2.1 AA scans (zero critical violations).
NFR5 (Keyboard): All interactive elements (Wizard inputs, Tooltips) must be fully navigable via keyboard.
NFR6 (Motion): UI must respect `prefers-reduced-motion` media queries.

### Additional Requirements (Technical & UX)

**From Architecture:**
- Starter Template: Vite + React + TypeScript initialized with `npm create vite@latest`
- State Management (Wizard): `xstate` or complex `useReducer` for the multi-step branching logic.
- Architecture Isolation: `ApplyWizard` context is isolated to `features/apply-wizard`. No logic leakage to global `App.tsx`.
- Communication Pattern (Form Data): Uncontrolled inputs with React Hook Form (Zod validation).
- Compliance: GDPR/CCPA explicit consent collection required for data processing.

## 2. Requirements Coverage Map

### FR Coverage Map

FR9: Epic 3 - Interactive data input for calculating qualification
FR10: Epic 3 - LocalStorage state preservation to prevent drop-offs
FR11: Epic 3 - Branching logic to Partner Network for sub-$1M ARR
FR12: Epic 3 - Branching logic to Sales Calendar for $1M+ ARR
FR13: Epic 3 - Generation of PDF Roadmap for disqualified leads

## 3. Epics and Stories

### Epic 3: Smart Qualification & Application
**Goal:** Enable users to determine if they qualify for services by providing their business metrics, resulting in either a booked sales call (for qualified leads) or a helpful automated roadmap (for disqualified leads). This respects the user's time while automating the agency's lead filtering.
**FRs covered:** FR9, FR10, FR11, FR12, FR13

**Implementation Notes:**
- Requires strict adherence to the `<ErrorBoundary>` and state machines (`xstate`/`useReducer`) to handle complex wizard branching locally without a database.
- Must collect explicit GDPR/CCPA consent before submission.
- Focus heavily on keyboard navigation (NFR5) for power users.
- The PDF generation (FR13) may require a client-side library like `jspdf` or a simple printable HTML view.

### Story 3.1: Application Wizard Foundation & State Machine

As a User,
I want to navigate through a multi-step application form seamlessly,
So that I can provide my business metrics without feeling overwhelmed.

**Acceptance Criteria:**

**Given** I click the "Apply Now" button or navigate to the booking section
**When** the Apply Wizard component renders
**Then** I should see a clean, glassmorphic UI displaying the first step of the application process (Business Name & Basic Details)
**And** the component state should be managed by a robust state machine (`xstate` or `useReducer`) that tracks the current step, user data, and validity of each step.

### Story 3.2: LocalStorage Persistence & Validation

As a User,
I want my progress to be saved automatically,
So that if I accidentally refresh the page, I don't have to re-enter my information.

**Acceptance Criteria:**

**Given** I have entered data into one or more steps of the wizard
**When** I refresh the page or navigate away and back
**Then** the wizard should restore my previous state and data from `localStorage`
**And** each step must validate my input (e.g., valid email, required fields) using `react-hook-form` and `zod` before allowing progression to the next step (FR10, Architecture).

### Story 3.3: Business Metrics & Conditional Branching (Disqualification)

As a SaaS Founder,
I want to input my revenue, CAC, and LTV,
So that the system can determine my qualification status.

**Acceptance Criteria:**

**Given** I am on the business metrics step of the Apply Wizard
**When** I submit my revenue metrics that are below the $1M ARR threshold
**Then** the wizard should conditionally branch to the "Partner Network" disqualified path (FR11)
**And** I should clearly see why I didn't qualify and be offered alternative resources.

### Story 3.4: Disqualified Lead Soft Landing & PDF Generation

As a Disqualified Lead,
I want to receive a customized growth roadmap,
So that I still gain value from my application despite not qualifying for direct services.

**Acceptance Criteria:**

**Given** I have been routed to the "Partner Network" disqualified path
**When** I view the soft landing page
**Then** I should have the option to download a "Growth Roadmap" PDF (FR13)
**And** clicking the download button should dynamically generate and download a PDF containing actionable advice tailored to my stage.

### Story 3.5: Qualified Lead Booking & Hand-off

As a Qualified Lead,
I want to book a strategic consultation,
So that I can take the next step toward working with the agency.

**Acceptance Criteria:**

**Given** I submit my business metrics and they meet or exceed the $1M ARR threshold
**When** the wizard processes my submission
**Then** I should be conditionally routed to the "Booking Calendar" path (FR12)
**And** my explicit GDPR/CCPA consent should be captured before revealing the calendar
**And** my data should be structured in a payload ready to be sent to a CRM webhook upon completion.
