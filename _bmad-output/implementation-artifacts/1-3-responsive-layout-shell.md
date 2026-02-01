# Story 1.3: Responsive Layout Shell

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a User,
I want to see a consistent Header and Footer across all pages that adapts to Mobile and Desktop,
so that I can navigate the site easily and feel grounded in the brand regardless of my device.

## Acceptance Criteria

1.  **Given** I am on any page of the site
    **When** I scroll down
    **Then** the Header should remain sticky at the top
    **And** it should have a glass background (`backdrop-blur`) to readable over content.

2.  **Given** I am on a Desktop device (>1024px)
    **When** I view the Header
    **Then** I should see the logo and full navigation links (Product, Case Studies, Pricing, Resources).

3.  **Given** I am on a Mobile device (<768px)
    **When** I view the Header
    **Then** the navigation links should be hidden
    **And** a "Menu" button (Hamburger) should be visible.

4.  **Given** I click the Mobile Menu button
    **When** the menu opens
    **Then** it should slide out (Sheet component) with a glass effect
    **And** contain all navigation links vertically stacked.

5.  **Given** I scroll to the bottom
    **When** I view the Footer
    **Then** I should see the Brand Logo, Social Links, and Copyright info
    **And** it should be responsive (stacked on mobile, grid on desktop).

## Tasks / Subtasks

- [x] **Task 1: Sticky Header Component** (AC: 1, 2)
    - [x] Create `src/components/layout/Header.tsx`
    - [x] Implement `sticky top-0 z-50` positioning with `.glass` utility
    - [x] Add Logo (Text or SVG)
    - [x] Add Desktop Navigation Links (hidden on mobile)

- [x] **Task 2: Mobile Navigation (Sheet)** (AC: 3, 4)
    - [x] Install Shadcn Sheet component: `npx shadcn@latest add sheet`
    - [x] Create `src/components/layout/MobileNav.tsx`
    - [x] Implement Hamburger Trigger
    - [x] Implement Sheet Content with vertical links

- [x] **Task 3: Responsive Footer** (AC: 5)
    - [x] Create `src/components/layout/Footer.tsx`
    - [x] Implement Grid Layout (Desktop) vs Flex Column (Mobile)
    - [x] Add placeholder Social Links and Legal links

- [x] **Task 4: Layout Composition**
    - [x] Create `src/components/layout/Layout.tsx` wrapper
    - [x] Integrate Header, `<Outlet />` (or children), and Footer
    - [x] Update `src/app/App.tsx` or `router.tsx` to use this Layout

- [x] **Task 5: Verification**
    - [x] Verify responsiveness in DevTools (Mobile vs Desktop)
    - [x] Verify Sticky behavior on scroll

## Dev Notes

### Architecture Patterns
- **Module Locality:** Put these in `src/components/layout`.
- **Shadcn Usage:** Use the `Sheet` primitive for the mobile menu to ensure accessibility (Focus trap, keyboard nav).
- **Glassmorphism:** Ensure the Header uses the global `.glass` utility defined in Story 1.2.

### References
- [UX Spec Section 11: Mobile Considerations](_bmad-output/planning-artifacts/ux-design-specification.md#11-mobile-considerations)
- [Architecture Section 5: Structure](_bmad-output/planning-artifacts/architecture.md#5-project-structure--boundaries)

### Completion Notes List
- Installed Shadcn `sheet` component.
- Implemented `Header` with sticky Glassmorphism and responsive links.
- Implemented `MobileNav` using Sheet and standard links.
- Implemented `Footer` with responsive grid layout.
- Created `Layout` component to wrap content with Header, Footer, and Background.
- Updated `router.tsx` to use the new `Layout` component.
- Deleted legacy `src/components/Layout.tsx`.
- Defined standard endpoints in `src/lib/constants.ts` (Product, Case Studies, Pricing, Resources).
- Build passed successfully.

### File List
- src/components/layout/Header.tsx
- src/components/layout/MobileNav.tsx
- src/components/layout/Footer.tsx
- src/components/layout/Layout.tsx
- src/components/ui/sheet.tsx
- src/lib/constants.ts
- src/app/router.tsx
- components.json (updated by shadcn)

## Dev Agent Record

### Agent Model Used
Antigravity
