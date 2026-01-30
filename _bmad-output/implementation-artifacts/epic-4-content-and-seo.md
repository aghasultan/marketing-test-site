# Epic 4: Content & SEO Polish

## Description
Harmonize the Home and Services pages with the new "Glassmorphism" Design System (Tailwind CSS) established in Epics 2 & 3. Implement comprehensive SEO with JSON-LD schemas to maximize reach for the "Marketing Test Site".

## Stories

### Story 4.1: Home Page Visual Refactor
**As a** Visitor,
**I want** a visually stunning Home page that matches the Apply Wizard's aesthetic,
**So that** I trust the brand's premium positioning.

**Acceptance Criteria:**
- [ ] Refactor `Home.tsx` to replace custom CSS/BEM classes with utility-first Tailwind CSS.
- [ ] Ensure "Glassmorphism" cards are consistent with `WizardLayout`.
- [ ] Verify Mobile responsiveness implementation.
- [ ] Ensure "ROI Calculator" uses standard `forms` input styles.

### Story 4.2: Scale (Services) Page Refactor
**As a** Technical Buyer,
**I want** a clean, readable Services page,
**So that** I can easily scan the offer details.

**Acceptance Criteria:**
- [ ] Refactor `Scale.tsx` to remove inline styles and use Tailwind.
- [ ] Ensure consistent typography (Inter/JetBrains Mono).
- [ ] Verify navigation links to `Apply` wizard work correctly.

### Story 4.3: Advanced SEO & Schema
**As a** Search Engine,
**I want** structured data (JSON-LD),
**So that** I can rich-snippet the Case Studies and Organization details.

**Acceptance Criteria:**
- [ ] Update `SEO.tsx` to accept a `schema` prop.
- [ ] Implement `Organization` schema on Home Page.
- [ ] Implement `Service` schema on Scale Page.
- [ ] Verify generic meta tags are correct.

## Dependencies
- Epic 2 (Results) and Epic 3 (Apply) Design Systems.
