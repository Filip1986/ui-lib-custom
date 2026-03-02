#!/usr/bin/env bash
set -euo pipefail

export ESLINT_USE_FLAT_CONFIG=true

"$(pwd)/node_modules/.bin/eslint" --fix "$@"
