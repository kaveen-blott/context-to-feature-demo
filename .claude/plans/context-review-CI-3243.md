# Context Review: Implement All Invoices Page

**Date**: 2026-02-11
**Jira Ticket**: [CI-3243](https://blott.atlassian.net/browse/CI-3243) - [AI TEST] Implement All Invoices page
**Status**: To Do
**Assignee**: Kaveen De Alwis
**Priority**: Not specified (defaults to Medium)
**Issue Type**: Sub-task
**Reviewer**: Context Review Agent

---

## 1. Ticket Summary

**Title**: [AI TEST] Implement All Invoices page

**Description**: Implement the "All Invoices" page as the main entry point for invoice management. Users should be able to view a list of invoices, see invoice status at a glance, filter invoices by status, and navigate to view individual invoices.

**Acceptance Criteria** (as stated in ticket):
1. Page layout matches the Figma design
2. All invoices are displayed in a list
3. Each invoice shows key details (ID, client name, amount, status)
4. Users can filter invoices by status (Draft / Pending / Paid)
5. Clicking an invoice navigates to the View Invoice page
6. UI works on desktop

**Key Notes from Ticket**:
- Invoice data can be mocked or stored on the frontend for now
- Follow existing component and styling conventions
- No backend changes required at this stage
- Basic accessibility should be considered

**Linked Figma Frames** (from ticket attachments):
- All invoices light: Node `0:8890`
- All invoices dark: Node `0:7529`
- Empty invoices light: Node `0:8672`
- Empty invoices dark: Node `0:7311`

**Parent/Linked Issues**: This is a sub-task; parent issue not specified in the ticket data retrieved.

---

## 2. Figma Summary

### Screens Analyzed

Six Figma frames were analyzed (screenshots captured and Figma design context code reviewed):

| Frame | Node ID | Theme | Description |
|-------|---------|-------|-------------|
| Invoice List | `0:8890` | Light | 7 invoices with mixed statuses |
| Invoice List | `0:7529` | Dark | Same 7 invoices, dark theme |
| Empty State | `0:8672` | Light | No invoices, illustration + CTA text |
| Empty State | `0:7311` | Dark | Same empty state, dark theme |
| Hover/Active + Filter | `0:6136` | Light | Filter dropdown open, row hover state, "Pending" filter active |
| Hover/Active + Filter | `0:5200` | Dark | Same interactions, dark theme |

### Layout Structure

- **Sidebar**: Fixed left sidebar, approximately 103px wide (from Figma code), dark navy background (`#373B53` in light mode). Contains:
  - Logo (purple/accent rounded icon) at top
  - Dark/light mode toggle (moon icon) near bottom
  - Horizontal divider
  - User avatar at bottom
- **Main Content Area**: Positioned at `left: 355px` (252px margin from sidebar edge), `top: ~77px`
- **Content Width**: Invoice list area is 730px wide

### Page Header

- **Title**: "Invoices" -- Heading L style (36px, Bold, League Spartan, `#0C0E16` in light / white in dark)
- **Subtitle**: "There are 7 total invoices" -- Body style (13px, Medium, `#888EB0`)
  - Dynamic text: changes to "There are 4 pending invoices" when filter is active, or "No invoices" when empty
- **Filter Control**: "Filter by status" text (15px, Bold) with dropdown chevron arrow. Positioned to the right of the title area.
- **New Invoice Button**: Purple pill button (Button 1 variant) with "+" icon circle and "New Invoice" text. 150px wide, 48px tall, `rounded-[24px]`.

### Filter Dropdown

- White/card background dropdown with shadow
- Three checkbox items: Draft, Pending, Paid
- Checked state: purple filled checkbox with white checkmark
- Unchecked state: light border checkbox
- Dropdown appears below the "Filter by status" trigger
- Chevron rotates upward when dropdown is open

### Invoice Row Cards

Each invoice row is a white card (dark navy in dark mode) with:
- **Rounded corners**: 8px (`rounded-lg`)
- **Shadow**: `0px 10px 10px -10px rgba(72,84,159,0.1)` (light) / `rgba(0,0,0,0.25)` (dark)
- **Layout** (single row, horizontally distributed):
  - Invoice ID: `#` in muted blue (`#7E88C3`) + ID code in foreground, 15px Bold
  - Due date: "Due" in muted (`#888EB0`) + date in muted blue (`#7E88C3`), 13px Medium
  - Client name: muted blue-gray (`#858BB2`), 13px Medium
  - Amount: foreground color, 15px Bold, right-aligned with pound sign (GBP currency)
  - Status badge: pill-shaped with background tint and colored dot + text
  - Right chevron arrow (purple `#7C5DFA`)
- **Row spacing**: Each card appears to have a fixed height of ~72px (12% of 600px container), with 16px gap between rows
- **Hover state** (from filter/hover frame `0:6136`): Row gets a purple left border (approximately 3-4px wide, `#7C5DFA`)

### Status Badges

Three status types observed with these colors:

| Status | Dot/Text Color | Background Tint | Notes |
|--------|----------------|------------------|-------|
| Paid | `#33D69F` (green) | `#33D69F` at 6% opacity | Green theme |
| Pending | `#FF8F00` (orange) | `#FF8F00` at 6% opacity | Orange theme |
| Draft | `#373B53` (dark gray, light mode) / `#DFE3FA` (lavender, dark mode) | `#373B53` at 6% opacity (light) / `#DFE3FA` at 6% opacity (dark) | Theme-dependent |

Badge structure: rounded pill (`rounded-[6px]`), contains a small circular dot + status text (15px Bold).

### Empty State

- Centered illustration (person sitting on/in an envelope with paper planes) -- SVG/image asset
- Heading: "There is nothing here" -- appears to be Heading M or similar bold style
- Subtext: "Create an invoice by clicking the New Invoice button and get started" -- Body style, muted color
- Same header (title, filter, new invoice button) is still visible above

---

## 3. Design System Alignment

### Colors -- Alignment Issues

**STATUS BADGE COLORS NOT IN DESIGN SYSTEM**: The status badge colors are a critical gap:
- **Green (`#33D69F`)**: Not defined in CLAUDE.md color palette or as an `invoice-*` utility. This is the "Paid" status color.
- **Orange (`#FF8F00`)**: Not defined in CLAUDE.md color palette or as an `invoice-*` utility. This is the "Pending" status color.
- **Gray (`#858BB2`)**: Used for client name text. Close to `#888EB0` (muted) but not exact. Not in the palette.
- **Gray (`#373B53`)**: Used for Draft badge background. Not in the palette (sidebar uses this color but it is mapped to `--sidebar` which is `#1E2139` in the CSS).

These colors would need to be added as `invoice-*` utility colors or the design system documentation in CLAUDE.md needs updating.

**SIDEBAR COLOR DISCREPANCY**: The Figma design code shows the sidebar rectangle using `#373B53`, but CLAUDE.md maps `--sidebar` to `#1E2139` (Figma ID 03). The Figma screenshot for dark mode shows what appears to be the darker navy. This needs clarification -- is the sidebar `#373B53` or `#1E2139`?

### Typography -- Aligned

- "Invoices" heading uses Heading L (36px Bold, -1.125px tracking) -- matches CLAUDE.md
- Subtitle uses Body style (13px Medium) -- matches CLAUDE.md
- Invoice ID uses Heading S Variant (15px Bold, -0.25px tracking) -- matches CLAUDE.md
- Due date and client name use Body Variant (13px Medium, -0.1px tracking) -- matches CLAUDE.md

### Spacing -- Aligned

- 8px grid system appears to be followed (16px gaps between rows, 24px padding within cards)

### Components -- Aligned

- New Invoice button follows Button 1 pattern (purple bg, white text, rounded-3xl, 48px height, with icon)
- Card border radius at 8px matches `rounded-lg` convention

### Theme Support -- Aligned

- Both light and dark mode screenshots were reviewed
- All four screens (list + empty) have dark mode equivalents
- Filter dropdown shown in both themes

---

## 4. Existing Codebase Context

### Current State: Greenfield

The codebase is at a very early stage. Here is what exists:

**Files that exist:**
- `/Users/kaveendev/Developer/Demo/context-to-feature-demo/app/page.tsx` -- Placeholder "Hello World" page
- `/Users/kaveendev/Developer/Demo/context-to-feature-demo/app/layout.tsx` -- Root layout with League Spartan font loaded via `next/font/google`, no sidebar, no theme provider
- `/Users/kaveendev/Developer/Demo/context-to-feature-demo/app/globals.css` -- Fully configured with light/dark CSS variables, `invoice-*` utility colors, and shadcn theme integration
- `/Users/kaveendev/Developer/Demo/context-to-feature-demo/lib/utils.ts` -- `cn()` helper (clsx + tailwind-merge)
- `/Users/kaveendev/Developer/Demo/context-to-feature-demo/components.json` -- shadcn/ui configuration (new-york style, RSC, Lucide icons)

**What does NOT exist:**
- `components/` directory -- no UI components at all
- `components/ui/` -- no shadcn/ui components installed
- No routing beyond `app/page.tsx` (no `/invoices` route, no `/invoices/[id]` route)
- No data layer (no mock data, no types/interfaces for invoices)
- No sidebar/layout component
- No theme toggle mechanism (no `next-themes` or equivalent)
- No SVG/image assets (empty state illustration, logo, icons beyond Lucide)

**Dependencies installed but unused:**
- `radix-ui` (v1.4.3) -- available for dropdown, checkbox, etc.
- `lucide-react` (v0.563.0) -- available for icons
- `class-variance-authority` (v0.7.1) -- available for component variants
- `shadcn` (v3.8.4, devDep) -- CLI available to install components

**Configuration present:**
- TypeScript strict mode enabled
- Path aliases configured (`@/*` maps to project root)
- shadcn/ui configured with `components.json` (new-york style, cssVariables: true)
- Playwright configured for testing

### Key Implication

This is effectively a full page build from scratch. The implementation will need to:
1. Install required shadcn/ui components (at minimum: Button, Checkbox, DropdownMenu/Popover, Badge/custom status component)
2. Create the sidebar layout component
3. Create the invoice list page with all sub-components
4. Define the invoice data model/types
5. Create mock data
6. Set up routing (this page likely becomes `app/page.tsx` or `app/invoices/page.tsx`)

---

## 5. Identified Gaps

1. **No "due date" field in acceptance criteria**: The AC states "Each invoice shows key details (ID, client name, amount, status)" but the Figma design clearly shows a "Due date" field on every invoice row. The due date is missing from the AC list.

2. **"New Invoice" button behavior undefined**: The header includes a "+ New Invoice" button prominently shown in the Figma design. The ticket does not mention what this button should do. Should it be present but non-functional? Should it navigate somewhere? Should it open the create invoice side panel?

3. **Sidebar scope not addressed**: The Figma designs show a persistent left sidebar with logo, theme toggle, and user avatar. The ticket says nothing about implementing the sidebar. Is it in scope for this ticket or a separate task?

4. **Theme toggle not addressed**: The sidebar includes a dark/light mode toggle (moon/sun icon). The ticket does not mention theme switching. The `layout.tsx` currently has no theme provider. Is theme support in scope?

5. **Status badge colors not in design system**: Three status colors (green `#33D69F`, orange `#FF8F00`, draft gray `#373B53`) are not defined in CLAUDE.md or `globals.css`. No `invoice-*` utilities exist for these colors. They need to be added or a decision needs to be made about how to handle them.

6. **Row hover behavior not specified in AC**: The Figma shows a purple left-border hover effect on invoice rows, but this is not mentioned in the acceptance criteria.

7. **Filter subtitle dynamics not specified**: When a filter is active, the subtitle changes from "There are 7 total invoices" to "There are 4 pending invoices". This dynamic behavior is implied by the Figma but not explicitly stated in the AC.

8. **Routing strategy undefined**: The AC says "Clicking an invoice navigates to the View Invoice page" but:
   - No route path is specified (e.g., `/invoices/[id]`)
   - The View Invoice page is not part of this ticket
   - Should the click navigate to a not-yet-built page, or should a placeholder be created?

9. **Currency format not specified**: Figma shows GBP (pound sign). The ticket does not mention currency formatting rules. Should it always be GBP? Should it support localization?

10. **Pagination/scrolling not addressed**: The Figma shows 7 invoices. What happens with more invoices? Is there pagination, infinite scroll, or just a scrollable list?

11. **Empty state illustration source unclear**: The empty state shows a custom illustration (person in envelope). This is a unique SVG/image asset. Where should this asset come from? Is it provided as a downloadable asset from Figma?

12. **Data model not defined**: The ticket says "Invoice data can be mocked" but provides no schema. The Figma shows: ID, due date, client name, amount, and status. Are there additional fields (description, sender address, items) that should be in the mock data for consistency with the View Invoice page?

13. **Responsive behavior not fully scoped**: The AC states "UI works on desktop" only. The Figma file contains mobile (375px) and tablet (768px) designs. Should they be ignored entirely for this ticket?

14. **Loading state not designed or mentioned**: No Figma frame shows a loading state for the invoice list. Since data is mocked, this may not be needed now, but it should be noted.

---

## 6. Risk Flags

### UX Risks

| Risk | Severity | Details |
|------|----------|---------|
| Status badge colors undefined in design system | **High** | Three colors (green, orange, gray) used in status badges are not in CLAUDE.md or `globals.css`. Implementing without updating the design system will create technical debt or force hardcoded hex values, violating project rules. |
| Sidebar implementation ambiguity | **Medium** | If the sidebar is not built, the page layout will look fundamentally different from the Figma design, failing AC #1 ("Page layout matches the Figma design"). |
| Row hover effect could be missed | **Low** | The hover state (purple left border) is only visible in the interaction frame (`0:6136`), not the primary frames linked in the ticket. Implementers may not notice it. |

### Product Risks

| Risk | Severity | Details |
|------|----------|---------|
| "New Invoice" button leads nowhere | **Medium** | The button is prominently shown in the design. If it does nothing on click, it creates a poor user experience. A decision is needed on whether to disable it, show a "coming soon" message, or not render it at all. |
| Navigation to View Invoice page hits dead end | **Medium** | AC #5 requires clicking an invoice to navigate to the View Invoice page, but that page presumably does not exist yet. This could result in a 404 or blank page. |
| Filter behavior when no results match | **Low** | What happens if a user filters by "Draft" and there are no draft invoices? Should it show the empty state illustration or a simpler "No matching invoices" message? |

### Technical Risks

| Risk | Severity | Details |
|------|----------|---------|
| No shadcn components installed yet | **Medium** | The `components/ui/` directory does not exist. Multiple shadcn components need to be installed (Button, Checkbox, Popover/DropdownMenu, etc.). The installer modifies `globals.css` and creates files, which could conflict with the existing theme setup if not handled carefully. |
| No theme provider in layout | **Medium** | `layout.tsx` has no mechanism to toggle between light and dark themes (no `next-themes`, no `ThemeProvider`, no `dark` class toggling on `<html>`). If dark mode support is expected, this is a prerequisite. |
| Mock data structure will set precedent | **Medium** | The TypeScript interfaces and mock data created for this ticket will likely be reused for the View Invoice, Create Invoice, and Edit Invoice features. Getting the data model wrong now means refactoring later. |
| Empty state illustration asset | **Low** | The illustration is a custom SVG/image. It needs to be exported from Figma. If Figma access is limited for the implementer, this could block the empty state work. |

---

## 7. Clarifying Questions

1. **Sidebar scope**: Is the sidebar (logo, theme toggle, user avatar) in scope for CI-3243, or will it be implemented in a separate ticket? The Figma designs show it as part of the page layout.
   - *Source*: Figma frames `0:8890`, `0:8672` show sidebar; Jira ticket makes no mention of it.
   - *Suggested answer*: Include a basic sidebar shell to match Figma layout, but defer theme toggle functionality and avatar to separate tickets.

2. **Theme support scope**: Should the page support both light and dark themes for this ticket? The Figma provides both, but the AC only says "UI works on desktop" without mentioning themes.
   - *Source*: Figma has dark mode frames (`0:7529`, `0:7311`); CLAUDE.md mandates "All components must support both light and dark themes."
   - *Suggested answer*: Yes -- CLAUDE.md rules require it, and the CSS variables are already configured.

3. **"New Invoice" button behavior**: What should happen when a user clicks "+ New Invoice"? Options: (a) Navigate to a create page, (b) Open a side panel, (c) Be disabled/non-functional, (d) Not rendered at all.
   - *Source*: Figma shows the button; ticket does not specify its behavior.
   - *Suggested answer*: Render the button but make it non-functional (no onClick handler or a console log) since the Create Invoice feature is a separate ticket.

4. **View Invoice route**: What route should invoice clicks navigate to? Should a placeholder page be created at that route?
   - *Source*: AC #5 requires navigation; no route is specified; no View Invoice page exists.
   - *Suggested answer*: Navigate to `/invoices/[id]` and create a minimal placeholder page.

5. **Status badge colors**: Should the three status colors (green `#33D69F`, orange `#FF8F00`, gray `#373B53`) be added to the design system in CLAUDE.md and `globals.css` as `invoice-*` utilities?
   - *Source*: These colors appear in Figma frames but are absent from CLAUDE.md and `globals.css`.
   - *Suggested answer*: Yes -- add `invoice-green` / `invoice-orange` / `invoice-draft-gray` (or similar names) to both CLAUDE.md and `globals.css`.

6. **Page route**: Should this page be at `/` (replacing the current "Hello World") or at `/invoices`?
   - *Source*: Ticket says this is "the main entry point for invoice management"; current `app/page.tsx` is a placeholder.
   - *Suggested answer*: Implement as `app/page.tsx` (root route) since this is the primary entry point and the current page is just a placeholder.

7. **Invoice data schema**: Beyond the visible fields (ID, due date, client name, amount, status), should the mock data include additional fields needed by the View Invoice page (description, sender address, client address, client email, line items)?
   - *Source*: Figma View Invoice page (`0:8597`) shows many more fields; ticket says "Invoice data can be mocked."
   - *Suggested answer*: Define a comprehensive `Invoice` interface that covers all fields visible in the View Invoice Figma frame, but only display the subset needed for the list page.

8. **Multi-select filter behavior**: When multiple statuses are checked in the filter (e.g., Draft + Pending), should invoices matching ANY of the selected statuses be shown? What happens when no filters are selected -- show all or show none?
   - *Source*: Figma shows filter with "Pending" checked and 4 results shown, but does not show multi-select or no-selection states.
   - *Suggested answer*: Show invoices matching ANY selected status (OR logic). When no filters are selected, show all invoices.

9. **Responsive behavior**: The AC says "UI works on desktop." Should mobile and tablet layouts be completely ignored, or should the page at least not break on smaller screens?
   - *Source*: AC #6 says "desktop" only; Figma has mobile/tablet frames.
   - *Suggested answer*: Implement desktop layout only for this ticket, but use responsive-friendly patterns so it does not catastrophically break on smaller screens.

---

## 8. Suggested Acceptance Criteria Improvements

The existing ACs are functional but miss several behaviors visible in the Figma. Below are improved and additional criteria.

### Improved Existing Criteria

**AC 1 (Layout)** -- Improved:
> **Given** the user navigates to the invoices page,
> **When** the page loads,
> **Then** the layout matches the Figma design including a left sidebar, page header with title and invoice count subtitle, a "Filter by status" dropdown trigger, and a "+ New Invoice" button.

**AC 3 (Invoice details)** -- Improved:
> **Given** there are invoices in the system,
> **When** the user views the invoice list,
> **Then** each invoice row displays: invoice ID (prefixed with #), due date (formatted as "Due DD MMM YYYY"), client name, total amount (with currency symbol), and a color-coded status badge (Paid=green, Pending=orange, Draft=gray).

### Additional Criteria

**AC 7 -- Empty State**:
> **Given** there are no invoices in the system,
> **When** the user views the invoices page,
> **Then** the page displays an empty state with an illustration, the heading "There is nothing here", the subtext "Create an invoice by clicking the New Invoice button and get started", and the subtitle reads "No invoices".

**AC 8 -- Filter Subtitle Update**:
> **Given** the user has applied a status filter,
> **When** the filtered results are shown,
> **Then** the subtitle updates to reflect the count and active filter (e.g., "There are 4 pending invoices").

**AC 9 -- Filter Deselect / Show All**:
> **Given** the user has no status filters selected,
> **When** viewing the invoice list,
> **Then** all invoices are displayed and the subtitle shows the total count (e.g., "There are 7 total invoices").

**AC 10 -- Row Hover State**:
> **Given** the user is viewing the invoice list on desktop,
> **When** the user hovers over an invoice row,
> **Then** the row displays a purple left border to indicate it is interactive.

**AC 11 -- Dark Mode Support**:
> **Given** the user has dark mode enabled,
> **When** viewing the invoices page (list or empty state),
> **Then** all colors, backgrounds, and text correctly use the dark theme variables as defined in the design system.

**AC 12 -- Due Date Display**:
> **Given** an invoice has a due date,
> **When** it is displayed in the invoice list,
> **Then** the due date is shown in the format "Due DD MMM YYYY" (e.g., "Due 19 Aug 2021").

---

## 9. Recommendation

**Assessment: Needs Clarification**

The ticket provides a solid high-level description and the Figma designs are comprehensive, but there are several gaps that should be resolved before implementation to avoid rework:

### Must Resolve Before Implementation

1. **Sidebar scope** (Question #1) -- This fundamentally affects the page layout and determines whether AC #1 can be met.
2. **Status badge colors** (Question #5) -- These colors must be added to the design system before implementation can proceed without violating the "NEVER hardcode hex colors" rule in CLAUDE.md.
3. **Page route decision** (Question #6) -- Determines file placement and impacts future routing.

### Should Resolve, But Can Proceed With Reasonable Defaults

4. **"New Invoice" button behavior** (Question #3) -- Render but non-functional is a safe default.
5. **View Invoice route** (Question #4) -- Create a placeholder at `/invoices/[id]`.
6. **Invoice data schema** (Question #7) -- Build comprehensive types now to avoid future refactoring.
7. **Theme support** (Question #2) -- CLAUDE.md rules mandate this; proceed with dark mode support.

### Can Defer

8. **Responsive behavior** (Question #9) -- Desktop only per AC, but use responsive-friendly patterns.
9. **Pagination** (Gap #10) -- Not shown in Figma; defer until backend integration.

### Pre-Implementation Checklist

Before starting implementation, the following should be done:
- [ ] Add status badge colors to design system (`globals.css` + CLAUDE.md)
- [ ] Confirm sidebar scope with product/design team
- [ ] Install required shadcn/ui components (Button, Checkbox, Popover, Badge)
- [ ] Export empty state illustration SVG from Figma
- [ ] Set up theme provider (e.g., `next-themes`) if dark mode is in scope
- [ ] Define `Invoice` TypeScript interface
- [ ] Create mock invoice data (7 invoices matching Figma samples)
