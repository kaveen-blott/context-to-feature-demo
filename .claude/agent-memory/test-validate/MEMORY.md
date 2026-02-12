# Test Validation Agent Memory

## CRITICAL: Testing Approach

**ALWAYS use Playwright MCP tools (browser_navigate, browser_snapshot, browser_click, browser_take_screenshot, etc.) to interactively test the app in a real browser.** Do NOT just write Playwright test files - actually open the app, interact with it, take screenshots, and validate behavior live.

### Workflow
1. Start the dev server (`npm run dev`) in background
2. Use `mcp__playwright__browser_navigate` to open the app URL
3. Use `mcp__playwright__browser_snapshot` to inspect page structure
4. Use `mcp__playwright__browser_click`, `browser_type`, etc. to interact
5. Use `mcp__playwright__browser_take_screenshot` to capture visual evidence
6. After interactive validation, THEN run existing test files with `npx playwright test`
7. Report results with screenshots as evidence

### Why Playwright MCP?
- Catches visual/styling issues that spec files miss
- Validates real browser rendering, not just DOM structure
- Screenshots provide visual proof of pass/fail
- Can compare against Figma designs visually

## Project Test Patterns

### Test File Structure
- Place test files in `/tests/` directory (Playwright convention)
- Name pattern: `[feature-name].spec.ts`
- Use `test.describe()` blocks to organize by acceptance criteria
- Always include Jira ticket reference in top-level describe block

### Selectors Discovered

#### Invoice List Page
- Invoice cards: `a[href^="/invoices/"]` - All invoice links
- Specific invoice: `a[href="/invoices/{id}"]` - Individual invoice card
- Filter trigger: `page.getByText('Filter by status')`
- Theme toggle: `page.getByRole('button', { name: /theme/i })`
- New Invoice button: `page.getByRole('button', { name: /New Invoice/i })`

#### Common Patterns
- Prefer `getByRole()` over CSS selectors for accessibility
- Use `getByText()` for static text elements
- Use attribute selectors `[href^="/invoices/"]` for dynamic lists
- Status badges: Use `getByText('Paid|Pending|Draft', { exact: false })`

### Known Routes
- Root: `/` - Invoice list page
- Invoice detail: `/invoices/[id]` - View invoice placeholder page

### Next.js-Specific Patterns
- Next.js adds a route announcer div with duplicate text content for accessibility
- When using `getByText()`, prefer `getByRole('heading')` to avoid "strict mode violations"
- Route announcer ID: `#__next-route-announcer__`

### Mock Data
- 7 total invoices in `/lib/data/mock-invoices.ts`
- IDs: RT3080, XM9141, RG0314, RT2080, AA1449, TY9141, FV2353
- Status breakdown: 2 Paid, 4 Pending, 1 Draft
- All use GBP currency formatting

### Filter Behavior
- Multi-select with OR logic (shows invoices matching ANY selected status)
- No selections = show all invoices
- Filter dropdown uses checkbox roles
- Close with ESC key or clicking outside

### Theme Support
- Next.js app uses next-themes
- Toggle in sidebar
- Theme class applied to `<html>` element
- Wait 200ms after theme toggle for transition

### Accessibility Requirements
- Single h1 per page
- Checkboxes must have accessible labels
- Invoice cards must be keyboard navigable (use `<a>` tags)
- Filter supports keyboard (Enter to open, ESC to close)

### Playwright Config
- Dev server auto-starts via `webServer` in playwright.config.ts
- Base URL: http://localhost:3000
- Test directory: ./tests
- Browser projects: chromium, firefox, webkit
