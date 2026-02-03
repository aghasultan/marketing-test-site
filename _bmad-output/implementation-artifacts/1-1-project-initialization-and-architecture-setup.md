# Story 1.1: Project Initialization & Architecture Setup

**As a** Developer,
**I want** to initialize the project with Vite, React 18, and Tailwind,
**So that** I have a clean, high-performance foundation.

## Acceptance Criteria

- [ ] **Given** a clean directory
- [ ] **When** I run the initialization commands
- [ ] **Then** a React 18 + TypeScript + Vite project is created
- [ ] **And** the file structure matches the Architectural Decision (`src/features`, `src/content`)
- [ ] **And** `pnpm dev` starts the server without errors

## Implementation Notes

- Use `npm create vite@latest marketing-test-site -- --template react-ts`
- Install `tailwindcss`, `postcss`, `autoprefixer`
- Init `shadcn-ui` (later, or as part of next story? Story 1.1 says "Initialize project..."). Validating architecture setup is key.
- Create folders: `src/features`, `src/content`, `src/components/ui`.
