# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from the `site/` directory:

```bash
npm run dev      # Start Vite dev server with hot reload
npm run build    # Production build (outputs to site/dist/)
npm run lint     # Run ESLint
npm run preview  # Preview production build locally
```

No test runner is configured.

## Architecture

**NutriEnclave** is a Spanish-language health & nutrition mobile web app (SPA) built with React 19 + Vite.

### Key Files

- [site/src/main.jsx](site/src/main.jsx) — Entry point, wraps app in `NutriProvider`
- [site/src/router/index.jsx](site/src/router/index.jsx) — All routes defined here
- [site/src/context/NutriContext.jsx](site/src/context/NutriContext.jsx) — Global state + localStorage persistence
- [site/src/index.css](site/src/index.css) — Design tokens and all utility classes
- [site/index.html](site/index.html) — Loads Montserrat font, Material Symbols, and Tailwind CDN with custom theme
- [DESIGN.md](DESIGN.md) — Full design system reference

### State Management

Single context (`NutriContext`) stores `userProfile` and persists to `localStorage` under key `nutri_profile`. Access via `useNutri()` hook.

```javascript
const { userProfile, updateProfile, addEmotionalLog } = useNutri();
```

**State shape:**

```javascript
userProfile = {
  name: "",
  email: "",
  goals: [],          // e.g. ['weight', 'muscle', 'energy', 'habit']
  age: null,
  weight: null,       // kg
  height: null,       // cm
  activityLevel: null,
  emotionalState: [   // array of logs
    { hunger: 1-10, stress: 1-10, anxiety: 1-10, timestamp: Date }
  ]
}
```

`useNutri()` throws if used outside `NutriProvider`. Logout clears `localStorage` and redirects to `/`.

### Routing

React Router v7. Two user flows:

**Onboarding:** `/` → `/onboarding/1` → `/onboarding/2` → `/onboarding/3` → `/onboarding/4` → `/onboarding/5` → `/loading` → `/success`

**Main app (all accessible from `/dashboard`):**

| Route | Page |
|-------|------|
| `/dashboard` | Main hub — Bio-Enclave Score, quick-access tiles |
| `/chat` | AI assistant chat |
| `/safe-space` | Emotional check-in (hunger/stress/anxiety sliders 1–10) |
| `/meal-plan` | Personalized weekly meal plan |
| `/recipes` | Recipe gallery |
| `/recipe/:id` | Single recipe view (also `/recipe` for default) |
| `/grocery-list` | Shopping list |
| `/food-history` | Logged meals history |
| `/evolution` | Weekly progress statistics |
| `/achievements` | User badges and milestones |
| `/notifications` | System notifications |
| `/profile` | User profile management |
| `/settings` | App settings |

### Styling

- **No CSS-in-JS.** All styling via utility classes defined in [site/src/index.css](site/src/index.css).
- CSS variables define all design tokens: `--color-primary: #76D14B` (green), `--color-secondary: #2563EB` (blue), `--color-text: #1B2733`.
- Tailwind is loaded via CDN (not bundled) — avoid relying on it for new components; prefer the existing custom utility classes.
- Key component classes: `.zen-card` (cards), `.zen-pill-button` (pill buttons), `.glass` (frosted glass effect).

### Animation

Framer Motion is used throughout for entrance animations and transitions:

```javascript
<motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
```

### Page Structure Pattern

Most pages follow this shell — mobile-first with `pb-20` for bottom nav clearance:

```jsx
<div className="min-h-screen bg-zen-bg pb-20">
  <header className="p-6 bg-white sticky top-0 z-10 border-b border-gray-100">
    {/* back button + title */}
  </header>
  <main className="p-6 max-w-2xl mx-auto space-y-6">{/* content */}</main>
</div>
```

Standard page imports:

```javascript
import { useState } from 'react';
import { motion } from 'framer-motion';
import { SomeIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNutri } from '../context/NutriContext';
```

### Icons

Use `lucide-react` for all icons (thin 1px stroke style). Material Symbols (from CDN) is also available for specific cases.

### Data

[site/src/data/mockData.ts](site/src/data/mockData.ts) contains all static content. All text is in Spanish (es-ES).

**Key data shapes:**

```typescript
// Meal plan entry
{ day: "Lunes", meals: [{ id, type, name, calories, emotionalNote }] }

// Dashboard stats
{ calories: { current, goal }, water: { current, goal }, steps: { current, goal }, sleep: { current, goal } }

// Onboarding goals options
[{ id: 'weight'|'muscle'|'energy'|'habit', label, icon }]
```

### Placeholder Directories

`site/src/hooks/` and `site/src/components/ui/` exist but are currently empty — intended for future custom hooks and reusable UI components.

## Design System

Defined in [DESIGN.md](DESIGN.md). Visual philosophy: premium, clean, medical-tech aesthetic.

| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#76D14B` | Actions, success, primary CTA |
| `--color-primary-hover` | `#5BB33A` | Hover state |
| `--color-secondary` | `#2563EB` | Tech elements, links |
| `--color-text` | `#1B2733` | All body text |
| `--color-text-light` | `#64748B` | Secondary text |
| `--color-bg-alt` | `#F8F9FA` | Page background (`bg-zen-bg`) |
| Card radius | `12px` | Cards and modals |
| Button radius | `999px` | Pill-shaped buttons |
| Font | Montserrat | All text (weights 100–700) |
