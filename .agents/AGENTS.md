# Agent Guidelines: Cookery (React + MUI)

This document establishes development standards, architectural conventions, and workflows for AI agents and developers working on **Cookery**.

---

## 1. Project Overview & Technology Stack

- **Application:** Cookery (Culinary and recipe application)
- **Framework:** [React 19](https://react.dev/) (`react`, `react-dom` v19+)
- **Build Tool:** [Vite 8](https://vite.dev/) with `@vitejs/plugin-react`
- **Language:** [TypeScript 6](https://www.typescriptlang.org/) with strict mode enabled
- **UI Library:** [Material UI (MUI) v9](https://mui.com/material-ui/) (`@mui/material`, `@mui/icons-material`)
- **Styling Engine:** Emotion (`@emotion/react`, `@emotion/styled`) + MUI `sx` prop / theme system
- **Package Manager:** **[Bun](https://bun.sh/)** (`bun.lock`, engines: `bun >=1.4.0`, `node >=24.0.0`)
- **Path Alias:** `@/*` maps directly to `./src/*`

> [!IMPORTANT]
> **Always use `bun`** for package management and script execution. Do not use `npm`, `pnpm`, or `yarn`.

---

## 2. Essential Commands

Execute all commands with `bun`:

| Command | Action |
| :--- | :--- |
| `bun run dev` | Starts the Vite development server with Hot Module Replacement (HMR) |
| `bun run build` | Runs TypeScript compilation (`tsc -b`) and Vite production bundling |
| `bun run lint` | Lints the codebase with ESLint (Flat Config) & Prettier |
| `bun run preview` | Previews the production build locally |
| `bun run test` | Runs vitest test suite |
| `bun add <pkg>` | Installs a new production dependency |
| `bun add -d <pkg>` | Installs a new development dependency |
| `bun remove <pkg>` | Removes a dependency |

### Agent Quality Check
Before concluding any task or submitting changes, always run:
```bash
bun run lint
bun run build
```
Both commands must pass with zero errors and zero warnings.

---

## 3. Architecture & Directory Structure

```
cookery/
├── .agent/             # Agent rules and configuration (AGENTS.md)
├── public/             # Static public assets (favicons, manifest)
├── src/
│   ├── assets/         # Bundled static assets
│   │   ├── fonts/      # Local fonts (Amaranth, Dongle, Google Sans Flex)
│   │   └── icons/      # Custom SVG icons
│   ├── components/     # Shared, reusable UI components
│   ├── hooks/          # Custom reusable React hooks
│   ├── theme/          # MUI theme definitions (theme/index.ts)
│   ├── utils/          # Utility functions and helpers
│   ├── App.tsx         # Primary application component
│   ├── index.css       # Global font definitions (@font-face) and root CSS
│   ├── main.tsx        # React root mount (ThemeProvider + CssBaseline)
│   └── vite-env.d.ts   # Vite environment type declarations
├── eslint.config.js    # ESLint flat configuration
├── tsconfig.app.json   # TypeScript configuration for application code
├── tsconfig.json       # TypeScript root project references
└── vite.config.ts      # Vite bundler configuration
```

---

## 4. TypeScript & React Guidelines

### 4.1 Strict TypeScript & Verbatim Module Syntax
`tsconfig.app.json` has `verbatimModuleSyntax: true` and `erasableSyntaxOnly: true`.

- **Type-only imports are mandatory:**
  ```tsx
  // ✅ Correct
  import type { ReactNode } from 'react';
  import type { Theme } from '@mui/material/styles';
  import { useState, useCallback } from 'react';
  import Button from '@mui/material/Button';

  // ❌ Incorrect (will fail verbatimModuleSyntax)
  import { ReactNode, useState } from 'react';
  ```
- **Erasable syntax only:** Avoid TypeScript `enum` or namespaces. Use string union types or `const` objects:
  ```ts
  // ✅ Preferred
  export type RecipeDifficulty = 'easy' | 'medium' | 'hard';
  export const DIFFICULTY = {
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard',
  } as const;
  ```
- **Never use `any`:** Use explicit types, interfaces, or generics.

### 4.2 React 19 Patterns
- Build functional components with typed props:
  ```tsx
  interface RecipeCardProps {
    title: string;
    description?: string;
    prepTimeMinutes: number;
    onSelect: (id: string) => void;
  }

  export function RecipeCard({ title, description, prepTimeMinutes, onSelect }: RecipeCardProps) {
    // ...
  }
  ```
- Utilize modern React 19 hooks and features where appropriate.
- Keep components focused and modular. Separate business logic and data fetching into custom hooks (`src/hooks/`).

---

## 5. Material UI (MUI) Guidelines

### 5.1 Component & Icon Imports
Prefer specific path imports or tree-shakable named imports:
```tsx
// ✅ Preferred component imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

// ✅ Preferred icon imports
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AddIcon from '@mui/icons-material/Add';
```

### 5.2 Styling Conventions: `sx` Prop & Theme
- **Use the `sx` prop** as the standard styling mechanism:
  ```tsx
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      p: { xs: 2, md: 4 },
      bgcolor: 'background.paper',
      borderRadius: 2,
    }}
  >
  ```
- **Use theme spacing tokens** (integers where `1` = 8px; e.g., `p: 2` = 16px, `mt: 4` = 32px).
- **Use theme colors** (e.g., `color: 'text.secondary'`, `color: 'primary.main'`, `bgcolor: 'background.default'`).
- **Reusable styled components:** Use `styled` from `@mui/material/styles` when creating heavily styled components that require repetition:
  ```tsx
  import { styled } from '@mui/material/styles';

  const CustomHeader = styled('header')(({ theme }) => ({
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
  }));
  ```

### 5.3 Typography & Fonts
- The app uses custom local typography defined in `src/theme/index.ts`:
  - `Dongle`
  - `Amaranth`
  - `Google Sans Flex`
- Use `<Typography>` components rather than bare HTML `<p>`, `<h1>`... tags:
  ```tsx
  <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
    Recipe Collection
  </Typography>
  ```
- Use the `component` prop to preserve semantic HTML while applying the desired visual `variant`.

### 5.4 Accessibility (a11y)
- Provide `aria-label` or `<Tooltip>` for icon-only buttons:
  ```tsx
  <IconButton aria-label="Add recipe" onClick={handleAdd}>
    <AddIcon />
  </IconButton>
  ```
- Ensure color contrast and keyboard navigation states comply with standard WCAG AA accessibility.

---

## 6. Code Style & Formatting

- **Prettier Settings:**
  - `tabWidth: 2`
  - `singleQuote: true`
  - Trailing commas enabled
- **Imports Ordering:**
  1. React core (`react`, `react-dom`)
  2. MUI components & icons (`@mui/material/...`, `@mui/icons-material/...`)
  3. External third-party libraries
  4. Internal aliases (`@/components/...`, `@/theme`, `@/utils/...`)
  5. Relative imports (`./...`)
  6. Style / asset imports (`./index.css`, `@/assets/...`)
- **No unused variables or imports:** Enforced by TypeScript (`noUnusedLocals`, `noUnusedParameters`) and ESLint.
- **Path aliases:** Always use `@/` for cross-directory imports rather than long relative paths like `../../../`.

---

## 7. Agent Operational Protocol

1. **Check existing files** before creating new ones to maintain consistent structure and patterns.
2. **Never break build or lint:** Run `bun run lint` and `bun run build` after editing code.
3. **Preserve formatting:** Adhere to ESLint and Prettier configs without introducing syntax that requires suppressions (`@ts-ignore` or `eslint-disable`).
4. **Minimal diffs:** Keep edits focused strictly on the requested task. Do not reformat unrelated files.
