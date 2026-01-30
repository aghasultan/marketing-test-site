# Walkthrough - Advanced SEO & Schema

## Overview
This walkthrough demonstrates the implementation of **Story 4.3: Advanced SEO & Schema**, completing **Epic 4**. We have added structured data (JSON-LD) support to the `SEO` component and injected specific schemas for the Home and Scale pages to improve search engine understanding and rich result qualification.

## Changes

### 1. `SEO` Component Update
Updated `src/components/SEO.tsx` to handle an optional `schema` prop.
````carousel
```tsx
// src/components/SEO.tsx
// ...
// JSON-LD Schema
{schema && (
<script type="application/ld+json">
    {typeof schema === 'string' ? schema : JSON.stringify(schema)}
</script>
)}
// ...
```
````

### 2. Home Page (Organization Schema)
Injected `Organization` schema into `src/pages/Home.tsx`.
````carousel
```tsx
// src/pages/Home.tsx
<SEO
    // ...
    schema={{
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Agha Sultan Naseer",
        "url": "https://aghasultan.com",
        "logo": "https://aghasultan.com/img/riffat-labs-transparent.svg",
        "sameAs": [
        "https://www.linkedin.com/in/aghasultan",
        "https://twitter.com/aghasultan"
        ]
    }}
/>
```
````

### 3. Scale Page (Service Schema)
Injected `Service` schema into `src/pages/Scale.tsx`.
````carousel
```tsx
// src/pages/Scale.tsx
<SEO
    // ...
    schema={{
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Performance Paid Media",
        "provider": {
        "@type": "Organization",
        "name": "Agha Sultan Naseer",
        "url": "https://aghasultan.com"
        },
        "areaServed": ["US", "UK", "Europe"]
        // ...
    }}
/>
```
````

## Verification Results

### Automated Checks
-   **Build**: Passed (`npm run build`).

### Manual Verification
-   **Structured Data**:
    -   `Home.tsx`: Contains `<script type="application/ld+json">` with Organization data.
    -   `Scale.tsx`: Contains `<script type="application/ld+json">` with Service data.
-   **Meta Tags**: Valid titles, descriptions, and OG tags persist.
