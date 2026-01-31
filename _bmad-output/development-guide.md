# Development Guide

## Prerequisites

- **Node.js**: Version 18+ recommended (LTS)
- **Package Manager**: npm (v9+)
- **Git**: For version control

## Initial Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/aghasultan/marketing-test-site.git
    cd marketing-test-site
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Setup Environment:**
    Copy `.env.example` to `.env` (if applicable) and configure variables.

## Running Locally

To start the development server with HMR (Hot Module Replacement):

```bash
npm run dev
```

Visit `http://localhost:5173` (or the port shown in terminal).

## Build for Production

To create a production-ready build:

```bash
npm run build
```

This runs `tsc` (TypeScript Compiler) for type checking and `vite build` to bundle assets into `dist/`.

## Testing

This project uses **Playwright** for End-to-End (E2E) testing.

**Run all tests:**
```bash
npm run test
```
(This executes `playwright test`)

**Run tests in UI mode:**
```bash
npx playwright test --ui
```

## Linting & Formatting

- **Lint:** `npm run lint` (ESLint)
- **Format:** `npm run format` (Prettier)

## Deployment

The application is configured for deployment on **Vercel**. Pushing to the `main` branch usually triggers a deployment.

- **Build Output Directory:** `dist`
- **Framework Preset:** Vite
