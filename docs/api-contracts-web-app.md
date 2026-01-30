# API Contracts & Services (web-app)

## Overview
This document outlines the internal services and API interactions used by the Web Application part of the monolith. As a client-side application, it primarily interacts with internal services that mock backend functionality or load content.

## Services

### Audit Service
**Source:** `src/services/auditService.ts`

Handles the analysis of URLs for the marketing audit feature. Currently implements a mock strategy with simulated latency.

#### `mockAnalyzeUrl(url: string): Promise<AuditResult>`
- **Input:** `url` (string) - The URL to analyze
- **Output:** `AuditResult` object
- **Behavior:**
  - Logs analysis request
  - Simulates 1.5s - 3.5s delay
  - Returns hardcoded mock data (Score 72, Grade C)

### Content Service
**Source:** `src/services/contentService.ts`

Manages loading and parsing of markdown content for case studies.

#### `getCaseStudies(): Promise<CaseStudy[]>`
- **Input:** None
- **Output:** Array of `CaseStudy` objects
- **Behavior:**
  - Uses `import.meta.glob` to load raw markdown from `../content/case-studies/*.md`
  - Parses frontmatter using `gray-matter`
  - Sorts results by date (descending)

## Future API Integrations
_No external REST or GraphQL endpoints are currently integrated. The application is self-contained._
