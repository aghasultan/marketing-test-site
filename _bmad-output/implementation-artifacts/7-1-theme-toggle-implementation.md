---
story_id: "7-1-theme-toggle-implementation"
epic_id: "epic-7"
title: "Theme Toggle Implementation"
description: "Implement a fully functional Light/Dark mode toggle, refactoring the design system to support both themes gracefully."
status: "in-progress"
assigned_to: "dev-agent"
---

## Tasks

- [ ] **CSS Architecture**: Refactor `globals.css`:
    - Move current `:root` values to `.dark`.
    - Define new Light Mode values in `:root`.
    - Update `.glass` utility to be adaptive (e.g., `bg-white/40` in light, `bg-white/5` in dark).
- [ ] **State Management**: Create `components/theme-provider.tsx` using a simple context or `useTheme` hook to toggle the `.dark` class on `document.documentElement`.
- [ ] **UI Component**: Create `components/ui/ThemeToggle.tsx` (Sun/Moon icon).
- [ ] **Integration**: Add Toggle to `Header.tsx`.
- [ ] **Audit**: Verify contrast in Light Mode for:
    - Hero Text (needs to be dark in light mode).
    - Cards (borders/shadows).
    - "Nebula" background (might need to be subtle or hidden in Light Mode).

## Technical Notes
- Tailwind is already configured with `darkMode: 'class'`.
- Be careful with the "Nebula" background; in Light mode, white particles on white background won't work. Maybe invert colors or disable it.
