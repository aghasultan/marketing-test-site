---
stepsCompleted:
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-03-core-experience
  - step-04-emotional-response
  - step-05-inspiration
  - step-06-design-system
  - step-07-defining-experience
  - step-08-visual-foundation
  - step-09-motion-and-interaction
  - step-10-content-strategy
  - step-11-handoff-and-ready

inputDocuments:
  - /Users/sultan/Desktop/marketing-test-site/_bmad-output/planning-artifacts/prd.md
  - /Users/sultan/Desktop/marketing-test-site/project-context.md
  - /Users/sultan/Desktop/marketing-test-site/_bmad-output/project_knowledge/index.md
---

# UX Design Specification marketing-test-site

**Author:** Sultan
**Date:** 2026-01-30

---

<!-- UX design content will be appended sequentially through collaborative workflow steps -->

## Executive Summary

### Project Vision

A high-performance marketing SPA (React 18 + Vite) designed to maximize ad quality scores and conversion rates. The core focus is differentiating "Riffat Labs" through a premium "Glassmorphism" aesthetic, a trust-building "Results Engine", and a friction-reducing "Apply Wizard" with conditional logic.

### Target Users

- **Sarah (E-commerce Founder):** Skeptical, data-driven buyer needing industry-specific proof.
- **David (Technical Buyer):** Technical stakeholder validating competence via "Skills" and architecture.
- **Sultan (Internal Ops):** Operational user requiring zero-friction, code-based content updates.

### Key Design Challenges

- **Balancing Premium Visuals vs. Performance:** Implementing "Glassmorphism" and smooth animations without violating the strict LCP < 2.5s requirement.
- **Conditional Complexity:** managing the branching logic of the "Apply Wizard" without overwhelming the user or losing progress.
- **Trust at a Glance:** Instantaneously filtering "Results" to show relevance before a user bounces.

## 3. Motion & Interaction Design

### 3.1 Motion Principles: "Weight & Fluidity"

- **Physics-based:** Interactions should feel like moving physical glass panes.
- **Duration:** 
  - Micro-interactions (Hover): 200ms ease-out.
  - Macro-interactions (Modal Open): 400ms spring damping.
- **Reduced Motion:** All `framer-motion` variants must respect `prefers-reduced-motion` by falling back to simple opacity fades.

### 3.2 Key Interaction Patterns

- **The "Glass Lift":** Hovering over cards (Case Studies) should slightly scale them up (1.02) and increase the shadow opacity, simulating lifting the glass pane closer to the user.
- **Wizard Transitions:** Steps in the Apply Wizard should slide in from the right (`x: 20`) and fade in, while the previous step slides out to the left (`x: -20`), creating a sense of linear progression.
- **Navigation Feedback:** The active nav item should have a glowing background "pill" that slides behind the text (LayoutLayout animation) rather than just jumping.

## 4. Content Strategy

### 4.1 Voice & Tone

- **Headline Style:** "Confident, Direct, Engineering-Led."
  - *Yes:* "Turn ad spend into profit."
  - *No:* "We help you grow your business."
- **Microcopy:** Use technical precision. "Initialize Roadmap" instead of "Get Started." "System Ready" instead of "Welcome."

### 4.2 "Code-as-content" Workflow

- **Problem:** Marketing teams break layouts with unoptimized images.
- **Solution:** Hardcoded content in structured TSX/JSON files for now. Changes require a PR, ensuring a developer reviews the visual impact of new copy/images before deploy.

## 5. Final Handoff & Implementation Guide

### 5.1 Asset Requirements

- **Noise Texture:** SVG-based noise filter (hosted or inline base64) to prevent banding on dark gradients.
- **Icons:** Lucide React (standardized stroke width 1.5px to match "Fine" aesthetic).

### 5.2 Critical Critical Path

1.  **Theme Setup:** Update `tailwind.config.ts` with the new colors and `glass` utilities.
2.  **Layout Shell:** Build the sticky header and mobile drawer with the blur effects first to test performance.
3.  **Wizard State:** Implement the `zustand` store for the Apply Wizard before building the UI.

---
**Status:** COMPLETED
**Ready for Implementation:** YES

### Design Opportunities

- **"Results Engine" as a Trust Catalyst:** Turning the case study section into an interactive tool rather than a static list.
- **"Code-as-CMS" Workflow:** Leveraging the "Internal Ops" persona to build a uniquely developer-centric content workflow that is robust and type-safe.
- The "Competence" Aesthetic: Using the UI (glass, blurs, typography) itself to subtly prove technical capability to buyers like David.

## Core User Experience

### Defining Experience

The core "Golden Path" is the **Apply Wizard**, functioning as a high-value "guided consultation" rather than a data entry form. It qualifies users through engaging conditional logic while filtering low-quality leads, acting as the primary conversion engine.

### Platform Strategy

