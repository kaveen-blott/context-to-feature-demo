# Context Review: Implement View Invoice Page

**Date**: 2026-02-12
**Jira Ticket**: [CI-3259](https://blott.atlassian.net/browse/CI-3259) - [AI TEST] Implement View Invoice page
**Status**: To Do
**Assignee**: Kaveen De Alwis
**Priority**: Not specified (defaults to Medium)
**Issue Type**: Sub-task
**Reviewer**: Context Review Agent

---

## 1. Ticket Summary

**Title**: [AI TEST] Implement View Invoice page

**Description**: Implement the View Invoice page where users can see full invoice details. This page is accessed when a user selects an invoice from the All Invoices list. The UI should follow the Figma designs.

**Goals** (as stated):
- Users should be able to view complete invoice information
- See invoice status
- Perform invoice actions
- Review itemized breakdown
- Navigate back to invoice list

**Acceptance Criteria** (as stated in ticket):
1. Layout matches Figma design
2. Displays invoice details: Invoice ID, Description, Dates, Sender/Client info, Items, Totals
3. Displays invoice status
4. Action buttons visible
5. Back navigation works
6. UI works on desktop

**Key Notes from Ticket**:
- Invoice data can come from existing frontend state/store
- No backend changes required
- Follow existing styling/components
- Basic accessibility should be considered

**Parent/Linked Issues**: This is a sub-task. No parent issue link visible in ticket data. This ticket is a natural follow-up to CI-3243 (All Invoices page), which has already been implemented.

---

## 2. Figma Summary

### Screens Analyzed

Eight Figma frames were analyzed (screenshots captured):

| Frame | Node ID | Theme | Breakpoint | Description |
|-------|---------|-------|------------|-------------|
| View Invoice | `0:8597` | Light | Desktop (1440px) | Full invoice detail page |
| View Invoice | `0:7236` | Dark | Desktop (1440px) | Same page, dark theme |
| View Invoice Hover/Active | `0:6041` | Light | Desktop (1440px) | Button hover states, "Go back" hover |
| View Invoice Hover/Active | `0:5105` | Dark | Desktop (1440px) | Same interactions, dark theme |
| View Invoice | `0:3965` | Light | Tablet (768px) | Tablet layout |
| View Invoice | `0:2579` | Dark | Tablet (768px) | Tablet layout, dark theme |
| View Invoice | `0:1184` | Light | Mobile (375px) | Mobile layout |
| View Invoice | `0:388` | Dark | Mobile (375px) | Mobile layout, dark theme |

### Layout Structure (Desktop)

The page consists of three main vertical sections within the 730px-wide content area:

1. **Back Navigation**: "Go back" link with left-pointing chevron arrow at top
2. **Status Bar Card**: Horizontal bar containing status label, status badge, and action buttons (Edit, Delete, Mark as Paid)
3. **Invoice Details Card**: Large card containing all invoice data

### Back Navigation
- Left-pointing chevron (purple `#7C5DFA`) followed by "Go back" text
- Text: 15px Bold, foreground color (`#0C0E16` light / white dark)
- Hover state visible in `0:6041`: cursor pointer on "Go back" link
- Positioned at top of content area, above the status bar

### Status Bar Card
- White card (`bg-card`) with 8px border radius and card shadow
- Height: 88px
- Layout: "Status" label (left) + StatusBadge (next to label) + action buttons (right-aligned)
- **Status label**: "Status" text, 13px Medium, `#858BB2` color
- **Status badge**: Reuses the existing StatusBadge component pattern (pill with dot + text)
- **Action buttons** (right-aligned, from left to right):
  - **Edit**: Button 3 variant -- `#F9FAFE` bg, `#7E88C3` text, rounded-3xl, 48px height, 73px wide
  - **Delete**: Button 5 variant -- `#EC5757` bg, white text, rounded-3xl, 48px height, 89px wide
  - **Mark as Paid**: Button 2 variant -- `#7C5DFA` bg, white text, rounded-3xl, 48px height, 131px wide

### Invoice Details Card
- White card with 8px border radius and card shadow
- Internal padding: approximately 48px all around
- Contains the following sections:

**Header Section**:
- Invoice ID: `#` in `#888EB0` + ID in foreground (`#0C0E16`), 15px Bold, 24px line-height
- Description: below ID, 13px Medium, `#7E88C3`
- Sender address: right-aligned, 13px Medium, `#7E88C3`, multi-line (street, city, postcode, country)

**Details Grid (3 columns)**:
- Column 1: "Invoice Date" label + formatted date (e.g., "21 Aug 2021"), then "Payment Due" label + due date below
- Column 2: "Bill To" label + client name (15px Bold, foreground) + client address (13px Medium, `#7E88C3`, multi-line)
- Column 3: "Sent to" label + client email (15px Bold, foreground)
- Labels are 13px Medium, `#7E88C3`
- Values are 15px Bold, foreground color, 20px line-height

**Items Table**:
- Background: `#F9FAFE` (light) / dark card variant
- Rounded top corners: 8px
- Column headers: "Item Name", "QTY.", "Price", "Total" -- 13px Medium, `#7E88C3`
- Item rows: Item name (15px Bold, foreground), Qty (15px Bold, `#7E88C3`), Price (15px Bold, `#7E88C3`), Total (15px Bold, foreground)
- Total amount right-aligned

**Amount Due Footer**:
- Background: `#373B53` (light) / `#0C0E16` (dark)
- Rounded bottom corners: 8px
- Left: "Amount Due" text, 13px Medium, white
- Right: Total amount, 24px Bold, white, right-aligned (Heading M style)

### Responsive Differences

**Tablet (768px)**:
- No left sidebar; horizontal top bar with logo (left), theme toggle (center), avatar (right)
- Top bar height: ~80px
- Content area full width with horizontal padding (~40px)
- Status bar: Same layout as desktop with all buttons visible
- Invoice details card: Same layout as desktop
- Items table: Same 4-column layout

**Mobile (375px)**:
- Same horizontal top bar as tablet (72px height)
- Content area: full width with 24px horizontal padding
- Status bar card: Only shows "Status" + badge (no action buttons)
- Invoice details card:
  - Sender address below invoice ID/description (not right-aligned)
  - "Invoice Date" and "Bill To" in 2-column layout (no "Sent to" column -- "Sent to" drops to its own row below)
  - Items table simplified: Each item shows name + "qty x price" on left, total on right (no separate columns)
  - "Grand Total" label instead of "Amount Due"
- **Action buttons: Fixed bottom bar** outside the card, full-width, with Edit / Delete / Mark as Paid buttons

---

## 3. Design System Alignment

### Colors -- Alignment Assessment

**ALIGNED:**
- Primary purple (`#7C5DFA`) for "Mark as Paid" button -- maps to `--primary` / `bg-primary`
- Destructive red (`#EC5757`) for "Delete" button -- maps to `--destructive`
- Edit button light bg (`#F9FAFE`) -- close to `--background` light
- Muted blue text (`#7E88C3`) for labels -- maps to `text-invoice-muted-blue`
- Hash symbol color (`#888EB0`) -- maps to `text-invoice-muted` / `text-muted-foreground`
- Foreground text (`#0C0E16`) -- maps to `--foreground` (light)
- Card background (white / `#1E2139`) -- maps to `--card`
- Items table background (`#F9FAFE`) -- close to `--background` light / `bg-invoice-bg-light`
- Card shadow patterns match CLAUDE.md specifications

**NEEDS ATTENTION:**

| Element | Figma Color | Closest Design System Token | Issue |
|---------|-------------|---------------------------|-------|
| Status label "Status" | `#858BB2` | `--muted-foreground` (`#888EB0`) | Slight mismatch (~3-4 HSL points). Previously flagged in CI-3243 review. Use `text-muted-foreground` as approximation. |
| Amount Due footer bg | `#373B53` | `text-invoice-draft-light` | This color IS in the design system as `invoice-draft-light` but semantically it is not a "draft" color here. May need a dedicated `invoice-navy-dark` or similar alias. |
| Amount Due footer bg (dark) | `#0C0E16` | `--foreground` (light) / `text-invoice-black` | Available as `bg-invoice-black`. |
| Edit button dark bg | `#252945` | `--secondary` (dark) / `bg-invoice-navy-light` | Available as `bg-invoice-navy-light` or `bg-secondary` in dark mode. |
| Edit button dark text | `#DFE3FA` | `--secondary-foreground` (dark) / `text-invoice-lavender` | Available. |
| QTY/Price text | `#7E88C3` | `text-invoice-muted-blue` | Available. |

**VERDICT**: All colors needed for the View Invoice page ARE available in the current design system via either CSS variables or `invoice-*` utility classes. The status badge colors (green, orange, draft) added during CI-3243 are sufficient. No new colors need to be added.

### Typography -- Aligned

- "Go back" text: 15px Bold, -0.25px tracking -- matches Heading S Variant
- Invoice ID: 15px Bold, 24px line-height -- matches Heading S
- Description text: 13px Medium -- matches Body
- Labels (Invoice Date, Bill To, etc.): 13px Medium, `#7E88C3` -- matches Body style
- Date/name values: 15px Bold, 20px line-height -- close to Heading S (24px line-height in spec)
- Item names/totals: 15px Bold -- matches Heading S Variant
- Amount Due total: 24px Bold -- matches Heading M
- "Amount Due" label: 13px Medium white -- matches Body

### Spacing -- Aligned

- 8px grid system followed throughout
- Card padding: ~48px (6 * 8px)
- Section gaps: 24-32px

### Components -- Aligned

- Buttons follow established variants (Button 2, 3, 5 from CLAUDE.md)
- All buttons: 48px height, `rounded-3xl`
- Cards: 8px border radius (`rounded-lg`)
- StatusBadge component already exists and matches the pattern

### Theme Support

- Both light and dark mode frames reviewed for all breakpoints
- Key dark mode differences:
  - Card backgrounds change to dark navy (`--card` dark)
  - Items table background changes to darker shade
  - Amount Due footer changes to `#0C0E16` (near-black)
  - Text colors invert appropriately
  - Action buttons maintain their colors (Edit changes to `#252945` bg with `#DFE3FA` text)

---

## 4. Existing Codebase Context

### What Already Exists (Relevant to This Ticket)

The All Invoices page (CI-3243) has been implemented. The following components and utilities are available for reuse:

**Reusable Components:**
- `components/sidebar.tsx` -- Fixed left sidebar (103px wide) with logo, theme toggle, avatar
- `components/status-badge.tsx` -- Status pill badge supporting paid/pending/draft with correct colors
- `components/theme-provider.tsx` -- next-themes provider wrapper
- `components/theme-toggle.tsx` -- Dark/light mode toggle button
- `components/ui/button.tsx` -- shadcn/ui Button with variant system (default, destructive, secondary, outline, ghost, link)

**Reusable Utilities:**
- `lib/utils/currency.ts` -- `formatCurrency(amount)` outputs GBP format (e.g., "£ 1,800.90")
- `lib/utils/date.ts` -- `formatDate(dateString)` outputs "DD MMM YYYY", `formatDueDate(dateString)` outputs "Due DD MMM YYYY"
- `lib/utils.ts` -- `cn()` helper for conditional class merging

**Reusable Types:**
- `lib/types/invoice.ts` -- Full `Invoice` interface with: id, createdAt, paymentDue, description, paymentTerms, clientName, clientEmail, status, senderAddress, clientAddress, items[], total
- `Address` interface: street, city, postCode, country
- `LineItem` interface: name, quantity, price, total

**Existing Mock Data:**
- `lib/data/mock-invoices.ts` -- 7 mock invoices with full data including line items, addresses, and all fields needed for the View Invoice page

**Existing Route:**
- `app/invoices/[id]/page.tsx` -- Placeholder page already exists at the correct route. Currently shows only "View Invoice #[id]" text in a card. This is the file that needs to be replaced with the full implementation.

### What Needs to Be Built

The existing placeholder at `app/invoices/[id]/page.tsx` needs to be replaced with the full View Invoice page. Key new elements:
- Invoice detail card layout with all sections
- Items table with column headers and rows
- Amount Due footer bar
- Status bar with action buttons (Edit, Delete, Mark as Paid)
- Data lookup from mock invoices by ID

### What Does NOT Need to Be Built

- Sidebar -- already exists
- StatusBadge -- already exists
- Theme system -- already configured
- Invoice types -- already defined
- Mock data -- already created with all needed fields
- Currency/date formatting -- already implemented
- Back navigation pattern -- partially exists in placeholder (uses `Link` to `/`)

### Button Variant Gap

The shadcn/ui Button component currently has these variants: `default`, `destructive`, `secondary`, `outline`, `ghost`, `link`. The View Invoice page needs:
- **"Mark as Paid"**: Can use `default` variant (purple primary) with custom sizing
- **"Delete"**: Can use `destructive` variant with custom sizing
- **"Edit"**: Needs Button 3 styling (`#F9FAFE` bg light, `#252945` bg dark, `#7E88C3` text light, `#DFE3FA` text dark). The `secondary` variant is close but not exact. Custom classes or a new variant may be needed.

---

## 5. Identified Gaps

1. **Action button behavior undefined**: The ticket says "Action buttons visible" and goals include "Perform invoice actions" but does NOT specify what the Edit, Delete, or "Mark as Paid" buttons should actually do when clicked. Should they be non-functional placeholders? Navigate somewhere? Open a modal?

2. **"Mark as Paid" button logic for different statuses**: The Figma shows "Mark as Paid" for a "Pending" invoice. What should this button show when:
   - The invoice status is already "Paid"? (Hide the button? Show "Paid" disabled?)
   - The invoice status is "Draft"? (Show "Mark as Pending" instead? Show nothing?)
   - Only the "Pending" Figma frame is provided -- no "Paid" or "Draft" status View Invoice frame exists.

3. **"Edit" button destination undefined**: Should Edit navigate to a route (e.g., `/invoices/[id]/edit`)? Open a side panel? Do nothing? The Edit Invoice feature (side panel from Figma `0:8397`) is presumably a separate ticket.

4. **"Delete" button behavior undefined**: Should Delete open a confirmation modal (Figma frame `0:7635` shows a delete confirmation dialog)? Or just be non-functional?

5. **Invoice not found handling**: What should happen if a user navigates to `/invoices/INVALID_ID`? The ticket and Figma provide no 404/error state for this page.

6. **No loading state**: There is no Figma frame showing a loading/skeleton state for the View Invoice page. Since data is mock/frontend-only, this may not be needed yet, but should be noted.

7. **Responsive scope ambiguity**: AC says "UI works on desktop" but Figma provides tablet and mobile designs. The mobile layout is significantly different (action buttons in fixed bottom bar, simplified items table, different address layout). Should only desktop be implemented?

8. **Items table empty state**: What happens if an invoice has zero line items? (Not shown in Figma. The mock data always has at least one item.)

9. **Address formatting**: Should address fields be displayed exactly as stored (street/city/postcode/country each on their own line)? What if a field is empty?

10. **"Status" label text color**: Figma uses `#858BB2` for the "Status" label, which is slightly different from `--muted-foreground` (`#888EB0`). This was previously flagged in CI-3243 review. Using `text-muted-foreground` is the recommended approximation.

11. **Amount Due footer background color reuse**: The footer uses `#373B53` which is currently mapped as `invoice-draft-light`. Using it as a footer background is semantically different from "draft status." This is a naming concern, not a functional blocker.

12. **Edit button variant**: The Edit button uses a specific color combination not directly mapped to any existing shadcn/ui Button variant. Custom styling will be needed.

---

## 6. Risk Flags

### UX Risks

| Risk | Severity | Details |
|------|----------|---------|
| Action buttons with no behavior | **Medium** | Three prominent action buttons (Edit, Delete, Mark as Paid) are shown but their click behavior is undefined. If all three are non-functional, it creates a misleading UI. |
| Status-dependent button display unknown | **Medium** | The Figma only shows the "Pending" status view. It is unclear how the action bar should differ for "Paid" and "Draft" invoices. A "Paid" invoice showing "Mark as Paid" is confusing. |
| Invoice not found has no design | **Low** | Users could land on this page with an invalid ID (e.g., from a stale bookmark). No error state is designed. |
| Mobile bottom action bar pattern | **Low** | If responsive is implemented later, the mobile design moves action buttons to a fixed bottom bar, which is a fundamentally different layout pattern than desktop. This architectural decision should be anticipated. |

### Product Risks

| Risk | Severity | Details |
|------|----------|---------|
| Delete button without confirmation | **Medium** | If Delete is made functional without a confirmation modal, data loss could occur. The Figma has a delete confirmation modal (`0:7635`) but it is not referenced in this ticket. |
| Mark as Paid without undo | **Low** | If status transitions are implemented, there appears to be no "undo" or reverse transition in the design. Marking as Paid may be irreversible. |
| Button behaviors may conflict with future tickets | **Medium** | If buttons are made functional now, they could conflict with separate Edit/Delete tickets that implement the full flow differently. |

### Technical Risks

| Risk | Severity | Details |
|------|----------|---------|
| Invoice lookup by ID from mock data | **Low** | Currently using `mockInvoices` array. Lookup by ID is straightforward with `.find()`. However, the data is imported from a static module, meaning no state persistence (e.g., Mark as Paid would not persist). |
| Edit button needs custom styling | **Low** | No existing Button variant matches the Edit button design exactly. Custom Tailwind classes will be needed, which is fine but adds complexity. |
| Placeholder page already exists at route | **Low** | `app/invoices/[id]/page.tsx` already exists with a placeholder. The implementer needs to replace it entirely. The existing page uses async params pattern (`Promise<{ id: string }>`) which is the correct Next.js 16 pattern and should be preserved. |
| Client component vs Server component decision | **Medium** | The existing placeholder is a Server Component (async function). If action buttons need interactivity (onClick handlers for Mark as Paid, etc.), the page or parts of it will need to be Client Components. The architecture decision (whole page as client vs. decomposed with server/client boundaries) should be made intentionally. |

---

## 7. Clarifying Questions

1. **Action button behavior**: What should happen when the Edit, Delete, and "Mark as Paid" buttons are clicked? Options: (a) Non-functional/disabled placeholders, (b) Console log / toast notification, (c) Full functionality (navigate to edit, open delete modal, update status).
   - *Source*: Jira AC #4 says "Action buttons visible" but does not specify behavior. Goals say "Perform invoice actions."
   - *Suggested answer*: Render buttons but make them non-functional for now. Edit and Delete are likely separate ticket scope. Mark as Paid could optionally update local state but is not required.

2. **Status-dependent button display**: Should the action buttons change based on invoice status? Specifically:
   - For "Paid" invoices: Should "Mark as Paid" be hidden or disabled?
   - For "Draft" invoices: Should "Mark as Paid" change to "Mark as Pending"?
   - *Source*: Figma only shows the "Pending" status version of the View Invoice page. No Figma frames for "Paid" or "Draft" invoice views exist.
   - *Suggested answer*: For "Paid" invoices, hide the "Mark as Paid" button. For "Draft" invoices, show "Mark as Pending" (following the Draft -> Pending -> Paid flow noted in `.claude/plans/figma-design-context.md`). If uncertain, show "Mark as Paid" for all non-paid invoices.

3. **Invoice not found handling**: What should happen when a user navigates to `/invoices/[invalidId]`?
   - *Source*: No Figma design exists for this state. Jira ticket does not mention error handling.
   - *Suggested answer*: Show a simple "Invoice not found" message with a back link to the invoices list. Does not need to match Figma since no design exists.

4. **Responsive scope**: Should only the desktop layout be implemented, or should tablet and/or mobile be included?
   - *Source*: AC #6 says "UI works on desktop." Figma has mobile (375px) and tablet (768px) frames with significantly different layouts.
   - *Suggested answer*: Implement desktop layout only per AC. Use responsive-friendly patterns so it does not break catastrophically on smaller screens.

5. **Server vs Client component**: Should the page be a Server Component that fetches data, or a Client Component that reads from state?
   - *Source*: Ticket says "Invoice data can come from existing frontend state/store." The current placeholder is a Server Component. The invoices list page (`app/page.tsx`) is a Client Component using `useState`.
   - *Suggested answer*: Use a Server Component for the page shell (data lookup from mock) and extract interactive parts (action buttons) into a Client Component. This aligns with Next.js 16 App Router best practices and the async params pattern already in the placeholder.

6. **"Mark as Paid" persistence**: If "Mark as Paid" is functional, should the status change persist (e.g., update shared state visible on the list page) or be page-local only?
   - *Source*: Data is currently in a static mock module. No state management solution exists.
   - *Suggested answer*: Non-functional for now. Persistence requires a state management solution (e.g., Zustand, context) that is outside the scope of this ticket.

7. **Delete confirmation modal scope**: The Figma shows a delete confirmation modal (`0:7635`). Is implementing this modal part of CI-3259, or a separate ticket?
   - *Source*: Figma frame exists but is not referenced in CI-3259. Ticket goals mention "Perform invoice actions" broadly.
   - *Suggested answer*: Out of scope for this ticket. The Delete button should be visible but non-functional.

---

## 8. Suggested Acceptance Criteria Improvements

The existing ACs are functional but miss several behaviors visible in the Figma and leave action behaviors ambiguous. Below are improved and additional criteria.

### Improved Existing Criteria

**AC 1 (Layout)** -- Improved:
> **Given** the user navigates to `/invoices/[id]`,
> **When** the page loads with a valid invoice ID,
> **Then** the layout matches the Figma design including: a "Go back" navigation link at top, a status bar card with status badge and action buttons, and a full invoice details card with all sections.

**AC 2 (Invoice details)** -- Improved:
> **Given** the user is viewing a valid invoice,
> **When** the page displays,
> **Then** the following details are shown: Invoice ID (prefixed with #), description, invoice date (formatted as "DD MMM YYYY"), payment due date, sender address (street, city, post code, country), client name, client address, client email, an itemized table with item name/quantity/price/total columns, and the total amount due in GBP format.

**AC 4 (Action buttons)** -- Improved:
> **Given** the user is viewing an invoice,
> **When** the status bar is visible,
> **Then** the following action buttons are displayed: "Edit" (secondary/gray style), "Delete" (destructive/red style), and "Mark as Paid" (primary/purple style), each following the design system button specifications (48px height, rounded-3xl).

### Additional Criteria

**AC 7 -- Back Navigation Target**:
> **Given** the user is on the View Invoice page,
> **When** the user clicks the "Go back" link,
> **Then** they are navigated back to the invoice list page (root route `/`).

**AC 8 -- Invoice Not Found**:
> **Given** the user navigates to `/invoices/[id]` with an ID that does not match any invoice,
> **When** the page loads,
> **Then** a "not found" message is displayed with a link back to the invoices list.

**AC 9 -- Dark Mode Support**:
> **Given** the user has dark mode enabled,
> **When** viewing the View Invoice page,
> **Then** all colors, backgrounds, text, and components correctly use the dark theme variables as defined in the design system, including the status bar card, invoice details card, items table, and Amount Due footer.

**AC 10 -- Items Table Layout**:
> **Given** the invoice has one or more line items,
> **When** the items section is displayed,
> **Then** items are shown in a table with columns: Item Name, QTY., Price, Total, with a tinted background and rounded top corners. Below the table, an Amount Due footer bar shows the total in Heading M style on a dark background.

**AC 11 -- Currency and Date Formatting**:
> **Given** the invoice has monetary amounts and dates,
> **When** displayed on the page,
> **Then** all amounts use GBP formatting with pound sign and space (e.g., "£ 556.00") and all dates use "DD MMM YYYY" format (e.g., "21 Aug 2021").

**AC 12 -- Sender Address Display**:
> **Given** the invoice has a sender address,
> **When** the invoice details card is displayed,
> **Then** the sender address is shown right-aligned in the header section with each line (street, city, post code, country) on a separate line.

---

## 9. Recommendation

**Assessment: Needs Clarification (Minor)**

The ticket is well-structured and the Figma designs are comprehensive. The existing codebase provides a strong foundation with reusable components, types, utilities, and mock data. The main gap is the undefined behavior of the action buttons, which are a prominent part of the page.

### Must Resolve Before Implementation

1. **Action button behavior** (Question #1) -- The ticket says "Action buttons visible" and goals say "Perform invoice actions." These are contradictory: "visible" implies placeholder, "perform actions" implies functional. A decision is needed.
2. **Status-dependent button display** (Question #2) -- Without guidance, the implementer will need to decide how to handle Paid and Draft invoices. This affects the component logic.

### Should Resolve, But Can Proceed With Reasonable Defaults

3. **Invoice not found handling** (Question #3) -- A simple fallback message is a safe default.
4. **Server vs Client component** (Question #5) -- Server Component with client sub-components is the clear best practice.
5. **Responsive behavior** (Question #4) -- Desktop only per AC; defer mobile/tablet.

### Can Defer

6. **"Mark as Paid" persistence** (Question #6) -- Non-functional is a safe default.
7. **Delete confirmation modal** (Question #7) -- Clearly a separate feature.

### Pre-Implementation Checklist

Before starting implementation, confirm:
- [ ] Action button behavior decision (functional vs. placeholder)
- [ ] Status-dependent button display rules for Paid and Draft invoices
- [ ] Whether `#373B53` for the Amount Due footer should use `bg-invoice-draft-light` or if a semantic alias should be created
- [ ] Edit button styling approach (custom classes on existing Button, or new variant)

### Key Implementation Notes

- The placeholder at `app/invoices/[id]/page.tsx` already uses the correct Next.js 16 async params pattern -- preserve this.
- All needed data fields exist in the `Invoice` type and mock data -- no data model changes required.
- The `StatusBadge`, `Sidebar`, `formatCurrency`, and `formatDate` utilities are all available for direct reuse.
- The `Button` component from shadcn/ui can handle "Mark as Paid" (default variant) and "Delete" (destructive variant) but the "Edit" button will need custom class overrides.

### Figma Node Reference

| Frame | Node ID | Purpose |
|-------|---------|---------|
| `0:8597` | Desktop Light | Primary implementation reference |
| `0:7236` | Desktop Dark | Dark theme reference |
| `0:6041` | Desktop Light Hover | Hover/interaction states |
| `0:5105` | Desktop Dark Hover | Dark hover states |
| `0:3965` | Tablet Light | Tablet layout (deferred) |
| `0:2579` | Tablet Dark | Tablet dark (deferred) |
| `0:1184` | Mobile Light | Mobile layout (deferred) |
| `0:388` | Mobile Dark | Mobile dark (deferred) |
