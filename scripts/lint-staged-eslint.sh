#!/usr/bin/env bash
set -euo pipefail

export ESLINT_USE_FLAT_CONFIG=false

"$(pwd)/node_modules/.bin/eslint" --fix --config .eslintrc.json "$@"

