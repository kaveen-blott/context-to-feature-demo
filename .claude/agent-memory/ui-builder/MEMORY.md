# UI Builder Agent Memory

## Project: Invoice App (context-to-feature-demo)

### Key Paths
- CSS variables: `/app/globals.css`
- Root layout (font loading): `/app/layout.tsx`
- shadcn config: `/components.json` (new-york style, Tailwind v4, cssVariables: true)
- Design system reference: `/CLAUDE.md`
- Utils: `/lib/utils.ts` (cn() helper)

### Design System
- Font: League Spartan (loaded via next/font/google)
- Primary color: #7C5DFA (purple), accent/hover: #9277FF
- Destructive: #EC5757 (light), #FF9797 (dark)
- Light bg: #F8F8FB, Dark bg: #141625
- All colors stored as HSL values in CSS variables
- Custom `invoice-*` Tailwind utilities for direct Figma palette access
- 8px spacing grid, 48px button height, rounded-3xl buttons

### Patterns
- Tailwind v4 uses `@theme inline {}` block (not tailwind.config.ts) for theme tokens
- shadcn/ui v4 uses `shadcn/tailwind.css` import, no separate tailwind config needed
- Font variable override: set `--font-sans` in both `@theme inline` and via `next/font` `variable` prop
