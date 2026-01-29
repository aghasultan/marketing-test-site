# Product Brief: Marketing Site V2 (Riffat Labs)

**Version:** 1.0
**Status:** Approved
**Date:** 2026-01-30

## 1. Vision & Strategy
**The Vision:** Transform the current React site into a "High-Performance Authority Platform." The design should feel premium, confident, and cutting-edge—moving away from standard corporate aesthetics to a "Dark Mode SaaS/Agency" vibe that resonates with 7-figure ad buyers.

**Core Value Prop:** "Turning ad spend into profit." The site itself must demonstrate this by being incredibly fast (Core Web Vitals) and high-converting.

## 2. Target Audience
* **Primary:** Founders/CMOs managing $50k+/month ad budgets.
* **Psychographics:** They care about ROI, data accuracy (CAPI/Server-side), and speed. They are tired of "fluff" agencies.

## 3. Design Language ("The Modern Agency")
* **Theme:** **Dark Mode First**. Deep Zinc/Neutral backgrounds (#09090b) with high-contrast Neon accents (Cyan/Purple/Lime) for call-to-actions.
* **Texture:** **Glassmorphism**. Frosted glass effects on cards, navbars, and overlays to create depth.
* **Motion:** **"Buttery Smooth"**.
    * Implement **Lenis Scroll** for momentum-based scrolling.
    * Use **Framer Motion** for text reveals (staggered entry) and hover states.
    * *Constraint:* Motion must not negatively impact LCP/CLS scores.

## 4. Key Features & Functional Requirements
### A. AI Ad Audit Tool (Lead Magnet)
* **Concept:** A high-value interaction on the Home page.
* **Flow:** User pastes URL → "Scanning" Animation (3-5s) → Returns a "Preliminary Ad Score" card.
* **Goal:** Capture intent immediately. The "Fix This" button routes to the Apply Wizard.

### B. Dynamic Case Study Engine
* **Problem:** Current list is static or basic.
* **Solution:** A filterable grid system.
* **Functionality:** Users can filter by Industry (SaaS, E-com) or Service (Lead Gen, Scale). No page reloads—instant filtering via React state.

### C. Enhanced Apply Wizard (Refined)
* **Strategy:** **Keep the dedicated Wizard page.** Do NOT embed Calendly directly.
* **Upgrade:** Refactor the existing multi-step form to match the new "Glassmorphism" aesthetic.
* **UX:** Improve progress indicators and success states. Ensure "drop-off" points are minimized.

## 5. Technical Strategy (Vercel Ops)
* **Infrastructure:** React 18 + Vite (Existing).
* **Hosting:** Vercel.
* **Optimizations:**
    * **Vercel Speed Insights:** Strict monitoring of Core Web Vitals (LCP/CLS).
    * **Edge Middleware:** Geolocation-based content (e.g., showing local currency or timezone-relevant greetings).
    * **Dynamic OG Images:** Auto-generate social cards for blog posts using `@vercel/og`.

## 6. Success Metrics
1.  **Performance:** Lighthouse Performance Score > 95 (Mobile).
2.  **Conversion:** Increase "Wizard Completion" rate by improving the UI flow.
3.  **Brand:** Visual consistency across all 3 key pages (Home, Scale, Apply).