# Story 5.2: Accessibility & SEO Finalization

## Rationale
To ensure the site is indexable by search engines and usable by all users (compliance), we need standard SEO files and WCAG baseline checks.

## Tasks
- [x] 1. Generate `robots.txt` & `sitemap.xml`
    - Created `robots.txt` with strict rules.
    - Created `scripts/generate-sitemap.ts` to build XML from static routes + blog.
    - Added `build:sitemap` to NPM scripts.
- [x] 2. Audit Meta Tags
    - Verified `SEO` component props.
    - Updated `seo-config.ts` to use `@riffatlabs` handle.
    - `robots.txt` points to sitemap.
- [x] 3. Accessibility Scan
    - Verified `alt` tags on Home images.
    - Verified `aria-label` on `ThemeToggle` and `MobileNav`.
    - Footer icons have `aria-label`.
