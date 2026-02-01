---
story_id: "5-4-performance-maximization"
epic_id: "epic-5"
title: "Performance Maximization (Core Web Vitals)"
description: "Optimize the application to achieve 95-100/100 Lighthouse scores by fixing CLS, ensuring proper image sizing, and optimizing LCP."
status: "in-progress"
assigned_to: "dev-agent"
---

## Tasks

- [ ] **CLS Zeroing**: Audit all images and ensure explicit `width` and `height` attributes are set (even if overridden by CSS) to reserve layout space.
- [ ] **LCP Optimization**: Ensure the Hero image/video/background is eager loaded, while everything else is lazy loaded.
- [ ] **Accessibility (a11y)**: Audit buttons and links for `aria-label` where text is missing (e.g., icon buttons).
- [ ] **Font Optimization**: Ensure `font-display: swap` is used in `@font-face` declarations.
- [ ] **SEO Check**: Verify all pages use the `<SEO />` component with unique metadata.

## Technical Notes
- Use `aspect-ratio` CSS property to reserve space for dynamic images.
- Add `rel="preload"` for LCP assets if necessary.
