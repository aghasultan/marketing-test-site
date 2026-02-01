# Development Guide

## Prerequisites
- **Node.js**: v18+ (Required for Vite/React)
- **npm**: v9+ (or pnpm/yarn)

## Installation
```bash
# Clone repository
git clone <repo-url>

# Install dependencies
npm install
```

## Environment Setup
Duplicate `.env.example` to `.env` (if applicable) and configure variables.
_Note: No `.env` template found in root scan._

## Development Commands

### Start Dev Server
```bash
npm run dev
# Runs Vite dev server at http://localhost:5173
```

### Build for Production
```bash
npm run build
# 1. Generates RSS feed (`scripts/generate-rss.ts`)
# 2. Runs Type Check (`tsc`)
# 3. Builds assets via Vite
```

### Preview Build
```bash
npm run preview
# Serves the `dist/` folder locally
```

### Linting & Formatting
```bash
npm run lint
# ESLint check
```

```bash
npm run format
# Prettier write
```

## Testing Strategy

### E2E Testing (Playwright)
```bash
npx playwright test
# Runs all E2E specs in `tests/`
```

### Unit Testing (Vitest)
_Scripts not explicitly listed in package.json but `vitest` dependency exists._
Check `vite.config.ts` for test configuration.

## Project Structure
- **UI Components**: `src/components/ui` (Radix + Tailwind)
- **Features**: `src/features/*` (Domain Logic)
- **Routing**: `src/pages/*` + `react-router-dom`

## Contribution Guidelines
1. Create a feature branch.
2. Ensure `npm run lint` and `npx playwright test` pass.
3. Submit PR.
