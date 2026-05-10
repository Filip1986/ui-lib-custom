#!/bin/bash

echo "=== Running ESLint ==="
npx eslint projects/ui-lib-custom/src/lib/confirm-dialog/ --max-warnings 0
ESLINT_EXIT=$?

if [ $ESLINT_EXIT -eq 0 ]; then
    echo ""
    echo "=== ESLint passed, running Jest ==="
    npx jest --testPathPatterns=confirm-dialog --no-coverage
    JEST_EXIT=$?
    echo ""
    echo "=== Jest exit code: $JEST_EXIT ==="
else
    echo ""
    echo "=== ESLint failed with exit code: $ESLINT_EXIT ==="
    exit $ESLINT_EXIT
fi
