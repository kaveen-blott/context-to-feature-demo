# Figma Design Context - Invoice App

Source: https://www.figma.com/design/lmzClwfxHToplRxRKQ8Dcq/Invoice-App-%E2%80%93-Feature-Designs

## Screens Overview

The Figma file contains **56 frames** across Mobile, Tablet, and Desktop breakpoints, in both Light and Dark modes.

### Screen List (Desktop - Primary Reference)

| Node ID | Screen Name | Description |
|---------|-------------|-------------|
| 0:8890 | Desktop - Invoices | Invoice list page (light) - 7 invoices shown |
| 0:8672 | Desktop - Invoices - Empty | Empty state with illustration (light) |
| 0:8597 | Desktop - View Invoice | Invoice detail page (light) |
| 0:8397 | Desktop - Edit Invoice - Full Form | Edit invoice side panel (light) |
| 0:8165 | Desktop - Create Invoice - Full Form | Create invoice side panel (light) |
| 0:7635 | Desktop - Delete Prompt | Delete confirmation modal (light) |
| 0:6136 | Desktop - Invoices - Hover/Active | Filter dropdown open + row hover (light) |
| 0:6041 | Desktop - View Invoice - Hover/Active | Hover states on buttons (light) |
| 0:5310 | Desktop - Create Invoice - Hover/Active/Error | Date picker + error states (light) |
| 0:5615 | Desktop - Edit Invoice - Hover/Active/Error | Edit form with interactions (light) |
| 0:5833 | Desktop - Create Invoice - Empty State | Create form empty state (light) |

### Dark Mode Equivalents

| Node ID | Screen Name |
|---------|-------------|
| 0:7529 | Desktop - Invoices [Dark] |
| 0:7311 | Desktop - Invoices [Dark] - Empty |
| 0:7236 | Desktop - View Invoice [Dark] |
| 0:7033 | Desktop - Edit Invoice [Dark] - Full Form |
| 0:6799 | Desktop - Create Invoice [Dark] - Full Form |
| 0:6246 | Desktop - Delete Prompt [Dark] |
| 0:5200 | Desktop - Invoices [Dark] - Hover/Active |
| 0:5105 | Desktop - View Invoice [Dark] - Hover/Active |
| 0:4672 | Desktop - Edit Invoice [Dark] - Hover/Active/Error |
| 0:4364 | Desktop - Create Invoice [Dark] - Hover/Active/Error |
| 0:4894 | Desktop - Create Invoice [Dark] - Empty State |

### Design System (Node 0:9001)
Contains: Colors, Typography (League Spartan), Buttons (6 variants), Form Elements (Light + Dark)

---

## Screen Details (from Screenshots)

### 1. Invoice List Page (Desktop - Invoices)
- **Layout**: Left sidebar (narrow, ~72px) + main content area
- **Sidebar**: Purple logo at top, dark/light mode toggle (moon icon), user avatar at bottom
- **Header**: "Invoices" title (H1), subtitle "There are X total invoices"
- **Controls**: "Filter by status" dropdown + "+ New Invoice" button (purple, pill-shaped with plus icon)
- **Invoice rows**: White cards with border, containing:
  - Invoice ID (bold, e.g. #RT3080)
  - Due date (e.g. "Due 19 Aug 2021")
  - Client name
  - Amount (bold, right-aligned, e.g. "£ 1,800.90")
  - Status badge (pill: Paid=green, Pending=orange, Draft=gray)
  - Right chevron arrow
- **Row hover**: Purple border on left side of card

### 2. Invoice List - Empty State
- Same header with "No invoices" subtitle
- Centered illustration (person with envelope)
- "There is nothing here" heading
- "Create an invoice by clicking the New Invoice button and get started" subtext

### 3. Invoice List - Filter Dropdown (Hover/Active)
- Dropdown shows below "Filter by status" with checkboxes: Draft, Pending, Paid
- Subtitle updates to "There are X pending invoices" (reflects active filter)
- Shadow on dropdown card
- Checked state uses purple checkbox with checkmark

### 4. View Invoice Page
- **Back navigation**: "< Go back" link at top
- **Status bar**: Card with "Status" label + status badge + action buttons (Edit, Delete, Mark as Paid)
  - Edit: Gray/secondary button
  - Delete: Red destructive button
  - Mark as Paid: Purple primary button
- **Invoice card**: Contains:
  - Invoice ID (#XM9141) + description ("Graphic Design")
  - Sender address (right-aligned): "19 Union Terrace, London, E1 3EZ, United Kingdom"
  - Invoice Date + Bill To + Sent to (3 column layout)
  - Payment Due date
  - Client name + address
  - Client email
  - **Items table**: Item Name | QTY. | Price | Total columns
  - **Amount Due footer**: Dark background bar with "Amount Due" + total amount

### 5. Create Invoice (Side Panel)
- Slides in from left, overlaying the invoice list (dimmed background)
- **Title**: "New Invoice"
- **Form sections**:
  - **Bill From**: Street Address, City/Post Code/Country (3-col)
  - **Bill To**: Client's Name, Client's Email, Street Address, City/Post Code/Country (3-col)
  - **Invoice Details**: Invoice Date (date picker) + Payment Terms (dropdown: "Net 30 Days")
  - **Project Description**: Text input
  - **Item List**: Table with Item Name, Qty., Price, Total (calculated), delete icon per row
  - "+ Add New Item" button (full width, gray/tertiary)
- **Footer buttons**: "Discard" (text), "Save as Draft" (dark), "Save & Send" (purple)

### 6. Edit Invoice (Side Panel)
- Same layout as Create but:
  - **Title**: "Edit #XM9141"
  - **Footer buttons**: "Cancel" (text), "Save Changes" (purple)
  - No "Save as Draft" option

### 7. Delete Confirmation Modal
- Centered modal over dimmed background
- **Title**: "Confirm Deletion"
- **Body**: "Are you sure you want to delete invoice #XM9141? This action cannot be undone."
- **Buttons**: "Cancel" (gray/secondary) + "Delete" (red/destructive)

### 8. Create Invoice - Hover/Active/Error States
- Date picker: Calendar popup with month navigation, selected date highlighted in purple
- Error state: Red border on empty fields, "- All fields must be added" error message at bottom
- Delete icon turns red on hover
- Price field with red border when value is 0.00

### 9. Design System
- **Colors**: Full palette with hex values and HSL
- **Typography**: League Spartan font specimens (Heading L/M/S, Body)
- **Buttons**: 6 variants shown in both light and dark, with hover states
- **Form Elements**: Input states (default, active, error, filled) for both themes

---

## Key Interaction Patterns

1. **Navigation**: Sidebar is persistent; main content changes
2. **Create/Edit**: Side panel slides over from left, list visible but dimmed behind
3. **Delete**: Modal dialog centered over content
4. **Filter**: Dropdown with multi-select checkboxes
5. **Date picker**: Calendar popup below date input
6. **Status transitions**: Draft -> Pending -> Paid (via "Mark as Paid" button)
7. **Responsive**: Mobile (375px), Tablet (768px), Desktop (1440px)

## Responsive Behavior
- **Mobile**: Full-width layout, no sidebar visible in main frames, action buttons stack vertically at bottom
- **Tablet**: Similar to desktop but sidebar narrower, create/edit panels take more width
- **Desktop**: Sidebar (72px) + main content, side panels ~616px wide
