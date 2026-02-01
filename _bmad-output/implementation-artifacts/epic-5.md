---
epic: "epic-5"
title: "Epic 5: Authority, Analytics & Optimization"
description: "Establish the Riffat Labs Content Authority Engine, implement deep-layer analytics for granular funnel observation, and maximize performance scores to 100/100."
status: "in-progress"
priority: "high"
---

## Overview

Following the successful launch of the core platform (Epics 1-4), Epic 5 shifts focus to **Growth & Optimization**. This epic combines visual stabilization, content marketing infrastructure, advanced user behavior tracking, and technical performance maximization.

## Requirements Inventory

### Functional Requirements
- **FR19**: User can browse blog posts with advanced filtering (Category, Tags).
- **FR20**: User can search for blog posts via a real-time search bar.
- **FR21**: System can auto-suggest "Related Posts" based on tag overlap.
- **FR22**: System can generate an RSS feed for SEO syndication.
- **FR23**: System can track specific "Micro-Conversions" locally (Scroll Depth, Time on Calculator).
- **FR24**: User can see a consistent, high-contrast UI across all devices (Visual Fixes).
- **FR25**: System explicitly enforces Dark Mode aesthetics to prevent "White Flash" issues.

### Non-Functional Requirements
- **NFR10**: Lighthouse Performance Score must be 95+ on Mobile.
- **NFR11**: Cumulative Layout Shift (CLS) must be 0.00.
- **NFR12**: Images must be served in AVIF/WebP formats with explicit dimensions.
- **NFR13**: Analytic scripts must be loaded via Partytown or Web Worker to prevent main-thread blocking.

## Story List

### Story 5.1: UI Polish & Visual Stability
**As a User,**
I want a consistent, readable, and premium "Dark Mode" experience without visual glitches,
**So that** I trust the brand's attention to detail.

**Acceptance Criteria:**
- **Given** the "Nebula" background
- **When** it renders
- **Then** it should be subtle (low opacity) and NOT wash out the text
- **And** the `body` background must be strictly `#09090b` (Zinc-950) at all times
- **And** the "brands" logos must be clearly visible (inverted correctly against dark bg)
- **And** the Desktop Navigation bar must be fully visible and accessible
- **And** "Brands & Operators" text must be ledgeible (contrast ratio > 4.5:1)

### Story 5.2: Content Authority Engine (Advanced Blog)
**As a Reader,**
I want to easily find and navigate high-quality content,
**So that** I can solve my specific problems and build trust in Riffat Labs.

**Acceptance Criteria:**
- **Given** I am on the `/blog` index
- **When** I type in the search bar
- **Then** the post list should filter in real-time
- **And** I can toggle filters by Category (e.g., "Meta Ads", "Analytics")
- **And** when viewing a post, I see 2-3 "Related Articles" at the bottom
- **And** an RSS feed is available at `/rss.xml`

### Story 5.3: Advanced Analytics & Observation
**As a Growth Engineer,**
I want to track granular user interactions beyond just pageviews,
**So that** I can optimize the conversion funnel based on data.

**Acceptance Criteria:**
- **Given** a user interacts with the "ROI Calculator"
- **When** they adjust a slider
- **Then** an event `calculator_interaction` should be logged (debounced)
- **Given** the "Smart Wizard"
- **When** a user drops off at a specific step
- **Then** a `wizard_dropoff` event with `step_id` should be logged
- **And** PostHog (or compatible provider) should be initialized seamlessly

### Story 5.4: Performance Maximization
**As a Technical Lead,**
I want the site to score 100/100 on Core Web Vitals,
**So that** we maximize our Google Ads Quality Score and organic ranking.

**Acceptance Criteria:**
- **Given** a production build
- **When** analyzed by Lighthouse
- **Then** Performance score should be >95
- **And** Accessibility score should be 100
- **And** all images should use `picture` tags with AVIF/WebP sources
- **And** CLS should be exactly 0
