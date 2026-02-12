# Plan and Build Agent Memory

## Project Structure

### Key Directories
- **`app/`** - Next.js App Router pages and layouts
  - `layout.tsx` - Root layout with ThemeProvider and League Spartan font
  - `page.tsx` - Main application pages
  - `globals.css` - Global styles and design system CSS variables
- **`components/`** - React components (both app-specific and shadcn/ui)
  - `ui/` - shadcn/ui components installed via CLI
  - App-specific components live at root of components/
- **`lib/`** - Utilities, types, and data
  - `types/` - TypeScript type definitions
  - `data/` - Mock data and constants
  - `utils/` - Helper functions (cn, date formatting, currency formatting)
- **`.claude/plans/`** - Planning artifacts and execution plans

### Component Patterns

**Sidebar Implementation**
- Fixed positioning (`fixed left-0 top-0`) with fixed width (103px)
- Uses `bg-sidebar` CSS variable for consistent theming
- Logo area has purple gradient background using `bg-primary`
- Theme toggle and avatar sections separated by borders

**Status Badges**
- Three states: paid (green), pending (orange), draft (gray/theme-dependent)
- Uses 6% opacity backgrounds with matching text and dot colors
- Draft status switches colors between light/dark modes

**Invoice Cards**
- Hover state uses purple left border (3px) with adjusted padding
- Shadow differs between light/dark mode
- Uses Link component for navigation to `/invoices/[id]`

**Theme System**
- Uses `next-themes` with `attribute="class"` mode
- ThemeProvider wraps all content in layout.tsx
- `suppressHydrationWarning` on html tag prevents hydration mismatch
- Dark mode toggle uses Moon/Sun icons from lucide-react

### shadcn/ui Usage

**Installed Components**
- Button, Checkbox, Popover (installed via `npx shadcn@latest add`)
- Always check registry with `mcp__shadcn__get_project_registries` first
- Use `mcp__shadcn__get_add_command_for_items` to get correct install command

**Component Customization**
- Button variants use explicit className overrides for exact Figma specs
- All buttons are 48px tall with `rounded-3xl` per CLAUDE.md rules
- Checkbox uses data-attributes for styling checked state

### Data Layer Patterns

**Mock Data Structure**
- Full Invoice interface includes all fields from View Invoice design
- Prevents future refactoring when building related features
- Mock data in `lib/data/mock-invoices.ts` matches Figma examples exactly

**Date Formatting**
- Custom formatters in `lib/utils/date.ts` match Figma format ("Due DD MMM YYYY")
- Uses `toLocaleString` with "en-GB" locale for month names

**Currency Formatting**
- GBP currency with space after pound sign to match Figma
- Implemented in `lib/utils/currency.ts`

### Filter Implementation

**Multi-Select Logic**
- Empty array = show all invoices (no filtering)
- OR logic when multiple statuses selected
- Dynamic subtitle updates based on filter state and count

**State Management**
- Uses `useState` for selected statuses array
- `useMemo` for filtered results and subtitle to avoid unnecessary recalculations
- Client component required for interactivity

## Design System Implementation

### Color System Extensions
Added status badge colors as `invoice-*` utilities:
- `invoice-green` (#33D69F) for Paid status
- `invoice-orange` (#FF8F00) for Pending status
- `invoice-draft-light` / `invoice-draft-dark` for Draft status (theme-dependent)

These are defined in both `globals.css` (@theme inline) and documented in `CLAUDE.md`.

### Typography Adherence
- Heading L (H1): `text-4xl font-bold tracking-tight leading-none`
- Heading S: `text-[15px] font-bold leading-[15px] tracking-tight`
- Body: `text-[13px] font-medium leading-[18px] tracking-[-0.1px]`

### Spacing Grid
- 8px base grid followed throughout (gap-2, gap-4, gap-6, etc.)
- Main content: 72px top/bottom padding, 16px horizontal
- Invoice cards: 4px gap between rows
- Header sections: 16px gap (mb-16)

## Common Pitfalls Avoided

1. **No hardcoded hex colors** - Always used CSS variables or invoice-* utilities
2. **Theme support required** - CLAUDE.md mandates dark mode for all components
3. **Button height** - All buttons are exactly 48px (h-12) per design system
4. **shadcn installation** - Installed via CLI before using to ensure proper setup
5. **Client components** - Added "use client" only where needed (interactivity/hooks)

## Navigation Patterns

- Dynamic routes use `params` as Promise (Next.js 16 pattern)
- Must await params before using: `const { id } = await params;`
- Link component from next/link for client-side navigation
- Back navigation uses ArrowLeft icon with styled Link

## Testing Checklist Reference

When implementing features, always verify:
- No TypeScript errors (`npm run build`)
- Dark mode works correctly
- All spacing matches 8px grid
- Typography follows design system exactly
- No hardcoded colors in code
- Components use shadcn/ui where appropriate
- Navigation works as expected
