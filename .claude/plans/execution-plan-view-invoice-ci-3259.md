# Execution Plan: View Invoice Page (CI-3259)

## Source Artifacts
- Context Review: `.claude/plans/context-review-CI-3259.md`
- Jira Ticket: CI-3259 - [AI TEST] Implement View Invoice page
- Figma Frames:
  - Desktop Light: `0:8597` (primary reference)
  - Desktop Dark: `0:7236`
  - Desktop Light Hover: `0:6041`
  - Desktop Dark Hover: `0:5105`

## Scope Summary
Replace the placeholder View Invoice page at `app/invoices/[id]/page.tsx` with the full implementation showing invoice details, status badge, and action buttons (Edit, Delete, Mark as Paid). The page follows the desktop Figma design with three main sections: back navigation, status bar card, and invoice details card with itemized breakdown and amount due footer.

## Implementation Steps

1. **Invoice data lookup** -- Replace placeholder with invoice lookup from `mockInvoices` by ID, handle not found case with simple fallback message and back link
2. **Status bar card** -- Implement horizontal card with "Status" label, StatusBadge component, and three action buttons (Edit, Delete, Mark as Paid) right-aligned
3. **Invoice details card header** -- Implement header section with invoice ID (# prefix + ID), description below, and sender address right-aligned
4. **Invoice details grid** -- Implement three-column grid: (1) Invoice Date + Payment Due, (2) Bill To with client name and address, (3) Sent to with client email
5. **Items table** -- Implement table with tinted background, column headers (Item Name, QTY., Price, Total), item rows, rounded top corners
6. **Amount Due footer** -- Implement dark background footer with "Amount Due" label (left) and total amount (right, 24px Bold), rounded bottom corners
7. **Status-dependent button logic** -- Implement conditional rendering: hide "Mark as Paid" for paid invoices, show "Mark as Pending" for draft invoices
8. **Styling and theme support** -- Apply exact spacing, typography, colors from design system, verify both light and dark modes work correctly

## Components to Create/Modify

- [x] `app/invoices/[id]/page.tsx` -- Replace entire placeholder implementation with full View Invoice page

## Components to Reuse

- `components/status-badge.tsx` -- StatusBadge for status display
- `components/sidebar.tsx` -- Already in layout, renders fixed left sidebar
- `components/ui/button.tsx` -- shadcn Button for action buttons
- `lib/utils/currency.ts` -- formatCurrency() for all monetary values
- `lib/utils/date.ts` -- formatDate() for invoice and due dates
- `lib/types/invoice.ts` -- Invoice, Address, LineItem types
- `lib/data/mock-invoices.ts` -- Mock invoice data for lookup
- `lib/utils.ts` -- cn() helper for conditional classes

## Dependencies & Prerequisites

- All needed types and data already exist in codebase
- No shadcn components need to be installed (Button already available)
- Existing async params pattern (`Promise<{ id: string }>`) must be preserved
- Page can remain a Server Component (no client-side state needed for UI-only buttons)

## Design Decisions

1. **Action buttons**: Rendered as UI-only (no onClick handlers). They are visible but non-functional per ticket scope.
2. **Status-dependent buttons**:
   - Paid invoices: Hide "Mark as Paid" button
   - Draft invoices: Show "Mark as Pending" instead of "Mark as Paid"
   - Pending invoices: Show "Mark as Paid"
3. **Invoice not found**: Show simple "Invoice not found" message with back link to `/`
4. **Responsive scope**: Desktop only (730px max-width content area). Won't break on smaller screens but no tablet/mobile layouts.
5. **Edit button styling**: Use custom Tailwind classes on Button component (light: `bg-[#F9FAFE]` with `text-invoice-muted-blue`, dark: `bg-invoice-navy-light` with `text-invoice-lavender`)
6. **Amount Due footer bg**: Use `bg-invoice-draft-light` for light mode, `bg-invoice-black` for dark mode
7. **Items table bg**: Use `bg-[#F9FAFE]` for light mode, appropriate dark card variant for dark mode

## Acceptance Criteria Mapping

| AC # | Criteria | Implementation Step |
|------|----------|---------------------|
| 1    | Layout matches Figma design | Steps 2-6 (all visual sections) |
| 2    | Displays invoice details (ID, description, dates, addresses, items, totals) | Steps 3-6 |
| 3    | Displays invoice status | Step 2 (StatusBadge) |
| 4    | Action buttons visible | Step 2 (Edit, Delete, Mark as Paid) |
| 5    | Back navigation works | Already exists in placeholder, preserved |
| 6    | UI works on desktop | Steps 2-8 (730px content width) |

## Additional Quality Checks

- [ ] Invoice lookup handles invalid IDs gracefully (Step 1)
- [ ] Status-dependent button logic works for all three statuses (Step 7)
- [ ] Dark mode displays correctly for all sections (Step 8)
- [ ] All colors use CSS variables or invoice-* utilities (no hardcoded hex except where Figma-specific)
- [ ] Typography matches design system exactly (15px Bold for headings, 13px Medium for body)
- [ ] 8px spacing grid followed throughout
- [ ] Buttons are 48px tall with rounded-3xl
- [ ] Cards use rounded-lg with appropriate shadows

## Implementation Notes

- **Server Component**: Page remains async Server Component, no "use client" needed (buttons are UI-only)
- **Preserve existing patterns**: Keep ArrowLeft icon for back navigation, maintain 730px max-width content area
- **Color usage**:
  - Invoice ID hash: `text-invoice-muted`
  - Description/labels: `text-invoice-muted-blue`
  - Values: `text-foreground`
  - Edit button: Custom classes for light/dark variants
  - Delete button: `variant="destructive"`
  - Mark as Paid: `variant="default"` (primary purple)
- **Typography classes**:
  - Invoice ID: `text-[15px] font-bold leading-6 tracking-tight`
  - Description: `text-[13px] font-medium leading-[18px] tracking-[-0.1px]`
  - Section labels: `text-[13px] font-medium leading-[18px] tracking-[-0.1px]`
  - Values: `text-[15px] font-bold leading-5 tracking-tight`
  - Amount Due total: `text-2xl font-bold leading-none tracking-tight`
