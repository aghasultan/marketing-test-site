# System Architecture

**Generated:** 2026-01-30

## System Context

Riffat Labs operates as a static-first Single Page Application (SPA). It assumes no persistent backend database for content; instead, it uses the file system as its source of truth for blogs and case studies. This architecture optimizes for performance (edge caching), security (no database structure to attack), and ease of maintenance for a developer-centric owner.

## Architecture Diagram (Textual)

```mermaid
graph TD
    User[User Browser]
    Vercel[Vercel Edge Network]
    Origin[Static Content / Assets]
    Function[Edge Function]
    
    User -- HTTPS Request --> Vercel
    Vercel -- Cache Hit --> User
    Vercel -- Cache Miss --> Origin
    
    subgraph "Application Scope"
        SPA[React App (Client)]
        Router[Client Router]
        Content[Markdown Files]
        Logic[Hooks & Services]
    end
    
    Origin --> SPA
    SPA --> Router
    Router --> Logic
    Logic -- import.meta.glob --> Content
    
    subgraph "API Scope"
        OG_Gen[api/og.tsx]
    end
    
    User -- Open Graph Request --> OG_Gen
```

## Data Architecture

### Content Data (Read-Only)
- **Storage:** Markdown parameters in Frontmatter (YAML).
- **Access:** Loaded at build time (and chunks at runtime) via Vite.
- **Schema:** Defined loosely in Typescript interfaces (`BlogPost`, `CaseStudy`).

### User Data (Ephemeral)
- **Form Data:** Captured in `Wizard.tsx` state.
- **Submission:** Currently logs to console (`console.log("Submitting:", data)`).
- **Future State:** Would likely connect to a serverless endpoint or webhook (e.g., Zapier/Make) for processing.

## State Management

1.  **Local Component State:** deeply used for UI interactivity (e.g., `Wizard` step tracking, `Home` ROI calculator inputs).
2.  **URL State:** heavily utilized for navigation and deep linking (`react-router-dom`).
3.  **Global Context:** `HelmetProvider` for head management. No global store (Redux/Zustand) is currently used or needed given the application's scope.
