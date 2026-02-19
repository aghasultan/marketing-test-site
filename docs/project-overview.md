# Project Overview

> **Project Name**: Riffat Labs (Marketing Site)
> **Type**: Monolith SPA (React 18 + Vercel Functions)
> **Goal**: High-performance agency website with audit tools and lead generation.

## Executive Summary
Riffat Labs is a digital marketing agency specializing in Paid Media (Meta, Google, TikTok) and Conversion Rate Optimization (CRO). The website serves as a primary lead generation tool, featuring interactive calculators, case studies, and a unique "No-Click Audit" engine that analyzes prospective client websites in real-time.

## Key Features

### 1. Interactive Tools
- **Audit Scanner**: Scrapes a user-submitted URL via serverless function to detect tracking pixels and SEO tags.
- **ROI Calculator**: Slider-based tool estimating potential revenue uplift.

### 2. Lead Generation
- **Contact Form**: Multi-step form with conditional logic.
- **Smart Wizard**: Qualification flow branching based on user input (Budget, Industry).
- **Email Integration**: Automated notifications to admin and confirmation to leads (Nodemailer).
- **CRM Integration**: Automatic logging of leads to Google Sheets via webhook.

### 3. Content System
- **Blog**: Markdown-based headless CMS for SEO articles.
- **Case Studies**: Detailed project breakdowns with filtering grid.

## Technology Stack

| Component | Technology | Version |
|---|---|---|
| **Frontend** | React (Vite) | 18.3+ |
| **Language** | TypeScript | 5.9+ |
| **Styling** | Tailwind CSS | 3.4+ |
| **Interaction** | Framer Motion | 12.29+ |
| **Backend** | Vercel Serverless | Node 18+ |
| **Testing** | Playwright | 1.49+ |

## Architecture Type
**Feature-Based Monolith SPA**
The application is structured around business domains (`features/`) rather than technical layers. While key components like `api/` are technically separate (serverless functions), they are co-located in the repository for seamless development and deployment.