- **Mobile First (The "Ad Traffic" Context):** Vertical layouts and touch targets must be prioritized for users like Sarah arriving via social ads.
- **Desktop Excellence (The "Deep Dive" Context):** Precision mouse interactions and full glassmorphism effects for technical buyers like David conducting due diligence.
- **Graceful Degradation:** Core functionality (Forms, Navigation) must work flawlessly on minimal corporate browsers, even if premium visual effects (blurs) are disabled.

### Effortless Interactions

- **Instant Results:** Zero-latency client-side filtering for the Results Engine to prevent bounce.
- **Fear-Free Forms:** Auto-save on every input to eliminate "loss anxiety" for mobile users who might get interrupted.

### Critical Success Moments

- **The "We Know You" Moment:** When a user filters Case Studies and finds a specific match for their industry/spend, validating the agency's expertise.
- **The "Competence" Check:** When a technical buyer inspects the "Skills" or "Services" page and the UI quality itself serves as proof of technical capability.

### Experience Principles

- **Trust Through Transparency:** Show real, relevant results immediately to build credibility.
- **Respect User Time:** Auto-save progress and use branching logic to skip irrelevant questions.
- **Function over Form:** Visual polish (Glassmorphism) must never compromise the strict LCP < 2.5s performance requirement.

## Desired Emotional Response

### Primary Emotional Goals

**Confident Relief.** Users (especially Sarah) arrive potentially burnt by past agencies. The goal is to transition them from *Anxiety* ("Will this work?") to *Relief* ("They get it") and finally *Confidence* ("I'm ready to start").

### Emotional Journey Mapping

- **Discovery:** *Intrigue & Respect.* The "Glassmorphism" aesthetic shouldn't just look pretty; it should signal "Modern Capability" and authority.
- **Investigation:** *Validation.* Finding a case study that matches their industry triggers the feeling: "They have a map for my specific journey."
- **Action (Wizard):** *Being Heard.* Conditional logic makes the user feel listened to, rather than processed. "They didn't ask me about ad budget because I said I want Analytics."
- **Completion:** *Accomplishment.* A friction-free submission leaves the user feeling they've made a smart business decision.

### Micro-Emotions

- **Skepticism → Trust:** Filtering by industry instantly validates relevance.
- **Overwhelm → Clarity:** "Wizard" steppers break big commitments into manageable micro-actions.
- **Fear of Loss → Safety:** "Auto-saved" indicators turn the anxiety of interruption into the comfort of continuity.

### Design Implications

- **Glassmorphism = Capability:** We use this visual language to signal that we are "future-facing" and technically proficient.
- **Micro-Interactions = Care:** Smooth transitions and instant filters signal attention to detail—implying we will handle their ad budget with the same care.

### Emotional Design Principles

- **Show, Don't Just Tell:** Use the *Results Engine* to prove expertise before asking for the sale.
- **Reduce Cognitive Load:** Every question removed from the Wizard increases the user's feeling of ease and competence.

## UX Pattern Analysis & Inspiration

### Inspiring Products Analysis

- **Linear (The "Premium Performance" Standard):** Defines the modern B2B "high competence" aesthetic. Key elements are subtle glassmorphism, noise textures, and the *perception* of speed.
- **Typeform (The "Human Wizard" Standard):** Makes data entry feel like a conversation. Key interaction is the "One Question at a Time" focus with large, friendly targets.
- **Airbnb (The "Instant Results" Standard):** The gold standard for filtering. Key behavior is the grid reshuffling *instantly* upon filter selection without reloading.

### Transferable UX Patterns

- **Visuals (from Linear):** Dark mode Glassmorphism to signal "Technical Authority" (for David).
- **Interaction (from Typeform):** Branch-based questioning in the *Apply Wizard* to keep engagement high (for Sarah).
- **Structure (from Airbnb):** Client-side list virtualization for the *Results Engine* to ensure immediate feedback.

### Anti-Patterns to Avoid

- **Scroll Hijacking:** Avoid altering native scroll behavior which frustrates users and hurts LCP.
- **Mystery Meat Navigation:** All primary actions (Apply, Services) must be visible in the Fixed Top Bar, not hidden behind vague icons.

### Design Inspiration Strategy

- **Adopt:** Linear's visual language for the *Skills* and *About* sections to prove competence.
- **Adapt:** Typeform's flow for the *Apply Wizard*, but strictly integrated into our custom React components (no iframes) for performance.
- **Avoid:** Any heavy animations that delay the Time to Interactive (TTI).

## Design System Foundation

### 1.1 Design System Choice

**Shadcn/UI (Tailwind CSS + Radix UI).** This is a "headless" approach where we own the code, rather than a heavy component library dependency.

### Rationale for Selection

