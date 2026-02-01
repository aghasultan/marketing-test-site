# Epic 7: Visual Personalization

**Goal:** empower users to customize their viewing experience, starting with a robust Dark/Light mode toggle.

## Rationale
While "Dark Mode Native" is a strong brand choice, accessibility and user preference dictate that a Light Mode option should be available, especially for reading long-form content (blog) in bright environments.

## Stories

### 7.1 Theme Toggle Implementation
- **Goal:** Allow users to toggle between Light and Dark themes.
- **Tech:** Tailwind `darkMode: 'class'`, `next-themes` (or custom provider).
- **Tasks:**
    - Refactor `globals.css` to define semantic Light/Dark tokens.
    - Create `ThemeProvider` to manage state.
    - Build `ThemeToggle` component.
    - Audit all "Glass" components to ensuring they look good in Light Mode.

### 7.2 Font Size / Accessibility Controls (Backlog)
- **Goal:** User adjustable font sizing.
