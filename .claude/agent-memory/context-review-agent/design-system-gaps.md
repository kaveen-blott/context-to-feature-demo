# Design System Gaps

## Missing Colors (from Figma, not in CLAUDE.md or globals.css)

### Status Badge Colors
These appear in Figma Invoice List frames but are not defined anywhere in the project:

| Color | Hex | Usage | Suggested Utility Name |
|-------|-----|-------|------------------------|
| Green | `#33D69F` | "Paid" status badge dot + text | `invoice-green` |
| Orange | `#FF8F00` | "Pending" status badge dot + text | `invoice-orange` |
| Dark Gray | `#373B53` | "Draft" status badge (light mode) + sidebar bg | `invoice-draft-gray` |

### Text Colors
| Color | Hex | Usage | Notes |
|-------|-----|-------|-------|
| Gray-blue | `#858BB2` | Client name text in invoice rows | Close to `#888EB0` (muted) but not exact |

## Sidebar Color Discrepancy

- Figma design context code for node `0:8890` shows sidebar rectangle as `bg-[#373b53]`
- CLAUDE.md maps `--sidebar` CSS variable to `hsl(233 31% 17%)` which is `#1E2139`
- The Figma screenshots visually appear closer to `#373B53`
- This needs resolution -- likely the sidebar has two tones (outer background vs inner areas)

## Status Badge Structure (from Figma code)

Each badge is structured as:
- Outer container: `rounded-[6px]` with status color bg at `opacity-6` (6% opacity)
- Inner: overflow-clipped area containing a small colored dot (Oval SVG) + status text (15px Bold)
- The dot and text color match the status color

This pattern does not map to any standard shadcn/ui Badge variant. A custom component will be needed.
