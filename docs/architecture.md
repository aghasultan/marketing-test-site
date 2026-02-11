# RR Labs — Architecture Documentation

## 1. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        VERCEL EDGE                          │
│  ┌────────────┐  ┌────────────┐  ┌────────────────────────┐ │
│  │ /api/audit  │  │ /api/contact│  │ /api/og (Edge Runtime)│ │
│  │ URL Scraper │  │ Email+Sheets│  │ Dynamic OG Images     │ │
│  └─────┬──────┘  └─────┬──────┘  └────────────────────────┘ │
│        │               │                                     │
│        │               ├──→ Gmail SMTP (Nodemailer)          │
│        │               ├──→ Google Sheets (Apps Script)      │
│        │               │                                     │
└────────┼───────────────┼─────────────────────────────────────┘
         │               │
    ┌────┴───────────────┴─────────────────────────────┐
    │              REACT SPA (Vite Build)               │
    │                                                   │
    │  ┌──────────┐  ┌──────────┐  ┌──────────────────┐│
    │  │  Router   │  │  Layout  │  │  Feature Modules ││
    │  │ (Lazy)    │  │ Header/  │  │ wizard / audit / ││
    │  │          │  │ Footer   │  │ results / apply  ││
    │  └──────────┘  └──────────┘  └──────────────────┘│
    │                                                   │
    │  ┌──────────┐  ┌──────────┐  ┌──────────────────┐│
    │  │ Services  │  │  Hooks   │  │  Design System   ││
    │  │ email/crm │  │ tracking │  │ Radix+Tailwind   ││
    │  └──────────┘  └──────────┘  └──────────────────┘│
    │                                                   │
    │  ┌──────────────────────────────────────────────┐ │
    │  │ State: WizardContext (useReducer+localStorage)│ │
    │  │        WizardStore (Zustand, apply module)    │ │
    │  └──────────────────────────────────────────────┘ │
    └───────────────────────────────────────────────────┘
```

---

## 2. Routing Architecture

| Route | Page Component | Lazy? | Purpose |
|---|---|---|---|
| `/` | `Home` | No (eagerly loaded) | Landing page with hero, audit scanner, calculators |
| `/audit` | `AuditPage` | Yes | AI ad performance audit tool |
| `/results` | `ResultsGrid` | Yes | Case study grid with filters |
| `/apply` | `Apply` | Yes | Multi-step qualification wizard |
| `/scale` | `Scale` | Yes | Services detail page |
| `/services` | `Scale` | Yes | Alias to Scale |
| `/blog` | `BlogIndex` | Yes | Blog listing page |
| `/blog/:slug` | `BlogPost` | Yes | Individual blog post |
| `/contact` | `Contact` | Yes | Lead generation contact form |
| `/design-system` | `DesignSystem` | Yes | Internal design system reference |
| `*` | `NotFound` | Yes | 404 page |

The router uses `createBrowserRouter` with a `Root` component wrapping all routes in:
- `HelmetProvider` (SEO)
- `SpeedInsights` (Vercel performance)
- `Toaster` (toast notifications)
- `WizardContainer` (global wizard overlay)
- `ErrorBoundary` (graceful error handling)
- `Layout` (Header + Footer + `<Outlet>`)

---

## 3. Serverless API Layer

### `POST /api/contact`

**Purpose:** Lead capture backend — receives form submissions and partial tracking data.

**Flow:**
1. Validates incoming payload (fullName, email, company, budget, services, message, + partial tracking fields)
2. Creates Gmail SMTP transporter via Nodemailer using `GMAIL_USER` + `GMAIL_APP_PASSWORD`
3. Sends notification email to owner with HTML-formatted lead details
4. If full submission (not partial) and has email → sends branded auto-reply to the lead
5. Logs submission to Google Sheets via `GOOGLE_SHEETS_URL` webhook (POST with JSON payload)

**Partial Tracking:** The contact form uses `sendBeacon` on `visibilitychange` and `beforeunload` events. If a user interacts with any field but doesn't submit, a partial payload is sent with `partial: true`, `fieldsInteracted[]`, and `timeOnPage`.

### `POST /api/audit`

**Purpose:** URL scraping proxy for the AI audit tool.

**Flow:**
1. Accepts a URL in the request body
2. Fetches the target URL using axios with a custom User-Agent
3. Parses HTML with cheerio to extract `<title>` and `<meta description>`
4. Returns raw HTML (first 500KB), meta data, and status to the client
5. Client-side `auditService.ts` then performs mock analysis to generate a score

### `GET /api/og`

**Purpose:** Dynamic Open Graph image generation using Vercel Edge Runtime.

**Flow:**
1. Reads `?title=` and `?description=` query parameters
2. Renders an `ImageResponse` (1200×630) with the RR Labs branded template
3. Returns the image for social media previews

---

## 4. State Management Architecture

### Wizard State (React Context + useReducer)

**Location:** `src/features/wizard/context/WizardContext.tsx`

State machine with 6 steps: `WELCOME → REVENUE → PARTNER_REFERRAL | GOALS → CONTACT → COMPLETED`

- **Branching logic:** Revenue below threshold → `PARTNER_REFERRAL` (partner network), above → `GOALS → CONTACT`
- **Persistence:** State saved to `localStorage` via `saveState`/`loadState` helpers
- **Side effects on completion:** Analytics tracking, email notification (mock), CRM sync (mock)

### Apply Form State (Zustand)

**Location:** `src/features/apply/stores/wizardStore.ts`

Separate store for the apply/application wizard form with step management.

### Contact Form State (Local Component State)

**Location:** `src/pages/Contact.tsx`

- Local `useState` for form data, submission status, field interactions
- `useRef` for partial submission guard and time tracking
- `sendBeacon` for abandoned form tracking

---

## 5. Design System

### Theming

- **Strategy:** Tailwind `darkMode: "class"` with CSS custom properties
- **Tokens:** HSL-based color tokens defined in `globals.css` (e.g., `--primary`, `--background`, `--foreground`)
- **Toggle:** `ThemeToggle` component in header switches classes
- **Fonts:** Inter Tight (sans), JetBrains Mono (code)

### Component Library

Built on **Radix UI** primitives with **shadcn/ui** conventions:
- `Button`, `Input`, `Slider`, `Tooltip`, `Toast`, `Dialog/Sheet`
- Custom components: `NebulaBackground`, `AnimatedBackground`, `InteractiveBg`, `CurrencyInput`

### Animation

- **Framer Motion:** Page-level transitions, hero stagger animations, scroll-triggered effects
- **CSS:** Custom `@keyframes` in `animations.css` and `globals.css`

---

## 6. External Integrations

| Integration | Type | Purpose |
|---|---|---|
| Gmail SMTP | Server-side (Nodemailer) | Send lead notification + auto-reply emails |
| Google Sheets | Server-side (Apps Script webhook) | CRM logging for all form submissions |
| Vercel Analytics | Client-side SDK | Page view + performance tracking |
| Vercel Speed Insights | Client-side SDK | Core Web Vitals monitoring |
| GTM dataLayer | Client-side (custom) | Event tracking (wizard steps, audit, calculator) |

---

## 7. Security

- **Headers:** HSTS, X-Frame-Options DENY, X-XSS-Protection, nosniff, strict referrer
- **CORS:** Audit API sets dynamic origin; contact API allows all origins
- **Secrets:** Gmail password and Sheets URL stored as Vercel environment variables (never in code)
- **Input Limits:** Audit API limits response to 500KB, 8s timeout, 5MB max content
- **SPA Fallback:** All non-API routes rewrite to `index.html` via `vercel.json`
