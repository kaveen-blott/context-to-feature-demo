# Codebase Context (auto-generated)
<!-- Regenerate: .claude/scripts/gather-context.sh -->


**Last updated**: 2026-02-12 05:33 UTC
**Last updated**: 2026-02-12 05:33 UTC

## File Tree

```

## File Tree

```
app/globals.css
app/invoices/[id]/page.tsx
app/layout.tsx
app/page.tsx
components/empty-state.tsx
components/filter-dropdown.tsx
components/invoice-card.tsx
components/sidebar.tsx
components/status-badge.tsx
components/theme-provider.tsx
components/theme-toggle.tsx
components/ui/button.tsx
components/ui/checkbox.tsx
components/ui/popover.tsx
lib/data/mock-invoices.ts
lib/types/invoice.ts
lib/utils.ts
lib/utils/currency.ts
lib/utils/date.ts
```
app/globals.css
app/invoices/[id]/page.tsx
app/layout.tsx
app/page.tsx
components/empty-state.tsx
components/filter-dropdown.tsx
components/invoice-card.tsx
components/sidebar.tsx
components/status-badge.tsx
components/theme-provider.tsx
components/theme-toggle.tsx
components/ui/button.tsx
components/ui/checkbox.tsx
components/ui/popover.tsx
lib/data/mock-invoices.ts
lib/types/invoice.ts
lib/utils.ts
lib/utils/currency.ts
lib/utils/date.ts
```

## Routes


## Routes

- `/invoices/[id]` -- `app/invoices/[id]/page.tsx`
- `/invoices/[id]` -- `app/invoices/[id]/page.tsx`
- ` (layout)` -- `app/layout.tsx`
- ` (layout)` -- `app/layout.tsx`
- `/` -- `app/page.tsx`
- `/` -- `app/page.tsx`

## Key Types


## Key Types

### `lib/types/invoice.ts`
```ts
### `lib/types/invoice.ts`
```ts
export type InvoiceStatus = "paid" | "pending" | "draft";
export interface Address 
export interface LineItem 
export interface Invoice 
```

export type InvoiceStatus = "paid" | "pending" | "draft";
export interface Address 
export interface LineItem 
export interface Invoice 
```


## Components


## Components

- **empty-state** (`components/empty-state.tsx`) -- `export function EmptyState() `
- **empty-state** (`components/empty-state.tsx`) -- `export function EmptyState() `
- **filter-dropdown** (`components/filter-dropdown.tsx`) -- `export function FilterDropdown(`
- **filter-dropdown** (`components/filter-dropdown.tsx`) -- `export function FilterDropdown(`
- **invoice-card** (`components/invoice-card.tsx`) -- `export function InvoiceCard(`
- **invoice-card** (`components/invoice-card.tsx`) -- `export function InvoiceCard(`
- **sidebar** (`components/sidebar.tsx`) -- `export function Sidebar() `
- **sidebar** (`components/sidebar.tsx`) -- `export function Sidebar() `
- **status-badge** (`components/status-badge.tsx`) -- `export function StatusBadge(`
- **status-badge** (`components/status-badge.tsx`) -- `export function StatusBadge(`
- **theme-provider** (`components/theme-provider.tsx`) -- `export function ThemeProvider(`
- **theme-provider** (`components/theme-provider.tsx`) -- `export function ThemeProvider(`
- **theme-toggle** (`components/theme-toggle.tsx`) -- `export function ThemeToggle() `

- **theme-toggle** (`components/theme-toggle.tsx`) -- `export function ThemeToggle() `
### shadcn/ui installed

### shadcn/ui installed


- `button`
- `button`
- `checkbox`
- `checkbox`
- `popover`

- `popover`


## Utilities


## Utilities

### `lib/utils.ts`
```ts
### `lib/utils.ts`
```ts
export function cn(...inputs: ClassValue[]) 
```

### `lib/utils/currency.ts`
```ts
export function cn(...inputs: ClassValue[]) 
```

### `lib/utils/currency.ts`
```ts
export function formatCurrency(amount: number): string 
```

### `lib/utils/date.ts`
```ts
export function formatCurrency(amount: number): string 
```

### `lib/utils/date.ts`
```ts
export function formatDate(dateString: string): string 
export function formatDueDate(dateString: string): string 
```

export function formatDate(dateString: string): string 
export function formatDueDate(dateString: string): string 
```


## Mock Data


## Mock Data

### `lib/data/mock-invoices.ts`
```ts
### `lib/data/mock-invoices.ts`
```ts
export const mockInvoices: Invoice[] 
```

export const mockInvoices: Invoice[] 
```


## Key Dependencies


## Key Dependencies

- `class-variance-authority`: ^0.7.1
- `clsx`: ^2.1.1
- `lucide-react`: ^0.563.0
- `next`: 16.1.6
- `next-themes`: ^0.4.6
- `radix-ui`: ^1.4.3
- `react`: 19.2.3
- `react-dom`: 19.2.3
- `tailwind-merge`: ^3.4.0
- `class-variance-authority`: ^0.7.1
- `clsx`: ^2.1.1
- `lucide-react`: ^0.563.0
- `next`: 16.1.6
- `next-themes`: ^0.4.6
- `radix-ui`: ^1.4.3
- `react`: 19.2.3
- `react-dom`: 19.2.3
- `tailwind-merge`: ^3.4.0
