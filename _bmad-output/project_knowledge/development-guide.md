# Development Guide

**Generated:** 2026-01-30

## Prerequisites

- **Node.js:** v18+ recommended (based on dependencies).
- **Package Manager:** `npm` (lockfile present).

## Local Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/aghasultan/marketing-test-site.git
    cd marketing-test-site
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start Development Server:**
    ```bash
    npm run dev
    ```
    Access the site at `http://localhost:5173`.

## Build & Test

- **Production Build:**
    ```bash
    npm run build
    ```
    Outputs to `dist/`.

- **Run Tests:**
    ```bash
    npm run test
    ```
    Runs Playwright end-to-end tests.

- **Linting:**
    ```bash
    npm run lint
    ```

## Adding Content

### Blog Posts
1.  Create a new `.md` file in `src/content/blog/`.
2.  Add required Frontmatter:
    ```yaml
    ---
    title: "Post Title"
    date: "2024-01-01"
    description: "Short summary"
    category: "Meta Ads"
    ---
    ```

### Case Studies
1.  Create a new `.md` file in `src/content/case-studies/`.
2.  Add required Frontmatter:
    ```yaml
    ---
    title: "Client Name Success"
    client: "Brand Name"
    industry: "Ecommerce"
    metric: "300% ROAS"
    result: "Scaled to $50k/mo"
    tags: ["Facebook Ads", "Creative"]
    date: "2024-01-01"
    ---
    ```
