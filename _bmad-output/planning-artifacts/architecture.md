# **Architecture: Riffat Labs / Agha Sultan Naseer Portfolio V2**

**Status:** APPROVED (Gate 3\)

**Track:** BMad Method (Brownfield Upgrade)

**Tech Stack:** React 18, Vite, TypeScript, Tailwind CSS, Framer Motion

## **1\. Executive Summary**

The V2 architecture transforms the existing SPA into a high-performance "Dark Mode" authority platform \[cite: PRD.md\]. We are prioritizing visual depth via **Glassmorphism** and high-performance metrics, specifically targeting a Mobile LCP of \< 2.5s \[cite: PRD.md\]. The technical strategy focuses on a modular "feature-first" directory structure to accommodate new lead-generation tools \[cite: PRD.md\].

## **2\. Architectural Decision Records (ADRs)**

### **ADR-001: Styling & Glassmorphism Implementation**

* **Context:** The site requires a premium "Modern Agency" aesthetic with Zinc-950 backgrounds and Neon accents \[cite: product-brief.md, PRD.md\].  
* **Decision:** Implement Glassmorphism using Tailwind CSS utility abstractions rather than inline styles \[cite: PRD.md\].  
* **Rationale:** This ensures styling consistency across the Wizard.tsx refactor and new Bento-grid cards while maintaining high performance \[cite: PRD.md\].  
* **Constraint:** All glass elements must use hardware-accelerated properties (transform/opacity) for animations to avoid layout thrashing \[cite: PRD.md\].

### **ADR-002: AI Audit Tool (FR-001) Interface**

* **Context:** A hero-section lead magnet requires a 3-second simulation delay before displaying a "Score Card" \[cite: PRD.md\].  
* **Decision:** Utilize a **Service-Mock pattern** in src/lib/audit-logic.ts \[cite: PRD.md\].  
* **Rationale:** Decoupling the logic from the UI allows for future real API integration without refactoring the components \[cite: PRD.md\].

### **ADR-003: Content Sharding for Case Studies (FR-002)**

* **Context:** Static lists must be replaced with a dynamic, filterable grid using existing Markdown files \[cite: PRD.md\].  
* **Decision:** Implement **Document Sharding** principles for Markdown content in src/content/case-studies/.  
* **Rationale:** This enables selective loading and better organization for the "Dynamic Case Study Engine" \[cite: PRD.md\].

## **3\. Directory Structure (Refactor)**

To support the new functionality, the existing React structure will be reorganized into feature-based modules:

src/  
├── components/  
│   ├── ui/                \# Atomic components (Buttons, GlassCard) \[cite: PRD.md\]  
│   ├── features/  
│   │   ├── audit/         \# AI Audit Tool components \[cite: PRD.md\]  
│   │   ├── case-study/    \# Filterable grid and Bento cards \[cite: PRD.md\]  
│   │   └── wizard/        \# Refactored Glassmorphism form \[cite: PRD.md\]  
├── content/  
│   ├── blog/              \# Existing Markdown posts \[cite: project-context.md\]  
│   └── case-studies/      \# New Markdown files for Case Studies \[cite: PRD.md\]  
├── lib/  
│   ├── audit-service.ts   \# Interface and Mock Logic \[cite: PRD.md\]  
│   └── content-loader.ts  \# Gray-matter parsing utility \[cite: PRD.md\]  
├── middleware.ts          \# Vercel Edge localization \[cite: PRD.md\]  
└── styles/  
    └── globals.css        \# Tailwind/Lenis scroll setup \[cite: product-brief.md\]

## **4\. Technical Implementation Guides**

### **4.1. Motion & Smooth Scrolling**

* **Global Scroll:** Implement lenis for momentum-based smooth scrolling \[cite: product-brief.md\].  
* **Reveal Effects:** Use framer-motion for "Scroll Reveal" where elements fade and slide up as they enter the viewport \[cite: PRD.md\].  
* **Performance:** Ensure all motion triggers follow hardware-acceleration standards defined in ADR-001 \[cite: PRD.md\].

### **4.2. Vercel Edge Middleware (NFR-001)**

* **Localization:** Setup foundation in middleware.ts to detect user country via Vercel Edge \[cite: PRD.md\].  
* **Functionality:** This middleware will handle future localization of currency or content without adding client-side latency \[cite: PRD.md\].

### **4.3. Data Flow (AI Audit Tool)**

* **Step 1:** User inputs URL in hero section \[cite: PRD.md\].  
* **Step 2:** Trigger 3-second Lottie/CSS animation \[cite: PRD.md\].  
* **Step 3:** Component reads from audit-service.ts to return mock metrics (Tracking, Creative, Scaling) \[cite: PRD.md\].  
* **Step 4:** Display Score Card with routing to /apply \[cite: PRD.md\].

## **5\. Non-Functional Requirements (NFR) Standards**

* **Performance:** Vercel Speed Insights must remain active to monitor Core Web Vitals \[cite: PRD.md\].  
* **SEO:** Dynamic OG image generation is required for all Blog posts and Case Studies via @vercel/og \[cite: PRD.md, product-brief.md\].  
* **Accessibility:** Forced Dark Mode must maintain a Zinc-950 (\#09090b) background with neon accent contrast compliance \[cite: product-brief.md, PRD.md\].