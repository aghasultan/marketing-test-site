# RR Labs — UI Component Inventory

## Layout Components

| Component | File | Purpose |
|---|---|---|
| `Layout` | `src/components/layout/Layout.tsx` | Main shell: Header + `<main>` + Footer |
| `Header` | `src/components/layout/Header.tsx` | Sticky header with scroll detection, brand logo, desktop nav, CTA button |
| `Footer` | `src/components/layout/Footer.tsx` | 4-column footer: brand, product links, resources, social icons |
| `MobileNav` | `src/components/layout/MobileNav.tsx` | Sheet-based mobile nav drawer (Radix Dialog) |
| `Hero` | `src/components/layout/Hero.tsx` | Landing hero section with animated badge, H1, subheadline, AuditScanner |

## Design System Primitives (shadcn/ui Style)

| Component | File | Built On | Variants |
|---|---|---|---|
| `Button` | `src/components/ui/button.tsx` | CVA | default, destructive, outline, secondary, ghost, link / sm, default, lg, icon |
| `Input` | `src/components/ui/input.tsx` | Native | Standard text input with design system styling |
| `Slider` | `src/components/ui/slider.tsx` | Radix Slider | Range slider with track and thumb |
| `Tooltip` | `src/components/ui/tooltip.tsx` | Radix Tooltip | Hover tooltip with portal |
| `Toast` | `src/components/ui/toast.tsx` | Radix Toast | Notification toast with variants (default, destructive) |
| `Toaster` | `src/components/ui/toaster.tsx` | Toast hook | Toast container/renderer |
| `Sheet` | `src/components/ui/sheet.tsx` | Radix Dialog | Side panel overlay (used by MobileNav) |
| `CurrencyInput` | `src/components/ui/currency-input.tsx` | Custom | Formatted currency input with locale support |
| `ThemeToggle` | `src/components/ui/ThemeToggle.tsx` | Custom | Dark/light mode switch |
| `NebulaBackground` | `src/components/ui/NebulaBackground.tsx` | Custom | Animated particle nebula canvas |
| `AnimatedBackground` | `src/components/ui/AnimatedBackground.ts` | Custom | Canvas-based animated gradient |
| `InteractiveBg` | `src/components/ui/InteractiveBg.tsx` | Custom | Mouse-tracking interactive gradient |

## Feature Components

### Audit Feature
| Component | File | Purpose |
|---|---|---|
| `AuditScanner` | `src/features/audit/components/AuditScanner.tsx` | Hero-embedded URL scanner with animated scan effect |
| `ResultCard` | `src/features/audit/components/ResultCard.tsx` | Individual audit result display |

### Results / Case Studies Feature
| Component | File | Purpose |
|---|---|---|
| `ResultsGrid` | `src/features/results/components/ResultsGrid.tsx` | Filterable grid of case study cards |
| `FilterBar` | `src/features/results/components/FilterBar.tsx` | Tag/industry/spend filter controls |
| `CaseStudyCard` | `src/features/results/components/CaseStudyCard.tsx` | Individual case study card with metric, tags, verified badge |
| `VerifiedBadge` | `src/features/results/components/VerifiedBadge.tsx` | "Verified" badge with tooltip |
| `VerificationTooltip` | `src/features/results/components/VerificationTooltip.tsx` | Tooltip explaining verification methodology |
| `ResultModal` | `src/features/results/components/ResultModal.tsx` | Full case study detail modal |
| `ROICalculator` | `src/features/results/components/ROICalculator.tsx` | Interactive ROI projection calculator |
| `MediaBuyingCalculator` | `src/features/results/components/MediaBuyingCalculator.tsx` | Media spend efficiency calculator |

### Qualification Wizard Feature
| Component | File | Purpose |
|---|---|---|
| `WizardContainer` | `src/features/wizard/components/WizardContainer.tsx` | Global modal overlay container |
| `WizardStepRenderer` | `src/features/wizard/components/WizardStepRenderer.tsx` | Renders current step based on state |
| `WelcomeStep` | `src/features/wizard/steps/WelcomeStep.tsx` | Initial welcome + website URL |
| `RevenueStep` | `src/features/wizard/steps/RevenueStep.tsx` | Revenue qualification input |
| `GoalsStep` | `src/features/wizard/steps/GoalsStep.tsx` | Goal selection (for qualified leads) |
| `ContactStep` | `src/features/wizard/steps/ContactStep.tsx` | Name + email capture |
| `QualifiedStep` | `src/features/wizard/steps/QualifiedStep.tsx` | Qualified lead confirmation |
| `PartnerReferralStep` | `src/features/wizard/steps/PartnerReferralStep.tsx` | Partner network referral path |

### Apply Feature (Zustand Wizard)
| Component | File | Purpose |
|---|---|---|
| `WizardLayout` | `src/features/apply/components/WizardLayout.tsx` | Apply wizard page layout |
| `StepIndicator` | `src/features/apply/components/StepIndicator.tsx` | Visual step progress indicator |
| `ReviewStep` | `src/features/apply/components/ReviewStep.tsx` | Application review before submit |
| `SuccessStep` | `src/features/apply/components/SuccessStep.tsx` | Post-submission success screen |

## SEO Components
| Component | File | Purpose |
|---|---|---|
| `SEO` / `Head` | `src/components/seo/Head.tsx` | Dynamic `<head>` tags via React Helmet (title, description, OG, JSON-LD) |

## Utility Components
| Component | File | Purpose |
|---|---|---|
| `ErrorBoundary` | `src/components/ErrorBoundary.tsx` | React error boundary with branded fallback UI |
| `CaseStudyGrid` | `src/components/CaseStudyGrid.tsx` | Standalone case study grid (used on Home) |
| `AuditForm` | `src/components/AuditForm.tsx` | URL input form for audit page |
| `AuditResults` | `src/components/AuditResults.tsx` | Detailed audit results display |

## Legacy Components (Superseded)
| Component | File | Status |
|---|---|---|
| `Footer` | `src/components/Footer.tsx` | Replaced by `layout/Footer.tsx` |
| `Header.legacy` | `src/components/Header.legacy.tsx` | Replaced by `layout/Header.tsx` |
