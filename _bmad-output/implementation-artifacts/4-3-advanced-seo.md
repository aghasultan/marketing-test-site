# Story 4.3: Advanced SEO & Schema

## Context
To maximize the "Marketing Test Site" reach and authority, we need to implement structured data (JSON-LD). This helps search engines understand the organization, services, and case studies, allowing for rich snippets in search results. The current SEO implementation only handles basic meta tags.

## Requirements

### 1. Enhance SEO Component
- Update `SEO.tsx` to accept a `schema` prop (object or string).
- Render the schema as a JSON-LD script tag within `<Helmet>`.

### 2. Implement Organization Schema (Home Page)
- On `Home.tsx`, inject `Organization` schema.
- Data points: Name ("Agha Sultan Naseer"), URL, Logo, SameAs (social profiles).

### 3. Implement Service Schema (Scale Page)
- On `Scale.tsx`, inject `Service` schema.
- Data points: ServiceType ("Performance Paid Media"), Provider, AreaServed (USA, UK, Europe).

### 4. Verification
- Verify the generic meta tags still work.
- Verify the JSON-LD script is correctly present in the DOM on both pages.

## Acceptance Criteria
- [x] `SEO.tsx` accepts and renders `schema`.
- [x] Home Page contains valid `Organization` JSON-LD.
- [x] Scale Page contains valid `Service` JSON-LD.
- [x] No regression on existing meta tags (Title, Description, OG).

## Technical Implementation
- Modify `src/components/SEO.tsx`.
- Modify `src/pages/Home.tsx`.
- Modify `src/pages/Scale.tsx`.