- **Performance (LCP < 2.5s):** Zero runtime CSS-in-JS overhead. Tailwind generates atomic CSS at build time.
- **Aesthetic Control:** We need full control to implement "Glassmorphism" and custom noise textures without fighting a library's default styles (like MUI's specific DOM structure).
- **Accessibility:** Radix UI primitives ensure modals, dialogs, and accordions are WCAG 2.1 compliant out of the box.

### Implementation Approach

- **Tailwind Extension:** We will extend `tailwind.config.ts` with custom `glass` utilities (`backdrop-filter`, `bg-opacity`) and a `noise` background pattern.
- **Component Scaffolding:** Use `shadcn-ui` CLI to generate the base components (Form, Dialog, Accordion), then styling them to match the "Linear-like" visual direction.
- **Motion:** Integrate **Framer Motion** for micro-interactions (hover states, modal entry) to provide the "Premium" feel.

### Customization Strategy

- **Theme:** Override the default `slate/zinc` palette with a sharper, high-contrast "Technical Dark Mode".
- **Typography:** Use strict inter-character spacing and font weights to mimic the precision of technical documentation.

## 2. Core User Experience

### 2.1 Defining Experience

The **Apply Wizard** is the "Defining Experience." It transforms a standard contact form into a **Guided Consultation**. It must feel like a diagnostic tool that respects the user's intelligence and time, not a bureaucratic hurdle.

### 2.2 User Mental Model

- **Current State:** "Qualifying forms are black boxes where I send data and get ignored."
- **Desired Shift:** "This tool is actively analyzing my needs to see if we are a fit."
- **Key Mechanic:** Dropping "Contact Us" for "Start your Roadmap" or "See if you qualify."

### 2.3 Success Criteria

- **Speed:** Input focus and page transitions must be instantaneous (Start rendering < 50ms).
- **Continuity (The "It Just Works" Factor):** If a user refreshes or leaves and returns, their exact state (input values, current step) is preserved via `localStorage`.
- **Zero CLS:** No layout shifts when validation errors appear or when moving between steps.

### 2.4 Novel UX Patterns

We are innovating on the standard "step-wizard" pattern by adding **Local-First Persistence**. Unlike most B2B forms that reset on reload, ours behaves like a desktop app, retaining state aggressively. This reduces "Application Anxiety" for high-stakes buyers.

### 2.5 Experience Mechanics

1.  **Initiation:** Triggered globally via the Sticky Nav ("Apply") or contextually from Case Studies ("Get results like this").
2.  **Interaction:**
    - **One-Thing-Per-Step:** Focus attention to reduce cognitive load (Typeform style).
    - **Smart Defaults:** Pre-select options based on referring page (e.g., coming from "Analytics" pre-selects "Analytics Project").
    - **Branching Logic:**
        - *Low Budget (<$10k):* Polite redirection to "DIY Course" or "Newsletter".
        - *High Budget ($50k+):* Deep-dive questions ("Current Agency?", "ROAS Goals?").
3.  **Feedback:** Real-time "Auto-saved" toast on every input change.
4. - **Completion:** Immediate transition to "Book Strategy Call" (Calendar embed) for qualified leads, maximizing momentum.

## Visual Design Foundation

### Selected Direction: Direction B (Glass Heavy)

**"Premium Consumer Feel."** We have moved away from the strict "Technical/Linear" look (Direction A) in favor of a richer, more accessible "Glass Heavy" aesthetic. This builds trust through high-end visual fidelity rather than just raw data density.

### Color System

- **Base Theme:** Deep, rich darks (`zinc-950` with purple/blue tint hints) rather than sterile gray.
- **Surfaces:** Heavy reliance on `backdrop-filter: blur(20px)` with `bg-white/5` to `bg-white/10` overlays.
- **Accents:** Gradient fills for buttons and active states (Blue -> Violet).
- **Text:** High contrast white (`#fff`) for headers, `zinc-300` for body.

### Typography System

- **Font Family:** `Inter` (Sans) is primary.
- **Headings:** Heavier weights (Semibold/Bold) with tighter tracking `tracking-tight`.
- **Display:** Large, imposing headers with soft drop shadows or gradient text `bg-clip-text`.

### Spacing & Layout Foundation

- **Cards:** Highly rounded corners (`rounded-2xl` or `rounded-3xl` for main containers).
- **Borders:** Subtle, luminous borders `border-white/10` or inner shadows to create depth.
- **Depth:** Significant usage of drop shadows `shadow-2xl` on floating glass, cards, and modals.
- **Backgrounds:** use of "noise" textures and subtle gradient globs (blobs) behind glass panels to emphasize the blur effect.

### Accessibility Considerations

- **Contrast:** Ensure text on glass panels maintains >4.5:1 ratio against the dynamic background.
- **Fallbacks:** "Glass" effects must gracefully degrade to solid opaque backgrounds (e.g., `zinc-900`) for browsers without `backdrop-filter` support.

