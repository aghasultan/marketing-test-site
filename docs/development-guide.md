# Development Guide

## Prerequisites
- **Node.js**: v18+ (Recommended)
- **Package Manager**: npm
- **Vercel CLI**: Optional, for deployment testing

## Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local development server (Vite) |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality |
| `npm run test` | Run Playwright E2E tests |
| `npm run format` | Format code with Prettier |

## Testing

The project uses **Playwright** for End-to-End testing.

```bash
# Run all tests
npm run test

# Run tests with UI
npm run test -- --ui
```

**Key Test Files:**
- `tests/site.spec.ts`: General site functionality
- `tests/wizard.spec.ts`: Application wizard flow
- `tests/results.spec.ts`: Results engine verification

## Deployment (Vercel)

The project is configured for deployment on Vercel.

**Configuration:** `vercel.json`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Framework Preset**: Vite

**Deploying:**
Push to `main` branch triggers automatic deployment via Vercel Git Integration.
