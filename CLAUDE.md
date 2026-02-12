# Invoice App - Project Rules

## Codebase Context

@context .claude/context.md

Read `.claude/context.md` for an auto-generated index of all files, routes, types, components, and utilities. This file is regenerated automatically via a PostToolUse hook whenever code is written or edited.

## Tech Stack

- **Framework**: Next.js 16 (App Router, RSC by default)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v4 + CSS variables
- **UI Library**: shadcn/ui (new-york style, cssVariables: true)
- **Icons**: Lucide React
- **Font**: League Spartan (loaded via `next/font/google`)

## Design System

Source: [Figma - Invoice App Feature Designs](https://www.figma.com/design/lmzClwfxHToplRxRKQ8Dcq/Invoice-App-%E2%80%93-Feature-Designs)

### Color Palette (Figma Variable IDs)

| Figma ID | Hex       | HSL                  | Role                          | CSS Variable          |
|----------|-----------|----------------------|-------------------------------|-----------------------|
| 01       | `#7C5DFA` | 252 94% 67%         | Primary purple                | `--primary`           |
| 02       | `#9277FF` | 252 100% 73%        | Primary hover / accent        | `--accent`            |
| 03       | `#1E2139` | 233 31% 17%         | Dark navy (cards in dark)     | `--card` (dark)       |
| 04       | `#252945` | 233 30% 21%         | Dark navy lighter (borders)   | `--border` (dark)     |
| 05       | `#DFE3FA` | 231 73% 93%         | Light lavender (borders)      | `--border` (light)    |
| 06       | `#888EB0` | 231 20% 61%         | Muted text                    | `--muted-foreground`  |
| 07       | `#7E88C3` | 231 37% 63%         | Muted blue text               | utility only          |
| 08       | `#0C0E16` | 228 29% 7%          | Near-black (light foreground) | `--foreground` (light)|
| 10       | `#FF9797` | 0 100% 80%          | Destructive hover / dark mode | `--destructive` (dark)|
| 11       | `#F8F8FB` | 240 27% 98%         | Light background              | `--background` (light)|
| 12       | `#141625` | 233 30% 11%         | Dark background               | `--background` (dark) |
| --       | `#EC5757` | 0 80% 63%           | Destructive red               | `--destructive` (light)|

### Direct Utility Colors

For cases where you need a specific Figma color outside the semantic system, use the `invoice-*` Tailwind utilities:

- `bg-invoice-purple` / `text-invoice-purple` -- #7C5DFA
- `bg-invoice-purple-light` / `text-invoice-purple-light` -- #9277FF
- `bg-invoice-navy` / `text-invoice-navy` -- #1E2139
- `bg-invoice-navy-light` / `text-invoice-navy-light` -- #252945
- `bg-invoice-lavender` / `text-invoice-lavender` -- #DFE3FA
- `bg-invoice-muted` / `text-invoice-muted` -- #888EB0
- `bg-invoice-muted-blue` / `text-invoice-muted-blue` -- #7E88C3
- `bg-invoice-black` / `text-invoice-black` -- #0C0E16
- `bg-invoice-red` / `text-invoice-red` -- #EC5757
- `bg-invoice-red-light` / `text-invoice-red-light` -- #FF9797
- `bg-invoice-bg-light` -- #F8F8FB
- `bg-invoice-bg-dark` -- #141625
- `bg-invoice-green` / `text-invoice-green` -- #33D69F (Paid status)
- `bg-invoice-orange` / `text-invoice-orange` -- #FF8F00 (Pending status)
- `bg-invoice-draft-light` / `text-invoice-draft-light` -- #373B53 (Draft status, light mode)
- `bg-invoice-draft-dark` / `text-invoice-draft-dark` -- #DFE3FA (Draft status, dark mode)

### Typography

Font: **League Spartan** (Google Fonts, loaded via `next/font/google` in layout.tsx)

| Style              | Size  | Weight     | Line Height | Letter Spacing | Tailwind                                          |
|--------------------|-------|------------|-------------|----------------|---------------------------------------------------|
| Heading L (H1)     | 36px  | Bold (700) | 100%        | -1.125px       | `text-4xl font-bold tracking-tight leading-none`  |
| Heading M (H2)     | 24px  | Bold (700) | 100%        | -0.75px        | `text-2xl font-bold tracking-tight leading-none`  |
| Heading S (H3)     | 15px  | Bold (700) | 24px        | -0.25px        | `text-[15px] font-bold leading-6 tracking-tight`  |
| Heading S Variant  | 15px  | Bold (700) | 15px        | -0.25px        | `text-[15px] font-bold leading-[15px] tracking-tight` |
| Body               | 13px  | Medium (500)| 18px       | -0.1px         | `text-[13px] font-medium leading-[18px] tracking-[-0.1px]` |
| Body Variant       | 13px  | Medium (500)| 15px       | -0.1px         | `text-[13px] font-medium leading-[15px] tracking-[-0.1px]` |

### Spacing

The design uses an 8px grid. Common values:

- 8px, 16px, 24px, 32px, 48px
- Map to Tailwind: `gap-2`, `gap-4`, `gap-6`, `gap-8`, `gap-12`

### Border Radius

- `--radius: 0.5rem` (8px) -- base radius
- Buttons: 24px (`rounded-3xl`)
- Cards: 8px (`rounded-lg`)
- Inputs: 4px (`rounded`)

### Shadows

- Cards (light): `shadow-[0_10px_10px_-10px_rgba(72,84,159,0.1)]`
- Cards (dark): `shadow-[0_10px_10px_-10px_rgba(0,0,0,0.25)]`

## Component Conventions

### Button Variants (from Figma)

1. **Button 1** (Primary with icon) -- Purple bg (#7C5DFA), white text, rounded-3xl, 48px height. Hover: #9277FF.
2. **Button 2** (Primary action) -- Purple bg (#7C5DFA), white text, rounded-3xl, 48px height. Hover: #9277FF.
3. **Button 3** (Edit / secondary) -- Light: #F9FAFE bg, #7E88C3 text. Dark: #252945 bg, #DFE3FA text. Rounded-3xl, 48px height.
4. **Button 4** (Save as Draft) -- Light: #373B53 bg, #888EB0 text. Dark: #373B53 bg, #DFE3FA text. Rounded-3xl, 48px height.
5. **Button 5** (Delete / destructive) -- #EC5757 bg, white text. Hover: #FF9797. Rounded-3xl, 48px height.
6. **Button 6** (Add item / tertiary) -- Light: #F9FAFE bg, #7E88C3 text. Dark: #252945 bg, #888EB0 text. Full width, rounded-3xl, 48px height.

### Form Elements

- Input height: 48px
- Label: 13px medium, muted-foreground color
- Input border: 1px solid `--border`; active border: 1px solid `--primary`
- Dropdown chevron: #7C5DFA
- All inputs have 20px horizontal padding

### File Structure

```
app/
  globals.css          -- Theme variables, base styles
  layout.tsx           -- Root layout with League Spartan font
  page.tsx             -- Home page
components/
  ui/                  -- shadcn/ui components
lib/
  utils.ts             -- cn() helper
```

## Rules

- NEVER hardcode hex colors -- always use CSS variables or Tailwind utilities
- ALWAYS prefer shadcn/ui components over custom implementations
- Use the `invoice-*` utility colors for Figma-specific values not covered by semantic tokens
- All components must support both light and dark themes
- Use `font-bold` (700) for headings, `font-medium` (500) for body text
- Buttons are always 48px tall with `rounded-3xl`
- Follow the 8px spacing grid
