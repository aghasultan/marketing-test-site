# Development Guide

## Prerequisites
- **Node.js**: v18+ (Recommended for Vite/React)
- **Package Manager**: NPM (via `package.json`)

## installation

```bash
# Install dependencies
npm install

# Install Playwright browsers (for testing)
npx playwright install
```

## Local Development

```bash
# Start development server
npm run dev
```
Runs Vite dev server, typically at `http://localhost:5173`.

## Build

```bash
# Production build
npm run build
```
Builds the app to `dist/`. Includes TypeScript compilation (`tsc`) and RSS generation.

## Testing

```bash
# Run End-to-End Tests
npm test
# OR
npx playwright test
```

## Project configuration
- **Vite**: Configured in `vite.config.ts`. Sets base path `/` and build aliases (`@/` -> `src/`).
- **Tailwind**: Configured in `tailwind.config.ts`. Defines the custom theme colors/fonts.
- **Linting**: ESLint configured (`.eslintrc.cjs` assumed or similar).

## Contribution Guidelines
1.  Use `npm run format` to format code with Prettier before committing.
2.  Ensure tests pass (`npm test`) for any functional changes.
3.  Design updates should follow the Glassmorphism patterns in `src/app/globals.css`.
