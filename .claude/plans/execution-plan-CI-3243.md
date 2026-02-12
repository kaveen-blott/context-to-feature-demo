# Execution Plan: Implement All Invoices Page (CI-3243)

## Source Artifacts
- **Context Review**: `/Users/kaveendev/Developer/Demo/context-to-feature-demo/.claude/plans/context-review-CI-3243.md`
- **Jira Ticket**: [CI-3243](https://blott.atlassian.net/browse/CI-3243) - [AI TEST] Implement All Invoices page
- **Figma Frames**:
  - All invoices light: Node `0:8890`
  - All invoices dark: Node `0:7529`
  - Empty invoices light: Node `0:8672`
  - Empty invoices dark: Node `0:7311`
  - Filter/hover: Nodes `0:6136`, `0:5200`

## Scope Summary

Build the "All Invoices" page as the main entry point for invoice management, matching Figma designs pixel-accurately. The page displays a list of invoices with filtering by status, supports navigation to individual invoice pages, and includes both empty and populated states. Dark mode support is mandatory per CLAUDE.md requirements.

## Implementation Steps

### Phase 1: Setup & Dependencies
1. Add missing status badge colors to design system (globals.css + CLAUDE.md)
2. Install required shadcn/ui components via CLI
3. Install and configure `next-themes` for dark mode support
4. Update layout.tsx to include ThemeProvider

### Phase 2: Data Layer
5. Create TypeScript invoice type definitions (`lib/types/invoice.ts`)
6. Create mock invoice data (`lib/data/mock-invoices.ts`)
7. Create utility functions for filtering and date formatting

### Phase 3: Core Components
8. Create Sidebar component with logo, theme toggle, and avatar placeholders
9. Create StatusBadge component for invoice status pills
10. Create InvoiceCard component for individual invoice rows
11. Create FilterDropdown component for status filtering
12. Create EmptyState component with placeholder illustration

### Phase 4: Page Implementation
13. Build main page layout at `app/page.tsx`
14. Implement invoice list with filtering logic
15. Create placeholder page at `app/invoices/[id]/page.tsx` for navigation
16. Add hover states and interactions

### Phase 5: Polish & Testing
17. Verify dark mode works correctly across all components
18. Test filter interactions and dynamic subtitle updates
19. Verify navigation and responsive behavior
20. Ensure all spacing, typography, and colors match Figma exactly

---

## Components to Create/Modify

### New Components
- [ ] `components/sidebar.tsx` — Left sidebar with logo, theme toggle, avatar
- [ ] `components/theme-toggle.tsx` — Moon/sun icon toggle for dark/light mode
- [ ] `components/invoice-card.tsx` — Individual invoice row card
- [ ] `components/status-badge.tsx` — Status pill with dot + text (Paid/Pending/Draft)
- [ ] `components/filter-dropdown.tsx` — Status filter with checkboxes
- [ ] `components/empty-state.tsx` — Empty state with illustration
- [ ] `components/invoice-list.tsx` — Container for invoice cards with filtering
- [ ] `components/invoice-header.tsx` — Page header with title, subtitle, filter, new button

### New Pages
- [ ] `app/page.tsx` — Replace placeholder with All Invoices page
- [ ] `app/invoices/[id]/page.tsx` — Placeholder for View Invoice navigation

### New Data/Types
- [ ] `lib/types/invoice.ts` — TypeScript interfaces for Invoice, InvoiceStatus, Address, LineItem
- [ ] `lib/data/mock-invoices.ts` — Array of 7 mock invoices matching Figma data
- [ ] `lib/utils/date.ts` — Date formatting utilities
- [ ] `lib/utils/currency.ts` — Currency formatting utilities

### Modified Files
- [ ] `app/globals.css` — Add status badge color variables
- [ ] `app/layout.tsx` — Add ThemeProvider and dark class support
- [ ] `CLAUDE.md` — Document new status badge colors

---

## Components to Reuse

### From shadcn/ui (to be installed)
- **Button** (`components/ui/button.tsx`) — For "New Invoice" button
- **Checkbox** (`components/ui/checkbox.tsx`) — For filter dropdown
- **Popover** (`components/ui/popover.tsx`) — For filter dropdown container

---

## Dependencies & Prerequisites

### Package Installations
- `next-themes` — Theme provider for dark mode toggling
- shadcn/ui components: Button, Checkbox, Popover

### Design System Updates
Add three status badge colors to `globals.css` and `CLAUDE.md`:
- **Paid (Green)**: `#33D69F` / `hsl(158 64% 52%)`
- **Pending (Orange)**: `#FF8F00` / `hsl(33 100% 50%)`
- **Draft (Gray)**: Light: `#373B53` / Dark: `#DFE3FA`

### Figma Assets
- Empty state illustration (will use placeholder SVG for now)
- Logo SVG (will use placeholder purple circle)

---

## Acceptance Criteria Mapping

| AC # | Criteria | Implementation Step |
|------|----------|---------------------|
| 1 | Page layout matches Figma design | Steps 8, 13, 14 |
| 2 | All invoices displayed in a list | Steps 6, 10, 14 |
| 3 | Each invoice shows key details (ID, client, amount, status) | Step 10 (InvoiceCard) |
| 4 | Users can filter invoices by status | Steps 11, 14 |
| 5 | Clicking invoice navigates to View Invoice page | Steps 10, 15 |
| 6 | UI works on desktop | All steps |
| NEW 7 | Empty state shown when no invoices | Step 12 |
| NEW 8 | Filter subtitle updates dynamically | Step 14 |
| NEW 9 | Row hover state shows purple left border | Step 16 |
| NEW 10 | Dark mode support | Steps 3, 4, 17 |
| NEW 11 | Due date shown in "Due DD MMM YYYY" format | Step 7, 10 |

---

## Technical Decisions

### Routing
- **All Invoices page**: `app/page.tsx` (root route, as it's the main entry point)
- **View Invoice page**: `app/invoices/[id]/page.tsx` (dynamic route for individual invoices)

### Data Model
Invoice interface will include all fields visible in View Invoice Figma frame to avoid future refactoring:
- Core: id, createdAt, paymentDue, description, paymentTerms, clientName, clientEmail, status, total
- Addresses: senderAddress, clientAddress (street, city, postCode, country)
- Items: items[] (name, quantity, price, total)

### Filter Behavior
- Multi-select uses OR logic (show invoices matching ANY selected status)
- When no filters selected, show all invoices
- Subtitle updates to reflect active filter (e.g., "There are 4 pending invoices")

### Theme Implementation
- Use `next-themes` with `attribute="class"` to toggle `.dark` class on `<html>`
- ThemeProvider wraps children in layout.tsx
- Theme toggle in sidebar uses `useTheme()` hook

### "New Invoice" Button
- Rendered but non-functional for this ticket
- Button is visible and styled correctly but has no onClick handler

---

## File Structure After Implementation

```
app/
  layout.tsx                  # Updated: ThemeProvider added
  page.tsx                    # Updated: All Invoices page
  globals.css                 # Updated: Status badge colors added
  invoices/
    [id]/
      page.tsx                # New: Placeholder view invoice page

components/
  sidebar.tsx                 # New: App sidebar
  theme-toggle.tsx            # New: Dark/light mode toggle
  invoice-header.tsx          # New: Page header
  invoice-list.tsx            # New: Invoice list container
  invoice-card.tsx            # New: Invoice row card
  status-badge.tsx            # New: Status pill component
  filter-dropdown.tsx         # New: Filter dropdown
  empty-state.tsx             # New: Empty state
  ui/
    button.tsx                # New: shadcn Button
    checkbox.tsx              # New: shadcn Checkbox
    popover.tsx               # New: shadcn Popover

lib/
  types/
    invoice.ts                # New: Invoice type definitions
  data/
    mock-invoices.ts          # New: Mock invoice data
  utils/
    date.ts                   # New: Date formatting utilities
    currency.ts               # New: Currency formatting utilities
```

---

## Color System Updates

### Add to `globals.css` @theme inline block:
```css
--color-invoice-green: hsl(158 64% 52%);
--color-invoice-orange: hsl(33 100% 50%);
--color-invoice-draft-gray-light: hsl(233 26% 26%);
--color-invoice-draft-gray-dark: hsl(231 73% 93%);
```

### Add to `CLAUDE.md` Direct Utility Colors section:
```markdown
- `bg-invoice-green` / `text-invoice-green` -- #33D69F (Paid status)
- `bg-invoice-orange` / `text-invoice-orange` -- #FF8F00 (Pending status)
- `bg-invoice-draft-gray` / `text-invoice-draft-gray` -- #373B53 (Draft status, light mode) / #DFE3FA (Draft status, dark mode)
```

---

## Risk Mitigation

### High Priority Risks Addressed
1. **Status badge colors undefined** → Step 1 adds them to design system
2. **No shadcn components installed** → Step 2 installs required components
3. **No theme provider** → Steps 3-4 add next-themes support
4. **Sidebar implementation ambiguity** → Step 8 includes basic sidebar shell

### Medium Priority Risks Addressed
1. **"New Invoice" button leads nowhere** → Rendered but non-functional (clear UX)
2. **Navigation to View Invoice hits dead end** → Step 15 creates placeholder page
3. **Mock data structure precedent** → Step 5 defines comprehensive schema

---

## Testing Checklist

After implementation, verify:
- [ ] Page renders without errors
- [ ] All 7 mock invoices display correctly
- [ ] Filter dropdown opens/closes properly
- [ ] Checking Draft/Pending/Paid filters shows correct invoices
- [ ] Subtitle updates dynamically based on active filters
- [ ] Empty state appears when no invoices match filters
- [ ] Clicking an invoice navigates to `/invoices/[id]`
- [ ] Dark mode toggle works
- [ ] All colors/typography match Figma in both light and dark modes
- [ ] Row hover state shows purple left border
- [ ] New Invoice button is visible (even if non-functional)
- [ ] No TypeScript errors
- [ ] No hardcoded hex colors in code
- [ ] Spacing follows 8px grid
- [ ] All buttons are 48px tall with rounded-3xl
