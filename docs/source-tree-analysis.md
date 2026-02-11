# RR Labs — Source Tree Analysis

## Annotated Directory Tree

```
marketing-test-site/
│
├── api/                              # ⚡ Vercel Serverless Functions
│   ├── audit.ts                      #    POST /api/audit — URL scraper + HTML extraction
│   ├── contact.ts                    #    POST /api/contact — Email notifications + Google Sheets CRM
│   └── og.tsx                        #    GET /api/og — Dynamic OG image (Edge Runtime)
│
├── src/                              # 📦 Main Application Source
│   ├── app/                          # 🚀 Application Core (entry, router, globals)
│   │   ├── main.tsx                  #    React DOM render entry point
│   │   ├── App.tsx                   #    App wrapper with WizardProvider + RouterProvider
│   │   ├── router.tsx                #    Route definitions (createBrowserRouter, lazy imports)
│   │   └── globals.css               #    CSS custom properties, font imports, theme tokens
│   │
│   ├── components/                   # 🧩 Shared Components
│   │   ├── layout/                   # ── Layout Shell
│   │   │   ├── Layout.tsx            #    Main layout wrapper (Header + main + Footer)
│   │   │   ├── Header.tsx            #    Sticky nav with scroll detection, brand logo, desktop nav
│   │   │   ├── Footer.tsx            #    4-column footer (brand, links, resources, social)
│   │   │   ├── Hero.tsx              #    Landing page hero with AuditScanner + trust signals
│   │   │   └── MobileNav.tsx         #    Sheet-based mobile navigation drawer
│   │   │
│   │   ├── ui/                       # ── Design System Primitives (shadcn/ui style)
│   │   │   ├── button.tsx            #    CVA-powered Button with variants
│   │   │   ├── input.tsx             #    Styled input component
│   │   │   ├── slider.tsx            #    Radix Slider
│   │   │   ├── tooltip.tsx           #    Radix Tooltip
│   │   │   ├── toast.tsx             #    Toast notification system
│   │   │   ├── toaster.tsx           #    Toast container/renderer
│   │   │   ├── sheet.tsx             #    Radix Dialog-based sheet (used by MobileNav)
│   │   │   ├── currency-input.tsx    #    Formatted currency input with locale
│   │   │   ├── ThemeToggle.tsx       #    Dark/light mode toggle
│   │   │   ├── NebulaBackground.tsx  #    Animated nebula particle background
│   │   │   ├── AnimatedBackground.ts #    Canvas-based animated background
│   │   │   └── InteractiveBg.tsx     #    Interactive gradient background
│   │   │
│   │   ├── seo/                      # ── SEO Components
│   │   │   └── Head.tsx              #    SEO component (Helmet with JSON-LD, OG tags)
│   │   │
│   │   ├── AuditForm.tsx             #    URL input form for audit tool
│   │   ├── AuditResults.tsx          #    Audit score display + recommendations
│   │   ├── CaseStudyGrid.tsx         #    Case study card grid with CTA
│   │   ├── ErrorBoundary.tsx         #    React error boundary with branded fallback
│   │   ├── Footer.tsx                #    Legacy footer (superseded by layout/Footer)
│   │   └── Header.legacy.tsx         #    Legacy header (superseded by layout/Header)
│   │
│   ├── features/                     # 🏗️ Feature Modules (domain-organized)
│   │   ├── apply/                    # ── Application Wizard (Zustand)
│   │   │   ├── components/           #    WizardLayout, StepIndicator, ReviewStep, SuccessStep
│   │   │   ├── hooks/                #    useApplyForm, useWizard
│   │   │   ├── stores/               #    wizardStore (Zustand)
│   │   │   └── types.ts              #    ApplyFormData type definitions
│   │   │
│   │   ├── audit/                    # ── Audit Scanner
│   │   │   └── components/           #    AuditScanner (hero inline), ResultCard
│   │   │
│   │   ├── results/                  # ── Case Studies & Calculators
│   │   │   ├── components/           #    ResultsGrid, FilterBar, CaseStudyCard, VerifiedBadge,
│   │   │   │                         #    VerificationTooltip, ResultModal, ROICalculator,
│   │   │   │                         #    MediaBuyingCalculator
│   │   │   ├── hooks/                #    useResultsFilter
│   │   │   └── types.ts              #    CaseStudy, FilterState types
│   │   │
│   │   └── wizard/                   # ── Qualification Wizard (Context)
│   │       ├── context/              #    WizardContext (state machine, Provider, reducer)
│   │       ├── logic/                #    routing.ts (step branching), persistence.ts (localStorage)
│   │       ├── components/           #    WizardContainer (modal overlay), WizardStepRenderer
│   │       └── steps/                #    WelcomeStep, RevenueStep, GoalsStep, ContactStep,
│   │                                 #    QualifiedStep, PartnerReferralStep
│   │
│   ├── pages/                        # 📄 Route-Level Page Components
│   │   ├── Home.tsx                  #    Landing page (Hero, CaseStudyGrid, calculators)
│   │   ├── Scale.tsx                 #    Services page (service showcase, value math, guarantee)
│   │   ├── AuditPage.tsx             #    Audit tool page (form + results)
│   │   ├── Contact.tsx               #    Lead gen contact form with partial tracking
│   │   ├── Apply.tsx                 #    Application wizard page
│   │   ├── BlogIndex.tsx             #    Blog listing page
│   │   ├── BlogPost.tsx              #    Individual blog post renderer
│   │   ├── DesignSystem.tsx          #    Internal design system playground
│   │   └── NotFound.tsx              #    404 page
│   │
│   ├── services/                     # 🔌 Client-Side Service Layer
│   │   ├── emailService.ts           #    MockEmailService (console logging, dev simulation)
│   │   ├── crmService.ts             #    MockCrmService (console logging, lead mapping)
│   │   ├── contentService.ts         #    Markdown content loader (gray-matter parsing)
│   │   └── auditService.ts           #    Mock audit analyzer (simulated scoring)
│   │
│   ├── hooks/                        # 🪝 Custom Hooks
│   │   ├── useBlog.ts                #    Blog content fetching hook
│   │   ├── use-toast.ts              #    Toast notification hook (shadcn pattern)
│   │   └── useParticles.ts           #    Particle animation hook
│   │
│   ├── lib/                          # 🛠️ Utilities & Config
│   │   ├── seo-config.ts             #    SEO defaults (title template, OG image, site URL)
│   │   ├── tracking.ts               #    Analytics: trackEvent, usePageTracking, initTracking
│   │   ├── constants.ts              #    NAV_LINKS array
│   │   ├── utils.ts                  #    cn() class merge utility
│   │   ├── design-system.ts          #    Design token exports
│   │   └── content.ts                #    Content helpers
│   │
│   ├── data/                         # 📊 Static Data
│   │   └── results.ts                #    Case study data array (EcoMarket, TechFlow, FinSecure)
│   │
│   ├── content/                      # 📝 Markdown Content
│   │   ├── blog/                     #    Blog posts (hello-world.md)
│   │   └── case-studies/             #    Case studies (scale-health, b2b-saas, algo-recovery, scale-ecommerce)
│   │
│   └── locales/                      # 🌐 Translation Files
│       └── en/translation.json       #    English translations
│
├── tests/                            # 🧪 Playwright E2E Tests
│   ├── home.spec.ts                  #    Homepage rendering + navigation
│   ├── header.spec.ts                #    Header scroll, nav links, mobile
│   ├── scale.spec.ts                 #    Services page
│   ├── results.spec.ts               #    Case study grid + filtering
│   ├── wizard.spec.ts                #    Wizard flow
│   ├── audit-wizard-integration.spec.ts # Audit → wizard integration
│   ├── seo.spec.ts                   #    SEO meta tags validation
│   └── site.spec.ts                  #    Site-wide tests
│
├── scripts/                          # 🔧 Build Scripts
│   ├── generate-rss.ts               #    RSS feed generation
│   └── generate-sitemap.ts           #    Sitemap XML generation
│
├── public/                           # 🖼️ Static Assets
│   └── img/                          #    Brand images, logos
│
├── 404.html                          # Static 404 fallback (pre-SPA)
├── index.html                        # SPA entry HTML
├── vercel.json                       # Vercel deployment config (rewrites, headers, functions)
├── vite.config.ts                    # Vite build config with path aliases
├── tailwind.config.js                # Tailwind theme (design tokens, fonts, colors)
├── tsconfig.json                     # TypeScript config
├── playwright.config.ts              # Playwright test config
├── vitest.config.ts                  # Vitest unit test config
├── package.json                      # Dependencies and scripts
├── robots.txt                        # Search engine directives
├── sitemap.xml                       # Generated sitemap
├── style.css                         # Root stylesheet
└── animations.css                    # Custom CSS animations
```

## Critical Folders

| Folder | Purpose |
|---|---|
| `api/` | Serverless backend — only 3 files but handles all external integrations |
| `src/features/wizard/` | Core business logic — qualification routing, state machine |
| `src/pages/Contact.tsx` | Lead generation with partial tracking, connects to `/api/contact` |
| `src/components/layout/` | Site-wide shell (Header, Footer, MobileNav) |
| `src/lib/` | Shared utilities, SEO, tracking, design system |

## Entry Points

- **App:** `src/app/main.tsx` → `App.tsx` → `router.tsx`
- **Audit API:** `api/audit.ts` → `handler()`
- **Contact API:** `api/contact.ts` → `handler()`
- **OG Images:** `api/og.tsx` → Edge Runtime `handler()`
