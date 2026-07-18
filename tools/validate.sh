#!/usr/bin/env bash
set -e

echo "=== JavaScript Syntax Check ==="
find . -type f -name "*.js" -exec node --check {} \;

echo
echo "=== ESLint ==="
find . -type f -name "*.js" -exec npx eslint {} \;

echo
echo "=== Git Status ==="
git status -sb

echo
echo "Validation complete."
