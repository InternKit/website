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

**Application Type**: Marketing/landing page with authentication flows (no backend implementation yet)

**Key Characteristics**:
- Static content (no database or CMS integration)
- Client-side forms only (no server actions implemented)
- Dark theme with purple gradient design system
- Mobile-responsive with Tailwind breakpoints

## Routing System

Routes are defined in `app/routes.ts` and map to files in `app/routes/`:
- Index route (`/`) → `routes/home.tsx`
- `/pricing` → `routes/pricing.tsx`
- `/login` → `routes/login.tsx`
- `/join` → `routes/join.tsx`

**Adding New Routes**:
1. Create file in `app/routes/` (e.g., `app/routes/about.tsx`)
2. Add route definition in `app/routes.ts`: `route("/about", "routes/about.tsx")`
3. Export `meta()` function for SEO tags
4. Run `npm run typecheck` to generate route types

## Styling & Theme System

**Theme Variables** (defined in `app/app.css` via `@theme` directive):
- Brand colors: `brand-dark`, `brand-darker`
- Purple palette: `purple-primary`, `purple-secondary`, `purple-light`
- Gradient colors: `purple-gradient-from`, `purple-gradient-to`
- Font: Inter (loaded from Google Fonts via `root.tsx`)

**Global Styles**:
- Dark mode applied globally with radial gradient background
- Mobile padding applied at <768px breakpoint

**Path Aliases**: `~/*` maps to `./app/*` (configured in `tsconfig.json`)

## Component Architecture

**Reusable Components** (`app/components/`):
- `ButtonWithLink`: Primary/secondary button variants with React Router links
- `Header`: Navigation with mobile menu toggle (uses local state)
- `Footer`: Footer with CTA section
- `Hero`, `PlatformSection`, `InsightsSection`, `TestimonialsSection`: Landing page sections
- `Logo`: Brand logo component

**State Management**:
- Only local component state (React hooks like `useState`)
- No global state library
- Example: Header mobile menu toggle, Pricing billing period selector

## Pricing Page Structure

Located at `app/routes/pricing.tsx`, implements a 2-tier pricing model:

**Plans**:
- **Free**: $0/month with basic features
- **Intern Pack**: $9/month or $90/year (17% annual savings)
  - Features: Priority listings, AI career guidance, premium profile badge

**Key Implementation Details**:
- Uses `useState` for billing period toggle (monthly/annual)
- Dynamic price display based on selected billing period
- Intern Pack highlighted with purple gradient and scale transform
- Annual option shows "Save 17%" badge
- Includes billing details text: "Billed annually at $90"

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
