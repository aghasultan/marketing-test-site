# Story 5.1: Performance Optimization

## Rationale
To ensure the site loads instantly and feels premium ("Deep Glass" aesthetic requires smooth performance), we must optimize the Critical Rendering Path. Lower LCP building trust.

## Tasks
- [x] 1. Audit Bundle Size & Code Splitting
    - Lazy loaded Home sections (`CaseStudyGrid`, `MediaBuyingCalculator`).
    - Removed manual `vendor` chunk for granular splitting.
    - Verified `lucide-react` tree-shaking.
- [x] 2. Image Optimization
    - Verified explicit width/height on client logos.
    - Verified lazy loading on below-fold images.
- [x] 3. Font Optimization
    - Verified `display: swap` for Google Fonts.
    - @fontsource imports use localized WOFF2 files.
- [x] 4. Verify Lazy Loading
    - Router uses `lazy` for all pages.
    - Home uses `lazy` for heavy features.

## Technical Notes
- Target: < 100KB initial gzip JS.
- LCP Element: Likely the Hero Headline or Logo.
