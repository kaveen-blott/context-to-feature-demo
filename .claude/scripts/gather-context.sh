#!/bin/bash
# Auto-generates .claude/context.md with a compact codebase index.
# Designed to be fast (<1s) so it can run as a hook without blocking.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
OUT="$ROOT/.claude/context.md"
TMP="$OUT.tmp"

cd "$ROOT"

cat > "$TMP" <<'HEADER'
# Codebase Context (auto-generated)
<!-- Regenerate: .claude/scripts/gather-context.sh -->
HEADER

# --- Timestamp ---
echo "" >> "$TMP"
echo "**Last updated**: $(date -u '+%Y-%m-%d %H:%M UTC')" >> "$TMP"

# --- File Tree ---
cat >> "$TMP" <<'SECTION'

## File Tree

```
SECTION

# Fast tree: show full relative paths for clarity
find app components lib -type f \( -name '*.ts' -o -name '*.tsx' -o -name '*.css' \) 2>/dev/null | sort >> "$TMP"

echo '```' >> "$TMP"

# --- Routes ---
cat >> "$TMP" <<'SECTION'

## Routes

SECTION

find app -name 'page.tsx' -o -name 'layout.tsx' 2>/dev/null | sort | while read -r f; do
  route=$(echo "$f" | sed 's|^app||' | sed 's|/page\.tsx$||' | sed 's|/layout\.tsx$| (layout)|')
  [ -z "$route" ] && route="/"
  echo "- \`$route\` -- \`$f\`" >> "$TMP"
done

# --- Types ---
cat >> "$TMP" <<'SECTION'

## Key Types

SECTION

find lib/types -name '*.ts' 2>/dev/null | sort | while read -r f; do
  echo "### \`$f\`" >> "$TMP"
  echo '```ts' >> "$TMP"
  # Extract exported interfaces, types, and enums (just signatures, not bodies)
  grep -E '^\s*export\s+(interface|type|enum)\s+' "$f" 2>/dev/null | sed 's/{.*//' >> "$TMP"
  echo '```' >> "$TMP"
  echo "" >> "$TMP"
done

# --- Components ---
cat >> "$TMP" <<'SECTION'

## Components

SECTION

# App components (non-ui)
for f in components/*.tsx; do
  [ -f "$f" ] || continue
  name=$(basename "$f" .tsx)
  # Extract the default/named export function signature
  sig=$(grep -E '^\s*export\s+(default\s+)?function\s+' "$f" 2>/dev/null | head -1 | sed 's/{.*//' | sed 's/^\s*//')
  echo "- **$name** (\`$f\`) -- \`$sig\`" >> "$TMP"
done

echo "" >> "$TMP"

# shadcn/ui components (just list them)
if [ -d components/ui ]; then
  echo "### shadcn/ui installed" >> "$TMP"
  echo "" >> "$TMP"
  ls components/ui/*.tsx 2>/dev/null | while read -r f; do
    echo "- \`$(basename "$f" .tsx)\`" >> "$TMP"
  done
  echo "" >> "$TMP"
fi

# --- Utilities ---
cat >> "$TMP" <<'SECTION'

## Utilities

SECTION

find lib/utils lib -maxdepth 1 -name '*.ts' 2>/dev/null | sort -u | while read -r f; do
  echo "### \`$f\`" >> "$TMP"
  echo '```ts' >> "$TMP"
  grep -E '^\s*export\s+(function|const|class)\s+' "$f" 2>/dev/null | sed 's/{.*//' | sed 's/=>.*/=> .../' >> "$TMP"
  echo '```' >> "$TMP"
  echo "" >> "$TMP"
done

# --- Data ---
cat >> "$TMP" <<'SECTION'

## Mock Data

SECTION

find lib/data -name '*.ts' 2>/dev/null | sort | while read -r f; do
  echo "### \`$f\`" >> "$TMP"
  echo '```ts' >> "$TMP"
  grep -E '^\s*export\s+(const|function)\s+' "$f" 2>/dev/null | sed 's/=.*//' | sed 's/{.*//' >> "$TMP"
  echo '```' >> "$TMP"
  echo "" >> "$TMP"
done

# --- Dependencies (key ones) ---
cat >> "$TMP" <<'SECTION'

## Key Dependencies

SECTION

if [ -f package.json ]; then
  # Extract non-dev deps, skip @types
  node -e "
    const pkg = require('./package.json');
    const deps = Object.keys(pkg.dependencies || {}).filter(d => !d.startsWith('@types'));
    deps.forEach(d => console.log('- \`' + d + '\`: ' + pkg.dependencies[d]));
  " >> "$TMP" 2>/dev/null
fi

# Atomic move
mv "$TMP" "$OUT"
