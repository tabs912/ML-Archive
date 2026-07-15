#!/usr/bin/env bash
set -e

echo "Removing binary files from staged changes..."

git restore --staged '*.pdf' 2>/dev/null || true
git restore --staged '*.xlsx' 2>/dev/null || true
git restore --staged '*.xlsm' 2>/dev/null || true
git restore --staged '*.docx' 2>/dev/null || true
git restore --staged '*.pptx' 2>/dev/null || true
git restore --staged '*.png' 2>/dev/null || true
git restore --staged '*.jpg' 2>/dev/null || true
git restore --staged '*.jpeg' 2>/dev/null || true
git restore --staged '*.zip' 2>/dev/null || true

echo
echo "Remaining staged files:"
git diff --cached --name-only
if git diff --cached --name-only | grep -E '\.(pdf|xlsx|xlsm|docx|pptx|png|jpg|jpeg|gif|zip)$' >/dev/null; then
    echo "ERROR: Binary files are staged."
    echo "Remove them before creating a PR."
    exit 1
fi
