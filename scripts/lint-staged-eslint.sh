#!/usr/bin/env bash
set -euo pipefail

export ESLINT_USE_FLAT_CONFIG=true

# Locate node_modules by traversing up — supports git worktrees where node_modules
# lives in the main workspace root rather than the worktree root.
find_eslint() {
  local dir
  dir="$(pwd)"
  while [[ "$dir" != "/" && "$dir" != "." ]]; do
    if [[ -x "$dir/node_modules/.bin/eslint" ]]; then
      echo "$dir/node_modules/.bin/eslint"
      return 0
    fi
    dir="$(dirname "$dir")"
  done
  return 1
}

ESLINT_BIN="$(find_eslint)" || { echo "eslint not found in any parent node_modules" >&2; exit 1; }
"$ESLINT_BIN" --fix "$@"
