

# Plan: Cinematic Page Transitions + Custom Error Pages

## What We're Building

1. **Page transition animations** — fade-through-black cinematic scene cuts when navigating between pages
2. **Four unique error page templates** — 404 (Space), 403 (Vault), 500 (Glitch), 503 (Maintenance), each with inline SVG animations and themed backgrounds

## Implementation

### Part 1: Cinematic Page Transitions

**File: `src/components/cinematic/PageTransition.tsx`** (new)
- Wrapper component using `framer-motion` `AnimatePresence` + `motion.div`
- Animation: fade to black (opacity 0 → black overlay → opacity 1), ~0.4s duration
- Wrap all route elements in this component

**File: `src/App.tsx`** (modify)
- Add `useLocation` hook and `AnimatePresence` around `Routes`
- Each `Route` element wrapped in `PageTransition` with `location.key`

### Part 2: Custom Error Pages

**File: `src/components/errors/Error404.tsx`** (new) — Lost in Space
- Deep navy/purple background with CSS star field (radial gradient dots)
- Inline SVG astronaut floating with CSS `@keyframes` bob + rotate
- Split layout: astronaut left, text right (stacked on mobile)
- Shows attempted path, "Go Back Home" button

**File: `src/components/errors/Error403.tsx`** (new) — Locked Vault
- Dark red/crimson animated gradient background
- SVG padlock with shake-deny animation loop
- Centered layout, lock above error code

**File: `src/components/errors/Error500.tsx`** (new) — Broken Machine
- Purple/pink glitch gradient background with CSS glitch effect overlay
- SVG gear set: gears spin, one detaches and falls via CSS keyframes
- Full-bleed background with centered overlay card
- "Try Again" + "Go Home" buttons

**File: `src/components/errors/Error503.tsx`** (new) — Under Maintenance
- Calm blue/cyan animated wave gradient
- SVG construction crane with swinging hook (pendulum CSS animation)
- Progress bar animation
- "Try Again" + "Go Home" buttons

**File: `src/pages/NotFound.tsx`** (rewrite)
- Import and render `Error404` component

**File: `src/pages/ErrorPage.tsx`** (new)
- Accept `code` prop, render appropriate error component (403/500/503)
- Add routes `/403`, `/500`, `/503` in `App.tsx`

### Part 3: Timeline Entity Link Verification
- Already implemented via `EntityLink` component navigating to `/search?q=...` — no changes needed, this is a testing/verification task

## Technical Details

- All SVG animations use CSS `@keyframes` (no JS animation loops for performance)
- Framer Motion only for entrance animations on error pages
- No external video files — all effects via CSS gradients, SVG, and keyframes
- Star field background uses CSS pseudo-elements with radial gradients
- Responsive: `flex-col` on mobile, `flex-row` on desktop for split layouts
- All error pages include the existing platform logo and consistent button styling

## Files Summary

| Action | File |
|--------|------|
| Create | `src/components/cinematic/PageTransition.tsx` |
| Create | `src/components/errors/Error404.tsx` |
| Create | `src/components/errors/Error403.tsx` |
| Create | `src/components/errors/Error500.tsx` |
| Create | `src/components/errors/Error503.tsx` |
| Modify | `src/pages/NotFound.tsx` |
| Modify | `src/App.tsx` |

