# Product Requirements Document (PRD): Marketing Site V2

**Version:** 2.0
**Status:** DRAFT
**Track:** BMad Method (Brownfield Upgrade)

## 1. Introduction
**Product Name:** Riffat Labs / Agha Sultan Naseer Portfolio V2
**Goal:** Upgrade the existing React SPA into a high-performance, "Dark Mode" authority platform for high-ticket ad buyers.
**Success Metrics:**
- **Performance:** Core Web Vitals (LCP < 2.5s) on Mobile.
- **Engagement:** Reduce bounce rate on Home via "AI Audit" interaction.
- **Conversion:** Increase "Wizard Completion" rate by 15% via improved UX.

## 2. User Personas
1.  **The Scale-Up Founder:** Spends $50k+/mo on ads. Cares about data accuracy (CAPI) and speed. Wants to see "proof" instantly.
2.  **The Marketing Manager:** Browses case studies to validate expertise before booking a call.

## 3. Functional Requirements (FR)

### FR-001: AI Ad Audit Tool (Lead Magnet)
* **Description:** A hero-section component allowing users to input a URL for a "preliminary audit."
* **User Flow:** Input URL -> Click "Scan" -> 3s Lottie/CSS Animation -> Show "Score Card" (Mock Data initially).
* **Output:** Score Card shows 3 metrics (Tracking Quality, Creative Diversity, Scaling Potential) and a button: "Fix This Now" (Links to `/apply`).
* **Technical Constraint:** Logic can be client-side mock for V2, but must be architected to allow real API integration later.

### FR-002: Dynamic Case Study Engine
* **Description:** Replace static list with a filterable grid.
* **Features:**
    * **Filter Tabs:** "All", "SaaS", "E-commerce", "Lead Gen".
    * **Instant Interaction:** Filtering happens client-side (no reload).
    * **Content Source:** Parse existing Markdown files in `src/content/blog` using `gray-matter`.
* **UI:** Bento-grid style cards that reveal details on hover.

### FR-003: Enhanced Apply Wizard
* **Description:** Refactor existing `Wizard.tsx` to match the new Dark Mode aesthetic.
* **Requirements:**
    * **Glassmorphism:** Container must use backdrop-blur and thin borders.
    * **Progress:** Clear "Step X of Y" indicator.
    * **Validation:** Real-time Zod validation (red borders on error, green on success).
    * **Routing:** Keeps its own route `/apply`.

### FR-004: Global UI/UX Overhaul
* **Theme:** Force Dark Mode (Zinc-950 background).
* **Typography:** Maintain `Space Grotesk`. Large, bold headers (text-6xl+).
* **Motion:**
    * Implement `lenis` for smooth scrolling.
    * Implement `framer-motion` for "Scroll Reveal" (elements fade in + slide up as user scrolls).

## 4. Non-Functional Requirements (NFR)

### NFR-001: Vercel Optimization
* **Edge Middleware:** Detect user country to potentially localize currency/content in future (setup foundation now).
* **Analytics:** Vercel Analytics and Speed Insights must be active.
* **SEO:** Dynamic OG Image generation for every Blog Post and Case Study.

### NFR-002: Performance Constraints
* **Animations:** Must use hardware-accelerated properties (transform, opacity) to avoid layout thrashing.
* **Images:** All assets must use `.webp` or `.svg`.

## 5. Technical Stack
* **Frontend:** React 18, Vite, TypeScript.
* **Styling:** Tailwind CSS (v3 or v4), Framer Motion.
* **Routing:** React Router DOM v6+.
* **Deployment:** Vercel.