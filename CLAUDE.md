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

No test runner is configured. Run commands from the `site/` directory (`cd site` first).

## Key Dependencies

- React 19, React Router v7, Framer Motion 12, Vite 7
- `lucide-react` for icons; Tailwind CSS (CDN only, not bundled)

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

The context only exposes these three values. There is no `logout` function in the context — implement logout by clearing `localStorage.removeItem('nutri_profile')` and calling `navigate('/')` directly in the component.

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

`useNutri()` throws if used outside `NutriProvider`.

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
- Tailwind CDN is loaded as a fallback for classes not defined in `index.css`. However, many Tailwind-like classes (`flex`, `p-4`, `grid-cols-2`, etc.) are explicitly re-declared in `index.css`. When adding styles, check `index.css` first; add any new utility classes there rather than relying on the CDN.
- Key component classes: `.zen-card` (cards), `.zen-pill-button` (pill buttons, add `.primary` for filled style), `.glass` (frosted glass effect), `.bg-zen-bg` (page background).

### Animation

Framer Motion is used throughout for entrance animations and transitions:

```javascript
<motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
```

### Bottom Navigation

The bottom nav (`<nav className="fixed bottom-0 ...">`) is defined directly inside `Dashboard.jsx` only — it is not a shared component. Pages other than Dashboard do not render it. The `pb-20` on page wrappers reserves space for when the user navigates back to Dashboard.

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

[site/src/data/mockData.ts](site/src/data/mockData.ts) contains all static content. All text is in Spanish (es-ES). Note: `onboardingData.steps` is currently incomplete — only 2 of 5 steps are defined; expand this file when adding onboarding data.

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
