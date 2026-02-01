# Source Tree Analysis

## Directory Structure

```
marketing-test-site/
├── public/              # Static assets (images, RSS)
├── src/
│   ├── app/             # Application entry and routing
│   │   ├── main.tsx     # Entry point (Vite/React)
│   │   ├── globals.css  # Global styles (Tailwind)
│   │   └── router.tsx   # React Router configuration
│   ├── components/      # Shared UI components
│   │   ├── layout/      # App shell (Header, Footer)
│   │   ├── ui/          # Core primitives (Button, Input)
│   │   └── seo/         # Meta tag management
│   ├── content/         # Markdown content (Blog, Case Studies)
│   ├── data/            # Static data files
│   ├── features/        # Feature-based modules
│   │   ├── apply/       # Application wizard logic
│   │   ├── audit/       # Agency audit tool
│   │   ├── results/     # Results calculation
│   │   └── wizard/      # Multi-step wizard engine
│   ├── lib/             # Utilities and core services
│   │   ├── services/    # API and business logic services
│   │   └── utils.ts     # Helper functions
│   └── scripts/         # Build scripts (RSS generation)
├── docs/                # Project documentation
├── tests/               # Playwright E2E tests
├── tailwind.config.ts   # Styling configuration
└── vite.config.ts       # Build configuration
```

## Critical Directories

### `src/app/`
**Purpose**: Bootstrapping and Global State.
- `main.tsx`: Mounts the React app.
- `globals.css`: Defines the design system tokens (colors, animations).

### `src/features/`
**Purpose**: Domain Logic.
The application is structured into vertical slices:
- **Wizard**: Handles the multi-step form flow state.
- **Results**: Logic for calculating and displaying audit outcomes.

### `src/lib/`
**Purpose**: Shared Logic.
- `design-system.ts`: Typings/constants for the UI.
- `services/`: Encapsulates external interactions (API, storage).

### `content/`
**Purpose**: CMS-like content.
Uses markdown files for "Case Studies" and "Blog", processed via `gray-matter`.

## Entry Points
- **Web**: `src/app/main.tsx`
- **Routing**: `src/app/router.tsx` defines the navigation map.
