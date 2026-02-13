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

**View Invoice Page Layout**
- Three main sections: back navigation, status bar card, invoice details card
- 730px max-width content area with 72px top/bottom padding, 16px horizontal
- Status bar card: 88px height, horizontal flex layout with status on left and buttons on right
- Invoice details card: 48px padding, multiple sections (header, details grid, items table, amount due footer)

**Status-Dependent Buttons**
- Paid invoices: "Mark as Paid" button is hidden
- Draft invoices: Shows "Mark as Pending" instead of "Mark as Paid"
- Pending invoices: Shows "Mark as Paid"

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
- Edit button requires custom classes for light/dark variants (not a standard variant)

### Data Layer Patterns

**Mock Data Structure**
- Full Invoice interface includes all fields from View Invoice design
- Prevents future refactoring when building related features
- Mock data in `lib/data/mock-invoices.ts` matches Figma examples exactly

**Data Lookup Pattern**
- Use `mockInvoices.find((inv) => inv.id === id)` for ID-based lookup
- Always handle not found case with graceful fallback (show message + back link)
- Server Component pattern: async function with awaited params

**Date Formatting**
- Custom formatters in `lib/utils/date.ts` match Figma format ("DD MMM YYYY")
- Uses `toLocaleString` with "en-GB" locale for month names
- formatDate() used for invoice date and payment due date

**Currency Formatting**
- GBP currency with space after pound sign to match Figma
- Implemented in `lib/utils/currency.ts`
- Applied to all monetary values (line item prices, totals, amount due)

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

Additional utility colors used in View Invoice page:
- `invoice-muted` (#888EB0) for hash symbol and muted text
- `invoice-muted-blue` (#7E88C3) for labels and descriptions
- `invoice-navy` (#1E2139) for items table dark mode background
- `invoice-navy-light` (#252945) for Edit button dark mode background
- `invoice-lavender` (#DFE3FA) for Edit button dark mode text
- `invoice-black` (#0C0E16) for Amount Due footer dark mode background
- `invoice-draft-light` (#373B53) for Amount Due footer light mode background

These are defined in both `globals.css` (@theme inline) and documented in `CLAUDE.md`.

### Typography Adherence
- Heading L (H1): `text-4xl font-bold tracking-tight leading-none`
- Heading M (H2): `text-2xl font-bold tracking-tight leading-none`
- Heading S: `text-[15px] font-bold leading-[15px] tracking-tight`
- Heading S (with 24px line-height): `text-[15px] font-bold leading-6 tracking-tight`
- Body: `text-[13px] font-medium leading-[18px] tracking-[-0.1px]`
- Body values: `text-[15px] font-bold leading-5 tracking-tight`

### Spacing Grid
- 8px base grid followed throughout (gap-2, gap-4, gap-6, gap-8, etc.)
- Main content: 72px top/bottom padding, 16px horizontal
- Invoice cards: 4px gap between rows
- Header sections: 16px gap (mb-16)
- Status bar card: 6px bottom margin (mb-6)
- Invoice details card sections: 8px bottom margin (mb-8)
- Column headers to item rows: 8px gap (mb-8, space-y-8)

### Items Table Pattern
- Tinted background: `bg-[#F9FAFE]` in light mode, `dark:bg-invoice-navy` in dark mode
- Grid layout: `grid-cols-[2fr,1fr,1fr,1fr]` (Item Name gets double width)
- Column alignments: Item Name (left), QTY (center), Price (right), Total (right)
- Combined with Amount Due footer in a `rounded-lg` overflow-hidden wrapper
- Footer has dark background contrasting with table above

### Amount Due Footer Pattern
- Dark background: `bg-invoice-draft-light` in light mode, `dark:bg-invoice-black` in dark mode
- White text for both label and amount
- Flexbox layout: `justify-between` for label on left, amount on right
- Amount uses Heading M typography: `text-2xl font-bold leading-none tracking-tight`

## Common Pitfalls Avoided

1. **No hardcoded hex colors** - Always used CSS variables or invoice-* utilities (except for #F9FAFE which doesn't have a semantic token)
2. **Theme support required** - CLAUDE.md mandates dark mode for all components
3. **Button height** - All buttons are exactly 48px (h-12) per design system
4. **shadcn installation** - Installed via CLI before using to ensure proper setup
5. **Client components** - Added "use client" only where needed (interactivity/hooks)
6. **Async params pattern** - Always await params in Next.js 16: `const { id } = await params;`

## Navigation Patterns

- Dynamic routes use `params` as Promise (Next.js 16 pattern)
- Must await params before using: `const { id } = await params;`
- Link component from next/link for client-side navigation
- Back navigation uses ArrowLeft icon with styled Link
- Hover states on links use `hover:text-primary` or `hover:text-primary/90`

## Button Styling Patterns

**Edit Button (Button 3)**
- Light mode: `bg-[#F9FAFE]` with `text-invoice-muted-blue`
- Dark mode: `bg-invoice-navy-light` with `text-invoice-lavender`
- Hover states use opacity 80% (`hover:bg-[#F9FAFE]/80`)
- Custom classes required (no standard variant matches)

**Delete Button (Button 5)**
- Use `variant="destructive"` from shadcn Button
- Override height and radius with `h-12 rounded-3xl`

**Mark as Paid/Pending Button (Button 2)**
- Use `variant="default"` (primary purple)
- Override height and radius with `h-12 rounded-3xl`
- Conditionally rendered based on invoice status

## Testing Checklist Reference

When implementing features, always verify:
- No TypeScript errors (`npm run build`)
- Dark mode works correctly
- All spacing matches 8px grid
- Typography follows design system exactly
- No hardcoded colors in code (except when no semantic token exists)
- Components use shadcn/ui where appropriate
- Navigation works as expected
- Status-dependent logic works for all states

## Server vs Client Component Decisions

**View Invoice Page**
- Server Component for page shell (data lookup, invoice display)
- No client-side state needed for UI-only buttons
- Buttons rendered without onClick handlers (non-functional per ticket scope)
- Future: If buttons need interactivity, extract button section into Client Component

## Not Found Handling

- Always provide fallback for invalid IDs in dynamic routes
- Show clear message ("Invoice not found") with back link to list page
- Reuse layout structure (Sidebar, main content area) for consistency
- Styled fallback card matching design system (rounded-lg, appropriate shadow)
