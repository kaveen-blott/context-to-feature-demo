# Context Review Agent Memory

## Project State (as of 2026-02-12)

- CI-3243 (All Invoices page) has been implemented -- codebase now has components, types, utilities, mock data
- Components exist: sidebar, status-badge, filter-dropdown, invoice-card, empty-state, theme-provider, theme-toggle
- shadcn/ui installed: button, checkbox, popover
- Theme provider configured in layout with `next-themes` (class attribute, light default)
- `app/invoices/[id]/page.tsx` exists as placeholder (async Server Component with correct Next.js 16 params pattern)
- Path aliases: `@/*` maps to project root

## Jira Project

- Cloud ID: `b2ff74d1-8f83-4e88-acee-c6390d448139`
- Project key: `CI` (Caerus Investment)
- Tickets use sub-task issue type for implementation work

## Design System Gaps Identified

- Status badge colors (green, orange, draft) ARE now in `globals.css` as `invoice-green`, `invoice-orange`, `invoice-draft-light`, `invoice-draft-dark`
- `#858BB2` (Figma "Status" label) vs `#888EB0` (`--muted-foreground`): slight mismatch, use `text-muted-foreground` as approximation
- `#373B53` used for Amount Due footer AND draft status badge AND Figma sidebar -- mapped as `invoice-draft-light` (semantic naming issue, not functional blocker)
- `#F9FAFE` (items table bg in light mode) -- very close to `--background` light (`#F8F8FB`). Use `bg-invoice-bg-light` or `bg-muted`
- Edit button (Button 3) has no shadcn variant -- needs custom classes: `bg-[#F9FAFE] text-invoice-muted-blue` (light), `bg-invoice-navy-light text-invoice-lavender` (dark)

## Common Ticket Gaps in This Project

- Tickets reference Figma but don't specify colors not in design system
- Sidebar/layout scope is often ambiguous in page-level tickets
- Theme support (light/dark) is mandated by CLAUDE.md but often not mentioned in ACs
- Navigation targets referenced in ACs may not exist yet
- Action button behaviors are consistently undefined when the target feature doesn't exist yet
- Figma only shows ONE status variant per page (e.g., View Invoice only shows "Pending") -- other status display rules must be inferred
- Error/not-found states are never designed in Figma for this project
- Server vs Client component decision is never specified in tickets

## Figma File

- Source: `https://www.figma.com/design/lmzClwfxHToplRxRKQ8Dcq/Invoice-App-%E2%80%93-Feature-Designs`
- 56 frames total across Mobile (375px), Tablet (768px), Desktop (1440px) in Light + Dark
- Design system node: `0:9001`
- Pre-gathered context file: `.claude/plans/figma-design-context.md`
- Figma desktop MCP `get_design_context` with `forceCode: true` works well for code extraction
- `get_screenshot` is reliable for visual reference
- `get_metadata` on page node (`0:1`) returns too much data -- use grep on saved file to find node IDs

## View Invoice Figma Node IDs

| Frame | Node ID | Theme | Breakpoint |
|-------|---------|-------|------------|
| View Invoice | `0:8597` | Light | Desktop |
| View Invoice | `0:7236` | Dark | Desktop |
| View Invoice Hover | `0:6041` | Light | Desktop |
| View Invoice Hover | `0:5105` | Dark | Desktop |
| View Invoice | `0:3965` | Light | Tablet |
| View Invoice | `0:2579` | Dark | Tablet |
| View Invoice | `0:1184` | Light | Mobile |
| View Invoice | `0:388` | Dark | Mobile |

## Existing Context Reviews

- `.claude/plans/context-review-CI-3243.md` -- All Invoices page
- `.claude/plans/context-review-CI-3259.md` -- View Invoice page
