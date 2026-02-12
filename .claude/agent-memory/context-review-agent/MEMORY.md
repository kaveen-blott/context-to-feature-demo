# Context Review Agent Memory

## Project State (as of 2026-02-11)

- Codebase is greenfield: only `app/page.tsx` (placeholder), `app/layout.tsx`, `app/globals.css`, `lib/utils.ts` exist
- No `components/` or `components/ui/` directory -- no shadcn components installed yet
- No theme provider configured in layout (no `next-themes`)
- `components.json` is configured for shadcn (new-york, RSC, Lucide)
- CSS variables for light/dark themes are fully set up in `globals.css`
- Path aliases: `@/*` maps to project root

## Jira Project

- Cloud ID: `b2ff74d1-8f83-4e88-acee-c6390d448139`
- Project key: `CI` (Caerus Investment)
- Tickets use sub-task issue type for implementation work

## Design System Gaps Identified

- Status badge colors (green `#33D69F`, orange `#FF8F00`, draft gray `#373B53`) are NOT in CLAUDE.md or `globals.css`
- Client name text color `#858BB2` is close to but not exactly `#888EB0` (muted)
- Sidebar color discrepancy: Figma code shows `#373B53`, CLAUDE.md maps sidebar to `#1E2139`
- See detailed notes: [design-system-gaps.md](design-system-gaps.md)

## Common Ticket Gaps in This Project

- Tickets reference Figma but don't specify colors not in design system
- Sidebar/layout scope is often ambiguous in page-level tickets
- Theme support (light/dark) is mandated by CLAUDE.md but often not mentioned in ACs
- Navigation targets referenced in ACs may not exist yet (e.g., "navigate to View Invoice page")
- "New Invoice" / action button behaviors are undefined when the target feature doesn't exist yet

## Figma File

- Source: `https://www.figma.com/design/lmzClwfxHToplRxRKQ8Dcq/Invoice-App-%E2%80%93-Feature-Designs`
- 56 frames total across Mobile (375px), Tablet (768px), Desktop (1440px) in Light + Dark
- Design system node: `0:9001`
- Pre-gathered context file: `.claude/plans/figma-design-context.md`
- Figma desktop MCP `get_design_context` sometimes returns empty; `get_screenshot` + `forceCode: true` are more reliable
