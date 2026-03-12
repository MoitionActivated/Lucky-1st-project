# OpenClaw Control UI Starter

Brewers 1980s blue/gold themed dashboard. Clean, fast, accessible.

## Quick Start

```bash
npm install
npm run dev
```

## Style Guide

### Palette
**Light:**
- Blue Primary: `#0A2E8A`
- Blue Secondary: `#003DA5`
- Gold: `#FFC628`
- Surface: `#F5F5F7`

**Dark:**
- Blue Primary: `#0A1E3A`
- Gold: `#FFB500`
- Surface: `#171A21`

### Components
- **Button**: primary/secondary/ghost variants
- **Card**: Grid-friendly, accessible
- **Header**: Theme toggle (localStorage)

### Scripts
- `npm run dev`: Vite dev server
- `npm run build`: Production build
- `npm run lint`: ESLint
- `npm run test`: Vitest

### CI
GitHub Actions: lint, build, test on push/PR.

Responsive 12-col grid. WCAG AA contrast. Dark mode persistent.