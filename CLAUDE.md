# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development
npm run dev          # Start dev server with HMR at localhost:5173

# Production
npm run build        # Build client + server bundles to /build/
npm run start        # Run production server (requires build first)

# Type Safety
npm run typecheck    # Generate React Router types + run TypeScript checks
```

## Architecture Overview

**Framework**: React Router v7 (full-stack SSR framework)
- File-based routing from `/app/routes/` directory
- Server-side rendering enabled by default (`react-router.config.ts`: `ssr: true`)
- Vite for bundling with HMR
- Tailwind CSS 4 for styling
- TypeScript throughout

**Application Type**: Marketing site for InternKit, a B2B tool that scores job-application emails for small tech companies (10–50 people, no in-house recruiter). The product itself lives in the `internkit` repo at `app.internkit.ee`.

**Key Characteristics**:
- Static content (no database or CMS integration)
- Client-side forms only (no server actions implemented)
- InternKit design system (see below), light theme only
- Mobile-responsive with Tailwind breakpoints

## Routing System

Routes are defined in `app/routes.ts` and map to files in `app/routes/`:
- Index route (`/`) → `routes/home.tsx`
- `/pricing` → `routes/pricing.tsx`

Login and sign-up live in the app at `https://app.internkit.ee`.

**Adding New Routes**:
1. Create file in `app/routes/` (e.g., `app/routes/about.tsx`)
2. Add route definition in `app/routes.ts`: `route("/about", "routes/about.tsx")`
3. Export `meta()` function for SEO tags
4. Run `npm run typecheck` to generate route types

## Design System

The site follows the InternKit design system (`/design:use-ik-design-system`). Marketing pages are **Level 2** surfaces: full Stamp, lime tile/band fills, one serif-italic word per headline, one Highlighter per screen.

**Tokens** live only in `app/app.css`. Role values are CSS variables on `:root`. The site is light only: there is no dark theme or theme switch. Tailwind's default colors, fonts, sizes, radii and shadows are wiped, so only role utilities exist:
- Surfaces: `bg-app`, `bg-surface`, `bg-sunken`, `bg-inverse`, `bg-hero`
- Text: `text-fg-1/2/3`, `text-link`, `text-accent`, `text-on-action`, `text-on-inverse`, `text-on-highlight`
- Lines: `border-hair`, `border-control`, `border-ink`; action: `bg-action`, `bg-action-tint(-weak)`; status: `{success,warning,danger,info}-{solid,fg,tint,line}`
- Type: `text-display-xl` (marketing hero only), `text-display`, `text-h1..h3`, `text-body-l`, `text-body`, `text-small`, `text-stat`, `text-score`
- Radius: `rounded-xs/sm/md/lg/pill`
- Devices: `stamp`, `stamp-lg`, `stamp-press` (primary buttons: outline only at rest, lifts and shows the hard shadow on hover), `highlight`, `label` (mono caps), `voice` (serif italic), `wrap` (1120px content width with responsive padding)

Never type a hex, px value or font name in a component. Fonts: Geist, Geist Mono, Instrument Serif (loaded in `root.tsx`).

**Translation markup** (rendered by `components/Rich.tsx`): `*word*` → serif voice, `==phrase==` → Highlighter. Every key must exist in both `en` and `ee`.

**Path Aliases**: `~/*` maps to `./app/*` (configured in `tsconfig.json`)

## Component Architecture

**Reusable Components** (`app/components/`):
- `ButtonWithLink`: `primary` (Stamp), `secondary`, `ghost`; sizes `md` (44px) and `lg` (52px)
- `Header`: sticky top bar, transparent at the top of the page and white with a border once scrolled; nav, `SettingsMenu` (gear dropdown with the language choice) and mobile sheet
- `Footer`: lime CTA band and link columns
- `Hero` (sample candidate ranking), `SyncSection` (automatic position sync, a headline selling point; Growth and Expansion only), `PlatformSection` (how it works), `InsightsSection` (sample scorecard + features): landing page sections
- `Meter`: 20-tick score meter and `Recommendation` label, using the product's bands (80 / 65 / 45 → Strong yes / Yes / Maybe / No)
- `TextLogo`: brand logo component

**State Management**:
- Only local component state plus `PreferencesContext` (language)

## Pricing Page Structure

Located at `app/routes/pricing.tsx`. Plans mirror the self-serve tiers in the product repo (`internkit/backend/src/domain/billing.ts`), monthly only, prices + VAT:
- **Starter**: €29, 30 CV analyses/month
- **Growth**: €79, 100 CV analyses/month + automatic position sync (recommended: Stamp + the page's Highlighter)
- **Expansion**: €199, 300 CV analyses/month + automatic position sync
- Every account starts on **Free** (5 analyses/month); over-limit applications are held until upgrade or reset

If prices or limits change in the product, update the `plans` array here.

## Error Handling

Global error boundary in `root.tsx`:
- Handles 404s and route errors
- Shows stack traces in development mode only
- Custom error messages for different error types

## Docker Deployment

Multi-stage Dockerfile for production:
1. Install dependencies
2. Build application
3. Run production server with `npm run start`
4. Default port: 3000 (configurable)

Compatible with AWS ECS, Google Cloud Run, Azure Container Apps, Fly.io, Railway, etc.

## Known Constraints

- No backend API integration
- No database or CMS
- Forms are client-side only (submissions not implemented)
- Static testimonials and content (hardcoded)
- No environment variables currently used
